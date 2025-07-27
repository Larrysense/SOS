import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import backgroundImage from "@assets/Untitled_1753600683302.jpg";
import { sessionManager } from "@/lib/session-manager";
import { useAmbientAudio } from "@/hooks/use-ambient-audio";
import TypewriterText from "@/components/typewriter-text";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showInitialChoice, setShowInitialChoice] = useState(false);
  const { startAudio } = useAmbientAudio();

  useEffect(() => {
    // Reset session on landing
    sessionManager.reset();
    // Show initial choice buttons after typewriter animation
    const timer = setTimeout(() => setShowInitialChoice(true), 4000);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Background using the provided blue image */}
      <div className="absolute inset-0 bg-midnight">
        <img 
          src={backgroundImage} 
          alt="Gothic Background" 
          className="w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 to-charcoal/90"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="font-gothic text-5xl md:text-7xl font-semibold text-gold mb-8 animate-fade-in tracking-wider">
          SENSE OF SELF
        </h1>
        <p className="font-pirata text-2xl md:text-3xl text-warm-gray mb-4 animate-fade-in" 
           style={{ animationDelay: '0.5s' }}>
          (SOS)
        </p>
        
        <div className="font-garamond text-xl md:text-2xl text-warm-gray/90 mb-12 animate-fade-in leading-relaxed" 
             style={{ animationDelay: '1s' }}>
          <TypewriterText text="Traverse in this journey to explore the system that promises to guide us." />
        </div>
        
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
