"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GoogleMap } from "@/components/google-maps"
import { LocationSearch } from "@/components/location-search"
import { Leaf, MapPin, Battery, Bluetooth, NavigationIcon } from "lucide-react"
import { useRef } from "react"

// Sample waypoints data
const sampleWaypoints = [
  {
    id: 1,
    name: "Central Park",
    lat: 40.7829,
    lng: -73.9654,
    category: "park",
    points: 50,
    visited: false,
    description: "Beautiful park in the heart of the city",
    icon: "park",
    color: "#10B981",
  },
  {
    id: 2,
    name: "Coffee Shop",
    lat: 40.7589,
    lng: -73.9851,
    category: "cafe",
    points: 25,
    visited: true,
    description: "Great local coffee spot",
    icon: "coffee",
    color: "#F97316",
  },
]

export default function Dashboard() {
  const mapRef = useRef<any>(null)

  const handleLocationSearch = async (location: string) => {
    if (!window.google) return

    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address: location }, (results: any, status: any) => {
      if (status === "OK" && results[0]) {
        const destination = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        }
        // Trigger directions in the map component
        if (mapRef.current) {
          mapRef.current.getDirections(destination, location)
        }
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-balance mb-2">Welcome to PathFinder</h1>
          <p className="text-muted-foreground">Navigate with confidence using your GPS bracelet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Device Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <NavigationIcon className="h-4 w-4" />
                Device Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bluetooth className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Connection</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Battery</span>
                </div>
                <span className="text-sm font-medium">87%</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Distance Walked */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Total Distance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127.4 km</div>
              <p className="text-sm text-muted-foreground">All time walking</p>
            </CardContent>
          </Card>

          {/* CO2 Prevented */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-600" />
                CO₂ Prevented
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">24.7 kg</div>
              <p className="text-sm text-muted-foreground">Environmental impact</p>
            </CardContent>
          </Card>
        </div>

        <LocationSearch onLocationSearch={handleLocationSearch} />

        {/* Map with Waypoints */}
        <Card>
          <CardHeader>
            <CardTitle>Map & Waypoints</CardTitle>
            <p className="text-sm text-muted-foreground">
              Click waypoints for directions • Edit waypoints on the Waypoints page
            </p>
          </CardHeader>
          <CardContent>
            <GoogleMap ref={mapRef} waypoints={sampleWaypoints} showDirections={true} className="h-96" />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
