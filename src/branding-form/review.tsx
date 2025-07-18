import React, { useState } from "react"
import { MetadataItems, PageState } from "."
import { customStyles, splitKey } from "../utils"
import { useCreateMetadata } from "../hooks/useCreateMetadata"
import { MetadataClient } from "../client"
import { Connection } from "solana-web3js-v1"
import { UiWalletAccount } from "@wallet-standard/react"
import { useWalletAccountTransactionSigner } from "@solana/react"
import clsx from "clsx"
import Modal from 'react-modal';
import { useGetRealmData } from "../hooks/useRealm"
import { useGetMetadata } from "../hooks/useMetadata"

export default function ReviewDetails(
  {realmAddress, metadata, wallet, setIsDaoOwner, connection, handleProceedPage}: 
  {
    realmAddress: string, 
    metadata: MetadataItems,
    wallet: UiWalletAccount,
    setIsDaoOwner: (isDaoOwner: boolean) => void,
    handleProceedPage: (s: PageState) => void,
    connection: Connection | undefined
  }
) {
  const metadataItems = Object.entries(metadata)
  const sortedMetadataItems: [string, any][] = []
  const existingMetadata = useGetMetadata(realmAddress).data

  for (const item of metadataItems) {
    if (existingMetadata) {
      if (existingMetadata[item[0]] === item[1]) {
        continue
      }
    }
    if (item[0].includes('Image')) {
      sortedMetadataItems.unshift(item)
    } else {
      sortedMetadataItems.push(item)
    }
  }

  const client = MetadataClient(connection as Connection)
  const signer = useWalletAccountTransactionSigner(wallet, 'solana:mainnet')
  const realmData = useGetRealmData(realmAddress).data
  const [isCouncil, setIsCouncil] = useState(true)
  const [txExecuted, setTxExecuted] = useState(0)
  const [totalTxs, setTotalTxs] = useState(0)

  const {
    mutate: createMetadataFn,
    error: createMetadataError,
    isPending: createMetadataPending,
    isError: createMetadataFailed,
  } = useCreateMetadata(
    client, 
    realmAddress, 
    metadata, 
    signer, 
    isCouncil, 
    setIsDaoOwner,
    setTxExecuted, 
    setTotalTxs,
    handleProceedPage
  )


  return (
      <div className="mt-8 bg-[#0D0D0D] p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-6 mb-4">
              {sortedMetadataItems.map((item) =>
                  item[1] ? (
                      <div className="flex flex-col gap-2" key={item[0]}>
                          <div className="text-white font-semibold text-sm">
                              {splitKey(item[0])}
                          </div>
                          <div className="text-sm text-[#727272]">
                              {item[0].includes("Image") ? (
                                  <img src={item[1]} />
                              ) : (
                                  item[1]
                              )}
                          </div>
                      </div>
                  ) : (
                      ""
                  )
              )}
          </div>
          <div className="mt-2">
              {!realmData?.systemOwner && (
                  <div className="mb-8">
                      <h3 className="text-sm font-semibold mb-4">
                          Choose the proposal type
                      </h3>
                      {!realmData?.governance?.config.communityVoteThreshold
                          .disabled && (
                          <div
                              className="inline-block p-4 border-[1px] border-[#222222] rounded-lg bg-[#141414]"
                              onClick={() => setIsCouncil(false)}
                          >
                              <input
                                  type="radio"
                                  id="community_option"
                                  name="proposal_type"
                                  value="Community"
                                  onChange={() => setIsCouncil(false)}
                                  checked={!isCouncil}
                              />
                              <label htmlFor="community_option" className="p-2">
                                  Community
                              </label>
                          </div>
                      )}
                      {!realmData?.governance?.config.councilVoteThreshold
                          .disabled && (
                          <div
                              className="inline-block p-4 border-[1px] border-[#222222] rounded-lg bg-[#141414] ml-4"
                              onClick={() => setIsCouncil(true)}
                          >
                              <input
                                  type="radio"
                                  id="council_option"
                                  name="proposal_type"
                                  value="Council"
                                  onChange={() => setIsCouncil(true)}
                                  checked={isCouncil}
                              />
                              <label htmlFor="council_option" className="p-2">
                                  Council
                              </label>
                          </div>
                      )}
                  </div>
              )}
              <button
                  className={clsx(
                      {
                          "bg-[#793AFF]": !createMetadataPending,
                          "bg-[#7d7292]": createMetadataPending,
                      },
                      " rounded-md px-4 py-3 text-sm font-semibold"
                  )}
                  onClick={() => createMetadataFn()}
                  disabled={createMetadataPending}
              >
                  {createMetadataPending ? "Sending Tx" : "Create Metadata"}
              </button>
              <p className="text-xs text-[#868585] mt-4">
                  Make sure you have at least {existingMetadata ? 0.03 : 0.53} SOL in your wallet.
              </p>
              {!existingMetadata ? (
                  <p className="text-xs text-[#868585] mt-1">
                      Creating metadata costs 0.50 SOL in fees.
                  </p>
              ) : null}
              {createMetadataFailed && createMetadataError ? (
                  <div className="text-sm text-red-500 mt-4">
                      {createMetadataError.message}
                  </div>
              ) : (
                  ""
              )}
              <Modal
                  isOpen={createMetadataPending}
                  style={customStyles}
                  contentLabel="Transaction Processing"
                  ariaHideApp={false}
              >
                  <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold">
                          Transactions are Processing
                      </h3>
                      <p className="font-medium">
                          Currently processing {txExecuted} out of {totalTxs}
                      </p>
                  </div>
              </Modal>
          </div>
      </div>
  );
}