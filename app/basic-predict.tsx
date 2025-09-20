"use client";

import ParentCatProfile from '@/app/components/parent-cat-profile';
import KittenProfile from '@/app/components/kitten-profile';
import Cat from '@/app/cat';

import { useState } from 'react';
import KittenControls from './components/kitten-controls';
import ButtonPrev from './components/button-prev';
import ButtonNext from './components/button-next';
export default function BasicPredict({activeMenuID, updateActiveMenu}: any) {
  const [kittens, setKittens] = useState<Cat[]>([]);
  // const [activeMenuID, setActiveMenuID] = useState(undefined);
  const [visibleParent, setVisibleParent] = useState("F"); // ID of parent cat currently visible (for small screens only)
  const [visibleKitten, setVisibleKitten] = useState(0); // ID of first kitten currently visible (for small screens only)

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
    <div>
      <form onSubmit={handleSubmit}>
        <KittenControls>
        </KittenControls>
        <div className="flex flex-row justify-center" >          
          <ButtonPrev
            className="md:hidden pl-2"
            disabled={visibleParent === "F"}
            onClick={() => changeVisibleParent("prev")}
            altText="View Previous Cat"
            size={20}
          >            
          </ButtonPrev>
          <ParentCatProfile
            className={visibleParent !== "F" ? "hidden md:block" : ""}
            parentID="F"
            activeMenuID={activeMenuID}
            updateActiveMenu={updateActiveMenu}
          >
          </ParentCatProfile>
          <ParentCatProfile
            className={visibleParent !== "M" ? "hidden md:block" : ""}
            parentID="M"
            activeMenuID={activeMenuID}
            updateActiveMenu={updateActiveMenu}
          >
          </ParentCatProfile>
          <ButtonNext
            className="md:hidden px-1"
            disabled={visibleParent === "M"}
            onClick={() => changeVisibleParent("next")}
            altText="View Next Cat"
            size={20}
          >
          </ButtonNext>
        </div>
      </form>
      <div className="flex flex-row justify-center flex-wrap">
        <ButtonPrev
          className={kittens.length < 2 ? "hidden" : kittens.length < 3 ? "md:hidden pl-2" : kittens.length < 4 ? "lg:hidden pl-2" : kittens.length < 5 ? "xl:hidden pl-2" : kittens.length < 6 ? "2xl:hidden pl-2" : "pl-2"}
          onClick={() => changeVisibleKitten("prev")}
          disabled={visibleKitten === 0}
          altText="View Previous Kitten"
          size={20}
        >
        </ButtonPrev>
        {kittens.length > 0 ? kittens.map((kitten, index) => 
          <KittenProfile
            className={visibleKitten === index - 4 ? "hidden 2xl:block pl-2" : visibleKitten === index - 3 ? "hidden xl:block" : visibleKitten === index - 2 ? "hidden lg:block" : visibleKitten === index - 1 ? "hidden md:block" : visibleKitten !== index ? "hidden" : ""}
            key={kitten.name}
            cat={kitten}
          ></KittenProfile>
        )
        : ""}
        <ButtonNext
          className={kittens.length < 2 ? "hidden" : kittens.length < 3 ? "md:hidden px-1" : kittens.length < 4 ? "lg:hidden px-1" : kittens.length < 5 ? "xl:hidden px-1" : kittens.length < 6 ? "2xl:hidden px-1" : "px-1"}
          onClick={() => changeVisibleKitten("next")}
          disabled={visibleKitten === kittens.length - 1}
          altText="View Next Kitten"
          size={20}
        >
        </ButtonNext>
      </div>
    </div>
  )
}