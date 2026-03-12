"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Pricing() {
  const plans = [
    {
      name: "MONTHLY",
      price: "₹2,000",
      description: "Perfect for short-term goals and flexibility.",
      features: [
        "Access to all gym equipment",
        "Locker room & shower access",
        "General trainer guidance",
        "1 Group class per week"
      ],
      recommended: false,
    },
    {
      name: "QUARTERLY",
      price: "₹5,500",
      description: "Get serious and save more for medium goals.",
      features: [
        "Access to all gym equipment",
        "Locker room & shower access",
        "Unlimited Group Classes (Yoga, Zumba)",
        "Complimentary fitness assessment",
      ],
      recommended: true,
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
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary tracking-widest text-sm font-bold uppercase mb-2">Memberships</h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tighter text-white sm:text-5xl">
            PRICING PLANS
          </p>
          <p className="mt-4 max-w-2xl text-xl text-zinc-400 mx-auto">
            Choose a plan that fits your goals. No hidden fees. Just results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative bg-zinc-900 border ${
                plan.recommended ? "border-primary" : "border-zinc-800"
              } rounded-2xl p-8 flex flex-col items-center text-center shadow-xl group`}
            >
              {plan.recommended && (
                <div className="absolute top-0 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold tracking-widest text-zinc-200 mb-2 uppercase">{plan.name}</h3>
              <p className="text-4xl font-extrabold text-white mb-4">{plan.price}</p>
              <p className="text-sm text-zinc-500 mb-8 max-w-[200px]">{plan.description}</p>
              <ul className="text-left w-full space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm text-zinc-300">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.recommended ? "default" : "outline"}
                className={`w-full mt-auto ${plan.recommended ? "shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]" : "border-zinc-700 hover:bg-zinc-800"}`}
              >
                Choose Plan
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
