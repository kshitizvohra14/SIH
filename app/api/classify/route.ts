import { type NextRequest, NextResponse } from "next/server"

// Simple static knowledge base (you can expand this or fetch from FastAPI/Wikipedia)
const breedInfo: Record<
  string,
  { origin?: string; description: string; milk_yield?: string }
> = {
  Gir_cow: {
    origin: "Gujarat, India",
    description: "Gir cows are known for their distinctive horns, resilience, and high milk yield.",
    milk_yield: "12–15 liters/day",
  },
  Murrah_buffalo: {
    origin: "Haryana, India",
    description: "Murrah buffaloes are prized for their rich, high-fat milk and adaptability.",
    milk_yield: "20–25 liters/day",
  },
  Red_Sindhi_cow: {
    origin: "Sindh region, Pakistan/India",
    description: "Red Sindhi cows are hardy dairy cattle known for their reddish-brown color and adaptability.",
    milk_yield: "8–12 liters/day",
  },
  Sahiwal_cow: {
  origin: "Punjab, India & Pakistan",
  description: "Sahiwal cows are one of the best dairy breeds, known for their calm temperament and high milk production.",
  milk_yield: "12–18 liters/day",
},

Tharparkar_cow: {
  origin: "Thar Desert, Rajasthan, India",
  description: "Tharparkar cows are dual-purpose cattle, valued for both milk and draught power, with high disease resistance.",
  milk_yield: "8–10 liters/day",
},

Ongole_cow: {
  origin: "Andhra Pradesh, India",
  description: "Ongole cattle are large, hardy animals primarily used for draught work but also provide moderate milk yield.",
  milk_yield: "5–7 liters/day",
},

Kankrej_cow: {
  origin: "Gujarat & Rajasthan, India",
  description: "Kankrej cows are strong, draught-type animals with good milk yield and are highly resilient to heat.",
  milk_yield: "10–14 liters/day",
},

Hallikar_cow: {
  origin: "Karnataka, India",
  description: "Hallikar cattle are mainly draught animals, famous for their endurance, strength, and cultural importance in South India.",
  milk_yield: "3–5 liters/day",
},

Nagori_cow: {
  origin: "Rajasthan, India",
  description: "Nagori cattle are excellent draught animals, used in agriculture and transport, with low milk yield.",
  milk_yield: "2–4 liters/day",
},

Jaffarabadi_buffalo: {
  origin: "Gujarat, India",
  description: "Jaffarabadi buffaloes are among the heaviest and largest buffalo breeds, producing high-fat milk.",
  milk_yield: "15–20 liters/day",
},

Mehsana_buffalo: {
  origin: "Gujarat, India",
  description: "Mehsana buffaloes are a crossbreed of Murrah and Surti, known for good adaptability and milk production.",
  milk_yield: "8–12 liters/day",
},

Surti_buffalo: {
  origin: "Gujarat, India",
  description: "Surti buffaloes are medium-sized, gentle animals producing rich milk with high fat content.",
  milk_yield: "7–10 liters/day",
},
Amritmahal_cow: {
  origin: "Karnataka, India",
  description: "Amritmahal cattle are known for their strength, speed, and endurance. Traditionally used as draught animals in military and agricultural work, they are highly valued for their resilience.",
  milk_yield: "2–4 liters/day",
},

  // 👆 Add more as needed
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    // Send to FastAPI backend
    const modelResponse = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData, // Pass the FormData directly
    })

    if (!modelResponse.ok) {
      const errorData = await modelResponse.json()
      return NextResponse.json({ error: errorData.error || "Backend error" }, { status: 500 })
    }

    const result = await modelResponse.json()

    // Normalize + enrich with extra info
    const breedName = result.label || result.breed
    const info = breedInfo[breedName] || { description: "No data available" }

    return NextResponse.json({
      breed: breedName,
      confidence: (result.confidence || 0) * 100,
      alternatives: result.alternatives || [],
      info,
      processingTime: result.processing_time || undefined,
    })
  } catch (error) {
    console.error("Classification error:", error)
    return NextResponse.json({ error: "Failed to process image. Please try again." }, { status: 500 })
  }
}
