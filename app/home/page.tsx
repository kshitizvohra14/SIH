"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ImageUpload } from "@/components/image-upload"
import { BreedSidebar } from "@/components/breed-sidebar"

export default function HomePage() {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AGRI AI
              </h1>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Mini Toolbar */}
        <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 space-y-4">
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0" title="Upload Image">
            <span className="text-lg">📷</span>
          </Button>
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0" title="Camera">
            <span className="text-lg">📸</span>
          </Button>
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0" title="History">
            <span className="text-lg">📋</span>
          </Button>
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0" title="Settings">
            <span className="text-lg">⚙️</span>
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Image Processing Area (2/3 of remaining space) */}
          <div className="flex-1 p-6">
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">AI Breed Identification</h2>
                <p className="text-muted-foreground">
                  Upload an image of a cow or buffalo to identify its breed using our advanced AI technology.
                </p>
              </div>

              {/* Image Upload Area */}
              <div className="flex-1">
                <ImageUpload
                  onImageUpload={setUploadedImage}
                  onBreedIdentified={setSelectedBreed}
                  uploadedImage={uploadedImage}
                />
              </div>

              {/* Results Area */}
              {selectedBreed && (
                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Identification Result</CardTitle>
                        <Badge variant="secondary">95% Confidence</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Identified Breed</h4>
                          <p className="text-lg font-medium text-primary">{selectedBreed}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Classification</h4>
                          <p className="text-muted-foreground">Dairy Cattle</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar (1/3 of remaining space) */}
          <div className="w-80 border-l border-border">
            <BreedSidebar selectedBreed={selectedBreed} />
          </div>
        </div>
      </div>
    </div>
  )
}
