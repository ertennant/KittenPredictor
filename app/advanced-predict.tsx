"use client";

import Cat from '@/app/cat';
import GenotypeTable from './components/genotype-table';
import KittenControls from './components/kitten-controls';
import { useState } from 'react';
import ButtonPrev from './components/button-prev';
import ButtonNext from './components/button-next';

export default function AdvancedPredict() {
  const [kittens, setKittens] = useState<Cat[]>([]); // array of kittens 
  const [activeMenuID, setActiveMenuID] = useState(undefined); // ID of ComboBox menu currently open (to prevent more than one from being open at the same time)
  const [visibleParent, setVisibleParent] = useState("F"); // ID of parent cat currently visible (for small screens only)
  const [visibleKitten, setVisibleKitten] = useState(0); // ID of first kitten currently visible (for small screens only)

  // Use provided parent cat data to generate kittens. 
  function handleSubmit(event: any) {
    setVisibleKitten(0); // reset 
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

  function changeVisibleParent(direction: string) {
    if (direction === "prev") {
      setVisibleParent("F");
    } else if (direction === "next") {
      setVisibleParent("M");
    }
  }

  function changeVisibleKitten(direction: string) {
    if (direction === "prev" && visibleKitten > 0) {
      setVisibleKitten(visibleKitten - 1);
    } else if (direction === "next" && visibleKitten < kittens.length - 1) {
      setVisibleKitten(visibleKitten + 1);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <KittenControls>
          </KittenControls>
        </div>
        <div className="flex flex-row justify-center gap-6 pt-6 px-6 ">
          <ButtonPrev
            className="lg:hidden pl-2"
            disabled={visibleParent === "F"}
            onClick={() => changeVisibleParent("prev")}
            altText="View Previous Cat"
            size={20}
          >
          </ButtonPrev>
          <GenotypeTable
            className={visibleParent !== "F" ? "hidden lg:block" : ""}
            catName="Father" 
            catID="F"
            readOnly={false}
            activeMenuID={activeMenuID}
            updateActiveMenu={setActiveMenuID}
            >
          </GenotypeTable>
          <GenotypeTable
            className={visibleParent !== "M" ? "hidden lg:block" : ""}
            catName="Mother"
            catID="M"
            readOnly={false}
            activeMenuID={activeMenuID}
            updateActiveMenu={setActiveMenuID}
          >
          </GenotypeTable>
          <ButtonNext
            className="lg:hidden px-1"
            disabled={visibleParent === "M"}
            onClick={() => changeVisibleParent("next")}
            altText="View Next Cat"
            size={20}
          >
          </ButtonNext>
        </div>
      </form>
      <div className="flex flex-row justify-center gap-6 pt-6 flex-wrap">
        <ButtonPrev
          className={kittens.length < 2 ? "hidden" : kittens.length < 4 ? "2xl:hidden pl-2" : "pl-2"}
          disabled={visibleKitten === 0}
          onClick={() => changeVisibleKitten("prev")}
          altText="View Previous Kitten"
          size={20}
        >
        </ButtonPrev>
        {kittens.length > 0 ? 
          kittens.map((k, index) => 
          <GenotypeTable
            // adjust # of kitten tables according to screen width 
            className={visibleKitten === index - 2 ? "hidden 2xl:block" : visibleKitten === index - 1 ? "hidden lg:block" : visibleKitten !== index ? "hidden" : ""}
            key={k.name}
            catID={"K" + index}
            cat={k}
            readOnly={true}
          ></GenotypeTable>
        )
        : ""}
        <ButtonNext
          className={kittens.length < 2 ? "hidden" : kittens.length < 4 ? "2xl:hidden px-1" : "px-1"}
          disabled={visibleKitten === kittens.length - 1}
          onClick={() => changeVisibleKitten("next")}
          altText="View Next Kitten"
          size={20}
        >
        </ButtonNext>
      </div>
    </div>
  )
}