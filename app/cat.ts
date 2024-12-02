
type GeneProfile = {
  xy: string[],
  orange: string[], // O, OO = orange; Oo = tortie; o, oo = not orange 
  brown: string[], // BB, Bb, Bbl = black; bb, bbl = brown; blbl = cinnamon 
  dilute: string[], // DD, Dd = not dilute, dd = dilute 
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
  constructor(a: string | GeneProfile, b: string | GeneProfile, color?: string, coatType?: string, coatPattern?: string, breed?: string, father?: GeneProfile, mother?: GeneProfile) 
  {

    if (typeof a === "string" && typeof b === "string") {
      this.name = a; 
      this.sex = b.toUpperCase(); 
      this.color = color?.toLowerCase() ?? "unknown"; 
      this.coatType = coatType?.toLowerCase() ?? "unknown"; 
      this.coatPattern = coatPattern?.toLowerCase() ?? "unknown"; 
      this.breed = breed?.toLowerCase() ?? "unknown";
      this.genes = {
        xy: [],
        orange: [], 
        brown: [],
        dilute: [],
      }
      this.generateGenes();
    } else if (typeof a === "object" && typeof b === "object") {
      this.name = "Kitten";
      this.sex = father!.xy.concat(mother!.xy).sort().join(""); 
      this.genes = {
        xy: [],
        orange:[], 
        brown: [],
        dilute: [],
      }

      if (father?.xy && mother?.xy) {
        this.genes.xy = father.xy.concat(mother.xy).sort(); 
        this.sex = this.genes.xy.join("").toUpperCase();
      } else {
        throw new Error("Error: cannot create kitten without X or Y chromosomes from both parents.");
      }

      if (father?.orange && mother?.orange) {
        if (this.sex === "XY") {
          this.genes.orange = mother.orange; 
        } else {
          this.genes.orange = father.orange.concat(mother.orange).sort();
        }
      }

      if (father?.dilute && mother?.dilute) {
        this.genes.dilute = father.dilute.concat(mother.dilute).sort(); 
      }

      if (father?.brown && mother?.brown) {
        this.genes.brown = father.brown.concat(mother.brown).sort(); 
      }

      if (["o", "oo"].includes(this.genes.orange.join("")) || this.genes.orange.length === 0) {
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
    } else {
      throw new Error("Error: cannot create Cat. Invalid arguments.");
    }
  }

  generateGenes(): void {
    if (this.sex === "XX") {
      this.genes.xy = ["X", "X"];
    } else if (this.sex === "XY") {
      this.genes.xy = ["X", "Y"];
    }

    if (this.color) {
      if (["orange", "red", "cream"].includes(this.color)) {
        if (this.sex === "XY") {
          this.genes.orange = ["O"];
        } else {
          this.genes.orange = ["O", "O"];
        }
      } else if (["tortoiseshell", "calico", "dilute tortoiseshell"].includes(this.color)) {
        this.genes.orange = ["O", "o"];
      } else {
        if (this.sex === "XY") {
          this.genes.orange = ["o"];
        } else {
          this.genes.orange = ["o", "o"];
        }
      }
      if (this.color === "chocolate") {
        this.genes.brown = ["b", ["b", "bl"][Math.floor(Math.random() * 2)]];
      } else if (this.color === "cinnamon") {
        this.genes.brown = ["bl", "bl"];
      } else {
        this.genes.brown = ["B", ["B", "b", "bl"][Math.floor(Math.random() * 3)]];
      }
      if (["blue", "grey", "gray", "lilac", "fawn", "cream"].includes(this.color) || this.color.includes("dilute")) {
        this.genes.dilute = ["d", "d"];
      } else {
        this.genes.dilute = ["D", ["D", "d"][Math.floor(Math.random() * 2)]];
      }
    }
  }

  getKittenGenes(): GeneProfile {
    let kittenGenes : GeneProfile = {
      xy: [],
      orange: [],
      brown: [],
      dilute: [],
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

  makeKitten(mate: Cat): Cat {
    if (this.sex === "XX" && mate.sex === "XY") {
      let dad = mate.getKittenGenes(); 
      let mom = this.getKittenGenes(); 
      return new Cat(dad, mom);
    } else if (this.sex === "XY" && mate.sex === "XX") {
      let dad = this.getKittenGenes(); 
      let mom = mate.getKittenGenes(); 
      return new Cat(dad, mom);
    } else {
      throw new Error(`Error: unable to make kitten without one XX parent and one XY parent.`);
    }
  }

}