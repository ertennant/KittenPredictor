
type GeneProfile = {
  xy: string[],
  orange: string[], // O, O/O = orange; O/o = tortie; o, o/o = not orange 
  brown: string[], // B/B, B/b, B/bl = black; b/b, b/bl = brown; bl/bl = cinnamon 
  dilute: string[], // D/D, D/d = not dilute, d/d = dilute 
  white: string[], // W/W, W/w = white; w/w = not white 
  longhair: string[], // N/N, N/n = short hair; n/n = long hair 
  agouti: string[]; // AA, Aa = tabby; aa = self (solid) 
  colorpoint: string[]; // C/C, C/cs, C/cb = non-colorpoint; cs/cs = Siamese colorpoint; cb/cb = Burmese colorpoint; cb/cs = mink colorpoint 
  // note: rex and hairless are caused by several different breed-specific mutations that work separately 
  hairless?: string[], // for breed-specific hairless genes for Sphynx, etc. 
  rex?: string[], // for breed-specific rex (curly hair) genes for Cornish Rex, etc. 
}

const validXYValues : { [key: string]: string; } = {
  "xy": "XY", 
  "xx": "XX", 
  "male": "XY",
  "female": "XX",
}

const validColors : { [key: string]: string; } = {
  "tortie": "tortoiseshell", 
  "dilute tortie": "dilute tortoiseshell", 
  "tortoiseshell": "tortoiseshell", 
  "white": "white", 
  "black": "black", 
  "gray": "gray", 
  "grey": "gray", 
  "blue": "gray", 
  "red": "orange", 
  "orange": "orange", 
  "ginger": "orange", 
  "cream": "cream", 
  "dilute orange": "cream", 
  "chocolate": "chocolate", 
  "cinnamon": "cinnamon", 
  "lilac": "lilac", 
  "lavender": "lilac", 
  "fawn": "fawn", 
}

const validCoatTypes : { [key: string]: string; } = {
  "longhair": "longhair", 
  "long hair": "longhair", 
  "long": "longhair", 
  "shorthair": "shorthair", 
  "short hair": "shorthair", 
  "short": "shorthair", 
}

const validCoatPatterns : { [key: string]: string; } = {
  "tabby": "tabby",
  "tuxedo": "tuxedo",
  "tuxie": "tuxedo",
  "mink": "mink",
  "tonkinese colorpoint": "mink",
  "sepia": "sepia",
  "burmese colorpoint": "sepia",
  "colorpoint": "colorpoint",
  "color point": "colorpoint",
  "colourpoint": "colorpoint",
  "colour point": "colorpoint",
  "pointed": "colorpoint",
}

// To Do: add more breeds
const validBreeds : string[] = [
  "siamese",
  "burmese",
  "tonkinese",
]

class Cat {
  name: string; 
  sex: string; // XX, XY
  color: string; // black, orange, tortoiseshell, gray, chocolate, cinnamon, cream,... 
  coatType: string; // short hair, long hair, rex, hairless 
  coatPatterns: string[]; // tabby, tuxedo, etc.
  breed?: string; 
  genes: GeneProfile; 
  
  constructor(name: string, sex: string, traits?: string[]);
  constructor(father: GeneProfile, mother: GeneProfile);
  constructor(a: string | GeneProfile, b: string | GeneProfile, c?: string[]) 
  {

  // constructor(name: string, sex: string, color?: string, coatType?: string, coatPattern?: string, breed?: string); 
  // constructor(a: string | GeneProfile, b: string | GeneProfile, color?: string, coatType?: string, coatPattern?: string, breed?: string) 
  // {
    this.name = "Cat";
    this.sex = "unknown";
    this.color = "unknown";
    this.coatType = "unknown";
    this.coatPatterns = [];
    this.breed = "unknown";


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
          if (trait in validColors) {
            this.color = validColors[trait];
          } else if (trait in validCoatTypes) {
            this.coatType = validCoatTypes[trait];
          } else if (trait in validCoatPatterns && !this.coatPatterns.includes(trait)) {
            this.coatPatterns.push(trait);
          } else if (validBreeds.includes(trait)) {
            this.breed = trait; 
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

      if (father.xy && mother.xy) {
        this.genes.xy = father.xy.concat(mother.xy).sort(); 
        this.sex = this.genes.xy.join("").toUpperCase();
      } else {
        throw new Error("Error: cannot create kitten without X or Y chromosomes from both parents.");
      }

      if (father.white.length > 0 && mother.white.length > 0) {
        this.genes.white = father.white.concat(mother.white).sort(); 
      }

      if (father.orange.length > 0 && mother.orange.length > 0) {
        if (this.sex === "XY") {
          this.genes.orange = mother.orange; 
        } else {
          this.genes.orange = father.orange.concat(mother.orange).sort();
        }
      }

      if (father.dilute.length > 0 && mother.dilute.length > 0) {
        this.genes.dilute = father.dilute.concat(mother.dilute).sort(); 
      }

      if (father.brown.length > 0 && mother.brown.length > 0) {
        this.genes.brown = father.brown.concat(mother.brown).sort(); 
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

      if (father.longhair.length > 0 && mother.longhair.length > 0) {
        this.genes.longhair = father.longhair.concat(mother.longhair);
      }

      if (this.genes.longhair.includes("N")) {
        this.coatType = "shorthair";
      } else if (this.genes.longhair.length > 0) {
        this.coatType = "longhair";
      } 

      if (father.agouti.length > 0 && mother.agouti.length > 0) {
        this.genes.agouti = father.agouti.concat(mother.agouti).sort(); 
      }

      if (this.genes.agouti.includes("A")) {
        this.coatPatterns.push("tabby");
      }

      if (father.colorpoint.length > 0 && mother.colorpoint.length > 0) {
        this.genes.colorpoint = father.colorpoint.concat(mother.colorpoint).sort(); 
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
        this.genes.white = ["W", ["W", "w"][Math.floor(Math.random() * 2)]];
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
    
    // To Do: deal with coat patterns and breed-specific hair types. 
    if (this.coatPatterns.includes("tabby")) {
      this.genes.agouti = ["A", ["A", "a"][Math.floor(Math.random() * 2)]];
    } else {
      this.genes.agouti = ["a", "a"];
    }

    // Colorpoint Genes 
    if (this.breed?.toLowerCase() === "siamese") {
      this.genes.colorpoint = ["cs", "cs"];
    } else if (this.coatPatterns.includes("colorpoint")) {
      this.genes.colorpoint = ["cs", ["cs", "cb"][Math.floor(Math.random() * 2)]];
    } else if (this.coatPatterns.includes("mink")) {
      this.genes.colorpoint = ["cs", "cb"];
    } else if (this.breed?.toLowerCase() === "tonkinese") {
      // tonkinese can be cs/cs, cs/cb, or cb/cb 
      // cs/cb x any can produce any of cs/cs, cs/cb, cb/cb
      // cs/cs x anything != cb/cb 
      // cb/cb x anything != cs/cs  
      this.genes.colorpoint = [["cs", "cb"][Math.floor(Math.random() * 2)], ["cs", "cb"][Math.floor(Math.random() * 2)]];
    } else if (this.breed?.toLowerCase() === "burmese" || this.coatPatterns.includes("sepia")) {
      this.genes.colorpoint = ["cb", "cb"];
    } else {
      // for simplicity, this assumes that random adult cats without visible points aren't carriers 
      this.genes.colorpoint = ["C", "C"];
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
      dad = mate.getKittenGenes(); 
      mom = this.getKittenGenes(); 
    } else if (this.sex === "XY" && mate.sex === "XX") {
      dad = this.getKittenGenes(); 
      mom = mate.getKittenGenes(); 
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