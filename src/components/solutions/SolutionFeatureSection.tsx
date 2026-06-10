import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Check } from '@/components/ui/icons'
import type { SolutionFeatureSection as SectionContent } from '@/content/solutions'
import { getDictionary, type Locale } from '@/content/i18n'
import { cn } from '@/lib/cn'

/** Alternating photo + content block used down a solution detail page:
 *  heading, lead, capability bullets and a "Ventajas" benefit list. */
export function SolutionFeatureSection({ section, locale }: { section: SectionContent; locale: Locale }) {
  const imageLeft = section.imageSide === 'left'
  const ventajas = getDictionary(locale).ui.ventajas

  return (
    <section className="bg-white py-14 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photo — order flips so sections alternate sides on desktop */}
          <div
            className={cn(
              'relative aspect-[5/4] w-full overflow-hidden rounded-[30px]',
              imageLeft ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <Image
              src={section.image}
              alt={section.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Copy */}
          <div className={cn(imageLeft ? 'lg:order-2' : 'lg:order-1')}>
            <h2 className="text-[clamp(26px,3vw,44px)] font-extrabold leading-[1.05] text-ink">
              {section.title}
            </h2>
            <p className="mt-6 max-w-[560px] text-[clamp(16px,1.2vw,19px)] leading-relaxed text-body">
              {section.body}
            </p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {section.features.map((f) => (
                <FeatureItem key={f}>{f}</FeatureItem>
              ))}
            </ul>

            <p className="mt-10 text-[13px] font-bold uppercase tracking-[0.18em] text-brand">
              {ventajas}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {section.advantages.map((a) => (
                <FeatureItem key={a}>{a}</FeatureItem>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[clamp(15px,1.1vw,18px)] leading-snug text-ink">
      <span className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center text-brand">
        <Check className="h-[15px] w-[15px]" />
      </span>
      <span>{children}</span>
    </li>
  )
}
