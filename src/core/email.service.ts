import { ThunderMail } from 'thundermail';
import { env } from '@/env';
import logger from '@/core/logger';

const thundermail = new ThunderMail(env.THUNDERMAIL_API_KEY as string);

export const sendOtpEmail = (to: string, otp: string, type: string): void => {
  const subject = type === 'password_reset' ? 'Password Reset OTP' : 'Email Verification OTP';
  const html = `<p>Your OTP for <strong>${type.replace('_', ' ')}</strong> is:</p>
<h2 style="letter-spacing:4px">${otp}</h2>
<p>This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>`;

  // Fire-and-forget — non-blocking
  thundermail.emails
    .send({ from: env.THUNDERMAIL_FROM as string, to, subject, html })
    .then(({ error }) => {
      if (error) {logger.error('[Email] Failed to send OTP email:', { to, type, error });}
      else {logger.info('[Email] OTP email sent:', { to, type });}
    })
    .catch(err => logger.error('[Email] Unexpected error sending OTP email:', { to, error: err?.message }));
};
