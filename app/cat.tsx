import { colors, coatPatterns, coatTypes, breeds, traitMappings, dilutions } from "./cat-data-defs";
import { combineAlleles, convertToPhenoType, sortAlleles, splitAlleles } from "./genotype";

class Cat {
  static counter = 0; 
  id: number; 
  name: string; 
  xy: string; // XX, XY
  color: string; // black, orange, tortoiseshell, gray, chocolate, cinnamon, cream,... 
  coatType: string; // short hair, long hair, rex, hairless 
  coatPatterns: string[]; // tabby, tuxedo, etc.
  breed?: string; 
  genes: Map<string, string[] | never>;
  
  constructor(name: string, sex: string, traits?: string[]);
  constructor(name: string, sex: string, geneMap?: Map<string, string>);
  constructor(father: Cat, mother: Cat);
  constructor(original: Cat);
  constructor(a: string | Cat, b?: string | Cat, c?: string[] | Map<string, string>) 
  {
    Cat.counter++; 
    this.id = Cat.counter; 
    this.name = "Cat";
    this.xy = "unknown";
    this.color = "unknown";
    this.coatType = "unknown";
    this.coatPatterns = [];
    this.genes = new Map(
      [
        ["xy", []],
        ["orange", []], 
        ["brown", []],
        ["dilute", []],
        ["white", []],
        ["longhair", []],
        ["agouti", []],
        ["colorpoint", []]
      ]
    )
    if (typeof a === "object" && a instanceof Cat && !b && !c) {
      // TODO: implement copy constructor. 
      this.name = a.name; 
      for (let key of a.genes.keys()) {
        this.genes.set(key, a.genes.get(key)!);
      }
      this.color = a.color; 
      this.coatPatterns = a.coatPatterns; 
      this.breed = a.breed; 
      this.coatType = a.coatType; 
      this.xy = a.xy; 
    } else if (b && typeof a === "string" && typeof b === "string") {
      
      if (a === "") {
        throw new Error("Error: cannot create Cat with empty name.");
      } 

      this.name = a; 

      if (c) {

        if (c instanceof Map) {
          for (let entry of splitAlleles(c).entries()) {
            this.genes.set(entry[0], entry[1]); 
          }
          let p = convertToPhenoType(c);
          if (p.get("xy") == "XX" || p.get("xy") == "XY") {
            this.xy = p.get("xy")!;
          } 
          this.color = p.get("color") || "unknown";
          this.coatType = p.get("longhair") || "unknown"; 
          if (p.get("agouti")) {
            this.coatPatterns.push(p.get("agouti")!);
          }
          if (p.get("colorpoint")) {
            this.coatPatterns.push(p.get("colorpoint")!);
          }
        } else {
          this.xy = b.toUpperCase(); 
          for (let trait of c) {
            if (colors.includes(trait)) {
              this.color = trait;
              if (this.color === "calico" || trait.endsWith(" and white")) {
                this.coatPatterns.push("bicolor");
              }
            } else if (coatTypes.includes(trait)) {
              this.coatType = trait;
            } else if (coatPatterns.includes(trait) && !this.coatPatterns.includes(trait)) {
              this.coatPatterns.push(trait);
            } else if (breeds.includes(trait) && !trait.startsWith("Domestic")) {
              this.breed = trait; 
            }
          }
          this.generateGenes();    
        }
        if (!this.breed) {
          if (this.coatType === "longhair") {
            this.breed = "Domestic Longhair";
          } else if (this.coatType === "shorthair") {
            this.breed = "Domestic Shorthair";
          } else {
            this.breed = "Domestic Unknown";
          }
        }
      }

    } else if (b && typeof a === "object" && typeof b === "object") {
      let father = a; 
      let mother = b; 
      let fGenes = father.getKittenGenes(); 
      let mGenes = mother.getKittenGenes(); 

      this.name = "Kitten";

      for (let key of fGenes.keys()) {
        this.genes.set(key, fGenes.get(key)!.concat(mGenes.get(key)!));
      }

      sortAlleles(this.genes);

      let p = convertToPhenoType(combineAlleles(this.genes));
      if (p.get("xy") == "XX" || p.get("xy") == "XY") {
        this.xy = p.get("xy")!;
      } 
      this.color = p.get("color") || "unknown";
      this.coatType = p.get("longhair") || "unknown"; 
      if (p.get("agouti")) {
        this.coatPatterns.push(p.get("agouti")!);
      }
      if (p.get("colorpoint")) {
        this.coatPatterns.push(p.get("colorpoint")!);
      }
      
      // TODO: rex and hairless (below is old code to replace)
      // if (fGenes.devonsphynx && mGenes.devonsphynx) {
      //   this.genes.devonsphynx = fGenes.devonsphynx.concat(mGenes.devonsphynx).sort().reverse();
      // }

      // if (this.genes.devonsphynx) {
      //   if (this.genes.devonsphynx.includes("Dr") && this.genes.devonsphynx.includes("Hr")) {
      //     this.coatType = "hairless";
      //   } else if (this.genes.devonsphynx.includes("Hr")) {
      //     this.coatType = "hairless";
      //   } else if (this.genes.devonsphynx.includes("Dr")) {
      //     this.coatType = "curly";
      //   }
      // }

      if (father.breed && mother.breed && !father.breed.includes("Domestic") && !mother.breed.includes("Domestic")) {
        if (father.breed === mother.breed) {
          this.breed = father.breed; 
        } else if ((father.breed === "Siamese" && mother.breed === "Burmese") || (father.breed === "Burmese" && mother.breed === "Siamese")) {
          this.breed = "Tonkinese";
        } else {
          this.breed = father.breed + " x " + mother.breed; 
        }
      } else {
        if (this.coatType === "longhair") {
          this.breed = "Domestic Longhair";
        } else if (this.coatType === "shorthair") {
          this.breed = "Domestic Shorthair";
        }
      }

    } else {
      throw new Error("Error: cannot create Cat. Invalid arguments.");
    }
  }

  setName(name: string) {
    this.name = name; 
  }

  generateGenes(): void {
    if (this.xy === "XX") {
      this.genes.set("xy", ["X", "X"]);
    } else if (this.xy === "XY") {
      this.genes.set("xy", ["X", "Y"]);
    }

    if (this.coatType !== "unknown") {
      this.genes.set("longhair", traitMappings[this.coatType][Math.floor(Math.random() * traitMappings[this.coatType].length)])
    }

    // set dilute 
    if (this.color !== "white" && Object.values(dilutions).includes(this.color)) {
      this.genes.set("dilute", traitMappings["dilute"][0]);
    } else {
      this.genes.set("dilute", traitMappings["non-dilute"][Math.floor(Math.random() * traitMappings["non-dilute"].length)]);
    }

    // set agouti (tabby)
    if (this.coatPatterns.includes("tabby")) {
      this.genes.set("agouti", traitMappings["tabby"][Math.floor(Math.random() * traitMappings["tabby"].length)]);
    } 

    // set white, orange, brown 
    if (this.color === "white") {
      this.genes.set("white", traitMappings["white"][Math.floor(Math.random() * traitMappings["white"].length)]);
      // randomize orange, brown, and dilute       
      if (this.xy == "XX") {
        let choices = traitMappings["non-orange-xx"].concat(traitMappings["tortoiseshell"]);
        this.genes.set("orange", choices[Math.floor(Math.random() * choices.length)]);
      } else {
        let choices = traitMappings["non-orange-xy"].concat(traitMappings["orange"]);
        this.genes.set("orange", choices[Math.floor(Math.random() * choices.length)]);
      }
      this.genes.set("brown", traitMappings["non-brown"][Math.floor(Math.random() * traitMappings["non-brown"].length)]);                
      let choices = traitMappings["dilute"].concat(traitMappings["non-dilute"]);
      this.genes.set("dilute", choices[Math.floor(Math.random() * choices.length)]);
    } else if (this.color.includes("orange") || this.color.includes("cream") || this.color.includes("tortoise") || this.color.includes("calico")) {
      // get orange 
      if (this.color.includes("tortoiseshell") || this.color.includes("calico")) {
        this.genes.set("orange", traitMappings["tortoiseshell"][0]); 
      } else {
        this.genes.set("orange", traitMappings["orange"][0]); 
      }
      // orange cats are always tabby even without the usual tabby gene 
      if (!this.coatPatterns.includes("tabby")) {
        this.coatPatterns.push("tabby");
      }
      // randomize brown and set white = non-white (if bicolor, this will be updated later) 
      this.genes.set("brown", traitMappings["non-brown"][Math.floor(Math.random() * traitMappings["non-brown"].length)]);          
      this.genes.set("white", traitMappings["non-white"][Math.floor(Math.random() * traitMappings["non-white"].length)]);          
    } else {
      // set brown according to provided value 
      this.genes.set("brown", traitMappings[this.color.split(" ")[0]][Math.floor(Math.random() * traitMappings[this.color.split(" ")[0]].length)]);
      // randomize orange (to a value that doesn't produce orange / tortie)
      if (this.xy == "XX") {
        this.genes.set("orange", traitMappings["non-orange-xx"][Math.floor(Math.random() * traitMappings["non-orange-xx"].length)]);          
      } else {
        this.genes.set("orange", traitMappings["non-orange-xy"][Math.floor(Math.random() * traitMappings["non-orange-xy"].length)]);
      }
      // set white = non-white 
      this.genes.set("white", traitMappings["non-white"][Math.floor(Math.random() * traitMappings["non-white"].length)]);          
    }

    // set colorpoint 
    // Colour point inheritance 
    if (this.coatPatterns.includes("colorpoint")) {
      this.genes.set("colorpoint", traitMappings["colorpoint"][Math.floor(Math.random() * traitMappings["colorpoint"].length)]);
    } else if (this.coatPatterns.includes("mink")) {
      this.genes.set("colorpoint", traitMappings["mink"][Math.floor(Math.random() * traitMappings["mink"].length)]);
    } else if (this.coatPatterns.includes("sepia")) {
      this.genes.set("colorpoint", traitMappings["sepia"][Math.floor(Math.random() * traitMappings["sepia"].length)]);
    } else if (this.coatPatterns.includes("albino")) {
      this.genes.set("colorpoint", traitMappings["albino"][Math.floor(Math.random() * traitMappings["albino"].length)]);
    } else {
      this.genes.set("colorpoint", traitMappings["non-colorpoint"][Math.floor(Math.random() * traitMappings["non-colorpoint"].length)]);
    }

    // set bicolor 
    if (this.coatPatterns.includes("bicolor") || this.color.endsWith("and white")) {
      this.genes.set("white", traitMappings["bicolor"][Math.floor(Math.random() * traitMappings["bicolor"].length)]);
    }

    // BREED-SPECIFIC STUFF 
    // no need to set breed-specific traits that are already the default, e.g. shorthair 
    switch (this.breed?.toLowerCase()) {
      case "persian": 
      case "ragdoll": // ragdoll can be pointed, but doesn't have to be 
      case "siberian": 
      case "nebelung": 
      case "maine coon": 
      case "norwegian forest": 
        if (!this.coatType) {
          this.genes.set("longhair", traitMappings["longhair"][0]);
        }
        break; 
      case "himalayan": 
      case "birman": 
      case "neva masquerade": 
        if (!this.coatType) {
          this.genes.set("longhair", traitMappings["longhair"][0]);
        }
      case "siamese": 
      case "thai": 
      case "balinese": 
        // if the colorpoint type has been specified manually (i.e. the user inputs "colorpoint" or "mink", etc.), that should override the breed standard 
        if (!this.coatPatterns.includes("colorpoint") && !this.coatPatterns.includes("mink") && !this.coatPatterns.includes("sepia")) {
          this.genes.set("colorpoint", traitMappings["colorpoint"][0]);
        }
        break; 
      case "burmese": 
        if (!this.coatPatterns.includes("colorpoint") && !this.coatPatterns.includes("mink") && !this.coatPatterns.includes("sepia")) {
          this.genes.set("colorpoint", traitMappings["sepia"][0]);
        }
        break; 
      case "tonkinese": 
        // tonkinese can be cs/cs, cs/cb, or cb/cb 
        // cs/cb x any can produce any of cs/cs, cs/cb, cb/cb
        // cs/cs x anything != cb/cb 
        // cb/cb x anything != cs/cs  
        if (!this.coatPatterns.includes("colorpoint") && !this.coatPatterns.includes("mink") && !this.coatPatterns.includes("sepia")) {
          let choices = traitMappings["colorpoint"].concat(traitMappings["mink"].concat(traitMappings["sepia"])); 
          this.genes.set("colorpoint", choices[Math.floor(Math.random() * choices.length)]);
        }
        break; 
      // case "sphynx": 
      //   this.genes.devonsphynx = ["Hr", "Hr"];
      //   break; 
      // case "devon rex": 
      //   this.genes.devonsphynx = ["Dr", "Dr"]
      //   break; 
      }

    
  }
  // Retrieves the set of genes this parent will provide to a kitten. 
  getKittenGenes(): Map<string, string[]> {
    let kittenGenes : Map<string, string[]> = new Map(
      [
        ["xy", []],
        ["orange", []], 
        ["brown", []],
        ["dilute", []],
        ["white", []],
        ["longhair", []],
        ["agouti", []],
        ["colorpoint", []]
      ]
    )
    for (let key of kittenGenes.keys()) {
      if (this.genes.get(key)) {
        if (key === "orange" && this.genes.has("xy") && this.genes.get("xy")!.includes("Y") && kittenGenes.get("xy")!.includes("Y")) {
          // father doesn't give X chromosome to male offspring, so he doesn't pass down the orange gene either 
          continue; 
        }
        kittenGenes.set(key, [this.genes.get(key)![Math.floor(Math.random() * this.genes.get(key)!.length)]]);
      }
    }
    console.log(kittenGenes);
    return kittenGenes;
  }

  // Given another Cat, produces a kitten with genes from each parent. 
  makeKittenWith(mate: Cat, kittenName?: string): Cat {
    if ((this.xy === "XX" && mate.xy === "XY") || (this.xy === "XY" && mate.xy === "XX")) {
      let kitten = new Cat(this, mate);
      if (kittenName) {
        kitten.setName(kittenName);
      } 
      return kitten;   
    } else {
      throw new Error(`Error: unable to make kitten without one XX parent and one XY parent.`);
    }
  }

}

export default Cat; 