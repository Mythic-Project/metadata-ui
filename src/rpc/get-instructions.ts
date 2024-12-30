import { IInstruction, address } from "@solana/web3.js";
import { TransactionInstruction } from "solana-web3js-v1";

function getAccountRole(signer: boolean, writable: boolean): 0 | 1 | 2 | 3 {
  return (
    signer && writable ?
    3 :
    signer ?
    2 :
    writable ?
    1 :
    0
  )
}

export function web1IxsToWeb2Ixs(instructions: TransactionInstruction[]): IInstruction[] {
  return instructions.map(ix => ({
    data: ix.data,
    accounts: ix.keys.map(key => ({
      address: address(key.pubkey.toBase58()),
      role: getAccountRole(key.isSigner, key.isWritable)
    })),
    programAddress: address(ix.programId.toBase58())
  }))
}