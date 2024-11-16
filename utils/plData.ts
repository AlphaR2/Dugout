import { useState, useEffect } from "react";
import { Match, FormattedMatch, MatchesData } from "../types/football";
import { formatMatchTime } from "./dateUtils";
import axios from "axios";

interface ProcessedMatches {
  live: FormattedMatch[];
  upcoming: FormattedMatch[];
}

interface UseMatchesReturn {
  matchesData: ProcessedMatches;
  currentMatchday: number;
  nextMatchday: number;
  error: string | null;
  isLoading: boolean;
  status: "idle" | "loading" | "success" | "error";
}
type CompetitionCode = "PL" | "PD";

const processMatches = (
  data: MatchesData
): {
  processed: ProcessedMatches;
  currentMatchday: number;
  nextMatchday: number;
} => {
  const now = new Date();
  // Ensure we have matches before accessing the first one

  console.log("MAIN:", data);

  if (!data?.matches || !Array.isArray(data.matches)) {
    throw new Error("Invalid matches data provided");
  }

  // get current Matchday

  const currentMatchday = data.matches[0]?.season?.currentMatchday ?? 1;

  // Find the next matchday by looking at future matches
  const futureMatches = data.matches.filter(
    (match) =>
      new Date(match.utcDate) > now &&
      ["SCHEDULED", "TIMED"].includes(match.status)
  );

  // Find the earliest matchday from future matches
  const nextMatchday =
    futureMatches.length > 0
      ? Math.min(...futureMatches.map((match) => match.matchday))
      : currentMatchday + 1;

  // helper function to format matches
  const formatMatch = (match: Match): FormattedMatch => {
    try {
      const matchTime = formatMatchTime(match.utcDate);

      return {
        id: match.id,
        homeTeam: {
          name: match.homeTeam.name,
          shortName: match.homeTeam.shortName,
          crest: match.homeTeam.crest,
          score: match.score.fullTime.home,
        },
        awayTeam: {
          name: match.awayTeam.name,
          shortName: match.awayTeam.shortName,
          crest: match.awayTeam.crest,
          score: match.score.fullTime.away,
        },
        status: match.status,
        utcDate: match.utcDate,
        matchday: match.matchday,
        formattedDate: matchTime.date,
        formattedTime: matchTime.time,
        isToday: matchTime.isToday,
      };
    } catch (error) {
      console.error(`Error formatting match ${match.id}:`, error);
      throw error;
    }
  };

  let result: ProcessedMatches = {
    live: [],
    upcoming: [],
  };

  try {
    data.matches.forEach((match) => {
      const formattedMatch = formatMatch(match);
      const matchDate = new Date(match.utcDate);

      if (["LIVE", "IN_PLAY", "PAUSED"].includes(match.status)) {
        result.live.push(formattedMatch);
      }
      // Upcoming matches - all future matches that aren't completed
      else if (
        ["SCHEDULED", "TIMED"].includes(match.status) &&
        matchDate > now &&
        match.matchday === nextMatchday
      ) {
        result.upcoming.push(formattedMatch);
      }
    });
  } catch (error) {
    console.error("Error processing matches:", error);
    console.error("Error details");
    throw error;
  }

  console.log("upcoming:", result.upcoming);
  console.log("Live", result.live);

  // Sort matches by date/time
  const sortByDate = (a: FormattedMatch, b: FormattedMatch) =>
    new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();

  result.live.sort(sortByDate);
  result.upcoming.sort(sortByDate);

  return {
    processed: result,
    currentMatchday,
    nextMatchday,
  };
};

export const useMatches = (
  competitionCode: CompetitionCode
): UseMatchesReturn => {
  const [matchesData, setMatchesData] = useState<ProcessedMatches>({
    live: [],
    upcoming: [],
  });
  const [currentMatchday, setCurrentMatchday] = useState<number>(0);
  const [nextMatchday, setNextMatchday] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const fetchData = async () => {
    try {
      setStatus("loading");
      setError(null);
      setIsLoading(true);

      const response = await axios.get<MatchesData>(
        `/api/competitions/${competitionCode.toLowerCase()}`
      );

      console.log(response);
      const {
        processed,
        currentMatchday: current,
        nextMatchday: next,
      } = processMatches(response.data);

      setMatchesData(processed);
      setCurrentMatchday(current);
      setNextMatchday(next);
      setStatus("success");
    } catch (err: any) {
      console.error("Error fetching data:", err);

      if (axios.isAxiosError(err)) {
        const errMsg =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch matches";
        console.error("Error Details:", {
          status: err.response?.status,
          statusText: err.response?.statusText,
          message: errMsg,
        });
        setError(errMsg);
      } else {
        setError("An unexpected error occurred");
      }
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Update matches every 24 hrs  to respect API rate limits (ps: make the live checker to refresh more)
    const interval = setInterval(() => {
      fetchData();
    }, 86400000);

    return () => {
      clearInterval(interval);
      setMatchesData({
        live: [],
        upcoming: [],
      });
      setCurrentMatchday(0);
      setNextMatchday(0);
      setError(null);
      setIsLoading(false);
      setStatus("idle");
    };
  }, [competitionCode]);

  return {
    matchesData,
    currentMatchday,
    nextMatchday,
    error,
    isLoading,
    status,
  };
};
