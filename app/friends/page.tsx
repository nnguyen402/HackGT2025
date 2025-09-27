"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import {
  Users,
  UserPlus,
  Search,
  MapPin,
  Trophy,
  Bell,
  Settings,
  MessageCircle,
  Share,
  Clock,
  UserCheck,
  UserX,
  Shield,
} from "lucide-react"

const friends = [
  {
    id: 1,
    name: "Sarah Mitchell",
    username: "@sarah_walks",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1847,
    rank: 1,
    distance: "234.5 km",
    isOnline: true,
    isNearby: false,
    proximityEnabled: true,
    lastActivity: "2 hours ago",
    streak: 12,
    badges: ["Eco Warrior", "Distance Champion"],
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    username: "@mike_explorer",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1156,
    rank: 3,
    distance: "189.2 km",
    isOnline: false,
    isNearby: true,
    proximityEnabled: true,
    lastActivity: "1 day ago",
    streak: 8,
    badges: ["Social Explorer"],
  },
  {
    id: 3,
    name: "Emma Liu",
    username: "@emma_green",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 987,
    rank: 4,
    distance: "156.8 km",
    isOnline: true,
    isNearby: false,
    proximityEnabled: false,
    lastActivity: "30 minutes ago",
    streak: 15,
    badges: ["Eco Warrior", "Consistency King"],
  },
  {
    id: 4,
    name: "David Kim",
    username: "@david_steps",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 834,
    rank: 5,
    distance: "142.3 km",
    isOnline: false,
    isNearby: false,
    proximityEnabled: true,
    lastActivity: "3 hours ago",
    streak: 5,
    badges: ["First Steps"],
  },
  {
    id: 5,
    name: "Lisa Chen",
    username: "@lisa_adventure",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1523,
    rank: 2,
    distance: "298.7 km",
    isOnline: true,
    isNearby: true,
    proximityEnabled: true,
    lastActivity: "1 hour ago",
    streak: 21,
    badges: ["Marathon Walker", "Explorer"],
  },
]

const friendRequests = [
  {
    id: 1,
    name: "Alex Thompson",
    username: "@alex_trails",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualFriends: 3,
    points: 756,
  },
  {
    id: 2,
    name: "Jordan Park",
    username: "@jordan_walks",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualFriends: 1,
    points: 1234,
  },
]

const recentActivity = [
  {
    id: 1,
    friend: "Sarah Mitchell",
    action: "completed a 15km walk",
    time: "2 hours ago",
    points: 89,
    type: "achievement",
  },
  {
    id: 2,
    friend: "Lisa Chen",
    action: "visited Central Park waypoint",
    time: "1 hour ago",
    points: 50,
    type: "waypoint",
  },
  {
    id: 3,
    friend: "Emma Liu",
    action: "earned the 'Consistency King' badge",
    time: "3 hours ago",
    points: 0,
    type: "badge",
  },
  {
    id: 4,
    friend: "Mike Rodriguez",
    action: "is nearby and available to meet",
    time: "30 minutes ago",
    points: 0,
    type: "proximity",
  },
]

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [proximityEnabled, setProximityEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const nearbyFriends = friends.filter((friend) => friend.isNearby && friend.proximityEnabled)
  const onlineFriends = friends.filter((friend) => friend.isOnline)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-balance">Friends & Community</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Connect with fellow PathFinder users and share your journey
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Friends</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{friends.length}</div>
              <p className="text-xs text-muted-foreground">{onlineFriends.length} online now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nearby Friends</CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nearbyFriends.length}</div>
              <p className="text-xs text-muted-foreground">Within 1km radius</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
              <Trophy className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#2</div>
              <p className="text-xs text-muted-foreground">Among friends</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Friend Requests</CardTitle>
              <UserPlus className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{friendRequests.length}</div>
              <p className="text-xs text-muted-foreground">Pending requests</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="friends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="friends">My Friends</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Friends List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Friends List</h3>
                {filteredFriends.map((friend) => (
                  <Card key={friend.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                              <AvatarFallback>
                                {friend.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {friend.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                            {friend.isNearby && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{friend.name}</h4>
                            <p className="text-sm text-muted-foreground">{friend.username}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                #{friend.rank}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {friend.points.toLocaleString()} pts
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-sm font-medium">{friend.distance}</div>
                          <div className="text-xs text-muted-foreground">Distance</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{friend.streak} days</div>
                          <div className="text-xs text-muted-foreground">Streak</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{friend.badges.length}</div>
                          <div className="text-xs text-muted-foreground">Badges</div>
                        </div>
                      </div>

                      {friend.badges.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {friend.badges.map((badge) => (
                            <Badge key={badge} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-accent" />
                      Friend Leaderboard
                    </CardTitle>
                    <CardDescription>This week's top performers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {friends
                        .sort((a, b) => b.points - a.points)
                        .slice(0, 5)
                        .map((friend, index) => (
                          <div key={friend.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  index === 0
                                    ? "bg-yellow-500 text-white"
                                    : index === 1
                                      ? "bg-gray-400 text-white"
                                      : index === 2
                                        ? "bg-orange-500 text-white"
                                        : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {index + 1}
                              </div>
                              <span className="text-sm font-medium">{friend.name}</span>
                            </div>
                            <Badge variant="outline">{friend.points.toLocaleString()} pts</Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>What your friends have been up to</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              activity.type === "achievement"
                                ? "bg-green-500"
                                : activity.type === "waypoint"
                                  ? "bg-blue-500"
                                  : activity.type === "badge"
                                    ? "bg-purple-500"
                                    : "bg-orange-500"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.friend}</span> {activity.action}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                              {activity.points > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  +{activity.points} pts
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nearby" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Friends Nearby
                </CardTitle>
                <CardDescription>Friends within 1km who have proximity sharing enabled</CardDescription>
              </CardHeader>
              <CardContent>
                {nearbyFriends.length > 0 ? (
                  <div className="space-y-4">
                    {nearbyFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                            <AvatarFallback>
                              {friend.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{friend.name}</h4>
                            <p className="text-sm text-muted-foreground">Last seen: {friend.lastActivity}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">
                            <MapPin className="h-3 w-3 mr-1" />
                            Nearby
                          </Badge>
                          <Button size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Say Hi
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No friends nearby</h3>
                    <p className="text-muted-foreground">
                      When friends with proximity sharing are close by, they'll appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Proximity Features</CardTitle>
                <CardDescription>How nearby friend detection works</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location Sharing</h4>
                    <p className="text-sm text-muted-foreground">
                      Your location is only shared with friends who have proximity enabled
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Smart Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified when friends are nearby and available to meet
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Privacy First</h4>
                    <p className="text-sm text-muted-foreground">You control who can see your location and when</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Friend Requests
                  </CardTitle>
                  <CardDescription>People who want to connect with you</CardDescription>
                </CardHeader>
                <CardContent>
                  {friendRequests.length > 0 ? (
                    <div className="space-y-4">
                      {friendRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                              <AvatarFallback>
                                {request.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{request.name}</h4>
                              <p className="text-sm text-muted-foreground">{request.username}</p>
                              <p className="text-xs text-muted-foreground">
                                {request.mutualFriends} mutual friends • {request.points.toLocaleString()} points
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <UserX className="h-4 w-4" />
                            </Button>
                            <Button size="sm">
                              <UserCheck className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No pending requests</h3>
                      <p className="text-muted-foreground">
                        Friend requests will appear here when people want to connect
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Find Friends
                  </CardTitle>
                  <CardDescription>Connect with other PathFinder users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by username or email..." className="pl-10" />
                  </div>

                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search Users
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-medium">Other ways to connect:</h4>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Share className="h-4 w-4 mr-2" />
                      Share your profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      Import from contacts
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Invite via message
                    </Button>
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
                    <Settings className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Control who can see your information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Proximity Sharing</h4>
                      <p className="text-sm text-muted-foreground">Let friends know when you're nearby</p>
                    </div>
                    <Switch checked={proximityEnabled} onCheckedChange={setProximityEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Activity Visibility</h4>
                      <p className="text-sm text-muted-foreground">Show your walking activity to friends</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Points Visibility</h4>
                      <p className="text-sm text-muted-foreground">Display your points and rank to friends</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Profile Discovery</h4>
                      <p className="text-sm text-muted-foreground">Allow others to find you by username</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>Choose what notifications you receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Friend Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get notified about friend activity</p>
                    </div>
                    <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Proximity Alerts</h4>
                      <p className="text-sm text-muted-foreground">Alert when friends are nearby</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Achievement Sharing</h4>
                      <p className="text-sm text-muted-foreground">Notify friends of your achievements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Friend Requests</h4>
                      <p className="text-sm text-muted-foreground">Get notified of new friend requests</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>Manage your social connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="bg-transparent">
                      <Share className="h-4 w-4 mr-2" />
                      Export Friend List
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Blocked Users
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Preferences
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      <Settings className="h-4 w-4 mr-2" />
                      Advanced Settings
                    </Button>
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
