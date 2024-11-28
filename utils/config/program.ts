export type Dugout = {
  "address": "aj3cxAukKLLjx92twBbkiZXqx98xE7ixc1vnNTZcHPE",
  "metadata": {
    "name": "dugout",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "claim",
      "discriminator": [
        62,
        198,
        214,
        193,
        213,
        159,
        108,
        210
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "groupId"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "leagueGroupState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112
                ]
              },
              {
                "kind": "arg",
                "path": "groupId"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "leagueGroupState"
              }
            ]
          }
        },
        {
          "name": "treasury",
          "writable": true
        },
        {
          "name": "programConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "groupId",
          "type": "string"
        },
        {
          "name": "point",
          "type": "u64"
        },
        {
          "name": "position",
          "type": "u8"
        }
      ]
    },
    {
      "name": "close",
      "discriminator": [
        98,
        165,
        201,
        177,
        108,
        65,
        206,
        96
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "leagueGroupState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112
                ]
              },
              {
                "kind": "arg",
                "path": "groupId"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "leagueGroupState"
              }
            ]
          }
        },
        {
          "name": "programConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "groupId",
          "type": "string"
        }
      ]
    },
    {
      "name": "createGroup",
      "discriminator": [
        79,
        60,
        158,
        134,
        61,
        199,
        56,
        248
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "leagueGroupState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112
                ]
              },
              {
                "kind": "arg",
                "path": "groupId"
              }
            ]
          }
        },
        {
          "name": "vault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "leagueGroupState"
              }
            ]
          }
        },
        {
          "name": "programConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "groupId",
          "type": "string"
        },
        {
          "name": "entryFee",
          "type": "u64"
        },
        {
          "name": "matchWeek",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "programConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "joinGroup",
      "discriminator": [
        121,
        56,
        199,
        19,
        250,
        70,
        44,
        184
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "groupId"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "leagueGroupState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112
                ]
              },
              {
                "kind": "arg",
                "path": "groupId"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "leagueGroupState"
              }
            ]
          }
        },
        {
          "name": "programConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "groupId",
          "type": "string"
        },
        {
          "name": "entryAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "leagueGroups",
      "discriminator": [
        62,
        168,
        46,
        169,
        186,
        153,
        20,
        218
      ]
    },
    {
      "name": "programConfig",
      "discriminator": [
        196,
        210,
        90,
        231,
        144,
        149,
        140,
        63
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    }
  ],
  "events": [
    {
      "name": "groupCreated",
      "discriminator": [
        132,
        94,
        184,
        198,
        77,
        165,
        13,
        26
      ]
    },
    {
      "name": "userJoined",
      "discriminator": [
        32,
        227,
        22,
        240,
        111,
        76,
        27,
        104
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "groupIdTooLong",
      "msg": "Group ID length exceeds maximum limit"
    },
    {
      "code": 6001,
      "name": "invalidEntryFee",
      "msg": "Invalid entry fee amount"
    },
    {
      "code": 6002,
      "name": "entryFeeTooHigh",
      "msg": "Entry Fee too high"
    },
    {
      "code": 6003,
      "name": "groupFull",
      "msg": "Group is already full"
    },
    {
      "code": 6004,
      "name": "invalidGroupState",
      "msg": "Group is not in correct state for this action"
    },
    {
      "code": 6005,
      "name": "groupNotFound",
      "msg": "Group not found"
    },
    {
      "code": 6006,
      "name": "claimingNotOpen",
      "msg": "Not Claiming time yet!"
    },
    {
      "code": 6007,
      "name": "invalidMatchWeek",
      "msg": "Match Week Invalid"
    },
    {
      "code": 6008,
      "name": "playerAlreadyInGroup",
      "msg": "Player is already in this group"
    },
    {
      "code": 6009,
      "name": "playerNotInGroup",
      "msg": "Player not found in group"
    },
    {
      "code": 6010,
      "name": "memberLimitExceeded",
      "msg": "Maximum member limit reached"
    },
    {
      "code": 6011,
      "name": "unauthorized",
      "msg": "Not authorized to perform this action"
    },
    {
      "code": 6012,
      "name": "programPaused",
      "msg": "The Program is paused and undergoing maintainance"
    },
    {
      "code": 6013,
      "name": "notGroupCreator",
      "msg": "Only group creator can perform this action"
    },
    {
      "code": 6014,
      "name": "insufficientFunds",
      "msg": "Insufficient funds for entry fee"
    },
    {
      "code": 6015,
      "name": "alreadyClaimed",
      "msg": "Prize already claimed"
    },
    {
      "code": 6016,
      "name": "notEligibleForClaim",
      "msg": "Not eligible for prize claim"
    },
    {
      "code": 6017,
      "name": "claimWindowExpired",
      "msg": "Claim window has expired"
    },
    {
      "code": 6018,
      "name": "tranferFailed",
      "msg": "Transfer Failed"
    },
    {
      "code": 6019,
      "name": "gameAlreadyEnded",
      "msg": "Game is already ended"
    },
    {
      "code": 6020,
      "name": "gameNotClosed",
      "msg": "Game is not closed"
    },
    {
      "code": 6021,
      "name": "invalidPointSubmission",
      "msg": "Invalid point submission"
    },
    {
      "code": 6022,
      "name": "alreadySettled",
      "msg": "Settlement already processed"
    },
    {
      "code": 6023,
      "name": "settlementPending",
      "msg": "Cannot process settlement yet"
    },
    {
      "code": 6024,
      "name": "invalidVaultOwner",
      "msg": "Invalid vault owner"
    },
    {
      "code": 6025,
      "name": "invalidTreasury",
      "msg": "Invalid Treasury Keys "
    },
    {
      "code": 6026,
      "name": "vaultTransferError",
      "msg": "Error in vault transfer"
    },
    {
      "code": 6027,
      "name": "invalidTiming",
      "msg": "Action not allowed at this time"
    },
    {
      "code": 6028,
      "name": "matchWeekActive",
      "msg": "Match week has not ended"
    },
    {
      "code": 6029,
      "name": "fundsExisting",
      "msg": "Game Still Active. Someone yet to claim"
    },
    {
      "code": 6030,
      "name": "mathOverflow",
      "msg": "Mathematical operation overflow"
    },
    {
      "code": 6031,
      "name": "invalidInstructionData",
      "msg": "Invalid instruction data"
    }
  ],
  "types": [
    {
      "name": "groupCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "groupId",
            "type": "string"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "entryFee",
            "type": "u64"
          },
          {
            "name": "matchWeek",
            "type": "u8"
          },
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "leagueGroups",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "groupId",
            "type": "string"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "entryFee",
            "type": "u64"
          },
          {
            "name": "memberCount",
            "type": "u8"
          },
          {
            "name": "memberAddresses",
            "type": {
              "array": [
                "pubkey",
                8
              ]
            }
          },
          {
            "name": "matchWeek",
            "type": "u8"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "status"
              }
            }
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "positions",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          },
          {
            "name": "claimsBitmap",
            "type": "u8"
          },
          {
            "name": "claimingStartTime",
            "type": "i64"
          },
          {
            "name": "vaultBump",
            "type": "u8"
          },
          {
            "name": "stateBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "programConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "treasuryWallet",
            "type": "pubkey"
          },
          {
            "name": "totalGroupsCreated",
            "type": "u64"
          },
          {
            "name": "totalVolumeProcessed",
            "type": "u64"
          },
          {
            "name": "totalUniquePlayers",
            "type": "u64"
          },
          {
            "name": "treasuryBalance",
            "type": "u64"
          },
          {
            "name": "paused",
            "type": "bool"
          },
          {
            "name": "configBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "status",
      "docs": [
        "Represents the status of a league group"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "created"
          },
          {
            "name": "active"
          },
          {
            "name": "claimingOpen"
          },
          {
            "name": "closed"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "points",
            "type": "u64"
          },
          {
            "name": "hasClaimed",
            "type": "bool"
          },
          {
            "name": "groupId",
            "type": "string"
          },
          {
            "name": "userBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userJoined",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "groupId",
            "type": "string"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "entryAmount",
            "type": "u64"
          },
          {
            "name": "memberCount",
            "type": "u8"
          },
          {
            "name": "isGroupFull",
            "type": "bool"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
