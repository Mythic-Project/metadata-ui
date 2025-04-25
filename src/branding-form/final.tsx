import { CircleCheckBig } from "lucide-react"
import React from "react"

export default function FinalContent({realmAddress, isDaoOwner}: {realmAddress: string, isDaoOwner: boolean}) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <CircleCheckBig className="text-[#793AFF]"/>
      <h3 className="text-2xl text-white font-semibold">
        {isDaoOwner ?
          "Proposal is successfully created!" :
          "The metadata is successfully updated!"
        }
      </h3>
      <p className="text-[#727272] text-sm font-medium">
        {isDaoOwner ?
          "Please visit your DAO and approve the proposal to reflect the new changes." :
          "Visit your DAO to see the changes."
        }
      </p>
      <a href={`https://app.realms.today/dao/${realmAddress}`}>
        <button className="bg-[#793AFF] rounded-md px-4 py-3 text-sm font-semibold mt-4">
          Go to the DAO
        </button>
      </a>
    </div>
  )
}