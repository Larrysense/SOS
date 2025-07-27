import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { calculateResult } from "@/lib/archetypes";
import { sessionManager } from "@/lib/session-manager";
import type { Archetype } from "@/lib/archetypes";

// Import result background images
import bg1 from "@assets/download (27)_1753600683305.jpeg";
import bg2 from "@assets/download (28)_1753600683305.jpeg";
import bg3 from "@assets/download (29)_1753600683304.jpeg";
import bg4 from "@assets/download (30)_1753600683303.jpeg";
import bg5 from "@assets/download (31) - Copy_1753600683304.jpeg";

export default function Result() {
  const [, setLocation] = useLocation();
  const [result, setResult] = useState<Archetype | null>(null);
  const [sessionData, setSessionData] = useState(sessionManager.getSession());
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [bg1, bg2, bg3, bg4, bg5];

  useEffect(() => {
    const session = sessionManager.getSession();
    if (!session.startTime || session.answers.length === 0) {
      // No valid session, redirect to landing
      setLocation('/');
      return;
    }

    sessionManager.completeSession();
    const calculatedResult = calculateResult(session);
    setResult(calculatedResult);
    setSessionData(session);

    // Slow rotating background for result page
    const bgTimer = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(bgTimer);
  }, [setLocation, backgroundImages.length]);

  const handleRestart = () => {
    sessionManager.reset();
    setLocation('/');
  };

  const handleShare = async () => {
    if (!result) return;

    const shareText = `I am "${result.title}" - ${result.description}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sense of Self (SOS) Result',
          text: shareText,
          url: window.location.origin
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Result copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="font-garamond text-warm-gray">Calculating your archetype...</p>
        </div>
      </div>
    );
  }

  const totalTime = sessionData.totalTime ? Math.round(sessionData.totalTime / 1000) : 0;
  const averageResponseTime = sessionData.answers.length > 0 
    ? Math.round(sessionData.answers.reduce((sum, answer) => sum + answer.responseTime, 0) / sessionData.answers.length / 1000)
    : 0;

  return (
    <section className="min-h-screen relative">
      <div className="absolute inset-0 bg-charcoal">
        <img 
          src={backgroundImages[currentBgIndex]}
          alt="Result Background" 
          className="w-full h-full object-cover opacity-60 transition-opacity duration-2000" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-midnight/90"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="result-card max-w-4xl mx-auto p-12 rounded-lg animate-fade-in">
          <div className="text-center">
            <h1 className="font-gothic text-3xl md:text-4xl font-semibold text-gold mb-8 animate-fade-in tracking-wide">
              {result.title}
            </h1>
            
            <p className="font-crimson text-xl md:text-2xl text-warm-gray mb-8 leading-relaxed animate-fade-in" 
               style={{ animationDelay: '0.5s' }}>
              {result.description}
            </p>
            
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="bg-charcoal/50 p-6 rounded-lg border border-gold/30">
                <h3 className="font-pirata text-lg text-gold mb-2">Self:</h3>
                <p className="font-crimson text-warm-gray">{result.self}</p>
              </div>
              
              <div className="bg-charcoal/50 p-6 rounded-lg border border-subtle-purple/30">
                <h3 className="font-pirata text-lg text-subtle-purple mb-2">System Verdict:</h3>
                <p className="font-crimson text-warm-gray font-mono">{result.systemVerdict}</p>
              </div>
            </div>
            
            <div className="mt-8 text-sm text-warm-gray/60 font-crimson italic animate-fade-in" 
                 style={{ animationDelay: '1.5s' }}>
              <p>"The system has recorded your journey..."</p>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
            <button 
              onClick={handleRestart}
              className="bg-transparent border-2 border-gold hover:bg-gold hover:text-charcoal px-8 py-3 rounded font-garamond text-lg transition-all duration-300"
            >
              Begin Again
            </button>
            <button 
              onClick={handleShare}
              className="bg-gold/20 hover:bg-gold/30 border border-gold/50 hover:border-gold px-8 py-3 rounded font-garamond text-lg transition-all duration-300"
            >
              Do You Agree?
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
