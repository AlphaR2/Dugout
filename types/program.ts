// types/dugout.ts
import { BN } from "@project-serum/anchor";

export type Status = "Created" | "Active" | "ClaimingOpen" | "Closed";

export interface LeagueGroups {
  groupId: string;
  creator: string;
  entryFee: BN;
  memberCount: number;
  memberAddresses: string[];
  matchWeek: number;
  status: Status;
  balance: BN;
  positions: number[];
  claimsBitmap: number;
  claimingStartTime: BN;
  vaultBump: number;
  stateBump: number;
}

export interface User {
  address: string;
  points: BN;
  hasClaimed: boolean;
  groupId: string;
  userBump: number;
}

export interface ProgramConfig {
  admin: string;
  treasuryWallet: string;
  totalGroupsCreated: BN;
  totalVolumeProcessed: BN;
  totalUniquePlayers: BN;
  treasuryBalance: BN;
  paused: boolean;
  configBump: number;
}
