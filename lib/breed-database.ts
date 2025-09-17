export interface BreedInfo {
  id: string
  name: string
  description: string
  origin: string
  type: string
  weight: string
  lifespan: string
  milkCapacity: string
  characteristics: string[]
  colors: string[]
  uses: string[]
  temperament: string
}

// ✅ Normalization helper
export function normalizeBreedName(name: string): string {
  return name
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .trim()
}

// ✅ Database
export const breedDatabase: BreedInfo[] = [
  {
    id: "gir-cow",
    name: "Gir Cow",
    description: "The Gir is one of the principal Zebu breeds from India, known for high milk yield and adaptability.",
    origin: "Gujarat, India",
    type: "dairy",
    weight: "400–475 kg (cows), 520–600 kg (bulls)",
    lifespan: "12–15 years",
    milkCapacity: "12–15 liters/day",
    characteristics: ["Curved horns", "Long ears", "Hump on back", "Resistant to heat"],
    colors: ["Red", "White", "Spotted"],
    uses: ["Milk production", "Crossbreeding"],
    temperament: "Docile and friendly"
  },
  {
    id: "sahiwal",
    name: "Sahiwal",
    description: "A high-yield dairy breed from Punjab, India and Pakistan, well-suited for tropical climates.",
    origin: "Punjab (India & Pakistan)",
    type: "dairy",
    weight: "350–400 kg (cows), 500–600 kg (bulls)",
    lifespan: "15–20 years",
    milkCapacity: "8–12 liters/day",
    characteristics: ["Loose skin", "Short horns", "Good resistance to parasites"],
    colors: ["Reddish-brown", "Light red"],
    uses: ["Milk production"],
    temperament: "Calm and gentle"
  },
  {
    id: "murrah-buffalo",
    name: "Murrah Buffalo",
    description: "The Murrah buffalo is the best dairy buffalo breed in India, famous for its high milk fat content.",
    origin: "Haryana & Punjab, India",
    type: "dairy",
    weight: "500–700 kg",
    lifespan: "15–18 years",
    milkCapacity: "10–16 liters/day",
    characteristics: ["Jet black", "Tightly curled horns", "Compact body"],
    colors: ["Black"],
    uses: ["Milk production", "Breeding"],
    temperament: "Hardy and strong"
  }
]

// ✅ Lookup by ID
export function getBreedById(name: string): BreedInfo | undefined {
  const normalized = normalizeBreedName(name)
  return breedDatabase.find((breed) => breed.id === normalized)
}

// ✅ Search
export function searchBreeds(query: string): BreedInfo[] {
  const q = query.toLowerCase()
  return breedDatabase.filter((breed) =>
    breed.name.toLowerCase().includes(q) || breed.origin.toLowerCase().includes(q)
  )
}
