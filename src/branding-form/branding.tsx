import React from "react"
import { InputItem } from "./input"
import { PageState } from "."
import { useGetMetadata } from "../hooks/useMetadata"

export default function BrandingDetails(
  { errorMsg, realmAddress, handlePropertyChange, handleProceedPage } :
  {
    errorMsg: string
    realmAddress: string
    handlePropertyChange: (s: string, e: string) => void
    handleProceedPage: (s: PageState) => void
  }
) {
  const metadata = useGetMetadata(realmAddress).data
  
  return (
    <div className="mt-8 flex flex-col gap-4 bg-[#0D0D0D] p-4 rounded-lg">
      <InputItem
        label="Display Name" type="input" placeholder="My DAO Name" 
        onChange={(e) => handlePropertyChange('displayName', e)} maxLength={50}
        defaultValue={metadata?.displayName}
      />
      {/* <InputItem label="Symbol" type="input" placeholder="A unique identification" 
        onChange={(e) => handlePropertyChange('symbol', e)} 
      /> */}
      <InputItem label="DAO Image" type="input" placeholder="Post the image link here." 
        onChange={(e) => handlePropertyChange('daoImage', e)} maxLength={100}
        defaultValue={metadata?.daoImage}
      />
      <InputItem label="Banner Image" type="input" placeholder="Post the image link here."
        onChange={(e) => handlePropertyChange('bannerImage', e)} maxLength={100}
        defaultValue={metadata?.bannerImage}
      />

      {/* <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/5"><InputItem label="DAO Image" type="file" onChange={setAny} /></div>
        <div className="md:w-3/5"><InputItem label="Banner Image" type="file" /></div>
      </div> */}
      <InputItem label="Short Description" type="textarea" placeholder="Provide a short decription for your project. Max characters: 100"
        onChange={(e) => handlePropertyChange('shortDescription', e)} maxLength={100} defaultValue={metadata?.shortDescription}
      />
      <InputItem label="Category" type="dropdown" defaultValue={metadata?.category}
        onChange={(e) => handlePropertyChange('category', e)} 
      />
      <div className="mt-2">
        <button 
          className="bg-[#793AFF] rounded-md px-4 py-3 text-sm font-semibold" 
          onClick={() => handleProceedPage(PageState.Socials)}
        >
          Continue
        </button>
      </div>
      <div className="text-sm text-red-500">
        {errorMsg}
      </div>
    </div>
  )
}