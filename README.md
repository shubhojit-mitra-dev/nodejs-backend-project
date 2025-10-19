# Node.js Scalable Backend Project

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)

A simple to-do list API that is scaled to production using best industry practices. Built with modern technologies and following clean architecture principles for scalability, maintainability, and performance.

## 📋 Table of Contents

- [🛠️ Tech Stack](#️-tech-stack)
- [🏃‍♂️ Quick Start](#️-quick-start)
- [💻 Local Development Setup](#-local-development-setup)
- [🐳 Docker Setup](#-docker-setup)
- [🧪 Testing](#-testing)
- [📚 API Documentation](#-api-documentation)

## 🛠️ Tech Stack

### Backend & Runtime
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat-square&logo=nodemon&logoColor=white)

### Database & ORM
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![DrizzleORM](https://img.shields.io/badge/DrizzleORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)

### Frontend & Styling
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat-square&logo=ejs&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

### Validation & Testing
![Zod](https://img.shields.io/badge/Zod-3068B7?style=flat-square&logo=zod&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=flat-square&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-FF6B6B?style=flat-square&logoColor=white)

### DevOps & Deployment
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)
![Azure DevOps](https://img.shields.io/badge/Azure_DevOps-0078D4?style=flat-square&logo=azure-devops&logoColor=white)

### Documentation
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=flat-square&logo=openapi-initiative&logoColor=white)

## 🏃‍♂️ Quick Start

Choose your preferred setup method:

- [💻 Local Development](#-local-development-setup) - Full local environment
- [🐳 Docker Setup](#-docker-setup) - Containerized environment (Recommended)

## 💻 Local Development Setup

### Prerequisites

- **Node.js**: Use the version specified in `.nvmrc`
- **pnpm**: Package manager
- **PostgreSQL**: Database server

### 1️⃣ Node.js Setup

```bash
# Install and use the correct Node.js version
nvm install
nvm use

# Verify Node.js version
node --version
```

### 2️⃣ Package Installation

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 3️⃣ PostgreSQL Installation

#### Option A: Official Website
- Download from [postgresql.org](https://www.postgresql.org/download/)

#### Option B: Linux Installation
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# CentOS/RHEL/Fedora
sudo dnf install postgresql postgresql-server

# Arch Linux
sudo pacman -S postgresql

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 4️⃣ Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/todo_db

# Server
NODE_ENV=development
PORT=8080
CORS_URL=http://localhost:3000

# Add other environment variables as needed
```

### 5️⃣ Database Setup

```bash
# Create database and run migrations
pnpm db:generate
pnpm db:migrate
pnpm db:seed  # Optional: seed with sample data
```

### 6️⃣ Start Development Server

```bash
# Start development server with hot reload
pnpm dev
```

The API will be available at `http://localhost:8080`

## 🐳 Docker Setup

### Prerequisites

#### Option A: Docker Desktop (Recommended)
- Download from [docker.com](https://www.docker.com/products/docker-desktop/)

#### Option B: Docker Engine (Linux)
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose-plugin

# CentOS/RHEL
sudo dnf install docker docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (to avoid sudo)
sudo usermod -aG docker $USER
newgrp docker  # or logout and login again
```

### Docker Compose Setup

#### 1️⃣ Clone and Navigate
```bash
git clone <repository-url>
cd nodejs-backend-project
```

#### 2️⃣ Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Update .env for Docker (DATABASE_URL will use container name)
DATABASE_URL=postgresql://postgresuser:postgrespassword@postgres:5432/db_postgres
```

#### 3️⃣ Build and Start Services
```bash
# Build and start all services in detached mode
docker-compose up --build -d

# View logs
docker-compose logs -f backend
```

#### 4️⃣ Verify Services
```bash
# Check running containers
docker ps

# Test network connectivity
docker exec -it todo-app ping postgres
```

#### 5️⃣ Service Management
```bash
# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Restart specific service
docker-compose restart backend
```

## 🧪 Testing

### API Testing with cURL

#### Health Check
```bash
curl http://localhost:8080/
# Expected: {"message": "Hello from the backend API"}
```

#### User Endpoints
```bash
# Get all users
curl -X GET http://localhost:8080/api/users

# Create a user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Get user by ID
curl -X GET http://localhost:8080/api/users/1
```

#### Todo Endpoints
```bash
# Get all todos
curl -X GET http://localhost:8080/api/todos

# Create a todo
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Docker", "description": "Complete Docker tutorial", "userId": 1}'

# Update todo
curl -X PUT http://localhost:8080/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Docker & Kubernetes", "completed": true}'

# Delete todo
curl -X DELETE http://localhost:8080/api/todos/1
```

#### Error Handling Test
```bash
# Test 404
curl http://localhost:8080/nonexistent
# Expected: {"success": false, "message": "Page not found"}
```

### Unit Testing
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📚 API Documentation

### Swagger UI
Once the server is running, visit:
- **Local**: `http://localhost:8080/api-docs`
- **Docker**: `http://localhost:8080/api-docs`

### OpenAPI Specification
The OpenAPI specification file is available at:
- `http://localhost:8080/api-docs.json`

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

###  Made with ❤️ by
- Shubhojit Mitra
- Khushi Malik
- Utkarsh Kapoor
- Priyanshi Varshney
- Nancy Gumanta