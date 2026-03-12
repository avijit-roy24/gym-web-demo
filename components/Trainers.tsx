import { AnimatedTestimonials } from "./ui/animated-testimonials";

const trainers = [
  {
    name: "Guru Sir",
    role: "Head Personal Trainer",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop", // Male trainer
    bio: "Specialist in hypertrophy and strength training with 10+ years of experience.",
  },
  {
    name: "Sonu Sir",
    role: "Fitness Coach",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop", // Male trainer adjusting weights
    bio: "Helps you push beyond limits. Expert in functional training and endurance.",
  },
  {
    name: "Tanuja",
    role: "Yoga & Wellness Coach",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop", // Female yoga pose
    bio: "Focuses on flexibility, mindfulness, and core strength through advanced yoga flows.",
  },
  {
    name: "Raj Sir",
    role: "Online & Home Training",
    image: "https://images.unsplash.com/photo-1563122870-6b0b48a0af09?q=80&w=800&auto=format&fit=crop", // Male trainer
    bio: "Brings the gym to you. Master of adaptive workout plans and diet regimes.",
  },
];

export default function Trainers() {
  const mappedTrainers = trainers.map((t) => ({
    name: t.name,
    designation: t.role,
    src: t.image,
    quote: t.bio,
  }));

  return (
    <section id="trainers" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary tracking-widest text-sm font-bold uppercase mb-2">Our Team</h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tighter text-white sm:text-5xl">
            MEET YOUR TRAINERS
          </p>
          <p className="mt-4 max-w-2xl text-xl text-zinc-400 mx-auto">
            Our certified professionals are here to guide, motivate, and help you crush your fitness goals.
          </p>
        </div>

        <AnimatedTestimonials testimonials={mappedTrainers} />
      </div>
    </section>
  );
}
