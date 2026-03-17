"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const plans = [
    {
      name: "QUARTERLY",
      price: "₹2,000",
      description: "Our most popular balanced plan for consistent growth.",
      features: [
        "Access to all gym equipment",
        "Locker room & shower access",
        "Unlimited Group Classes (Yoga, Zumba)",
        "Complimentary fitness assessment",
      ],
      recommended: true,
      badge: "RECOMMENDED",
    },
    {
      name: "MONTHLY",
      price: "₹5,500",
      description: "Perfect for flexibility and testing the waters.",
      features: [
        "Access to all gym equipment",
        "Locker room & shower access",
        "General trainer guidance",
        "1 Group class per week"
      ],
      recommended: false,
      badge: null,
    },
    {
      name: "YEARLY",
      price: "₹18,000",
      description: "The ultimate commitment to your physique.",
      features: [
        "Access to all gym equipment",
        "Unlimited Group Classes",
        "1 Month Personal Training Free",
        "Dietary & Nutrition Plan",
        "Freeze membership for 30 days"
      ],
      recommended: false,
      badge: "SAVE ₹6,000",
    },
  ];

  // Mobile scroll tracking
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !isMobile) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85; // card is 85vw
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, plans.length - 1));
  }, [isMobile, plans.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isMobile) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isMobile, handleScroll]);

  return (
    <section id="pricing" className="section-animate py-24 bg-zinc-950 max-md:py-12 max-md:px-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-md:px-0">
        <div className="text-center mb-16 max-md:mb-10 max-md:px-5">
          <h2 className="text-primary tracking-widest text-sm font-bold uppercase mb-2">Memberships</h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tighter text-white sm:text-5xl" style={{ fontSize: "clamp(1.3rem, 5.5vw, 3rem)" }}>
            PRICING PLANS
          </p>
          <p className="mt-4 max-w-2xl text-xl text-zinc-400 mx-auto max-md:text-[clamp(0.85rem, 3.5vw, 1.1rem)]">
            Choose a plan that fits your goals. No hidden fees. Just results.
          </p>
        </div>

        {/* Mobile Horizontal Scroll CAROUSEL - Priority 4 */}
        <div
          ref={scrollRef}
          className="mobile-snap-x gap-5 pb-8 px-4 md:grid md:grid-cols-3 md:gap-8 md:max-w-5xl md:mx-auto md:px-0 md:pb-0 pt-6"
        >
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`
                relative bg-zinc-900 border ${plan.recommended ? "border-primary shadow-[0_0_20px_rgba(37,211,102,0.15)]" : "border-zinc-800"} 
                rounded-2xl p-8 flex flex-col items-center text-center group
                w-[85vw] max-w-[400px] mobile-snap-center
                md:w-auto md:p-8
              `}
              style={{ overflow: "visible" }} /* Ensure badge isn't clipped */
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-4 right-4 z-[30] text-[10px] font-extrabold uppercase tracking-widest py-1.5 px-3 rounded-md border shadow-2xl ${
                  plan.recommended 
                    ? "bg-primary text-black border-primary" 
                    : "bg-zinc-950 text-white border-primary/40 shadow-primary/20"
                }`}>
                  {plan.badge}
                </div>
              )}
              
              <h3 className="text-xl font-extrabold tracking-widest text-zinc-200 mb-2 uppercase pt-2">{plan.name}</h3>
              <p className="text-5xl font-black text-white mb-4">{plan.price}</p>
              <p className="text-sm text-zinc-500 mb-8 max-w-[220px] leading-relaxed max-md:mb-6">{plan.description}</p>
              
              <ul className="text-left w-full space-y-4 mb-8 max-md:space-y-3 max-md:mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm text-zinc-300">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                    <span className="leading-tight break-words">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.recommended ? "default" : "outline"}
                onClick={() => window.dispatchEvent(new Event("openBookingModal"))}
                className={`w-full mt-auto font-black uppercase tracking-widest h-[3.2rem] ${plan.recommended ? "shadow-[0_4px_15px_rgba(37,211,102,0.3)]" : "border-zinc-700 hover:bg-zinc-800"}`}
                style={{ minHeight: "3.2rem" }}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>

        {/* Mobile carousel indicators */}
        <div className="dot-indicators md:hidden">
          {plans.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => {
                setActiveIndex(i);
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.offsetWidth * 0.85 + 20; // 85vw + gap
                  scrollRef.current.scrollTo({ left: cardWidth * i, behavior: "smooth" });
                }
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Footer info text */}
        <p className="text-center text-zinc-500 text-[11px] uppercase tracking-widest mt-10 px-6 font-bold opacity-60 leading-relaxed md:mt-12 max-md:pb-6">
          No joining fee. No cancellation fee.<br className="md:hidden"/> FREE 3-day trial on all plans.
        </p>
      </div>
    </section>
  );
}
