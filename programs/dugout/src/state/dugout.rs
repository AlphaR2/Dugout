use anchor_lang::prelude::*;

use crate::constants::{GROUP_ID_MAX_LENGTH, MAX_MEMBERS};


/// Represents the status of a league group
#[derive(
  AnchorSerialize, 
  AnchorDeserialize, 
  Clone, 
  Debug, 
  PartialEq
)]
pub enum Status {
    Created,
    Active,
    ClaimingOpen,
    Closed,
}

#[account]
#[derive(Debug)]
pub struct LeagueGroups {
  pub group_id: String,
  pub creator : Pubkey,
  pub entry_fee : u64,
  pub member_count : u8,
  pub member_addresses : [Pubkey; MAX_MEMBERS],
  pub match_week : u8,
  pub status : Status,
  pub balance : u64,
  pub positions: [u8; MAX_MEMBERS],
  pub claims_bitmap: u8,  
  pub claiming_start_time: i64,
  pub vault_bump : u8,
  pub state_bump : u8,

}

#[account]
#[derive(Debug)]
pub struct User {
  pub address:Pubkey,
  pub points : u64,
  pub has_claimed : bool,
  pub group_id: String,
  pub user_bump : u8,
}

#[account]
#[derive(Debug)]

pub struct ProgramConfig {
  pub admin: Pubkey,                 
  pub treasury_wallet: Pubkey,        
  pub total_groups_created: u64,      
  pub total_volume_processed: u64,    
  pub total_unique_players: u64,      
  pub treasury_balance: u64,          
  pub paused: bool,                   
  pub config_bump: u8, 
}

impl Space for LeagueGroups {
    const INIT_SPACE: usize = 8 + 4 + GROUP_ID_MAX_LENGTH + 32 + 8 + 1 + 256 + 1 + 1 + 8 + 8 + 1 + 8 + 1 + 1 ;
}

impl Space for User {
  const INIT_SPACE: usize = 8 + 32 + 8 + 1 + 4 + GROUP_ID_MAX_LENGTH + 1;
}

impl Space for ProgramConfig {
  const INIT_SPACE: usize = 8 + 32 + 32 + 8 + 8 + 8 + 8 + 1 + 1;
}






