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


