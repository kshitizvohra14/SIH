"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Home", href: "/home" },
  { name: "Profile", href: "/profile" },
  { name: "About", href: "/about" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-1">
      {navigationItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "default" : "ghost"}
            size="sm"
            className={cn("transition-colors", pathname === item.href && "bg-primary text-primary-foreground")}
          >
            {item.name}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
