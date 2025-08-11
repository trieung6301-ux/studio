"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../shared/Icons";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Dumbbell, User } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/advisor", label: "AI Advisor" },
  { href: "/planner", label: "Workout Planner" },
  { href: "/booking", label: "Book a PT" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = React.useState(null); // Replace with actual user state

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline text-lg">
            MuscleUp
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
           {user ? (
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                  <Link href="/" className="mb-6 flex items-center space-x-2">
                    <Icons.logo className="h-8 w-8 text-primary" />
                    <span className="font-bold font-headline text-lg">MuscleUp</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "text-lg transition-colors hover:text-primary",
                           pathname === link.href ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
