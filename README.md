# Article Publishing Platform

A full-stack article publishing platform with threaded comments, @mention tagging, and JWT authentication. Built with Angular 17, Spring Boot 3.2, and PostgreSQL 15.

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Java | 17+ | Spring Boot runtime |
| Maven | 3.9+ (or use `./mvnw`) | Backend build tool |
| Node.js | 18+ | Angular CLI runtime |
| npm | 9+ | Frontend package manager |
| Angular CLI | 17+ (`npm i -g @angular/cli`) | Frontend dev server |
| PostgreSQL | 15+ | Database |

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | JDBC connection URL | `jdbc:postgresql://localhost:5432/article_platform` |
| `DATABASE_USERNAME` | Database user | `postgres` |
| `DATABASE_PASSWORD` | Database password | `secret` |
| `JWT_SECRET` | HS256 signing secret — **min 256 bits (32 chars)** | `your-256-bit-secret-key-here-32chars` |
| `JWT_EXPIRY_HOURS` | Token lifetime in hours (default: 24) | `24` |

> Never commit `JWT_SECRET` to source control. Use a secrets manager or `.env` file excluded from git.

## Database Setup

```bash
# Create the database
createdb article_platform

# (Optional) run seed data for local development
psql article_platform < db/seed.sql
```

Flyway runs automatically when the Spring Boot application starts. It applies `V1__init_schema.sql` from `src/main/resources/db/migration/`.

## Backend Setup

```bash
cd backend

# Export required environment variables
export DATABASE_URL=jdbc:postgresql://localhost:5432/article_platform
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=your_password
export JWT_SECRET=your-256-bit-secret-key-here-minimum-32-chars

# Run the application
./mvnw spring-boot:run
```

The API is available at `http://localhost:8080`.

## Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
ng serve
```

The app is available at `http://localhost:4200`. The dev proxy forwards `/api/**` to `http://localhost:8080/api`.

## Running Tests

### Backend unit + integration tests
```bash
cd backend
./mvnw test
```

Test coverage report is generated at `target/site/jacoco/index.html`. Service layer coverage must be ≥ 80%.

### Frontend type-checking
```bash
cd frontend
npx tsc --noEmit
```

## Building for Production

### Backend
```bash
cd backend
./mvnw package -DskipTests
java -jar target/article-platform-backend-*.jar
```

### Frontend
```bash
cd frontend
ng build --configuration production
# Output in dist/article-platform-frontend/
```

## API Documentation

Swagger UI is available at: `http://localhost:8080/swagger-ui.html`

OpenAPI JSON spec: `http://localhost:8080/api-docs`

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Browser                                                     │
│  Angular 17 SPA (standalone components, Signals, Tailwind)  │
│  Auth via JWT stored in localStorage                         │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST (JSON)
                            │ Authorization: Bearer <jwt>
┌───────────────────────────▼─────────────────────────────────┐
│  Spring Boot 3.2 (Java 17)                                  │
│  ├── SecurityConfig (stateless JWT, CORS for localhost:4200)│
│  ├── Controllers (REST layer — no business logic)           │
│  ├── Services (business logic — no DB calls)                │
│  ├── Repositories (Spring Data JPA)                         │
│  └── Flyway (schema migrations)                             │
└───────────────────────────┬─────────────────────────────────┘
                            │ JDBC (HikariCP connection pool)
┌───────────────────────────▼─────────────────────────────────┐
│  PostgreSQL 15                                               │
│  Tables: users, articles, comments, likes, tags             │
│  Constraints: BCrypt passwords, UNIQUE likes, FK cascades   │
└─────────────────────────────────────────────────────────────┘
```

**Key design decisions:**
- Stateless JWT auth — no server-side sessions
- Idempotent like/unlike — DB UNIQUE constraint enforces at storage level
- Threaded comments built in-memory from flat DB query (root + replies)
- @mentions parsed with regex, resolved against DB, stored in polymorphic `tags` table
- Angular Signals for reactive state — no NgRx, no BehaviorSubjects
- Lazy-loaded routes for all feature modules

## Project Structure

```
article-platform/
├── backend/          # Spring Boot application
│   ├── src/main/java/com/articleplatform/
│   │   ├── config/       # Security, CORS, JWT, Swagger config
│   │   ├── controller/   # REST controllers
│   │   ├── service/      # Business logic
│   │   ├── repository/   # Spring Data JPA repositories
│   │   ├── entity/       # JPA entities
│   │   ├── dto/          # Request + response DTOs
│   │   ├── security/     # JWT provider, filter, UserDetails
│   │   ├── exception/    # Global handler + custom exceptions
│   │   └── mapper/       # MapStruct entity↔DTO mappers
│   └── src/main/resources/
│       ├── application.yml
│       └── db/migration/ # Flyway SQL migrations
├── frontend/         # Angular 17 application
│   └── src/app/
│       ├── core/         # Auth service, interceptor, guard
│       ├── shared/       # Models, UI components
│       └── features/     # articles, auth, comments
├── db/
│   ├── schema.sql    # Complete DDL
│   └── seed.sql      # Sample data
└── docs/
    ├── ERD.md           # Entity relationship diagram
    ├── sequence-diagram.md
    └── api-docs.md      # All endpoints documented
```
