import { GovernanceAccount, RealmV1, RealmV2, SplGovernance } from "governance-idl-sdk";
import { Connection, PublicKey } from "solana-web3js-v1";
import { useSolanaWallet } from "../providers/wallet-provider";
import { useQuery } from "@tanstack/react-query";

export function useGetRealmData(realmKey: string | null) {
  const wallet = useSolanaWallet()
  const connection = wallet[2] as Connection
  const splGovernance = new SplGovernance(connection)
  let error = 0

  return useQuery({
    queryKey: ['get-realm', {realmKey}],
    queryFn: async() => {
      if (!realmKey) {
        return {
          result: null,
          error
        }
      }

      try {
        error = 1
        const realmAddress = new PublicKey(realmKey)
        error = 2  

        let realmData: RealmV1 | RealmV2 | null = null

        try {
          realmData = await splGovernance.getRealmByPubkey(realmAddress)
        } catch {
          realmData = await splGovernance.getRealmV1ByPubkey(realmAddress)
        }

        let governance: GovernanceAccount | null = null
        if (realmData.authority) {
          governance = await splGovernance.getGovernanceAccountByPubkey(realmData.authority)
        }
        error = 3
        console.log("fetched realm data")
        return {
          result: realmData,
          governance,
          error
        }
      } catch(e) {
        // console.log(e)
        return {
          result: null,
          error
        }
      }
    },
    refetchOnWindowFocus: false
  })
}