import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import Businesses from "@/components/sections/Businesses";
import Benefits from "@/components/sections/Benefits";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import ScheduleModal from "@/components/ScheduleModal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Businesses />
      <Benefits />
      <FinalCTA />
      <Footer />
      <DemoModal />
      <ScheduleModal />
    </main>
  );
}
