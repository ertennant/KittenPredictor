import Image from "next/image";
import { useState } from "react";

import { tooltips } from "../cat-data-defs";
import ComboBox from "./combobox";
import ToolTip from "./tooltip";

type AppProps = {
  catID: string, 
  title: string, 
  name: string, 
  options: string[],
  onUpdate: any, 
  isOpen?: boolean, 
  onOpen?: any, 
  onClick?: any, 
  readOnly?: boolean, 
  initValue?: string, 
}

export default function GeneInput({catID, title, name, options, onUpdate, isOpen=false, readOnly=false, onOpen, initValue}: AppProps) {
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
        {!readOnly ? 
          <Image
            src="./question.svg"
            alt="show explanation"
            title="show explanation"
            height={16}
            width={16}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={window.innerWidth > 600 ? () => setShowTooltip(false) : undefined}
            onTouchStart={() => setShowTooltip(!showTooltip)} 
            className="inline align-text-bottom mx-1 cursor-pointer"
          >
          </Image>
          : ""
        }
      </label>
      <ComboBox
        htmlID={catID + "-gen-" + name}
        traitType={name}
        placeholder={options[0]}
        options={options}
        selectOption={onUpdate}
        onOpen={onOpen}
        isOpen={isOpen}
        size={"md"}
        reuseCombobox={false}
        readOnly={readOnly}
        initValue={initValue}
      >
      </ComboBox>
      {!readOnly ? 
        <ToolTip
          isVisible={showTooltip}
          text={tooltips[title]}
          onClick={() => setShowTooltip(false)}
        >
        </ToolTip>
        : ""
      }
    </div>
  )
}