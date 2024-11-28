use anchor_lang::prelude::*;
use crate::events::event::GroupCreated;


use crate::state::{LeagueGroups, Status, ProgramConfig};
use crate::error::DugoutError;
use crate::constants::{GROUP_ID_MAX_LENGTH, MAX_MEMBERS};

use crate::helper::calculate_next_tuesday_5am;

// define the structs necessary for vault etc 
#[derive(Accounts)]
#[instruction(group_id: String)]
// initialize vault 
pub struct CreateGroup <'info> {
//  first init the group vault state account 
#[account(mut)]
pub creator : Signer<'info>,

#[account (
  init,
  payer = creator,
  seeds = [b"group", group_id.as_bytes()],
  bump,
  space  = LeagueGroups::INIT_SPACE,
)]
pub league_group_state: Account<'info, LeagueGroups>,

// then init the vault for the particular group 
#[account (
  seeds = [b"vault", league_group_state.key().as_ref()],
  bump,
)]
 /// CHECK: This is a PDA that will hold funds
pub vault : UncheckedAccount<'info>,

// derive the exising program config to make state updates 
#[account (
  mut,
  seeds = [b"config"],
  constraint = !program_config.paused @ DugoutError::ProgramPaused,
  bump = program_config.config_bump
  )]
  pub program_config : Account<'info, ProgramConfig>,
  pub system_program : Program<'info, System>,
}

// here do an impl to store and ref to the state struct and other functionalities 
impl <'info> CreateGroup<'info> {
  pub fn create_group (&mut self, bumps: &CreateGroupBumps, group_id : String, entry_fee : u64, match_week : u8) -> Result<()> {

    // checks 
    require!(
      group_id.len() <= GROUP_ID_MAX_LENGTH,
      DugoutError::GroupIdTooLong 
    );

    require!(
      entry_fee <= 100_000_000_000,  // 100 SOL for example
      DugoutError::EntryFeeTooHigh
  );
    require!(entry_fee > 0, DugoutError::InvalidEntryFee);
    require!(match_week > 0, DugoutError::InvalidMatchWeek);

            // Initialize configuration 
    let league_group_config = &mut self.league_group_state;

    league_group_config.vault_bump = bumps.vault;
    league_group_config.state_bump = bumps.league_group_state;

    league_group_config.creator = self.creator.key();
    league_group_config.group_id = group_id.clone();
    league_group_config.entry_fee =  entry_fee;
    league_group_config.member_count = 0;
    league_group_config.member_addresses = [Pubkey::default(); 8];
    league_group_config.match_week = match_week;
    league_group_config.status = Status::Created;
    league_group_config.balance = 0;
    league_group_config.positions = [0; MAX_MEMBERS];
    league_group_config.claims_bitmap = 0;

    // timestamp check 
    let clock = Clock::get()?;
    league_group_config.claiming_start_time = calculate_next_tuesday_5am(clock.unix_timestamp);
    


let program_config = &mut self.program_config;

  // Update program stats
program_config.total_groups_created = program_config.total_groups_created.checked_add(1).ok_or(DugoutError::MathOverflow)?;



emit!(GroupCreated {
  group_id: group_id.clone(),
  creator: self.creator.key(),
  entry_fee,
  match_week,
  vault: self.vault.key(),
  timestamp: Clock::get()?.unix_timestamp,
});



   Ok(())
  }

  
}


