"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";
import QRCodeComponent from "./qr-code";
import HeartConfetti from "./heart-confetti";

interface ConditionalMessageProps {
  photos: string[];
  demoMode: boolean;
  setDemoMode: (demo: boolean) => void;
}

// Constantes para mejor mantenimiento
const SPECIAL_MESSAGE = "Feliz 22, mi corazón de melón ❤️";
const TYPING_SPEED = 120;
const PHOTO_CAROUSEL_INTERVAL = 3000;

// Timing de animaciones
const ANIMATION_TIMINGS = {
  PREPARATION: 500,
  MAIN_TITLE: 1500,
  SPARKLES: 7000,
  FINAL_MESSAGE: 9000,
} as const;

export default function ConditionalMessage({ 
  photos, 
  demoMode, 
  setDemoMode 
}: ConditionalMessageProps) {
  // Estados organizados por funcionalidad
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Estados de animación
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  
  // Estados del modal de fotos
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Función para limpiar y reiniciar animaciones
  const resetAnimation = useCallback(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setAnimationPhase(0);
    setShowHearts(false);
    setShowSparkles(false);
    setShowFinalMessage(false);
  }, []);

  // Secuencia de animaciones mejorada
  const startAnimationSequence = useCallback(() => {
    resetAnimation();
    
    // Fase 1: Preparación
    const timer1 = setTimeout(() => {
      setAnimationPhase(1);
      setShowHearts(true);
    }, ANIMATION_TIMINGS.PREPARATION);

    // Fase 2: Título principal
    const timer2 = setTimeout(() => {
      setAnimationPhase(2);
      setCurrentIndex(0);
      setDisplayText("");
    }, ANIMATION_TIMINGS.MAIN_TITLE);

    // Fase 3: Sparkles y efectos
    const timer3 = setTimeout(() => {
      setAnimationPhase(3);
      setShowSparkles(true);
    }, ANIMATION_TIMINGS.SPARKLES);

    // Fase 4: Mensaje final
    const timer4 = setTimeout(() => {
      setAnimationPhase(4);
      setShowFinalMessage(true);
    }, ANIMATION_TIMINGS.FINAL_MESSAGE);

    // Cleanup function para limpiar timers si el componente se desmonta
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [resetAnimation]);

  // Iniciar animaciones al montar el componente
  useEffect(() => {
    const cleanup = startAnimationSequence();
    return cleanup;
  }, [startAnimationSequence]);

  // Efecto de máquina de escribir mejorado
  useEffect(() => {
    if (animationPhase !== 2) return;

    let index = 0;
    const intervalId = setInterval(() => {
      if (index < SPECIAL_MESSAGE.length) {
        setDisplayText(SPECIAL_MESSAGE.substring(0, index + 1));
        setCurrentIndex(index);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, TYPING_SPEED);

    return () => clearInterval(intervalId);
  }, [animationPhase]);

  // Carrusel automático de fotos
  useEffect(() => {
    if (!photos.length) return;
    
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, PHOTO_CAROUSEL_INTERVAL);
    
    return () => clearInterval(timer);
  }, [photos.length]);

  // Navegación de fotos
  const nextPhoto = useCallback(() => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Gestión del modal de imagen
  const openImageModal = useCallback(() => {
    setIsImageModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);

  // Efecto para cerrar modal con Escape
  useEffect(() => {
    if (!isImageModalOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeImageModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isImageModalOpen, closeImageModal]);

  // Función para activar confeti
  const triggerConfetti = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).triggerHeartConfetti) {
      (window as any).triggerHeartConfetti();
    }
  }, []);

  // Componente para corazones flotantes
  const FloatingHearts = ({ count = 2, className = "" }) => (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Heart
          key={i}
          className="absolute text-rose-400 animate-heart-float opacity-50"
          style={{
            left: `${30 + (i * 35)}%`,
            top: `${20 + (i * 15)}%`,
            fontSize: `${1 + Math.random() * 0.2}rem`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  // Validación de props
  if (!photos || photos.length === 0) {
    console.warn('ConditionalMessage: No se proporcionaron fotos');
  }

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(244, 63, 94, 0.3) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(244, 63, 94, 0.3);
          border-radius: 2px;
        }
        
        @keyframes heart-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 0.8; }
        }
        
        @keyframes heart-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-heart-float { animation: heart-float 4s ease-in-out infinite; }
        .animate-heart-bounce { animation: heart-bounce 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
      `}</style>

      <div className="text-center animate-fade-in relative min-h-screen w-full max-w-screen flex flex-col items-center overflow-x-hidden">
        {/* Header fijo con botón de demo */}
        <header className="w-full bg-gradient-to-b from-white/80 to-transparent sticky top-0 py-2 z-50">
          <div className="text-center max-w-md mx-auto px-4">
            <button
              onClick={() => setDemoMode(false)}
              className="bg-green-500/90 hover:bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Desactivar modo demostración"
            >
              🎉 Volver al Modo Normal
            </button>
            <p className="text-xs text-rose-600 italic mt-1 text-wrap backdrop-blur-sm bg-white/30 rounded-full px-2 py-0.5 inline-block">
              Modo demostración activado
            </p>
          </div>
        </header>

        {/* Confeti de corazones */}
        <HeartConfetti />
        
        {/* Contenedor principal */}
        <main className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 mt-8 flex-1 flex flex-col items-center justify-center">
          
          {/* Fase 1: Corazones flotantes de entrada */}
          {showHearts && <FloatingHearts count={2} />}

          {/* Fase 2: Título principal con máquina de escribir */}
          {animationPhase >= 2 && (
            <section className="space-y-2 mt-20">
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-rose-800 leading-tight animate-heart-bounce px-2 sm:px-4 max-w-[90vw] mx-auto break-words">
                {displayText}
                <span className="animate-pulse text-rose-600">|</span>
              </h1>
            </section>
          )}

          {/* Fase 3: Efectos minimalistas */}
          {showSparkles && (
            <FloatingHearts 
              count={2} 
              className="opacity-30"
            />
          )}

          {/* Fase 4: Mensaje romántico final */}
          {showFinalMessage && (
            <section className="space-y-6 animate-slide-up">
              {/* Mensaje secundario */}
              <div className="space-y-4 mt-4">
                <p className="text-lg xs:text-xl sm:text-2xl text-rose-600 font-medium flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 animate-fade-in whitespace-nowrap">
                  Te amo{" "}
                  <Heart className="w-5 h-5 xs:w-6 xs:h-6 md:w-8 md:h-8 text-red-500 fill-current animate-bounce" />
                </p>

                {/* Slider de Fotos */}
                {photos && photos.length > 0 && (
                  <div className="w-full max-w-sm mx-auto mb-6 animate-fade-in">
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-rose-200">
                      {/* Contenedor de la imagen */}
                      <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden cursor-pointer group" onClick={openImageModal}>
                        <Image
                          src={photos[currentPhoto]}
                          alt={`Momento especial ${currentPhoto + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          priority={currentPhoto === 0}
                        />
                        
                        {/* Overlay para indicar que es clickeable */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-2">
                            <span className="text-white text-sm font-medium">Ver en grande</span>
                          </div>
                        </div>
                      </div>

                      {/* Controles de navegación */}
                      {photos.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevPhoto();
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/95 text-rose-600 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-400"
                            aria-label="Foto anterior"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextPhoto();
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/95 text-rose-600 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-400"
                            aria-label="Siguiente foto"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {/* Indicadores de posición */}
                      {photos.length > 1 && (
                        <div className="flex justify-center space-x-2 mt-3">
                          {photos.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentPhoto(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                                index === currentPhoto
                                  ? 'bg-rose-500 w-6'
                                  : 'bg-rose-200 hover:bg-rose-300'
                              }`}
                              aria-label={`Ir a foto ${index + 1}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Contador de fotos */}
                      <div className="text-center mt-2">
                        <span className="text-xs text-rose-500 font-medium">
                          {currentPhoto + 1} de {photos.length}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mensaje romántico */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-3 sm:p-4 md:p-6 shadow-2xl border border-rose-200 w-[90vw] sm:w-[85vw] md:w-[80vw] max-w-md mx-auto max-h-[200px] overflow-y-auto custom-scrollbar">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-rose-700 italic leading-relaxed animate-fade-in">
                    "Eres mi sol en los días grises, mi refugio en los momentos difíciles, y la razón por la que sonrío sin motivo. Te amo más que ayer y menos que mañana, porque cada día a tu lado es especial, único y lleno de luz.

                    Prometo caminar a tu lado mientras tu me lo permitas, y mientras tú quieras estar conmigo. Sé que nuestro amor no conoce límites: puede romper barreras, superar obstáculos y crecer más fuerte cada día, siempre que los dos lo queramos y luchemos juntos por él.

                    Contigo aprendí que el amor verdadero es elegirnos todos los días, sostenernos en lo difícil, celebrar lo bonito y soñar con un futuro donde siempre estemos juntos."
                  </p>
                </div>

                {/* Elementos decorativos y acciones */}
                <div className="space-y-6">
                  {/* Elementos decorativos animados */}
                  <div className="flex justify-center space-x-10" role="presentation">
                    <Heart className="w-5 h-5 text-rose-400 animate-pulse opacity-60" style={{ animationDelay: "0.3s" }} />
                    <Heart className="w-5 h-5 text-rose-400 animate-pulse opacity-60" style={{ animationDelay: "0.9s" }} />
                  </div>

                  {/* Mensaje final con gradiente */}
                  <div className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-2.5 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full inline-block animate-pulse mx-auto w-auto max-w-full">
                    <p className="text-xs xs:text-sm sm:text-base font-bold text-wrap">
                      ✨ Te elegí ayer, te elijo hoy y volveré a elegirte mañana ✨
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Botón de confeti flotante */}
          {showFinalMessage && (
            <button
              onClick={triggerConfetti}
              className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-50 bg-rose-400/90 hover:bg-rose-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm group animate-bounce-slow focus:outline-none focus:ring-2 focus:ring-rose-400"
              aria-label="¡Más confeti de corazones!"
            >
              <div className="relative">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
              </div>
            </button>
          )}
        </main>

        {/* Modal de imagen en pantalla completa */}
        {isImageModalOpen && photos.length > 0 && (
          <div
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={closeImageModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-modal-title"
          >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
              <h2 id="image-modal-title" className="sr-only">
                Visualizador de imágenes - Imagen {currentPhoto + 1} de {photos.length}
              </h2>
              
              {/* Contenedor de la imagen con dimensiones definidas */}
              <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={photos[currentPhoto]}
                  alt={`Momento especial ${currentPhoto + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Navegación en pantalla completa */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevPhoto();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextPhoto();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Indicador de posición */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm z-10">
                {currentPhoto + 1} de {photos.length}
              </div>

              {/* Botón de cerrar */}
              <button
                onClick={closeImageModal}
                className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
                aria-label="Cerrar visualizador"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}