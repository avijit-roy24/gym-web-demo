"use client";
import { Dumbbell, Activity, ShieldCheck, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Strength Training",
    description:
      "Build muscle and power with our extensive collection of free weights and professional machines.",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Cardio Fitness",
    description:
      "Elevate your endurance with treadmills, spin bikes, ellipticals, and daily high-energy cardio sessions.",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Yoga & Group Classes",
    description:
      "From soothing Yoga to intense Zumba and Bollywood dance workouts. Achieve balance and flexibility.",
    icon: HeartPulse,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Personal Coaching",
    description:
      "Get a customized regimen designed for your unique goals, overseen by our expert coaching staff.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
  },
];

import { WordPullUp } from "./ui/word-pull-up";

export default function Programs() {
  return (
    <div id="programs" className="py-24 bg-zinc-950 relative overflow-hidden max-md:py-12 max-md:px-5">
      <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-md:mb-8">
          <WordPullUp
            words="OUR PROGRAMS"
            className="text-4xl font-extrabold tracking-tighter text-primary sm:text-6xl uppercase mb-2"
            style={{ fontSize: "clamp(1.6rem, 7vw, 3.5rem)" }}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-md:gap-4">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={feature.name}
              className="relative group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/50 hover:border-primary/50 transition-colors"
            >
              <div className="h-40 md:h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <img
                  src={feature.image}
                  alt={feature.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <feature.icon className="absolute bottom-3 left-3 h-6 w-6 md:h-8 md:w-8 text-primary z-20" aria-hidden="true" />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-xl font-bold text-white mb-2 leading-tight">{feature.name}</h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-md:text-[clamp(0.75rem,3.2vw,0.85rem)]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
