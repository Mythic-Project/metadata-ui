import { 
  createTransactionMessage,
  createSolanaRpc, 
  pipe, 
  setTransactionMessageLifetimeUsingBlockhash, 
  setTransactionMessageFeePayerSigner,
  appendTransactionMessageInstruction,
  appendTransactionMessageInstructions,
  sendAndConfirmTransactionFactory,
  signTransactionMessageWithSigners,
  createSolanaRpcSubscriptions,
  TransactionSigner,
} from "@solana/web3.js";
import { TransactionInstruction } from "solana-web3js-v1";
import { web1IxsToWeb2Ixs } from "./get-instructions";
import { PageState } from "../branding-form";

export default async function broadcastTransaction(
  instructions: TransactionInstruction[],
  endpoint: string,
  signer: TransactionSigner,
  setTxExecuted: (n: number) => void,
  handleProceedPage: (s: PageState) => void
) {
  const rpc = createSolanaRpc(endpoint)
  const subEndpoint = endpoint.replace('https', 'ws')+'/'
  const rpcSubscriptions = createSolanaRpcSubscriptions(subEndpoint)
  const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({rpc, rpcSubscriptions})

  const v2Instructions = web1IxsToWeb2Ixs(instructions)

  let counter = 1

  for (let i = 0; i < v2Instructions.length-1; i++) {
    setTxExecuted(counter)

    const { value: latestBlockhash } = await rpc
      .getLatestBlockhash({ commitment: "confirmed" })
      .send();

    const message = 
      i === v2Instructions.length - 2 ?
        pipe(
          createTransactionMessage({version: 0}),
          m => setTransactionMessageFeePayerSigner(signer, m),
          m => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
          m => appendTransactionMessageInstructions(v2Instructions.slice(i,i+2), m)
        ) :
        pipe(
          createTransactionMessage({version: 0}),
          m => setTransactionMessageFeePayerSigner(signer, m),
          m => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
          m => appendTransactionMessageInstruction(v2Instructions[i], m)
        )

    try {
      const signedTransaction = await signTransactionMessageWithSigners(message)
      const tx: any = {...signedTransaction}
      tx.lifetimeConstraint = message.lifetimeConstraint      
      await sendAndConfirmTransaction(tx, {commitment: "confirmed"})  
    } catch(e) {
      console.log(e)
      throw new Error(e.message)
    }
    
    counter++
  }

  handleProceedPage(PageState.Final)
}

// import { UiWalletAccount } from "@wallet-standard/react"
// import {
//   Connection,
//   VersionedTransaction,
//   TransactionMessage,
//   PublicKey,
//   TransactionInstruction,
//   ComputeBudgetProgram
// } from "solana-web3js-v1"


// export default async function broadcastTransaction(
//   connection: Connection,
//   wallet: UiWalletAccount,
//   ixs: TransactionInstruction[]
// ) {
//   const recentBlockhash = await connection.getLatestBlockhash({
//     commitment: "confirmed"
//   })

//   const txs: VersionedTransaction[] = []
//   const walletKey = new PublicKey(wallet.address)

//   ixs.unshift(
//     ComputeBudgetProgram.setComputeUnitPrice({
//         microLamports: 1_000_000
//     })
//   )

//   const mockTxMessage = new TransactionMessage({
//     payerKey: walletKey,
//     recentBlockhash: recentBlockhash.blockhash,
//     instructions: ixs
//   }).compileToV0Message()

//   const mockTx = new VersionedTransaction(mockTxMessage)

//   const simulateResult = await connection.simulateTransaction(mockTx, {
//       commitment: "confirmed"
//   })

//   const errObj = simulateResult.value.err as any

//   if (errObj.InstructionError) {
//     throw new Error(`Transaction simulation failed. Error: ${JSON.stringify(
//       simulateResult.value.err
//     )}`)
//   }

//   const CU_UNITS = simulateResult.value.unitsConsumed

//   if (CU_UNITS) {
//     ixs.unshift(
//       ComputeBudgetProgram.setComputeUnitLimit({
//         units: CU_UNITS * 2,
//       })
//     )
//   }

//   const txMessage = new TransactionMessage({
//     payerKey: walletKey,
//     instructions: ixs,
//     recentBlockhash: recentBlockhash.blockhash
//   }).compileToV0Message()

//   const tx = new VersionedTransaction(txMessage)
//   const signedTxs = await 

// }
