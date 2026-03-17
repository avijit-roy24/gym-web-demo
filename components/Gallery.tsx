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
    <section id="gallery" className="section-animate py-24 bg-zinc-950 max-md:py-12 max-md:px-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary tracking-widest text-xs font-bold uppercase mb-2">Our Facility</h2>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tighter text-primary sm:text-7xl uppercase" style={{ fontSize: "clamp(1.6rem, 7.5vw, 4rem)" }}>
            INSIDE HEALTH FREAKS
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto max-md:text-[clamp(0.85rem, 3.5vw, 1.1rem)]">
            Take a look at our world-class gym facilities and equipment designed to help you crush your goals.
          </p>
        </div>

        {/* Desktop: standard 3x2 Grid */}
        <div className="hidden md:grid grid-cols-3 gap-4 pb-8">
          {images.map((img, i) => (
            <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 hover:border-primary transition-colors">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Mobile: 2x2 Grid */}
        <div className="md:hidden grid grid-cols-2 gap-3 pb-8">
          {images.slice(0, 4).map((img, i) => (
            <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
