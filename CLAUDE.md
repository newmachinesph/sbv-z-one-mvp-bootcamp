# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SBV Z-One MVP Bootcamp platform (`z1.sbv.one`) — a Next.js web app for managing a 12-week startup bootcamp in the Philippines. Teams of 4 (Hacker, Hustler, Hipster, Hound — the "4H framework") build products together. The platform handles applications, team management, curriculum, leaderboards, challenges, and an admin panel.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (flat config, Next.js core-web-vitals + typescript)
npm run seed         # Seed database: npx tsx prisma/seed.ts
npx prisma generate  # Regenerate Prisma client after schema changes
npx prisma migrate dev --name <name>  # Create and apply a migration
npx prisma studio    # Open Prisma Studio GUI for the database
```

## Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript (strict mode)
- **Database**: PostgreSQL via Prisma ORM (v7) with `@prisma/adapter-pg` driver adapter
- **Auth**: NextAuth v4 with credentials provider (JWT strategy). Two user types: `admin` (Admin table) and `member` (TeamMember table). Passwords hashed with bcryptjs.
- **UI**: Tailwind CSS v4, shadcn/ui components (Radix primitives), Lucide icons, Manrope + Geist Mono fonts
- **File uploads**: UploadThing (team avatars, pitch decks, documents)
- **CSS theme**: Amber/gold color palette with custom CSS variables (`--color-sbv-*`), glass morphism utilities, and custom animations in `globals.css`

## Architecture

### Path alias
`@/*` maps to `./src/*` (configured in tsconfig.json).

### Key directories
- `src/app/` — Next.js App Router pages and API routes
- `src/lib/` — Shared utilities: Prisma client, data access layer, auth helpers, types
- `src/components/ui/` — shadcn/ui primitives (button, card, dialog, etc.)
- `src/components/` — App-level components (navbar, footer, session-provider)
- `prisma/` — Schema, migrations, seed script

### Data layer pattern
All database reads go through `src/lib/data.ts` which wraps Prisma queries and maps DB enums (UPPERCASE) to display format (lowercase). The Prisma client singleton lives in `src/lib/prisma.ts` with global caching for development hot-reload. Validation and enum helpers are in `src/lib/validations.ts`.

### Auth flow
- Auth config is defined in `src/lib/auth-options.ts` and exported as `authOptions`
- Server-side auth helpers (`getSession`, `requireAuth`, `requireAdmin`, `requireMember`) are in `src/lib/auth.ts`
- NextAuth session types are augmented in `src/types/next-auth.d.ts` to include `role` and `teamId`
- Client-side session access uses the `SessionProvider` wrapper in root layout

### Page structure
- **Public pages**: `/` (landing), `/teams`, `/leaderboard`, `/curriculum`, `/apply`, `/quiz`, `/terms`, `/privacy`
- **Member pages**: `/dashboard` (team member view)
- **Admin pages**: `/admin` (login), `/admin/dashboard`, `/admin/applications`, `/admin/teams` — all behind admin layout with sidebar
- **API routes**: `/api/auth/[...nextauth]`, `/api/teams`, `/api/leaderboard`, `/api/curriculum`, `/api/challenges`, `/api/apply`, `/api/dashboard`, `/api/admin/*`, `/api/uploadthing`

### Client/server component pattern
Pages that need interactivity use a pattern of a thin server `page.tsx` that renders a `*-content.tsx` client component (e.g., `dashboard/page.tsx` + `dashboard/dashboard-content.tsx`).

## Environment Variables

Required in `.env` (see `.env.example` for all variables):
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — NextAuth JWT secret
- `NEXTAUTH_URL` — App URL (e.g., `http://localhost:3000`)
- `UPLOADTHING_TOKEN` — UploadThing API token
- `MAIL_SERVER`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD` — SMTP email config
- `MAIL_FROM`, `MAIL_FROM_NAME`, `MAIL_SSL_TLS` — Email sender config
- `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` — PostHog analytics (optional)
- `ADMIN_SEED_PASSWORD`, `MEMBER_SEED_PASSWORD` — Required for `npm run seed`

## Prisma Notes

- Enums (`TeamStatus`, `MemberRole`, `ApplicantStatus`) are stored UPPERCASE in the DB and displayed lowercase in the UI
- The `prisma/` directory is excluded from TypeScript compilation (see tsconfig.json `exclude`)
- After any schema change: run `npx prisma migrate dev` then `npx prisma generate`
