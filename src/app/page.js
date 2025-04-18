"use client";

import ParticlesComponent from "@/components/particles";
import Navbar from "@/components/main/common/Navbar";
import HeroSection from "@/components/main/HeroSection";
import AboutSection from "@/components/main/AboutSection";

function App() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      <Navbar />

      {/* Particles Background - Load Immediately */}
      <div className="absolute inset-0 z-0">
        <ParticlesComponent />
      </div>

      {/* Content Layer */}
      <main className="relative z-10 flex flex-col items-center justify-center">
        <HeroSection />
      </main>

      {/* About Section */}
      <AboutSection />
    </div>
  );
}

export default App;
