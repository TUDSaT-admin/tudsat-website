import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

type PrismicWebhookBody = {
  type?: string;
  secret?: string | null;
  documents?: string[];
};

/**
 * Purges Prismic content from the Next.js Data Cache when Prismic sends a webhook.
 * Configure the same secret in Prismic (Settings → Webhooks) and as PRISMIC_WEBHOOK_SECRET.
 */
export async function POST(request: Request) {
  const expectedSecret = process.env.PRISMIC_WEBHOOK_SECRET;

  let body: PrismicWebhookBody = {};
  try {
    body = (await request.json()) as PrismicWebhookBody;
  } catch {
    // Prismic test triggers or misconfigured callers may send an empty body.
  }

  if (expectedSecret) {
    if (body.secret !== expectedSecret) {
      return NextResponse.json({ error: "Invalid webhook secret" }, { status: 401 });
    }
  }

  revalidateTag("prismic", "max");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    type: body.type ?? null,
    documents: body.documents?.length ?? 0,
  });
}
