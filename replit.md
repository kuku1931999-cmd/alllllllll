# Toma Beauty - Bilingual Beauty & Wellness Platform

## Overview

Toma Beauty is a bilingual (English/Arabic) content platform focused on natural beauty, skincare routines, and wellness. The application serves as a digital magazine featuring beauty articles, daily skincare routines, natural remedies/recipes, and wellness tips. It targets users interested in homemade beauty products and natural skincare solutions.

The platform provides:
- Beauty articles with full content support
- Morning/evening skincare routines with step-by-step instructions
- Natural remedy recipes with ingredients and instructions
- Daily beauty tips
- Full RTL support for Arabic content

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: Zustand for language state, TanStack Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and scroll animations
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in `shared/routes.ts`
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle table definitions
- **Migrations**: Drizzle Kit with migrations output to `./migrations`
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

### Key Design Patterns
- **Shared Schema**: Database models and Zod validation schemas in `shared/` directory, accessible by both client and server
- **Type-Safe API**: Routes defined with Zod schemas for request/response validation
- **Bilingual Content**: All content tables have paired `*En` and `*Ar` columns for English and Arabic
- **Language Context**: Global Zustand store manages language state with RTL/LTR switching

### Content Models
- **Sections**: Static content blocks (about, founder info)
- **Articles**: Blog posts with full content, summaries, categories, and images
- **Routines**: Skincare routines with frequency (morning/evening) and step arrays stored as JSONB
- **Remedies**: DIY beauty recipes with ingredients (JSONB), instructions, benefits, and notes
- **Tips**: Quick beauty tips

### Authentication
- **Method**: Replit Auth (OpenID Connect)
- **Session**: Express sessions with PostgreSQL store
- **User Storage**: Users table with profile information

## External Dependencies

### Database
- PostgreSQL database (provisioned via Replit, requires DATABASE_URL environment variable)

### Authentication
- Replit OpenID Connect provider (ISSUER_URL defaults to https://replit.com/oidc)
- Requires SESSION_SECRET environment variable

### Frontend Libraries
- shadcn/ui components (Radix UI primitives)
- Framer Motion for animations
- TanStack Query for data fetching
- Google Fonts (Cairo for Arabic, Playfair Display for headings, Inter for body text)

### Build & Development
- Vite for frontend bundling
- esbuild for server bundling
- Replit-specific Vite plugins for development experience