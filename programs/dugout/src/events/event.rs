use anchor_lang::prelude::*;

#[event]
pub struct GroupCreated {
    pub group_id: String,
    pub creator: Pubkey,
    pub entry_fee: u64,
    pub match_week: u8,
    pub vault: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct UserJoined {
    pub group_id: String,
    pub user: Pubkey,
    pub entry_amount: u64,
    pub member_count: u8,
    pub is_group_full: bool,
    pub timestamp: i64,
}