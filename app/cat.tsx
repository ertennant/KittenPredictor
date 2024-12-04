
type GeneProfile = {
  xy: string[],
  orange: string[], // O, OO = orange; Oo = tortie; o, oo = not orange 
  brown: string[], // BB, Bb, Bbl = black; bb, bbl = brown; blbl = cinnamon 
  dilute: string[], // DD, Dd = not dilute, dd = dilute 
  white: string[], // WW, Ww = white; ww = not white 
  longhair: string[], // NN, Nn = short hair; nn = long hair 
  // note: rex and hairless are caused by several different mutations that work separately 
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

class Cat {
  name: string; 
  sex: string; // XX, XY
  color?: string; // black, orange, tortoiseshell, gray, chocolate, cinnamon, cream,... 
  coatType?: string; // short hair, medium hair, long hair, rex, hairless 
  coatPattern?: string; // tabby, tuxedo, etc. 
  breed?: string; 
  genes: GeneProfile; 
  
  constructor(father: GeneProfile, mother: GeneProfile);
  constructor(name: string, sex: string, color?: string, coatType?: string, coatPattern?: string, breed?: string); 
  constructor(a: string | GeneProfile, b: string | GeneProfile, color?: string, coatType?: string, coatPattern?: string, breed?: string) 
  {
    if (typeof a === "string" && typeof b === "string") {
      
      if (a === "") {
        throw new Error("Error: cannot create Cat with empty name.");
      } 

      if (!Object.keys(validXYValues).includes(b.toLowerCase())) {
        throw new Error(`Error: cannot create Cat ${a} because XY value ${b} is invalid.`);
      }

      if (color && !Object.keys(validColors).includes(color)) {
        throw new Error("Error: cannot create Cat because color value is invalid.");
      }

      this.name = a; 
      this.sex = validXYValues[b.toLowerCase()]; 
      this.color = color ? validColors[color.toLowerCase()] : "unknown"; 
      this.coatType = coatType?.toLowerCase() ?? "unknown"; 
      this.coatPattern = coatPattern?.toLowerCase() ?? "unknown"; 
      this.breed = breed?.toLowerCase() ?? "unknown";
      this.genes = {
        xy: [],
        orange: [], 
        brown: [],
        dilute: [],
        white: [],
        longhair: [],
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

    if (this.color) {
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

    if (this.coatType) {
      if (this.coatType === "longhair") {
        this.genes.longhair = ["n", "n"];
      } else if (this.coatType === "shorthair") {
        this.genes.longhair = ["N", ["N", "n"][Math.floor(Math.random() * 2)]];
      }
    }
  }

  getKittenGenes(): GeneProfile {
    let kittenGenes : GeneProfile = {
      xy: [],
      orange: [],
      brown: [],
      dilute: [],
      white: [],
      longhair: [],
    };
    for (let key of Object.keys(kittenGenes)) {
      let k = key as keyof GeneProfile; 
      if (this.genes[k].length > 0) {
        // choose one of the available alleles at random 
        kittenGenes[k].push(this.genes[k][Math.floor(Math.random() * this.genes[k].length)])
      }
    }
    return kittenGenes;
  }

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