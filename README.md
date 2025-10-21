# Node.js Scalable Backend Project

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)

A comprehensive task management API built with modern technologies and following clean architecture principles for scalability, maintainability, and performance.

## 📋 Table of Contents

- [Tech Stack](#️-tech-stack)
- [Database Schema](#️-database-schema)
- [Project Features](#-project-features)
- [Development Team](#-development-team)

## 🛠️ Tech Stack

### Backend & Runtime

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![TSX](https://img.shields.io/badge/TSX-3178C6?style=flat-square&logo=typescript&logoColor=white)

### Database & ORM

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![DrizzleORM](https://img.shields.io/badge/DrizzleORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black)

### Validation & Error Handling

![Zod](https://img.shields.io/badge/Zod-3068B7?style=flat-square&logo=zod&logoColor=white)
![Winston](https://img.shields.io/badge/Winston-231F20?style=flat-square&logoColor=white)

### DevOps & Deployment

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat-square&logo=docker&logoColor=white)

### Code Quality

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)
![Husky](https://img.shields.io/badge/Husky-42B883?style=flat-square&logoColor=white)

## 🗄️ Database Schema

Our application uses a comprehensive PostgreSQL schema designed for scalability and modern authentication:

```mermaid
erDiagram

    USERS {
        string id PK
        string name
        string email "unique"
        string password
        string role
        string profile_picture_url
        boolean google_connected
        timestamp createdAt
        timestamp updatedAt
    }

    AUTH_TOKENS {
        string id PK
        string userId FK
        text access_token
        text refresh_token
        string provider
        timestamp expiresAt
        timestamp createdAt
    }

    TASKS {
        string id PK
        string userId FK
        string title
        text description
        string status
        timestamp startTime
        timestamp endTime
        string calendar_event_id
        timestamp createdAt
        timestamp updatedAt
    }

    OTP_CODES {
        string id PK
        string userId FK
        string code
        string type
        timestamp expiresAt
        timestamp createdAt
    }

    REPORTS {
        string id PK
        string userId FK
        string title
        string s3_url
        text ai_summary
        string status
        timestamp createdAt
    }

    %% Relationships
    USERS ||--o{ AUTH_TOKENS : "has"
    USERS ||--o{ TASKS : "creates"
    USERS ||--o{ OTP_CODES : "receives"
    USERS ||--o{ REPORTS : "generates"

```

### Key Features:

- **UUID Primary Keys** for better scalability and security
- **Comprehensive User Management** with role-based access control
- **OAuth Integration** support for multiple providers
- **Task Management** with calendar synchronization
- **Security Features** including OTP verification and 2FA
- **Report System** with AI-powered summaries
- **Proper Relationships** with cascade delete for data integrity

## 🚀 Project Features

### ✅ Implemented

- **Robust Error Handling** - Custom ErrorHandler class with factory methods
- **Type-Safe Validation** - Zod schemas with automatic validation
- **Enhanced AsyncHandler** - Zero-boilerplate async route handling
- **Database Schema** - Complete 5-table PostgreSQL schema with Drizzle ORM
- **Authentication Foundation** - User registration with validation
- **Logging System** - Winston logger with file rotation and console formatting
- **Code Quality** - ESLint, Prettier, Husky pre-commit hooks

### 🚧 In Development

- **JWT Authentication** - Token-based authentication system
- **OAuth Integration** - Google OAuth support
- **Task Management** - CRUD operations for tasks
- **OTP System** - Email verification and 2FA
- **Report Generation** - AI-powered report summaries
- **API Documentation** - Swagger/OpenAPI integration

### 📋 Planned Features

- **Calendar Integration** - Google Calendar sync
- **File Upload** - S3 integration for reports
- **Email Service** - Transactional email system
- **Rate Limiting** - API rate limiting and throttling
- **Caching** - Redis caching layer
- **Testing Suite** - Comprehensive unit and integration tests

## 👥 Development Team

### Made with ❤️ by:

- **Shubhojit Mitra** - System Architecture
- **Khushi Malik** - Backend Developer
- **Utkarsh Kapoor** - Backend & Database
- **Priyanshi Varshney** - API Documentation & Testing
- **Nancy Gumanta** - Testing & Quality Assurance

---

## 📝 Project Status

**Current Version**: 1.0.0 (Development)  
**Last Updated**: October 2025  
**License**: MIT License

This project is actively under development. Setup guides, API documentation, and deployment instructions will be added once core features are completed.
