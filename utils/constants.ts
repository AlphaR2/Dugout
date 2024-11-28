export const GROUP_TYPES = {
  league: "League",
  cup: "Cup Competition",
  friendly: "Friendly Tournament",
} as const;

export const GROUP_STATUS = {
  active: "Active",
  upcoming: "Upcoming",
  completed: "Completed",
} as const;

export interface GroupFormData {
  name: string;
  entryFee: number;
  matchWeek: number;
}

