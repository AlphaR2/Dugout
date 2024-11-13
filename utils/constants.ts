export const POSITIONS = {
  GK: "Goalkeeper",
  DEF: "Defender",
  MID: "Midfielder",
  FWD: "Forward",
} as const;

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