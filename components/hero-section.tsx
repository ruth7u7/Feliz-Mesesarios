"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { images } from "@/lib/images";
import ConditionalMessage from "./conditional-message";
import CountdownTimer from "./countdown-timer";
import MusicPlayer from "./music-player";
import HeartConfetti from "./heart-confetti";
import { useMusic } from "./music-context";

export default function HeroSection() {
  const [isSpecialDay, setIsSpecialDay] = useState(false);
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

      <div className="max-w-4xl w-full flex flex-col items-center space-y-4 md:space-y-6 relative z-10">
        {/* Botón de demostración - solo mostrar si no estamos en modo especial */}
        {!isSpecialDay && (
          <div className="text-center mb-4">
            <button
              onClick={() => setDemoMode(true)}
              className="bg-rose-400/90 hover:bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
              aria-label="Activar modo demostración"
            >
              🎬 Ver Demostración Día 22
            </button>
          </div>
        )}

        {/* Mensaje condicional o timer */}
        {isSpecialDay ? (
          <ConditionalMessage 
            photos={images.hero.carousel} 
            demoMode={demoMode}
            setDemoMode={setDemoMode}
          />
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
