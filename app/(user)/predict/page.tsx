"use client";

import ParentCatProfile from '@/app/components/parent-cat-profile';
import KittenProfile from '@/app/components/kitten-profile';
import AddButton from '@/app/components/add-button';
import Cat from '@/app/cat';

import { Dispatch, SetStateAction, useState } from 'react';
export default function Predict() {
  const [father, setFather] = useState(new Cat("Father", "XY"));  
  const [mother, setMother] = useState(new Cat("Mother", "XX"));  
  const [kittens, setKittens] = useState<Cat[]>([]);
  
  function handleSubmit(event: any) {
    event.preventDefault(); 
    // console.log(event);
    let a = new Cat(
      event.currentTarget.elements["A-name"].value, 
      event.currentTarget.elements["A-sex"].title, 
      event.currentTarget.elements["A-color"]?.value ?? "", 
      event.currentTarget.elements["A-coatType"]?.value ?? "", 
    )
    let b = new Cat(
      event.currentTarget.elements["B-name"].value, 
      event.currentTarget.elements["B-sex"].title, 
      event.currentTarget.elements["B-color"].value, 
      event.currentTarget.elements["B-coatType"].value, 
    )
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
              className="rounded-md bg-white/70 p-2"
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
            className="rounded-md bg-white/70 p-2"
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