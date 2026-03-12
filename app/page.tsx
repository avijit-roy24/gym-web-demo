import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Trainers from "@/components/Trainers";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import BMICalculator from "@/components/BMICalculator";
import Timetable from "@/components/Timetable";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Programs />
        <Trainers />
        <Timetable />
        <Pricing />
        <Testimonials />
        <Gallery />
        <BMICalculator />
        <Contact />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}
