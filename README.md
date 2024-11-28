⚽⚽ Dugout Program ⚽⚽

A decentralized fantasy football platform built on SOON SVM where players can create groups, join weekly competitions, and earn rewards based on their drafted players' real-world performance.

## Overview 🏗️

Dugout enables users to:
- Create weekly fantasy football groups
- Join existing groups by getting group invite and  paying entry fees if any
- Draft players for their squad following a timed-drafting system
- Earn points based on real matchday performance
- Claim rewards through an automated system

## Smart Contract Structure 📝

### Core Components
- Group Management
- User State Handling
- Winnings Distribution System
- Automated Rewards
- Treasury Management

### Key Program States
- `ProgramConfig`: Manages global program state
- `LeagueGroups`: Handles individual group data
- `User`: Stores user participation data

### Instructions
1. `initialize`: Set up program configuration
2. `create_group`: Create a new fantasy group
3. `join_group`: Join an existing group
4. `claim`: Claim rewards based on performance
5. `close`: Close the league after claiming is done
6. `manual_claim`: In cases of unclaimed funds, the dugout team handles payout with a penalty


### Key Features
- Secure fund management through PDA vaults
- Real-time point calculation system and Leaderboard system for payouts
- Automated reward distribution
- Multi-day matchweek support

## Build and Deploy

```bash
# Build the program
anchor build

# Deploy to devnet
anchor deploy
