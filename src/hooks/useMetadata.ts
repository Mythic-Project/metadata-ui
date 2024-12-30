import { Connection } from "solana-web3js-v1";
import { useSolanaWallet } from "../providers/wallet-provider";
import { useQuery } from "@tanstack/react-query";
import { MetadataClient, getMetadata, getMetadataKey } from "../client";
import { BN, IdlAccounts } from "@coral-xyz/anchor";
import { MythicMetadata } from "../client/metadata";
import { useGetRealmData } from "./useRealm";
import { useGetMetadataKeys } from "./useMetadataKeys";
import { SplGovernance } from "governance-idl-sdk";
import { MetadataItems } from "../branding-form";

export type MetadataKey = IdlAccounts<MythicMetadata>["metadataKey"]

export function useGetMetadata(realmAddress: string) {
  const wallet = useSolanaWallet()
  const connection = wallet[2] as Connection
  const client = MetadataClient(connection)
  const splGovernance = new SplGovernance(connection)
  const realmData = useGetRealmData(realmAddress).data
  const metadataKeys = useGetMetadataKeys().data

  return useQuery({
    enabled: realmData !== undefined && metadataKeys !== undefined,
    queryKey: ['get-metadata', {realmAddress}],
    queryFn: async() => {
      if (!metadataKeys || !realmData?.result) {
        return null
      }

      if (!realmData.result.authority) {
        return null
      }

      try {
        const metadataMetadataKey = getMetadataKey(metadataKeys.find(y => y.label === "Metadata")!.id)
        const treasuryAccount = splGovernance.pda.nativeTreasuryAccount({
          governanceAccount: realmData.result.authority
        }).publicKey

        const metadataAddress = getMetadata(
          metadataMetadataKey, 
          treasuryAccount, 
          realmData.result.publicKey
        )

        const metadataData = await client.account.metadata.fetch(metadataAddress)
        const metadata: MetadataItems = {
          displayName: "",
          daoImage: "",
          bannerImage: "",
          shortDescription: "",
          category: "",
          website: "",
          twitter: "",
          discord: "",
          keywords: ""
        }

        for (const item of metadataData.items) {
          const selectedKey = metadataKeys.find(k => k.id.eq(item.metadataKeyId))
          metadata[selectedKey!.name] = item.value.toString()
        }

        return metadata
      } catch(e) {
        console.log(e)
        return null
      }
    },
    refetchOnWindowFocus: false
  })
}