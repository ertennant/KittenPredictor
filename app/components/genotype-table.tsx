import GeneInput from "./gene-input";
import { SetStateAction, useState } from "react";
import { genes } from "../cat-data-defs"; 
import { convertToPhenoType } from "../genotype";
import CatDataItem from "./cat-data-item";
import Image from "next/image";

type AppProps = {
  catName: string, 
  catID: string, 
}

export default function GenotypeTable({catID, catName}: AppProps) {
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

  function updatePhenotype(event: any) {    
    let k = event.currentTarget.id.split('-')[2];
    let v = event.currentTarget.id.split('-')[1]; 
    console.log(`k = ${k}, v = ${v}`);
    let updated = new Map(genotype);
    updated.set(k, v);
    setGenotype(updated);
    // console.log(genotype);
  }

  return (
    <div className="rounded-2xl p-2 border border-white bg-white/70 backdrop-blur-md">
      <h1 className="font-extrabold text-lg w-full">
        {catName}
        <Image
          src={catID == "F" ? "./male.svg" : "./female.svg"}
          alt={catID == "F" ? "male" : "female"}
          height={16}
          width={16}
          className="inline align-text-bottom"
        >
        </Image>
      </h1>
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col w-52">
          <h2 className="font-bold">Genotypes</h2>
          {
            Object.entries(genes).map(entry => 
              <GeneInput
                key={entry[0]}
                title={entry[0]}
                catID={catID}
                name={entry[0].toLowerCase()}
                options={entry[1]}
                onUpdate={updatePhenotype}
              >
              </GeneInput>
            )
          }
        </div>
        <div className="flex flex-col w-52 ml-4">
          <h2 className="font-bold">Phenotypes</h2>
          {
            convertToPhenoType(genotype).entries().toArray().map(entry => 
              entry[1] ?
              <CatDataItem
                key={"phen-" + entry[0]}
                readOnly={true}
                catID={catID}
                traitValue={entry[1]}
              >
              </CatDataItem>
              : ""
            )
          }
        </div>
      </div>
    </div>
  )
}