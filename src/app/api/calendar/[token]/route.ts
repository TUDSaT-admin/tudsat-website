import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const response = await fetch(
    `https://cloud.bvsr.space/remote.php/dav/public-calendars/${token}/?export`,
  );
  if (response.status !== 200) {
    console.error("Error fetching calendar data", response.status);
    return new Response("Not Found", { status: 404 });
  }
  const data = await response.text();
  return new Response(data, {
    headers: {
      "Content-Type": "text/calendar",
    },
  });
}
