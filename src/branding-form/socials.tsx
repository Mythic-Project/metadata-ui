import React from "react"
import { InputItem } from "./input"
import { PageState } from "."
import { useGetMetadata } from "../hooks/useMetadata"

export default function SocialsDetails(
  {
    errorMsg, realmAddress, handleProceedPage, handlePropertyChange
  }:
  {
    errorMsg: string,
    realmAddress: string,
    handlePropertyChange: (s: string, e: string) => void,
    handleProceedPage: (s: PageState) => void
  }
) {
  const metadata = useGetMetadata(realmAddress).data
  
  return (
    <div className="mt-8 flex flex-col gap-4 bg-[#0D0D0D] p-4 rounded-lg">
      <InputItem
        label="Website" type="input" placeholder="https://realms.today" 
        onChange={(e) => handlePropertyChange('website', e)} maxLength={30}
        defaultValue={metadata?.website}
      />
      <InputItem
        label="Twitter (X)" type="input" placeholder="@RealmsDAO" 
        onChange={(e) => handlePropertyChange('twitter', e)} maxLength={30}
        defaultValue={metadata?.twitter}
      />
      <InputItem
        label="Discord" type="input" placeholder="discord.gg/realms" 
        onChange={(e) => handlePropertyChange('discord', e)} maxLength={30}
        defaultValue={metadata?.discord}
      />
      <InputItem
        label="Keywords" type="input" placeholder="DAOs, Community, NFTs, etc." 
        onChange={(e) => handlePropertyChange('keywords', e)} maxLength={40}
        defaultValue={metadata?.keywords}
      />
      <div className="mt-2">
        <button 
          className="bg-[#793AFF] rounded-md px-4 py-3 text-sm font-semibold" 
          onClick={() => handleProceedPage(PageState.Review)} 
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