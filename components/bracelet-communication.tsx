"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, RotateCcw, RotateCw, ArrowUp, ArrowDown, Wifi, WifiOff, Loader2 } from "lucide-react"

interface DirectionStep {
  instructions: string
  maneuver?: string
  distance: { text: string; value: number }
  duration: { text: string; value: number }
}

interface BraceletCommunicationProps {
  currentStep?: DirectionStep
  steps: DirectionStep[]
  currentStepIndex: number
  onStepAdvance?: () => void
  className?: string
}

let websocket: WebSocket | null = null
const BRIDGE_URL = "ws://localhost:8080" // Local bridge WebSocket URL

// Vibration pattern mapping for different maneuvers
const VIBRATION_PATTERNS = {
  // Basic walking directions only
  "turn-left": "L",
  "turn-right": "R",
  "turn-sharp-left": "LL",
  "turn-sharp-right": "RR",
  "turn-slight-left": "l",
  "turn-slight-right": "r",

  // Straight movements
  straight: "S",
  continue: "S",
  head: "S",

  // Arrival
  destination: "D",
  waypoint: "W",

  // Default
  unknown: "S",
}

async function sendToBracelet(signal: string, stepInfo?: string) {
  console.log(`[v0] Sending to bracelet: ${signal}`, stepInfo ? `(${stepInfo})` : "")

  if (!websocket || websocket.readyState !== WebSocket.OPEN) {
    console.log("[v0] No WebSocket connection available")
    return
  }

  try {
    websocket.send(signal)
    console.log(`[v0] Successfully sent: ${signal}`)
  } catch (error) {
    console.error("[v0] Error sending to bridge:", error)
  }
}

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

// Parse Google Maps maneuver into vibration pattern
function parseManeuverToPattern(step: DirectionStep): string | null {
  if (!step.maneuver) {
    // Try to parse from instructions text if no maneuver field
    const instructions = step.instructions.toLowerCase()

    if (
      instructions.includes("u-turn") ||
      instructions.includes("u turn") ||
      instructions.includes("roundabout") ||
      instructions.includes("merge") ||
      instructions.includes("ramp") ||
      instructions.includes("fork") ||
      instructions.includes("highway") ||
      instructions.includes("freeway") ||
      instructions.includes("interstate")
    ) {
      return null // Skip this instruction
    }

    if (instructions.includes("turn left") || instructions.includes("left turn")) {
      if (instructions.includes("sharp")) return VIBRATION_PATTERNS["turn-sharp-left"]
      if (instructions.includes("slight")) return VIBRATION_PATTERNS["turn-slight-left"]
      return VIBRATION_PATTERNS["turn-left"]
    }

    if (instructions.includes("turn right") || instructions.includes("right turn")) {
      if (instructions.includes("sharp")) return VIBRATION_PATTERNS["turn-sharp-right"]
      if (instructions.includes("slight")) return VIBRATION_PATTERNS["turn-slight-right"]
      return VIBRATION_PATTERNS["turn-right"]
    }

    if (instructions.includes("destination") || instructions.includes("arrive")) {
      return VIBRATION_PATTERNS["destination"]
    }

    return VIBRATION_PATTERNS["straight"]
  }

  const drivingManeuvers = [
    "uturn-left",
    "uturn-right",
    "roundabout-left",
    "roundabout-right",
    "roundabout-straight",
    "ramp-left",
    "ramp-right",
    "merge",
    "on-ramp",
    "off-ramp",
    "fork-left",
    "fork-right",
  ]

  if (drivingManeuvers.includes(step.maneuver)) {
    return null // Skip this maneuver
  }

  // Use the maneuver field if available and walking-relevant
  return VIBRATION_PATTERNS[step.maneuver as keyof typeof VIBRATION_PATTERNS] || VIBRATION_PATTERNS["unknown"]
}

// Get icon for vibration pattern
function getPatternIcon(pattern: string) {
  switch (pattern) {
    case "L":
    case "LL":
    case "l":
      return <RotateCcw className="h-4 w-4" />
    case "R":
    case "RR":
    case "r":
      return <RotateCw className="h-4 w-4" />
    case "S":
      return <ArrowUp className="h-4 w-4" />
    case "D":
      return <WifiOff className="h-4 w-4" />
    default:
      return <Zap className="h-4 w-4" />
  }
}

// Get pattern description
function getPatternDescription(pattern: string): string {
  const descriptions: Record<string, string> = {
    L: "Turn Left",
    R: "Turn Right",
    LL: "Sharp Left",
    RR: "Sharp Right",
    l: "Slight Left",
    r: "Slight Right",
    S: "Continue Straight",
    D: "Destination",
    W: "Waypoint",
  }
  return descriptions[pattern] || "Continue"
}

export function BraceletCommunication({
  currentStep,
  steps,
  currentStepIndex,
  onStepAdvance,
  className,
}: BraceletCommunicationProps) {
  const [lastSentPattern, setLastSentPattern] = useState<string>("")
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

  useEffect(() => {
    if (!currentStep) return

    const pattern = parseManeuverToPattern(currentStep)

    // Skip if this is a driving-specific instruction
    if (pattern === null) return

    const cleanInstructions = currentStep.instructions.replace(/<[^>]*>/g, "") // Remove HTML tags

    // Only send if pattern changed to avoid spam
    if (pattern !== lastSentPattern) {
      sendToBracelet(pattern, cleanInstructions)
      setLastSentPattern(pattern)
    }
  }, [currentStep, lastSentPattern])

  const handleConnect = async () => {
    setConnectionStatus("connecting")
    const success = await connectToBridge()
    setConnectionStatus(success ? "connected" : "disconnected")
  }

  const handleDisconnect = async () => {
    disconnectFromBridge()
    setConnectionStatus("disconnected")
  }

  const currentPattern = currentStep ? parseManeuverToPattern(currentStep) : ""

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Bracelet Communication
        </CardTitle>
        <div className="flex items-center gap-2">
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
          {currentPattern && (
            <Badge variant="outline" className="gap-1">
              {getPatternIcon(currentPattern)}
              {getPatternDescription(currentPattern)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
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

        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
          <strong>Local Bridge:</strong> Connects to HC-05 via Bluetooth and forwards WebSocket messages to your Arduino
          bracelet.
        </div>

        {currentStep && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Current Instruction:</div>
            <div
              className="text-sm text-muted-foreground p-3 bg-muted rounded-lg"
              dangerouslySetInnerHTML={{ __html: currentStep.instructions }}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{currentStep.distance.text}</span>
              <span>{currentStep.duration.text}</span>
              <span>
                Step {currentStepIndex + 1} of {steps.length}
              </span>
            </div>
          </div>
        )}

        {onStepAdvance && currentStepIndex < steps.length - 1 && (
          <Button onClick={onStepAdvance} variant="outline" size="sm" className="w-full bg-transparent">
            <ArrowDown className="h-4 w-4 mr-2" />
            Next Step (Testing)
          </Button>
        )}

        <div className="text-xs text-muted-foreground">
          <div className="font-medium mb-1">Walking Vibration Patterns:</div>
          <div className="grid grid-cols-2 gap-1">
            <div>L/R: Turn Left/Right</div>
            <div>LL/RR: Sharp Turns</div>
            <div>S: Continue Straight</div>
            <div>D: Destination</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
