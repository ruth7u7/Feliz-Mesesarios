"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { images } from "@/lib/images" // Ajusta la ruta según tu estructura

export default function HeroSection() {
  // Usar las imágenes desde el archivo de configuración
  const photos = images.hero.carousel
  const [currentPhoto, setCurrentPhoto] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [photos.length])

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
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

      <div className="max-w-4xl w-full flex flex-col items-center space-y-8 md:space-y-12">
        {/* Main romantic message */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-rose-800 leading-tight">
            Feliz 22, mi corazón de melón
          </h1>
          <p className="text-2xl md:text-3xl text-rose-600 font-medium flex items-center justify-center gap-2">
            Te amo <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-500 fill-current animate-pulse" />
          </p>
        </div>

        {/* Couple on motorcycle illustration */}
        <div className="relative animate-float">
          <Image
            src={images.hero.coupleMotorcycle}
            alt="Pareja en moto"
            width={400}
            height={300}
            className="w-64 h-48 md:w-80 md:h-60 lg:w-96 lg:h-72 object-contain drop-shadow-lg"
            priority // Agregado para optimización al ser imagen principal
          />
        </div>

        {/* Photo carousel section */}
        <div className="text-center space-y-6 w-full">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-rose-700">Momentos únicos a tu lado</h2>
            <p className="text-sm md:text-base text-rose-600 italic max-w-md mx-auto">
              "Cada instante contigo se vuelve eterno en mi memoria."
            </p>
          </div>

          {/* Carousel */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-xl bg-white p-2">
              <Image
                src={photos[currentPhoto]}
                alt={`Momento especial ${currentPhoto + 1}`}
                fill
                className="object-cover rounded-xl transition-all duration-500"
                sizes="(max-width: 768px) 320px, 384px"
              />
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

        {/* Date */}
        <div className="text-center">
          <p className="text-rose-500 font-medium text-sm md:text-base">22 de Julio, 2025</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}