"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Sparkles, Star } from "lucide-react";
import QRCodeComponent from "./qr-code";
import { images } from "@/lib/images";

interface ConditionalMessageProps {
  photos: string[];
}

export default function ConditionalMessage({ photos }: ConditionalMessageProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Mensaje especial que se mostrará solo el día 22
  const specialMessage = "Feliz 22, mi corazón de melón ❤️";

  useEffect(() => {
    // Iniciar secuencia de animaciones inmediatamente
    startAnimationSequence();
  }, []);

  const startAnimationSequence = () => {
    // Fase 1: Preparación (0.5s)
    setTimeout(() => {
      setAnimationPhase(1);
      setShowHearts(true);
    }, 500);

    // Fase 2: Título principal (1.5s)
    setTimeout(() => {
      setAnimationPhase(2);
      setCurrentIndex(0);
      setDisplayText(""); // Resetear el texto
    }, 1500);

    // Fase 3: Sparkles y efectos (7s) - CAMBIADO de 4000 a 7000
    setTimeout(() => {
      setAnimationPhase(3);
      setShowSparkles(true);
    }, 7000);

    // Fase 4: Mensaje final (9s) - CAMBIADO de 6000 a 9000
    setTimeout(() => {
      setAnimationPhase(4);
      setShowFinalMessage(true);
    }, 9000);
  };

  // Efecto para la máquina de escribir - CAMBIADO
  useEffect(() => {
    if (animationPhase === 2) {
      const message = specialMessage;
      let index = 0;
      let intervalId: NodeJS.Timeout | undefined;

      const typeNextChar = () => {
        if (index < message.length && animationPhase === 2) {
          setDisplayText(message.substring(0, index + 1));
          setCurrentIndex(index);
          index++;
        } else {
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
      };

      intervalId = setInterval(typeNextChar, 120);

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [animationPhase, specialMessage]);

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
    <div className="text-center animate-fade-in relative min-h-[100dvh] w-full max-w-screen px-3 sm:px-4 md:px-6 py-4 flex flex-col justify-center items-center overflow-x-hidden">
      {/* Fase 1: Corazones flotantes de entrada */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 2 }).map((_, i) => (
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
      )}

      {/* Fase 2: Título principal con máquina de escribir */}
      {animationPhase >= 2 && (
        <div className="space-y-4">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-rose-800 leading-tight animate-heart-bounce px-2 sm:px-4 max-w-[90vw] mx-auto break-words">
            {displayText}
            <span className="animate-pulse text-rose-600">|</span>
          </h1>
        </div>
      )}

      {/* Fase 3: Efectos minimalistas */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 2 }).map((_, i) => (
            <Heart
              key={i}
              className="absolute text-rose-300 animate-heart-float opacity-30"
              style={{
                left: `${35 + (i * 25)}%`,
                top: `${25 + (i * 20)}%`,
                fontSize: `${0.8 + Math.random() * 0.2}rem`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${3 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Fase 4: Mensaje romántico final */}
      {showFinalMessage && (
        <div className="space-y-6 animate-slide-up">
          {/* Mensaje secundario con efecto de aparición */}
          <div className="space-y-4">
            <p className="text-lg xs:text-xl sm:text-2xl text-rose-600 font-medium flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 animate-fade-in whitespace-nowrap">
              Te amo{" "}
              <Heart className="w-5 h-5 xs:w-6 xs:h-6 md:w-8 md:h-8 text-red-500 fill-current animate-bounce" />
            </p>

            {/* Mensaje romántico con efecto de escritura */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-3 sm:p-4 md:p-6 shadow-2xl border border-rose-200 w-[90vw] sm:w-[85vw] md:w-[80vw] max-w-md mx-auto max-h-[200px] overflow-y-auto custom-scrollbar">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-rose-700 italic leading-relaxed animate-fade-in">
                "Eres mi sol en los días grises, mi refugio en los momentos difíciles, y la razón por la que sonrío sin motivo. Te amo más que ayer y menos que mañana, porque cada día a tu lado es especial, único y lleno de luz.

                Prometo caminar a tu lado mientras tu me lo permita, y mientras tú quieras estar conmigo. Sé que nuestro amor no conoce límites: puede romper barreras, superar obstáculos y crecer más fuerte cada día, siempre que los dos lo queramos y luchemos juntos por él.

                Contigo aprendí que el amor verdadero es elegirnos todos los días, sostenernos en lo difícil, celebrar lo bonito y soñar con un futuro donde siempre estemos juntos."</p>
            </div>

            {/* Photo carousel section - SOLO en día especial (modo demostración) */}
            <div className="text-center space-y-4 w-full mt-[-20px]">
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
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentPhoto ? "bg-rose-500 w-6" : "bg-rose-300"
                        }`}
                      aria-label={`Ir a foto ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Elementos decorativos animados - minimalistas */}
          <div className="flex justify-center space-x-10">
            <Heart className="w-5 h-5 text-rose-400 animate-pulse opacity-60" style={{ animationDelay: "0.3s" }} />
            <Heart className="w-5 h-5 text-rose-400 animate-pulse opacity-60" style={{ animationDelay: "0.9s" }} />
          </div>

          {/* Mensaje final con gradiente */}
          <div className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-2.5 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full inline-block animate-pulse mx-auto w-auto max-w-full">
            <p className="text-xs xs:text-sm sm:text-base font-bold text-wrap">✨ Te elegí ayer, te elijo hoy y volveré a elegirte mañana ✨</p>
          </div>

          {/* QR Code */}
          {/* <div className="mt-4 flex justify-center items-center">
            <QRCodeComponent 
              url="https://felizmesesarios.vercel.app/"
              size={120}
              className="hover:scale-110 transition-transform duration-300 bg-white/90 p-3 rounded-xl shadow-lg"
            />
          </div> */}
        </div>
      )}

      {/* Efectos de partículas flotantes suaves */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-0.5 h-0.5 bg-rose-300 rounded-full animate-heart-float"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${20 + (i * 10)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${5 + Math.random() * 2}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

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
    </div>
  );
}
