use anchor_lang::prelude::*;
use anchor_lang::system_program::{Transfer, transfer};
use crate::constants::{MEMBER_LIMIT, GROUP_ID_MAX_LENGTH};

use crate::state::{LeagueGroups, User,  Status, ProgramConfig};
use crate::error::DugoutError;
use crate::events::event::UserJoined;
// define the structs necessary for vault etc 
#[derive(Accounts)]
#[instruction(group_id: String)]
// initialize vault 
pub struct JoinGroup <'info> { 
#[account(mut)]
pub user : Signer<'info>,
// initialize the user account for holding user state 
#[account (
  init,
  payer = user,
  seeds = [b"user", group_id.as_bytes(), user.key().as_ref()], 
  bump,
  space  = User::INIT_SPACE,
)]
pub user_state : Account<'info, User>,

// init the league_group_state to update group state 
#[account (
  mut,
  seeds = [b"group", group_id.as_bytes()],
  bump = league_group_state.state_bump,
)]
pub league_group_state: Account<'info, LeagueGroups>,

// then init the vault for the particular group 
#[account (
  mut,
  seeds = [b"vault", league_group_state.key().as_ref()],
  bump = league_group_state.vault_bump,
)]

 /// CHECK: This is a PDA that will hold funds
pub vault : UncheckedAccount<'info>,

// derive the exising program config to make state updates 
#[account (
  mut,
  seeds = [b"config"],
  constraint = !program_config.paused @ DugoutError::ProgramPaused,
  bump = program_config.config_bump,
  )]
  pub program_config : Account<'info, ProgramConfig>,
pub system_program : Program<'info, System>,
}

// here do an impl to store and ref to the state struct and other functionalities 
impl <'info> JoinGroup<'info> {
  pub fn join_group (&mut self, group_id : String, bump: &JoinGroupBumps,  entry_amount: u64) -> Result<()> {
self.user_state.user_bump = bump.user_state;
let user = self.user.key();
let league_group = &mut self.league_group_state;

// validations 
require!(
  league_group.status == Status::Created,
  DugoutError::InvalidGroupState
);

require!(
  group_id.len() <= GROUP_ID_MAX_LENGTH,
  DugoutError::GroupIdTooLong
);

require!(
  league_group.member_count < MEMBER_LIMIT,
  DugoutError::GroupFull
);

    require!(
      entry_amount == league_group.entry_fee, DugoutError::InvalidEntryFee
    );

    require!(
      !league_group.member_addresses.contains(&user),
      DugoutError::PlayerAlreadyInGroup
  );

   
        // Initialize user state

    let user_state_info  = &mut self.user_state;
  
    user_state_info.address = user;
   user_state_info.has_claimed = false;
  user_state_info.points = 0;
  user_state_info.group_id = group_id.clone();

          // Update group state
let current_index: usize = league_group.member_count as usize;
league_group.member_addresses[current_index] = user;
league_group.positions[current_index] = 0;


league_group.member_count = league_group.member_count
.checked_add(1)
.ok_or(DugoutError::MathOverflow)?;

league_group.balance = league_group.balance.checked_add(entry_amount).ok_or(DugoutError::MathOverflow)?;

  // if group has reached max set status as active and do not allow extra 
  if league_group.member_count  == MEMBER_LIMIT {
    league_group.status = Status::Active;
    } 
  

          // Update program stats

  let program_config = &mut self.program_config;

program_config.total_unique_players = program_config.total_unique_players.checked_add(1).ok_or(DugoutError::MathOverflow)?;

program_config.total_volume_processed = program_config
.total_volume_processed
.checked_add(entry_amount)
.ok_or(DugoutError::MathOverflow)?;



// cpi call to initiate deposit to SC 

let cpi_program = self.system_program.to_account_info();

let cpi_accounts = Transfer {
  from: self.user.to_account_info(),
  to: self.vault.to_account_info(),
};

let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

transfer(cpi_ctx, entry_amount).map_err(|_| DugoutError::TranferFailed)?;


  // Emit event
   
    emit!(UserJoined {
      group_id,
      user,
      entry_amount,
      member_count: league_group.member_count,
      is_group_full: league_group.member_count == MEMBER_LIMIT,
      timestamp: Clock::get()?.unix_timestamp,
  });

   Ok(())
  }
}




