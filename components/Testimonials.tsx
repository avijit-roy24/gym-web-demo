"use client";
import { Star } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Riya Bharti",
      date: "3 months ago",
      text: "The front desk team at Health Freaks Gym is excellent! They are always polite, welcoming, and quick to help. Their positive attitude and professionalism make every visit smooth and comfortable.",
      rating: 5,
    },
    {
      name: "Nikita Kaushik",
      date: "5 years ago",
      text: "This is a fantastic gym!! With latest equipment and a clean, hygienic environment. It allows you to not only use equipment but offers programs like Yoga, spin sessions, circuit training.",
      rating: 5,
    },
    {
      name: "Raj World",
      date: "2 months ago",
      text: "Great gym with friendly staff and a motivating environment. Clean space, good equipment, and proper guidance. Totally worth it!",
      rating: 5,
    },
    {
      name: "Minakshi Mittal",
      date: "A year ago",
      text: "Fantastic gym experience! The environment, equipment, and hygiene are all up to the mark. Taking personal training from Guru Sir. He is highly professional.",
      rating: 5,
    },
    {
      name: "Aastha Arun",
      date: "A year ago",
      text: "Amazing experience in Health Freaks, advanced gym equipment, online workout options. My trainer Sonu Sir is an experienced, hard working professional.",
      rating: 5,
    },
    {
      name: "Aryan Singh",
      date: "A year ago",
      text: "Amazing experience! The gym offers top-notch equipment and facilities, but the exceptional training from Abbu Sir sets it apart. The best!",
      rating: 5,
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Priority 8: Auto-advance carousel for mobile
  useEffect(() => {
    if (!isMobile) return;
    const start = () => {
      intervalRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          setActiveIndex((prev) => (prev + 1) % reviews.length);
        }
      }, 3000); // 3 seconds auto-advance
    };
    start();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMobile, reviews.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isPausedRef.current = true;
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      }
    }
    // Resume auto after interaction (rule: 5 seconds after last interaction)
    setTimeout(() => { isPausedRef.current = false; }, 5000);
  }, [reviews.length]);

  const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
    <div className="break-inside-avoid bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors shadow-lg max-md:p-5">
      <div className="flex items-center gap-1 text-primary mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>
      <p className="text-zinc-300 italic text-base leading-relaxed mb-6 max-md:text-[clamp(0.875rem,3.5vw,1rem)] max-md:mb-4">
        &quot;{review.text}&quot;
      </p>
      <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
        <div>
          <h4 className="font-bold text-white tracking-wide uppercase max-md:text-sm">{review.name}</h4>
          <p className="text-zinc-500 text-xs">{review.date}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-400">
          {review.name.charAt(0)}
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="py-24 bg-zinc-950 border-t border-zinc-900 max-md:py-12 max-md:px-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-md:px-0">
        <div className="text-center mb-16 max-md:mb-10">
          <h2 className="text-primary tracking-widest text-sm font-bold uppercase mb-2">Member Reviews</h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tighter text-white sm:text-5xl" style={{ fontSize: "clamp(1.3rem, 5.5vw, 3rem)" }}>
            HEAR IT FROM THE FREAKS
          </p>
          <div className="mt-4 flex flex-col items-center gap-1 justify-center">
            <div className="flex text-primary">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xl text-zinc-400 max-md:text-base">4.4 / 5.0 (427+ Reviews)</p>
          </div>
        </div>

        {/* Desktop: masonry grid */}
        <div className="hidden md:block">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>

        {/* Mobile: auto-sliding carousel */}
        <div
          className="md:hidden relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {reviews.map((review, i) => (
              <div key={i} className="min-w-full px-1">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="dot-indicators mt-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === activeIndex ? "active" : ""}`}
                onClick={() => {
                  setActiveIndex(i);
                  isPausedRef.current = true;
                  setTimeout(() => { isPausedRef.current = false; }, 3000);
                }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
