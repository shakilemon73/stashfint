# Stush Fintech Mobile App

## Overview

Stush is a mobile-first fintech application designed to help users track their work hours, monitor their wage balance in real-time, and manage their earnings. The app focuses on creating an engaging, reward-focused experience where users can watch their balance grow as they work, request early access to earned wages, and view their financial activity.

The application features a dark-mode-exclusive interface with vibrant gold and green accents, drawing inspiration from modern fintech apps like Cash App, Robinhood, and Chime. It emphasizes "living data" - numbers and metrics that feel dynamic rather than static - with animations and micro-interactions that reinforce the feeling of money and time in motion.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, built using Vite for fast development and optimized production builds.

**Routing**: Wouter for lightweight client-side routing.

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. No global state management library is used - component state is managed locally with React hooks.

**UI Component Library**: Radix UI primitives wrapped with custom styling via shadcn/ui pattern. All components follow a consistent design system with variants defined using class-variance-authority (CVA).

**Styling Approach**: 
- Tailwind CSS with extensive custom configuration
- Dark mode exclusively (no light mode toggle)
- Custom CSS variables for theming in HSL color space
- Mobile-first responsive design (max-width: 100vw, native mobile only)
- Custom utility classes for elevation effects (`hover-elevate`, `active-elevate-2`)
- Typography using Inter (body) and Space Grotesk (display/headings) from Google Fonts

**Design Philosophy**: The app implements 10 world-class UX/UI design philosophies including Don Norman's affordances and feedback, Steve Krug's scannable hierarchy, and Luke Wroblewski's mobile-first principles. Every interactive element has clear visual states, immediate feedback, and follows accessibility best practices with ARIA labels and appropriate touch targets (minimum 48-64px).

**Animation Strategy**: 
- Framer Motion for complex animations (ClockToMoneyAnimation component)
- CSS transitions for micro-interactions
- Real-time clock displays
- Animated balance counting effects
- Pulsing indicators for active states

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js.

**Module System**: ES Modules (type: "module" in package.json).

**Request Handling**: 
- JSON body parsing middleware
- URL-encoded form parsing
- Custom logging middleware that captures request duration and response data
- Error handling middleware with status code normalization

**Development Setup**: Vite middleware integration in development mode with HMR support over the same HTTP server.

**Storage Interface**: Abstract storage interface (`IStorage`) currently implemented with in-memory storage (`MemStorage`) using JavaScript Maps. The interface is designed to be swapped with a database implementation (likely PostgreSQL via Drizzle ORM based on configuration).

**API Structure**: Routes are registered via a centralized `registerRoutes` function. All application routes are prefixed with `/api`. The storage interface is injected for CRUD operations.

### Data Storage

**ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless driver.

**Schema Definition**: Located in `shared/schema.ts` using Drizzle's schema builder with Zod integration for validation.

**Current Schema**:
- `users` table with UUID primary key, username (unique), and password fields
- Validation schemas created with `drizzle-zod` for type-safe inserts

**Migration Strategy**: Drizzle Kit configured to output migrations to `./migrations` directory with push-based workflow (`db:push` script).

**Database Connection**: Expects `DATABASE_URL` environment variable. Configuration throws error if not provided, ensuring database provisioning.

**Shared Types**: Database schemas and types are exported from `shared/schema.ts` and imported by both client and server for type safety across the stack.

### Build & Deployment

**Development**: 
- Server runs with `tsx` for TypeScript execution
- Vite dev server with HMR integrated into Express
- Custom error overlay via Replit plugins
- Source maps preserved for debugging

**Production Build**:
1. Client build: Vite bundles React app to `dist/public`
2. Server build: esbuild bundles server code to `dist/index.js` as ESM
3. Runtime: Node.js executes bundled server which serves static client files

**Path Aliases**: 
- `@/*` maps to `client/src/*`
- `@shared/*` maps to `shared/*`
- `@assets/*` maps to `attached_assets/*`

### Accessibility & Best Practices

**ARIA Support**: All interactive components include appropriate ARIA labels, roles, and states.

**Keyboard Navigation**: Focus management with visible focus rings and logical tab order.

**Touch Targets**: Minimum sizes enforced for mobile usability (48-64px as per design guidelines).

**Semantic HTML**: Proper use of semantic elements (nav, header, button) with role attributes where appropriate.

**Screen Reader Support**: Text alternatives for visual indicators (e.g., balance amounts, status indicators).

## External Dependencies

### Core Framework Dependencies
- **React 18**: UI framework with hooks-based architecture
- **React DOM**: React rendering for web
- **TypeScript**: Type safety across entire codebase
- **Vite**: Build tool and dev server
- **Express**: Backend HTTP server
- **Wouter**: Lightweight routing library

### UI Component Libraries
- **Radix UI**: 20+ accessible component primitives (@radix-ui/react-*)
- **Lucide React**: Icon library with consistent styling
- **Framer Motion**: Animation library for complex transitions
- **class-variance-authority**: Type-safe variant management
- **clsx & tailwind-merge**: Conditional className utilities
- **cmdk**: Command palette component

### Data & State Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management (@hookform/resolvers)
- **Zod**: Runtime type validation
- **Drizzle Zod**: Integration between Drizzle ORM and Zod

### Database & ORM
- **Drizzle ORM**: Type-safe SQL query builder
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **Drizzle Kit**: Schema management and migrations

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing pipeline
- **Autoprefixer**: Vendor prefix automation

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **@replit/vite-plugin-***: Replit-specific development plugins (error overlay, cartographer, dev banner)

### Fonts
- **Google Fonts**: Inter (body text) and Space Grotesk (display/headings) loaded via CDN

### Date/Time
- **date-fns**: Modern date utility library

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express (configured but not actively used yet)

### Build Utilities
- **@jridgewell/trace-mapping**: Source map support
- **nanoid**: Unique ID generation