"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ClassificationResult {
  breed: string
  confidence: number
  alternatives: Array<{ breed: string; confidence: number }>
  processingTime?: number
}

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  onBreedIdentified: (breed: string) => void
  uploadedImage: string | null
}

export function ImageUpload({ onImageUpload, onBreedIdentified, uploadedImage }: ImageUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const classifyImage = async (file: File): Promise<ClassificationResult> => {
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch("/api/classify", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Classification failed")
    }

    return await response.json()
  }

  const handleFile = async (file: File) => {
    setError(null)
    setClassificationResult(null)

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, etc.)")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError("File size must be less than 10MB")
      return
    }

    const imageUrl = URL.createObjectURL(file)
    onImageUpload(imageUrl)

    setIsProcessing(true)
    setProgress(0)

    try {
      // Show upload progress
      setProgress(25)
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Show processing progress
      setProgress(50)
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Call the actual classification API
      setProgress(75)
      const result = await classifyImage(file)

      // Complete processing
      setProgress(100)
      await new Promise((resolve) => setTimeout(resolve, 200))

      setClassificationResult(result)
      onBreedIdentified(result.breed)
    } catch (err) {
      console.error("Classification error:", err)
      setError(err instanceof Error ? err.message : "Failed to classify image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const resetUpload = () => {
    onImageUpload("")
    onBreedIdentified("")
    setProgress(0)
    setIsProcessing(false)
    setClassificationResult(null)
    setError(null)
  }

  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full">
        {!uploadedImage ? (
          <div
            className={`h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📷</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Upload Image</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                Drag and drop an image of a cow or buffalo here, or click to select a file. For best results, use clear,
                well-lit photos showing the animal's full body or distinctive features.
              </p>
              <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="file-upload" />
              <label htmlFor="file-upload">
                <Button asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-2">Supported formats: JPG, PNG, WebP (max 10MB)</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Image Display */}
            <div className="flex-1 relative mb-4">
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded animal"
                className="w-full h-full object-contain rounded-lg border"
              />
            </div>

            {/* Error Display */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Processing Status */}
            {isProcessing && (
              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {progress < 30
                      ? "Uploading image..."
                      : progress < 60
                        ? "Processing image..."
                        : progress < 90
                          ? "Running AI classification..."
                          : "Finalizing results..."}
                  </span>
                  <span className="text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            {/* Classification Results */}
            {classificationResult && !isProcessing && (
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Classification Results</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {Math.round(classificationResult.confidence)}% Confidence
                      </Badge>
                      {classificationResult.processingTime && (
                        <Badge variant="outline" className="text-xs">
                          {classificationResult.processingTime.toFixed(1)}s
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Primary Result */}
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-primary">Primary Match</h4>
                      <Badge variant="default">{Math.round(classificationResult.confidence)}%</Badge>
                    </div>
                    <p className="text-lg font-medium">{classificationResult.breed}</p>
                  </div>

                  {/* Alternative Results */}
                  {classificationResult.alternatives.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Alternative Matches</h4>
                      <div className="space-y-2">
                        {classificationResult.alternatives.map((alt, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                            <span className="text-sm">{alt.breed}</span>
                            <Badge variant="outline" className="text-xs">
                              {Math.round(alt.confidence)}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetUpload} className="flex-1 bg-transparent">
                Upload New Image
              </Button>
              {classificationResult && (
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save Result
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
