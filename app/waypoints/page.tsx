"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import {
  MapPin,
  Plus,
  Search,
  Filter,
  NavigationIcon,
  Clock,
  Trophy,
  Star,
  Coffee,
  ShoppingBag,
  TreePine,
  Building,
  Heart,
  Target,
  CheckCircle,
  Circle,
  Route,
} from "lucide-react"

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
    difficulty: "Easy",
    icon: TreePine,
    color: "text-green-600",
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
    difficulty: "Easy",
    icon: Coffee,
    color: "text-amber-600",
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
    difficulty: "Moderate",
    icon: Building,
    color: "text-purple-600",
  },
  {
    id: 4,
    name: "Riverside Trail",
    category: "nature",
    distance: "1.8 km",
    points: 60,
    visited: false,
    description: "Scenic walking trail along the river",
    estimatedTime: "28 min walk",
    difficulty: "Easy",
    icon: TreePine,
    color: "text-green-600",
  },
  {
    id: 5,
    name: "Historic Library",
    category: "culture",
    distance: "0.9 km",
    points: 40,
    visited: true,
    description: "Beautiful architecture and quiet reading spaces",
    estimatedTime: "14 min walk",
    difficulty: "Easy",
    icon: Building,
    color: "text-blue-600",
  },
  {
    id: 6,
    name: "Local Market",
    category: "shopping",
    distance: "1.5 km",
    points: 45,
    visited: false,
    description: "Fresh produce and local crafts",
    estimatedTime: "22 min walk",
    difficulty: "Easy",
    icon: ShoppingBag,
    color: "text-orange-600",
  },
]

const categories = [
  { id: "all", name: "All", icon: MapPin },
  { id: "park", name: "Parks", icon: TreePine },
  { id: "cafe", name: "Cafes", icon: Coffee },
  { id: "culture", name: "Culture", icon: Building },
  { id: "nature", name: "Nature", icon: TreePine },
  { id: "shopping", name: "Shopping", icon: ShoppingBag },
]

export default function WaypointsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredWaypoints = waypoints.filter((waypoint) => {
    const matchesCategory = selectedCategory === "all" || waypoint.category === selectedCategory
    const matchesSearch = waypoint.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const todayWaypoints = waypoints.filter((w) => !w.visited).slice(0, 3)
  const visitedCount = waypoints.filter((w) => w.visited).length
  const totalPoints = waypoints.filter((w) => w.visited).reduce((sum, w) => sum + w.points, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-balance">Waypoints & Exploration</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Discover your city and earn points by visiting interesting locations
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Goal</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 / 3</div>
              <p className="text-xs text-muted-foreground">Waypoints to visit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visited</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{visitedCount}</div>
              <p className="text-xs text-muted-foreground">Total locations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
              <Trophy className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPoints}</div>
              <p className="text-xs text-muted-foreground">From waypoints</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Days active</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today's Route</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  Recommended Daily Route
                </CardTitle>
                <CardDescription>Optimized path to visit today's waypoints efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">Start</span>
                      </div>
                      <div>
                        <p className="font-medium">Your Current Location</p>
                        <p className="text-sm text-muted-foreground">Ready to begin your journey</p>
                      </div>
                    </div>
                    <Button size="sm">
                      <NavigationIcon className="h-4 w-4 mr-2" />
                      Start Route
                    </Button>
                  </div>

                  {todayWaypoints.map((waypoint, index) => {
                    const Icon = waypoint.icon
                    return (
                      <div key={waypoint.id} className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">{index + 1}</span>
                          </div>
                          {index < todayWaypoints.length - 1 && <div className="w-px h-12 bg-border mt-2"></div>}
                        </div>

                        <Card className="flex-1">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Icon className={`h-5 w-5 ${waypoint.color}`} />
                                <div>
                                  <h4 className="font-medium">{waypoint.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {waypoint.distance} • {waypoint.estimatedTime}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge>{waypoint.points} pts</Badge>
                                <Button variant="outline" size="sm">
                                  Navigate
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}

                  <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-green-800">Route Complete!</p>
                      <p className="text-sm text-green-600">
                        Total: {todayWaypoints.reduce((sum, w) => sum + w.points, 0)} points • ~{" "}
                        {Math.round(todayWaypoints.reduce((sum, w) => sum + Number.parseFloat(w.distance), 0) * 10) /
                          10}{" "}
                        km
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="explore" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search waypoints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Waypoints Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWaypoints.map((waypoint) => {
                const Icon = waypoint.icon
                return (
                  <Card key={waypoint.id} className={`relative ${waypoint.visited ? "bg-muted/50" : ""}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${waypoint.color}`} />
                          <CardTitle className="text-lg">{waypoint.name}</CardTitle>
                        </div>
                        {waypoint.visited ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <CardDescription>{waypoint.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {waypoint.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {waypoint.estimatedTime}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{waypoint.difficulty}</Badge>
                          <Badge className={waypoint.visited ? "bg-green-100 text-green-800" : ""}>
                            {waypoint.visited ? "Earned" : `${waypoint.points} pts`}
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            variant={waypoint.visited ? "outline" : "default"}
                            disabled={waypoint.visited}
                          >
                            {waypoint.visited ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Visited
                              </>
                            ) : (
                              <>
                                <NavigationIcon className="h-4 w-4 mr-2" />
                                Navigate
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredWaypoints.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No waypoints found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Interactive Map
                    </CardTitle>
                    <CardDescription>View all waypoints and plan your routes</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Waypoint
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Placeholder for map - in a real app, this would be a map component */}
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100"></div>
                  <div className="relative z-10 text-center space-y-4">
                    <MapPin className="h-16 w-16 text-primary mx-auto" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Interactive Map View</h3>
                      <p className="text-muted-foreground mb-4">In a real implementation, this would show:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Your current location</li>
                        <li>• All available waypoints</li>
                        <li>• Optimal routes between points</li>
                        <li>• Real-time navigation</li>
                      </ul>
                    </div>
                  </div>

                  {/* Mock waypoint markers */}
                  <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute top-32 right-24 w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute bottom-24 left-32 w-4 h-4 bg-amber-600 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute bottom-20 right-20 w-4 h-4 bg-purple-600 rounded-full border-2 border-white shadow-lg"></div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Visited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span>Your Location</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      Center Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Waypoints */}
            <Card>
              <CardHeader>
                <CardTitle>Nearby Waypoints</CardTitle>
                <CardDescription>Closest locations to your current position</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {waypoints
                    .filter((w) => !w.visited)
                    .sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
                    .slice(0, 3)
                    .map((waypoint) => {
                      const Icon = waypoint.icon
                      return (
                        <div key={waypoint.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon className={`h-5 w-5 ${waypoint.color}`} />
                            <div>
                              <p className="font-medium">{waypoint.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {waypoint.distance} • {waypoint.estimatedTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge>{waypoint.points} pts</Badge>
                            <Button size="sm">Navigate</Button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
