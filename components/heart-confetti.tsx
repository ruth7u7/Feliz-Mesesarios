"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  speed: number;
  delay: number;
  color: string;
  animationType: 'fall' | 'bounce' | 'float' | 'sparkle';
}

export default function HeartConfetti() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Activar el confeti después de un pequeño delay
    const timer = setTimeout(() => {
      setIsActive(true);
      generateHearts();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const generateHearts = useCallback(() => {
    const newHearts: HeartParticle[] = [];
    const colors = [
      '#ff6b9d', '#ff8fab', '#ffb3d1', '#ff69b4', 
      '#ff1493', '#ff69b4', '#ffb6c1', '#ffc0cb'
    ];
    const animationTypes: ('fall' | 'bounce' | 'float' | 'sparkle')[] = ['fall', 'bounce', 'float'];
    
    // Generar 40 corazones con diferentes tipos de animación
    for (let i = 0; i < 40; i++) {
      newHearts.push({
        id: Date.now() + i, // ID único para evitar conflictos
        x: Math.random() * window.innerWidth,
        y: -50 - Math.random() * 200, // Empezar arriba de la pantalla
        rotation: Math.random() * 360,
        scale: 0.4 + Math.random() * 1.2, // Tamaño entre 0.4 y 1.6
        speed: 0.8 + Math.random() * 2.5, // Velocidad entre 0.8 y 3.3
        delay: Math.random() * 3000, // Delay entre 0 y 3 segundos
        color: colors[Math.floor(Math.random() * colors.length)],
        animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)]
      });
    }
    
    setHearts(prev => [...prev, ...newHearts]);
  }, []);

  // Función para activar más confeti manualmente
  const triggerMoreConfetti = useCallback(() => {
    generateHearts();
  }, [generateHearts]);

  // Exponer la función globalmente para que otros componentes puedan usarla
  useEffect(() => {
    (window as any).triggerHeartConfetti = triggerMoreConfetti;
    return () => {
      delete (window as any).triggerHeartConfetti;
    };
  }, [triggerMoreConfetti]);

  useEffect(() => {
    if (!isActive) return;

    const animationFrame = requestAnimationFrame(() => {
      setHearts(prevHearts => 
        prevHearts.map(heart => ({
          ...heart,
          y: heart.y + heart.speed,
          rotation: heart.rotation + (heart.animationType === 'fall' ? 3 : 1), // Rotación más rápida para los que caen
        })).filter(heart => heart.y < window.innerHeight + 150) // Eliminar corazones que salen de la pantalla
      );
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, hearts]);

  // Regenerar corazones cuando se acaben
  useEffect(() => {
    if (hearts.length < 8 && isActive) {
      const timer = setTimeout(() => {
        generateHearts();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hearts.length, isActive, generateHearts]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((heart) => {
        let animationClass = '';
        let animationDuration = '';
        
        switch (heart.animationType) {
          case 'fall':
            animationClass = 'animate-heart-fall';
            animationDuration = `${4 + heart.speed}s`;
            break;
          case 'bounce':
            animationClass = 'animate-heart-bounce';
            animationDuration = `${2 + heart.speed * 0.5}s`;
            break;
          case 'float':
            animationClass = 'animate-heart-float';
            animationDuration = `${3 + heart.speed * 0.7}s`;
            break;
          default:
            animationClass = 'animate-heart-fall';
            animationDuration = `${4 + heart.speed}s`;
        }

        return (
          <div
            key={heart.id}
            className={`absolute ${animationClass}`}
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              transform: `rotate(${heart.rotation}deg) scale(${heart.scale})`,
              animationDelay: `${heart.delay}ms`,
              animationDuration: animationDuration,
            }}
          >
            <Heart 
              className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
              style={{ 
                color: heart.color,
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                textShadow: '0 0 10px rgba(255,255,255,0.3)'
              }}
            />
          </div>
        );
      })}
      
      {/* Efecto de brillo y sparkles adicionales */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.slice(0, 15).map((heart) => (
          <div
            key={`sparkle-${heart.id}`}
            className="absolute animate-heart-sparkle"
            style={{
              left: `${heart.x + Math.random() * 20 - 10}px`,
              top: `${heart.y + Math.random() * 20 - 10}px`,
              animationDelay: `${heart.delay + Math.random() * 1000}ms`,
              animationDuration: `${1 + Math.random()}s`,
            }}
          >
            <div 
              className="w-1 h-1 bg-white rounded-full"
              style={{
                boxShadow: '0 0 6px rgba(255,255,255,0.8)',
                filter: 'blur(0.5px)'
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Efecto de partículas brillantes flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={`particle-${index}`}
            className="absolute w-0.5 h-0.5 bg-pink-200 rounded-full animate-heart-sparkle"
            style={{
              left: `${Math.random() * window.innerWidth}px`,
              top: `${Math.random() * window.innerHeight}px`,
              animationDelay: `${Math.random() * 4000}ms`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.6 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
}
