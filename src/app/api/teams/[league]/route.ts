import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

const API_TOKEN = process.env.NEXT_PUBLIC_FOOTBALL_API_TOKEN!;
const BASE_URL = "https://api.football-data.org/v4";

export async function GET(
  request: NextRequest,
  { params }: { params: { league: string } }
) {
  console.log("📡 Fetching teams for league:", params.league);

  try {
    const response = await fetch(
      `${BASE_URL}/competitions/${params.league}/teams`,
      {
        headers: {
          "X-Auth-Token": API_TOKEN,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    console.log("✅ Successfully fetched teams:", {
      competition: data.competition?.name,
      teamCount: data.teams?.length || 0,
      season: data.season?.id,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ API Error:", {
      error,
      competition: params.league,
      token: API_TOKEN ? "Present" : "Missing",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        message: "Failed to fetch teams data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
