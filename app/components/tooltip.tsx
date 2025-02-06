import CloseButton from "./button-close"

type AppProps = {
  text: string, 
  isVisible: boolean, 
  onClick: any, 
}

export default function ToolTip({text, isVisible, onClick}: AppProps) {
  return (
    <div 
      className={"absolute p-2 rounded-md w-56 bg-white right-2" + (!isVisible ? " hidden" : "")}
      style={isVisible ? {zIndex: 98} : {}}
    >
      <CloseButton
        className="absolute -top-2 -right-2"
        altText="close tooltip"
        isVisible={window.innerWidth <= 600}
        onClick={onClick}
        size={12}
      >
      </CloseButton>
      <p>{text}</p>
    </div>
  )
}