import GeneInput from "./gene-input";
import { SetStateAction, useState } from "react";
import { geneMappings, genes } from "../cat-data-defs"; 
import { convertToPhenoType } from "../genotype";
import CatDataItem from "./cat-data-item";

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
    console.log(genotype);
  }

  return (
    <div className="flex flex-row justify-between rounded-2xl p-2 border border-white bg-white/70 backdrop-blur-md">
      <div className="flex flex-col w-48">
        <h2>Genotypes</h2>
        {
          Object.entries(genes).map(entry => 
            <GeneInput
              key={entry[0]}
              title={entry[0]}
              catID={catID}
              name={entry[0].toLowerCase()}
              options={entry[1]}
              onUpdate={updatePhenotype}
              // gValue={genotype.get(entry[0])!}
              // pValue={""}
            >
            </GeneInput>
          )
        }
      </div>
      <div className="flex flex-col w-48">
        <h2>Phenotypes</h2>
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
  )
}