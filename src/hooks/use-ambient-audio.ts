import { useRef, useCallback } from 'react';
import ambientSound from '@assets/Eerie Ambient Sound Effect_1753600683301.mp3';

export function useAmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startAudio = useCallback(async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(ambientSound);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3; // Keep it subtle
      }

      await audioRef.current.play();
    } catch (error) {
      console.log('Audio autoplay prevented:', error);
      // Audio will need user interaction to play
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  return {
    startAudio,
    stopAudio,
    setVolume
  };
}
