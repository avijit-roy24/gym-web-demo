import { CardStack3D } from "./ui/3d-flip-card";

export default function Gallery() {
  const images = [
    { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", alt: "Gym interior 1" },
    { src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=800&auto=format&fit=crop", alt: "Gym interior 2" },
    { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop", alt: "Gym interior 3" },
    { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop", alt: "Weights 1" },
    { src: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop", alt: "Weights 2" },
    { src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop", alt: "Workout setup" }
  ];

  return (
    <section id="gallery" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-primary tracking-widest text-base font-bold uppercase mb-2">Our Facility</h2>
          <p className="mt-2 text-5xl font-extrabold tracking-tighter text-white sm:text-6xl">
            INSIDE HEALTH FREAKS
          </p>
        </div>

        <div className="flex justify-center items-center">
          <CardStack3D 
            images={images}
            className="pt-24 pb-12"
            cardWidth={500}
            cardHeight={300}
            spacing={{ x: 60, y: 60 }}
          />
        </div>
      </div>
    </section>
  );
}
