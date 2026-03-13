"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HeartPulse, Phone, User, Calendar, CheckCircle2 } from "lucide-react";

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClass?: string;
}

export default function FreeTrialModal({ isOpen, onClose, defaultClass = "" }: FreeTrialModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedClass, setSelectedClass] = useState(defaultClass);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const classes = [
    "Power Yoga",
    "CrossFit / Strength",
    "Zumba Dance",
    "Cardio Kickboxing",
    "Heavy Weights",
  ];

  const validate = () => {
    const e: { name?: string; phone?: string } = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit mobile number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // reset after close animation
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setPhone("");
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-[200]"
            style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="relative w-[90vw] max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto max-md:max-h-[82vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-transparent shrink-0" />

              {/* Close button - Priority 5: Safe area aware, always reachable */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-md rounded-full flex items-center justify-center z-[210] shadow-lg border border-zinc-800"
                style={{ 
                  width: "3rem", 
                  height: "3rem",
                  top: "calc(0.75rem + env(safe-area-inset-top))"
                }}
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-7 max-md:p-6 max-md:pt-[calc(4rem+env(safe-area-inset-top))] overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
                {/* Logo + Brand */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-3">
                    {/* Hexagon background */}
                    <div className="w-20 h-20 bg-zinc-900 border-2 border-primary/40 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/10 overflow-hidden">
                      <img
                        src="/health-freaks-logo.png"
                        alt="Health Freaks Logo"
                        className="w-16 h-16 object-contain"
                        onError={(e) => {
                          // Fallback if image isn't ready
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <HeartPulse className="w-10 h-10 text-primary absolute" style={{ display: "none" }} />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </span>
                  </div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase">Health Freaks Gym</p>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* ── Success State ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-4 space-y-4"
                    >
                      <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-white tracking-tight">You're Booked!</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Hey <span className="text-primary font-semibold">{name}</span>! Your free trial is confirmed.
                        Our team will call you at <span className="text-primary font-semibold">+91 {phone}</span> shortly.
                      </p>
                      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-400 space-y-1">
                        <p>📞 Or call us directly: <span className="text-white font-bold">+91 097099 31400</span></p>
                        <p>📍 Location: <span className="text-white">Ranchi, Jharkhand</span></p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="w-full py-3 bg-primary text-black font-extrabold text-sm uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    /* ── Form State ── */
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center mb-1">
                        BOOK YOUR <span className="text-primary">FREE TRIAL</span>
                      </h2>
                      <p className="text-zinc-500 text-sm text-center mb-6">
                        Fill in your details and we'll reach out to set up your first session — completely free!
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1 block">
                            Name <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                              type="text"
                              placeholder="Enter Your Full Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className={`w-full bg-zinc-900 border ${errors.name ? "border-red-500" : "border-zinc-700"} rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors`}
                              style={{ minHeight: "3rem" }}
                            />
                          </div>
                          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1 block">
                            Mobile <span className="text-primary">*</span>
                          </label>
                          <div className="flex gap-2">
                            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 rounded-xl px-3 text-sm text-zinc-400 shrink-0">
                              🇮🇳 +91
                            </div>
                            <div className="relative flex-1">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                              <input
                                type="tel"
                                placeholder="10-digit number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                className={`w-full bg-zinc-900 border ${errors.phone ? "border-red-500" : "border-zinc-700"} rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors`}
                                style={{ minHeight: "3rem" }}
                              />
                            </div>
                          </div>
                          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        {/* Class selection */}
                        <div>
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1 block">
                            <Calendar className="inline w-3.5 h-3.5 mr-1" />
                            Interested Class
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {classes.map((c) => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => setSelectedClass(c)}
                                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${
                                  selectedClass === c
                                    ? "bg-primary text-black border-primary"
                                    : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-primary/50"
                                }`}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-primary text-black font-extrabold text-sm uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 mt-2"
                          style={{ minHeight: "3.2rem" }}
                        >
                          Book Free Trial 🎉
                        </button>
                      </form>

                      {/* Divider */}
                      <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-zinc-800" />
                        <span className="text-zinc-600 text-xs uppercase tracking-widest">or contact us</span>
                        <div className="flex-1 h-px bg-zinc-800" />
                      </div>

                      {/* Contact row */}
                      <div className="flex gap-3">
                        <a
                          href="https://wa.me/919709931400"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#25D366] font-bold text-xs uppercase tracking-wide py-3 rounded-xl transition-all"
                        >
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          WhatsApp
                        </a>
                        <a
                          href="tel:+919709931400"
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-wide py-3 rounded-xl transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
