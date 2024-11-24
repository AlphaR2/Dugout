import { NextResponse } from "next/server";
const API_TOKEN = process.env.NEXT_PUBLIC_FOOTBALL_API_TOKEN!;
const BASE_URL = "https://api.football-data.org/v4";
// https://api.football-data.org/v4/matches

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code.toUpperCase();

    // Validate competition code
    if (code !== "PL" && code !== "PD") {
      return NextResponse.json(
        {
          message:
            "Invalid competition code. Use PL for Premier League or PD for La Liga",
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/competitions/${code}/matches`, {
      headers: {
        "X-Auth-Token": API_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch matches data" },
      { status: 500 }
    );
  }
}
