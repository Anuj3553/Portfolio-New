"use client";

import ParticlesComponent from "@/components/particles";
import Navbar from "@/components/user/common/Navbar";
import HeroSection from "@/components/user/HeroSection";

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

      {/* Demo Next Section */}
      <div className="h-screen flex items-center justify-center z-10 relative bg-white">
        <h1 className="text-xl">Hello, World!</h1>
      </div>
    </div>
  );
}

export default App;
