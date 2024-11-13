import { useState, useEffect } from "react";
import { Match, FormattedMatch, MatchesData } from "../types/football";
import { formatMatchTime } from "./dateUtils";
import axios, { AxiosError } from "axios";

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

const processMatches = (
  data: MatchesData
): {
  processed: ProcessedMatches;
  currentMatchday: number;
  nextMatchday: number;
} => {
  const now = new Date();
  // Ensure we have matches before accessing the first one
  const currentMatchday = data.matches[0]?.season?.currentMatchday ?? 0;
  const nextMatchday = currentMatchday + 1;

  const formatMatch = (match: Match): FormattedMatch => {
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
  };

  const result: ProcessedMatches = {
    live: [],
    upcoming: [],
  };

  data.matches.forEach((match) => {
    const formattedMatch = formatMatch(match);
    const matchDate = new Date(match.utcDate);

    // Live matches
    if (
      match.status === "LIVE" ||
      match.status === "IN_PLAY" ||
      match.status === "PAUSED"
    ) {
      result.live.push(formattedMatch);
    }
    // Upcoming matches for the next matchday only
    else if (
      (match.status === "SCHEDULED" || match.status === "TIMED") &&
      match.matchday === nextMatchday &&
      matchDate > now
    ) {
      result.upcoming.push(formattedMatch);
    }
  });

  // Sort matches by date/time
  result.live.sort(
    (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
  );
  result.upcoming.sort(
    (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
  );

  return {
    processed: result,
    currentMatchday,
    nextMatchday,
  };
};

type CompetitionCode = "PL" | "PD";

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

    // Update matches every 5 minutes (300000ms) to respect API rate limits
    const interval = setInterval(() => {
      fetchData();
    }, 300000);

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
