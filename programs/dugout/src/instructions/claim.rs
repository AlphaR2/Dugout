use anchor_lang::prelude::*;
use anchor_lang::system_program::{Transfer, transfer};
use crate::constants::{ HOUSE_FEE_PERCENT, REWARD_PERCENTAGES};
use crate::state::{LeagueGroups, User, Status, ProgramConfig};
use crate::error::DugoutError;
use crate::helper::is_claiming_time;

#[derive(Accounts)]
#[instruction(group_id: String)]
pub struct Claim<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
  
    #[account(
        mut,
        seeds = [b"user", group_id.as_bytes(), user.key().as_ref()],
        constraint = user_state.group_id == group_id @ DugoutError::GroupNotFound,
        bump = user_state.user_bump,
    )]
    pub user_state: Account<'info, User>,

    #[account(
        mut,
        seeds = [b"group", group_id.as_bytes()],
        constraint = league_group_state.status != Status::Closed @ DugoutError::GameAlreadyEnded,
        bump = league_group_state.state_bump,
    )]
    pub league_group_state: Account<'info, LeagueGroups>,

    #[account(
        mut,
        seeds = [b"vault", league_group_state.key().as_ref()],
        bump = league_group_state.vault_bump,
    )]
     /// CHECK: This is a PDA that will hold funds
    pub vault: UncheckedAccount<'info>, 

   
    #[account(
      mut,
      constraint = treasury.key() == program_config.treasury_wallet @ DugoutError::InvalidTreasury
  )]

   /// CHECK: This is a PDA for treasury 
  pub treasury: UncheckedAccount<'info>,

    #[account(
        mut,
        seeds = [b"config"],
        constraint = !program_config.paused @ DugoutError::ProgramPaused,
        bump = program_config.config_bump,
    )]
    pub program_config: Account<'info, ProgramConfig>,

    pub system_program: Program<'info, System>,
}

impl<'info> Claim<'info> {
    pub fn claim(
        &mut self,
        group_id: String,
        point: u64,
        position: u8,
    ) -> Result<()> {
      let user: Pubkey = self.user.key();
        let user_state = &mut self.user_state;
        let league_group = &mut self.league_group_state;
        let clock = Clock::get()?;

        // Basic validations
        require!(
            user_state.address == user,
            DugoutError::Unauthorized
        );
        require!(
            !user_state.has_claimed,
            DugoutError::AlreadyClaimed
        );
        require!(
            league_group.member_addresses.contains(&user),
            DugoutError::PlayerNotInGroup
        );
        require!(
            position > 0 && position <= 4 && point > 0, // Only top 4 can claim
            DugoutError::NotEligibleForClaim
        );

        require!(
        league_group.group_id == group_id, 
        DugoutError::GroupNotFound
        );

        // Time and status checks
        require!(
            is_claiming_time(clock.unix_timestamp, league_group.claiming_start_time),
            DugoutError::ClaimingNotOpen
        );

        // Update status if needed
        if league_group.status == Status::Active {
            league_group.status = Status::ClaimingOpen;
        }

        // require!(
        //     league_group.status == Status::ClaimingOpen,
        //     DugoutError::ClaimingNotOpen
        // );

        // Calculate reward
        let total_pool = league_group.balance;
        let house_fee = (total_pool * HOUSE_FEE_PERCENT as u64) / 100;
        let prize_pool = total_pool.checked_sub(house_fee).ok_or(DugoutError::MathOverflow)?;
        
        // Get reward percentage based on position (0-based index)
        let reward_percentage = REWARD_PERCENTAGES[(position - 1) as usize];
        let reward_amount = (prize_pool * reward_percentage as u64) / 100;

        require!(
          league_group.balance >= (reward_amount + house_fee),
          DugoutError::InsufficientFunds
      );

    
        // Transfer reward
let cpi_program = self.system_program.to_account_info();

let cpi_accounts = Transfer{
  from: self.vault.to_account_info(),
  to: self.user.to_account_info(),
};

let seeds =&[
  b"vault",
  league_group.to_account_info().key.as_ref(),
  &[league_group.vault_bump],
];

let signer_seeds = &[&seeds[..]];

let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);



transfer(cpi_ctx, reward_amount).map_err(|_| DugoutError::VaultTransferError)?;



        // Update states
        user_state.points = point;
        user_state.has_claimed = true;
        
        // Set claim in bitmap
        let user_index = league_group
            .member_addresses
            .iter()
            .position(|&addr| addr == user)
            .ok_or(DugoutError::PlayerNotInGroup)? as u8;
        
        league_group.claims_bitmap |= 1 << user_index;

        // Check if all eligible players have claimed
        let claimed_count = league_group.claims_bitmap.count_ones();
        if claimed_count == 4 {  // All top 4 claimed
            league_group.status = Status::Closed;
        }



        // Transfer house fee to treasury if last claim

        if claimed_count == 4 {
          let program_config = &mut self.program_config;
          program_config.treasury_balance = program_config
              .treasury_balance
              .checked_add(house_fee)
              .ok_or(DugoutError::MathOverflow)?;
      }
        if claimed_count == 4 {
          let fee_transfer_accounts = Transfer {
              from: self.vault.to_account_info(),
              to: self.treasury.to_account_info(),
          };
          
          let fee_cpi_ctx = CpiContext::new_with_signer(
              self.system_program.to_account_info(),
              fee_transfer_accounts,
              signer_seeds
          );
          
          transfer(fee_cpi_ctx, house_fee)?;
      }
    
        Ok(())
    }
}

