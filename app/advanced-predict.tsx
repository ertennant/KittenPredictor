"use client";

import Cat from '@/app/cat';
import GenotypeTable from './components/genotype-table';
import KittenControls from './components/kitten-controls';
import { useState } from 'react';
import Image from 'next/image';

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
          <button 
            className="lg:hidden" 
            type="button" 
            onClick={() => changeVisibleParent("prev")}>
            <Image
              src="./arrow-left.svg"
              alt="View Previous Cat"
              height={20}
              width={20}
            >
            </Image>
          </button>
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
          <button 
            className="lg:hidden" 
            type="button" 
            onClick={() => changeVisibleParent("next")}>
            <Image
              src="./arrow-right.svg"
              alt="View Next Cat"
              height={20}
              width={20}
            >
            </Image>
          </button>        
        </div>
      </form>
      <div className="flex flex-row justify-center gap-6 pt-6 flex-wrap">
        <button 
          className={kittens.length < 2 ? "hidden" : kittens.length < 4 ? "2xl:hidden" : ""}
          type="button" 
          onClick={() => changeVisibleKitten("prev")}>
          <Image
            src="./arrow-left.svg"
            alt="View Previous Cat"
            height={20}
            width={20}
          >
          </Image>
        </button>
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
        <button 
          className={kittens.length < 2 ? "hidden" : kittens.length < 4 ? "2xl:hidden" : ""}
          type="button" 
          onClick={() => changeVisibleKitten("next")}>
          <Image
            src="./arrow-right.svg"
            alt="View Next Cat"
            height={20}
            width={20}
          >
          </Image>
        </button>        
      </div>
    </div>
  )
}