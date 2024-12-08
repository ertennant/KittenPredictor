import { SetStateAction, useState } from "react";
import Image from "next/image";
import CatDataItem from "./cat-data-item";
import ComboBox from "./combobox";
import { mainList, colors, validColors, validCoatPatterns, validCoatTypes, validBreeds } from "../cat-data-defs";

type AppProps = {
  parentID: string 
}

export default function ParentCatProfile({parentID}: AppProps) {
  const [name, setName] : [string, React.Dispatch<SetStateAction<string>>] = useState("");
  const [traits, setTraits] : [Map<string, string>, React.Dispatch<SetStateAction<Map<string, string>>>] = useState(
    new Map([
      ["sex", parentID === "A" ? "XX" : "XY"] 
    ])
  );
  const [newTrait, setNewTrait] = useState({value: "", visible: false});
  
  function updateTraits(event: any) {
    let updated = new Map(traits); 
    let trait = event.currentTarget.id.slice(3).toLowerCase();
    // dealt with separately because male/female can be set with a button, while the rest are set with text inputs 
    if (trait === "sex") {
      if (updated.get("sex") === "XX") {
        updated.set("sex", "XY"); 
      } else {
        updated.set("sex", "XX");
      }
    } else {
      if (colors.includes(trait)) {
        if (updated.has("bicolor") && !(trait.endsWith("and white"))) {
          updated.set("color", trait + " and white");
        } else {
          updated.set("color", trait);
        }
      }
      else if (trait in validCoatPatterns && !updated.has(trait)) { 
        // Don't change colors and coatPatterns to an if/else, because calico maps to both calico color and bicolor pattern (calico = tortie + bicolor)
        updated.set(trait, trait);
        if (trait === "bicolor" && updated.has("color") && !updated.get("color")!.endsWith("and white")) {
          updated.set("color", updated.get("color") + " and white");
        }
      }
      // note: you probably have to fix this. find out whether rex (curly) can occur with both shorthair and longhair.
      if (trait in validCoatTypes) { 
        updated.set("coatType", trait);
      }
      if (validBreeds.includes(trait)) { 
        // For now, validBreeds is an array and not an object, so you can't use in.
        updated.set("breed", trait);
      }

    }
    setTraits(updated);
  }

  function removeTrait(traitType: string) {
    if (traits.has(traitType)) {
      let temp = new Map(traits);
      temp.delete(traitType);
      setTraits(temp);
    }
  }

  function cancelNewTrait(event: any): void {
    setNewTrait({value: "", visible: false});
  }

  function addNewTrait(event: MouseEvent): void {
    let temp : {value: string, visible: boolean} = {...newTrait};
    temp.visible = true; 
    temp.value = "";
    setNewTrait(temp);
  }

  function updateNewTrait(event: any): void {
    let updated = new Map(traits);
    let temp = {...newTrait};
    let found = false; 
    temp.value = event.currentTarget.value.toLowerCase(); 
    if (temp.value in validColors) {
      found = true; 
      updated.set("color", temp.value);
    }
    if (temp.value in validCoatPatterns) {
      found = true; 
      updated.set(temp.value, temp.value);
    }
    if (temp.value in validCoatTypes) {
      found = true; 
      updated.set("coatType", temp.value);
    }
    if (validBreeds.includes(temp.value)) {
      found = true; 
      updated.set("breed", temp.value);
    }
    if (found) {
      temp.value = "";
      temp.visible = false; 
      setNewTrait(temp);
      setTraits(updated);
      return; 
    }
    setNewTrait(temp);
  }

  return (
    <div className="rounded-2xl p-6 border border-white bg-white/70 backdrop-blur-md flex flex-col items-stretch m-2">
      <div className={"relative rounded-2xl bg-white/20 focus-within:bg-white hover:bg-white border-2 border-accent-light p-2 my-2 text-xl"}>
        <input
          type="text"
          name={parentID + "-name"}
          className="h-min bg-transparent outline-0"
          value={name}
          autoComplete="off"
          placeholder="Enter Cat's Name"
          onChange={e => setName(e.currentTarget.value)}
        >
        </input>
        <button 
          type="button"
          className="h-min align-middle absolute right-2" 
          name={parentID + "-sex"} 
          title={traits.get("sex") === "XX" ? "Female" : "Male"} 
          onClick={e => updateTraits(e)}
        >
          <Image
            src={traits.get("sex") === "XX" ? "/female.svg" : "/male.svg"}
            alt={traits.get("sex") ?? ""}
            width={28}
            height={28}
          >
          </Image>
        </button>
      </div>
      {/* <input type="text" list="kitty" />
      <datalist id="kitty">
        {mainList.map(e => 
          <option key={e}>{e}</option>
        )}
      </datalist> */}
      {
        Array.from(traits.keys()).filter(k => k !== "sex").map(k => 
          <CatDataItem 
            key={k}
            catID={parentID}
            traitType={k}
            traitValue={traits.get(k) ?? ""}
            onDelete={removeTrait}
          >
          </CatDataItem>
        )
      }
      <ComboBox
        options={mainList}
        addTrait={updateTraits}
      >
      </ComboBox>
    </div>
  )
}