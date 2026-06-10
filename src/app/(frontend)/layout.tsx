import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

// Codec Pro stand-in until the licensed font files are supplied.
const codec = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-codec',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Altech — Ingeniería tecnológica de soluciones TIC',
  description:
    'Ingeniería tecnológica de alta especialización en el desarrollo e integración de soluciones TIC para movilidad, defensa, emergencias y servicios urbanos.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={codec.variable}>
      <body>{children}</body>
    </html>
  )
}
