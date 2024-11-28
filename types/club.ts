export interface Club {
  id?: string;
  name: string;
  abbreviation: string;
  slogan: string;
  primaryColor: string;
  createdAt?: Date;
}

export interface Group {
  id: string;
  name: string;
  type: "league" | "cup" | "friendly";
  status: "active" | "upcoming" | "completed";
  participants: number;
  currentRound?: number;
  startDate: Date;
  endDate?: Date;
}
