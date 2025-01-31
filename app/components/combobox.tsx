import { useState } from "react";
import Image from "next/image";
type ComboBoxProps = {
  options: string[],
  selectOption: any | undefined,
  placeholder?: string, 
  size?: string,
  htmlID?: string, 
  reuseCombobox?: boolean,
  traitType?: string
}

export default function ComboBox({options, selectOption, placeholder, size, htmlID, reuseCombobox, traitType}: ComboBoxProps) {
  let [currentValue, setCurrentValue] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  function updateValue(event: any) {
    if (event.currentTarget.value !== "") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    setCurrentValue(event.currentTarget.value);
  }

  function toggleList(event: any) {
    event.stopPropagation(); 
    event.preventDefault(); 
    setIsOpen(!isOpen);
  }

  function handleSelect(event: any) {
    if (selectOption) {
      if (reuseCombobox) {
        setCurrentValue("");
      } else {
          setCurrentValue(event.currentTarget.id.split('-')[1]);
      }
      setIsOpen(false);
      selectOption(event);
    }
  }

  return (
    <div className="flex flex-col items-stretch rounded-2xl bg-white/20 focus-within:bg-white hover:bg-white border-2 border-accent-light"
      style={isOpen ? {zIndex: 99} : {}}
    >
      <div className={"relative" + (size == "lg" ? " text-xl" : "")}>
        <input id={htmlID ?? ""} 
          onChange={updateValue} 
          onKeyUp={e => e.key == 'Enter' ? handleSelect(e) : ""} 
          className={"p-2 bg-transparent outline-none" + (size == "lg" ? " w-56" : " w-20")} 
          value={currentValue} 
          placeholder={placeholder ?? ""}
        ></input>
        <button 
          onClick={toggleList} 
          className="absolute inset-y-1 right-1 rounded-full hover:bg-accent-light/50 transition-colors duration-300 p-2 align-middle">
          <Image
            src={isOpen ? "./up.svg" : "./down.svg"}
            alt={isOpen ? "Close List" : "Open List"}
            height={size == "lg" ? 20 : 16}
            width={size == "lg" ? 20 : 16}
          >
          </Image>
        </button>
      </div>
      {isOpen ? 
        <ul role="listbox" className={"absolute rounded-lg border-2 border-accent-light bg-white max-h-60 my-12 overflow-scroll" + (size == "lg" ? " w-56" : " w-20")} >
          {options.filter(trait => trait.toLowerCase().startsWith(currentValue.toLowerCase())).map(trait => 
            <li key={trait} id={!traitType ? "li-" + trait : "li-" + trait + '-' + traitType} onClick={handleSelect} className={"cursor-pointer p-2 my-1 hover:bg-accent-light/20 transition-colors"}>{trait}</li>
          )}
        </ul>
        : ""
      }
    </div>
  )
}