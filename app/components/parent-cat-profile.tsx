import { SetStateAction, useState } from "react";
import Image from "next/image";
import CatDataItem from "./cat-data-item";
import ComboBox from "./combobox";
import { colors, coatPatterns, coatTypes, breeds } from "../cat-data-defs";

type AppProps = {
  parentID: string 
}

export default function ParentCatProfile({parentID}: AppProps) {
  const [name, setName] : [string, React.Dispatch<SetStateAction<string>>] = useState("");
  const [traits, setTraits] : [Map<string, string>, React.Dispatch<SetStateAction<Map<string, string>>>] = useState(
    new Map([
      ["sex", parentID === "F" ? "XY" : "XX"] 
    ])
  );
  
  function updateTraits(event: any) {
    let trait = event.currentTarget.id.slice(3);
    if (traits.has(trait)) {
      return; 
    }

    let updated = new Map(traits); 
    if (colors.includes(trait)) {
      updated.set("color", trait);
    } else if (coatPatterns.includes(trait)) { 
      updated.set(trait, trait);
    }

    if (coatTypes.includes(trait)) { 
      updated.set("coatType", trait);
    }

    if (breeds.includes(trait)) { 
      updated.set("breed", trait);
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

  return (
    <div className="rounded-2xl p-6 border border-white bg-white/70 backdrop-blur-md flex flex-col items-stretch m-2">
      <div className={"relative rounded-2xl bg-white/20 focus-within:bg-white hover:bg-white transition-colors border-2 border-accent-light p-2 my-2 text-xl"}>
        <input
          type="text"
          name={parentID + "-name"}
          className="h-min bg-transparent outline-0"
          value={name}
          autoComplete="off"
          placeholder={parentID === "F" ? "Father" : "Mother"}
          onChange={e => setName(e.currentTarget.value)}
        >
        </input>
        <Image
          className="h-min align-middle absolute inline right-2"
          src={traits.get("sex") === "XX" ? "/female.svg" : "/male.svg"}
          alt={traits.get("sex") ?? ""}
          width={28}
          height={28}
        >
        </Image>
      </div>
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
        options={colors.concat(coatTypes, coatPatterns, breeds)}
        selectOption={updateTraits}
      >
      </ComboBox>
    </div>
  )
}