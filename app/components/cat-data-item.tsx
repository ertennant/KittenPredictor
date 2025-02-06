import { colors, catTraitCSS } from "../cat-data-defs"; 
import CloseButton from "./button-close";

type DataInputProps = {
  catID: string, 
  traitValue: string, 
  traitType?: string, 
  readOnly?: boolean, 
  onDelete?: any,
  onChange?: any,
}

export default function CatDataItem({catID, traitType, traitValue, readOnly=false, onDelete, onChange}: DataInputProps) {
  function handleDelete() {
    onDelete(traitType);
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
        placeholder={traitType ? "Enter " + traitType.charAt(0).toUpperCase() + traitType.slice(1) : ""}
      >
      </input>
      {!readOnly ?
        <CloseButton
          className={"absolute -top-2 -right-2"}
          altText="remove trait"
          isVisible={true}
          onClick={handleDelete}
          size={12}
        >
        </CloseButton>
        : ""
      }
    </div>
  )  
}