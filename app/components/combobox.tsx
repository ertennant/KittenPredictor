import { EventHandler, useState } from "react";
import Image from "next/image";
type ComboBoxProps = {
  options: string[],
  selectOption: any | undefined,
  isOpen?: boolean, 
  onOpen?: any, 
  placeholder?: string, 
  size?: string,
  htmlID?: string, 
  reuseCombobox?: boolean,
  traitType?: string,
  readOnly?: boolean, 
  initValue?: string, 
}

export default function ComboBox({options, isOpen, onOpen, selectOption, placeholder, size, htmlID, reuseCombobox, traitType, readOnly, initValue}: ComboBoxProps) {
  let [currentValue, setCurrentValue] = useState(initValue ?? "");

  function updateValue(event: any) {
    setCurrentValue(event.currentTarget.value);
    event.stopPropagation(); 
    if (event.key === "Enter") {
      event.preventDefault(); 
      handleEnter(event);
    }
  }

  function handleClick(event: any) {
    event.preventDefault(); 
    onOpen();
  }

  function handleSelect(event: any) {
    if (!readOnly) {
      let k: string | undefined;  
      let v = event.currentTarget.id.split('-')[1]; 
      if (reuseCombobox) {
        k = v; 
        selectOption(v);
        setCurrentValue("");
      } else {
        k = traitType; 
        selectOption(k, v);
        setCurrentValue(v);
      }
      onOpen(undefined);
    }
  }

  function handleEnter(event: any) {
    event.preventDefault(); 
    event.stopPropagation();
    let v = event.currentTarget.value;
    if (options.includes(v)) { 
      if (reuseCombobox) {
        selectOption(v);
        setCurrentValue("");
      } else {
        let k = traitType;
        selectOption(k, v);
      }
    }
  }

  return (
    <div className={"flex flex-col items-stretch bg-white/20 focus-within:bg-white hover:bg-white border-2 border-accent-light" + (size == "lg" ? " rounded-2xl" : " rounded-lg")}
      style={isOpen ? {zIndex: 150} : {}}
    >
      <div className={"relative" + (size == "lg" ? " text-xl" : "")}>
        <input id={htmlID ?? ""} 
          type="text"
          name={traitType ? htmlID + '-' + traitType : htmlID}
          onChange={!readOnly ? updateValue : undefined} 
          onInput={!readOnly ? updateValue : undefined}
          onKeyDown={updateValue}
          className={"bg-transparent outline-none" + (size == "lg" ? " p-2 w-56" : " py-1 px-2 w-20")} 
          readOnly={readOnly}
          value={currentValue} 
          placeholder={placeholder ?? ""}
        ></input>
        {!readOnly ? 
          <button 
            type="button"
            onClick={handleClick} 
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