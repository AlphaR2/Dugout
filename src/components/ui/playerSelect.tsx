import { Player, FORMATION_442, Position } from "../../../types/football";
import { usePlayers } from "../../../utils/teams";
import { useState } from "react";


export const FormationView: React.FC<{
  selectedPlayers: Player[];
  onRemovePlayer?: (playerId: number) => void;
}> = ({ selectedPlayers, onRemovePlayer }) => {
  const formation = FORMATION_442;

  return (
    <div className="relative w-full h-full">
      {formation.positions.map((pos) => {
        const player = selectedPlayers.find((p) =>
          p.position.includes(pos.role)
        );

        return (
          <div
            key={pos.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {player ? (
              <div className="relative group">
                <div className="w-12 h-12 rounded-full bg-[#14213d] flex items-center justify-center">
                  <img
                    src={player.club.crest}
                    alt={player.club.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                    {player.name}
                  </span>
                </div>
                {onRemovePlayer && (
                  <button
                    onClick={() => onRemovePlayer(player.id)}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                )}
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white/50 text-sm">{pos.role}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const PlayersList: React.FC<{
  selectedPlayers: Player[];
  onSelectPlayer: (player: Player) => void;
}> = ({ selectedPlayers, onSelectPlayer }) => {
  const { players, isLoading } = usePlayers("PL");
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState<string | null>(null);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPosition =
      !positionFilter || player.position.includes(positionFilter);
    return matchesSearch && matchesPosition;
  });

  const isSelected = (playerId: number) =>
    selectedPlayers.some((p) => p.id === playerId);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search players..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 bg-[#000a16] text-white rounded-lg"
      />

      <div className="flex flex-wrap gap-2">
        {[
          Position.GK,
          Position.CB,
          Position.LB,
          Position.RB,
          Position.DF,
          Position.DM,
          Position.CM,
          Position.AM,
          Position.LW,
          Position.RW,
          Position.CF,
          Position.ST,

          // Position
        ].map((pos: any) => (
          <button
            key={pos}
            onClick={() =>
              setPositionFilter(pos === positionFilter ? null : pos)
            }
            className={`px-3 py-1 rounded-lg ${
              pos === positionFilter
                ? "bg-[#fca311] text-black"
                : "bg-[#000a16] text-white"
            }`}
          >
            {pos}
          </button>
        ))}
      </div>

      <div className="h-[500px] overflow-y-auto space-y-2">
        {filteredPlayers.map((player) => (
          <div
            key={player.id}
            onClick={() => !isSelected(player.id) && onSelectPlayer(player)}
            className={`
              flex items-center gap-4 p-3 rounded-lg cursor-pointer
              ${
                isSelected(player.id)
                  ? "bg-[#fca311]/20 ring-1 ring-[#fca311]"
                  : "bg-[#000a16] hover:bg-[#000a16]/80"
              }
            `}
          >
            <img
              src={player.club.crest}
              alt={player.club.name}
              className="w-10 h-10 object-contain"
            />
            <div>
              <div className="text-white font-medium">{player.name}</div>
              <div className="text-sm text-gray-400">
                {player.position} • {player.club.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
