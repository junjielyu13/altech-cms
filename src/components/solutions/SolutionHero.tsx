import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Download } from '@/components/ui/icons'
import type { SolutionDetail } from '@/content/solutions'

/** Top hero for a solution detail page: a photo washed with the brand-red
 *  gradient, an eyebrow label, the headline + lead, and a "Descargar PDF" CTA. */
export function SolutionHero({ detail }: { detail: SolutionDetail }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={detail.heroImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#7d0a0d]/95 via-[#b0151a]/85 to-[#7d0a0d]/55" />
      </div>

      <Container className="flex flex-col gap-10 pb-16 pt-[150px] text-white sm:pt-[180px] lg:flex-row lg:items-end lg:justify-between lg:pb-[90px]">
        <div className="max-w-[900px]">
          <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-white/80">
            {detail.eyebrow}
          </span>
          <h1 className="mt-5 text-[clamp(32px,4.6vw,64px)] font-extrabold leading-[1.02]">
            {detail.title}
          </h1>
          <p className="mt-6 max-w-[760px] text-[clamp(16px,1.4vw,21px)] leading-snug text-white/90">
            {detail.subtitle}
          </p>
        </div>

        <Link
          href={detail.pdfHref ?? '#'}
          className="flex h-[55px] w-fit shrink-0 items-center justify-center gap-3 rounded-[48px] bg-white px-8 text-[15px] font-extrabold text-ink transition-colors hover:bg-white/90"
        >
          Descargar PDF
          <Download className="h-4 w-4" />
        </Link>
      </Container>
    </section>
  )
}
