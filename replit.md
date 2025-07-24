# Dental Strategies Web Application

## Overview

This is an elegant, minimalist landing page for "Dental Strategies" functioning as a digital business card for Dr. Michael Njo's dental consulting practice. The application features Dr. Njo's professional headshot, comprehensive biographical information, and clear call-to-action for free consultations. Built with React frontend and Express backend with a clean, professional design focused on converting visitors into consultation bookings.

## Recent Changes (July 24, 2025)
- Integrated Dr. Michael Njo's professional headshot using proper Vite asset imports
- Updated page layout to feature Dr. Njo prominently with company name as secondary
- Added comprehensive biographical content highlighting 25 years of consulting experience
- Updated CTA buttons to focus on "Free Consultation" scheduling
- Set proper contact information: phone +1 (650) 436-2939, email dentalstrategies@gmail.com
- Optimized SEO with focused title and meta description
- Added seamless book and institute website links with elegant inline and card layouts
- Implemented comprehensive light/dark mode with theme toggle and smooth transitions
- Added intelligent auto-mode that switches themes based on user's local time (7PM-7AM dark, 7AM-7PM light)
- Enhanced theme toggle with 4 modes: Auto → Light → Dark → System → Auto (cycle)
- Auto mode displays real-time status indicator and current time
- Set Smart Auto mode as the intelligent default experience for all new users
- Updated OpenGraph image to use professional group photo for better social proof

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack monorepo structure with clear separation between client and server components:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **Theme System**: Intelligent 4-mode theme system (Light/Dark/System/Auto) with time-based automatic switching
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