import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { questions } from "@/lib/questions";
import { sessionManager } from "@/lib/session-manager";
import ProgressBar from "@/components/progress-bar";

// Import background images
import bg1 from "@assets/download (27)_1753600683305.jpeg";
import bg2 from "@assets/download (28)_1753600683305.jpeg";
import bg3 from "@assets/download (29)_1753600683304.jpeg";
import bg4 from "@assets/download (30)_1753600683303.jpeg";
import bg5 from "@assets/download (31) - Copy_1753600683304.jpeg";

export default function Questionnaire() {
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [bg1, bg2, bg3, bg4, bg5];

  useEffect(() => {
    // Initialize session if not already started
    if (!sessionManager.getSession().startTime) {
      sessionManager.startSession();
    }
    setQuestionStartTime(Date.now());

    // Cycle background images every 4 seconds
    const bgTimer = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, 4000);

    return () => clearInterval(bgTimer);
  }, [currentQuestionIndex, backgroundImages.length]);

  const handleAnswer = (selectedOption: 'A' | 'B') => {
    const responseTime = Date.now() - questionStartTime;
    const question = questions[currentQuestionIndex];
    
    sessionManager.recordAnswer(question, selectedOption, responseTime);
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestionIndex + 1 >= questions.length) {
        setLocation('/result');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }
    }, 800);
  };

  if (currentQuestionIndex >= questions.length) {
    return null;
  }

  const question = questions[currentQuestionIndex];

  return (
    <section className="min-h-screen relative">
      <div className="absolute inset-0 transition-all duration-1000 bg-charcoal">
        <img 
          src={backgroundImages[currentBgIndex]}
          alt="Atmospheric Background" 
          className="w-full h-full object-cover opacity-30 transition-opacity duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-charcoal/80 to-midnight/90"></div>
      </div>
      
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Progress Indicator */}
          <div className="mb-8 bg-black/70 backdrop-blur-sm rounded-lg p-4">
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={questions.length} 
            />
          </div>

          {/* Question Content */}
          <div 
            className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}
          >
            <div className="bg-black/80 backdrop-blur-md rounded-lg p-8 mb-8 border border-gold/30 shadow-2xl">
              <h2 className="font-crimson text-2xl md:text-3xl text-white mb-8 leading-relaxed font-semibold">
                {question.text}
              </h2>
            </div>
            
            <div className="space-y-6 max-w-2xl mx-auto">
              <button
                onClick={() => handleAnswer('A')}
                disabled={isTransitioning}
                className="w-full bg-black/80 hover:bg-black/90 backdrop-blur-md border-2 border-warm-gray/50 hover:border-gold/80 p-6 rounded-lg text-left transition-all duration-300 hover:animate-glow disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl"
              >
                <span className="font-crimson text-lg text-white font-medium">{question.optionA.text}</span>
              </button>
              
              <button
                onClick={() => handleAnswer('B')}
                disabled={isTransitioning}
                className="w-full bg-black/80 hover:bg-black/90 backdrop-blur-md border-2 border-warm-gray/50 hover:border-gold/80 p-6 rounded-lg text-left transition-all duration-300 hover:animate-glow disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl"
              >
                <span className="font-crimson text-lg text-white font-medium">{question.optionB.text}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
