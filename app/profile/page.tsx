"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GoogleMap } from "@/components/google-maps"
import { LocationSearch } from "@/components/location-search"
import { MapPin, Leaf, Battery, Bluetooth, NavigationIcon, Calendar, Edit } from "lucide-react"
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

export default function ProfilePage() {
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
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/diverse-profile-avatars.png" alt="Alex" />
                <AvatarFallback className="text-xl">AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <h1 className="text-2xl font-bold">Alex Johnson</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Member since March 15, 2024</span>
                </div>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

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
                <span className="text-sm font-medium text-green-600">Connected</span>
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
