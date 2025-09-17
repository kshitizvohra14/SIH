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
