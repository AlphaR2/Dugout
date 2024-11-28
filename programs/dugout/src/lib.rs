use anchor_lang::prelude::*;
mod state;
mod constants;
mod error;
mod instructions;
mod helper;
mod events;

use instructions::*; 

declare_id!("aj3cxAukKLLjx92twBbkiZXqx98xE7ixc1vnNTZcHPE");



#[program]
pub mod dugout {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize(&ctx.bumps)?;
        Ok(())
    }

    pub fn create_group(
        ctx: Context<CreateGroup>,
        group_id: String,
        entry_fee: u64,
        match_week: u8
    ) -> Result<()> {
        ctx.accounts.create_group(
            &ctx.bumps,
            group_id,
            entry_fee,
            match_week
        )?;
        Ok(())
    }

    pub fn join_group(
        ctx: Context<JoinGroup>,
        group_id: String,
        entry_amount: u64
    ) -> Result<()> {
        ctx.accounts.join_group(group_id, &ctx.bumps, entry_amount)?;
        Ok(())
    }

    pub fn claim(
        ctx: Context<Claim>,
        group_id: String,
        point: u64,
        position: u8
    ) -> Result<()> {
        ctx.accounts.claim(
            group_id,
            point,
            position
        )?;
        Ok(())
    }

    pub fn close ( ctx: Context<Close>, group_id: String) -> Result<()> {
        ctx.accounts.close(group_id)?;
        Ok(())
    }

   



}