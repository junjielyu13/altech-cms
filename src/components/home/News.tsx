import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ChevronRight } from '@/components/ui/icons'
import { news, type NewsCardContent } from '@/content/home'

export function News() {
  return (
    <section className="bg-surface pb-20 lg:pb-28">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-[clamp(36px,5vw,64px)] font-extrabold text-ink">Noticias</h2>
          <Link
            href="/noticias"
            className="flex h-[55px] items-center gap-3 rounded-[48px] bg-chip px-7 text-[clamp(16px,1.4vw,24px)] font-extrabold text-ink transition-colors hover:bg-line"
          >
            Ver más noticias
            <ChevronRight className="h-[11px] w-[6px]" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {news.map((item) => (
            <NewsCard key={item.href} item={item} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function NewsCard({ item }: { item: NewsCardContent }) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col overflow-hidden rounded-[30px] bg-white shadow-[var(--shadow-card)] transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative h-[230px] w-full overflow-hidden">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-5 px-10 py-8">
        <h3 className="text-[clamp(18px,1.6vw,24px)] font-medium leading-snug text-ink">{item.title}</h3>
        <p className="mt-auto text-[clamp(16px,1.4vw,20px)] tracking-[0.6px] text-muted">{item.date}</p>
      </div>
    </Link>
  )
}
