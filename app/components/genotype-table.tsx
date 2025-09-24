import Image from "next/image";
import { SetStateAction, useState } from "react";

import ButtonNext from "./button-next";
import ButtonPrev from "./button-prev";
import Cat from "../cat";
import { genes } from "../cat-data-defs"; 
import CatDataItem from "./cat-data-item";
import GeneInput from "./gene-input";
import { combineAlleles, convertToPhenoType } from "../genotype";

type AppProps = {
  catID: string, 
  catName?: string, 
  cat?: Cat, 
  activeMenuID?: string, 
  updateActiveMenu?: any, 
  className?: string,
}

export default function GenotypeTable({catID, catName, cat, updateActiveMenu, activeMenuID, className}: AppProps) {
  const [genotype, setGenotype] : [Map<string, string>, React.Dispatch<SetStateAction<Map<string, string>>>] = useState(
    new Map([
      ["white", ""],
      ["orange", ""],
      ["brown", ""],
      ["dilute", ""],
      ["agouti", ""],
      ["colorpoint", ""],
      ["longhair", ""]  
    ])
  );
  const [openPanel, setOpenPanel] = useState(0);

  function changeVisiblePanel(direction: string) {
    if (direction === "next") {
      setOpenPanel(1);
    } else if (direction === "prev") {
      setOpenPanel(0);
    }
  }

  function updatePhenotype(pair: string, value: string) {
    let updated = new Map(genotype);
    updated.set(pair, value);
    setGenotype(updated);
  }

  return (
    <div className={className + " " + "rounded-2xl p-2 border border-white bg-white/70 backdrop-blur-md"}
      style={(catName === "Father" || catName === "Mother") ? {zIndex: 5} : {}}
    >
      <h1 className="font-extrabold text-lg w-full">
        {catName ?? cat?.name ?? "Cat"}
        <Image
          src={(catID == "F" || cat?.xy == "XY") ? "./male.svg" : "./female.svg"}
          alt={(catID == "F" || cat?.xy == "XY") ? "male" : "female"}
          height={16}
          width={16}
          className="inline align-text-bottom"
        >
        </Image>
      </h1>
      <div className="flex flex-row justify-between items-stretch ">
        <div className={"flex flex-col w-52 mr-2 " + (openPanel === 1 ? "max-[600px]:hidden" : "")}>
          <h2 className="font-bold">Genes</h2>
          { cat && cat.genes ? 
            Array.from(cat.genes.entries()).map(entry => 
              <GeneInput
                key={entry[0]}
                title={entry[0]}
                catID={catID}
                name={entry[0].toLowerCase()}
                options={[]}
                onUpdate={undefined}
                readOnly={true}
                initValue={entry[1].join("")}
              >
              </GeneInput>
            )
            : 
            Object.entries(genes).map(entry => 
              <GeneInput
                key={entry[0]}
                title={entry[0]}
                catID={catID}
                name={entry[0].toLowerCase()}
                options={entry[0] !== "Orange" ? entry[1] : catID === "F" ? entry[1].filter(e => e.length == 1) : entry[1].filter(e => e.length == 2)}
                onUpdate={updatePhenotype}
                readOnly={false}
                isOpen={activeMenuID === catID + "-gen-" + entry[0]}
                onOpen={() => (activeMenuID !== catID + "-gen-" + entry[0] ? updateActiveMenu(catID + "-gen-" + entry[0]) : updateActiveMenu(undefined))}
              >
              </GeneInput>
            )
          }
        </div>
        <ButtonNext
          className={openPanel === 0 ? "px-1 py-32 min-[600px]:hidden" : "hidden"}
          altText="Show Phenotype Panel"
          disabled={false}
          onClick={() => changeVisiblePanel("next")}
          size={20}          
        >
        </ButtonNext>
        <ButtonPrev
          className={openPanel === 1 ? "pl-2 py-32 min-[600px]:hidden" : "hidden"}
          altText="Show Gene Panel"
          disabled={false}
          onClick={() => changeVisiblePanel("prev")}
          size={20}          
        >
        </ButtonPrev>
        <div className={"flex flex-col w-52 ml-4 " + (openPanel === 0 ? "max-[600px]:hidden" : "")}>
          <h2 className="font-bold">Phenotype</h2>
          {
            Array.from(convertToPhenoType(cat ? combineAlleles(cat.genes) : genotype).entries()).filter(entry => entry[0] != "xy").map(entry => 
              entry[1] ?
              <CatDataItem
                key={"phen-" + entry[0]}
                readOnly={true}
                catID={catID}
                traitValue={entry[1]}
              >
              </CatDataItem>
              : 
              ""
            )
          }
        </div>
      </div>
    </div>
  )
}