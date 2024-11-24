import { NextResponse } from "next/server";

const API_TOKEN = process.env.NEXT_PUBLIC_FOOTBALL_API_TOKEN!;
const BASE_URL = "https://api.football-data.org/v4";

// Helper function to format date to YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export async function GET() {

  try {
    // Get today's date
    const today = new Date();
    const dateFrom = formatDate(today);

    // You might want to include tomorrow's early matches
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateTo = formatDate(tomorrow);

    // console.log("📅 Date range:", { dateFrom, dateTo });

    const response = await fetch(
      `${BASE_URL}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}&permission=TIER_ONE`,
      {
        headers: {
          "X-Auth-Token": API_TOKEN,
        },
        next: {
          revalidate: 300, // Revalidate every 5 minutes
        },
      }
    );

    // console.log("🔍 Fetching matches with filters:", {
    //   dateFrom,
    //   dateTo,
    //   permission: "TIER_ONE",
    // });

    if (!response.ok) {
      console.error("🚫 API Error Response:", {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Log the matches count by competition
    const matchesByCompetition = data.matches?.reduce(
      (acc: any, match: any) => {
        const competition = match.competition.name;
        acc[competition] = (acc[competition] || 0) + 1;
        return acc;
      },
      {}
    );

    // console.log("✅ Successfully fetched matches:", {
    //   totalMatches: data.matches?.length || 0,
    //   dateRange: `${dateFrom} to ${dateTo}`,
    //   matchesByCompetition,
    //   status: response.status,
    // });

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ API Error:", {
      error,
      token: API_TOKEN ? "Present" : "Missing",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        message: "Failed to fetch matches data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
