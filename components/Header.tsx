"use client"
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Programs", href: "#programs" },
    { name: "Trainers", href: "#trainers" },
    { name: "Timetable", href: "#timetable" },
    { name: "Pricing", href: "#pricing" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <Link href="/" className="font-bold text-2xl tracking-tighter uppercase text-primary">
              Health<span className="text-foreground">Freaks</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm tracking-wide uppercase"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Book Free Trial
            </Button>
            <Button>
              Join Now
            </Button>
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border absolute w-full left-0 top-20 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full border-primary text-primary">Book Free Trial</Button>
              <Button className="w-full">Join Now</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
