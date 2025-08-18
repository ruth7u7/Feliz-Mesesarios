"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  autoPlayBlocked: boolean;
  attemptCount: number;
  setIsPlaying: (playing: boolean) => void;
  setIsMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
  setAutoPlayBlocked: (blocked: boolean) => void;
  setAttemptCount: (count: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  togglePlay: () => Promise<void>;
  toggleMute: () => void;
  forceAutoPlay: () => Promise<void>;
  stopMusic: () => void;
  isSpecialDay: boolean;
  setIsSpecialDay: (special: boolean) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}

interface MusicProviderProps {
  children: ReactNode;
}

export function MusicProvider({ children }: MusicProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [autoPlayBlocked, setAutoPlayBlocked] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isSpecialDay, setIsSpecialDay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Cargar estado guardado al inicializar
  useEffect(() => {
    const savedVolume = localStorage.getItem('music-volume');
    const savedMuted = localStorage.getItem('music-muted');

    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
    if (savedMuted) {
      setIsMuted(JSON.parse(savedMuted));
    }
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem('music-volume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('music-muted', JSON.stringify(isMuted));
  }, [isMuted]);

  // Sincronizar estado del audio con el estado local
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Función para detener la música
  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setAutoPlayBlocked(false);
    setAttemptCount(0);
  }, []);

  // Múltiples estrategias para reproducción automática
  const attemptAutoPlay = useCallback(async (strategy: 'normal' | 'delayed' = 'normal') => {
    if (audioRef.current && attemptCount < 2 && isSpecialDay) {
      try {
        if (strategy === 'delayed') {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
          setAutoPlayBlocked(false);

        } else {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
          setAutoPlayBlocked(false);
        }

        console.log(`Reproducción automática exitosa con estrategia: ${strategy}`);

      } catch (error) {
        console.log(`Estrategia ${strategy} falló:`, error);
        setAttemptCount(prev => prev + 1);

        if (strategy === 'normal' && attemptCount === 0) {
          setTimeout(() => attemptAutoPlay('delayed'), 2000);
        } else {
          setAutoPlayBlocked(true);
          setIsPlaying(false);
        }
      }
    }
  }, [attemptCount, isSpecialDay]);

  // Efecto para controlar la música basado en si es día especial
  useEffect(() => {
    if (isSpecialDay) {
      // Es día especial - intentar reproducir música
      attemptAutoPlay();
    } else {
      // No es día especial - detener música
      stopMusic();
    }
  }, [isSpecialDay, attemptAutoPlay, stopMusic]);

  // Función para reproducir/pausar
  const togglePlay = useCallback(async () => {
    if (audioRef.current && isSpecialDay) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
          setAutoPlayBlocked(false);
        }
      } catch (error) {
        console.log("Error al reproducir:", error);
        setAutoPlayBlocked(true);
      }
    }
  }, [isPlaying, isSpecialDay]);

  // Función para silenciar/activar sonido
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  }, [isMuted]);

  // Función para forzar reproducción automática
  const forceAutoPlay = useCallback(async () => {
    if (isSpecialDay) {
      setAttemptCount(0);
      setAutoPlayBlocked(false);

      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
          setAutoPlayBlocked(false);
        } catch (error) {
          console.log("Error al forzar reproducción:", error);
          setAutoPlayBlocked(true);
        }
      }
    }
  }, [isSpecialDay]);

  const value: MusicContextType = {
    isPlaying,
    isMuted,
    volume,
    autoPlayBlocked,
    attemptCount,
    setIsPlaying,
    setIsMuted,
    setVolume,
    setAutoPlayBlocked,
    setAttemptCount,
    audioRef,
    togglePlay,
    toggleMute,
    forceAutoPlay,
    stopMusic,
    isSpecialDay,
    setIsSpecialDay,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* Elemento de audio global */}
      <audio
        ref={audioRef}
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        onError={() => console.log("Error al cargar el audio")}
        loop
      >
        <source src="/Sin Bandera ; Entra en mi vida - Letra.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </MusicContext.Provider>
  );
}
