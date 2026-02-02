"use client";

import Cat from '@/app/cat';
import GenotypeTable from './components/genotype-table';
import KittenControls from './components/kitten-controls';
import { useState } from 'react';
import ButtonPrev from './components/button-prev';
import ButtonNext from './components/button-next';
import { superscriptMappings } from './cat-data-defs';

export default function AdvancedPredict() {
  const [kittens, setKittens] = useState<Cat[]>([]); // array of kittens 
  const [activeMenuID, setActiveMenuID] = useState(undefined); // ID of ComboBox menu currently open (to prevent more than one from being open at the same time)
  const [visibleParent, setVisibleParent] = useState("F"); // ID of parent cat currently visible (for small screens only)

  // Use provided parent cat data to generate kittens. 
  function handleSubmit(event: any) {
    event.preventDefault(); 

    let fGenes : Map<string, string> = new Map();
    fGenes.set("xy", "XY");
    let mGenes : Map<string, string> = new Map();
    mGenes.set("xy", "XX");

    for (let element of event.currentTarget.elements) {
      let val = element.value; 
      if (val.includes("/")) {
        val = val.replace("/", "");
      }
      for (const sup in superscriptMappings) {
        val = val.replaceAll(sup, superscriptMappings[sup])
      }
      if (element.id.includes("F-gen")) {
        fGenes.set(element.name.split('-')[2], val); 
      } else if (element.id.includes("M-gen")) {
        mGenes.set(element.name.split('-')[2], val); 
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

  function changeVisibleParent(direction: string) {
    if (direction === "prev") {
      setVisibleParent("F");
    } else if (direction === "next") {
      setVisibleParent("M");
    }
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div>
          <KittenControls>
          </KittenControls>
        </div>
        <div className="flex flex-row self-center gap-6 pt-6">
          <ButtonPrev
            className={"min-[980px]:hidden pl-2 " + (visibleParent === "F" ? "invisible" : "")}
            disabled={visibleParent === "F"}
            onClick={() => changeVisibleParent("prev")}
            altText="View Previous Cat"
            size={20}
          >
          </ButtonPrev>
          <GenotypeTable
            className={visibleParent !== "F" ? "hidden min-[980px]:block" : ""}
            catName="Father" 
            catID="F"
            activeMenuID={activeMenuID}
            updateActiveMenu={setActiveMenuID}
            >
          </GenotypeTable>
          <GenotypeTable
            className={visibleParent !== "M" ? "hidden min-[980px]:block" : ""}
            catName="Mother"
            catID="M"
            activeMenuID={activeMenuID}
            updateActiveMenu={setActiveMenuID}
          >
          </GenotypeTable>
          <ButtonNext
            className={"min-[980px]:hidden px-1 " + (visibleParent === "M" ? "invisible" : "")}
            disabled={visibleParent === "M"}
            onClick={() => changeVisibleParent("next")}
            altText="View Next Cat"
            size={20}
          >
          </ButtonNext>
        </div>
      </form>
      <div className="flex flex-row self-center overflow-scroll snap-x snap-mandatory justify-around gap-6 pt-6 mx-12 max-[499px]:w-[250px] min-[500px]:w-[458px] min-[980px]:w-[940px] min-[1450px]:w-[1422px]">
        {kittens.length > 0 ? 
          kittens.map((k, index) => 
          <GenotypeTable
            // adjust # of kitten tables according to screen width 
            className={"snap-start"}
            key={"kitten-" + k.id}
            catID={"K" + index}
            cat={k}
          ></GenotypeTable>
        )
        : ""}
      </div>
    </div>
  )
}