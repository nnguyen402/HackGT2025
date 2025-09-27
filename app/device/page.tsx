import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  NavigationIcon,
  Battery,
  Bluetooth,
  Wifi,
  MapPin,
  Vibrate,
  Settings,
  Smartphone,
  Zap,
  Shield,
  Heart,
  Volume2,
  Accessibility,
  HelpCircle,
  Download,
  RefreshCw,
} from "lucide-react"

export default function DevicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-balance">PathFinder Device</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Your smart navigation companion for accessible, hands-free guidance
          </p>
        </div>

        {/* Device Status Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-full">
                  <NavigationIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">PathFinder Pro</CardTitle>
                  <CardDescription>Model: PF-2024 • Serial: PF240892</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-lg px-4 py-2">
                Connected
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Battery className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">87%</p>
                  <p className="text-sm text-muted-foreground">~18 hours left</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bluetooth className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Connected</p>
                  <p className="text-sm text-muted-foreground">Strong signal</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">GPS Active</p>
                  <p className="text-sm text-muted-foreground">±3m accuracy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Vibrate className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Haptic Ready</p>
                  <p className="text-sm text-muted-foreground">All motors OK</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="how-it-works" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="how-it-works" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <NavigationIcon className="h-5 w-5 text-primary" />
                    Smart Navigation System
                  </CardTitle>
                  <CardDescription>Advanced GPS with haptic feedback for hands-free guidance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Route Planning</h4>
                        <p className="text-sm text-muted-foreground">
                          Set your destination in the app. PathFinder calculates the optimal walking route.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Haptic Guidance</h4>
                        <p className="text-sm text-muted-foreground">
                          Feel gentle vibrations: left wrist for left turns, right wrist for right turns.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Smart Corrections</h4>
                        <p className="text-sm text-muted-foreground">
                          Double vibration alerts you when you're going the wrong direction.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Accessibility className="h-5 w-5 text-green-600" />
                    Accessibility Features
                  </CardTitle>
                  <CardDescription>Designed for users with visual impairments and mobility needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Vibrate className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Customizable vibration patterns and intensity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Optional audio cues with bone conduction</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Emergency SOS button with location sharing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Water-resistant (IP67) for all-weather use</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">7-day battery life with fast charging</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Vibration Patterns Guide</CardTitle>
                <CardDescription>Learn the different haptic signals your PathFinder uses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">←</span>
                    </div>
                    <h4 className="font-medium">Turn Left</h4>
                    <p className="text-sm text-muted-foreground">Single pulse on left wrist</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">→</span>
                    </div>
                    <h4 className="font-medium">Turn Right</h4>
                    <p className="text-sm text-muted-foreground">Single pulse on right wrist</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">⚠</span>
                    </div>
                    <h4 className="font-medium">Wrong Way</h4>
                    <p className="text-sm text-muted-foreground">Double pulse on both wrists</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h4 className="font-medium">Destination</h4>
                    <p className="text-sm text-muted-foreground">Three gentle pulses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Precision GPS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Multi-constellation GPS with ±3m accuracy for reliable navigation in urban and rural environments.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>GPS Accuracy</span>
                      <span className="text-green-600">±3 meters</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Satellite Lock Time</span>
                      <span>{"<"}30 seconds</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Update Rate</span>
                      <span>1 Hz</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="h-5 w-5 text-green-600" />
                    Long Battery Life
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Advanced power management ensures up to 7 days of typical use on a single charge.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Typical Use</span>
                      <span className="text-green-600">7 days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Heavy Use</span>
                      <span>3-4 days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Charging Time</span>
                      <span>2 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vibrate className="h-5 w-5 text-purple-600" />
                    Haptic Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Dual-motor haptic system provides clear, customizable vibration patterns for navigation cues.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Vibration Motors</span>
                      <span>2 (Left & Right)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Intensity Levels</span>
                      <span>5 settings</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pattern Types</span>
                      <span>8 unique</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bluetooth className="h-5 w-5 text-blue-600" />
                    Smart Connectivity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Bluetooth 5.2 ensures reliable connection with your smartphone and other devices.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Bluetooth Version</span>
                      <span>5.2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Range</span>
                      <span>Up to 100m</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Auto-reconnect</span>
                      <span className="text-green-600">Yes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Durability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Built to withstand daily wear with water resistance and impact protection.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Water Resistance</span>
                      <span className="text-green-600">IP67</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Drop Protection</span>
                      <span>1.5m</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Operating Temp</span>
                      <span>-10°C to 60°C</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    Safety Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Emergency features and safety monitoring for peace of mind during your journeys.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>SOS Button</span>
                      <span className="text-green-600">Yes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fall Detection</span>
                      <span className="text-green-600">Yes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Location Sharing</span>
                      <span className="text-green-600">Emergency</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vibrate className="h-5 w-5" />
                    Haptic Settings
                  </CardTitle>
                  <CardDescription>Customize vibration patterns and intensity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vibration Intensity</label>
                    <Progress value={75} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Gentle</span>
                      <span>Strong</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pattern Duration</label>
                    <Progress value={60} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Short</span>
                      <span>Long</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Audio Cues</span>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
                  </div>

                  <Button className="w-full">Test Vibration</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Device Settings
                  </CardTitle>
                  <CardDescription>Configure your PathFinder preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-connect</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Power Saving Mode</span>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Fall Detection</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Night Mode</span>
                    <Button variant="outline" size="sm">
                      Auto
                    </Button>
                  </div>

                  <Button variant="destructive" className="w-full">
                    Reset to Defaults
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Connection Status
                  </CardTitle>
                  <CardDescription>Manage device connectivity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bluetooth className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Bluetooth</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">GPS</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Wi-Fi Sync</span>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reconnect Device
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Firmware Updates
                  </CardTitle>
                  <CardDescription>Keep your device up to date</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Version</span>
                    <Badge variant="outline">v2.1.4</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Latest Version</span>
                    <Badge className="bg-green-100 text-green-800">v2.1.4</Badge>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">Your device is up to date!</p>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Check for Updates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Troubleshooting
                  </CardTitle>
                  <CardDescription>Common issues and solutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-2 bg-muted rounded">
                        <span className="text-sm font-medium">Device won't connect</span>
                        <span className="group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="mt-2 p-2 text-sm text-muted-foreground">
                        1. Ensure Bluetooth is enabled on your phone
                        <br />
                        2. Restart the PathFinder app
                        <br />
                        3. Hold the device button for 10 seconds to reset
                      </div>
                    </details>

                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-2 bg-muted rounded">
                        <span className="text-sm font-medium">Weak vibrations</span>
                        <span className="group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="mt-2 p-2 text-sm text-muted-foreground">
                        1. Check vibration intensity in settings
                        <br />
                        2. Ensure the device is properly positioned
                        <br />
                        3. Clean the contact points with a soft cloth
                      </div>
                    </details>

                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-2 bg-muted rounded">
                        <span className="text-sm font-medium">GPS not accurate</span>
                        <span className="group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="mt-2 p-2 text-sm text-muted-foreground">
                        1. Ensure you're in an open area
                        <br />
                        2. Wait 30-60 seconds for satellite lock
                        <br />
                        3. Restart the device if issues persist
                      </div>
                    </details>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Specifications</CardTitle>
                  <CardDescription>Technical details and compatibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span>45 × 38 × 12mm</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Weight:</span>
                      <span>32g</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Battery:</span>
                      <span>300mAh Li-ion</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Charging:</span>
                      <span>USB-C, 5V/1A</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Compatibility:</span>
                      <span>iOS 14+, Android 8+</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Sensors:</span>
                      <span>GPS, Accelerometer, Gyroscope</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Materials:</span>
                      <span>Silicone strap, ABS housing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get help from our team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">Start Live Chat</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Email Support
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Schedule Call
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>Support Hours: Mon-Fri 9AM-6PM EST</p>
                    <p>Average response time: {"<"}2 hours</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Warranty & Returns</CardTitle>
                  <CardDescription>Your device is protected</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Warranty Status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Coverage Period</span>
                    <span className="text-sm">2 years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Expires</span>
                    <span className="text-sm">March 15, 2026</span>
                  </div>

                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View Warranty Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
