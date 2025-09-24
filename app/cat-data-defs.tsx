
export const m = [
  "black",
  "black and white",
  "calico",
  "dilute calico",
  "chocolate",
  "chocolate and white",
  "cinnamon and white",
  "cinnamon",
  "cream",
  "cream and white",
  "colorpoint",
  "fawn",
  "fawn and white",
  "gray",
  "gray and white",
  "lilac",
  "lilac and white",
  "longhair",
  "mink",
  "orange",
  "orange and white",
  "sepia",
  "shorthair",
  "tabby",
  "tortoiseshell",
  "dilute tortoiseshell",
  "tortoiseshell and white",
  "dilute tortoiseshell and white",
  "white",
]

// array of valid cat colors 
export const colors = [
  "black",
  "black and white",
  "calico",
  "blue calico",
  "gray calico",
  "chocolate calico",
  "cinnamon calico",
  "lilac calico",
  "fawn calico",
  "chocolate",
  "chocolate and white",
  "cinnamon",
  "cinnamon and white",
  "cream",
  "cream and white",
  "fawn",
  "fawn and white",
  "gray",
  "gray and white",
  // "lavender",
  // "lavender and white",
  "lilac",
  "lilac and white",
  "orange",
  "orange and white",
  "tortoiseshell", // i.e., black and orange 
  "gray tortoiseshell", // dilute black and orange = blue and cream 
  "blue tortoiseshell", // dilute black and orange = blue and cream 
  "chocolate tortoiseshell", // brown and orange 
  "cinnamon tortoiseshell", // cinnamon and orange 
  "lilac tortoiseshell", // light brown and cream 
  "fawn tortoiseshell", // light cinnamon and cream 
  "tortoiseshell and white",
  "dilute tortoiseshell and white",
  "white",
]

export const coatTypes = [
  "hairless", 
  "longhair", 
  "rex", 
  "shorthair", 
]

export const coatPatterns = [
  "bicolor",
  "colorpoint",
  "mink", // a less-contrasting form of colorpoint, created by crossing Siamese with Burmese 
  "sepia", // color pattern seen in Burmese 
  "tabby",
  "tricolor", // another name for tortoiseshell / calico 
]

export const validColors : { [key: string]: string; } = {
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

export const validCoatTypes : { [key: string]: string; } = {
  "longhair": "longhair", 
  "long hair": "longhair", 
  "shorthair": "shorthair", 
  "short hair": "shorthair", 
}

export const validCoatPatterns : { [key: string]: string; } = {
  "tabby": "tabby",
  "tuxedo": "bicolor",
  "tuxie": "bicolor",
  // "calico": "bicolor",
  "bicolor": "bicolor",
  "bicolour": "bicolor",
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
export const breeds : string[] = [
  "Abyssinian",
  "Angora",
  "Balinese",
  "Birman",
  "Bombay",
  "Burmese",
  "Burmilla",
  "Devon Rex",
  "Egyptian Mau",
  "Havana Brown",
  "Himalayan",
  "Javanese",
  "Maine Coon",
  "Nebelung",
  "Neva Masquerade",
  "Norwegian Forest",
  "Persian",
  "Ragdoll",
  "Russian Blue",
  "Siamese",
  "Siberian",
  "Singapura",
  "Snowshoe",
  "Somali",
  "Sphynx",
  "Thai",
  "Tiffanie",
  "Tonkinese",
  "Turkish",
]

// Because Tailwind doesn't understand dynamic class names. 
export const catTraitCSS : { [key: string]: string} = {
  "orange": "bg-orange",
  "orange and white": "bg-orange-w",
  "cream": "bg-cream",
  "cream and white": "bg-cream-w",
  "black": "bg-black text-white",
  "black and white": "bg-black-w",
  "gray": "bg-gray text-white",
  "gray and white": "bg-gray-w",
  "chocolate": "bg-chocolate text-white",
  "chocolate and white": "bg-chocolate-w",
  "lilac": "bg-lilac",
  "lilac and white": "bg-lilac-w",
  "cinnamon": "bg-cinnamon text-white",
  "cinnamon and white": "bg-cinnamon-w",
  "fawn": "bg-fawn",
  "fawn and white": "bg-fawn-w",
  "white": "bg-white",
  "calico": "bg-calico",
  "blue calico": "bg-calico-blue",
  "gray calico": "bg-calico-blue",
  "chocolate calico": "bg-calico-chocolate",
  "cinnamon calico": "bg-calico-cinnamon",
  "lilac calico": "bg-calico-lilac",
  "fawn calico": "bg-calico-fawn",
  "dilute calico": "bg-calico-d",
  "tortoiseshell": "bg-tortie",
  "blue tortoiseshell": "bg-tortie-blue",
  "gray tortoiseshell": "bg-tortie-blue",
  "chocolate tortoiseshell": "bg-tortie-chocolate text-white",
  "cinnamon tortoiseshell": "bg-tortie-cinnamon",
  "lilac tortoiseshell": "bg-tortie-lilac",
  "fawn tortoiseshell": "bg-tortie-fawn",
  "dilute tortoiseshell": "bg-tortie-d",
  "tortoiseshell-and-white": "bg-calico",
  "dilute-tortoiseshell-and-white": "bg-calico-blue",
}

// Mapping of gene name -> list of valid allele pairs 
// (Note that the letters used to represent alleles are not completely standardized and may be different in some textbooks and other sources.)
export const genes : { [key: string]: string[] } = {
  "White": ["WW", "WS", "Ww", "SS", "Ss", "ww"], 
  "Orange": ["OO", "O", "Oo", "oo", "o"],
  "Brown": ["BB", "Bb", "Bbl", "bb", "bbl", "blbl"], 
  "Dilute": ["DD", "Dd", "dd"], 
  "Agouti": ["AA", "Aa", "aa"], 
  "Colorpoint": ["CC", "Ccs", "Ccb", "cscs", "cbcb", "cscb", "cc"],
  "Longhair": ["LL", "Ll", "ll"]
}

// Mapping of allele string -> array of alleles 
export const alleleMappings : { [key: string]: string[] } = {
  "XX": ["X", "X"],
  "XY": ["X", "Y"],
  "WW": ["W", "W"],
  "WS": ["W", "S"],
  "Ww": ["W", "w"],
  "SS": ["S", "S"],
  "Ss": ["S", "s"],
  "ww": ["w", "w"],
  "OO": ["O", "O"],
  "Oo": ["O", "o"],
  "oo": ["o", "o"],
  "O": ["O"],
  "o": ["o"],
  "BB": ["B", "B"],
  "Bb": ["B", "b"],
  "Bbl": ["B", "bl"],
  "bb": ["b", "b"],
  "bbl": ["b", "bl"],
  "blbl": ["bl", "bl"],
  "DD": ["D", "D"],
  "Dd": ["D", "d"],
  "dd": ["d", "d"],
  "AA": ["A", "A"],
  "Aa": ["A", "a"],
  "aa": ["a", "a"],
  "CC": ["C", "C"], 
  "Ccs": ["C", "cs"], 
  "Ccb": ["C", "cb"], 
  "cscs": ["cs", "cs"], 
  "cscb": ["cs", "cb"], 
  "cbcb": ["cb", "cb"], 
  "cc": ["c", "c"], 
  "LL": ["L", "L"], 
  "Ll": ["L", "l"], 
  "ll": ["l", "l"], 
}

// Explanations to show the user what each gene does. The current ordering is intended to be the most intuitive for teaching the user how they interact. 
// TODO: add rex and hairless
export const tooltips : { [key: string]: string} = {
  "White": "WW, WS, Ww cause dominant white, making the cat white regardless of other genes. SS causes large white markings such as the van pattern, Ss causes smaller white markings such as tuxedo and often turns tortoiseshell into calico.",
  "Orange": "O and OO make the coat orange (formally called red) or cream except when dominant white is present. Oo causes tortoiseshell and calico fur. Since it is on the X chromosome, males can only have O or o, so all tortoiseshell and calico cats are either female or XXY.",
  "Brown": "bb and bbl cause chocolate coats, blbl causes cinnamon. BB, Bb, Bbl cause black or gray coats unless Orange or White is present.",
  "Dilute": "DD and Dd cause normal intensity of existing color. dd lightens existing color. Turns black to gray (blue), orange (red) to cream, chocolate to lilac, cinnamon to fawn.",
  "Agouti": "AA and Aa cause tabby pattern, aa causes solid color coat except in orange and cream cats, which always have tabby markings.",
  "Colorpoint": "CC, Cs, and Cb appear normal. ss causes the typical pointed pattern of Siamese. bb causes the sepia pattern of Burmese. sb causes mink colorpoint, and occurs in Siamese-Burmese mixes and Tonkinese. cc is rare, and causes albinism.",
  "Longhair": "LL and Ll cause short hair, ll causes long hair.",
}

// Maps regular colors to their dilute versions. 
export const dilutions : { [key: string]: string } = {
  "orange": "cream",
  "black": "gray", 
  "tortoiseshell": "dilute tortoiseshell",
  "calico": "dilute calico",
  "chocolate": "lilac",
  "cinnamon": "fawn",
  "white": "white", // no change 
}

// Maps allele pairs to the trait they cause (if not prevented by some other gene).
export const geneMappings : { [key: string]: string } = {
  "WW": "white", 
  "Ww": "white",
  "WS": "white", 
  "SS": "bicolor", 
  "Ss": "bicolor", 
  "O": "orange",
  "OO": "orange",
  "Oo": "tortoiseshell", 
  "dd": "dilute", 
  "BB": "black",
  "Bb": "black",
  "Bbl": "black",
  "bb": "chocolate",
  "bbl": "chocolate",
  "blbl": "cinnamon",
  "AA": "tabby", 
  "Aa": "tabby", 
  "cscs": "colorpoint", 
  "cscb": "mink", 
  "cbcb": "sepia", 
  "cc": "albino", 
  "LL": "shorthair",
  "Ll": "shorthair",
  "ll": "longhair",
}

export const traitMappings : { [key: string]: string[][]} = {
  "white": [["W", "W"], ["W", "w"], ["W", "S"]],
  "bicolor": [["S", "S"], ["S", "s"]],
  "non-white": [["w", "w"]],
  "chocolate": [["b", "b"], ["b", "bl"]],
  "lilac": [["b", "b"], ["b", "bl"]],
  "cinnamon": [["bl", "bl"]],
  "fawn": [["bl", "bl"]],
  "black": [["B", "B"], ["B", "b"], ["B", "bl"]],
  "non-brown": [["B", "B"], ["B", "b"], ["B", "bl"], ["b", "b"], ["b", "bl"], ["bl", "bl"]],
  "orange": [["O"]],
  "cream": [["O"]],
  "non-orange-xy": [["o"]],
  "non-orange-xx": [["o", "o"]],
  "tortoiseshell": [["O", "o"]],
  "dilute tortoiseshell": [["O", "o"]],
  "calico": [["O", "o"]],
  "tabby": [["A", "A"], ["A", "a"]], 
  "longhair": [["l", "l"]],
  "shorthair": [["L", "L"], ["L", "l"]], 
  "dilute": [["d", "d"]],
  "non-dilute": [["D", "D"], ["D", "d"]],
  "colorpoint": [["cs", "cs"]],
  "mink": [["cs", "cb"]],
  "sepia": [["cb", "cb"]],
  "albino": [["c", "c"]],
  "non-colorpoint": [["C", "C"], ["C", "cs"], ["C", "cb"], ["C", "c"]]
}