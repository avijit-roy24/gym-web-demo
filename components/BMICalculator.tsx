"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Flame, Scale, ChevronDown } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";
type Goal = "lose" | "maintain" | "gain";

interface Results {
  bmi: number;
  category: string;
  categoryColor: string;
  review: string;
  gymTip: string;
  tdee: number;
  goalCalories: number;
  goalLabel: string;
  gaugePercent: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (desk job, no exercise)",
  light: "Lightly Active (1–3 days/week)",
  moderate: "Moderately Active (3–5 days/week)",
  active: "Very Active (6–7 days/week)",
  veryActive: "Extremely Active (athlete / 2× daily)",
};

// ── BMI Category helper ───────────────────────────────────────────────────────
function getBMIInfo(bmi: number): Pick<Results, "category" | "categoryColor" | "review" | "gymTip" | "gaugePercent"> {
  if (bmi < 18.5) return {
    category: "Underweight",
    categoryColor: "#60a5fa",          // blue
    review: "Your BMI is below 18.5. You're in the underweight range. Proper nutrition and strength training can help you build healthy muscle mass.",
    gymTip: "💡 Focus on: Compound lifts, progressive overload & a calorie surplus diet. Our Elite plan includes a personalised bulking program!",
    gaugePercent: Math.max(0, (bmi / 18.5) * 20),
  };
  if (bmi < 25) return {
    category: "Normal Weight",
    categoryColor: "#4ade80",          // green
    review: "Excellent! Your BMI is in the healthy range (18.5–24.9). Keep up the great work maintaining your fitness and balanced diet.",
    gymTip: "💡 Focus on: Maintaining via varied cardio & strength training. Try our group classes to stay engaged and motivated!",
    gaugePercent: 20 + ((bmi - 18.5) / 6.5) * 30,
  };
  if (bmi < 30) return {
    category: "Overweight",
    categoryColor: "#facc15",          // yellow
    review: "Your BMI is between 25–29.9 (overweight). A combination of cardio and strength training with a calorie deficit can help you reach a healthier range.",
    gymTip: "💡 Focus on: HIIT cardio 3–4×/week + strength training 3×/week. Our expert coaches specialize in effective fat-loss programs!",
    gaugePercent: 50 + ((bmi - 25) / 5) * 25,
  };
  if (bmi < 35) return {
    category: "Obese (Class I)",
    categoryColor: "#f97316",          // orange
    review: "Your BMI is between 30–34.9. This is Class I obesity. With guided training and nutrition, significant improvement is very achievable.",
    gymTip: "💡 Focus on: Low-impact cardio (cycling, swimming), gradual strength training & strict diet. Start with our free consultation!",
    gaugePercent: 75 + ((bmi - 30) / 5) * 15,
  };
  return {
    category: "Obese (Class II+)",
    categoryColor: "#ef4444",          // red
    review: "Your BMI is 35 or above. We strongly recommend working with a personal coach and nutritionist for a safe, structured plan.",
    gymTip: "💡 Focus on: Doctor-cleared low-impact training, anti-inflammatory diet & lifestyle changes. We're here to help — every journey starts with one step!",
    gaugePercent: 90,
  };
}

// ── Goal helper ───────────────────────────────────────────────────────────────
function getGoalCalories(tdee: number, goal: Goal): { goalCalories: number; goalLabel: string } {
  if (goal === "lose") return { goalCalories: Math.round(tdee - 500), goalLabel: "Weight Loss (−500 kcal deficit)" };
  if (goal === "gain") return { goalCalories: Math.round(tdee + 300), goalLabel: "Muscle Gain (+300 kcal surplus)" };
  return { goalCalories: Math.round(tdee), goalLabel: "Maintain Weight (TDEE)" };
}

// ── Mini Gauge Bar ────────────────────────────────────────────────────────────
function GaugeBar({ percent, color }: { percent: number; color: string }) {
  const zones = [
    { label: "Under", color: "#60a5fa", w: 20 },
    { label: "Normal", color: "#4ade80", w: 30 },
    { label: "Over", color: "#facc15", w: 25 },
    { label: "Obese I", color: "#f97316", w: 15 },
    { label: "Obese II+", color: "#ef4444", w: 10 },
  ];
  return (
    <div className="w-full">
      <div className="flex rounded-full overflow-hidden h-3 mb-1">
        {zones.map((z) => (
          <div key={z.label} style={{ width: `${z.w}%`, background: z.color }} />
        ))}
      </div>
      <div className="relative h-4">
        <motion.div
          className="absolute top-0 w-3 h-3 rounded-full border-2 border-white shadow-lg"
          style={{ background: color, left: `calc(${Math.min(percent, 98)}% - 6px)` }}
          initial={{ left: "0%" }}
          animate={{ left: `calc(${Math.min(percent, 98)}% - 6px)` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-zinc-500 mt-1 px-1">
        {zones.map((z) => <span key={z.label}>{z.label}</span>)}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function BMICalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("lose");
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const h = parseFloat(heightCm);
    const w = parseFloat(weight);
    const a = parseInt(age);

    if (!h || !w || !a || h < 50 || h > 300 || w < 20 || w > 500 || a < 5 || a > 120) {
      setError("Please enter valid values — height (50–300 cm), weight (20–500 kg), age (5–120).");
      return;
    }

    const hm = h / 100;
    const bmi = parseFloat((w / (hm * hm)).toFixed(1));

    // Mifflin-St Jeor BMR
    const bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[activity]);
    const { goalCalories, goalLabel } = getGoalCalories(tdee, goal);
    const bmiInfo = getBMIInfo(bmi);

    setResults({ bmi, tdee, goalCalories, goalLabel, ...bmiInfo });
  };

  return (
    <section id="bmi-calculator" className="py-24 bg-zinc-900 relative overflow-hidden max-md:py-12 max-md:px-5">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-primary tracking-widest text-base font-bold uppercase mb-2">Know Your Numbers</p>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white" style={{ fontSize: "clamp(1.2rem, 5.5vw, 3.75rem)" }}>
            BMI & CALORIE <span className="text-primary">CALCULATOR</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto max-md:text-[clamp(0.85rem, 3.5vw, 1.1rem)]">
            Get your Body Mass Index, daily calorie needs and personalised fitness review — for free.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-5"
          >
            {/* Gender Selection - Priority 4: side by side horizontally */}
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3 block">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                {(["male", "female"] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-3 rounded-xl font-bold text-sm uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                      gender === g
                        ? "bg-primary text-black border-primary shadow-lg shadow-primary/20"
                        : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-primary/50"
                    }`}
                  >
                    {g === "male" ? "♂ Male" : "♀ Female"}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={calculate} className="flex flex-col gap-4">
              {/* Age/Height/Weight - Priority 4: stacked vertically */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2 block">Age (years)</label>
                  <input
                    type="number"
                    placeholder="e.g. 25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-white text-base focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2 block">Height (cm)</label>
                  <input
                    type="number"
                    placeholder="e.g. 175"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-white text-base focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2 block">Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="e.g. 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-white text-base focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-1 block">Activity Level</label>
                <div className="relative">
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                    className="w-full appearance-none bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    {(Object.keys(ACTIVITY_LABELS) as ActivityLevel[]).map((k) => (
                      <option key={k} value={k}>{ACTIVITY_LABELS[k]}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-2 block">Your Goal</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { v: "lose", label: "🔥 Lose Fat" },
                    { v: "maintain", label: "⚖️ Maintain" },
                    { v: "gain", label: "💪 Build Muscle" },
                  ] as { v: Goal; label: string }[]).map(({ v, label }) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setGoal(v)}
                      className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all ${
                        goal === v
                          ? "bg-primary text-black border-primary"
                          : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-primary/50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full py-4 bg-primary text-black font-extrabold text-sm uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Calculate Now
              </button>
            </form>
          </motion.div>

          {/* ── Results Panel ── */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {/* BMI Card */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Scale className="w-5 h-5 text-primary" />
                      <h3 className="text-white font-bold uppercase tracking-widest text-sm">Your BMI</h3>
                    </div>

                    <div className="flex items-end gap-3 mb-4">
                      <motion.span
                        className="text-6xl font-extrabold"
                        style={{ color: results.categoryColor }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {results.bmi}
                      </motion.span>
                      <div className="pb-2">
                        <span
                          className="text-sm font-bold px-3 py-1 rounded-full"
                          style={{ background: results.categoryColor + "22", color: results.categoryColor, border: `1px solid ${results.categoryColor}55` }}
                        >
                          {results.category}
                        </span>
                      </div>
                    </div>

                    <GaugeBar percent={results.gaugePercent} color={results.categoryColor} />

                    <p className="mt-4 text-zinc-300 text-sm leading-relaxed">{results.review}</p>
                    <div className="mt-3 bg-primary/10 border border-primary/20 rounded-xl p-3">
                      <p className="text-primary text-sm leading-relaxed">{results.gymTip}</p>
                    </div>
                  </div>

                  {/* Calorie Card */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Flame className="w-5 h-5 text-orange-400" />
                      <h3 className="text-white font-bold uppercase tracking-widest text-sm">Daily Calories</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: "Maintenance (TDEE)", value: results.tdee, color: "#a1a1aa" },
                        { label: results.goalLabel, value: results.goalCalories, color: "#4ade80" },
                      ].map((item) => (
                        <div key={item.label} className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                          <p className="text-xs text-zinc-500 mb-1 leading-tight">{item.label}</p>
                          <motion.p
                            className="text-2xl font-extrabold"
                            style={{ color: item.color }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {item.value.toLocaleString()}
                            <span className="text-xs font-normal text-zinc-500 ml-1">kcal</span>
                          </motion.p>
                        </div>
                      ))}
                    </div>

                    {/* Macro guide */}
                    <div className="space-y-2">
                      <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Suggested Macro Split</p>
                      {[
                        { name: "Protein", pct: goal === "gain" ? 35 : 30, color: "#4ade80" },
                        { name: "Carbs", pct: goal === "lose" ? 35 : 40, color: "#60a5fa" },
                        { name: "Fats", pct: goal === "lose" ? 35 : 30, color: "#facc15" },
                      ].map((m) => (
                        <div key={m.name} className="flex items-center gap-3">
                          <span className="text-xs text-zinc-400 w-14">{m.name}</span>
                          <div className="flex-1 bg-zinc-800 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: m.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${m.pct}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                            />
                          </div>
                          <span className="text-xs font-bold" style={{ color: m.color }}>{m.pct}%</span>
                          <span className="text-xs text-zinc-500 w-16">
                            {Math.round((results.goalCalories * m.pct) / 100 / (m.name === "Fats" ? 9 : 4))}g
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center max-md:p-5">
                    <p className="text-primary text-sm font-semibold mb-4 leading-relaxed">
                      🎯 Ready to start your journey? Join Health Freaks with a <strong>7-day FREE trial</strong>!
                    </p>
                    <div className="flex flex-col gap-3">
                      <a
                        href="#contact"
                        className="w-full bg-primary text-black text-xs font-black uppercase tracking-widest py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center"
                        style={{ minHeight: "3.2rem" }}
                      >
                        Book Free Consultation
                      </a>
                      {/* Priority 6: WhatsApp share button — full width, green */}
                      <button
                        onClick={() => {
                          const text = encodeURIComponent(`Hey! I just calculated my fitness stats at Health Freaks Gym. My BMI is ${results.bmi} (${results.category}). Daily TDEE: ${results.tdee} kcal. Check yours at Health Freaks!`);
                          window.open(`https://wa.me/?text=${text}`, "_blank");
                        }}
                        className="w-full bg-[#25D366] text-white text-xs font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-lg"
                        style={{ minHeight: "3.2rem" }}
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Share via WhatsApp
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px] space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Activity className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-white text-xl font-bold">Your Results Appear Here</h3>
                  <p className="text-zinc-500 text-sm max-w-xs">
                    Fill in your details on the left and hit <strong className="text-primary">Calculate Now</strong> to get your personalised BMI, calorie needs and fitness review.
                  </p>
                  <div className="grid grid-cols-3 gap-3 w-full mt-4">
                    {["BMI Score", "Daily Calories", "Macro Split"].map((label) => (
                      <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                        <div className="h-6 w-12 bg-zinc-800 rounded animate-pulse mx-auto mb-2" />
                        <p className="text-zinc-600 text-xs">{label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
