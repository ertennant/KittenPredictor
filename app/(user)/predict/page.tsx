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
      <form className="flex flex-row justify-center" onSubmit={handleSubmit}>
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
      </form>
    </div>
  )
}