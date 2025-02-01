"use client";

import ParentCatProfile from '@/app/components/parent-cat-profile';
import KittenProfile from '@/app/components/kitten-profile';
import Cat from '@/app/cat';

import { useState } from 'react';
import KittenControls from './components/kitten-controls';
export default function Predict() {
  const [kittens, setKittens] = useState<Cat[]>([]);
  
  function handleSubmit(event: any) {
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
    console.log(fTraits);
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
    console.log(father);
    console.log(mother);
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
          <ParentCatProfile
            parentID="F"
          >
          </ParentCatProfile>
          <ParentCatProfile
            parentID="M"
          >
          </ParentCatProfile>
        </div>
      </form>
      <div className="flex flex-row justify-center flex-wrap">
        {kittens.length > 0 ? kittens.map(k => 
          <KittenProfile
            key={k.name}
            cat={k}
          ></KittenProfile>
        )
        : ""}
      </div>
    </div>
  )
}