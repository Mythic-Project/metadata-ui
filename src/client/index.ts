import { AnchorProvider, Program, Wallet, web3, BN } from "@coral-xyz/anchor";
import idl from "./idl.json";
import { MythicMetadata } from "./metadata";

const programId = new web3.PublicKey(idl.address)

export function MetadataClient(connection: web3.Connection) {
  const provider = new AnchorProvider(connection, {} as Wallet, {})
  
  return new Program<MythicMetadata>(
    idl as MythicMetadata,
    provider
  )
}

export function getMetadataKey(id: BN) {
  return web3.PublicKey.findProgramAddressSync([
    Buffer.from("mythic_metadata"),
    Buffer.from("metadata_key"),
    id.toArrayLike(Buffer, "le", 8)
  ],
    programId
  )[0]
}

export function getMetadata(
  metadataKey: web3.PublicKey,
  authority: web3.PublicKey,
  realm: web3.PublicKey
) {
  return web3.PublicKey.findProgramAddressSync([
    Buffer.from("mythic_metadata"),
    Buffer.from("metadata"),
    metadataKey.toBuffer(),
    authority.toBuffer(),
    realm.toBuffer()
  ],
    programId
  )[0]
}