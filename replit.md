# Sense of Self (SOS) - Interactive Journey

## Overview

This is a philosophical interactive web application inspired by Kafka and Dostoevsky that guides users through a questionnaire to determine their psychological archetype. The application presents a gothic, atmospheric experience with typewriter effects, ambient audio, and dark theming to create an immersive journey of self-discovery.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight React router)
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom gothic theme colors and typography
- **State Management**: React Query (@tanstack/react-query) for server state, local storage for session persistence
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: In-memory storage with plans for PostgreSQL persistence
- **Static Assets**: Express static file serving for attached assets
- **Build System**: ESBuild for server bundling

### Key Design Decisions

**Monorepo Structure**: The application uses a shared folder structure with separate client and server directories, plus a shared schema directory for type safety between frontend and backend.

**Gothic Theme**: Custom CSS variables and typography (Cinzel for headings, EB Garamond for body text) create an atmospheric, literary experience matching the philosophical content.

**Progressive Enhancement**: The app works without JavaScript for basic functionality, with enhanced interactions for full experience.

## Key Components

### Frontend Components
- **Landing Page**: Typewriter intro with ambient audio integration
- **Questionnaire**: Progressive question flow with smooth transitions
- **Result Page**: Archetype display with sharing capabilities
- **Progress Bar**: Visual progress tracking through questionnaire
- **Typewriter Text**: Animated text reveal component

### Backend Components
- **Routes Handler**: Express route registration with health checks
- **Session Management**: User session tracking and data persistence
- **Static Asset Serving**: Image and audio file delivery
- **Storage Layer**: Abstracted storage interface for future database integration

### Shared Components
- **Schema Definitions**: Drizzle ORM schema for users table
- **Type Definitions**: Shared TypeScript interfaces for questions, archetypes, and session data

## Data Flow

1. **User Journey**: Landing → Questionnaire → Result
2. **Session Tracking**: Local storage persistence with optional server backup
3. **Question Flow**: Sequential question presentation with weighted scoring
4. **Result Calculation**: Algorithm determines archetype based on accumulated weights
5. **Data Persistence**: Session data stored locally with optional server submission

### Archetype System
The application categorizes users into six archetypes split between Kafka and Dostoevsky influences:
- **Kafka Archetypes**: Repressed Performer, Mimic Who Forgot, Escaped Still Caged
- **Dostoevsky Archetypes**: Ridiculous Believer, Wounded Prophet, Dreamer Who Returned

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon database driver for PostgreSQL
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **class-variance-authority**: Utility for component variants

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Frontend build tool with React plugin
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development
- **Hot Reload**: Vite development server with HMR
- **Type Safety**: Shared TypeScript configuration across client/server
- **Asset Management**: Local asset serving with path resolution

### Production Build
1. **Frontend**: Vite builds optimized React bundle to `dist/public`
2. **Backend**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `drizzle-kit push`
4. **Assets**: Static files served from `attached_assets` directory

### Database Setup
- **Environment**: Requires `DATABASE_URL` environment variable
- **Migrations**: Stored in `./migrations` directory
- **Schema**: Defined in `shared/schema.ts` with Zod validation

### Scaling Considerations
- **Session Storage**: Currently in-memory, designed for PostgreSQL migration
- **Static Assets**: Can be moved to CDN for better performance
- **Caching**: React Query provides client-side caching, server-side caching can be added

The application is designed as a self-contained philosophical experience with room for expansion into user accounts, social features, and enhanced analytics while maintaining its core atmospheric and introspective nature.