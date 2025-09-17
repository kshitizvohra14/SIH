"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { breedDatabase, getBreedById, searchBreeds, type BreedInfo } from "@/lib/breed-database"

interface BreedSidebarProps {
  selectedBreed: string | null
}

export function BreedSidebar({ selectedBreed }: BreedSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("identified")

  const breedInfo = selectedBreed ? getBreedById(selectedBreed.toLowerCase().replace(/\s+/g, "-")) : null
  const searchResults = searchQuery ? searchBreeds(searchQuery) : []

  const renderBreedCard = (breed: BreedInfo) => (
    <Card key={breed.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{breed.name}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {breed.type === "dual-purpose" ? "Dual" : breed.type}
          </Badge>
        </div>
        <CardDescription className="text-xs">{breed.origin}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Milk:</span>
            <span className="font-medium">{breed.milkCapacity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight:</span>
            <span className="font-medium">{breed.weight}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="h-full bg-sidebar border-l border-sidebar-border overflow-hidden flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h3 className="text-lg font-semibold text-sidebar-foreground mb-3">Breed Information</h3>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-3">
            <TabsTrigger value="identified" className="text-xs">
              Identified
            </TabsTrigger>
            <TabsTrigger value="browse" className="text-xs">
              Browse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-0">
            <Input
              placeholder="Search breeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="identified" className="mt-0">
            {!selectedBreed ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">🐄</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Upload an image to get detailed breed information and characteristics.
                  </p>
                </CardContent>
              </Card>
            ) : breedInfo ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{breedInfo.name}</CardTitle>
                    <CardDescription className="text-sm">{breedInfo.description}</CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Origin:</span>
                      <span className="font-medium">{breedInfo.origin}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="secondary" className="text-xs">
                        {breedInfo.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium">{breedInfo.weight}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Lifespan:</span>
                      <span className="font-medium">{breedInfo.lifespan}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Milk Production</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-xl font-bold text-primary mb-1">{breedInfo.milkCapacity}</div>
                      <p className="text-xs text-muted-foreground">Average daily production</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Characteristics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {breedInfo.characteristics.map((char: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-sm">{char}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Colors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {breedInfo.colors.map((color, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Uses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {breedInfo.uses.map((use, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {use}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Temperament</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{breedInfo.temperament}</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Breed information not found. Try browsing our database.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="browse" className="mt-0">
            <div className="space-y-3">
              {searchQuery ? (
                searchResults.length > 0 ? (
                  searchResults.map(renderBreedCard)
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground text-sm">No breeds found matching "{searchQuery}"</p>
                    </CardContent>
                  </Card>
                )
              ) : (
                <>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-sidebar-foreground mb-2">Popular Breeds</h4>
                    {breedDatabase.slice(0, 4).map(renderBreedCard)}
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                    View All Breeds ({breedDatabase.length})
                  </Button>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
