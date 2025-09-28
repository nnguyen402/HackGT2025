"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, User, Info, Map, Menu, X } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Device Info", href: "/device", icon: Info },
  { name: "Waypoints", href: "/waypoints", icon: Map },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between p-6 bg-card border-b border-border">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            PathFinder
          </Link>
          <div className="flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.name} href={item.href}>
                  <Button variant={pathname === item.href ? "default" : "ghost"} className="gap-2">
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
        <Button variant="outline" size="sm">
          Settings
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-card border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold text-primary">
            PathFinder
          </Link>
          <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant={pathname === item.href ? "default" : "ghost"} className="w-full justify-start gap-2">
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Settings
            </Button>
          </div>
        )}
      </nav>
    </>
  )
}
