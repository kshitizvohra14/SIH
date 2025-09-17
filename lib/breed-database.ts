export interface BreedInfo {
  id: string
  name: string
  type: "dairy" | "beef" | "dual-purpose" | "buffalo"
  origin: string
  milkCapacity: string
  weight: string
  characteristics: string[]
  temperament: string
  lifespan: string
  description: string
  image?: string
  colors: string[]
  uses: string[]
  climate: string[]
}

export const breedDatabase: BreedInfo[] = [
  {
    id: "holstein-friesian",
    name: "Holstein Friesian",
    type: "dairy",
    origin: "Netherlands",
    milkCapacity: "25-30 liters/day",
    weight: "580-680 kg",
    characteristics: ["Black and white patches", "Large size", "High milk production", "Prominent udder"],
    temperament: "Docile and calm",
    lifespan: "15-20 years",
    description:
      "Holstein Friesian cattle are a breed of dairy cattle originating from the Dutch provinces of North Holland and Friesland. They are known for their distinctive black and white markings and exceptional milk production.",
    colors: ["Black and white", "Red and white"],
    uses: ["Milk production", "Breeding"],
    climate: ["Temperate", "Cool"],
  },
  {
    id: "jersey",
    name: "Jersey",
    type: "dairy",
    origin: "Jersey Island",
    milkCapacity: "15-20 liters/day",
    weight: "350-450 kg",
    characteristics: ["Light brown color", "Small to medium size", "High butterfat content", "Refined features"],
    temperament: "Gentle and docile",
    lifespan: "15-18 years",
    description:
      "Jersey cattle are a British breed of small dairy cattle from Jersey, in the British Channel Islands. They are known for their rich, creamy milk with high butterfat content.",
    colors: ["Light brown", "Fawn", "Dark brown"],
    uses: ["High-quality milk production", "Butter production"],
    climate: ["Temperate", "Warm"],
  },
  {
    id: "angus",
    name: "Aberdeen Angus",
    type: "beef",
    origin: "Scotland",
    milkCapacity: "8-12 liters/day",
    weight: "500-650 kg",
    characteristics: ["Black or red color", "Polled (hornless)", "Excellent meat quality", "Compact build"],
    temperament: "Calm and easy to handle",
    lifespan: "12-15 years",
    description:
      "Aberdeen Angus, sometimes simply Angus, is a Scottish breed of small beef cattle. They are naturally polled and known for their high-quality marbled beef.",
    colors: ["Black", "Red"],
    uses: ["Beef production", "Crossbreeding"],
    climate: ["Cool", "Temperate"],
  },
  {
    id: "brahman",
    name: "Brahman",
    type: "dual-purpose",
    origin: "India/USA",
    milkCapacity: "10-15 liters/day",
    weight: "500-800 kg",
    characteristics: ["Large hump", "Heat tolerant", "Loose skin", "Long ears"],
    temperament: "Intelligent and adaptive",
    lifespan: "15-20 years",
    description:
      "The Brahman is an American breed of zebuine-taurine hybrid beef cattle. They are well adapted to hot climates and are known for their distinctive hump and heat tolerance.",
    colors: ["Gray", "Red", "Black", "White"],
    uses: ["Beef production", "Crossbreeding", "Heat tolerance"],
    climate: ["Hot", "Tropical", "Humid"],
  },
  {
    id: "murrah-buffalo",
    name: "Murrah Buffalo",
    type: "buffalo",
    origin: "India",
    milkCapacity: "12-18 liters/day",
    weight: "450-650 kg",
    characteristics: ["Black color", "Curved horns", "High milk fat content", "Robust build"],
    temperament: "Docile and manageable",
    lifespan: "18-25 years",
    description:
      "Murrah buffalo is a breed of water buffalo mainly kept for milk production. They are known for their high milk yield and fat content, making them excellent for dairy purposes.",
    colors: ["Black", "Dark brown"],
    uses: ["Milk production", "Breeding", "Draft work"],
    climate: ["Hot", "Humid", "Tropical"],
  },
  {
    id: "gir",
    name: "Gir",
    type: "dairy",
    origin: "India",
    milkCapacity: "8-12 liters/day",
    weight: "300-400 kg",
    characteristics: ["Distinctive forehead", "Drooping ears", "Various colors", "Hardy breed"],
    temperament: "Gentle and calm",
    lifespan: "15-20 years",
    description:
      "Gir cattle are an indigenous breed from India, known for their distinctive appearance and good milk production. They are well adapted to hot climates.",
    colors: ["Red", "White", "Mixed"],
    uses: ["Milk production", "Breeding"],
    climate: ["Hot", "Tropical"],
  },
  {
    id: "sahiwal",
    name: "Sahiwal",
    type: "dairy",
    origin: "Pakistan/India",
    milkCapacity: "10-16 liters/day",
    weight: "300-500 kg",
    characteristics: ["Reddish brown color", "Loose skin", "Heat tolerant", "Good milk production"],
    temperament: "Docile and quiet",
    lifespan: "15-18 years",
    description:
      "Sahiwal is a zebu dairy breed from the Sahiwal district of Pakistan. They are known for their heat tolerance and good milk production in tropical conditions.",
    colors: ["Reddish brown", "Light red"],
    uses: ["Milk production", "Heat tolerance breeding"],
    climate: ["Hot", "Tropical", "Arid"],
  },
  {
    id: "simmental",
    name: "Simmental",
    type: "dual-purpose",
    origin: "Switzerland",
    milkCapacity: "18-22 liters/day",
    weight: "600-800 kg",
    characteristics: ["Golden red with white markings", "Large size", "Dual purpose", "Strong build"],
    temperament: "Docile and easy-going",
    lifespan: "15-20 years",
    description:
      "Simmental cattle are a versatile breed from Switzerland, excellent for both milk and beef production. They are known for their distinctive golden-red color with white markings.",
    colors: ["Golden red with white", "Yellow with white"],
    uses: ["Milk production", "Beef production", "Draft work"],
    climate: ["Temperate", "Cool", "Mountain"],
  },
]

export function getBreedById(id: string): BreedInfo | undefined {
  return breedDatabase.find((breed) => breed.id === id)
}

export function getBreedsByType(type: BreedInfo["type"]): BreedInfo[] {
  return breedDatabase.filter((breed) => breed.type === type)
}

export function searchBreeds(query: string): BreedInfo[] {
  const lowercaseQuery = query.toLowerCase()
  return breedDatabase.filter(
    (breed) =>
      breed.name.toLowerCase().includes(lowercaseQuery) ||
      breed.origin.toLowerCase().includes(lowercaseQuery) ||
      breed.characteristics.some((char) => char.toLowerCase().includes(lowercaseQuery)),
  )
}
