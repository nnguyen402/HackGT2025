import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavigationIcon, Battery, Bluetooth } from "lucide-react"

export default function DevicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-balance">PathFinder Device</h1>
          <p className="text-muted-foreground">Your smart navigation companion</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-full">
                  <NavigationIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">PathFinder Pro</CardTitle>
                  <p className="text-sm text-muted-foreground">Model: PF-2024</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Connected
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Bluetooth className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Connected</p>
                  <p className="text-sm text-muted-foreground">Strong signal</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Battery className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">67%</p>
                  <p className="text-sm text-muted-foreground">~18 hours left</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <p className="text-sm text-muted-foreground">Smart navigation with haptic feedback</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Set Destination</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter your destination in the app and PathFinder calculates the optimal walking route.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Feel the Direction</h4>
                    <p className="text-sm text-muted-foreground">
                      Gentle vibrations guide you: left wrist for left turns, right wrist for right turns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Stay on Track</h4>
                    <p className="text-sm text-muted-foreground">
                      Double vibration alerts you when you're going the wrong direction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Vibration Patterns</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span>←</span>
                    </div>
                    <h4 className="font-medium text-sm">Turn Left</h4>
                    <p className="text-xs text-muted-foreground">Left wrist pulse</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span>→</span>
                    </div>
                    <h4 className="font-medium text-sm">Turn Right</h4>
                    <p className="text-xs text-muted-foreground">Right wrist pulse</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg text-center">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span>⚠</span>
                    </div>
                    <h4 className="font-medium text-sm">Wrong Way</h4>
                    <p className="text-xs text-muted-foreground">Double pulse</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg text-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span>✓</span>
                    </div>
                    <h4 className="font-medium text-sm">Arrived</h4>
                    <p className="text-xs text-muted-foreground">Three pulses</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
