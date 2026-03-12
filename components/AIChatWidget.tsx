"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, HeartPulse } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";

// ─── Knowledge Base ───────────────────────────────────────────────────────────
const KB: { keywords: string[]; response: string }[] = [
  {
    keywords: ["hi", "hello", "hey", "howdy", "namaste", "good morning", "good evening", "sup"],
    response:
      "Hey there! 👋 Welcome to Health Freaks. I'm your fitness assistant. You can ask me about our programs, trainers, timings, fees, location, or how to get started!",
  },
  {
    keywords: ["price", "pricing", "fee", "cost", "membership", "plan", "charge", "how much", "rate"],
    response:
      "💪 Our membership plans:\n\n• **Basic** – ₹1,499/mo (gym access + locker)\n• **Pro** – ₹2,499/mo (gym + group classes + diet plan)\n• **Elite** – ₹3,999/mo (all features + personal trainer sessions)\n\nAll plans include a 7-day free trial! Want to book a trial?",
  },
  {
    keywords: ["timing", "time", "open", "hours", "schedule", "when", "close", "closes", "opens"],
    response:
      "🕐 We're open 7 days a week!\n\n• Mon–Fri: 5:00 AM – 10:00 PM\n• Saturday: 6:00 AM – 9:00 PM\n• Sunday: 7:00 AM – 8:00 PM\n\nEarly bird sessions available from 5 AM on weekdays!",
  },
  {
    keywords: ["location", "address", "where", "find us", "directions", "map", "place", "area", "ranchi"],
    response:
      "📍 We're located in **Ranchi, Jharkhand**.\n\nYou can find us easily — just search \"Health Freaks Gym Ranchi\" on Google Maps. For exact directions, call us at +91 097099 31400 and we'll guide you!",
  },
  {
    keywords: ["phone", "number", "call", "contact", "reach", "whatsapp", "mobile"],
    response:
      "📞 You can reach us at:\n\n**+91 097099 31400**\n\nWe're also on WhatsApp! Feel free to call or message us anytime during gym hours.",
  },
  {
    keywords: ["trainer", "coach", "instructor", "personal trainer", "pt", "personal training", "expert"],
    response:
      "🏋️ Our trainers are certified fitness experts with 5–15 years of experience!\n\nWe have specialists in:\n• Strength & Powerlifting\n• Weight Loss & Cardio\n• Yoga & Flexibility\n• Bodybuilding & Physique\n\nPersonal training sessions are included in our Elite plan or can be added as an add-on. Want to know more?",
  },
  {
    keywords: ["program", "class", "classes", "course", "workout", "training", "crossfit", "yoga", "zumba", "cardio", "strength", "hiit"],
    response:
      "🔥 We offer a variety of programs:\n\n• **HIIT Cardio** – Fat burning, high intensity\n• **Strength Training** – Build muscle & power\n• **Yoga & Flexibility** – Mind-body balance\n• **Zumba / Dance Fitness** – Fun & high energy\n• **Bodybuilding** – Sculpt your physique\n• **CrossFit** – Functional fitness\n\nGroup classes run multiple times a day. Pro & Elite members get unlimited access!",
  },
  {
    keywords: ["diet", "nutrition", "food", "meal", "eat", "calories", "supplement", "protein"],
    response:
      "🥗 We provide personalised diet plans with our **Pro** and **Elite** memberships.\n\nOur certified nutritionist will create a meal plan based on your goals — whether it's weight loss, muscle gain, or maintenance. We also stock protein supplements at the gym at member-exclusive prices!",
  },
  {
    keywords: ["weight loss", "lose weight", "fat loss", "slim", "reduce", "burn fat"],
    response:
      "🔥 Our weight loss program combines:\n\n1. HIIT cardio sessions (3×/week)\n2. Strength training to boost metabolism\n3. Personalised calorie-deficit diet plan\n4. Weekly check-ins with your trainer\n\nMembers typically see results in 4–8 weeks! Want to book a free consultation?",
  },
  {
    keywords: ["muscle", "bulk", "gain", "build", "bodybuilding", "mass", "strength"],
    response:
      "💪 Our muscle-building program includes:\n\n1. Progressive overload strength training\n2. High-protein diet planning\n3. Recovery & sleep optimization tips\n4. Creatine & supplement guidance\n\nOur trainers specialise in hypertrophy training. Ask about our Elite plan for personalised sessions!",
  },
  {
    keywords: ["trial", "free", "try", "visit", "first time", "new", "beginner", "start", "join"],
    response:
      "🎉 Great news — we offer a **7-day FREE trial** for all new members!\n\nNo credit card required. Just walk in with a valid ID or call us to pre-register:\n\n📞 +91 097099 31400\n\nWe'll give you a full gym tour and match you with a trainer based on your goals!",
  },
  {
    keywords: ["equipment", "machine", "facility", "facilities", "gym", "weights", "treadmill", "bench"],
    response:
      "🏋️ Health Freaks is equipped with world-class machines:\n\n• 20+ cardio machines (treadmill, elliptical, cycle)\n• Olympic free weights & barbells\n• Cable machines & functional training rigs\n• Dedicated yoga & stretching studio\n• Steam room & clean changing rooms\n\nAll equipment is maintained & sanitized daily!",
  },
  {
    keywords: ["steam", "sauna", "spa", "locker", "shower", "changing"],
    response:
      "🧖 Our premium facilities include:\n\n• Steam room (Pro & Elite members)\n• Clean showers & changing rooms\n• Secure lockers\n• Towel service (Elite members)\n\nBasic members can upgrade to access premium amenities for ₹500/mo.",
  },
  {
    keywords: ["women", "female", "girl", "ladies", "ladies only", "woman"],
    response:
      "👩 Health Freaks is a welcoming, safe environment for all! We have:\n\n• Dedicated women's workout zone\n• Female trainers available\n• Women-only group class sessions\n• Self-defence fitness sessions every Saturday\n\nAll our staff are trained in creating an inclusive gym culture.",
  },
  {
    keywords: ["thank", "thanks", "awesome", "great", "nice", "cool", "perfect", "wonderful"],
    response:
      "😊 You're welcome! Remember, consistency is the key to your dream body. We're here to support every step of your fitness journey. Feel free to ask anything else!",
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "cya", "take care"],
    response:
      "👋 See you at the gym! Remember: every rep counts. Stay consistent and keep pushing! 💪 Visit us anytime or call +91 097099 31400.",
  },
];

// ─── Matcher ──────────────────────────────────────────────────────────────────
function getBotResponse(userText: string): string {
  const lower = userText.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return "🤔 That's a great question! For specific details, you can:\n\n• Call us: **+91 097099 31400**\n• Visit us in Ranchi\n• Ask about: pricing, timings, programs, trainers, diet plans or facilities\n\nI'm happy to help with any gym-related queries!";
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm your Health Freaks AI assistant. Ask me about our programs, pricing, timings, trainers, or how to get started!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WELCOME = {
    id: 1,
    text: "Hi there! 👋 I'm your Health Freaks AI assistant. Ask me about our programs, pricing, timings, trainers, or how to get started!",
    sender: "bot",
  };

  const toggleChat = () => {
    if (!isOpen) {
      // reset to fresh state on every open
      setMessages([WELCOME]);
      setInput("");
      setIsTyping(false);
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    const captured = input;
    setInput("");
    setIsTyping(true);

    // Simulate realistic typing delay (varies slightly per message length)
    const delay = 800 + Math.min(captured.length * 15, 1200);
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: getBotResponse(captured),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-80 sm:w-96 h-[520px] z-[100] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-primary animate-pulse" />
                <div>
                  <h3 className="font-bold text-white tracking-widest uppercase text-sm">Health Freaks AI</h3>
                  <p className="text-xs text-emerald-400">● Online</p>
                </div>
              </div>
              <button onClick={toggleChat} className="text-zinc-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick-reply chips */}
            <div className="flex gap-2 px-3 py-2 bg-zinc-950/80 border-b border-zinc-800 overflow-x-auto shrink-0 scrollbar-hide">
              {["Pricing 💰", "Timings 🕐", "Programs 🔥", "Free Trial 🎉", "Contact 📞"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    setInput(chip);
                    handleSend({ preventDefault: () => {}, target: null } as unknown as React.FormEvent);
                    setInput(chip);
                    // use a small trick to fire send
                    setTimeout(() => {
                      const userMsg = { id: Date.now(), text: chip, sender: "user" };
                      setMessages((prev) => [...prev, userMsg]);
                      setIsTyping(true);
                      setTimeout(() => {
                        setMessages((prev) => [
                          ...prev,
                          { id: Date.now() + 1, text: getBotResponse(chip), sender: "bot" },
                        ]);
                        setIsTyping(false);
                      }, 900);
                    }, 0);
                  }}
                  className="text-xs whitespace-nowrap bg-zinc-800 hover:bg-primary/20 border border-zinc-700 hover:border-primary text-zinc-300 hover:text-white rounded-full px-3 py-1 transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/50">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} variant={msg.sender === "user" ? "sent" : "received"}>
                  <ChatBubbleAvatar
                    fallback={msg.sender === "user" ? "ME" : "AI"}
                    src={
                      msg.sender === "bot"
                        ? "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=64&h=64&q=80&crop=faces&fit=crop"
                        : undefined
                    }
                  />
                  <ChatBubbleMessage
                    variant={msg.sender === "user" ? "sent" : "received"}
                    className={
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground whitespace-pre-wrap"
                        : "bg-zinc-800 text-zinc-200 whitespace-pre-wrap"
                    }
                  >
                    {msg.text}
                  </ChatBubbleMessage>
                </ChatBubble>
              ))}

              {isTyping && (
                <ChatBubble variant="received">
                  <ChatBubbleAvatar
                    fallback="AI"
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=64&h=64&q=80&crop=faces&fit=crop"
                  />
                  <ChatBubbleMessage variant="received" isLoading className="bg-zinc-800 text-zinc-200" />
                </ChatBubble>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full shrink-0 flex items-center justify-center p-0 h-10 w-10 hover:bg-primary/90"
              >
                <Send className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex justify-center items-center z-[100] border-4 border-zinc-950"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
