
use anchor_lang::prelude::*;
use anchor_lang::system_program::{Transfer, transfer};

use crate::state::{LeagueGroups,  Status, ProgramConfig};
use crate::error::DugoutError;

// define the structs necessary for vault etc 
#[derive(Accounts)]
#[instruction(group_id: String)]
// initialize vault 
pub struct Close <'info> { 
  #[account(
    mut,
    constraint = user.key() == league_group_state.creator @ DugoutError::Unauthorized
)]
pub user : Signer<'info>,

#[account(
  mut,
  seeds = [b"group", group_id.as_bytes()],
  bump = league_group_state.state_bump,
  constraint = league_group_state.status == Status::Closed @ DugoutError::GameNotClosed,
  close = user,
)]
pub league_group_state: Account<'info, LeagueGroups>,

// then init the vault for the particular group  
#[account (
  mut,
  seeds = [b"vault", league_group_state.key().as_ref()],
  bump = league_group_state.vault_bump,
)]
 /// CHECK: This is a PDA that will hold funds
pub vault: UncheckedAccount<'info>,

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
impl<'info> Close<'info> {
  pub fn close(&mut self, group_id : String) -> Result<()> {

    require!(
      self.league_group_state.group_id == group_id,
      DugoutError::GroupNotFound
  );

      require!(
          self.vault.lamports() == 0,
          DugoutError::FundsExisting
      );

      // Get vault balance
      let vault_balance = self.vault.lamports();

      // Transfer remaining balance
      let cpi_program = self.system_program.to_account_info();
      let cpi_accounts = Transfer {
          from: self.vault.to_account_info(),
          to: self.user.to_account_info(),
      };

      let seeds = &[
          b"vault",
          self.league_group_state.to_account_info().key.as_ref(),
          &[self.league_group_state.vault_bump],
      ];

      let signer_seeds = &[&seeds[..]];

      let cpi_ctx = CpiContext::new_with_signer(
          cpi_program,
          cpi_accounts,
          signer_seeds
      );

      // Transfer vault balance
      transfer(cpi_ctx, vault_balance)?;

      Ok(())
  }
}