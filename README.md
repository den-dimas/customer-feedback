# Outbound Visa Customer Feedback

A Next.js application for collecting and managing customer feedback for visa services. Built with Next.js 15, Supabase for authentication and database, Drizzle ORM, and Bun runtime.

## Features

- User authentication with Supabase Auth
- Customer feedback submission and management
- Real-time feedback polling
- Modern UI with Tailwind CSS and Radix UI
- Form validation with Zod and React Hook Form
- Type-safe database operations with Drizzle ORM

## Prerequisites

- **Node.js**: v20 or higher
- **Bun**: v1.0 or higher (preferred runtime)
- **Docker**: Latest version (for containerization)
- **Git**: Latest version
- **Operating System**: macOS, Linux, or WSL2 on Windows

## Quick Setup

Run the automated setup script:

```bash
bash setup.sh
```

The script will:

- Check your operating system (requires WSL on Windows)
- Verify and install required tools (Git, Bun, Docker)
- Install project dependencies
- Create a `.env` file template if it doesn't exist

## Manual Setup

### 1. Install Dependencies

```bash
bun install
```

### 2. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
NEXT_PUBLIC_FE_DOMAIN=http://localhost:3000
NEXT_PUBLIC_FEEDBACK_POLLING_MS=5000

DATABASE_URL="postgresql://user:password@host:port/database"

SUPABASE_OAUTH_CLIENT_ID=your-supabase-oauth-client-id
SUPABASE_OAUTH_CLIENT_SECRET=your-supabase-oauth-client-secret

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

#### Required Environment Variables:

- `NEXT_PUBLIC_FE_DOMAIN`: Your application's domain URL
- `NEXT_PUBLIC_FEEDBACK_POLLING_MS`: Polling interval for feedback updates (milliseconds)
- `DATABASE_URL`: PostgreSQL connection string for Drizzle ORM
- `SUPABASE_OAUTH_CLIENT_ID`: Supabase OAuth client ID
- `SUPABASE_OAUTH_CLIENT_SECRET`: Supabase OAuth client secret
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Supabase publishable API key
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key

### 3. Database Setup

Run database migrations:

```bash
bun run drizzle-kit push
```

## Development

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The app uses Turbopack for faster development builds and hot module replacement.

## Build

Build for production:

```bash
bun run build
```

Start the production server:

```bash
bun run start
```

## Docker

Run with Docker Compose:

```bash
docker-compose up -d
```

The application will be available at `http://localhost:15723`

## Project Structure

- `/src/app` - Next.js app directory with pages and API routes
- `/src/components` - React components (UI, forms, modals)
- `/src/actions` - Server actions for authentication and feedback
- `/src/services` - Business logic services
- `/src/lib/db` - Database configuration and schema
- `/src/lib/supabase` - Supabase client configurations
- `/src/schemas` - Zod validation schemas
- `/supabase/migrations` - Database migration files
- `/workflows` - n8n workflow JSON files

## Workflow Automation

This project uses n8n for backend automation tasks, such as classifying customer feedback automatically.

- [Setup n8n Automation](docs/N8N.md) - Detailed guide on importing and configuring the workflow.
- [Setup Supabase](docs/SUPABASE.md) - Guide on configuring Database, RLS, and Realtime subscriptions.
- Workflow File: [`workflows/customer-feedback-workflow.json`](workflows/customer-feedback-workflow.json)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: Bun
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (Supabase) with Drizzle ORM
- **Forms**: React Hook Form + Zod
- **Animation**: Framer Motion

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Bun Documentation](https://bun.sh/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
