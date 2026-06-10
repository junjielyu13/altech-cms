import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ChevronRight } from '@/components/ui/icons'
import { type SolutionCardContent } from '@/content/home'
import { cn } from '@/lib/cn'

interface SolutionsProps {
  intro: { eyebrow: string; title: string; subtitle: string }
  solutions: SolutionCardContent[]
}

export function Solutions({ intro, solutions }: SolutionsProps) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-center text-center">
          <span className="rounded-[48px] bg-chip px-6 py-3 text-[clamp(16px,1.3vw,20px)] font-medium text-body">
            {intro.eyebrow}
          </span>
          <h2 className="mt-9 max-w-[1340px] text-[clamp(32px,5vw,64px)] font-extrabold leading-[1.02] text-ink">
            {intro.title}
          </h2>
          <p className="mt-6 max-w-[699px] text-[clamp(18px,1.7vw,24px)] leading-snug text-body-soft">
            {intro.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {solutions.map((s) => (
            <SolutionCard key={s.area} solution={s} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function SolutionCard({ solution }: { solution: SolutionCardContent }) {
  const { featured } = solution
  return (
    <Link
      href={solution.href}
      className={cn(
        'group flex min-h-[435px] flex-col gap-8 rounded-[30px] p-[45px] py-[58px] transition-transform duration-200 hover:-translate-y-1',
        featured ? 'bg-brand text-white' : 'border border-line bg-card text-ink',
      )}
    >
      <span
        aria-hidden
        className={cn('h-[37px] w-[47px] bg-current', featured ? 'text-white' : 'text-brand')}
        style={{
          maskImage: `url(${solution.icon})`,
          WebkitMaskImage: `url(${solution.icon})`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskPosition: 'left center',
          WebkitMaskPosition: 'left center',
        }}
      />
      <h3 className="text-[clamp(24px,2.2vw,32px)] font-extrabold leading-tight">{solution.title}</h3>
      <p
        className={cn(
          'text-[clamp(16px,1.4vw,20px)] leading-snug',
          featured ? 'text-white/90' : 'text-body',
        )}
      >
        {solution.description}
      </p>
      <span className="mt-auto flex items-center gap-2 text-[clamp(16px,1.4vw,20px)] font-extrabold tracking-[0.6px]">
        Ver más
        <ChevronRight className="h-[13px] w-[8px] transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
