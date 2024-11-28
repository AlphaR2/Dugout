"use client";

import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, AnchorProvider, setProvider, BN } from "@coral-xyz/anchor";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from "../../../utils/idl/idl.json";
import { Dugout } from "../../../utils/config/program";

interface UserJoinedEvent {
  groupId: string;
  user: PublicKey;
  entryAmount: BN;
  memberCount: number;
  isGroupFull: boolean;
  timestamp: BN;
}

interface GroupCreatedEvent {
  groupId: string;
  creator: PublicKey;
  entryFee: BN;
  matchWeek: number;
  vault: PublicKey;
  timestamp: BN;
}

export const useGroupProgram = () => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [program, setProgram] = useState<any>();
  const [isInitialized, setIsInitialized] = useState(false);

  const PROGRAM_ID = new PublicKey(idl.address);

  // Helper function to get PDAs
  const PDAs = {
    getProgramConfig: () =>
      PublicKey.findProgramAddressSync([Buffer.from("config")], PROGRAM_ID)[0],

    getGroupState: (groupId: string) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from("group"), Buffer.from(groupId)],
        PROGRAM_ID
      )[0],

    getVaultPDA: (groupState: PublicKey) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), groupState.toBuffer()],
        PROGRAM_ID
      )[0],

    getUserState: (groupId: string, userPubkey: PublicKey) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from("user"), Buffer.from(groupId), userPubkey.toBuffer()],
        PROGRAM_ID
      )[0],
  };

  // Initialize program
  useEffect(() => {
    if (!wallet || !connection) return;

    try {
      const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
      });
      setProvider(provider);

      const program = new Program(idl as Dugout, provider);
      setProgram(program);
    } catch (error) {
      console.error("Error initializing program:", error);
      toast.error("Failed to initialize program");
    }
  }, [wallet, connection]);

  const createGroup = async (
    groupId: string,
    entryFee: number,
    matchWeek: number
  ): Promise<string> => {
    if (!program || !wallet) {
      throw new Error("Program not initialized or wallet not connected");
    }

    try {
      const leagueGroupState = PDAs.getGroupState(groupId);
      const vault = PDAs.getVaultPDA(leagueGroupState);
      const programConfig = PDAs.getProgramConfig();

      const tx = await program.methods
        .createGroup(groupId, new BN(entryFee), matchWeek)
        .accounts({
          creator: wallet.publicKey,
          leagueGroupState,
          vault,
          programConfig,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const confirmation = await connection.confirmTransaction(tx, "confirmed");
      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      toast.success("Group created successfully!");
      return tx;
    } catch (error: any) {
      console.error("Error creating group:", error);
      toast.error(error.message || "Failed to create group");
      throw error;
    }
  };

  const joinGroup = async (
    groupId: string,
    entryFee: number
  ): Promise<string> => {
    if (!program || !wallet) {
      throw new Error("Program not initialized or wallet not connected");
    }

    try {
      const leagueGroupState = PDAs.getGroupState(groupId);
      const vault = PDAs.getVaultPDA(leagueGroupState);
      const userState = PDAs.getUserState(groupId, wallet.publicKey);
      const programConfig = PDAs.getProgramConfig();

      const tx = await program.methods
        .joinGroup(groupId, new BN(entryFee))
        .accounts({
          user: wallet.publicKey,
          userState,
          leagueGroupState,
          vault,
          programConfig,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const confirmation = await connection.confirmTransaction(tx, "confirmed");
      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      toast.success("Successfully joined group!");
      return tx;
    } catch (error: any) {
      console.error("Error joining group:", error);
      toast.error(error.message || "Failed to join group");
      throw error;
    }
  };

  const claim = async (
    groupId: string,
    points: number,
    position: number
  ): Promise<string> => {
    if (!program || !wallet) {
      throw new Error("Program not initialized or wallet not connected");
    }

    try {
      const leagueGroupState = PDAs.getGroupState(groupId);
      const vault = PDAs.getVaultPDA(leagueGroupState);
      const userState = PDAs.getUserState(groupId, wallet.publicKey);
      const programConfig = PDAs.getProgramConfig();

      const tx = await program.methods
        .claim(groupId, new BN(points), position)
        .accounts({
          user: wallet.publicKey,
          userState,
          leagueGroupState,
          vault,
          programConfig,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const confirmation = await connection.confirmTransaction(tx, "confirmed");
      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      toast.success("Successfully claimed rewards!");
      return tx;
    } catch (error: any) {
      console.error("Error claiming rewards:", error);
      toast.error(error.message || "Failed to claim rewards");
      throw error;
    }
  };

  return {
    program,
    createGroup,
    joinGroup,
    claim,
    isInitialized,
  };
};
