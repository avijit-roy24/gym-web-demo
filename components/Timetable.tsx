"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FlipText } from "./ui/flip-text";
import { Clock, User, Dumbbell } from "lucide-react";
import FreeTrialModal from "./FreeTrialModal";

const schedule = [
  { time: "06:00 AM", class: "Power Yoga", trainer: "Tanuja", color: "#a78bfa" },
  { time: "08:00 AM", class: "CrossFit / Strength", trainer: "Guru Sir", color: "#4ade80" },
  { time: "10:00 AM", class: "Zumba Dance", trainer: "Sonu Sir", color: "#f472b6" },
  { time: "05:00 PM", class: "Cardio Kickboxing", trainer: "Raj Sir", color: "#fb923c" },
  { time: "07:00 PM", class: "Heavy Weights", trainer: "Abbu Sir", color: "#4ade80" },
];

export default function Timetable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredClass, setHoveredClass] = useState("");
  const hasShown = useRef(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);

    // Global hash listener for Free Trial Modal
    const handleHash = () => {
      if (window.location.hash === "#free-trial") {
        setModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    if (window.location.hash === "#free-trial") {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const handleRowHover = (className: string) => {
    if (hasShown.current || isMobile) return;
    setHoveredClass(className);
    hoverTimer.current = setTimeout(() => {
      setModalOpen(true);
      hasShown.current = true;
    }, 600);
  };

  const handleRowLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const handleCardTap = (className: string) => {
    if (!isMobile) return;
    setHoveredClass(className);
    setModalOpen(true);
  };

  return (
    <section id="timetable" className="py-24 bg-zinc-950 border-y border-zinc-900 relative overflow-hidden max-md:py-12 max-md:px-5">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full max-md:w-[300px] max-md:h-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-md:px-0">
        {/* Heading - Priority 7 */}
        <motion.div
          className="text-center mb-16 max-md:mb-10 px-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary tracking-widest text-[10px] font-bold uppercase mb-2 block">Schedule</span>
          <div className="flex justify-center mt-3 max-md:mt-1">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 max-md:gap-x-2 max-md:flex-wrap">
                <FlipText
                  word="DAILY"
                  duration={0.4}
                  delayMultiple={0.06}
                  className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white max-md:text-[clamp(1.4rem,6vw,2.5rem)]"
                  style={{ letterSpacing: "-0.01em" }}
                />
                <FlipText
                  word="TIMETABLE"
                  duration={0.4}
                  delayMultiple={0.06}
                  className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-primary max-md:text-[clamp(1.4rem,6vw,2.5rem)]"
                  style={{ letterSpacing: "-0.01em" }}
                />
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400 mx-auto max-md:text-[clamp(0.85rem, 3.5vw, 1rem)] max-md:px-4 max-md:leading-snug">
            {isMobile ? (
              <>Tap any class below to book your <span className="text-primary font-bold underline decoration-2 underline-offset-4">free trial</span> session!</>
            ) : (
              <>Hover over any class to instantly book your <span className="text-primary font-semibold">free trial</span>!</>
            )}
          </p>
        </motion.div>

        {/* Desktop: Table layout */}
        <div className="hidden md:block">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            {/* Header */}
            <div className="grid grid-cols-3 bg-zinc-950 border-b border-zinc-800 px-6 py-4">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 tracking-widest uppercase">
                <Clock className="w-4 h-4" /> Time
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 tracking-widest uppercase">
                <Dumbbell className="w-4 h-4" /> Class
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 tracking-widest uppercase">
                <User className="w-4 h-4" /> Trainer
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-zinc-800/60">
              {schedule.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                  onHoverStart={() => handleRowHover(item.class)}
                  onHoverEnd={handleRowLeave}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.04)", x: 6 }}
                  className="grid grid-cols-3 px-6 py-5 text-white cursor-pointer transition-colors group relative"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full shrink-0 group-hover:scale-150 transition-transform"
                      style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                    />
                    <span className="font-bold text-sm sm:text-base" style={{ color: item.color }}>
                      {item.time}
                    </span>
                  </div>
                  <div className="font-semibold text-sm sm:text-base tracking-wide text-white">
                    {item.class}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-sm sm:text-base">{item.trainer}</span>
                    <span className="text-[10px] text-primary/70 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Book Trial →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="md:hidden space-y-3">
          {schedule.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              onClick={() => handleCardTap(item.class)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer active:bg-zinc-800 transition-colors"
              style={{ minHeight: "4rem" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                  />
                  <span className="font-bold text-sm" style={{ color: item.color }}>
                    {item.time}
                  </span>
                </div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                  Tap to Book →
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base text-white">{item.class}</span>
                <span className="text-zinc-400 text-xs uppercase tracking-wider">{item.trainer}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-zinc-600 text-sm mt-6 max-md:text-xs max-md:mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
        >
          * Schedule may vary on public holidays. Call +91 097099 31400 to confirm.
        </motion.p>
      </div>

      <FreeTrialModal
        isOpen={modalOpen}
        onClose={closeModal}
        defaultClass={hoveredClass}
      />
    </section>
  );
}
