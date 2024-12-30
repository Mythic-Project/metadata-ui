import { Connection } from "solana-web3js-v1";
import { useSolanaWallet } from "../providers/wallet-provider";
import { useQuery } from "@tanstack/react-query";
import { MetadataClient, getMetadataKey } from "../client";
import { BN, IdlAccounts } from "@coral-xyz/anchor";
import { MythicMetadata } from "../client/metadata";

export type MetadataKey = IdlAccounts<MythicMetadata>["metadataKey"]

export function useGetMetadataKeys() {
  const wallet = useSolanaWallet()
  const connection = wallet[2] as Connection
  const client = MetadataClient(connection)

  return useQuery({
    queryKey: ['get-metadata-keys'],
    queryFn: async(): Promise<MetadataKey[] | null> => {
      try {
        const metadataKeysIds: number[] = []

        for (let i=20000; i<20010;i++) {
          metadataKeysIds.push(i)
        }

        const keys: MetadataKey[] = []

        for (const id of metadataKeysIds) {
          const mdKey = getMetadataKey(new BN(id))
          const mdAccount = await client.account.metadataKey.fetch(mdKey)
          keys.push(mdAccount)
        }

        return keys
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false
  })
}