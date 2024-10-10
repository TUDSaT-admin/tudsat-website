# TUDSaT Public Website

Welcome to the public website of the Technische Universität Darmstadt Space Technology (TUDSaT). This project is built using [Next.js](https://nextjs.org/) and powered by [Bun](https://bun.sh/), [Prismic](https://prismic.io/) as the CMS, and styled with [TailwindCSS](https://tailwindcss.com/) and [Shadcn/ui](https://ui.shadcn.com/). The website serves to showcase our projects, events, and team members.

![Screenshot of the Website](./public/preview.png)

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prismic & Slices](#prismic--slices)
- [Deployment](#deployment)
- [Webhook Setup for Prismic & Vercel](#webhook-setup-for-prismic--vercel)
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

5. Start the development server, including Prismic Slice Machine:
    ```bash
    bun dev
    ```

The website will be available at `http://localhost:3000`, and the Prismic Slice Machine will be available for managing slices.

## Environment Variables

To access the content from Prismic, you need to set up environment variables:

1. Create a `.env.local` file at the root of your project:
    ```bash
    touch .env.local
    ```

2. Inside the `.env.local` file, add the following environment variable:
    ```
    NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN=your-access-token-here
    ```

    You can find your Prismic access token in the Prismic dashboard under **Settings > API & Security**. Copy the access token and paste it into the `.env.local` file.

3. For production deployment, make sure to add the `NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN` environment variable in your deployment platform (such as Vercel) under the project's environment settings.

4. All environment variables used in the project are listed in the `.env.example` file for reference.

## Scripts

Here are the key scripts you can run:

- **Development**:
    ```bash
    bun dev
    ```
    Runs the development server for the website and launches the Prismic Slice Machine.

- **Build**:
    ```bash
    bun build
    ```
    Builds the application for production.

- **Start**:
    ```bash
    bun start
    ```
    Starts the production build.

- **Lint**:
    ```bash
    bun lint
    ```
    Runs ESLint to check for code issues.

- **Format**:
    ```bash
    bun format
    ```
    Formats the code using [Biome](https://biomejs.dev/).

- **Slice Machine**:
    ```bash
    bun slicemachine
    ```
    Starts the Prismic Slice Machine independently.

## Technologies Used

- **[Next.js](https://nextjs.org/)**: React framework for server-side rendering and static site generation.
- **[Bun](https://bun.sh/)**: A fast all-in-one JavaScript runtime.
- **[TailwindCSS](https://tailwindcss.com/)**: A utility-first CSS framework for building custom designs.
  - Example usage in the project:
    ```jsx
    <div className="text-center text-white bg-blue-500 p-4">
      Welcome to TUDSaT!
    </div>
    ```
  - For more details, visit the [TailwindCSS documentation](https://tailwindcss.com/docs).

- **[Shadcn/ui](https://ui.shadcn.com/)**: ShadCN provides reusable and accessible UI components styled with TailwindCSS. Our basic UI building blocks are organized under the `ui` folder.
  
- **[Prismic](https://prismic.io/)**: A headless CMS that allows for content modeling and integration.
  - Example usage in the project:
    ```javascript
    import { createClient } from '../prismicio';

    const client = createClient();
    const doc = await client.getByUID('page', 'homepage');
    ```
  - For more, see the [Prismic documentation](https://prismic.io/docs).

## Project Structure

The project follows a structured layout for better scalability and organization. Here's an overview of the key directories and files:

- **`src/`**: Contains the main application code.
  - **`app/`**: Contains the main pages, layouts, and APIs.
    - **`[uid]/`**: Dynamic routes for Prismic documents.
    - **`slice-simulator/`**: Related to the Slice Machine.
    - **`globals.css`**: Global CSS styles.
    - **`layout.tsx`**: Main layout component.
    - **`page.tsx`**: The homepage component.
  - **`components/`**: Contains custom React components used throughout the project.
    - **`ui/`**: Contains reusable UI components built with [Shadcn/ui](https://ui.shadcn.com/) (e.g., button, card, dialog).
    - **`slices/`**: Important! This is where we define Prismic slices, which are individual sections of a page. These are generated from the Prismic Slice Machine and then customized in code.
  - **`lib/`**: Contains helper functions and utilities.
  - **`hooks/`**: Contains custom hooks used throughout the project.
  - **`config/`**: Configuration files for the website.
  - **`public/`**: Static assets such as images and icons.

### Prismic & Slices

This project relies heavily on Prismic's [Slice Machine](https://prismic.io/docs/technologies/slice-machine), a tool that allows you to create and manage dynamic content slices.

#### Slices

**Slices** are reusable sections of a page, allowing you to build dynamic and flexible UIs. Each slice corresponds to a section of content, such as a "hero section" or "testimonial section". In our project, slices are located in the `slices/` folder and are created using the Prismic Slice Machine.

Slices are first added via the Slice Machine UI, then customized directly in the code.

#### Slice Machine

The **Slice Machine** is a UI tool integrated into our development process that allows us to create and manage slices within Prismic.

To work with the Slice Machine, follow these steps:

1. Start the Slice Machine:
    ```bash
    bun dev
    ```
2. Open the Slice Machine at `http://localhost:9999` to manage and create slices.
3. After creating a new slice, you'll find it in the `slices/` directory. Customize its React component as needed to fit the website design.

For more information on how to create and customize slices, refer to the [official Slice Machine documentation](https://prismic.io/docs/technologies/slice-machine).

## Deployment

The project is continuously deployed on [Vercel](https://vercel.com/).

- Public URL: [https://tudsat.space](https://tudsat.space)
- After every push to the main branch, the site is automatically redeployed.

For more information on how to deploy Next.js apps to Vercel, check the [official Vercel docs](https://vercel.com/docs/concepts/deployments).

## Webhook Setup for Prismic & Vercel

To ensure that changes made in Prismic automatically trigger a deployment on Vercel, you will need to set up a webhook in Prismic. This is a one-time setup that connects Prismic to the deployment pipeline.

Refer to the official [Prismic Webhooks Documentation](https://prismic.io/docs/webhooks) for detailed steps on how to create and configure the webhook with Vercel.

Once configured, the website will automatically redeploy every time content is updated in Prismic.

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
