# Sathene AI Coding Agent Instructions

## Project Overview

**Sathene** is a unified productivity platform designed to help users manage calendars, tasks, notes, and beyond from a single, cross-platform interface. It features a responsive web app (SvelteKit) and native mobile support (Android via Capacitor) that share components and backend logic for consistency across devices.

**Core technologies**: Svelte 5, SvelteKit 2, tRPC, Hono, Tailwind CSS (v4 with CSS-first config), TypeScript, pnpm workspace, Drizzle ORM, PostgreSQL.

**Key architectural goal**: Each feature (calendar, tasks, notes) is independently developed as a tRPC router on the backend and consumed by shared UI components, allowing seamless scaling and maintenance across platforms.

## Monorepo Structure & Dependencies

### Workspace Layout

```
apps/
  ├── server/      # tRPC + Hono backend (Node.js)
  ├── web/         # SvelteKit web app
  └── mobile/      # SvelteKit + Capacitor Android app
packages/
  ├── db/          # Drizzle ORM + PostgreSQL schemas
  ├── env/         # Centralized environment validation (t3-oss/env-core + Zod)
  ├── ui/          # Shared Svelte components (Button, etc.)
  ├── utils/       # Shared utilities
  └── dayjs/       # Date utilities wrapper
```

### Dependency Patterns

- **Workspace dependencies**: Use `"@sathene/package": "workspace:^"` syntax in package.json
- **Package manager**: pnpm 10.0.0 with monorepo support
- **Build orchestration**: Turbo handles builds in dependency order; see `turbo.json` for task definitions

## Architecture Patterns

### Backend (tRPC + Hono)

1. **Router structure** ([root.ts](apps/server/src/root.ts)): Empty router object `{}` gets populated with procedures
2. **Procedure setup** ([trpc.ts](apps/server/src/trpc.ts)): Initialize tRPC with `SatheneContext`, uses SuperJSON transformer for serialization
3. **Context** ([context.ts](apps/server/src/context.ts)): Extracts auth token from request headers; extend here for DB, services, etc.
4. **Server** ([index.ts](apps/server/src/index.ts)): Hono app with CORS, logger middleware, tRPC mount at `/trpc/*`
5. **Auth pattern**: Token passed via Authorization header, available in context across all procedures

### Frontend (SvelteKit + Svelte 5)

- **Component style**: Svelte 5 runes (`$props()`, `$bindable()`, `$state()`)
- **UI lib** ([packages/ui](packages/ui/src)): Components like `Button` with variant system (via `tailwind-variants`)
- **Button pattern** ([button.svelte](packages/ui/src/components/button/button.svelte)): Polymorphic (accepts both `<a>` and `<button>` props), exports `buttonVariants` and type definitions
- **Utilities** ([utils.ts](packages/ui/src/lib/utils.ts)): `cn()` for class merging (clsx + tailwind-merge), `WithElementRef<T>` type for element bindings

### Database & Configuration

- **Drizzle ORM**: PostgreSQL with snake_case schema ([packages/db](packages/db/src/schema.ts))
- **Env validation** ([packages/env](packages/env/src/index.ts)): Centralized Zod schemas, exported `env` object used by all apps
    - Server vars: `NODE_ENV`, `SERVER_PORT`, `DATABASE_URL`, GitHub/Google OAuth credentials
    - Access via `import { env } from '@sathene/env'`

## Feature Architecture

Sathene organizes features as independent modules, each with its own backend router and shared UI components:

### Feature Router Pattern

Each feature (calendar, tasks, notes) follows this structure:

```
apps/server/src/routers/
  ├── calendar.ts     # tRPC procedures: list, create, update events
  ├── tasks.ts        # tRPC procedures: list, create, complete tasks
  └── notes.ts        # tRPC procedures: list, create, update notes
```

Then merge into root router in `root.ts`:

```typescript
const satheneRouter = router({
    calendar: calendarRouter,
    tasks: tasksRouter,
    notes: notesRouter
})
```

### Database Schema Pattern

Each feature owns its tables in `packages/db/src/schema.ts`:

```typescript
export const events = pgTable('events', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').notNull(),
    title: varchar('title'),
    startTime: timestamp('start_time')
    // ...
})
```

### UI Component Sharing

Feature-specific components live in `packages/ui/src/components/` organized by feature:

```
packages/ui/src/components/
  ├── calendar/
  │   ├── calendar-view.svelte
  │   └── event-card.svelte
  ├── tasks/
  │   ├── task-list.svelte
  │   └── task-item.svelte
  └── button/            # Shared across all features
```

All exported from `packages/ui/src/index.ts` for use in web and mobile apps.

### Adding a New Feature

1. Create backend router in `apps/server/src/routers/feature.ts` with tRPC procedures
2. Define schema tables in `packages/db/src/schema.ts`
3. Add feature-specific UI components in `packages/ui/src/components/feature/`
4. Export components from `packages/ui/src/index.ts`
5. Merge router into `apps/server/src/root.ts`
6. Import and use in `apps/web/src/routes/` and `apps/mobile/src/routes/`

### Commands

```bash
# Root workspace
pnpm dev              # Start all apps in parallel (Turbo, persistent)
pnpm build            # Build all apps respecting dependencies
pnpm format           # Format with Prettier (svelte, imports, tailwind plugins)

# Individual apps (from app directory)
pnpm dev              # Dev server (web/mobile: Vite, server: tsx watch)
pnpm build            # Build (web/mobile: Vite, server: tsc)
```

### Key Files to Know

- **turbo.json**: Task definitions; `build` depends on `^build`, caches outputs, watches `.env*`
- **tsconfig.json** (root): Uses `@total-typescript/tsconfig` preset, extended by each app
- **.env file**: Required for server (DATABASE_URL, OAuth secrets), loaded via dotenv-cli in dev scripts

### Type Safety

- All packages export `.d.ts` types; tRPC client types auto-generated from router
- Button component exports `ButtonProps`, `ButtonVariant`, `ButtonSize` types for consuming apps

## Important Conventions

1. **Shared exports**: Always export from `packages/ui/src/index.ts` for new components
2. **Utility functions**: Add to `packages/ui/src/lib/utils.ts` (cn, WithElementRef pattern)
3. **Component props**: Use `type` keyword for exported prop types, destructure with `$props()`, use `ref = $bindable(null)` for element refs
4. **Styling**: Tailwind CSS (v4.1) with plugins (@tailwindcss/forms, typography, vite); use `cn()` utility for dynamic classes
5. **Server procedures**: All procedures receive `SatheneContext`; extend context object to add services (DB, auth, etc.)
6. **Error handling**: tRPC built-in with Zod validation; use `throw new TRPCError({ code, message })`

## Cross-Component Communication

- **Frontend to backend**: tRPC client auto-generated from `SatheneRouter` type
- **Shared state**: Mobile and web both use SvelteKit, can share components from `@sathene/ui`
- **Types across apps**: Export from `packages/*`, import via `@sathene/*` aliases

## When Making Changes

- **New UI component**: Add to `packages/ui/src/components/*`, export from `packages/ui/src/index.ts`, test in web/mobile apps
- **New procedure**: Add to a router in `apps/server/src/routers/*`, merge into root router
- **Database changes**: Update `packages/db/src/schema.ts`, run migrations (Drizzle kit)
- **Environment variables**: Add to `packages/env/src/index.ts`, define in `.env` file
- **Workspace package changes**: Run `pnpm install` at root to sync lock file

## Debugging Tips

- Check `pnpm list -r` to verify workspace resolution
- Turbo logs: `turbo run dev --verbosity=verbose`
- For server: env vars loaded via `dotenv-cli`, check `.env` exists
- For type errors: Run `pnpm check` in web/mobile or `tsc` in server
