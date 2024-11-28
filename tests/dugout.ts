import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Dugout } from "../target/types/dugout";
import { assert } from "chai";

describe("Dugout Fantasy League Tests 🎮", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const connection = provider.connection;
  const program = anchor.workspace.Dugout as Program<Dugout>;

  // Test accounts
  const admin = anchor.web3.Keypair.generate();
  const players = Array.from({ length: 8 }, () =>
    anchor.web3.Keypair.generate()
  );
  const groupId = "TEST_GROUP_001";
  const entryFee = 1 * anchor.web3.LAMPORTS_PER_SOL;
  const matchWeek = 1;

  // PDA Helper Functions
  const PDAs = {
    getProgramConfig: () =>
      anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("config")],
        program.programId
      )[0],

    getGroupState: (groupId: string) =>
      anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("group"), Buffer.from(groupId)],
        program.programId
      )[0],

    getVaultPDA: (groupState: anchor.web3.PublicKey) =>
      anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), groupState.toBuffer()],
        program.programId
      )[0],

    getUserState: (groupId: string, userPubkey: anchor.web3.PublicKey) =>
      anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("user"), Buffer.from(groupId), userPubkey.toBuffer()],
        program.programId
      )[0],
  };

  // Get PDAs
  const programConfig = PDAs.getProgramConfig();
  const leagueGroupState = PDAs.getGroupState(groupId);
  const vault = PDAs.getVaultPDA(leagueGroupState);

  // Helper Functions
  const airdropSol = async (
    connection: anchor.web3.Connection,
    publicKey: anchor.web3.PublicKey,
    amountSol: number
  ) => {
    console.log(`📥 Airdropping ${amountSol} SOL to ${publicKey.toString()}`);
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      amountSol * anchor.web3.LAMPORTS_PER_SOL
    );
    await confirm(airdropSignature);
  };

  const confirm = async (signature: string): Promise<string> => {
    const block = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      signature,
      ...block,
    });
    return signature;
  };

  const checkBal = async (address: anchor.web3.PublicKey) => {
    const balance = await connection.getBalance(address);
    console.log(
      `💰 Balance of ${address.toString()}: ${
        balance / anchor.web3.LAMPORTS_PER_SOL
      } SOL`
    );
    return balance;
  };

  const getClaimTestData = (playerIndex: number) => {
    const positions = [1, 2, 3, 4];
    const points = [100, 90, 80, 70];
    return {
      position: positions[playerIndex],
      points: points[playerIndex],
    };
  };

  before(async () => {
    console.log("\n🚀 Starting Test Setup...");

    // Fund accounts
    await airdropSol(connection, admin.publicKey, 2);
    console.log("👑 Admin funded");

    for (let i = 0; i < players.length; i++) {
      await airdropSol(connection, players[i].publicKey, 2);
      console.log(`👤 Player ${i + 1} funded`);
    }

    console.log("\n📊 Initial Balances:");
    await checkBal(admin.publicKey);
    for (let player of players) {
      await checkBal(player.publicKey);
    }
  });

  it("1️⃣ Initialize Program", async () => {
    try {
      console.log("\n🏗️ Initializing Program...");
      console.log("📍 PDAs:", {
        admin: admin.publicKey.toBase58(),
        programConfig: programConfig.toBase58(),
        programId: program.programId.toBase58(),
      });

      const tx = await program.methods
        .initialize()
        .accountsPartial({
          admin: admin.publicKey,
          programConfig,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([admin])
        .rpc();

      const configAccount = await program.account.programConfig.fetch(
        programConfig
      );

      assert.equal(configAccount.admin.toBase58(), admin.publicKey.toBase58());
      assert.equal(configAccount.totalGroupsCreated.toNumber(), 0);
      assert.equal(configAccount.paused, false);

      console.log("✅ Program Initialized:", tx);
    } catch (err) {
      console.error("Initialize Error:", err);
      throw err;
    }
  });

  it("2️⃣ Create Group", async () => {
    try {
      console.log("\n🎮 Creating Group...");

      const tx = await program.methods
        .createGroup(groupId, new anchor.BN(entryFee), matchWeek)
        .accountsPartial({
          creator: players[0].publicKey,
          leagueGroupState,
          vault,
          programConfig,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([players[0]])
        .rpc();

      const groupAccount = await program.account.leagueGroups.fetch(
        leagueGroupState
      );

      assert.equal(groupAccount.groupId, groupId);
      assert.equal(
        groupAccount.creator.toBase58(),
        players[0].publicKey.toBase58()
      );
      assert.equal(groupAccount.entryFee.toNumber(), entryFee);
      assert.equal(groupAccount.memberCount, 0);

      console.log("✅ Group Created:", tx);
    } catch (err) {
      console.error("Create Group Error:", err);
      throw err;
    }
  });

  it("3️⃣ Join Group", async () => {
    for (let i = 0; i < players.length; i++) {
      try {
        const player = players[i];
        const userState = PDAs.getUserState(groupId, player.publicKey);

        console.log(`\n👤 Player ${i + 1} joining...`);

        const balanceBefore = await checkBal(player.publicKey);

        const tx = await program.methods
          .joinGroup(groupId, new anchor.BN(entryFee))
          .accountsPartial({
            user: player.publicKey,
            userState,
            leagueGroupState,
            vault,
            programConfig,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .signers([player])
          .rpc();

        const balanceAfter = await checkBal(player.publicKey);
        const userAccount = await program.account.user.fetch(userState);

        assert.equal(
          userAccount.address.toBase58(),
          player.publicKey.toBase58()
        );
        assert.equal(userAccount.hasClaimed, false);
        assert.isTrue(balanceAfter < balanceBefore);

        console.log(`✅ Player ${i + 1} joined:`, tx);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err) {
        console.error(`Join Error for Player ${i + 1}:`, err);
        throw err;
      }
    }
  });

  it("4️⃣ Claim Prizes and Close", async () => {
    try {
      console.log("\n🏆 Starting Prize Claims...");

      for (let i = 0; i < 4; i++) {
        const player = players[i];
        const userState = PDAs.getUserState(groupId, player.publicKey);
        const { position, points } = getClaimTestData(i);
        const isLastClaimer = i === 3;

        console.log(`\n🎮 Player ${i + 1} claiming:`, {
          position,
          points,
          address: player.publicKey.toBase58(),
        });

        const balanceBefore = await checkBal(player.publicKey);

        const tx = await program.methods
          .claim(groupId, new anchor.BN(points), position)
          .accountsPartial({
            user: player.publicKey,
            userState,
            leagueGroupState,
            vault,
            treasury: admin.publicKey,
            programConfig,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .signers([player])
          .rpc();

        const balanceAfter = await checkBal(player.publicKey);
        const userAccount = await program.account.user.fetch(userState);

        assert.isTrue(userAccount.hasClaimed);
        assert.equal(userAccount.points.toNumber(), points);
        assert.isTrue(balanceAfter > balanceBefore);

        console.log(`✅ Player ${i + 1} claimed:`, {
          tx,
          prize:
            (balanceAfter - balanceBefore) / anchor.web3.LAMPORTS_PER_SOL +
            " SOL",
        });

        // admin balance

        console.log("\n📊 Admin Final Balance :");
        await checkBal(admin.publicKey);

        if (isLastClaimer) {
          const groupAccount = await program.account.leagueGroups.fetch(
            leagueGroupState
          );

          console.log("Group Status:", groupAccount.status);

          console.log("Debug - Group Account:", {
            status: groupAccount.status,
            claimsBitmap: groupAccount.claimsBitmap.toString(),
            memberCount: groupAccount.memberCount,
          });

          assert.ok(
            "closed" in groupAccount.status,
            `Expected Closed status, got ${JSON.stringify(groupAccount.status)}`
          );

          console.log("\n🔒 Closing group...");
          const closeTx = await program.methods
            .close(groupId)
            .accountsPartial({
              user: players[0].publicKey,
              leagueGroupState,
              vault,
              programConfig,
              systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([players[0]])
            .rpc();

          console.log("✅ Group Closed:", closeTx);
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (err) {
      console.error("Claim Error:", err);
      throw err;
    }
  });
});
