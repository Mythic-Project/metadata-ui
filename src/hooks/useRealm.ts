import { GovernanceAccount, RealmV1, RealmV2, SplGovernance } from "governance-idl-sdk";
import { Connection, PublicKey, SystemProgram } from "solana-web3js-v1";
import { useSolanaWallet } from "../providers/wallet-provider";
import { useQuery } from "@tanstack/react-query";

type RealmData = {
  result: RealmV1 | RealmV2 | null
  error: number
  governance?: GovernanceAccount | null
  systemOwner?: boolean
  owner?: PublicKey
}

export function useGetRealmData(realmKey: string | null) {
  const wallet = useSolanaWallet()
  const connection = wallet[2] as Connection
  let error = 0

  return useQuery({
    queryKey: ['get-realm', {realmKey}],
    queryFn: async(): Promise<RealmData> => {
      if (!realmKey) {
        return {
          result: null,
          error
        }
      }

      const realmInfo = await connection.getAccountInfo(new PublicKey(realmKey))

      if (!realmInfo) {
        return {
          result: null,
          error
        }
      }

      const splGovernance = new SplGovernance(connection, realmInfo.owner)

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
        let systemOwner = false

        if (realmData.authority) {
          const authorityInfo = await connection.getAccountInfo(realmData.authority)
          if (authorityInfo?.owner.equals(SystemProgram.programId)) {
            systemOwner = true
          } else {
            governance = await splGovernance.getGovernanceAccountByPubkey(realmData.authority)
          }
        }
        error = 3
        console.log("fetched realm data")
        return {
          result: realmData,
          governance,
          owner: realmInfo.owner,
          systemOwner,
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