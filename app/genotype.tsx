import { dilutions, geneMappings, alleleMappings, coatPatterns } from "./cat-data-defs";

export function convertToPhenoType(genes: Map<string, string>) {
  let result : Map<string, string> = new Map([
    ["xy", ""],
    ["color", ""],
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

  // white masks all other colors, orange masks black/brown but tortie combines with black/brown  
  if (genes.get("white") && geneMappings[genes.get("white")!] == "white") {
    // result.set("white", "white");
    result.set("color", "white");
  } else if (genes.get("orange") && genes.get("orange")! in geneMappings) {
    let white = geneMappings[genes.get("white") || "Ss"];
    let orange = geneMappings[genes.get("orange")!]; 
    let brown = geneMappings[genes.get("brown") || "BB"];
    let dilute = geneMappings[genes.get("dilute") || "DD"];
    let value = orange;
    if (orange === "tortoiseshell") {
      if (white === "bicolor") {
        orange = "calico";
      }
      if (brown !== "black" || dilute === "dilute") {
        if (dilute === "dilute") {
          value = dilutions[brown] + " " + orange; 
        } else {
          value = brown + " " + orange; 
        }
      } else {
        value = orange; 
      }
      // The orange parts of a tortie are always striped. The agouti gene controls whether the black or brown parts are also striped. 
      if (genes.get("agouti") && genes.get("agouti")! in geneMappings) {
        result.set("agouti", geneMappings[genes.get("agouti")!]);
      }
    } else {
      if (dilute === "dilute") {
        value = dilutions[orange];
      }
      // All orange cats have stripes, regardless of whether or not they have the usual tabby genes. 
      result.set("agouti", "tabby"); 
    }
    result.set("color", value);
  } else if (genes.get("brown") && genes.get("brown")! in geneMappings) {
    let brown = geneMappings[genes.get("brown")!]; 
    let dilute = geneMappings[genes.get("dilute") || "DD"];
    if (dilute === "dilute") {
      result.set("color", dilutions[brown]);
    } else {
      result.set("color", brown);
    }

    // for non-orange cats, check if tabby 
    if (genes.get("agouti") && genes.get("agouti")! in geneMappings) {
      result.set("agouti", geneMappings[genes.get("agouti")!]);
    }
  } 

  // white spotting, bicolor, etc. 
  if (genes.get("white") && genes.get("white")! in geneMappings && geneMappings[genes.get("white")!] != "white") {
    result.set("white", geneMappings[genes.get("white")!]);
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
      result.set("colorpoint", ""); 
      result.set("color", "albino");
    } 
  }

  if (result.get("white") === undefined || result.get("white") === "white") {
    result.delete("white"); // only keep result.get("white") if it indicates white spots or patches 
  }
  result.delete("orange");
  result.delete("brown");

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
