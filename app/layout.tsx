import type { Metadata } from 'next'
import './globals.css'
import { MusicProvider } from '../components/music-context'

export const metadata: Metadata = {
  title: 'Momentos juntos',
  icons:
    {
      icon: '/icono.png',
      shortcut: '/icono.png',
      apple: 'icono.png'
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  )
}
