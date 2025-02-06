import Image from "next/image"

type ButtonProps = {
  className: string, 
  onClick: any,
  altText: string, 
  disabled: boolean,  
  size: number,
}

export default function ButtonPrev({className, onClick, altText, disabled=false, size=20}: ButtonProps) {
  return (
    <button 
      className={"rounded-md " + (!disabled ? "hover:bg-white/90 transition-colors duration-300 " : "") + className}
      title={altText}
      disabled={disabled}
      type="button" 
      onClick={!disabled ? onClick : undefined}>
      <Image
        src={!disabled ? "./arrow-left.svg" : "./arrow-left-gray.svg"}
        alt={altText}
        height={size}
        width={size}
      >
      </Image>
    </button>
  )
}