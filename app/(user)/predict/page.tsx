"use client";

import ParentCatProfile from '@/app/components/parent-cat-profile';
import KittenProfile from '@/app/components/kitten-profile';
import Cat from '@/app/cat';

import { Dispatch, SetStateAction, useState } from 'react';
export default function Predict() {
  const [kittens, setKittens] = useState<Cat[]>([]);
  
  function handleSubmit(event: any) {
    event.preventDefault(); 
    // console.log(event);
    let aTraits : string[] = []; 
    let bTraits : string[]  = []; 
    for (let element of event.currentTarget.elements) {
      if (element.id.includes("A-trait")) {
        aTraits.push(element.value);
      } else if (element.id.includes("B-trait")) {
        bTraits.push(element.value);
      }
    }
    // stop user from submitting empty parent cats
    if (!event.currentTarget.elements["A-name"] || !event.currentTarget.elements["B-name"]
        || aTraits.length === 0 || bTraits.length === 0) {
      return; 
    }
    
    let a = new Cat(
      event.currentTarget.elements["A-name"].value, 
      event.currentTarget.elements["A-sex"].title, 
      aTraits
    )
    let b = new Cat(
      event.currentTarget.elements["B-name"].value, 
      event.currentTarget.elements["B-sex"].title, 
      bTraits
    )
    console.log(a);
    console.log(b);
    let newKittens : Cat[] = []; 
    for (let i = 0; i < parseInt(event.currentTarget.litterSize.value); i++) {
      newKittens.push(a.makeKittenWith(b, `Kitten ${i + 1}`));
    }
    setKittens(newKittens);
  }

  return (
    <div>
      <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center" >          
          <ParentCatProfile
            parentID="A"
          >
          </ParentCatProfile>
          <ParentCatProfile
            parentID="B"
          >
          </ParentCatProfile>
        </div>
        <div className="my-1 flex flex-col justify-center items-center gap-2">
          <div>
            <label
              htmlFor="litterSize"
            >Number of Kittens: </label>
            <input
              className="rounded-md bg-white/70 p-2 border-2 border-accent-light"
              type="number"
              name="litterSize"
              id="litterSize"
              min={1}
              max={10}
              defaultValue={4}
            >
            </input>
          </div>
          <input
            className="rounded-2xl p-2 cursor-pointer bg-accent hover:bg-accent-light active:shadow-inner hover:shadow-glow-sm"
            type="submit"
            value="Generate Kittens"
          >
          </input>
        </div>
      </form>
      <div className="flex flex-row justify-center">
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