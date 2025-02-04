import React, { useState } from "react";
import { useGetRealmData } from "../hooks/useRealm";
import { useSolanaWallet } from "../providers/wallet-provider";
import { useGetMetadata } from "../hooks/useMetadata";
import { splitKey } from "../utils";

export default function MainForm(
  {setPage, realmAddress, setRealmAddress}: 
  {
    realmAddress: string,
    setRealmAddress: (s: string) => void,
    setPage: (n: number) => void
  }
) {
  
  const [errorMsg, setError] = useState("");
  const realm = useGetRealmData(realmAddress).data
  const metadata = useGetMetadata(realmAddress).data
  const undefinedMetadata = metadata === undefined
  const metadataItems = metadata ? Object.entries(metadata).filter(t => !!t[1]) : null
  const items: [string, any][] = []

  if (metadataItems) {
    for (const item of metadataItems) {
      if (item[0].includes('Image')) {
        items.unshift(item)
      } else {
        items.push(item)
      }
    }
  }
  
  const [wallet] = useSolanaWallet()

  const handleRealmChange = (e: string) => {
    setError("")
    setRealmAddress(e)
  }

  const handleCreate = () => {
    setError("")
    if (!wallet?.address) {
      setError("The wallet is not connected.")
      return
    }
    if (!realm?.result) {
      setError("The realm is not selected.")
      return
    }
    setPage(1)
  }

  return (
    <div className='relative my-8 md:mt-0 w-4/5 md:w-1/2 m-auto text-white' >
      <div className="w-full">
        <img src="./vec-logo.png" alt="mythic metadata logo" className='w-32 m-auto' />
      </div>
      <h2 className="text-2xl font-medium mt-8 md:mt-4 text-center">Create your Realms Metadata on Mythic</h2>
      <h4 className="text-sm text-[#727272] mt-2 text-center">Add or edit the metadata for your DAO</h4>
      <div className="bg-[#0D0D0D] rounded-lg w-full mt-8 p-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-4">
          <p className='text-sm font-medium whitespace-nowrap'>Selected Realm:</p>
          <input 
            className="bg-[#141414] w-full px-2 py-1 border-[1px] border-[#222222] rounded-lg placeholder:text-sm" 
            placeholder="Enter Realm Address"
            value={realmAddress}
            onChange={e => handleRealmChange(e.target.value)}
          />
        </div>
        <div className="mt-8">
          <p className='text-sm font-medium mb-4'>Current Metadata:</p>
          {metadata ?
             <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-6 mb-4">
             {items.map(item => (
               item[1] ?
               <div className="flex flex-col gap-2" key={item[0]}>
                 <div className="text-white font-semibold text-sm">{splitKey(item[0])}</div>
                 <div className="text-sm text-[#727272]">{
                   item[0].includes('Image') ? 
                   <img src={item[1]} alt="metadata" /> :
                   item[1]
                 }</div>
               </div> :
               ""
             ))}
             
           </div> :
            <div className="">
              {realm?.error === 3 && realm.result &&
                <div className="flex gap-2 items-center justify-center text-center mt-4">
                  <div className="">
                    <img src="./logo-realms.svg" alt="realms logo" className="w-12" />
                  </div>
                  <h3 className=" text-gray-100">{realm.result.name}</h3>
                </div>
              }
              <div className="text-center mt-2 text-gray-300 text-[15px]">
                {
                  realm?.error === 1 ?
                    "The entered public key is invalid, kindly recheck and provide the correct Realm." :
                  realm?.error === 2 ?
                    "No realm exists for the provided public key, kindly recheck." :
                  realm?.error === 3 ?
                    "The Realm does not have any metadata. Kindly proceed below to add the metadata" :
                    ""
                }
              </div>
              <div className="mt-8 w-full justify-center flex md:justify-end">
                <button 
                  className={`${undefinedMetadata ? "bg-gray-500" : "bg-[#793AFF]"} rounded-md px-4 py-3 text-sm font-semibold`}
                  onClick={handleCreate}
                  disabled={undefinedMetadata}
                >
                  Create Metadata
                </button>
              </div>
            </div>
          }
        </div>
        {errorMsg !== "" &&
          <div className="text-sm text-red-500">
          {errorMsg}
          </div>
        }
      </div>
    </div>
  )
}