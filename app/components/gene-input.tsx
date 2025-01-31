import ComboBox from "./combobox";
import { useState } from "react";
import ToolTip from "./tooltip";
import { tooltips } from "../cat-data-defs";

type AppProps = {
  title: string, 
  name: string, 
  catID: string, 
  options: string[],
  onUpdate: any, 
}

export default function GeneInput({catID, title, name, options, onUpdate}: AppProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="flex flex-row px-2 justify-between items-center hover:bg-white/80"
      onMouseEnter={e => setShowTooltip(true)}
      onMouseLeave={e => setShowTooltip(false)}
      // onBlur={e => setShowTooltip(false)}
      id={name}
    >
      <label 
        htmlFor={catID + "-gen-" + name}
      >
        {title}
      </label>
      <ComboBox
        htmlID={catID + "-gen-" + name}
        traitType={name}
        placeholder={options[0]}
        options={options}
        selectOption={onUpdate}
        size={"md"}
        reuseCombobox={false}
      >
      </ComboBox>
      <ToolTip
        isVisible={showTooltip}
        text={tooltips[title]}
      >
      </ToolTip>
    </div>
  )
}