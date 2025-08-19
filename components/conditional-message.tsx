"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart, Sparkles, Star } from "lucide-react";
import QRCodeComponent from "./qr-code";

export default function ConditionalMessage() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  
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
      let intervalId;
      
      const typeNextChar = () => {
        if (index < message.length && animationPhase === 2) {
          setDisplayText(message.substring(0, index + 1));
          setCurrentIndex(index);
          index++;
        } else {
          clearInterval(intervalId);
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
  
  return (
    <div className="text-center space-y-6 animate-fade-in relative min-h-screen p-4 flex flex-col justify-center">
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-rose-800 leading-tight animate-heart-bounce px-4">
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
            <p className="text-xl md:text-2xl text-rose-600 font-medium flex items-center justify-center gap-2 md:gap-3 animate-fade-in">
              Te amo{" "}
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-500 fill-current animate-bounce" />
            </p>
            
            {/* Mensaje romántico con efecto de escritura */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-2xl border border-rose-200 max-w-md mx-auto">
              <p className="text-sm md:text-base lg:text-lg text-rose-700 italic leading-relaxed animate-fade-in">
                "Hoy es un día mágico porque eres mi lugar favorito, mi paz en los días difíciles y la razón por la que sonrío sin motivo. Cada latido de mi corazón late por ti. Te amo con todo mi ser, más allá de las palabras."
              </p>
            </div>
          </div>
          
          {/* Elementos decorativos animados - minimalistas */}
          <div className="flex justify-center space-x-10">
            <Heart className="w-5 h-5 text-rose-400 animate-pulse opacity-60" style={{ animationDelay: "0.3s" }} />
            <Heart className="w-5 h-5 text-rose-400 animate-pulse opacity-60" style={{ animationDelay: "0.9s" }} />
          </div>
          
          {/* Mensaje final con gradiente */}
          <div className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-3 md:px-6 py-2 md:py-3 rounded-full inline-block animate-pulse mx-2">
            <p className="text-sm md:text-base font-bold">✨ Te elegí ayer, te elijo hoy y volveré a elegirte mañana ✨</p>
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
    </div>
  );
}