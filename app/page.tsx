"use client";

import ParentCatProfile from '@/app/components/parent-cat-profile';
import KittenProfile from '@/app/components/kitten-profile';
import Cat from '@/app/cat';

import { useState } from 'react';
import KittenControls from './components/kitten-controls';
import BasicPredict from './basic-predict';
import AdvancedPredict from './advanced-predict';
export default function Page() {
  const [mode, setMode] = useState("basic");



  return (
    <div>
      <nav className="sticky top-0 w-full bg-white/90 h-10 shadow-md shadow-black" style={{"zIndex": 100}}>
        <button onClick={() => setMode("basic")} className="p-2 h-10 hover:bg-white">Kitten Predictor</button>
        <button onClick={() => setMode("advanced")} className="p-2 h-10 hover:bg-white">Advanced Mode</button>
      </nav>
      {mode === "basic" ? 
        <BasicPredict>          
        </BasicPredict> : 
        mode === "advanced" ? 
        <AdvancedPredict>
        </AdvancedPredict> :
        ""
      }
    </div>
  )
}