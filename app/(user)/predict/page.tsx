"use client";

import ParentCatProfile from '../../components/parent-cat-profile';
import AddButton from '../../components/add-button';

import { useState } from 'react';
export default function Predict() {
  const [numParents, setNumParents] = useState(1);
  function handleSubmit(event: any) {
    event.preventDefault(); 
    console.log(event);
  }

  function handleClick() {
    console.log("clicked add cat button");
    setNumParents(numParents + 1);
  }

  return (
    <div>
      <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center" >          
          <ParentCatProfile
            parentID="A"
          >
          </ParentCatProfile>
          {numParents === 2 ? 
            <ParentCatProfile
              parentID="B"
            >
            </ParentCatProfile>
            : ""
          }
          {numParents < 2 ? 
            <AddButton
              itemType="Parent"
              onClick={handleClick}
            >
            </AddButton> 
            : ""
          }
        </div>
        <div className="my-1">
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
      </form>
    </div>
  )
}