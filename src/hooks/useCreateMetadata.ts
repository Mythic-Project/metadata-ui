
import { useMutation } from "@tanstack/react-query"
import { Program } from "@coral-xyz/anchor"
import { MythicMetadata } from "../client/metadata"
import { useSolanaWallet } from "../providers/wallet-provider"
import { getMetadata, getMetadataKey } from "../client"
import { MetadataItems, PageState } from "../branding-form"
import { TransactionInstruction } from "solana-web3js-v1"
import { useGetRealmData } from "./useRealm"
import broadcastTransaction from "../rpc/send-transaction"
import {SplGovernance} from "governance-idl-sdk"
import { PublicKey, Keypair, SystemProgram, LAMPORTS_PER_SOL } from "solana-web3js-v1"
import { useGetMetadataKeys } from "./useMetadataKeys"
import { useGetMetadata } from "./useMetadata"
import { TransactionSigner } from "@solana/web3.js"

export function useCreateMetadata(
  client: Program<MythicMetadata>,
  realmKey: string,
  metadata: MetadataItems,
  signer: TransactionSigner,
  isCouncil: boolean,
  setTxExecuted: (n: number) => void,
  setTotalTxs: (m: number) => void,
  handleProceedPage: (s: PageState) => void
) {
  const [wallet,_,connection] = useSolanaWallet()
  const realmData = useGetRealmData(realmKey).data
  const metadataKeys = useGetMetadataKeys().data
  const existingMetadata = useGetMetadata(realmKey).data

  return useMutation({
    mutationKey: ["create-metadata", {publicKey: wallet?.publicKey, realm: realmData?.result?.name}],
    mutationFn: async() => {
      if (!wallet || !wallet.publicKey || !connection) {
        throw new Error("The wallet is not connected.")
      }

      if (!realmData || !realmData.result) {
        throw new Error("Unable to find the realm.")
      }

      if (!realmData.result?.authority || !realmData.governance) {
        throw new Error("This DAO does not have any authority.")
      }

      if (isCouncil && !realmData.result.config.councilMint) {
        throw new Error("The council does not exist in this realm.")
      }

      if (!metadataKeys) {
        throw new Error("The keys are not yet loaded, kindly wait and try again.")
      }

      const walletAddress = new PublicKey(wallet.address)
      const splGovernance = new SplGovernance(connection)
      const isCouncilExist = realmData.result.config.councilMint !== null
      const votingMint = isCouncil ? 
        realmData.result.config.councilMint! :
        realmData.result.communityMint

      // Fetch Governance account (it is assumed that the realm authority is the governance address)
      const governanceAccount = realmData.governance
      
      // Fetch Realm Config account to check if plugin is used
      const realmConfigAccount = await splGovernance.getRealmConfigByRealm(realmData.result.publicKey)
      const vwrProgram = realmConfigAccount.communityTokenConfig.voterWeightAddin
      const registrarAddress = vwrProgram ? PublicKey.findProgramAddressSync([
        realmData.result.publicKey.toBuffer(),
        Buffer.from("registrar"),
        realmData.result.communityMint.toBuffer()
      ], vwrProgram)[0]
        : null
      
      const vwrAddress = vwrProgram && registrarAddress ?
        PublicKey.findProgramAddressSync([
          registrarAddress.toBuffer(),
          Buffer.from("voter-weight-record"),
          walletAddress.toBuffer()
        ], vwrProgram)[0]
        : null

      // Pending add support for VSR Plugin

      const councilTokenOwnerRecord = isCouncilExist ?
        splGovernance.pda.tokenOwnerRecordAccount({
          realmAccount: realmData.result.publicKey,
          governingTokenMintAccount: realmData.result.config.councilMint!,
          governingTokenOwner: walletAddress
        }).publicKey :
        null

      const communityTokenOwnerRecord = splGovernance.pda.tokenOwnerRecordAccount({
        realmAccount: realmData.result.publicKey,
        governingTokenMintAccount: realmData.result.communityMint,
        governingTokenOwner: walletAddress
      }).publicKey

      let selectedTokenOwnerRecord: PublicKey | null = null

      // Check if Council Token Owner Record exists and has voting power
      try {
        const councilTorAccount = councilTokenOwnerRecord ?
        await splGovernance.getTokenOwnerRecordByPubkey(councilTokenOwnerRecord) :
        null

        const minimumCouncilPower = governanceAccount.config.minCouncilWeightToCreateProposal
        
        selectedTokenOwnerRecord = 
          councilTorAccount && councilTorAccount.governingTokenDepositAmount.gte(minimumCouncilPower) ?
          councilTokenOwnerRecord! :
          null
      } catch(e) {
        console.log(e)
      }

      if (!selectedTokenOwnerRecord) {
        try {
          const communityTorAccount = await splGovernance.getTokenOwnerRecordByPubkey(communityTokenOwnerRecord)

          if (communityTorAccount) {
            selectedTokenOwnerRecord = communityTokenOwnerRecord
          }
        } catch(e) {
          console.log(e)
        }
      }

      if (!selectedTokenOwnerRecord) {
        throw new Error("You don't have voting power to create the proposal.")
      }

      const proposalSeed = Keypair.generate().publicKey

      const proposerDaoProposalAddress = splGovernance.pda.proposalAccount({
        governanceAccount: governanceAccount.publicKey,
        governingTokenMint: votingMint,
        proposalSeed
      }).publicKey

      // Create Proposal is the proposer DAO
      const proposerDaoProposalIx = await splGovernance.createProposalInstruction(
        `${existingMetadata ? 'Update' : 'Create'} Metadata for DAO`,
        '',
        {multiChoiceOptions: null, choiceType: "single"},
        ['Approve'],
        true,
        realmData.result.publicKey,
        governanceAccount.publicKey,
        selectedTokenOwnerRecord,
        votingMint,
        walletAddress,
        walletAddress,
        proposalSeed,
        vwrAddress && selectedTokenOwnerRecord.equals(communityTokenOwnerRecord) ?
          vwrAddress :
          undefined
      )

      
      // // Insert Instructions for the Proposer DAO Proposal
      // const proposerDaoInnerIxs: TransactionInstruction[] = []

      const proposerTreasuryAccount = splGovernance
        .pda.nativeTreasuryAccount({governanceAccount: governanceAccount.publicKey})
        .publicKey
      // // Proposer's ATA Account
      // const proposerAtaAddress = utils.token.associatedAddress({
      //   mint: approvalRealmMint, 
      //   owner: proposerTreasuryAccount
      // })

      // // Proposer's TOR Address for Approval DAO
      // const proposerTorAddress = splGovernance.pda.tokenOwnerRecordAccount({
      //     realmAccount: approvalRealmAddress,
      //     governingTokenMintAccount: approvalRealmMint,
      //     governingTokenOwner: proposerTreasuryAccount
      //   }).publicKey

      // // Deposit Governance Token in the Approval DAO (Inner Ix 1)
      // const innerIx1 = await splGovernance.depositGoverningTokensInstruction(
      //   approvalRealmAddress,
      //   approvalRealmMint,
      //   proposerAtaAddress,
      //   proposerTreasuryAccount,
      //   proposerTreasuryAccount,
      //   proposerTreasuryAccount,
      //   new BN(10000)
      // )

      // // Create Proposal in the Approval DAO (Inner Ix 2)
      // const innerIx2 = await splGovernance.createProposalInstruction(
      //   `New Metadata Request for ${realmData.result.name}`,
      //   `Realm Address: ${realmData.result.publicKey.toBase58()}, Proposer Address: ${walletAddress.toBase58()}`,
      //   {multiChoiceOptions: null, choiceType: "single"},
      //   ['Approve'],
      //   true,
      //   approvalRealmAddress,
      //   approvalRealmGovernance,
      //   proposerTorAddress,
      //   approvalRealmMint,
      //   proposerTreasuryAccount,
      //   proposerTreasuryAccount
      // )
      
      // // Transfer 0.005 SOL to the Approval DAO Treasury for rent (Inner Ix 3)
      // const innerIx3 = SystemProgram.transfer({
      //   fromPubkey: proposerTreasuryAccount,
      //   toPubkey: approvalRealmTreasury,
      //   lamports: 0.005 * LAMPORTS_PER_SOL
      // })

      // Metadata Instructions
      const metadataInstructions: TransactionInstruction[] = []
      
      const metadataMetadataKey = getMetadataKey(metadataKeys.find(y => y.label === "Metadata")!.id)
      
      const metadataAddress = getMetadata(
        metadataMetadataKey, 
        proposerTreasuryAccount, 
        realmData.result.publicKey
      )

      // Create Metadata
      if (!existingMetadata) {
        const createMetadataIx = await client.methods
        .createMetadata({
          subject: realmData.result.publicKey,
          updateAuthority: proposerTreasuryAccount,
        })
        .accountsPartial({
          issuingAuthority: proposerTreasuryAccount,
          metadata: metadataAddress,
          metadataMetadataKey,
          payer: proposerTreasuryAccount
        })
        .instruction()

        metadataInstructions.push(createMetadataIx)
      }

      // Create Metadata Key for each item and append it to the metadata
      const metadataItems = Object.entries(metadata)
      const filledMetadataItems = existingMetadata ?
        metadataItems.filter(item => !!item[1]).filter(item => item[1] !== existingMetadata[item[0]]) :
        metadataItems.filter(item => !!item[1])

      const keysForItems = filledMetadataItems.map(item => metadataKeys.find(k => k.name === item[0]))
      const values = filledMetadataItems.map(item => Buffer.from(item[1]))
      const remainingAccounts = keysForItems.map(key => ({
        pubkey: getMetadataKey(key!.id),
        isSigner: false,
        isWritable: false
      }))

      if (existingMetadata) {
        for (const [ix] of filledMetadataItems.entries()) {
          const updateIx = await client.methods
            .updateMetadataItem({newValue: values[ix]})
            .accountsPartial({
              metadata: metadataAddress,
              metadataMetadataKey,
              updateAuthority: proposerTreasuryAccount,
              collectionMetadataKey: metadataMetadataKey,
              itemMetadataKey: remainingAccounts[ix].pubkey
            })
            .instruction()

          metadataInstructions.push(updateIx)
        }
      } else {
        const chunkSize = 5
        for (let j=0;j<filledMetadataItems.length;j+=chunkSize) {
          const valuesChunk = values.slice(j,j+chunkSize)
          const remainingAccountsChunk = remainingAccounts.slice(j, j+chunkSize)
          
          const appendItemIx = await client.methods
            .appendMetadataItems({
              value: valuesChunk
            })
            .accountsPartial({
              payer: proposerTreasuryAccount,
              issuingAuthority: proposerTreasuryAccount,
              metadata: metadataAddress,
              metadataMetadataKey,
              collectionMetadataKey: metadataMetadataKey 
            })
            .remainingAccounts(remainingAccountsChunk)
            .instruction()
  
          metadataInstructions.push(appendItemIx)
        }
      }
      

      const instructions = [proposerDaoProposalIx]

      for (let i = 0; i<metadataInstructions.length; i++) {
        const insertIx = await splGovernance.insertTransactionInstruction(
          [metadataInstructions[i]],
          0, i, governanceAccount.config.minTransactionHoldUpTime,
          governanceAccount.publicKey,
          proposerDaoProposalAddress,
          selectedTokenOwnerRecord,
          walletAddress,
          walletAddress
        )

        instructions.push(insertIx)
      }

      const signOffProposalIx = await splGovernance.signOffProposalInstruction(
        realmData.result.publicKey,
        governanceAccount.publicKey,
        proposerDaoProposalAddress,
        walletAddress,
        undefined,
        selectedTokenOwnerRecord
      )

      const transferSolToDaoIx = SystemProgram.transfer({
        fromPubkey: walletAddress,
        toPubkey: proposerTreasuryAccount,
        lamports: existingMetadata ? 0.004 * LAMPORTS_PER_SOL : 0.007 * LAMPORTS_PER_SOL
      })

      instructions.push(signOffProposalIx, transferSolToDaoIx)
      // const approvalDaoProposalAddress = splGovernance.pda.proposalAccount({
      //     governanceAccount: approvalRealmGovernance,
      //     governingTokenMint: approvalRealmMint,
      //     proposalSeed
      //   }).publicKey

      
      // proposerDaoInnerIxs.push(innerIx1, innerIx2, innerIx3)

      // Insert metadata instructions in the Approval DAO Proposal in couple (Insert Ix 4 and above)
      // for (let i = 0; i<metadataInstructions.length; i++) {
      //   const innerIx = await splGovernance.insertTransactionInstruction(
      //     [metadataInstructions[i]],
      //     0, i, 0,
      //     approvalRealmGovernance,
      //     approvalDaoProposalAddress,
      //     proposerTorAddress,
      //     proposerTreasuryAccount,
      //     proposerTreasuryAccount
      //   )

      //   proposerDaoInnerIxs.push(innerIx)
      // }

      // instructions.push(proposerDaoProposalIx)

      // // Insert instructions in the Proposer DAO Proposal
      // for (let i = 0; i<proposerDaoInnerIxs.length; i++) {
      //   const innerIx = await splGovernance.insertTransactionInstruction(
      //     [proposerDaoInnerIxs[i]],
      //     0, i, governanceAccount.config.minTransactionHoldUpTime,
      //     governanceAccount.publicKey,
      //     proposerDaoProposalAddress,
      //     selectedTokenOwnerRecord,
      //     walletAddress,
      //     walletAddress
      //   )
      //   instructions.push(innerIx)
      // }

      setTotalTxs(instructions.length - 1)
      await broadcastTransaction(
        instructions,
        connection.rpcEndpoint,
        signer,
        setTxExecuted,
        handleProceedPage
      )
    }
  })
}