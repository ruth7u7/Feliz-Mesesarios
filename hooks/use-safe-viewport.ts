import { useState, useEffect } from 'react';

export function useSafeViewport() {
  const [safeBottom, setSafeBottom] = useState(0);

  useEffect(() => {
    function updateSafeArea() {
      // Obtener safe-area-inset-bottom para iOS
      const safeAreaBottom = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom') || '0'
      );

      // Detectar si es iOS con barra de navegación
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const hasHomeIndicator = window.innerHeight > 800; // iPhone X y superiores

      // Calcular el espacio seguro
      const bottomSpace = Math.max(
        safeAreaBottom,
        isIOS && hasHomeIndicator ? 34 : 0, // 34px es el espacio estándar para el home indicator
        72 // Altura mínima para el reproductor de audio
      );

      setSafeBottom(bottomSpace);
    }

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    return () => window.removeEventListener('resize', updateSafeArea);
  }, []);

  return { safeBottom };
}
