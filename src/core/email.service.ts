import axios from 'axios';
import { env } from '@/env';
import logger from '@/core/logger';

/**
 * Sends an OTP email using the Thundermail REST API.
 *
 * @param to - Recipient email address
 * @param otp - 6-digit OTP code
 * @param type - Type of OTP ('email_verification' or 'reset_password')
 */
export const sendOtpEmail = async (to: string, otp: string, type: string): Promise<void> => {
  const subject = type === 'reset_password' ? 'Password Reset OTP' : 'Email Verification OTP';

  // Mapping internal types to Thundermail event_types
  const eventType = type === 'reset_password' ? 'password_reset' : 'otp_signup';

  const html = `<p>Your OTP for <strong>${type.replace('_', ' ')}</strong> is:</p>
<h2 style="letter-spacing:4px">${otp}</h2>
<p>This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>`;

  const payload = {
    from: env.THUNDERMAIL_FROM,
    to: [to],
    subject,
    html,
    text: `Your OTP for ${type.replace('_', ' ')} is: ${otp}`,
    event_type: eventType,
    event_source: 'auth-service',
    organization_id: 'respondly-ai',
    correlation_id: `otp-${Date.now()}`,
    metadata: {
      otp_code: otp,
      request_type: type,
    },
  };

  try {
    const response = await axios.post(`${env.THUNDERMAIL_API_URL}/emails`, payload, {
      headers: {
        Authorization: `Bearer ${env.THUNDERMAIL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    logger.info('[Email] OTP email sent via Thundermail API:', {
      to,
      type,
      emailId: response.data.id,
    });
  } catch (err: any) {
    if (err.response) {
      logger.error('[Email] Thundermail API error:', {
        to,
        type,
        status: err.response.status,
        data: err.response.data,
      });
    } else {
      logger.error('[Email] Unexpected error sending OTP email:', {
        to,
        error: err.message,
      });
    }
  }
};
