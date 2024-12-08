
import Image from "next/image"
import Cat from "@/app/cat"
import CatDataItem from "./cat-data-item"

type KittenProfileProps = {
  cat: Cat
}

export default function KittenProfile({cat}: KittenProfileProps) {
  console.log(cat);
  return (
    <div className="flex flex-col items-center m-2">      
      <div className="rounded-2xl p-6 border border-white bg-white/60 backdrop-blur-md flex flex-col items-stretch">
        <div className="relative rounded-2xl bg-white/70 p-2 my-2 border-2 border-slate-300 text-xl">
          <input
            type="text"
            className="h-min bg-transparent outline-0"
            value={cat.name}
            readOnly={true}
          >
          </input>
          <button 
            type="button"
            className="h-min align-middle absolute right-2" 
            title={cat.sex === "XX" ? "Female" : "Male"} 
            disabled
          >
            <Image
              src={cat.sex === "XX" ? "/female.svg" : "/male.svg"}
              alt={cat.sex ?? ""}
              width={28}
              height={28}
            >
            </Image>
          </button>
        </div>
        {cat.breed && cat.breed !== "unknown" ? 
          <CatDataItem 
            key={cat.breed}
            catID={cat.name}
            traitType={"breed"}
            traitValue={cat.breed}
            readOnly={true}
          >
          </CatDataItem>
          : ""
        }
        {cat.color !== "unknown" ? 
          <CatDataItem 
            key={cat.color}
            catID={cat.name}
            traitType={"color"}
            traitValue={cat.color}
            readOnly={true}
          >
          </CatDataItem>
          : ""
        }
        {cat.coatType !== "unknown" ? 
          <CatDataItem
            readOnly={true}
            catID={cat.name}
            traitType="coatType"
            traitValue={cat.coatType}
          >
          </CatDataItem>
          : ""
        }
        {Array.from(Object.values(cat.coatPatterns)).map(e => 
          <CatDataItem 
            key={e}
            catID={cat.name}
            traitType={"coatPattern"}
            traitValue={e}
            readOnly={true}
          >
          </CatDataItem>
        )}
      </div>
    </div>
  )
}