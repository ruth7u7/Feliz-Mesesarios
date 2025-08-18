"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart, Sparkles, Star, Zap } from "lucide-react";
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
    <div className="text-center space-y-6 animate-fade-in relative overflow-hidden">
      {/* Fase 1: Corazones flotantes de entrada */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <Heart
              key={i}
              className="absolute text-rose-400 animate-heart-float"
              style={{
                left: `${20 + (i * 7)}%`,
                top: `${10 + (i * 8)}%`,
                fontSize: `${1.5 + Math.random()}rem`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Fase 2: Título principal con máquina de escribir */}
      {animationPhase >= 2 && (
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-rose-800 leading-tight animate-heart-bounce">
            {displayText}
            <span className="animate-pulse text-rose-600">|</span>
          </h1>
        </div>
      )}
      
      {/* Fase 3: Sparkles y efectos especiales */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-yellow-400 animate-heart-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${1 + Math.random()}rem`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1.5 + Math.random()}s`
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
            <p className="text-2xl md:text-3xl text-rose-600 font-medium flex items-center justify-center gap-3 animate-fade-in">
              <Zap className="w-8 h-8 text-yellow-500 animate-pulse" />
              Te amo{" "}
              <Heart className="w-8 h-8 text-red-500 fill-current animate-bounce" />
              <Zap className="w-8 h-8 text-yellow-500 animate-pulse" />
            </p>
            
            {/* Mensaje romántico con efecto de escritura */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-rose-200 max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-rose-700 italic leading-relaxed animate-fade-in">
                "Hoy es un día mágico porque eres mi lugar favorito, mi paz en los días difíciles y la razón por la que sonrío sin motivo. Cada latido de mi corazón late por ti. Te amo con todo mi ser, más allá de las palabras."
              </p>
            </div>
          </div>
          
          {/* Elementos decorativos animados */}
          <div className="flex justify-center space-x-6">
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" style={{ animationDelay: "0s" }} />
            <Heart className="w-7 h-7 text-rose-400 animate-bounce" style={{ animationDelay: "0.3s" }} />
            <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: "0.6s" }} />
            <Heart className="w-7 h-7 text-red-400 animate-bounce" style={{ animationDelay: "0.9s" }} />
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" style={{ animationDelay: "1.2s" }} />
          </div>
          
          {/* Contador de días especiales */}
          <div className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-3 rounded-full inline-block animate-pulse">
            <p className="text-lg font-bold">✨ Día Especial #22 ✨</p>
          </div>

          {/* QR Code */}
          <div className="mt-4 flex justify-center items-center">
            <QRCodeComponent 
              url={process.env.NEXT_PUBLIC_SITE_URL || "https://feliz-mesesarios.vercel.app"}
              size={96}
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      )}
      
      {/* Efectos de partículas flotantes continuos */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-rose-300 rounded-full animate-heart-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              opacity: 0.6 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
}