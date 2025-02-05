"use client";

import Cat from '@/app/cat';
import GenotypeTable from '../components/genotype-table';
import KittenControls from '../components/kitten-controls';
import KittenProfile from '../components/kitten-profile';
import { useState } from 'react';

export default function AdvancedPredict() {
  const [kittens, setKittens] = useState<Cat[]>([]);
  const [activeMenuID, setActiveMenuID] = useState(undefined);

  // Use provided parent cat data to generate kittens. 
  function handleSubmit(event: any) {
    event.preventDefault(); 

    let fGenes : Map<string, string> = new Map();
    fGenes.set("xy", "XY");
    let mGenes : Map<string, string> = new Map();
    mGenes.set("xy", "XX");

    for (let element of event.currentTarget.elements) {
      if (element.id.includes("F-gen")) {
        fGenes.set(element.name.split('-')[2], element.value); 
      } else if (element.id.includes("M-gen")) {
        mGenes.set(element.name.split('-')[2], element.value); 
      }
    }

    let father = new Cat(
      event.currentTarget.elements["F-name"]?.value ?? "Father", 
      "XY", 
      fGenes
    )
    let mother = new Cat(
      event.currentTarget.elements["M-name"]?.value ?? "Mother", 
      "XX", 
      mGenes
    )
    let newKittens : Cat[] = []; 
    for (let i = 0; i < parseInt(event.currentTarget.litterSize.value); i++) {
      newKittens.push(father.makeKittenWith(mother, `Kitten ${i + 1}`));
    }
    setKittens(newKittens);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <KittenControls>
          </KittenControls>
        </div>
        <div className="flex flex-row justify-center gap-6 pt-6 px-6">
          <GenotypeTable
            catName="Father" 
            catID="F"
            readOnly={false}
            activeMenuID={activeMenuID}
            updateActiveMenu={setActiveMenuID}
            >
          </GenotypeTable>
          <GenotypeTable
            catName="Mother"
            catID="M"
            readOnly={false}
            activeMenuID={activeMenuID}
            updateActiveMenu={setActiveMenuID}
          >
          </GenotypeTable>
        </div>
      </form>
      <div className="flex flex-row justify-center gap-6 pt-6 flex-wrap">
        {kittens.length > 0 ? kittens.map(k => 
          <GenotypeTable
            key={k.name}
            catID={"K" + k}
            cat={k}
            readOnly={true}
          ></GenotypeTable>
        )
        : ""}
      </div>
    </div>
  )
}