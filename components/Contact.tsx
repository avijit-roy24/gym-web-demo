"use client";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary tracking-widest text-xl font-bold uppercase mb-2">Get In Touch</h2>
          <p className="mt-2 text-5xl font-extrabold tracking-tighter text-white sm:text-7xl">
            FIND US HERE
          </p>
          <p className="mt-4 max-w-2xl text-xl text-zinc-400 mx-auto">
            Drop by for a free trial or contact us to start your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Map Placeholder */}
          <div className="h-[400px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center relative shadow-xl">
            {/* Real implementation would use Google Maps iframe, using a style placeholder for now */}
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=23.36,85.33&zoom=14&size=800x400&markers=color:red%7C23.36,85.33&style=feature:all%7Celement:all%7Ccolor:0x111111&sensor=false')] opacity-30 grayscale blur-sm mix-blend-screen bg-cover bg-center transition-all duration-700 hover:filter-none hover:opacity-100 hover:blur-none cursor-pointer" />
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center pointer-events-none text-white">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-bold tracking-widest mb-2">HEALTH FREAKS</h3>
              <p className="text-zinc-400">Pillar No. 51, Prithvi Complex, 1st Floor, Ratu Rd, Ranchi, Jharkhand 834001</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 lg:p-12 shadow-xl">
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-6">Contact Info</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-zinc-300">
                <MapPin className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-widest">Address</h4>
                  <p className="text-zinc-400">Pillar No. 51, Prithvi Complex, 1st Floor, Ratu Rd, near Ram Bilas Petrol Pump, Jawahar Nagar, Ranchi, Jharkhand 834001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-zinc-300">
                <Phone className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-widest">Phone</h4>
                  <p className="text-zinc-400">+91 097099 31400</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-zinc-300">
                <Mail className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-widest">Email</h4>
                  <p className="text-zinc-400">info@healthfreaksclub.in</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-zinc-300">
                <Clock className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-widest">Hours</h4>
                  <p className="text-zinc-400">Open Daily • Closes 9 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
