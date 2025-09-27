import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Leaf, Trophy, Calendar, TrendingUp, Award, Target, Clock, BarChart3, Users } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/diverse-profile-avatars.png" alt="Alex" />
            <AvatarFallback className="text-2xl">AJ</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold">Alex Johnson</h1>
            <p className="text-muted-foreground">PathFinder user since March 2024</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Eco Warrior</Badge>
              <Badge variant="secondary">Distance Champion</Badge>
              <Badge variant="secondary">Social Explorer</Badge>
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total CO₂ Saved</CardTitle>
              <Leaf className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">156.3 kg</div>
              <p className="text-xs text-muted-foreground">Equivalent to 34 trees planted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
              <MapPin className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847.2 km</div>
              <p className="text-xs text-muted-foreground">That's like walking to the next city!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,947</div>
              <p className="text-xs text-muted-foreground">Top 15% of all users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Days</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">7-day streak active</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Weekly Activity
                  </CardTitle>
                  <CardDescription>Your walking activity over the past 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { day: "Monday", distance: 8.2, points: 45 },
                      { day: "Tuesday", distance: 6.1, points: 32 },
                      { day: "Wednesday", distance: 12.4, points: 67 },
                      { day: "Thursday", distance: 4.8, points: 28 },
                      { day: "Friday", distance: 9.7, points: 52 },
                      { day: "Saturday", distance: 15.3, points: 89 },
                      { day: "Sunday", distance: 11.2, points: 61 },
                    ].map((day) => (
                      <div key={day.day} className="flex items-center justify-between">
                        <span className="text-sm font-medium w-20">{day.day}</span>
                        <div className="flex-1 mx-4">
                          <Progress value={(day.distance / 20) * 100} className="h-2" />
                        </div>
                        <span className="text-sm text-muted-foreground w-16">{day.distance} km</span>
                        <Badge variant="outline" className="ml-2">
                          {day.points} pts
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Monthly Goals
                  </CardTitle>
                  <CardDescription>Track your progress this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Distance Goal</span>
                      <span>127.4 / 200 km</span>
                    </div>
                    <Progress value={64} className="h-3" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Waypoints Goal</span>
                      <span>18 / 25</span>
                    </div>
                    <Progress value={72} className="h-3" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CO₂ Prevention</span>
                      <span>24.7 / 30 kg</span>
                    </div>
                    <Progress value={82} className="h-3" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Points Goal</span>
                      <span>1,247 / 1,500</span>
                    </div>
                    <Progress value={83} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-yellow-600" />
                    <CardTitle className="text-lg">First Steps</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Complete your first 1km walk</p>
                  <Badge className="mt-2 bg-yellow-600">Earned</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-green-600" />
                    <CardTitle className="text-lg">Eco Warrior</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Prevent 50kg of CO₂ emissions</p>
                  <Badge className="mt-2 bg-green-600">Earned</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-lg">Social Butterfly</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Add 10 friends to your network</p>
                  <Badge className="mt-2 bg-blue-600">Earned</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-purple-600" />
                    <CardTitle className="text-lg">Explorer</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Visit 100 unique waypoints</p>
                  <div className="mt-2 space-y-1">
                    <Progress value={67} className="h-2" />
                    <p className="text-xs text-muted-foreground">67/100 waypoints</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-orange-600" />
                    <CardTitle className="text-lg">Consistency King</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Maintain a 30-day streak</p>
                  <div className="mt-2 space-y-1">
                    <Progress value={23} className="h-2" />
                    <p className="text-xs text-muted-foreground">7/30 days</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-red-600" />
                    <CardTitle className="text-lg">Marathon Walker</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Walk 1000km total distance</p>
                  <div className="mt-2 space-y-1">
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground">847/1000 km</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    Environmental Impact
                  </CardTitle>
                  <CardDescription>Your contribution to a greener planet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-green-600">156.3 kg</div>
                    <p className="text-sm text-muted-foreground">Total CO₂ prevented</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Equivalent to:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">34</div>
                        <p className="text-xs text-muted-foreground">Trees planted</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">1,247</div>
                        <p className="text-xs text-muted-foreground">Miles not driven</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly CO₂ Prevention</CardTitle>
                  <CardDescription>Track your environmental impact over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "Jan", co2: 18.2 },
                      { month: "Feb", co2: 22.1 },
                      { month: "Mar", co2: 28.4 },
                      { month: "Apr", co2: 31.8 },
                      { month: "May", co2: 29.7 },
                      { month: "Jun", co2: 26.1 },
                    ].map((month) => (
                      <div key={month.month} className="flex items-center justify-between">
                        <span className="text-sm font-medium w-12">{month.month}</span>
                        <div className="flex-1 mx-4">
                          <Progress value={(month.co2 / 35) * 100} className="h-3" />
                        </div>
                        <span className="text-sm text-muted-foreground w-16">{month.co2} kg</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Friend Leaderboard
                  </CardTitle>
                  <CardDescription>See how you rank among your friends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah M.", points: 1847, rank: 1, isYou: false },
                      { name: "You", points: 1247, rank: 2, isYou: true },
                      { name: "Mike R.", points: 1156, rank: 3, isYou: false },
                      { name: "Emma L.", points: 987, rank: 4, isYou: false },
                      { name: "David K.", points: 834, rank: 5, isYou: false },
                    ].map((friend) => (
                      <div
                        key={friend.name}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          friend.isYou ? "bg-primary/10 border border-primary/20" : "bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              friend.rank === 1
                                ? "bg-yellow-500 text-white"
                                : friend.rank === 2
                                  ? "bg-gray-400 text-white"
                                  : friend.rank === 3
                                    ? "bg-orange-500 text-white"
                                    : "bg-muted-foreground text-white"
                            }`}
                          >
                            {friend.rank}
                          </div>
                          <span className={`font-medium ${friend.isYou ? "text-primary" : ""}`}>{friend.name}</span>
                        </div>
                        <Badge variant={friend.isYou ? "default" : "outline"}>{friend.points} pts</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Friend Activity</CardTitle>
                  <CardDescription>Stay updated with your network</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Sarah completed a 15km walk</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                      <Badge variant="outline">+89 pts</Badge>
                    </div>

                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MR</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Mike visited Central Park waypoint</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                      <Badge variant="outline">+50 pts</Badge>
                    </div>

                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>EL</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Emma earned the "Eco Warrior" badge</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                      <Badge variant="outline">Achievement</Badge>
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
