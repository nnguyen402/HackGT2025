"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import {
  Gift,
  Trophy,
  Star,
  Coffee,
  ShoppingBag,
  Ticket,
  Zap,
  Crown,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Lock,
  Sparkles,
} from "lucide-react"

const rewards = [
  {
    id: 1,
    name: "Starbucks Gift Card",
    category: "food",
    points: 500,
    value: "$5",
    description: "Enjoy your favorite coffee on us",
    image: "/starbucks-gift-card.jpg",
    available: true,
    popular: true,
    icon: Coffee,
    color: "text-green-600",
  },
  {
    id: 2,
    name: "Amazon Gift Card",
    category: "shopping",
    points: 1000,
    value: "$10",
    description: "Shop for anything you need",
    image: "/amazon-gift-card.png",
    available: true,
    popular: true,
    icon: ShoppingBag,
    color: "text-orange-600",
  },
  {
    id: 3,
    name: "Movie Theater Ticket",
    category: "entertainment",
    points: 750,
    value: "$12",
    description: "Enjoy the latest blockbuster",
    image: "/movie-ticket.png",
    available: true,
    popular: false,
    icon: Ticket,
    color: "text-purple-600",
  },
  {
    id: 4,
    name: "Premium Features",
    category: "app",
    points: 2000,
    value: "1 Month",
    description: "Unlock advanced PathFinder features",
    image: "/premium-app-features.jpg",
    available: true,
    popular: false,
    icon: Crown,
    color: "text-yellow-600",
  },
  {
    id: 5,
    name: "Local Restaurant Voucher",
    category: "food",
    points: 1500,
    value: "$15",
    description: "Support local businesses",
    image: "/restaurant-voucher.png",
    available: false,
    popular: false,
    icon: Coffee,
    color: "text-red-600",
  },
  {
    id: 6,
    name: "Fitness Tracker Discount",
    category: "health",
    points: 3000,
    value: "20% Off",
    description: "Upgrade your fitness journey",
    image: "/fitness-tracker-lifestyle.png",
    available: true,
    popular: false,
    icon: Zap,
    color: "text-blue-600",
  },
]

const recentRedemptions = [
  {
    id: 1,
    reward: "Starbucks Gift Card",
    points: 500,
    date: "2 days ago",
    status: "delivered",
  },
  {
    id: 2,
    reward: "Movie Theater Ticket",
    points: 750,
    date: "1 week ago",
    status: "delivered",
  },
  {
    id: 3,
    reward: "Amazon Gift Card",
    points: 1000,
    date: "2 weeks ago",
    status: "delivered",
  },
]

const categories = [
  { id: "all", name: "All", icon: Gift },
  { id: "food", name: "Food & Drink", icon: Coffee },
  { id: "shopping", name: "Shopping", icon: ShoppingBag },
  { id: "entertainment", name: "Entertainment", icon: Ticket },
  { id: "app", name: "App Features", icon: Crown },
  { id: "health", name: "Health & Fitness", icon: Zap },
]

export default function RewardsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const currentPoints = 1247
  const totalEarned = 8947
  const totalRedeemed = 3250

  const filteredRewards = rewards.filter((reward) => {
    return selectedCategory === "all" || reward.category === selectedCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-balance">Rewards & Points</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Redeem your points for amazing rewards and exclusive offers
          </p>
        </div>

        {/* Points Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-full">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{currentPoints.toLocaleString()} Points</CardTitle>
                  <CardDescription>Available to spend</CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-muted-foreground">{totalEarned.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total earned</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">+89</div>
                <p className="text-sm text-muted-foreground">Points this week</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">{totalRedeemed.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total redeemed</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">Gold</div>
                <p className="text-sm text-muted-foreground">Member tier</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="rewards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="history">Redemption History</TabsTrigger>
            <TabsTrigger value="earn">Earn More Points</TabsTrigger>
          </TabsList>

          <TabsContent value="rewards" className="space-y-6">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
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

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.map((reward) => {
                const Icon = reward.icon
                const canAfford = currentPoints >= reward.points

                return (
                  <Card key={reward.id} className={`relative ${!reward.available ? "opacity-60" : ""}`}>
                    {reward.popular && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <Icon className={`h-6 w-6 ${reward.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{reward.name}</CardTitle>
                            <CardDescription>{reward.description}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-primary">{reward.points.toLocaleString()}</div>
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            {reward.value}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Your Points</span>
                            <span className={canAfford ? "text-green-600" : "text-red-600"}>
                              {currentPoints.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={Math.min((currentPoints / reward.points) * 100, 100)} className="h-2" />
                          {!canAfford && (
                            <p className="text-xs text-muted-foreground">
                              Need {(reward.points - currentPoints).toLocaleString()} more points
                            </p>
                          )}
                        </div>

                        <Button className="w-full" disabled={!canAfford || !reward.available}>
                          {!reward.available ? (
                            <>
                              <Lock className="h-4 w-4 mr-2" />
                              Out of Stock
                            </>
                          ) : !canAfford ? (
                            <>
                              <Lock className="h-4 w-4 mr-2" />
                              Not Enough Points
                            </>
                          ) : (
                            <>
                              <Gift className="h-4 w-4 mr-2" />
                              Redeem Now
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Redemptions</CardTitle>
                    <CardDescription>Your reward redemption history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentRedemptions.map((redemption) => (
                        <div key={redemption.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-full">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">{redemption.reward}</p>
                              <p className="text-sm text-muted-foreground">{redemption.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">-{redemption.points.toLocaleString()}</p>
                            <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Points Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Earned</span>
                      <span className="font-medium text-green-600">+{totalEarned.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Redeemed</span>
                      <span className="font-medium text-red-600">-{totalRedeemed.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Current Balance</span>
                        <span className="font-bold text-primary">{currentPoints.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-600" />
                      Member Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Exclusive rewards access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">10% bonus points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Priority support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Early reward previews</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="earn" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Daily Challenges
                  </CardTitle>
                  <CardDescription>Complete these tasks to earn bonus points</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Walk 5km today</p>
                          <p className="text-sm text-muted-foreground">Progress: 3.2/5.0 km</p>
                        </div>
                      </div>
                      <Badge>+50 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Visit 2 waypoints</p>
                          <p className="text-sm text-muted-foreground">Progress: 1/2 waypoints</p>
                        </div>
                      </div>
                      <Badge>+75 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Share your progress</p>
                          <p className="text-sm text-muted-foreground">Post to social media</p>
                        </div>
                      </div>
                      <Badge>+25 pts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Ways to Earn Points
                  </CardTitle>
                  <CardDescription>All the ways you can boost your point balance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Target className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm">Visit waypoints</span>
                      </div>
                      <span className="text-sm font-medium">25-100 pts</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm">Daily walking goals</span>
                      </div>
                      <span className="text-sm font-medium">10-50 pts</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Trophy className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm">Weekly challenges</span>
                      </div>
                      <span className="text-sm font-medium">100-200 pts</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Star className="h-4 w-4 text-yellow-600" />
                        </div>
                        <span className="text-sm">Streak bonuses</span>
                      </div>
                      <span className="text-sm font-medium">20-100 pts</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Sparkles className="h-4 w-4 text-orange-600" />
                        </div>
                        <span className="text-sm">Social sharing</span>
                      </div>
                      <span className="text-sm font-medium">15-25 pts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Point Multiplier Events</CardTitle>
                  <CardDescription>Special events with bonus point opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-yellow-600" />
                        <h4 className="font-medium">Weekend Warrior</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Double points for all activities this weekend
                      </p>
                      <Badge className="bg-yellow-100 text-yellow-800">2x Points</Badge>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium">Earth Day Challenge</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Special environmental waypoints with bonus rewards
                      </p>
                      <Badge className="bg-green-100 text-green-800">Coming Soon</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
