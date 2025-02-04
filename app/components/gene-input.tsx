import ComboBox from "./combobox";
import { useState } from "react";
import ToolTip from "./tooltip";
import { tooltips } from "../cat-data-defs";
import Image from "next/image";

type AppProps = {
  title: string, 
  name: string, 
  catID: string, 
  options: string[],
  onUpdate: any, 
  readOnly?: boolean, 
  initValue?: string, 
}

export default function GeneInput({catID, title, name, options, onUpdate, readOnly, initValue}: AppProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="flex flex-row justify-between items-center hover:bg-white/80 transition-colors duration-300 rounded-md"
      id={name}
    >
      <label 
        className="flex flex-row"
        htmlFor={catID + "-gen-" + name}
      >
        {title}
        <Image
          src="./question.svg"
          alt="show explanation"
          height={16}
          width={16}
          onMouseEnter={e => setShowTooltip(true)}
          onMouseLeave={e => setShowTooltip(false)}
          onTouchStart={e => setShowTooltip(!showTooltip)} 
          className="inline align-text-bottom mx-1 cursor-pointer"
        >
        </Image>
      </label>
      <ComboBox
        htmlID={catID + "-gen-" + name}
        traitType={name}
        placeholder={options[0]}
        options={options}
        selectOption={onUpdate}
        size={"md"}
        reuseCombobox={false}
        readOnly={readOnly}
        initValue={initValue}
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