import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
