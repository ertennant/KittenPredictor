import Image from "next/image"
import { ChangeEvent } from "react";
import { colors, catTraitCSS } from "../cat-data-defs"; 


type DataInputProps = {
  catID: string, 
  traitType: string, 
  traitValue: string, 
  readOnly?: boolean, 
  onDelete?: any,
  onChange?: any,
}

export default function CatDataItem({readOnly, catID, traitType, traitValue, onDelete, onChange}: DataInputProps) {
  function handleDelete() {
    onDelete(traitType);
  }

  function handleChange(event: ChangeEvent) {
    onChange(event);
  }

  return (
    <div className={"rounded-2xl p-2 my-1 relative " + (colors.includes(traitValue) ? catTraitCSS[traitValue] : "bg-white/70")}>
      <input 
        type="text" 
        className={"bg-transparent" + " outline-none cursor-default w-full text-center"}
        id={catID + '-trait-' + traitValue} 
        name={catID + '-trait-' + traitValue} 
        value={traitValue}
        readOnly
        onChange={onChange}
        placeholder={"Enter " + traitType.charAt(0).toUpperCase() + traitType.slice(1)}
      >
      </input>
      {!readOnly ?
        <button type="button" 
          onClick={handleDelete} 
          className="bg-white rounded-full p-1 absolute -top-2 -right-2 hover:shadow-md hover:shadow-slate-500/25"
          >
          <Image
            src="/close.svg"
            alt="remove trait"
            width={12}
            height={12}
          >
          </Image>
        </button>
        : ""
      }
    </div>
  )  
}