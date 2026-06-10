import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import type { ClientLogo, StatContent } from '@/content/home'

interface HeroProps {
  hero: { titleLines: string[]; subtitle: string; stats: StatContent[] }
  clients: ClientLogo[]
}

export function Hero({ hero, clients }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Circuit-board backdrop + red gradient wash, fading into the page below */}
      <div className="absolute inset-0 -z-10">
        <Image src="/figma/hero-bg.png" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#8c0a0d]/90 via-[#d8181b]/65 to-surface" />
      </div>

      <Container className="flex flex-col items-center pb-16 pt-[180px] text-center text-white sm:pt-[200px]">
        <h1 className="max-w-[1256px] text-[clamp(40px,7vw,96px)] font-extrabold leading-[0.96]">
          {hero.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-7 max-w-[835px] text-[clamp(18px,2vw,30px)] leading-snug text-white/95">
          {hero.subtitle}
        </p>

        {/* Stats pill */}
        <dl className="mt-12 grid w-full max-w-[1516px] grid-cols-2 gap-y-8 rounded-[95px] border border-white/40 bg-white/15 px-8 py-9 backdrop-blur-sm sm:px-14 md:grid-cols-4 md:divide-x md:divide-white/30">
          {hero.stats.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center px-2 text-center md:px-6">
              <dt className="text-[clamp(24px,2.6vw,40px)] font-extrabold leading-none">{stat.value}</dt>
              <dd className="mt-2 text-[clamp(14px,1.3vw,20px)] text-white/90">{stat.label}</dd>
            </div>
          ))}
        </dl>

        {/* Client logos */}
        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-90 lg:gap-x-[60px]">
          {clients.map((c) => (
            <li key={c.alt} className="relative h-[44px] w-[120px]">
              <Image
                src={c.src}
                alt={c.alt}
                fill
                className="object-contain brightness-0 invert"
                sizes="120px"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
