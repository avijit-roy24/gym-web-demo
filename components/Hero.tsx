"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { FlipText } from "@/components/ui/flip-text";
import { SamsungHelloEnglishEffect } from "@/components/ui/text-effect";

export default function Hero() {
  return (
    <div className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-zinc-950">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=3540&auto=format&fit=crop"
          alt="Gym Hero Background"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        {/* Accent gradient blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none max-md:w-[300px] max-md:h-[300px]" />
        <div className="absolute bottom-0 left-[-20%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none max-md:w-[250px] max-md:h-[250px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-8 max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-full px-4 py-2 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-zinc-300 text-sm font-medium tracking-wide max-md:text-xs">
                Join the ultimate fitness hub in Ranchi
              </span>
            </div>

            {/* Hero heading — Priority 1 */}
            <h1 className="flex flex-col text-5xl md:text-7xl font-extrabold text-white leading-[1.1] max-md:leading-[1.2]">
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2 max-md:gap-x-2">
                <FlipText
                  word="ACHIEVE"
                  duration={0.4}
                  delayMultiple={0.06}
                  className="font-extrabold text-white"
                  style={{ fontSize: "clamp(1.8rem, 7vw, 4rem)", letterSpacing: "-0.01em" }}
                />
                <FlipText
                  word="YOUR"
                  duration={0.4}
                  delayMultiple={0.06}
                  className="font-extrabold text-white"
                  style={{ fontSize: "clamp(1.8rem, 7vw, 4rem)", letterSpacing: "-0.01em" }}
                />
              </div>
              <div className="mt-2 max-md:mt-0">
                <SamsungHelloEnglishEffect speed={0.2} className="max-md:h-[4rem] max-md:w-full" />
              </div>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-xl max-md:text-[clamp(0.9rem,3.5vw,1.15rem)] max-md:leading-snug">
              Equipped with world-class equipment, expert coaching, and high-energy group classes. Get ready to transform your goals into reality.
            </p>

            {/* Buttons — Priority 1: stacked full-width on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 max-md:w-full max-md:pt-2">
              <Button
                size="lg"
                onClick={() => window.location.hash = "free-trial"}
                className="px-8 text-base font-bold tracking-wide uppercase transition-transform hover:scale-105 max-md:w-full max-md:h-[3.2rem] bg-primary text-primary-foreground"
                style={{ minHeight: "3.2rem" }}
              >
                Free Trial <Play className="ml-2 h-5 w-5 max-md:h-4 max-md:w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-base font-bold tracking-wide uppercase border-zinc-700 bg-transparent hover:bg-zinc-800 group max-md:w-full max-md:h-[3rem]"
                style={{ minHeight: "3rem" }}
              >
                <ArrowRight className="mr-2 h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" /> Join Now
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-8 border-t border-zinc-800 max-md:gap-4 max-md:pt-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white max-md:text-2xl">4.4<span className="text-primary text-xl max-md:text-lg">★</span></span>
                <span className="text-zinc-500 text-sm uppercase tracking-wide max-md:text-xs">400+ Reviews</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
