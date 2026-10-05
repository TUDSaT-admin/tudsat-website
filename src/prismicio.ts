import {
  createClient as baseCreateClient,
  type ClientConfig,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import prismicConfig from "../prismic.config.json";

/**
 * Active repository / environment domain.
 * `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` is set by `npx prismic env set <domain>` for staging.
 * @see https://prismic.io/docs/environments
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || prismicConfig.repositoryName;

/**
 * Creates a Prismic client for querying the Content API.
 * Uses a server-only access token — never expose it with NEXT_PUBLIC_*.
 */
export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes: prismicConfig.routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
