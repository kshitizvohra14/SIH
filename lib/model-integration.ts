export interface ModelConfig {
  endpoint: string
  apiKey?: string
  timeout?: number
  maxRetries?: number
}

export interface ModelPrediction {
  breed: string
  confidence: number
}

export interface ModelResponse {
  predictions: ModelPrediction[]
  processing_time?: number
  model_version?: string
}

// Example integration functions for different model types
export class ModelIntegration {
  private config: ModelConfig

  constructor(config: ModelConfig) {
    this.config = config
  }

  // For local model servers (e.g., FastAPI, Flask)
  async callLocalModel(imageBuffer: Buffer): Promise<ModelResponse> {
    const response = await fetch(this.config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
      body: imageBuffer,
      signal: AbortSignal.timeout(this.config.timeout || 30000),
    })

    if (!response.ok) {
      throw new Error(`Model API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  // For cloud ML services (AWS SageMaker, Google AI Platform, etc.)
  async callCloudModel(imageBuffer: Buffer): Promise<ModelResponse> {
    const response = await fetch(this.config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        instances: [
          {
            image: imageBuffer.toString("base64"),
          },
        ],
      }),
      signal: AbortSignal.timeout(this.config.timeout || 30000),
    })

    if (!response.ok) {
      throw new Error(`Cloud ML API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      predictions: data.predictions || data.results,
      processing_time: data.processing_time,
    }
  }

  // For TensorFlow.js models (browser-based)
  async callTensorFlowJS(imageElement: HTMLImageElement): Promise<ModelResponse> {
    // This would require loading your TensorFlow.js model
    // Example structure:
    // const model = await tf.loadLayersModel('/path/to/your/model.json')
    // const tensor = tf.browser.fromPixels(imageElement)
    // const predictions = await model.predict(tensor)

    throw new Error("TensorFlow.js integration not implemented. Add your model loading logic here.")
  }

  // Retry logic for robust API calls
  async callWithRetry(imageBuffer: Buffer, maxRetries = 3): Promise<ModelResponse> {
    let lastError: Error

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.callLocalModel(imageBuffer)
      } catch (error) {
        lastError = error as Error
        if (attempt < maxRetries) {
          // Exponential backoff
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
      }
    }

    throw lastError!
  }
}

// Environment-based model configuration
export function getModelConfig(): ModelConfig {
  return {
    endpoint: process.env.ML_MODEL_ENDPOINT || "http://localhost:8000/predict",
    apiKey: process.env.ML_API_KEY,
    timeout: Number.parseInt(process.env.ML_TIMEOUT || "30000"),
    maxRetries: Number.parseInt(process.env.ML_MAX_RETRIES || "3"),
  }
}
