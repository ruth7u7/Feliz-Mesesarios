"use client";

import { useState, useEffect } from "react";
import { Heart, Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isSpecialDay, setIsSpecialDay] = useState(false);
  
  useEffect(() => {
    // Verificar si es el día 22
    const today = new Date();
    const isDay22 = today.getDate() === 22;
    setIsSpecialDay(isDay22);
    
    if (isDay22) {
      return; // No mostrar el timer si es el día 22
    }
    
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      let nextDay22 = new Date(now.getFullYear(), now.getMonth(), 22);
      
      // Si ya pasó el día 22 de este mes, ir al próximo mes
      if (now.getDate() > 22) {
        nextDay22 = new Date(now.getFullYear(), now.getMonth() + 1, 22);
      }
      
      const difference = nextDay22.getTime() - now.getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };
    
    // Calcular tiempo inicial
    setTimeLeft(calculateTimeLeft());
    
    // Actualizar cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (isSpecialDay) {
    return null; // No mostrar el timer si es el día 22
  }
  
  return (
    <div className="text-center space-y-4 animate-fade-in">
      {/* Título del timer */}
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-rose-700 flex items-center justify-center gap-2">
          <Clock className="w-5 h-5 md:w-6 md:h-6" />
          Faltan {timeLeft.days} días!
        </h2>
        <p className="text-xs md:text-sm text-rose-600 italic">
          "Cada segundo que pasa es un segundo más cerca de celebrar nuestro amor"
        </p>
      </div>
      
      {/* Timer principal */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-sm mx-auto">
        {/* Días */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-rose-200">
          <div className="text-2xl md:text-3xl font-bold text-rose-800">
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-rose-600 font-medium">Días</div>
        </div>
        
        {/* Horas */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-rose-200">
          <div className="text-2xl md:text-3xl font-bold text-rose-800">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-rose-600 font-medium">Horas</div>
        </div>
        
        {/* Minutos */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-rose-200">
          <div className="text-2xl md:text-3xl font-bold text-rose-800">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-rose-600 font-medium">Min</div>
        </div>
        
        {/* Segundos */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-rose-200">
          <div className="text-2xl md:text-3xl font-bold text-rose-800">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-rose-600 font-medium">Seg</div>
        </div>
      </div>
      
      {/* Mensaje motivacional */}
      <div className="space-y-2">
        {timeLeft.days === 1 ? (
          <p className="text-xs md:text-sm text-rose-600 font-medium">
            ¡Mañana será el día 22! Estoy tan emocionado de celebrar contigo ❤️
          </p>
        ) : timeLeft.days < 7 ? (
          <p className="text-xs md:text-sm text-rose-600 font-medium">
            ¡Solo faltan {timeLeft.days} días! Cada día que pasa me hace amarte más
          </p>
        ) : (
          <p className="text-xs md:text-sm text-rose-600 font-medium">
            Faltan {timeLeft.days} días para decirte lo mucho que te amo
          </p>
        )}
        <div className="flex justify-center space-x-2">
          <Heart className="w-3 h-3 text-pink-400 animate-pulse" />
          <Heart className="w-4 h-4 text-rose-400 animate-pulse" style={{ animationDelay: "0.3s" }} />
          <Heart className="w-3 h-3 text-pink-300 animate-pulse" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>
    </div>
  );
}
