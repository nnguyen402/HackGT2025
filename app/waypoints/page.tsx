"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LocationSearch } from "@/components/location-search"
import { GoogleMap } from "@/components/google-maps"
import { useRef } from "react"
import { Plus, Coffee, TreePine, Building, CheckCircle, Circle, Edit, Trash2, Route } from "lucide-react"

const waypoints = [
  {
    id: 1,
    name: "Central Park Fountain",
    category: "park",
    distance: "0.8 km",
    points: 50,
    visited: false,
    description: "Beautiful fountain in the heart of Central Park",
    estimatedTime: "12 min walk",
    icon: TreePine,
    color: "text-green-600",
    lat: 40.7829,
    lng: -73.9654,
  },
  {
    id: 2,
    name: "Downtown Coffee Shop",
    category: "cafe",
    distance: "1.2 km",
    points: 35,
    visited: true,
    description: "Local favorite with great espresso",
    estimatedTime: "18 min walk",
    icon: Coffee,
    color: "text-amber-600",
    lat: 40.7505,
    lng: -73.9934,
  },
  {
    id: 3,
    name: "Art Museum",
    category: "culture",
    distance: "2.1 km",
    points: 75,
    visited: false,
    description: "Contemporary art exhibitions",
    estimatedTime: "32 min walk",
    icon: Building,
    color: "text-purple-600",
    lat: 40.7614,
    lng: -73.9776,
  },
]

export default function WaypointsPage() {
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

  const handleWaypointDirections = (waypoint: any) => {
    if (mapRef.current) {
      mapRef.current.getDirections({ lat: waypoint.lat, lng: waypoint.lng }, waypoint.name)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-balance">Waypoints</h1>
          <p className="text-muted-foreground">Manage your saved locations and get directions</p>
        </div>

        <LocationSearch onLocationSearch={handleLocationSearch} />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Waypoints</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Waypoint
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {waypoints.map((waypoint) => {
                const Icon = waypoint.icon
                return (
                  <div key={waypoint.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      {waypoint.visited ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <Icon className={`h-5 w-5 ${waypoint.color}`} />
                      <div>
                        <p className="font-medium">{waypoint.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {waypoint.distance} • {waypoint.estimatedTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{waypoint.points} pts</Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleWaypointDirections(waypoint)}
                        className="h-8 w-8 p-0"
                      >
                        <Route className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Map View</CardTitle>
            <p className="text-sm text-muted-foreground">Click waypoints for directions</p>
          </CardHeader>
          <CardContent>
            <GoogleMap ref={mapRef} waypoints={waypoints} showDirections={true} className="h-96" />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
