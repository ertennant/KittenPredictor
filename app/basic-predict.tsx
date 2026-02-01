"use client";

import ParentCatProfile from '@/app/components/parent-cat-profile';
import KittenProfile from '@/app/components/kitten-profile';
import Cat from '@/app/cat';

import { useState } from 'react';
import KittenControls from './components/kitten-controls';
import ButtonPrev from './components/button-prev';
import ButtonNext from './components/button-next';
export default function BasicPredict() {
  const [kittens, setKittens] = useState<Cat[]>([]);
  const [activeMenuID, setActiveMenuID] = useState(undefined);
  const [visibleParent, setVisibleParent] = useState("F"); // ID of parent cat currently visible (for small screens only)
  const [visibleKitten, setVisibleKitten] = useState(0); // ID of first kitten currently visible (for small screens only)

  function changeVisibleParent(direction: string) {
    if (direction === "prev") {
      setVisibleParent("F");
    } else if (direction === "next") {
      setVisibleParent("M");
    }
  }

  function handleSubmit(event: any) {
    setVisibleKitten(0);
    event.preventDefault(); 
    let fTraits : string[] = []; 
    let mTraits : string[]  = []; 
    for (let element of event.currentTarget.elements) {
      if (element.id.includes("F-trait")) {
        fTraits.push(element.value);
      } else if (element.id.includes("M-trait")) {
        mTraits.push(element.value);
      }
    }
    // stop user from submitting empty parent cats
    if (fTraits.length === 0 || mTraits.length === 0) {
      return; 
    }
    
    let father = new Cat(
      event.currentTarget.elements["F-name"].value ?? "Father", 
      "XY", 
      fTraits
    )
    let mother = new Cat(
      event.currentTarget.elements["M-name"].value ?? "Mother", 
      "XX", 
      mTraits
    )
    let newKittens : Cat[] = []; 
    for (let i = 0; i < parseInt(event.currentTarget.litterSize.value); i++) {
      newKittens.push(father.makeKittenWith(mother, `Kitten ${i + 1}`));
    }
    setKittens(newKittens);
  }

  return (
    <div className='flex flex-col'>
      <form onSubmit={handleSubmit}>
        <KittenControls>
        </KittenControls>
        <div className="flex flex-row justify-center" >          
          <ButtonPrev
            className={"min-[660px]:hidden pl-2 " + (visibleParent === "F" ? "invisible" : "")}
            disabled={visibleParent === "F"}
            onClick={() => changeVisibleParent("prev")}
            altText="View Previous Cat"
            size={20}
          >            
          </ButtonPrev>
          <ParentCatProfile
            className={visibleParent !== "F" ? "hidden min-[660px]:block" : ""}
            parentID="F"
            activeMenuID={activeMenuID}
            updateActiveMenu={setActiveMenuID}
          >
          </ParentCatProfile>
          <ParentCatProfile
            className={visibleParent !== "M" ? "hidden min-[660px]:block" : ""}
            parentID="M"
            activeMenuID={activeMenuID}
            updateActiveMenu={setActiveMenuID}
          >
          </ParentCatProfile>
          <ButtonNext
            className={"min-[660px]:hidden px-1 " + (visibleParent === "M" ? "invisible" : "")}
            disabled={visibleParent === "M"}
            onClick={() => changeVisibleParent("next")}
            altText="View Next Cat"
            size={20}
          >
          </ButtonNext>
        </div>
      </form>
      <div className="flex flex-row self-center overflow-scroll snap-x justify-around snap-mandatory mx-12 max-[659px]:w-[300px] min-[660px]:w-[600px] min-[960px]:w-[930px] min-[1256px]:w-[1226px] min-[1560px]:w-[1530px] min-[1870px]:w-[1840px] ">
        {kittens.length > 0 ? kittens.map((kitten, index) => 
          <KittenProfile
            className="snap-start"
            key={kitten.name}
            cat={kitten}
          ></KittenProfile>
        )
        : ""}
      </div>
    </div>
  )
}