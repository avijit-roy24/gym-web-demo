"use client";

import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const athletes = [
  {
    id: 1,
    name: "Chris Bumstead",
    designation: "4x Classic Physique Olympia",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "David Laid",
    designation: "Gymshark Creative Director",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Noel Deyzel",
    designation: "Fitness Mentor",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Lexx Little",
    designation: "YoungLA Athlete",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Ryan Terry",
    designation: "Gymshark Pro Athlete",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-col items-center justify-center w-full mb-12">
      <h3 className="text-xl font-bold tracking-widest text-zinc-400 uppercase mb-6">
        Athletes Powered By Us
      </h3>
      <div className="flex flex-row items-center justify-center w-full">
        <AnimatedTooltip items={athletes} />
      </div>
    </div>
  );
}
