"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Clock } from "lucide-react"

declare global {
  interface Window {
    google: any
  }
}

interface LocationSearchProps {
  onLocationSearch: (location: string) => void
  className?: string
}

interface PlaceSuggestion {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
}

export function LocationSearch({ onLocationSearch, className }: LocationSearchProps) {
  const [searchLocation, setSearchLocation] = useState("")
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const autocompleteService = useRef<any>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const initializeAutocomplete = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService()

        // Load recent searches from localStorage
        const saved = localStorage.getItem("pathfinder-recent-searches")
        if (saved) {
          setRecentSearches(JSON.parse(saved))
        }
      } else {
        // Retry if Google Maps isn't loaded yet
        setTimeout(initializeAutocomplete, 100)
      }
    }

    initializeAutocomplete()
  }, [])

  useEffect(() => {
    if (!searchLocation.trim() || !autocompleteService.current) {
      setSuggestions([])
      return
    }

    const request = {
      input: searchLocation,
      types: ["establishment", "geocode"],
      componentRestrictions: { country: "us" }, // Adjust country as needed
    }

    autocompleteService.current.getPlacePredictions(
      request,
      (predictions: PlaceSuggestion[] | null, status: string) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions.slice(0, 5)) // Limit to 5 suggestions
        } else {
          setSuggestions([])
        }
      },
    )
  }, [searchLocation])

  const handleSearch = (location?: string) => {
    const searchTerm = location || searchLocation.trim()
    if (searchTerm) {
      onLocationSearch(searchTerm)

      const updatedRecent = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(0, 5)
      setRecentSearches(updatedRecent)
      localStorage.setItem("pathfinder-recent-searches", JSON.stringify(updatedRecent))

      setSearchLocation("")
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: PlaceSuggestion) => {
    handleSearch(suggestion.description)
  }

  const handleInputFocus = () => {
    setShowSuggestions(true)
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 200)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Get Directions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                placeholder="Enter destination (e.g., 'Taco Bell', '123 Main St')..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="flex-1"
              />

              {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.length > 0 && (
                    <div>
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">Suggestions</div>
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.place_id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground flex items-center gap-2 border-b last:border-b-0"
                        >
                          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate">{suggestion.structured_formatting.main_text}</div>
                            <div className="text-sm text-muted-foreground truncate">
                              {suggestion.structured_formatting.secondary_text}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {recentSearches.length > 0 && !searchLocation.trim() && (
                    <div>
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                        Recent Searches
                      </div>
                      {recentSearches.map((recent, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(recent)}
                          className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground flex items-center gap-2 border-b last:border-b-0"
                        >
                          <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <div className="truncate">{recent}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <Button onClick={() => handleSearch()} disabled={!searchLocation.trim()}>
              <Search className="h-4 w-4 mr-2" />
              Directions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
