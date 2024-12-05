import Image from "next/image"

type DataInputProps = {
  readOnly?: boolean, 
  catID: string, 
  traitType: string, 
  traitValue: string, 
  onDelete?: any
}

export default function CatDataItem({readOnly, catID, traitType, traitValue, onDelete}: DataInputProps) {
  function handleDelete() {
    onDelete(traitType);
  }

  return (
    <div className="rounded-2xl bg-white/70 p-2 my-1 relative">
      <input 
        type="text" 
        className="bg-transparent outline-none cursor-default w-full text-center"
        id={catID + '-trait-' + traitValue} 
        name={catID + '-trait-' + traitValue} 
        value={traitValue}
        readOnly
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