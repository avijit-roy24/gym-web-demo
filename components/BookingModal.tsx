"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";

export function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: false, phone: false });

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      // Small timeout to allow structural mounting before triggering CSS opacities
      setTimeout(() => setIsAnimating(true), 10);
      setIsSuccess(false);
      setName("");
      setPhone("");
      setErrors({ name: false, phone: false });
    };
    window.addEventListener("openBookingModal", handleOpen);
    return () => window.removeEventListener("openBookingModal", handleOpen);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 200); // Wait for CSS close animation
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: name.trim() === "",
      phone: phone.trim() === "",
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.phone) {
      setIsSuccess(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/75 backdrop-blur-[8px] transition-opacity duration-200 ${isAnimating ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />

      {/* Modal Box */}
      <div 
        className={`relative w-[92vw] md:w-[500px] max-h-[82vh] md:max-h-[85vh] overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-[1rem] shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-6 md:p-8 transition-all duration-300 ease-out flex flex-col ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-[30px] opacity-0"}`}
        style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-[10000] w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] text-white hover:bg-[#333333] transition-colors cursor-pointer"
          aria-label="Close"
          style={{ minHeight: "3rem", minWidth: "3rem" }}
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 text-center my-auto w-full">
            <CheckCircle2 className="w-20 h-20 text-[#00C851] mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Thank you!</h2>
            <p className="text-[#999999] mb-8">We will contact you within 2 hours.</p>
            <button
              type="button"
              onClick={handleClose}
              className="w-full text-white bg-[#00C851] font-bold rounded-lg outline-none cursor-pointer border-none flex items-center justify-center"
              style={{ minHeight: "3.2rem" }}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full mt-2">
            <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-white mb-1">Start Your Fitness Journey</h2>
            <p className="text-[0.85rem] text-[#999999] mb-6">Fill in your details and our team will contact you within 2 hours.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-[0.8rem] text-[#999999]">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 bg-[#2a2a2a] border border-white/10 focus:border-[#00C851] text-white px-4 rounded-lg outline-none transition-colors text-[1rem]"
                />
                {errors.name && <span className="text-[#ff4444] text-xs mt-1">This field is required.</span>}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-[0.8rem] text-[#999999]">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 bg-[#2a2a2a] border border-white/10 focus:border-[#00C851] text-white px-4 rounded-lg outline-none transition-colors text-[1rem]"
                />
                {errors.phone && <span className="text-[#ff4444] text-xs mt-1">This field is required.</span>}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-[0.8rem] text-[#999999]">Email</label>
                <input 
                  type="email" 
                  className="w-full h-12 bg-[#2a2a2a] border border-white/10 focus:border-[#00C851] text-white px-4 rounded-lg outline-none transition-colors text-[1rem]"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-[0.8rem] text-[#999999]">Select Plan</label>
                <select className="w-full h-12 bg-[#2a2a2a] border border-white/10 focus:border-[#00C851] text-white px-4 rounded-lg outline-none transition-colors appearance-none text-[1rem]">
                  <option>Monthly - Rs 5,500</option>
                  <option>Quarterly - Rs 2,000</option>
                  <option>Yearly - Rs 18,000 (Save Rs 6,000)</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-[0.8rem] text-[#999999]">Preferred Start Date</label>
                <input 
                  type="date" 
                  className="w-full h-12 bg-[#2a2a2a] border border-white/10 focus:border-[#00C851] text-white px-4 rounded-lg outline-none transition-colors text-[1rem]"
                />
              </div>

              <div className="flex flex-col gap-1 mb-2 w-full">
                <label className="text-[0.8rem] text-[#999999]">Message</label>
                <textarea 
                  placeholder="Your fitness goals..."
                  rows={3}
                  className="w-full bg-[#2a2a2a] border border-white/10 focus:border-[#00C851] text-white p-4 rounded-lg outline-none transition-colors resize-none text-[1rem]"
                />
              </div>

              <button 
                type="submit" 
                className="w-full border-none bg-[#00C851] flex justify-center items-center text-white font-bold rounded-lg cursor-pointer transition-transform active:scale-[0.98] mt-2 block"
                style={{ minHeight: "3.2rem" }}
              >
                BOOK NOW
              </button>

              <p className="text-center text-[#999999] font-medium text-[0.85rem] mt-2 block">No joining fee. No cancellation fee. FREE 3-day trial included.</p>

              <div className="mt-4 flex justify-center w-full">
                <a href="https://wa.me/919709931400?text=Hi%2C%20I%20want%20to%20join%20HealthFreaks%20gym!" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-[#00C851] font-medium hover:underline p-2 text-center">
                  Prefer WhatsApp? Chat with us directly
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
