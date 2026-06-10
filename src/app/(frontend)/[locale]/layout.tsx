import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { siteUrl } from '@/lib/siteConfig'
import { htmlLang, isLocale } from '@/content/i18n'
import '../globals.css'

// Codec Pro stand-in until the licensed font files are supplied.
const codec = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-codec',
  display: 'swap',
})

const title = 'Altech — Ingeniería tecnológica de soluciones TIC'
const description =
  'Ingeniería tecnológica de alta especialización en el desarrollo e integración de soluciones TIC para movilidad, transporte, defensa, emergencias y servicios urbanos.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s — Altech',
  },
  description,
  applicationName: 'Altech',
  keywords: [
    'Altech',
    'soluciones TIC',
    'transporte y logística',
    'defensa y seguridad',
    'gestión de emergencias',
    'servicios urbanos',
    'telemática',
    'Barcelona',
  ],
  authors: [{ name: 'Altech Solutions and Consulting S.L.' }],
  openGraph: {
    type: 'website',
    siteName: 'Altech',
    title,
    description,
    url: siteUrl,
    locale: 'es_ES',
    images: [{ url: '/figma/hero-bg.png', width: 1200, height: 630, alt: 'Altech' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/figma/hero-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default async function FrontendLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const lang = isLocale(locale) ? htmlLang[locale] : htmlLang.es
  return (
    <html lang={lang} className={codec.variable}>
      <body>{children}</body>
    </html>
  )
}
