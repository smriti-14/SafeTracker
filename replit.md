# SafeZone Emergency System

## Overview

SafeZone is a real-time emergency zone detection application that helps users identify danger zones and safe areas during disasters. The system uses location data and network information to provide immediate safety alerts and guidance. Built with modern web technologies, it features a React frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence through Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error handling middleware

## Key Components

### Core Features
1. **Location Services**: Geolocation API integration for precise user positioning
2. **Network Analysis**: Network Information API for connection quality assessment
3. **Zone Detection**: Real-time proximity calculations for danger and safe zones
4. **Interactive Mapping**: Custom canvas-based map visualization
5. **Emergency Communications**: Direct emergency calling functionality

### Database Schema
- **zones**: Stores danger and safe zone information with geographic coordinates
- **user_locations**: Tracks user positions with network metadata and session management

### Component Structure
- **Landing Page**: Marketing and feature overview
- **Application**: Main emergency detection interface
- **Dashboard**: Real-time zone monitoring and status display
- **Interactive Map**: Visual zone representation with user location
- **Zone Cards**: Detailed zone information and distance calculations

## Data Flow

1. **User Authentication**: Session-based tracking without persistent user accounts
2. **Location Acquisition**: Browser geolocation API with fallback handling
3. **Network Assessment**: Connection quality evaluation for reliability scoring
4. **Zone Calculation**: Distance-based proximity detection using geographic formulas
5. **Real-time Updates**: Continuous zone monitoring with automatic status updates
6. **Emergency Response**: Direct integration with emergency services

## External Dependencies

### Core Technologies
- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **UI Components**: Radix UI primitives for accessible component foundation
- **Geolocation**: Browser Geolocation API for positioning
- **Network Information**: Network Information API for connection analysis

### Development Tools
- **Type Safety**: TypeScript for compile-time error prevention
- **Schema Validation**: Zod for runtime type checking and validation
- **Database Migration**: Drizzle Kit for schema management
- **Code Quality**: ESLint and Prettier for consistent code formatting

## Deployment Strategy

### Development Environment
- **Local Server**: Vite development server with hot module replacement
- **Database**: Environment-based connection string configuration
- **API Integration**: Proxy configuration for seamless frontend-backend communication

### Production Build
- **Frontend**: Static asset generation with Vite build process
- **Backend**: ESBuild bundling for optimized server deployment
- **Database**: Migration-based schema deployment with Drizzle
- **Environment**: NODE_ENV-based configuration switching

### Scalability Considerations
- **Database**: Serverless PostgreSQL for automatic scaling
- **Caching**: In-memory storage implementation with migration path to Redis
- **API**: Stateless design for horizontal scaling capability
- **Frontend**: Static asset deployment with CDN optimization potential

The architecture prioritizes rapid development, type safety, and emergency response reliability while maintaining scalability for future enhancements.