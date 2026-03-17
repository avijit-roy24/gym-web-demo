"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroHeading = document.querySelector('.hero-heading') as HTMLElement;
    const heroWords = document.querySelectorAll('.hero-word') as NodeListOf<HTMLElement>;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroWords.forEach(word => {
            word.style.animation = 'none';
            void word.offsetHeight; // force reflow
            word.style.animation = '';
          });
          if (heroHeading) {
            heroHeading.style.animation = 'none';
            void heroHeading.offsetHeight;
            heroHeading.style.animation = '';
          }
        }
      });
    }, { threshold: 0.3 });

    if (heroHeading) observer.observe(heroHeading);

    const handleVisibility = () => {
      if (document.visibilityState === "visible" && heroHeading) {
        heroWords.forEach(word => {
          word.style.animation = 'none';
          void word.offsetHeight;
          word.style.animation = '';
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-zinc-950">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20 max-md:mt-12 section-animate visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8 max-w-2xl max-md:space-y-6">
            <div className="inline-flex items-center space-x-2 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-full px-4 py-2 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-zinc-300 text-sm font-medium tracking-wide max-md:text-xs">
                Join the ultimate fitness hub in Ranchi
              </span>
            </div>

            {/* PURE CSS HERO HEADING */}
            <div className="min-h-[140px] md:min-h-[200px] flex items-center w-full">
              <h1 className="hero-heading">
                <span className="hero-word" style={{ animationDelay: "0s" }}>ACHIEVE</span>
                <span className="hero-word" style={{ animationDelay: "0.15s" }}>YOUR</span>
                <span className="hero-word text-primary" style={{ animationDelay: "0.3s" }}>DREAM</span>
                <span className="hero-word text-primary" style={{ animationDelay: "0.45s" }}>BODY</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-xl max-md:text-[clamp(0.9rem,3.5vw,1.15rem)] max-md:leading-snug">
              Equipped with world-class equipment, expert coaching, and high-energy group classes. Get ready to transform your goals into reality.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 max-md:w-full max-md:pt-2 max-md:gap-[0.75rem]">
              <Button
                size="lg"
                onClick={() => window.location.hash = "free-trial"}
                className="px-8 text-base font-bold tracking-wide uppercase transition-transform hover:scale-105 max-md:w-full max-md:h-[3.2rem] bg-primary text-primary-foreground"
                style={{ minHeight: "3.2rem" }}
              >
                Free Trial <Play className="ml-2 h-5 w-5 max-md:h-4 max-md:w-4 fill-current" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.dispatchEvent(new Event("openBookingModal"))}
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
          </div>
        </div>
      </div>
    </div>
  );
}
