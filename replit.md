# Dental Strategies Web Application

## Overview

This is a modern full-stack web application for a dental practice called "Dental Strategies". The application is built with a React frontend and Express backend, featuring a clean, professional design focused on presenting dental services and facilitating patient contact.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack monorepo structure with clear separation between client and server components:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom dental-themed design system
- **UI Components**: Comprehensive shadcn/ui component library
- **Routing**: Lightweight wouter router for navigation
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Development**: tsx for TypeScript execution in development

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **ORM**: Drizzle ORM providing type-safe database operations
- **Migrations**: Managed through drizzle-kit with PostgreSQL dialect
- **Validation**: Zod schemas for runtime type checking

## Data Flow

1. **Client Requests**: React frontend makes HTTP requests to Express backend
2. **API Layer**: Express routes handle requests and interact with storage layer
3. **Storage Layer**: Abstracted interface allows switching between in-memory and database storage
4. **Database Operations**: Drizzle ORM handles type-safe database queries
5. **Response**: JSON responses sent back to client with proper error handling

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web framework for Node.js backend

### UI and Styling Dependencies
- **@radix-ui/***: Comprehensive set of low-level UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for managing component variants
- **lucide-react**: Icon library for React

### Development Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js
- **drizzle-kit**: Database migration and schema management

## Deployment Strategy

### Development
- **Frontend**: Vite development server with HMR
- **Backend**: tsx for running TypeScript directly
- **Database**: Uses DATABASE_URL environment variable for connection
- **Environment**: NODE_ENV=development for development-specific configurations

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: PostgreSQL database with Drizzle migrations
- **Deployment**: Single process serving both static files and API routes

### Environment Configuration
- **DATABASE_URL**: Required for PostgreSQL connection
- **NODE_ENV**: Controls development vs production behavior
- **Build Process**: Separate frontend and backend builds combined for deployment

### Key Architectural Decisions

1. **Monorepo Structure**: Keeps frontend and backend code in sync with shared TypeScript types
2. **Drizzle ORM**: Chosen for type safety and excellent PostgreSQL support
3. **shadcn/ui**: Provides consistent, accessible components while maintaining customization flexibility
4. **Storage Abstraction**: Allows easy switching between development (in-memory) and production (database) storage
5. **TypeScript Throughout**: Ensures type safety across the entire stack
6. **Vite + Express**: Modern development experience with production-ready deployment