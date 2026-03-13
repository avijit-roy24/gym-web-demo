"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navigation = [
    { name: "Programs", href: "#programs" },
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
            <Button variant="outline" onClick={() => window.location.hash = "free-trial"} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Book Free Trial
            </Button>
            <Button>
              Join Now
            </Button>
          </div>
          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-foreground hover:text-primary focus:outline-none p-2"
              aria-label="Open menu"
            >
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Panel - Priority 3 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-[340px] bg-zinc-950 z-[9999] shadow-2xl flex flex-col md:hidden border-l border-zinc-900 overflow-hidden"
              style={{ paddingBottom: "env(safe-area-inset-bottom)", backgroundColor: "#09090b" }}
            >
              {/* Header inside Panel */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-900" style={{ paddingTop: "calc(1.5rem + env(safe-area-inset-top))" }}>
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl tracking-tighter uppercase text-primary">Menu</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary focus:outline-none bg-zinc-900/50 hover:bg-zinc-900 rounded-full flex items-center justify-center transition-all"
                  aria-label="Close menu"
                  style={{ width: "3.2rem", height: "3.2rem" }}
                  type="button"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col py-4 flex-grow overflow-y-auto overflow-x-hidden">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-8 text-base font-bold text-white hover:text-primary hover:bg-zinc-900/50 transition-all uppercase tracking-[0.1em] border-b border-zinc-900/30"
                    style={{ minHeight: "3.5rem" }}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* CTA buttons bottom */}
              <div className="mt-auto px-6 py-8 flex flex-col gap-3 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-extrabold tracking-widest text-xs uppercase"
                  style={{ minHeight: "3.2rem" }}
                  onClick={() => { setIsOpen(false); window.location.hash = "free-trial"; }}
                >
                  Book Free Trial
                </Button>
                <Button
                  className="w-full font-extrabold tracking-widest text-xs uppercase shadow-lg shadow-primary/20"
                  style={{ minHeight: "3.2rem" }}
                  onClick={() => setIsOpen(false)}
                >
                  Join Now
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
