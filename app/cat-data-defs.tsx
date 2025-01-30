
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
  "dilute calico",
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
  "tortoiseshell",
  "dilute tortoiseshell",
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
  "dilute calico": "bg-calico-d",
  "tortoiseshell": "bg-tortie",
  "dilute tortoiseshell": "bg-tortie-d",
  "tortoiseshell-and-white": "bg-tortie-d",
  "dilute-tortoiseshell-and-white": "bg-tortie-dw",
}

export const genes : { [key: string]: string[] } = {
  "Orange": ["OO", "O", "Oo", "oo"],
  "Brown": ["BB", "Bb", "bb"], 
  "Dilute": ["DD", "Dd", "dd"], 
  "White": ["WW", "WS", "SS", "Ss", "ww"], 
  "Agouti": ["AA", "Aa", "aa"], 
}

export const tooltips : { [key: string]: string} = {
  "Agouti": "This gene causes tabby pattern.",
  "Dilute": "Lightens existing colour.",
  "Orange": "Since it is linked to the X chromosome, males can only have one copy, O or o. Females can also be Oo, tortoiseshell or calico. This is why male tortoiseshells do not exist."
}