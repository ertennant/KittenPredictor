import ComboBox from "./combobox";
import Image from "next/image";
import { tooltips } from "../cat-data-defs";

type AppProps = {
  title: string, 
  name: string, 
  options: string[],
}

export default function GeneInput({title, name, options}: AppProps) {
  function showTooltip() {
    console.log(tooltips[title]);
  }

  return (
    <div className="flex flex-row justify-between items-center">
      <label 
        htmlFor={"gen-" + name}
        onMouseOver={showTooltip}
      >
        {title}
      </label>
      <ComboBox
        htmlID={"gen-" + name}
        placeholder={options[0]}
        options={options}
        selectOption={null}
        size={"md"}
      >
      </ComboBox>
    </div>
  )
}