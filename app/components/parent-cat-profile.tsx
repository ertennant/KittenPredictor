import AddButton from "./add-button"
import { SetStateAction, useState } from "react";
import Image from "next/image";
import CatDataItem from "./cat-data-item";

const sampleTraits : Map<string, string[]> = new Map([
  ["sex", ["XX", "XY"]], 
  ["coatType", ["shorthair", "mediumhair", "longhair", "rex", "hairless"]], 
  ["color", ["black", "brown", "chocolate", "cinnamon", "gray", "grey", "blue", "white", "orange", "red", "cream", "lilac", "fawn", "tortoiseshell", "calico"]], 
  ["breed", ["Persian", "Maine Coon", "Siberian", "Burmese", "Siamese", "Sphynx", "Devon Rex", "Turkish Van", "Russian Blue", "Manx", "Ragdoll", "Bengal"]], 
  ["misc", ["polydactyly", "heterochromia"]]
])

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
    // event.preventDefault(); 
    // event.stopPropagation();
    // console.log(event);
    // console.log(`called updateTraits() for ${event.currentTarget.name}`);
    let updated = new Map(traits); 
    let trait = event.currentTarget.name.slice(2);
    // dealt with separately because male/female can be set with a button, while the rest are set with text inputs 
    if (trait === "sex") {
      if (updated.get("sex") === "XX") {
        updated.set("sex", "XY"); 
      } else {
        updated.set("sex", "XX");
      }
    } else {
      if (sampleTraits.has(trait)) {
        updated.set(trait, event.currentTarget.value);
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

  function addNewTrait(event: MouseEvent): void {
    let temp : {value: string, visible: boolean} = {...newTrait};
    temp.visible = true; 
    temp.value = "";
    setNewTrait(temp);
  }

  function updateNewTrait(event: any): void {
    let temp = {...newTrait};
    temp.value = event.currentTarget.value; 
    for (const key of sampleTraits.keys()) {
      if (sampleTraits.get(key)?.includes(temp.value)) {
        let updated = new Map(traits);
        updated.set(key, temp.value);
        temp.value = "";
        temp.visible = false; 
        setNewTrait(temp);
        setTraits(updated);
        return; 
      }
    }
    setNewTrait(temp);
  }

  return (
    <div className="rounded-2xl p-6 border bg-white/60 backdrop-blur-md flex flex-col items-stretch m-2">
      <div className={"rounded-2xl bg-white/75 focus-within:bg-white/90 focus-within:bg-white border-2 border-slate-300 p-2 my-2 text-xl"}>
        <input
          type="text"
          name={parentID + "-name"}
          className="h-min bg-transparent outline-0"
          value={name}
          placeholder="Enter Name"
          onChange={e => setName(e.currentTarget.value)}
        >
        </input>
        <button 
          type="button"
          className="h-min align-middle" 
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
      {
        traits.keys().toArray().filter(k => k !== "sex").map(k => 
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
      <input
        type="text"
        className={"rounded-2xl bg-white/70 p-2 my-1 " + (!newTrait.visible ? " hidden" : "")}
        value={newTrait.value}
        placeholder="Enter New Trait"
        onChange={updateNewTrait}
      >
      </input>
      <AddButton
        itemType="Trait"
        onClick={addNewTrait}
      >
      </AddButton>
    </div>
  )
}