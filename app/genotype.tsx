import { dilutions, geneMappings, alleleMappings } from "./cat-data-defs";

export function convertToPhenoType(genes: Map<string, string>) {
  let result : Map<string, string> = new Map([
    ["xy", ""],
    ["white", ""],
    ["orange", ""],
    ["brown", ""],
    ["dilute", ""],
    ["agouti", ""],
    ["colorpoint", ""],
    ["longhair", ""]
  ]);

  if (genes.get("xy")) {
    result.set("xy", genes.get("xy")!);
  }

  // white masks all other colors, orange/tortie masks all except white, brown masks black/gray 
  if (genes.get("white") && geneMappings[genes.get("white")!] == "white") {
    result.set("white", "white");
  } else if (genes.get("orange") && genes.get("orange")! in geneMappings) {
    result.set("orange", geneMappings[genes.get("orange")!]); // either orange or tortoiseshell 
    result.set("agouti", "tabby"); // orange cats are always tabby regardless of agouti gene 
  } else if (genes.get("brown") && genes.get("brown")! in geneMappings) {
    result.set("brown", geneMappings[genes.get("brown")!]); // chocolate or cinnamon 
  } 

  // white spotting, bicolor, etc. 
  if (genes.get("white") && genes.get("white")! in geneMappings && geneMappings[genes.get("white")!] != "white") {
    result.set("white", geneMappings[genes.get("white")!]);
  } 

  // if cat has dilute gene, update color to dilute version of color 
  if (genes.get("dilute") && geneMappings[genes.get("dilute")!] == "dilute") {
    if (result.get("orange")) {
      result.set("orange", dilutions[result.get("orange")!]);
    } else if (result.get("brown")) {
      result.set("brown", dilutions[result.get("brown")!]);
    }
  }

  // for non-orange cats, check if tabby 
  if (result.get("orange") == "" && genes.get("agouti") && genes.get("agouti")! in geneMappings) {
    result.set("agouti", geneMappings[genes.get("agouti")!]);
  }

  // colorpoint 
  if (genes.get("colorpoint") && result.get("white") != "white" && genes.get("colorpoint")! in geneMappings) {
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
  if (genes.get("longhair") && genes.get("longhair")! in geneMappings) {
    result.set("longhair", geneMappings[genes.get("longhair")!]);
  }
  return result; 

}

// Converts a Map of name -> allele pair string to a Map of name -> allele pair array 
// (split format is necessary for generating offspring)
// e.g., {"orange": "Oo"} -> {"orange": ["O", "o"]}
export function splitAlleles(genes: Map<string, string>) {
  let result : Map<string, string[] | never> = new Map();
  for (let entry of genes.entries()) {
    if (entry[1] in alleleMappings) {
      result.set(entry[0], alleleMappings[entry[1]]);
    } else {
      result.set(entry[0], []);
    }
  }
  return result; 
}

export function combineAlleles(genes: Map<string, string[]>) {
  let result : Map<string, string> = new Map();
  for (let entry of genes.entries()) {
    result.set(entry[0], entry[1].join(""));
  }
  return result; 
}

export function sortAlleles(alleles: Map<string, string[]>) {
  for (let entry of alleles.entries()) {
    switch (entry[0]) {
      case "white": 
        if (!entry[1].includes("S") || !entry[1].includes("W")) {
          // WW -> WW, Ww -> Ww, wW -> Ww, ww -> ww, SS -> SS, Ss -> Ss, sS -> Ss
          alleles.set(entry[0], entry[1].sort());
        } else {
          // WS -> WS, SW -> WS 
          alleles.set(entry[0], entry[1].sort().reverse());
        }
        break; 
      case "colorpoint": 
        if (entry[1].includes("C") || entry[1].join("") == "cscs") {
          // CC -> CC, Ccs -> Ccs, csC -> Ccs, Ccb -> Ccb, cbC -> Ccb, cscs -> cscs
          alleles.set(entry[0], entry[1].sort());
        } else if (entry[1].includes("cb") || entry[1].includes("c")) {
          // cscb -> cscb, cbcs -> cscb, cbcb -> cbcb, ccb -> cbc, cbc -> cbc
          // ccs -> csc, csc -> csc, cc -> cc 
          alleles.set(entry[0], entry[1].sort().reverse()); 
        } 
        break; 
      case "xy": 
      case "orange": 
      case "brown": 
      case "dilute": 
      case "agouti": 
      case "longhair": 
        // straightforward cases where sorted order always == right order 
        alleles.set(entry[0], entry[1].sort());
        break; 
    }
  }
}
