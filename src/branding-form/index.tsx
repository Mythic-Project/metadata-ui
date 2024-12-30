import React, { useState } from "react";
import { useGetRealmData } from "../hooks/useRealm";
import { ChevronLeft } from "lucide-react";
import { InputItem } from "./input";
import clsx from "clsx"
import BrandingDetails from "./branding";
import SocialsDetails from "./socials";
import ReviewDetails from "./review";
import { useSolanaWallet } from "../providers/wallet-provider";
import { useGetMetadataKeys } from "../hooks/useMetadataKeys";
import FinalContent from "./final";

export enum PageState {
  Branding,
  Socials,
  Review,
  Final
}

export interface MetadataItems {
  // symbol: string
  displayName: string
  daoImage: string
  bannerImage: string
  shortDescription: string
  category: string
  website: string
  twitter: string
  discord: string
  keywords: string
}

const pageStateTexts = ["Branding", "Socials", "Review"]

export default function BrandingForm({realmAddress}: {realmAddress: string}) {
  const [pageState, setPageState] = useState<PageState>(PageState.Branding)
  const [metadata, setMetadata] = useState<MetadataItems>({
    // symbol: "cv",
    displayName: "",
    daoImage: "",
    bannerImage: "",
    shortDescription: "",
    category: "",
    website: "",
    twitter: "",
    discord: "",
    keywords: ""
  })

  const realm = useGetRealmData(realmAddress).data
  const metadataKeys = useGetMetadataKeys().data
  const [errorMsg, setErrorMsg] = useState("")
  const wallet = useSolanaWallet()

  function handlePropertyChange(propertyName: string, newValue: string) {
    setErrorMsg("")
    const newMetadata = {...metadata}
    newMetadata[propertyName] = newValue
    setMetadata(newMetadata)
  }

  function handleProceedPage(newPage: PageState) {
    const {displayName} = metadata

    if (newPage === PageState.Review) {
      if (!wallet[0]) {
        setErrorMsg("The Wallet is not connected.")
        return
      }
    } else {
      if (!displayName) {
        setErrorMsg("Display Name is mandatory to proceed.")
        return
      }
    }

    setPageState(newPage)
  }
  
  return (
    <div className='relative my-4 md:mt-0 w-full md:w-1/2 p-4 mx-auto text-white' >
      {pageState !== PageState.Final &&
        <div>
          <h2 className="text-2xl font-medium mt-8 md:mt-4 text-center">Add your branding</h2>
          <h4 className="text-sm text-[#727272] mt-2 text-center">
            Add or edit the branding assets for 
            <span className="text-white cursor-pointer inline">
              <ChevronLeft className="inline-flex"/>
              {realm?.result?.name}
            </span>
          </h4>
          <div className="flex gap-2 w-full items-center text-sm font-medium mt-8">
            {pageStateTexts.map((state,index) => (
              <div className={clsx({
                "border-b-[#19B400]": index < pageState,
                "border-b-white": index === pageState,
                "border-b-[#727272]": index > pageState,
              }, {
                "text-white": index === pageState,
                "text-[#727272]": index !== pageState
              },"w-1/3 text-center border-b-2 pb-1")} key={state}>
                {state}
              </div>
            ))}
          </div>
        </div>
      }
      
      {
        pageState === PageState.Branding ?
          <BrandingDetails handlePropertyChange={handlePropertyChange} handleProceedPage={handleProceedPage} errorMsg={errorMsg} /> :
        pageState === PageState.Socials ?
          <SocialsDetails handleProceedPage={handleProceedPage} handlePropertyChange={handlePropertyChange} errorMsg={errorMsg} /> :
        pageState === PageState.Review ?
          <ReviewDetails metadata={metadata} realmAddress={realmAddress} connection={wallet[2]} wallet={wallet[0]!} handleProceedPage={handleProceedPage} /> :
          <FinalContent realmAddress={realmAddress} />
      }
    </div>
  )
}