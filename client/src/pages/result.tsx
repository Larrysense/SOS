import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { calculateResult } from "@/lib/archetypes";
import { sessionManager } from "@/lib/session-manager";
import { apiRequest } from "@/lib/queryClient";
import type { Archetype } from "@/lib/archetypes";

// Import result background image
import resultBg from "@assets/download (27)_1753602961212.jpeg";
import { useMutation } from "@tanstack/react-query";

export default function Result() {
  const [, setLocation] = useLocation();
  const [result, setResult] = useState<Archetype | null>(null);
  const [sessionData, setSessionData] = useState(sessionManager.getSession());
  const [agreed, setAgreed] = useState<boolean | null>(null);

  const recordAgreementMutation = useMutation({
    mutationFn: async (agreementData: { archetype: string; agreed: boolean }) => {
      return apiRequest("POST", "/api/agreement", agreementData);
    },
    onError: (error) => {
      console.error("Error recording agreement:", error);
      // Still set agreed state even if recording fails
      // This prevents the UI from being stuck
    },
  });

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
  }, [setLocation]);

  const handleRestart = () => {
    sessionManager.reset();
    setLocation('/');
  };

  const handleAgreement = (agrees: boolean) => {
    if (!result) return;
    
    // Set UI state immediately for better UX
    setAgreed(agrees);
    
    // Record to database in background
    recordAgreementMutation.mutate({
      archetype: result.title,
      agreed: agrees
    });
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
          src={resultBg}
          alt="Result Background" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="result-card max-w-4xl mx-auto p-12 rounded-lg animate-fade-in">
          <div className="text-center">
            <div className="bg-black/90 backdrop-blur-md p-8 rounded-xl border-2 border-gold/60 shadow-2xl mb-8">
              <h1 className="font-gothic text-4xl md:text-5xl font-bold text-gold mb-6 animate-fade-in tracking-wide drop-shadow-lg">
                {result.title}
              </h1>
              
              <p className="font-crimson text-xl md:text-2xl text-white mb-4 leading-relaxed animate-fade-in font-medium" 
                 style={{ animationDelay: '0.5s' }}>
                {result.description}
              </p>
            </div>
            
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg border-2 border-gold/60 shadow-2xl">
                <h3 className="font-pirata text-xl text-gold mb-3 font-bold">Self:</h3>
                <p className="font-crimson text-white text-lg leading-relaxed">{result.self}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 space-y-8">
            {agreed === null && (
              <div className="text-center bg-black/90 backdrop-blur-md p-8 rounded-xl border-2 border-gold/50 shadow-2xl">
                <h3 className="font-pirata text-2xl text-gold mb-8 font-bold tracking-wide">Do You Agree?</h3>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <button 
                    onClick={() => handleAgreement(true)}
                    disabled={recordAgreementMutation.isPending}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border-2 border-green-400 hover:border-green-300 text-white font-bold px-10 py-4 rounded-lg font-crimson text-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 hover:animate-pulse"
                  >
                    YES
                  </button>
                  <button 
                    onClick={() => handleAgreement(false)}
                    disabled={recordAgreementMutation.isPending}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 border-2 border-red-400 hover:border-red-300 text-white font-bold px-10 py-4 rounded-lg font-crimson text-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 hover:animate-pulse"
                  >
                    NO
                  </button>
                </div>
              </div>
            )}
            
            {agreed !== null && (
              <div className="text-center bg-black/90 backdrop-blur-md p-8 rounded-xl border-2 border-gold/50 shadow-2xl">
                <p className="font-crimson text-white text-xl mb-6 font-medium">
                  Thank you for your response.
                </p>
                <button 
                  onClick={handleRestart}
                  className="bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-gold border-2 border-gold hover:border-yellow-300 text-black font-bold px-10 py-4 rounded-lg font-crimson text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Begin Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
