/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/mythic_metadata.json`.
 */
export type MythicMetadata = {
  "address": "metaThtkusoWYDvHBFXfvc93Z3d8iBeDZ4DVyq8SYVR",
  "metadata": {
    "name": "mythicMetadata",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Metadata program"
  },
  "instructions": [
    {
      "name": "appendMetadataCollection",
      "discriminator": [
        163,
        163,
        157,
        88,
        255,
        177,
        52,
        176
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "issuingAuthority",
          "signer": true,
          "relations": [
            "metadata"
          ]
        },
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataMetadataKey"
              },
              {
                "kind": "account",
                "path": "issuingAuthority"
              },
              {
                "kind": "account",
                "path": "metadata.subject",
                "account": "metadata"
              }
            ]
          }
        },
        {
          "name": "metadataMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "metadata_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "collectionMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "collection_metadata_key.id",
                "account": "metadataKey"
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
          "name": "args",
          "type": {
            "defined": {
              "name": "appendMetadataCollectionArgs"
            }
          }
        }
      ]
    },
    {
      "name": "appendMetadataItem",
      "discriminator": [
        75,
        203,
        140,
        50,
        250,
        170,
        232,
        4
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "issuingAuthority",
          "signer": true,
          "relations": [
            "metadata"
          ]
        },
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataMetadataKey"
              },
              {
                "kind": "account",
                "path": "issuingAuthority"
              },
              {
                "kind": "account",
                "path": "metadata.subject",
                "account": "metadata"
              }
            ]
          }
        },
        {
          "name": "metadataMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "metadata_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "collectionMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "collection_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "itemMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "item_metadata_key.id",
                "account": "metadataKey"
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
          "name": "args",
          "type": {
            "defined": {
              "name": "appendMetadataItemArgs"
            }
          }
        }
      ]
    },
    {
      "name": "appendMetadataItems",
      "discriminator": [
        168,
        131,
        179,
        9,
        232,
        98,
        61,
        250
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "issuingAuthority",
          "signer": true,
          "relations": [
            "metadata"
          ]
        },
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataMetadataKey"
              },
              {
                "kind": "account",
                "path": "issuingAuthority"
              },
              {
                "kind": "account",
                "path": "metadata.subject",
                "account": "metadata"
              }
            ]
          }
        },
        {
          "name": "metadataMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "metadata_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "collectionMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "collection_metadata_key.id",
                "account": "metadataKey"
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
          "name": "args",
          "type": {
            "defined": {
              "name": "appendMetadataItemsArgs"
            }
          }
        }
      ]
    },
    {
      "name": "createMetadata",
      "discriminator": [
        30,
        35,
        117,
        134,
        196,
        139,
        44,
        25
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "issuingAuthority",
          "signer": true
        },
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataMetadataKey"
              },
              {
                "kind": "account",
                "path": "issuingAuthority"
              },
              {
                "kind": "arg",
                "path": "args.subject"
              }
            ]
          }
        },
        {
          "name": "metadataMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "metadata_metadata_key.id",
                "account": "metadataKey"
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
          "name": "args",
          "type": {
            "defined": {
              "name": "createMetadataArgs"
            }
          }
        }
      ]
    },
    {
      "name": "createMetadataKey",
      "discriminator": [
        97,
        100,
        204,
        80,
        145,
        247,
        25,
        137
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "namespaceAuthority",
          "signer": true
        },
        {
          "name": "metadataKey",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "args.id"
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
          "name": "args",
          "type": {
            "defined": {
              "name": "createMetadataKeyArgs"
            }
          }
        }
      ]
    },
    {
      "name": "removeMetadataCollection",
      "discriminator": [
        150,
        158,
        202,
        131,
        20,
        109,
        210,
        199
      ],
      "accounts": [
        {
          "name": "issuingAuthority",
          "signer": true,
          "relations": [
            "metadata"
          ]
        },
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataMetadataKey"
              },
              {
                "kind": "account",
                "path": "issuingAuthority"
              },
              {
                "kind": "account",
                "path": "metadata.subject",
                "account": "metadata"
              }
            ]
          }
        },
        {
          "name": "metadataMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "metadata_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "collectionMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "collection_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "removeMetadataItem",
      "discriminator": [
        210,
        12,
        49,
        1,
        201,
        243,
        253,
        101
      ],
      "accounts": [
        {
          "name": "issuingAuthority",
          "signer": true,
          "relations": [
            "metadata"
          ]
        },
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataMetadataKey"
              },
              {
                "kind": "account",
                "path": "issuingAuthority"
              },
              {
                "kind": "account",
                "path": "metadata.subject",
                "account": "metadata"
              }
            ]
          }
        },
        {
          "name": "metadataMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "metadata_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "collectionMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "collection_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "itemMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "item_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "revokeCollectionUpdateAuthority",
      "discriminator": [
        202,
        54,
        83,
        211,
        193,
        251,
        218,
        206
      ],
      "accounts": [
        {
          "name": "issuingAuthority",
          "signer": true,
          "relations": [
            "metadata"
          ]
        },
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataMetadataKey"
              },
              {
                "kind": "account",
                "path": "issuingAuthority"
              },
              {
                "kind": "account",
                "path": "metadata.subject",
                "account": "metadata"
              }
            ]
          }
        },
        {
          "name": "metadataMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "metadata_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "collectionMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "collection_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "setCollectionUpdateAuthority",
      "discriminator": [
        8,
        139,
        31,
        243,
        59,
        214,
        80,
        110
      ],
      "accounts": [
        {
          "name": "issuingAuthority",
          "signer": true,
          "relations": [
            "metadata"
          ]
        },
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataMetadataKey"
              },
              {
                "kind": "account",
                "path": "issuingAuthority"
              },
              {
                "kind": "account",
                "path": "metadata.subject",
                "account": "metadata"
              }
            ]
          }
        },
        {
          "name": "metadataMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "metadata_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "collectionMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "collection_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "setCollectionUpdateAuthorityArgs"
            }
          }
        }
      ]
    },
    {
      "name": "updateMetadataItem",
      "discriminator": [
        247,
        110,
        128,
        152,
        153,
        217,
        139,
        170
      ],
      "accounts": [
        {
          "name": "updateAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataMetadataKey"
              },
              {
                "kind": "account",
                "path": "metadata.issuing_authority",
                "account": "metadata"
              },
              {
                "kind": "account",
                "path": "metadata.subject",
                "account": "metadata"
              }
            ]
          }
        },
        {
          "name": "metadataMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "metadata_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "collectionMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "collection_metadata_key.id",
                "account": "metadataKey"
              }
            ]
          }
        },
        {
          "name": "itemMetadataKey",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  121,
                  116,
                  104,
                  105,
                  99,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                  95,
                  107,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "item_metadata_key.id",
                "account": "metadataKey"
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
          "name": "args",
          "type": {
            "defined": {
              "name": "updateMetadataItemArgs"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "metadata",
      "discriminator": [
        72,
        11,
        121,
        26,
        111,
        181,
        85,
        93
      ]
    },
    {
      "name": "metadataKey",
      "discriminator": [
        108,
        103,
        195,
        88,
        73,
        100,
        213,
        199
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "counterIdReachedMax",
      "msg": "Cannot increment ID"
    },
    {
      "code": 6001,
      "name": "invalidAccountOwner",
      "msg": "Invalid account owner"
    },
    {
      "code": 6002,
      "name": "unauthorized",
      "msg": "unauthorized"
    },
    {
      "code": 6003,
      "name": "immutableMetadata",
      "msg": "Metadata immutable"
    },
    {
      "code": 6004,
      "name": "invalidMetadataKey",
      "msg": "Invalid MetadataKey"
    },
    {
      "code": 6005,
      "name": "metadataCollectionFull",
      "msg": "Metadata collection is full"
    },
    {
      "code": 6006,
      "name": "metadataCollectionAlreadyExists",
      "msg": "Metadata collection already exists"
    },
    {
      "code": 6007,
      "name": "metadataCollectionNonExistent",
      "msg": "Metadata collection does not exist"
    },
    {
      "code": 6008,
      "name": "metadataItemFull",
      "msg": "Metadata item is full"
    },
    {
      "code": 6009,
      "name": "metadataItemAlreadyExists",
      "msg": "Metadata item already exists"
    },
    {
      "code": 6010,
      "name": "metadataItemNonExistent",
      "msg": "Metadata item does not exist"
    },
    {
      "code": 6011,
      "name": "metadataItemValueLenExceeded",
      "msg": "Metadata item value len exceeded"
    }
  ],
  "types": [
    {
      "name": "appendMetadataCollectionArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "updateAuthority",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "appendMetadataItemArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "appendMetadataItemsArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": {
              "vec": "bytes"
            }
          }
        ]
      }
    },
    {
      "name": "createMetadataArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "subject",
            "type": "pubkey"
          },
          {
            "name": "updateAuthority",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "createMetadataKeyArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "label",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "contentType",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "metadata",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "subject",
            "docs": [
              "The subject described by the metadata (e.g. a DAO, NFT, a program etc.)"
            ],
            "type": "pubkey"
          },
          {
            "name": "metadataKeyId",
            "docs": [
              "The Metadata Key  Id"
            ],
            "type": "u64"
          },
          {
            "name": "issuingAuthority",
            "docs": [
              "The authority which issued (created) the Metadata account and owns it",
              "Note: The authority is embedded in the PDA seeds and cannot be changed",
              "If a new authority is required then a new Metadata account must be created",
              "",
              "Metadata can be self issued by the subject or issued by a third party",
              "For example a DAO can issue metadata about itself using the DAO's authority",
              "Or external authority can issue claims, certifications etc. about the DAO",
              "",
              "TODO:",
              "- Should it also be allowed to close the account?"
            ],
            "type": "pubkey"
          },
          {
            "name": "updateSlot",
            "docs": [
              "The slot when the collection was last updated",
              "The collection update slot is max(update_slot) for all its metadata items"
            ],
            "type": "u64"
          },
          {
            "name": "updateAuthority",
            "docs": [
              "The default update authority for all the collections",
              "Note: The authority can be overridden at the collection level",
              "Setting the authority to None makes the Metadata immutable"
            ],
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "items",
            "type": {
              "vec": {
                "defined": {
                  "name": "metadataItem"
                }
              }
            }
          },
          {
            "name": "collections",
            "type": {
              "vec": {
                "defined": {
                  "name": "metadataCollection"
                }
              }
            }
          },
          {
            "name": "bump",
            "docs": [
              "Bump"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "metadataCollection",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "metadataKeyId",
            "docs": [
              "The Metadata Key  Id"
            ],
            "type": "u64"
          },
          {
            "name": "updateSlot",
            "docs": [
              "The slot when the collection was last updated",
              "The collection update slot is max(update_slot) for all its metadata items"
            ],
            "type": "u64"
          },
          {
            "name": "updateAuthority",
            "docs": [
              "The authority that can update the collection metadata items",
              "Separate update instructions can be invoked to add/revoke specific collection's update_authority",
              "If the collection level update authority is None then parent Metadata update_authority is used"
            ],
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "items",
            "type": {
              "vec": {
                "defined": {
                  "name": "metadataItem"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "metadataItem",
      "docs": [
        "MetadataItem defines a single metadata item identified by its MetadataKey"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "metadataKeyId",
            "docs": [
              "The Metadata Key Id"
            ],
            "type": "u64"
          },
          {
            "name": "updateSlot",
            "docs": [
              "The slot when the value was last updated"
            ],
            "type": "u64"
          },
          {
            "name": "value",
            "docs": [
              "Serialized metadata item value"
            ],
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "metadataKey",
      "docs": [
        "MetadataKey account defines a single metadata value"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "Id"
            ],
            "type": "u64"
          },
          {
            "name": "namespaceAuthority",
            "docs": [
              "Authority of the MetadataKey namespace",
              "It allows authorities to create unique namespaces for metadata keys"
            ],
            "type": "pubkey"
          },
          {
            "name": "name",
            "docs": [
              "Name of the metadata value represented by the MetadataKey"
            ],
            "type": "string"
          },
          {
            "name": "label",
            "docs": [
              "User friendly label of the value represented by the MetadataKey"
            ],
            "type": "string"
          },
          {
            "name": "description",
            "docs": [
              "Description of the value represented by the MetadataKey"
            ],
            "type": "string"
          },
          {
            "name": "contentType",
            "docs": [
              "The type of the metadata described by the key",
              "e.g. string, number, image, metadata, metadata-collection etc."
            ],
            "type": "string"
          },
          {
            "name": "bump",
            "docs": [
              "Bump"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "setCollectionUpdateAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newUpdateAuthority",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "updateMetadataItemArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newValue",
            "type": "bytes"
          }
        ]
      }
    }
  ]
};
