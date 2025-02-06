import Image from "next/image"

type ButtonProps = {
  className: string, 
  onClick: any, 
  altText: string, 
  size: number
}

export default function ButtonNext({className, onClick, altText, size}: ButtonProps) {
  return (
    <button 
      className={"hover:bg-white/90 transition-colors duration-300 rounded-md " + className}
      title={altText}
      type="button" 
      onClick={onClick}>
      <Image
        src="./arrow-right.svg"
        alt={altText}
        height={size}
        width={size}
      >
      </Image>
    </button>
  )
}