import { useState } from "react";
import Image from "next/image";
type ComboBoxProps = {
  options: string[],
  addTrait: any,
}

export default function ComboBox({options, addTrait}: ComboBoxProps) {
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

  function toggleList() {
    setIsOpen(!isOpen);
  }

  function handleSelect(event: any) {
    setCurrentValue("");
    setIsOpen(false);
    addTrait(event);
  }

  return (
    <div className="flex flex-col items-stretch rounded-2xl bg-white/20 focus-within:bg-white focus-within:bg-white hover:bg-white border-2 border-accent-light my-2text-lg">
      <div className="relative text-xl">
        <input onChange={updateValue} className="p-2 bg-transparent outline-none" value={currentValue} placeholder="Enter Trait"></input>
        <button onClick={toggleList} className="absolute inset-y-1 right-1 rounded-full hover:bg-accent-light/50 p-2 align-middle">
          <Image
            src={isOpen ? "./up.svg" : "./down.svg"}
            alt={isOpen ? "Close List" : "Open List"}
            height={20}
            width={20}
          >
          </Image>
        </button>
      </div>
      {isOpen ? 
        <ul role="listbox" className="rounded-lg border-2 border-accent-light w-56 bg-white max-h-60 overflow-scroll absolute my-12">
          {options.filter(trait => trait.startsWith(currentValue)).map(trait => 
            <li key={trait} id={"li-" + trait} onClick={handleSelect} className={"cursor-pointer p-2 my-1 hover:bg-accent-light/20"}>{trait}</li>
          )}
        </ul>
        : ""
      }
    </div>
  )
}