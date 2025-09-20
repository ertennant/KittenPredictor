"use client";

import ParentCatProfile from '@/app/components/parent-cat-profile';
import KittenProfile from '@/app/components/kitten-profile';
import Cat from '@/app/cat';

import { useCallback, useEffect, useState } from 'react';
import KittenControls from './components/kitten-controls';
import BasicPredict from './basic-predict';
import AdvancedPredict from './advanced-predict';
export default function Page() {
  const [mode, setMode] = useState("basic");
  const [activeMenuID, setActiveMenuID] = useState(undefined);

  const handleCloseMenus = useCallback((event: MouseEvent) => {
    setActiveMenuID(undefined);
  }, [activeMenuID]);

  useEffect(() => {
    document.addEventListener("click", handleCloseMenus); // this way, the user can use their keyboard to activate the simulator keys 
    return () => document.removeEventListener("click", handleCloseMenus);
  }, [handleCloseMenus])

  return (
    <div>
      <nav className="sticky top-0 w-full bg-white/90 h-10 shadow-md shadow-black" style={{"zIndex": 100}}>
        <button onClick={() => setMode("basic")} className="p-2 h-10 hover:bg-white">Kitten Predictor</button>
        <button onClick={() => setMode("advanced")} className="p-2 h-10 hover:bg-white">Advanced Mode</button>
      </nav>
      {mode === "basic" ? 
        <BasicPredict
          activeMenuID={activeMenuID}
          updateActiveMenu={setActiveMenuID}
        >          
        </BasicPredict> : 
        mode === "advanced" ? 
        <AdvancedPredict
          activeMenuID={activeMenuID}
          updateActiveMenu={setActiveMenuID}
        >
        </AdvancedPredict> :
        ""
      }
    </div>
  )
}