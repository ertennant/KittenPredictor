import Image from "next/image"

type ButtonProps = {
  itemType: string, 
  onClick: any
}

export default function AddButton({itemType, onClick}: ButtonProps) {
  return(
    <button 
      type="button"
      className="rounded-full bg-white/30 hover:bg-white/40 shadow-slate-500 w-fit h-fit self-center active:shadow-inner" 
      title={"Add New " + itemType}
      onClick={onClick}
      >
      <Image
        src='/plus.svg'
        alt={"Add New " + itemType}
        width={40}
        height={40}
      >
      </Image>
    </button>
  )
}