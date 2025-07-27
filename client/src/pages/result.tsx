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
      return apiRequest("/api/agreement", "POST", agreementData);
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

  const handleAgreement = async (agrees: boolean) => {
    if (!result) return;
    
    setAgreed(agrees);
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
            </div>
          </div>
          
          <div className="mt-12 space-y-8">
            {agreed === null && (
              <div className="text-center">
                <h3 className="font-pirata text-xl text-gold mb-6">Do You Agree?</h3>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handleAgreement(true)}
                    disabled={recordAgreementMutation.isPending}
                    className="bg-green-600/20 hover:bg-green-600/30 border border-green-600/50 hover:border-green-600 px-8 py-3 rounded font-crimson text-lg transition-all duration-300 disabled:opacity-50"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => handleAgreement(false)}
                    disabled={recordAgreementMutation.isPending}
                    className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 hover:border-red-600 px-8 py-3 rounded font-crimson text-lg transition-all duration-300 disabled:opacity-50"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
            
            {agreed !== null && (
              <div className="text-center">
                <p className="font-crimson text-warm-gray mb-6">
                  Thank you for your response.
                </p>
                <button 
                  onClick={handleRestart}
                  className="bg-transparent border-2 border-gold hover:bg-gold hover:text-charcoal px-8 py-3 rounded font-crimson text-lg transition-all duration-300"
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
