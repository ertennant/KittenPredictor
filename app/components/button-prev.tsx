import Image from "next/image"

type ButtonProps = {
  className: string, 
  onClick: any,
  disabled: boolean,  
  altText: string, 
  size: number,
}

export default function ButtonPrev({className, onClick, disabled, altText, size}: ButtonProps) {
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