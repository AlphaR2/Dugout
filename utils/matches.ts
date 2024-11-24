import { useState, useEffect } from "react";
import axios from "axios";
import { formatMatchTime } from "./dateUtils";
import { MatchesResponse, Match, FormattedMatch } from "../types/football";

export type CompetitionCode = "PL" | "PD";

export const useLiveMatches = (competitionCode?: CompetitionCode) => {
  const [matches, setMatches] = useState<FormattedMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<MatchesResponse>(
        "/api/competitions/matches"
      );

      const data = response.data.matches;

      console.log("NEW SET MATCHES:", data);

      const filteredMatches = response.data.matches.filter(
          (match) =>
            (!competitionCode &&
              (match.competition.code === "PL" ||
                match.competition.code === "PD")) ||
            match.competition.code === competitionCode
        )
        .map(formatMatch)
        .sort(
          (a, b) =>
            new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
        );

      setMatches(filteredMatches);

      console.log("NEW SET MATCHES:", matches);
    } catch (err) {
      console.error("Failed to fetch matches:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch matches");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, [competitionCode]);

  return { matches, isLoading, error };
};
