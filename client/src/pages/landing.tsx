import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import mainImage from "@assets/Untitled_1753600683302.jpg";
import { sessionManager } from "@/lib/session-manager";
import { useAmbientAudio } from "@/hooks/use-ambient-audio";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { startAudio } = useAmbientAudio();

  useEffect(() => {
    // Reset session on landing
    sessionManager.reset();
  }, []);

  const handleStartJourney = () => {
    startAudio();
    setLocation('/questionnaire');
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Static main image with text already on it */}
      <div className="absolute inset-0 bg-midnight">
        <img 
          src={mainImage} 
          alt="Sense of Self Landing" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 flex items-end justify-center h-full pb-20">
        <button 
          onClick={handleStartJourney}
          className="bg-transparent border-2 border-gold hover:bg-gold hover:text-charcoal px-12 py-4 rounded font-cinzel text-xl transition-all duration-300 animate-fade-in hover:shadow-2xl"
        >
          Begin Journey
        </button>
      </div>
    </section>
  );
}
