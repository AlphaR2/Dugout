import { useState, useEffect } from "react";
import axios from "axios";
import {
  Player,
  Position,
  POSITION_ORDER,
  TeamData,
  PlayerWithClub,
} from "../types/football";

export const usePlayers = (league: "PL" | "PD") => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/teams/${league}`);

        const allPlayers = response.data.teams.flatMap((team: TeamData) =>
          team.squad.map((player) => ({
            id: player.id,
            name: player.name,
            position: player.position as Position,
            club: {
              name: team.shortName,
              crest: team.crest,
            },
          }))
        );

        setPlayers(
          allPlayers.sort((a: PlayerWithClub, b: PlayerWithClub) => {
            const positionDiff =
              POSITION_ORDER[a.position] - POSITION_ORDER[b.position];
            return positionDiff !== 0
              ? positionDiff
              : a.name.localeCompare(b.name);
          })
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch players"
        );
      } finally {
        setIsLoading(false);
      }
    };

    console.log("PLAYERS:", players);

    fetchPlayers();
  }, [league]);

  return { players, isLoading, error };
};
