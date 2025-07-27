import type { Question } from "./questions";

export interface SessionData {
  startTime: number | null;
  initialChoice: 'suppress' | 'speak' | null;
  answers: Array<{
    questionId: number;
    selectedOption: 'A' | 'B';
    responseTime: number;
    kafkaWeight: number;
    dostoevskyWeight: number;
  }>;
  totalTime: number | null;
}

class SessionManager {
  private readonly STORAGE_KEY = 'sosSessionData';

  getSession(): SessionData {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load session data:', error);
    }
    
    return this.getDefaultSession();
  }

  private getDefaultSession(): SessionData {
    return {
      startTime: null,
      initialChoice: null,
      answers: [],
      totalTime: null
    };
  }

  private saveSession(session: SessionData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
      console.error('Failed to save session data:', error);
    }
  }

  setInitialChoice(choice: 'suppress' | 'speak'): void {
    const session = this.getSession();
    session.initialChoice = choice;
    this.saveSession(session);
  }

  startSession(): void {
    const session = this.getSession();
    if (!session.startTime) {
      session.startTime = Date.now();
      this.saveSession(session);
    }
  }

  recordAnswer(question: Question, selectedOption: 'A' | 'B', responseTime: number): void {
    const session = this.getSession();
    const option = selectedOption === 'A' ? question.optionA : question.optionB;
    
    session.answers.push({
      questionId: question.id,
      selectedOption,
      responseTime,
      kafkaWeight: option.kafkaWeight,
      dostoevskyWeight: option.dostoevskyWeight
    });

    this.saveSession(session);
  }

  completeSession(): void {
    const session = this.getSession();
    if (session.startTime && !session.totalTime) {
      session.totalTime = Date.now() - session.startTime;
      this.saveSession(session);
    }
  }

  reset(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const sessionManager = new SessionManager();
