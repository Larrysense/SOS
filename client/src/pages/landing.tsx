import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import mainImage from "@assets/Untitled_1753600683302.jpg";
import bg1 from "@assets/download (27)_1753600683305.jpeg";
import bg2 from "@assets/download (28)_1753600683305.jpeg";
import bg3 from "@assets/download (29)_1753600683304.jpeg";
import bg4 from "@assets/download (30)_1753600683303.jpeg";
import bg5 from "@assets/download (31) - Copy_1753600683304.jpeg";
import { sessionManager } from "@/lib/session-manager";
import { useAmbientAudio } from "@/hooks/use-ambient-audio";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showInitialChoice, setShowInitialChoice] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const { startAudio } = useAmbientAudio();

  const backgroundImages = [mainImage, bg1, bg2, bg3, bg4, bg5];

  useEffect(() => {
    // Reset session on landing
    sessionManager.reset();
    // Show initial choice buttons after typewriter animation
    const timer = setTimeout(() => setShowInitialChoice(true), 4000);
    
    // Rotate background images every 3 seconds
    const bgTimer = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(bgTimer);
    };
  }, [backgroundImages.length]);

  const handleInitialChoice = (choice: 'suppress' | 'speak') => {
    sessionManager.setInitialChoice(choice);
    startAudio();
    setLocation('/questionnaire');
  };

  const handleStartJourney = () => {
    startAudio();
    setLocation('/questionnaire');
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Rotating background images */}
      <div className="absolute inset-0 bg-midnight">
        <img 
          src={backgroundImages[currentBgIndex]} 
          alt="Atmospheric Background" 
          className="w-full h-full object-cover opacity-90 transition-opacity duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/50 to-charcoal/70"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        
        <div className="space-y-8 animate-fade-in" style={{ animationDelay: '2s' }}>
          <p className="font-garamond text-lg md:text-xl text-warm-gray/80 max-w-3xl mx-auto leading-relaxed">
            "You find a community that promises stability, but only if you suppress the part of you that 
            dreams of something better — something purer."
          </p>
          
          {showInitialChoice && (
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12 animate-fade-in">
              <button 
                onClick={() => handleInitialChoice('suppress')}
                className="bg-midnight/80 hover:bg-subtle-purple/60 border border-warm-gray/30 hover:border-gold/50 px-8 py-4 rounded font-garamond text-lg transition-all duration-300 hover:animate-glow"
              >
                → Suppress the dream
              </button>
              <button 
                onClick={() => handleInitialChoice('speak')}
                className="bg-gold/20 hover:bg-gold/30 border border-gold/50 hover:border-gold px-8 py-4 rounded font-garamond text-lg transition-all duration-300 hover:animate-glow"
              >
                → Speak your dream aloud
              </button>
            </div>
          )}
        </div>
        
        <button 
          onClick={handleStartJourney}
          className="mt-16 bg-transparent border-2 border-gold hover:bg-gold hover:text-charcoal px-12 py-4 rounded font-cinzel text-xl transition-all duration-300 animate-fade-in"
          style={{ animationDelay: '2.5s' }}
        >
          Begin Journey
        </button>
      </div>
    </section>
  );
}
