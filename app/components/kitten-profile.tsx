
import Image from "next/image"
import Cat from "@/app/cat"
import CatDataItem from "./cat-data-item"

type KittenProfileProps = {
  cat: Cat
}

export default function KittenProfile({cat}: KittenProfileProps) {
  return (
    <div className="flex flex-col items-center m-2">      
      <div className="rounded-2xl p-6 border bg-white/60 backdrop-blur-md flex flex-col items-stretch">
        <div className="rounded-2xl bg-white/75 p-2 my-2 border-2 border-slate-300 text-xl">
          <input
            type="text"
            className="h-min bg-transparent"
            value={cat.name}
            readOnly={true}
          >
          </input>
          <button 
            type="button"
            className="h-min align-middle" 
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
        {cat.color !== "unknown" ? 
          <input
              type="text"
              className="rounded-2xl bg-white/70 p-2 my-2"
              value={cat.color}
              readOnly={true}
          >
          </input>
          : ""
        }
        {cat.coatType !== "unknown" ? 
          <input
              type="text"
              className="rounded-2xl bg-white/70 p-2 my-2"
              value={cat.coatType}
              readOnly={true}
          >
          </input>
          : ""
        }
      </div>
    </div>
  )
}