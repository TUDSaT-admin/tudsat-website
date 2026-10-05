# TUDSaT Public Website

Welcome to the public website of the Technische Universität Darmstadt Space Technology (TUDSaT). This project is built using [Next.js](https://nextjs.org/) and powered by [Bun](https://bun.sh/), [Prismic](https://prismic.io/) as the CMS, and styled with [TailwindCSS](https://tailwindcss.com/) and [Shadcn/ui](https://ui.shadcn.com/). The website serves to showcase our projects, events, and team members.

![Screenshot of the Website](./public/preview.png)

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prismic Content Modeling](#prismic-content-modeling)
- [Deployment](#deployment)
- [Webhook Setup](#webhook-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [Contact](#contact)

## Installation

To run this project locally, ensure you have [Node.js](https://nodejs.org/en/) installed. We recommend using a Node version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) for managing your Node.js versions.

### Steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/TUDSaT-admin/tudsat-website
    cd tudsat-website
    ```

2. Install Node.js and Bun:
    - First, ensure Node.js is installed (you can check with `node -v`).
    - Install [Bun](https://bun.sh/):
      ```bash
      curl -fsSL https://bun.sh/install | bash
      ```

3. Install dependencies using Bun:
    ```bash
    bun install
    ```

4. Set up environment variables by following the instructions in the [Environment Variables](#environment-variables) section.

5. Start the development server:
    ```bash
    bun dev
    ```

The website will be available at `http://localhost:3000`.

## Environment Variables

Create a `.env.local` (or `.env`) file at the project root. See `.env.example` for the full list.

| Variable | Required | Purpose |
|---|---|---|
| `PRISMIC_ACCESS_TOKEN` | Yes (if API is private) | Server-only Content API token from **Settings → API & Security**. Never use `NEXT_PUBLIC_*` for this. |
| `PRISMIC_WEBHOOK_SECRET` | Recommended in production | Must match the secret on the Prismic webhook that calls `/api/revalidate`. |
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` | No | Staging/environment domain. Set via `npx prismic env set <domain>` when using [Prismic Environments](https://prismic.io/docs/environments). |

Also add `PRISMIC_ACCESS_TOKEN` (and the webhook secret) in Vercel project environment settings for production/preview.

## Scripts

- **Development**: `bun dev` — Next.js only.
- **Build / Start**: `bun build` / `bun start`
- **Lint / Format**: `bun lint` / `bun format` / `bun format:fix`
- **Prismic models** (requires [Prismic CLI](https://prismic.io/docs/cli) login: `npx prismic login`):
  - `bun prismic:pull` — pull models from Prismic into the repo
  - `bun prismic:push` — push local models to Prismic
  - `bun prismic:types` — regenerate `prismicio-types.d.ts` from local models
  - `bun prismic:status` — show local vs remote model diffs

## Technologies Used

- **[Next.js](https://nextjs.org/)**: React framework for App Router, SSR/SSG, and caching.
- **[Bun](https://bun.sh/)**: Package manager and script runner.
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS.
- **[Shadcn/ui](https://ui.shadcn.com/)**: Reusable UI primitives under `src/components/ui`.
- **[Prismic](https://prismic.io/)**: Headless CMS. Content modeling uses the **Type Builder** + **Prismic CLI** (Slice Machine has been retired in this project).

## Project Structure

- **`src/app/`**: App Router pages, layouts, and API routes (`preview`, `exit-preview`, `revalidate`, `slice-simulator`).
- **`src/components/`**: Shared React components.
- **`src/slices/`**: Slice React components + `model.json` files.
- **`customtypes/`**: Page/custom type models.
- **`prismic.config.json`**: Repository name, slice libraries, simulator URL, and route resolvers.
- **`src/prismicio.ts`**: Prismic client factory (routes, caching, previews, access token).
- **`prismicio-types.d.ts`**: Generated TypeScript types for models.

## Prismic Content Modeling

This project uses Prismic’s [Type Builder](https://prismic.io/docs/type-builder) (cloud UI) and [Prismic CLI](https://prismic.io/docs/cli) instead of Slice Machine.

### Recommended workflow (CLI-first / Git-friendly)

1. Log in once: `npx prismic login`
2. Edit models locally (`customtypes/`, `src/slices/*/model.json`) or in the Type Builder.
3. Sync:
   - After cloud edits: `bun prismic:pull`
   - After local edits: `bun prismic:push`
4. Regenerate types if needed: `bun prismic:types`
5. Implement/adjust slice UI in `src/slices/<Name>/index.tsx`.

Prefer the CLI for branch-based work so models stay tied to Git. Use the Type Builder for inspection and quick admin edits.

### Slice simulator

Live slice previews in the Page Builder use `/slice-simulator`. Register it with:

```bash
npx prismic preview set-simulator http://localhost:3000
```

After deploy, point the simulator URL at production (e.g. `https://tudsat.space`).

### Environments

To fetch from a staging Prismic Environment without editing `prismic.config.json`:

```bash
npx prismic env set <staging-domain>
# later:
npx prismic env unset
```

## Deployment

The project is continuously deployed on [Vercel](https://vercel.com/).

- Public URL: [https://tudsat.space](https://tudsat.space)
- After every push to the main branch, the site is automatically redeployed.

## Webhook Setup

`/api/revalidate` clears the Next.js Data Cache tag `prismic` when content changes.

1. In Prismic: **Settings → Webhooks**, create a webhook pointing at `https://tudsat.space/api/revalidate` (triggers: documents published/unpublished).
2. Set a webhook secret and store the same value as `PRISMIC_WEBHOOK_SECRET` in Vercel.
3. Optionally create the webhook via CLI:
    ```bash
    npx prismic webhook create https://tudsat.space/api/revalidate \
      --trigger documentsPublished \
      --trigger documentsUnpublished
    ```

If you still use a Vercel Deploy Hook for full rebuilds, that can remain in addition to on-demand revalidation.

## Contribution Guidelines

We welcome contributions from everyone! Please follow these guidelines:

### Installing Recommended Extensions

To ensure the development environment is set up properly, it's important to install the recommended workspace extensions in VS Code:
- Open the **Extensions** tab in VS Code.
- In the search bar, type `@recommended` to view and install the recommended extensions (e.g., Biome, Tailwind CSS IntelliSense, GitLens, etc.).

### Code Formatting with Biome

We use [Biome](https://biomejs.dev/) to format the code. To maintain consistency and cleanliness in the codebase:
- **Enable Format on Save**:
    - Go to VS Code settings (`Ctrl + ,`).
    - Search for "Format on Save" and enable it. This will automatically format the code whenever you save a file.

> **Note**: You can also manually format the code before pushing any changes by running:
```bash
bun format
```

### Deployment

Every push to the repository will trigger an automatic deployment to Vercel. Be cautious when pushing code, as the live site will update with every commit.
