import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsPreview() {
  const testimonials = [
    {
      quote:
        "The coaches here are absolutely incredible. I've achieved results in 6 months that I couldn't reach in 2 years at my old gym.",
      name: "Marcus Johnson",
      designation: "Amateur Powerlifter",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format&fit=crop",
    },
    {
      quote:
        "Health Freaks completely changed my relationship with fitness. The supportive community and top-tier equipment make it worth every penny.",
      name: "Sarah Chen",
      designation: "Yoga Enthusiast",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
    },
    {
      quote:
        "I love the flexibility. No matter my work schedule, I know I can come in and get a great workout in an energetic environment.",
      name: "James Wilson",
      designation: "Software Engineer",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=800&auto=format&fit=crop",
    },
    {
      quote:
        "Outstanding coaching and robust programs. It's rare to find a gym that genuinely cares about your personal progression.",
      name: "Mike Thompson",
      designation: "Marathon Runner",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}
