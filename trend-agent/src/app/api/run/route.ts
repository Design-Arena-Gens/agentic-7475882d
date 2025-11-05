import { NextResponse } from "next/server";
import { z } from "zod";
import { runTrendPipeline } from "@/lib/pipeline";
import { DEFAULT_KEYWORDS, DEFAULT_YOUTUBE_QUERIES } from "@/lib/constants";

const payloadSchema = z.object({
  primaryQuery: z.string().default("Pune OR PCMC real estate"),
  keywords: z.array(z.string()).default(DEFAULT_KEYWORDS),
  lookbackDays: z.number().min(1).max(60).default(7),
  youtubeQueries: z.array(z.string()).default(DEFAULT_YOUTUBE_QUERIES),
});

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => ({}));
    const payload = payloadSchema.parse(json);

    const result = await runTrendPipeline({
      primaryQuery: payload.primaryQuery,
      keywords: payload.keywords,
      lookbackDays: payload.lookbackDays,
      youtubeQueries: payload.youtubeQueries,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid payload", details: error.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: (error as Error).message ?? "Unknown error" },
      { status: 500 },
    );
  }
}
