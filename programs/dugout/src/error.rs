use anchor_lang::prelude::*;

#[error_code]
pub enum DugoutError {
    // Group Creation & Management Errors
    #[msg("Group ID length exceeds maximum limit")]
    GroupIdTooLong,
    
    #[msg("Invalid entry fee amount")]
    InvalidEntryFee,

    #[msg("Entry Fee too high")]
    EntryFeeTooHigh,
    
    #[msg("Group is already full")]
    GroupFull,
    
    #[msg("Group is not in correct state for this action")]
    InvalidGroupState,

    #[msg("Group not found")]
    GroupNotFound,
    #[msg("Not Claiming time yet!")]
    ClaimingNotOpen,

    #[msg("Match Week Invalid")]
    InvalidMatchWeek,

    // Membership Errors
    #[msg("Player is already in this group")]
    PlayerAlreadyInGroup,
    
    #[msg("Player not found in group")]
    PlayerNotInGroup,
    
    #[msg("Maximum member limit reached")]
    MemberLimitExceeded,

    // Authorization Errors
    #[msg("Not authorized to perform this action")]
    Unauthorized,

    #[msg("The Program is paused and undergoing maintainance")]
    ProgramPaused,
    
    #[msg("Only group creator can perform this action")]
    NotGroupCreator,

    // Payment & Claiming Errors
    #[msg("Insufficient funds for entry fee")]
    InsufficientFunds,
    
    #[msg("Prize already claimed")]
    AlreadyClaimed,
    
    #[msg("Not eligible for prize claim")]
    NotEligibleForClaim,
    
    #[msg("Claim window has expired")]
    ClaimWindowExpired,

    #[msg("Transfer Failed")]
    TranferFailed,

    // Game State Errors
    #[msg("Game is already ended")]
    GameAlreadyEnded,

    #[msg("Game is not closed")]
    GameNotClosed,

    // Admin/System Errors
    #[msg("Invalid point submission")]
    InvalidPointSubmission,
    
    #[msg("Settlement already processed")]
    AlreadySettled,
    
    #[msg("Cannot process settlement yet")]
    SettlementPending,

    // Vault Errors
    #[msg("Invalid vault owner")]
    InvalidVaultOwner,

    #[msg("Invalid Treasury Keys ")]
    InvalidTreasury,
    
    #[msg("Error in vault transfer")]
    VaultTransferError,

    // Timing Errors
    #[msg("Action not allowed at this time")]
    InvalidTiming,
    
    #[msg("Match week has not ended")]
    MatchWeekActive,

    #[msg("Game Still Active. Someone yet to claim")]
    FundsExisting,

    // General Errors
    #[msg("Mathematical operation overflow")]
    MathOverflow,
    
    #[msg("Invalid instruction data")]
    InvalidInstructionData,
}