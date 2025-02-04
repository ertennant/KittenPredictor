import { useState } from "react";
import Image from "next/image";
type ComboBoxProps = {
  options: string[],
  selectOption: any | undefined,
  placeholder?: string, 
  size?: string,
  htmlID?: string, 
  reuseCombobox?: boolean,
  traitType?: string,
  readOnly?: boolean, 
  initValue?: string, 
}

export default function ComboBox({options, selectOption, placeholder, size, htmlID, reuseCombobox, traitType, readOnly, initValue}: ComboBoxProps) {
  console.log(`initValue=${initValue}, readOnly=${readOnly}`);
  let [currentValue, setCurrentValue] = useState(initValue ?? "");
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
    <div className={"flex flex-col items-stretch bg-white/20 focus-within:bg-white hover:bg-white border-2 border-accent-light" + (size == "lg" ? " rounded-2xl" : " rounded-lg")}
      style={isOpen ? {zIndex: 99} : {}}
    >
      <div className={"relative" + (size == "lg" ? " text-xl" : "")}>
        <input id={htmlID ?? ""} 
          name={traitType ? htmlID + '-' + traitType : htmlID}
          onChange={!readOnly ? updateValue : undefined} 
          onKeyUp={!readOnly ? (e => e.key == 'Enter' ? handleSelect(e) : "") : undefined} 
          className={"bg-transparent outline-none" + (size == "lg" ? " p-2 w-56" : " py-1 px-2 w-20")} 
          readOnly={readOnly}
          value={currentValue} 
          placeholder={placeholder ?? ""}
        ></input>
        {!readOnly ? 
          <button 
            onClick={!readOnly ? toggleList : undefined} 
            className={"absolute rounded-full align-middle inset-y-1" + (!readOnly ? " hover:bg-accent-light/50 transition-colors duration-300 " : "") + (size == "lg" ? " p-2 right-1" : " p-1 right-0")}>
            <Image
              src={isOpen ? "./up.svg" : "./down.svg"}
              alt={isOpen ? "Close List" : "Open List"}
              height={size == "lg" ? 20 : 16}
              width={size == "lg" ? 20 : 16}
            >
            </Image>
          </button>
          : ""
        }
      </div>
      {!readOnly && isOpen ? 
        <ul role="listbox" className={"absolute rounded-lg border-2 border-accent-light bg-white max-h-60 overflow-scroll" + (size == "lg" ? " w-56 my-12" : " w-20 my-8")} >
          {options.filter(trait => trait.toLowerCase().startsWith(currentValue.toLowerCase())).map(trait => 
            <li key={trait} id={!traitType ? "li-" + trait : "li-" + trait + '-' + traitType} onClick={handleSelect} className={"cursor-pointer p-2 my-1 hover:bg-accent-light/20 transition-colors"}>{trait}</li>
          )}
        </ul>
        : ""
      }
    </div>
  )
}