import { Image } from "lucide-react"
import React from "react"

const categories = ['defi', 'social', 'web3', 'daotools', 'nft', 'gaming', 'legal', 'other']

export function InputItem(
  {label, type, defaultValue, maxLength, placeholder, onChange}: 
  {
    label: string,
    type: 'input' | 'textarea' | 'file' | 'dropdown',
    defaultValue?: string,
    maxLength?: number,
    placeholder?: string,
    onChange?: (s: any) => void
  }
) {
  return (
    <div className="w-full">
      <label htmlFor={label} className="text-sm font-semibold">{label}</label><br />
      {
        type === 'input' ?
          <input 
            id={label} placeholder={placeholder ?? ""}           
            className="bg-[#141414] w-full mt-1 px-2 py-1 border-[1px] border-[#222222] rounded-lg placeholder:text-sm
            placeholder:text-[#727272]"
            onChange={onChange ? e => onChange(e.target.value) : undefined}
            maxLength={maxLength}
            defaultValue={defaultValue}
          /> :
        type === 'textarea' ?
          <textarea 
            id={label} placeholder={placeholder ?? ""}            
            className="bg-[#141414] w-full mt-1 px-2 py-1 border-[1px] border-[#222222] rounded-lg placeholder:text-sm
            placeholder:text-[#727272]" 
            onChange={onChange ? e => onChange(e.target.value) : undefined}
            maxLength={maxLength}
            defaultValue={defaultValue}
          /> :
        type === 'file' ?
          <div className="relative p-6 border-[1px] border-[#222222] bg-[#141414] rounded-lg mt-1">
            <div className="absolute left-0 top-4 w-full flex flex-col items-center justify-center">
              <Image className="" />
              <p className="text-sm">Upload your image</p>
            </div>
            <input id="file-upload" type="file" accept=".png, .jpg" className="w-full opacity-0"
              // onChange={(e) => handleImg(e.target.files ? e.target.files[0] : undefined)}
              onChange={onChange ? e => onChange(e.target.files ? e.target.files[0] : undefined) : undefined}
            /> 
          </div> :
          <select name="presets" className="bg-[#141414] w-full text-sm py-2 px-2
            border-[1px] border-[#222222] rounded-lg my-1" 
            // onChange={(e) => handleChange('council', e.target.value === "true" ? true : false)}
            onChange={onChange ? e => onChange(e.target.value) : undefined}
            defaultValue={defaultValue ? defaultValue : "true"}
          >
            {categories.map(category => (
              <option value={category} className="" key={category}>{category}</option>
            ))}
          </select>
      }
      {maxLength ? <p className="float-right text-sm text-gray-200 mt-2">
        Max characters: {maxLength}</p> 
      : null}
    </div>
  )
}