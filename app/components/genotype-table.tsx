import GeneInput from "./gene-input";
import { genes } from "../cat-data-defs"; 

export default function GenotypeTable() {
  return (
    <div className="flex flex-row justify-between rounded-2xl p-6 border border-white bg-white/70 backdrop-blur-md">
      <form className="flex flex-col w-48">
        <h2>Genotypes</h2>
        {
          Object.entries(genes).map(entry => 
            <GeneInput
              key={entry[0]}
              title={entry[0]}
              name={entry[0].toLowerCase()}
              options={entry[1]}
            >
            </GeneInput>
          )
        }
      </form>
      <div
        className="flex flex-col w-48"
      >
        <h2>Phenotypes</h2>
      </div>
    </div>
  )
}