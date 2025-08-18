"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { images } from "@/lib/images";
import ConditionalMessage from "./conditional-message";
import CountdownTimer from "./countdown-timer";
import MusicPlayer from "./music-player";
import HeartConfetti from "./heart-confetti";
import { useMusic } from "./music-context";

export default function HeroSection() {
  // Usar las imágenes desde el archivo de configuración
  const photos = images.hero.carousel;
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isSpecialDay, setIsSpecialDay] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false); // Modo demostración
  
  // Usar el contexto de música
  const { setIsSpecialDay: setMusicSpecialDay } = useMusic();

  useEffect(() => {
    // Verificar si es el día 22
    const today = new Date();
    const isDay22 = today.getDate() === 22 || demoMode; // Incluir modo demo
    setIsSpecialDay(isDay22);
    
    // Sincronizar con el contexto de música
    setMusicSpecialDay(isDay22);
  }, [demoMode, setMusicSpecialDay]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos.length]);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeImageModal();
      }
    };

    if (isImageModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isImageModalOpen]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart
          className="absolute top-20 left-10 text-pink-300 w-4 h-4 animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <Heart
          className="absolute top-32 right-16 text-rose-300 w-3 h-3 animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <Heart
          className="absolute bottom-40 left-20 text-pink-400 w-5 h-5 animate-bounce"
          style={{ animationDelay: "2s" }}
        />
        <Heart
          className="absolute bottom-60 right-12 text-rose-400 w-4 h-4 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center space-y-4 md:space-y-6">
        {/* Botón de demostración */}
        <div className="text-center mb-4">
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
              demoMode 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-rose-400 hover:bg-rose-500 text-white'
            }`}
            aria-label={demoMode ? "Desactivar modo demostración" : "Activar modo demostración"}
          >
            {demoMode ? '🎉 Modo Día 22 Activado' : '🎬 Ver Demostración Día 22'}
          </button>
          {demoMode && (
            <p className="text-xs text-rose-600 mt-2 italic">
              Modo demostración activado - Simula el día 22
            </p>
          )}
        </div>

        {/* Mensaje condicional o timer */}
        {isSpecialDay ? (
          <ConditionalMessage />
        ) : (
          <CountdownTimer />
        )}

        {/* Couple on motorcycle illustration - solo mostrar si no es día especial */}
        {!isSpecialDay && (
          <div className="relative animate-float">
            <Image
              src={images.hero.coupleMotorcycle}
              alt="Pareja en moto"
              width={400}
              height={300}
              className="w-48 h-36 md:w-64 md:h-48 lg:w-80 lg:h-60 object-contain drop-shadow-lg"
              priority
            />
          </div>
        )}

        {/* Photo carousel section - SOLO en día especial (modo demostración) */}
        {isSpecialDay && (
          <div className="text-center space-y-6 w-full">
            {/* Carousel para día especial */}
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              <div 
                className="relative h-40 sm:h-48 md:h-56 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={openImageModal}
              >
                <Image
                  src={photos[currentPhoto]}
                  alt={`Momento especial ${currentPhoto + 1}`}
                  fill
                  className="object-contain rounded-xl transition-all duration-500"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 384px"
                />
                {/* Overlay indicador de clic */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-xs bg-black/50 px-2 py-1 rounded-full">
                    Clic para ampliar
                  </div>
                </div>
              </div>

              {/* Carousel controls */}
              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-4 h-4 text-rose-600" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-4 h-4 text-rose-600" />
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center space-x-2 mt-4">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhoto(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentPhoto ? "bg-rose-500 w-6" : "bg-rose-300"
                    }`}
                    aria-label={`Ir a foto ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Botón de confeti - SIEMPRE disponible */}
        <div className="text-center mt-4">
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).triggerHeartConfetti) {
                (window as any).triggerHeartConfetti();
              }
            }}
            className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            aria-label="¡Más confeti de corazones!"
          >
            <Heart className="w-4 h-4" />
            ¡Más confeti! 🎉
          </button>
        </div>

        {/* Date */}
        {/* <div className="text-center">
          <p className="text-rose-500 font-medium text-sm md:text-base">
            22 de Septiembre, 2023
          </p>
        </div> */}
      </div>

      {/* Reproductor de música flotante */}
      <MusicPlayer />

      {/* Confeti de corazones */}
      <HeartConfetti />

      {/* Modal de imagen en pantalla completa */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Imagen en pantalla completa */}
            <Image
              src={photos[currentPhoto]}
              alt={`Momento especial ${currentPhoto + 1} - Vista completa`}
              width={800}
              height={600}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              priority
            />
            
            {/* Controles del modal */}
            <div className="absolute top-4 right-4 flex gap-2">
              {/* Botón cerrar */}
              <button
                onClick={closeImageModal}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                aria-label="Cerrar vista completa"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navegación en pantalla completa */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Indicador de posición */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {currentPhoto + 1} de {photos.length}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
