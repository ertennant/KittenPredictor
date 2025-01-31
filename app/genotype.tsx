import { dilutions, geneMappings } from "./cat-data-defs";

export function convertToPhenoType(genes: Map<any, any>) {
  let result : Map<string, string> = new Map([
    ["white", ""],
    ["orange", ""],
    ["brown", ""],
    ["dilute", ""],
    ["agouti", ""],
    ["colorpoint", ""],
    ["longhair", ""]
  ]);

  // white masks all other colors, orange/tortie masks all except white, brown masks black/gray 
  if (genes.get("white") && geneMappings[genes.get("white")!] == "white") {
    console.log("A");
    result.set("white", "white");
  } else if (genes.get("orange") && genes.get("orange")! in geneMappings) {
    result.set("orange", geneMappings[genes.get("orange")!]); // either orange or tortoiseshell 
    if (result.get("orange") == "orange") {
      result.set("agouti", "tabby"); // orange cats are always tabby regardless of agouti gene 
    }
  } else if (genes.has("brown") && genes.get("brown")! in geneMappings) {
    result.set("brown", geneMappings[genes.get("brown")!]); // chocolate or cinnamon 
  } 

  // white spotting, bicolor, etc. 
  if (genes.get("white") && genes.get("white") in geneMappings && geneMappings[genes.get("white")!] != "white") {
    console.log("B");
    result.set("white", geneMappings[genes.get("white")!]);
  } 

  // if cat has dilute gene, update color to dilute version of color 
  if (genes.get("dilute") && geneMappings[genes.get("dilute")!] == "dilute") {
    if (result.get("orange") != "") {
      result.set("orange", dilutions[result.get("orange")!]);
    } else if (result.get("brown") != "") {
      result.set("brown", dilutions[result.get("brown")!]);
    }
  }

  // for non-orange cats, check if tabby 
  if (result.get("orange") != "orange" && result.get("orange") != "cream" && genes.get("agouti") && genes.get("agouti")! in geneMappings) {
    result.set("agouti", geneMappings[genes.get("agouti")!]);
  }

  // colorpoint 
  if (genes.get("colorpoint") && result.get("white") != "white" && genes.get("colorpoint")! in geneMappings) {
    console.log("C");
    result.set("colorpoint", geneMappings[genes.get("colorpoint")!]);
    result.set("white", ""); 

    // albinism masks all other colors 
    if (result.get("colorpoint") == "albino") {
      result.set("orange", "");
      result.set("brown", "");
      result.set("agouti", "");
    } 
  }

  // hair length 
  if (genes.has("longhair") && genes.get("longhair")! in geneMappings) {
    result.set("longhair", geneMappings[genes.get("longhair")!]);
  }
  
  return result; 

}