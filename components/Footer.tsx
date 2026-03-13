
import { Dumbbell, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 max-md:pt-10 max-md:pb-6 max-md:px-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12 max-md:gap-6 max-md:mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl tracking-tighter uppercase text-primary">
                Health<span className="text-white">Freaks</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              The ultimate fitness destination in Ranchi. Join us to transform your body, mind, and spirit with our expert coaches and world-class facilities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white tracking-widest uppercase mb-4 text-sm mt-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#programs" className="text-zinc-500 hover:text-primary transition-colors text-sm">Programs</a></li>
              <li><a href="#timetable" className="text-zinc-500 hover:text-primary transition-colors text-sm">Timetable</a></li>
              <li><a href="#pricing" className="text-zinc-500 hover:text-primary transition-colors text-sm">Pricing</a></li>
              <li><a href="#testimonials" className="text-zinc-500 hover:text-primary transition-colors text-sm">Reviews</a></li>
              <li><a href="#free-trial" className="text-zinc-500 hover:text-primary transition-colors text-sm">Book Free Trial</a></li>
              <li><a href="#join-now" className="text-zinc-500 hover:text-primary transition-colors text-sm">Join Now</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white tracking-widest uppercase mb-4 text-sm mt-2">Features</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors text-sm">Personal Training</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors text-sm">Group Classes</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors text-sm">Yoga Sessions</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors text-sm">Nutrition Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white tracking-widest uppercase mb-4 text-sm mt-2">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-primary transition-colors text-sm">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} Health Freaks. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed & Developed for Health Freaks Ranchi</p>
        </div>
      </div>
    </footer>
  );
}
