use anchor_lang::prelude::*;

use crate::state::ProgramConfig;


#[derive(Accounts)]
pub struct Initialize <'info> {
// first init the program config account
#[account(mut)]
pub admin : Signer<'info>,
#[account(
  init,
  payer = admin,
  seeds = [b"config"],
  bump,
  space  = ProgramConfig::INIT_SPACE,
)]
pub program_config : Account<'info, ProgramConfig>,

pub system_program : Program<'info, System>,
}

// here do an impl to store and ref to the state struct and other functionalities 
impl <'info> Initialize <'info> {
  pub fn initialize (&mut self, bumps: &InitializeBumps,) -> Result<()> {

    let program_config = &mut self.program_config;

    program_config.config_bump = bumps.program_config;
    program_config.admin = self.admin.key();
    program_config.total_groups_created = 0;
    program_config.total_unique_players = 0;
    program_config.total_volume_processed = 0;
    program_config.treasury_balance = 0;
    program_config.treasury_wallet = self.admin.key();
    program_config.paused = false;

    Ok(())
  }
}
