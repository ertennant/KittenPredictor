import Image from "next/image";

type ButtonProps = {
  className: string, 
  onClick: any, 
  altText: string, 
  isVisible: boolean, 
  size: number, 
}

export default function CloseButton({className, onClick, altText, isVisible=true, size=12}: ButtonProps) {
  return (
    <button type="button" 
      onClick={onClick} 
      className={className + (!isVisible ? " hidden " : " ") + "bg-white rounded-full p-1 hover:shadow-md hover:shadow-slate-500/25"}
      title={altText}
      >
      <Image
        src="./close.svg"
        alt="remove trait"
        width={size}
        height={size}
      >
      </Image>
    </button>
  )
}