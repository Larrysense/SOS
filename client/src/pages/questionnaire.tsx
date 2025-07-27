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

  useEffect(() => {
    // Initialize session if not already started
    if (!sessionManager.getSession().startTime) {
      sessionManager.startSession();
    }
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

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
  
  // Get background image based on question groups
  const backgroundImages = [bg1, bg2, bg3, bg4, bg5];
  const currentBg = backgroundImages[Math.floor(currentQuestionIndex / 4) % backgroundImages.length];

  return (
    <section className="min-h-screen relative">
      <div className="absolute inset-0 transition-all duration-1000 bg-charcoal">
        <img 
          src={currentBg}
          alt="Atmospheric Background" 
          className="w-full h-full object-cover opacity-40 transition-opacity duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 to-charcoal/90"></div>
      </div>
      
      <div className="question-overlay min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Progress Indicator */}
          <div className="mb-8">
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={questions.length} 
            />
          </div>

          {/* Question Content */}
          <div 
            className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}
          >
            <h2 className="font-crimson text-2xl md:text-3xl text-warm-gray mb-12 leading-relaxed">
              {question.text}
            </h2>
            
            <div className="space-y-6 max-w-2xl mx-auto">
              <button
                onClick={() => handleAnswer('A')}
                disabled={isTransitioning}
                className="w-full bg-midnight/60 hover:bg-subtle-purple/40 border border-warm-gray/30 hover:border-gold/50 p-6 rounded-lg text-left transition-all duration-300 hover:animate-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-garamond text-lg">{question.optionA.text}</span>
              </button>
              
              <button
                onClick={() => handleAnswer('B')}
                disabled={isTransitioning}
                className="w-full bg-midnight/60 hover:bg-subtle-purple/40 border border-warm-gray/30 hover:border-gold/50 p-6 rounded-lg text-left transition-all duration-300 hover:animate-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-garamond text-lg">{question.optionB.text}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
