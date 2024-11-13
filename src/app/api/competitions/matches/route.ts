import { NextResponse } from "next/server";
const API_TOKEN: any = process.env.NEXT_PUBLIC_FOOTBALL_API_TOKEN;
const BASE_URL = "https://api.football-data.org/v4";
// https://api.football-data.org/v4/matches

export async function GET(request: Request) {
  try {
    const response = await fetch(`${BASE_URL}/matches`, {
      headers: {
        "X-Auth-Token": API_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch matches data" },
      { status: 500 }
    );
  }
}
