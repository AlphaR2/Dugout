"use client";

import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  Program,
  AnchorProvider,
  setProvider,
  BN,
} from "@coral-xyz/anchor";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from "../../../utils/idl/idl.json";
import { Dugout } from "../../../utils/config/program";

export const useGroupProgram = () => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [program, setProgram] = useState<Program<Dugout> | null>(null);

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
        .accountsPartial({
          creator: wallet.publicKey,
          leagueGroupState,
          vault,
          programConfig,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      const latestBlockhash = await connection.getLatestBlockhash();
      const confirmation = await connection.confirmTransaction({
        signature: tx,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      toast.success(tx && "Group created successfully!");
      return tx;
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create group");
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
        .accountsPartial({
          user: wallet.publicKey,
          userState,
          leagueGroupState,
          vault,
          programConfig,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const latestBlockhash = await connection.getLatestBlockhash();
      const confirmation = await connection.confirmTransaction({
        signature: tx,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      toast.success(tx && "Group created successfully!");
      return tx;
    } catch (error) {
      console.error("Error joining group:", error);
      toast.error("Failed to join group");
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
        .accountsPartial({
          user: wallet.publicKey,
          userState,
          leagueGroupState,
          vault,
          programConfig,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const latestBlockhash = await connection.getLatestBlockhash();
      const confirmation = await connection.confirmTransaction({
        signature: tx,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      toast.success("Group created successfully!");
      return tx;
    } catch (error) {
      console.error("Error claiming rewards:", error);
      toast.error("Failed to claim rewards");
      throw error;
    }
  };

  return {
    program,
    createGroup,
    joinGroup,
    claim,
  };
};
