"use client";

import { useState, useCallback, useMemo } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Heart, Sparkles } from "lucide-react";
import { useMusic } from "./music-context";

export default function MusicPlayer() {
  const [showPlayer, setShowPlayer] = useState(false);
  const {
    isPlaying,
    isMuted,
    volume,
    autoPlayBlocked,
    isSpecialDay,
    setVolume,
    togglePlay,
    toggleMute,
    forceAutoPlay,
  } = useMusic();

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  }, [setVolume]);

  const togglePlayer = useCallback(() => {
    setShowPlayer(prev => !prev);
  }, []);

  // Memoizar el botón principal para evitar re-renderizados
  const mainButton = useMemo(() => (
    <button
      onClick={togglePlayer}
      className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
      aria-label="Reproductor de música especial"
      style={{
        boxShadow: '0 0 30px rgba(236, 72, 153, 0.4), 0 0 60px rgba(236, 72, 153, 0.2)'
      }}
    >
      <div className="relative">
        <Music className="w-7 h-7" />
        {isPlaying && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center">
            <Heart className="w-2 h-2 text-white" />
          </div>
        )}
      </div>
    </button>
  ), [togglePlayer, isPlaying]);

  // Solo mostrar si es día especial
  if (!isSpecialDay) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {mainButton}

      {showPlayer && (
        <div className="absolute bottom-20 right-0 bg-gradient-to-br from-white/95 to-rose-50/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-rose-200 min-w-[320px] animate-slide-up">
          {/* Header especial del día 22 */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h3 className="text-xl font-bold text-rose-700">🎵 Nuestra Canción Especial</h3>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-sm text-rose-600 font-medium">"Entra en mi vida" - Sin Bandera</p>
            <p className="text-xs text-rose-500 mt-1 italic">✨ Solo disponible el día 22 ✨</p>
            
            {autoPlayBlocked && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-amber-600 italic bg-amber-50 px-3 py-2 rounded-lg">
                  Reproducción automática bloqueada por el navegador
                </p>
                <button
                  onClick={forceAutoPlay}
                  className="text-xs bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-rose-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
                >
                  🎵 Intentar de nuevo
                </button>
              </div>
            )}
          </div>

          {/* Controles principales con diseño especial */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <button
              onClick={togglePlay}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-lg"
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              style={{
                boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)'
              }}
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
            </button>

            <button
              onClick={toggleMute}
              className="bg-gradient-to-r from-rose-300 to-pink-300 hover:from-rose-400 hover:to-pink-400 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>

          {/* Control de volumen con diseño mejorado */}
          <div className="space-y-3">
            <label className="text-sm text-rose-600 font-medium flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Volumen
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-3 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider-special"
              />
              <div className="text-center mt-2">
                <span className="text-sm font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Estado del reproductor con indicadores visuales */}
          <div className="text-center mt-4">
            <div className="flex items-center justify-center gap-3">
              <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isPlaying ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium text-rose-600">
                {isPlaying ? '🎵 Reproduciendo' : '⏸️ Pausado'}
              </span>
            </div>
          </div>

          {/* Footer especial */}
          <div className="text-center mt-4 pt-3 border-t border-rose-200">
            <p className="text-xs text-rose-500 font-medium">
              💕 Música que hace latir nuestros corazones 💕
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider-special::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #e11d48, #ec4899);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
          border: 2px solid white;
        }

        .slider-special::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #e11d48, #ec4899);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
        }
      `}</style>
    </div>
  );
}
