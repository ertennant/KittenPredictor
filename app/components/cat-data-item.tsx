import Image from "next/image"

type DataInputProps = {
  catID: string, 
  traitType: string, 
  traitValue: string, 
  onDelete: any
}

export default function CatDataItem({catID, traitType, traitValue, onDelete}: DataInputProps) {
  function handleDelete() {
    onDelete(traitType);
  }

  return (
    <div key={traitType} className="rounded-md bg-white/70 p-2 my-1 relative">
      <input 
        type="text" 
        className="bg-transparent outline-none cursor-default"
        id={catID + '-' + traitType} 
        name={catID + '-' + traitType} 
        value={traitValue}
        readOnly
        placeholder={"Enter " + traitType.charAt(0).toUpperCase() + traitType.slice(1)}
      >
      </input>
      <button type="button" 
        onClick={handleDelete} 
        className={"bg-white rounded-full p-1 absolute -top-2 -right-2"}
        >
        <Image
          src="/close.svg"
          alt="remove trait"
          width={12}
          height={12}
        >
        </Image>
      </button>
    </div>
  )  
}