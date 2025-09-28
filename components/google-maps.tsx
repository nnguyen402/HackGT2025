"use client"

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Plus, Filter, X, Route } from "lucide-react"

declare global {
  interface Window {
    google: any
  }
}

interface Waypoint {
  id: number
  name: string
  lat: number
  lng: number
  category: string
  points: number
  visited: boolean
  description: string
  icon: any
  color: string
}

interface GoogleMapProps {
  waypoints: Waypoint[]
  onWaypointClick?: (waypoint: Waypoint) => void
  onAddWaypoint?: (lat: number, lng: number) => void
  className?: string
  showDirections?: boolean
  onStepsUpdate?: (steps: any[]) => void
}

export const GoogleMap = forwardRef<any, GoogleMapProps>(
  (
    { waypoints, onWaypointClick, onAddWaypoint, className, showDirections = true, onStepsUpdate },
    ref,
  ) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any | null>(null)
    const markersRef = useRef<any[]>([])
    const directionsServiceRef = useRef<any | null>(null)
    const directionsRendererRef = useRef<any | null>(null)

    const [isLoaded, setIsLoaded] = useState(false)
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
    const [directions, setDirections] = useState<any>(null)
    const [showDirectionsPanel, setShowDirectionsPanel] = useState(false)
    const [directionsSteps, setDirectionsSteps] = useState<any[]>([])

    // Load Maps API
    useEffect(() => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        console.error("Google Maps API key not found")
        return
      }
      if (window.google) {
        setIsLoaded(true)
        return
      }
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setIsLoaded(true)
      document.head.appendChild(script)
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }, [])

    // Get user location
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => setUserLocation({ lat: 40.7128, lng: -74.006 }), // fallback NYC
        )
      } else {
        setUserLocation({ lat: 40.7128, lng: -74.006 })
      }
    }, [])

    // Init map
    useEffect(() => {
      if (!isLoaded || !mapRef.current || !userLocation) return
      const map = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 14,
        styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }],
      })
      mapInstanceRef.current = map

      directionsServiceRef.current = new window.google.maps.DirectionsService()
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        suppressMarkers: false,
        draggable: false,
      })
      directionsRendererRef.current.setMap(map)

      if (onAddWaypoint) {
        map.addListener("click", (event: any) => {
          if (event.latLng) onAddWaypoint(event.latLng.lat(), event.latLng.lng())
        })
      }

      // User marker
      new window.google.maps.Marker({
        position: userLocation,
        map,
        title: "Your Location",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#3B82F6",
          fillOpacity: 1,
          strokeColor: "#FFF",
          strokeWeight: 2,
        },
      })
    }, [isLoaded, userLocation, onAddWaypoint])

    // 🛠️ Directions with step extraction
    const getDirections = (destination: { lat: number; lng: number }, destinationName?: string) => {
      if (!directionsServiceRef.current || !userLocation) return
      const req = { origin: userLocation, destination, travelMode: window.google.maps.TravelMode.WALKING }

      directionsServiceRef.current.route(req, (result: any, status: any) => {
        if (status === "OK") {
          directionsRendererRef.current.setDirections(result)
          setDirections(result)
          const steps = result.routes[0].legs[0].steps.map((s: any) => ({
            instruction: s.instructions,
            distance: s.distance.text,
            duration: s.duration.text,
            maneuver: s.maneuver || "straight",
            start: s.start_location.toJSON(),
            end: s.end_location.toJSON(),
          }))
          setDirectionsSteps(steps)
          setShowDirectionsPanel(true)
          if (onStepsUpdate) onStepsUpdate(steps) // ✅ notify parent (Dashboard → Arduino)
          const bounds = new window.google.maps.LatLngBounds()
          bounds.extend(userLocation)
          bounds.extend(destination)
          mapInstanceRef.current.fitBounds(bounds)
        } else {
          console.error("Directions request failed:", status)
        }
      })
    }

    const clearDirections = () => {
      if (directionsRendererRef.current) directionsRendererRef.current.setDirections({ routes: [] })
      setDirections(null)
      setDirectionsSteps([])
      setShowDirectionsPanel(false)
      if (mapInstanceRef.current && userLocation) {
        mapInstanceRef.current.setCenter(userLocation)
        mapInstanceRef.current.setZoom(14)
      }
    }

    // Waypoints markers
    useEffect(() => {
      if (!mapInstanceRef.current) return
      markersRef.current.forEach((m) => m.setMap(null))
      markersRef.current = []
      waypoints.forEach((wp) => {
        const marker = new window.google.maps.Marker({
          position: { lat: wp.lat, lng: wp.lng },
          map: mapInstanceRef.current,
          title: wp.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: wp.visited ? "#10B981" : "#F97316",
            fillOpacity: 1,
            strokeColor: "#FFF",
            strokeWeight: 2,
          },
        })
        marker.addListener("click", () => {
          if (showDirections) getDirections({ lat: wp.lat, lng: wp.lng }, wp.name)
          if (onWaypointClick) onWaypointClick(wp)
        })
        markersRef.current.push(marker)
      })
    }, [waypoints, onWaypointClick, showDirections])

    // Expose API
    useImperativeHandle(ref, () => ({
      getDirections,
      clearDirections,
    }))

    if (!isLoaded) {
      return (
        <div className={`h-96 bg-muted rounded-lg flex items-center justify-center ${className}`}>
          <div className="text-center space-y-2">
            <MapPin className="h-8 w-8 text-muted-foreground mx-auto animate-pulse" />
            <p className="text-muted-foreground">Loading Google Maps...</p>
          </div>
        </div>
      )
    }

    return (
      <div className={`relative ${className}`}>
        <div className="flex gap-4">
          <div className="flex-1"><div ref={mapRef} className="h-96 w-full rounded-lg" /></div>
          {showDirectionsPanel && directions && (
            <Card className="w-80 h-96 overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2"><Route className="h-5 w-5" />Directions</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearDirections}><X className="h-4 w-4" /></Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {directions.routes[0].legs[0].distance.text} • {directions.routes[0].legs[0].duration.text}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-72 overflow-y-auto px-4 pb-4">
                  {directionsSteps.map((s, i) => (
                    <div key={i} className="flex gap-3 pb-3 border-b border-border last:border-0">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium mt-1">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: s.instruction }} />
                        <div className="text-xs text-muted-foreground mt-1">{s.distance} • {s.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  },
)

GoogleMap.displayName = "GoogleMap"