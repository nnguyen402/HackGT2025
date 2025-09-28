"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GoogleMap } from "@/components/google-maps"
import { LocationSearch } from "@/components/location-search"
import {
  Leaf,
  MapPin,
  Battery,
  Wifi,
  NavigationIcon,
  RotateCcw,
  RotateCw,
  TestTube,
  WifiOff,
  Loader2,
} from "lucide-react"
import { useRef, useState, useEffect } from "react"

let websocket: WebSocket | null = null
const BRIDGE_URL = "ws://localhost:8080" // Local bridge WebSocket URL

async function connectToBridge(): Promise<boolean> {
  try {
    console.log("[v0] Connecting to local bridge...")

    websocket = new WebSocket(BRIDGE_URL)

    return new Promise((resolve) => {
      if (!websocket) {
        resolve(false)
        return
      }

      websocket.onopen = () => {
        console.log("[v0] Successfully connected to local bridge!")
        resolve(true)
      }

      websocket.onerror = (error) => {
        console.error("[v0] WebSocket connection error:", error)
        websocket = null
        resolve(false)
      }

      websocket.onclose = () => {
        console.log("[v0] WebSocket connection closed")
        websocket = null
      }

      websocket.onmessage = (event) => {
        console.log("[v0] Received from bridge:", event.data)
      }

      // Timeout after 5 seconds
      setTimeout(() => {
        if (websocket?.readyState !== WebSocket.OPEN) {
          websocket?.close()
          websocket = null
          resolve(false)
        }
      }, 5000)
    })
  } catch (error) {
    console.error("[v0] Bridge connection error:", error)
    websocket = null
    return false
  }
}

function disconnectFromBridge() {
  if (websocket) {
    websocket.close()
    websocket = null
  }
}

async function sendTestSignal(signal: string, direction: string): Promise<boolean> {
  console.log(`[v0] Sending test signal: ${signal} (${direction})`)

  if (!websocket || websocket.readyState !== WebSocket.OPEN) {
    console.log("[v0] No WebSocket connection available")
    return false
  }

  try {
    // Send the character signal to the local bridge
    websocket.send(signal)
    console.log(`[v0] Successfully sent: ${signal}`)
    return true
  } catch (error) {
    console.error("[v0] Error sending to bridge:", error)
    return false
  }
}

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
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected")

  useEffect(() => {
    const checkConnection = () => {
      if (websocket?.readyState === WebSocket.OPEN) {
        setConnectionStatus("connected")
      } else {
        setConnectionStatus("disconnected")
      }
    }

    const interval = setInterval(checkConnection, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleLocationSearch = async (location: string) => {
    if (!window.google) return

    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address: location }, (results: any, status: any) => {
      if (status === "OK" && results[0]) {
        const destination = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        }
        if (mapRef.current) {
          mapRef.current.getDirections(destination, location)
        }
      }
    })
  }

  const handleTestSignal = async (signal: string, direction: string) => {
    if (connectionStatus !== "connected") {
      alert("Please connect to the local bridge first")
      return
    }

    const success = await sendTestSignal(signal, direction)

    if (success) {
      // Show user feedback
      const button = document.activeElement as HTMLButtonElement
      if (button) {
        const originalText = button.textContent
        button.textContent = `Sent ${direction}!`
        setTimeout(() => {
          button.textContent = originalText
        }, 1000)
      }
    } else {
      alert("Error sending signal. Check your local bridge connection.")
    }
  }

  const handleConnect = async () => {
    setConnectionStatus("connecting")
    const success = await connectToBridge()
    setConnectionStatus(success ? "connected" : "disconnected")
  }

  const handleDisconnect = async () => {
    disconnectFromBridge()
    setConnectionStatus("disconnected")
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
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Bridge Connection</span>
                </div>
                <Badge variant={connectionStatus === "connected" ? "default" : "secondary"}>
                  {connectionStatus === "connecting" && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                  {connectionStatus === "connected" && <Wifi className="h-3 w-3 mr-1" />}
                  {connectionStatus === "disconnected" && <WifiOff className="h-3 w-3 mr-1" />}
                  {connectionStatus === "connecting"
                    ? "Connecting..."
                    : connectionStatus === "connected"
                      ? "Connected"
                      : "Disconnected"}
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

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Motor Testing
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Test left and right vibration signals via local bridge to your GPS bracelet
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              {connectionStatus === "disconnected" && (
                <Button onClick={handleConnect} size="sm" className="flex-1">
                  <Wifi className="h-4 w-4 mr-2" />
                  Connect to Local Bridge
                </Button>
              )}
              {connectionStatus === "connecting" && (
                <Button disabled size="sm" className="flex-1">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </Button>
              )}
              {connectionStatus === "connected" && (
                <Button onClick={handleDisconnect} variant="outline" size="sm" className="flex-1 bg-transparent">
                  Disconnect
                </Button>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => handleTestSignal("L", "Left")}
                variant="outline"
                size="lg"
                className="flex-1 max-w-32"
                disabled={connectionStatus !== "connected"}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Test Left
              </Button>
              <Button
                onClick={() => handleTestSignal("R", "Right")}
                variant="outline"
                size="lg"
                className="flex-1 max-w-32"
                disabled={connectionStatus !== "connected"}
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Test Right
              </Button>
            </div>
            <div className="mt-3 text-xs text-muted-foreground text-center">
              {connectionStatus === "connected"
                ? "Bridge connected - ready to test!"
                : connectionStatus === "connecting"
                  ? "Connecting to local bridge..."
                  : "Connect to local bridge to test vibration patterns"}
            </div>
            <div className="mt-2 text-xs text-muted-foreground bg-muted p-2 rounded">
              <strong>Bridge Setup:</strong> Make sure your local bridge is running on localhost:8080 and connected to
              the HC-05 module.
            </div>
          </CardContent>
        </Card>

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
