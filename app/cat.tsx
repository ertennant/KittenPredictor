import { colors, coatPatterns, coatTypes, breeds } from "./cat-data-defs";

type GeneProfile = {
  xy: string[],
  orange: string[], // O, O/O = orange; O/o = tortie; o, o/o = not orange 
  brown: string[], // B/B, B/b, B/bl = black; b/b, b/bl = brown; bl/bl = cinnamon 
  dilute: string[], // D/D, D/d = not dilute, d/d = dilute 
  white: string[], // W/W, W/Ws, W/w = white; Ws/w, Ws/Ws = bicolor; w/w = not white 
  longhair: string[], // N/N, N/n = short hair; n/n = long hair 
  agouti: string[]; // AA, Aa = tabby; aa = self (solid) 
  colorpoint: string[]; // C/C, C/cs, C/cb = non-colorpoint; cs/cs = Siamese colorpoint; cb/cb = Burmese colorpoint; cb/cs = mink colorpoint 
  // note: rex and hairless are caused by several different breed-specific mutations that work separately 
  hairless?: string[], // for breed-specific hairless genes for Sphynx, etc. 
  rex?: string[], // for breed-specific rex (curly hair) genes for Cornish Rex, etc. 
  devonsphynx?: string[], // Hr/Hr, Hr/Dr = hairless; Dr/Dr = rex; N/N = normal; N/Hr, N/Dr = carrier 
}

const validXYValues : { [key: string]: string; } = {
  "xy": "XY", 
  "xx": "XX", 
  "male": "XY",
  "female": "XX",
}

class Cat {
  name: string; 
  sex: string; // XX, XY
  color: string; // black, orange, tortoiseshell, gray, chocolate, cinnamon, cream,... 
  coatType: string; // short hair, long hair, rex, hairless 
  coatPatterns: string[]; // tabby, tuxedo, etc.
  breed?: string; 
  genes: GeneProfile; 
  
  constructor(name: string, sex: string, traits?: string[]);
  constructor(father: Cat, mother: Cat);
  constructor(a: string | Cat, b: string | Cat, c?: string[]) 
  {

    this.name = "Cat";
    this.sex = "unknown";
    this.color = "unknown";
    this.coatType = "unknown";
    this.coatPatterns = [];

    if (typeof a === "string" && typeof b === "string") {
      
      if (a === "") {
        throw new Error("Error: cannot create Cat with empty name.");
      } 

      if (!Object.keys(validXYValues).includes(b.toLowerCase())) {
        throw new Error(`Error: cannot create Cat ${a} because XY value ${b} is invalid.`);
      }

      this.name = a; 
      this.sex = validXYValues[b.toLowerCase()]; 

      if (c) {
        console.log(c);
        for (let trait of c) {
          trait = trait.toLowerCase(); 
          if (colors.includes(trait)) {
            this.color = trait;
            if (this.color === "calico" || trait.endsWith(" and white")) {
              this.coatPatterns.push("bicolor");
            }
          } else if (coatTypes.includes(trait)) {
            this.coatType = trait;
          } else if (coatPatterns.includes(trait) && !this.coatPatterns.includes(trait)) {
            this.coatPatterns.push(trait);
          } else if (breeds.includes(trait)) {
            this.breed = trait; 
          }
        }

        if (!this.breed) {
          if (this.coatType === "longhair") {
            this.breed = "domestic longhair";
          } else if (this.coatType === "shorthair") {
            this.breed = "domestic shorthair";
          } else {
            this.breed = "domestic unknown";
          }
        }
      }

      this.genes = {
        xy: [],
        orange: [], 
        brown: [],
        dilute: [],
        white: [],
        longhair: [],
        agouti: [],
        colorpoint: [],
      }
      this.generateGenes();
    } else if (typeof a === "object" && typeof b === "object") {
      let father = a; 
      let mother = b; 
      let fGenes = father.getKittenGenes(); 
      let mGenes = mother.getKittenGenes(); 

      this.name = "Kitten";
      this.genes = {
        xy: [],
        orange:[], 
        brown: [],
        dilute: [],
        white: [],
        longhair: [],
        agouti: [], 
        colorpoint: [], 
      }

      if (fGenes.xy && mGenes.xy) {
        this.genes.xy = fGenes.xy.concat(mGenes.xy).sort(); 
        this.sex = this.genes.xy.join("").toUpperCase();
      } else {
        throw new Error("Error: cannot create kitten without X or Y chromosomes from both parents.");
      }

      // COAT COLORS 
      if (fGenes.white.length > 0 && mGenes.white.length > 0) {
        this.genes.white = fGenes.white.concat(mGenes.white).sort(); 
      }

      if (fGenes.orange.length > 0 && mGenes.orange.length > 0) {
        if (this.sex === "XY") {
          this.genes.orange = mGenes.orange; 
        } else {
          this.genes.orange = fGenes.orange.concat(mGenes.orange).sort();
        }
      }

      if (fGenes.dilute.length > 0 && mGenes.dilute.length > 0) {
        this.genes.dilute = fGenes.dilute.concat(mGenes.dilute).sort(); 
      }

      if (fGenes.brown.length > 0 && mGenes.brown.length > 0) {
        this.genes.brown = fGenes.brown.concat(mGenes.brown).sort(); 
      }

      if (this.genes.white.includes("W")) {
        this.color = "white"; 
      } else if (["o", "oo"].includes(this.genes.orange.join("")) || this.genes.orange.length === 0) {
        // deal with brown and dilute 
        if (this.genes.brown.length === 0 || this.genes.brown.includes("B")) {
          if (this.genes.dilute.join("") === "dd") {
            this.color = "gray";
          } else {
            this.color = "black";
          }
        } else if (this.genes.brown.includes("b")) {
          if (this.genes.dilute.join("") === "dd") {
            this.color = "lilac";
          } else {
            this.color = "chocolate";
          }
        } else if (this.genes.brown.join("") === "blbl") {
          if (this.genes.dilute.join("") === "dd") {
            this.color = "fawn";
          } else {
            this.color = "cinnamon";
          }
        }
      } else if (["O", "OO"].includes(this.genes.orange.join(""))) {
        if (this.genes.dilute.join("") === "dd") {
          this.color = "cream";
        } else {
          this.color = "orange";
        }
      } else if (this.genes.orange.join("") === "Oo") {
        if (this.genes.dilute.join("") === "dd") {
          this.color = "dilute tortoiseshell";
        } else {
          this.color = "tortoiseshell";
        }
      } 

      // COAT PATTERNS (tabby, bicolor, colorpoint, etc.)
      if (!this.genes.white.includes("W") && this.genes.white.includes("Ws")) {
        this.coatPatterns.push("bicolor");
      } 

      if (fGenes.agouti.length > 0 && mGenes.agouti.length > 0) {
        this.genes.agouti = fGenes.agouti.concat(mGenes.agouti).sort(); 
      }

      if (this.genes.agouti.includes("A")) {
        this.coatPatterns.push("tabby");
      }

      if (fGenes.colorpoint.length > 0 && mGenes.colorpoint.length > 0) {
        this.genes.colorpoint = fGenes.colorpoint.concat(mGenes.colorpoint).sort(); 
      }

      if (!this.genes.colorpoint.includes("C")) {
        if (this.genes.colorpoint.includes("cs") && !this.genes.colorpoint.includes("cb")) {
          this.coatPatterns.push("colorpoint");
        } else if (this.genes.colorpoint.includes("cs") && this.genes.colorpoint.includes("cb")) {
          this.coatPatterns.push("mink");
        } else {
          this.coatPatterns.push("sepia");
        }
      }

      // COAT TYPES (longhair, shorthair, etc.)
      if (fGenes.longhair.length > 0 && mGenes.longhair.length > 0) {
        this.genes.longhair = fGenes.longhair.concat(mGenes.longhair);
      }

      if (this.genes.longhair.includes("N")) {
        this.coatType = "shorthair";
      } else if (this.genes.longhair.length > 0) {
        this.coatType = "longhair";
      } 

      if (fGenes.devonsphynx && mGenes.devonsphynx) {
        this.genes.devonsphynx = fGenes.devonsphynx.concat(mGenes.devonsphynx).sort().reverse();
      }

      if (this.genes.devonsphynx) {
        if (this.genes.devonsphynx.includes("Dr") && this.genes.devonsphynx.includes("Hr")) {
          this.coatType = "hairless";
        } else if (this.genes.devonsphynx.includes("Hr")) {
          this.coatType = "hairless";
        } else if (this.genes.devonsphynx.includes("Dr")) {
          this.coatType = "curly";
        }
      }

      if (father.breed && mother.breed && !father.breed.includes("domestic") && !mother.breed.includes("domestic")) {
        if (father.breed === mother.breed) {
          this.breed = father.breed; 
        } else {
          this.breed = father.breed + " x " + mother.breed; 
        }
      } else {
        if (this.coatType === "longhair") {
          this.breed = "domestic longhair";
        } else if (this.coatType === "shorthair") {
          this.breed = "domestic shorthair";
        }
      }

    } else {
      throw new Error("Error: cannot create Cat. Invalid arguments.");
    }

    console.log(this);
  }

  setName(name: string) {
    this.name = name; 
  }

  generateGenes(): void {
    if (this.sex === "XX") {
      this.genes.xy = ["X", "X"];
    } else if (this.sex === "XY") {
      this.genes.xy = ["X", "Y"];
    }

    if (this.color !== "unknown") {
      // orange is on the X chromosome, so male cats have only one copy, while female cats have two 
      if (["orange", "cream"].includes(this.color)) {
        if (this.sex === "XY") {
          this.genes.orange = ["O"];
        } else {
          this.genes.orange = ["O", "O"];
        }
      } else if (this.color.includes("tortoiseshell") || this.color.includes("calico")) {
        this.genes.orange = ["O", "o"];
      } else {
        if (this.sex === "XY") {
          this.genes.orange = ["o"];
        } else {
          this.genes.orange = ["o", "o"];
        }
      }
      if (this.color === "white") {
        // white prevents other colors from being visible and is unaffected by dilution 
        this.genes.white = ["W", ["W", "Ws", "w"][Math.floor(Math.random() * 3)]];
      } else if (["chocolate", "lilac"].includes(this.color)) {
        this.genes.brown = ["b", ["b", "bl"][Math.floor(Math.random() * 2)]];
      } else if (["cinnamon", "fawn"].includes(this.color)) {
        this.genes.brown = ["bl", "bl"];
      } else {
        this.genes.brown = ["B", ["B", "b", "bl"][Math.floor(Math.random() * 3)]];
      }
      if (["gray", "lilac", "fawn", "cream"].includes(this.color) || this.color.includes("dilute")) {
        this.genes.dilute = ["d", "d"];
      } else {
        this.genes.dilute = ["D", ["D", "d"][Math.floor(Math.random() * 2)]];
      }
    }

    if (this.coatType !== "unknown") {
      if (this.coatType === "longhair") {
        this.genes.longhair = ["n", "n"];
      } else if (this.coatType === "shorthair") {
        this.genes.longhair = ["N", ["N", "n"][Math.floor(Math.random() * 2)]];
      }
    }
    
    // COAT PATTERNS 
    if (this.coatPatterns.includes("tabby")) {
      this.genes.agouti = ["A", ["A", "a"][Math.floor(Math.random() * 2)]];
    } else {
      this.genes.agouti = ["a", "a"];
    }

    if (this.coatPatterns.includes("bicolor")) {
      this.genes.white = ["Ws", ["Ws", "w"][Math.floor(Math.random() * 2)]];
    }
        
    // Colour point inheritance 
    if (this.genes.colorpoint.length === 0) {
      if (this.coatPatterns.includes("colorpoint")) {
        this.genes.colorpoint = ["cs", ["cs", "cb"][Math.floor(Math.random() * 2)]];
      } else if (this.coatPatterns.includes("mink")) {
        this.genes.colorpoint = ["cs", "cb"];
      } else if (this.coatPatterns.includes("sepia")) {
        this.genes.colorpoint = ["cb", "cb"];
      } else {
        // for simplicity, this assumes that random adult cats without visible points aren't carriers 
        this.genes.colorpoint = ["C", "C"];
      }
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
          this.genes.longhair = ["n", "n"];
        }
        break; 
      case "himalayan": 
      case "birman": 
      case "neva masquerade": 
        if (!this.coatType) {
          this.genes.longhair = ["n", "n"];
        }
      case "siamese": 
      case "thai": 
      case "balinese": 
        // if the colorpoint type has been specified manually (i.e. the user inputs "colorpoint" or "mink", etc.), that should override the breed standard 
        if (!this.coatPatterns.includes("colorpoint") && !this.coatPatterns.includes("mink") && !this.coatPatterns.includes("sepia")) {
          this.genes.colorpoint = ["cs", "cs"];
        }
        break; 
      case "burmese": 
        if (!this.coatPatterns.includes("colorpoint") && !this.coatPatterns.includes("mink") && !this.coatPatterns.includes("sepia")) {
          this.genes.colorpoint = ["cb", "cb"];
        }
        break; 
      case "tonkinese": 
        // tonkinese can be cs/cs, cs/cb, or cb/cb 
        // cs/cb x any can produce any of cs/cs, cs/cb, cb/cb
        // cs/cs x anything != cb/cb 
        // cb/cb x anything != cs/cs  
        if (!this.coatPatterns.includes("colorpoint") && !this.coatPatterns.includes("mink") && !this.coatPatterns.includes("sepia")) {
          if (!this.coatPatterns.includes("mink") && !(this.coatPatterns.includes("colorpoint") && !(this.coatPatterns.includes("sepia")))) {
            this.genes.colorpoint = [["cs", "cb"][Math.floor(Math.random() * 2)], ["cs", "cb"][Math.floor(Math.random() * 2)]];
          }
        }
        break; 
      case "sphynx": 
        this.genes.devonsphynx = ["Hr", "Hr"];
        break; 
      case "devon rex": 
        this.genes.devonsphynx = ["Dr", "Dr"]
        break; 
      }

    
  }
  // Retrieves the set of genes this parent will provide to a kitten. 
  getKittenGenes(): GeneProfile {
    let kittenGenes : GeneProfile = {
      xy: [],
      orange: [],
      brown: [],
      dilute: [],
      white: [],
      longhair: [],
      agouti: [], 
      colorpoint: [], 
    };
    for (let key of Object.keys(kittenGenes)) {
      let k = key as keyof GeneProfile; 
      if (this.genes[k] && this.genes[k].length > 0) {
        // choose one of the available alleles at random 
        kittenGenes[k] = []; 
        kittenGenes[k].push(this.genes[k][Math.floor(Math.random() * this.genes[k].length)])
      }
    }
    return kittenGenes;
  }

  // Given another Cat, produces a kitten with genes from each parent. 
  makeKittenWith(mate: Cat, kittenName?: string): Cat {
    let dad; 
    let mom; 
    if (this.sex === "XX" && mate.sex === "XY") {
      dad = mate; 
      mom = this; 
    } else if (this.sex === "XY" && mate.sex === "XX") {
      dad = this; 
      mom = mate; 
    } else {
      throw new Error(`Error: unable to make kitten without one XX parent and one XY parent.`);
    }
    let kitten = new Cat(dad, mom);
    if (kittenName) {
      kitten.setName(kittenName);
    } 
    return kitten; 
  }

}

export default Cat; 