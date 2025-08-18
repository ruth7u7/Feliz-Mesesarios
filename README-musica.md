# 🎵 Cómo Agregar Música a tu Proyecto

## 📁 Ubicación del Archivo
Coloca tu archivo de música en la carpeta `public/` con el nombre `nuestra-cancion.mp3`

```
public/
  └── nuestra-cancion.mp3
```

## 🎵 Formatos Recomendados
- **MP3**: Mejor compatibilidad, tamaño moderado
- **OGG**: Mejor calidad, menor tamaño (pero menos compatible)
- **WAV**: Máxima calidad, pero archivo muy pesado

## 📱 Tamaño Recomendado
- **MP3**: Máximo 5-10 MB para no afectar la velocidad de carga
- **Calidad**: 128-192 kbps es suficiente para música de fondo

## 🚀 Cómo Funciona
1. El reproductor aparecerá como un botón flotante en la esquina inferior derecha
2. Haz clic para expandir los controles
3. Usa los botones de play/pause y control de volumen
4. El reproductor se oculta automáticamente cuando no lo necesites

## ⚠️ Notas Importantes
- Muchos navegadores bloquean la reproducción automática
- El usuario debe interactuar primero con la página para que funcione
- El archivo se precarga solo la información básica para optimizar el rendimiento

## 🎨 Personalización
Puedes cambiar el nombre del archivo en `components/music-player.tsx` línea 108:
```tsx
<source src="/tu-archivo.mp3" type="audio/mpeg" />
```
