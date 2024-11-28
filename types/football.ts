// Base interfaces
export interface Area {
  id: number;
  name: string;
  code: string;
  flag?: string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Score {
  winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
  duration: "REGULAR" | "EXTRA_TIME" | "PENALTIES";
  fullTime: {
    home: number | null;
    away: number | null;
  };
  halfTime: {
    home: number | null;
    away: number | null;
  };
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: null | string;
}

// Match-related interfaces
export interface Match {
  id: number;
  utcDate: string;
  status:
    | "SCHEDULED"
    | "TIMED"
    | "LIVE"
    | "IN_PLAY"
    | "PAUSED"
    | "FINISHED"
    | "POSTPONED"
    | "SUSPENDED"
    | "CANCELLED";
  matchday: number;
  stage: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  season: Season;
  area: Area;
  competition: Competition;
}

export interface FormattedMatch {
  id: number;
  homeTeam: {
    name: string;
    shortName: string;
    crest: string;
    score: number | null;
  };
  awayTeam: {
    name: string;
    shortName: string;
    crest: string;
    score: number | null;
  };
  status: string;
  utcDate: string;
  matchday: number;
  formattedDate: string;
  formattedTime: string;
  isToday: boolean;
}

// Competition-related interfaces
export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  currentSeason: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  };
}

// Response and processed data interfaces
export interface MatchesResponse {
  filters: {
    season: string;
  };
  competition: Competition;
  matches: Match[];
}

export interface ProcessedMatches {
  live: FormattedMatch[];
  upcoming: FormattedMatch[];
}

export interface MatchesData {
  matches: Match[];
  competition: Competition;
}

export interface NotificationState {
  message: string;
  status: "success" | "error";
  show: boolean;
}

export interface ClubData {
  clubName: string;
  coachName: string; // username
  clubSlugName: string;
  abbreviation: string;
  slogan: string;
  primaryColor: string;
  favClub: string[];
}

export interface ValidationErrors {
  clubName?: string;
  coachName?: string;
  abbreviation?: string;
  favClub?: string;
}

export interface OnboardResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: string;
      clubName: string;
      clubAbbrev: string;
      clubColor: string;
    };
  };
}

export interface Player {
  id: number;
  name: string;
  position: string;
  club: {
    name: string;
    crest: string;
  };
  dateOfBirth: string;
  nationality: string;
}

export interface TeamData {
  id: number;
  shortName: string;
  crest: string;
  squad: Player[];
}

export interface TeamsDataResponse {
  teams: Array<{
    id: number;
    shortName: string;
    crest: string;
    squad: Player[];
  }>;
}

export interface UsePlayersReturn {
  players: Player[];
  isLoading: boolean;
  error: string | null;
}

export enum Position {
  GK = "Goalkeeper",
  RB = "Right-Back",
  CB = "Centre-Back",
  DF = "Defence",
  LB = "Left-Back",
  DM = "Defensive Midfield",
  CM = "Central Midfield",
  AM = "Attacking Midfield",
  RW = "Right Winger",
  LW = "Left Winger",
  CF = "Centre-Forward",
  ST = "Offence",
}

export const POSITION_ORDER: Record<Position, number> = {
  [Position.GK]: 1,
  [Position.RB]: 2,
  [Position.CB]: 3,
  [Position.DF]: 3,
  [Position.LB]: 4,
  [Position.DM]: 5,
  [Position.CM]: 6,
  [Position.AM]: 7,
  [Position.RW]: 8,
  [Position.LW]: 9,
  [Position.CF]: 10,
  [Position.ST]: 11,
};

export interface PlayerWithClub {
  id: number;
  name: string;
  position: Position;
  club: {
    name: string;
    crest: string;
  };
}

export interface Posting {
  id: number;
  x: number;
  y: number;
  role: string;
  player: Player | null;
}

export interface Formation {
  positions: Posting[];
}

// utils/formations.ts
export const FORMATION_442: Formation = {
  positions: [
    { id: 1, x: 50, y: 85, role: "GK", player: null },
    { id: 2, x: 20, y: 65, role: "LB", player: null },
    { id: 3, x: 40, y: 65, role: "CB", player: null },
    { id: 4, x: 60, y: 65, role: "CB", player: null },
    { id: 5, x: 80, y: 65, role: "RB", player: null },
    { id: 6, x: 20, y: 40, role: "LM", player: null },
    { id: 7, x: 40, y: 40, role: "CM", player: null },
    { id: 8, x: 60, y: 40, role: "CM", player: null },
    { id: 9, x: 80, y: 40, role: "RM", player: null },
    { id: 10, x: 35, y: 15, role: "ST", player: null },
    { id: 11, x: 65, y: 15, role: "ST", player: null },
  ],
};
