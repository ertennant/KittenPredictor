type AppProps = {
  text: string, 
  isVisible: boolean, 
}

export default function ToolTip({text, isVisible}: AppProps) {
  return (
    <div 
      className={"absolute p-2 rounded-md w-56 bg-white -right-8" + (!isVisible ? " hidden" : "")}
      style={isVisible ? {zIndex: 98} : {}}
    >
      <p>{text}</p>
    </div>
  )
}