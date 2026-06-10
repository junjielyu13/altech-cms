import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ChevronRight } from '@/components/ui/icons'
import { contactCta } from '@/content/home'

export function ContactCta() {
  return (
    <section className="bg-surface pb-20 lg:pb-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[30px] px-6 py-20 text-center sm:px-12 lg:py-[99px]">
          <Image src="/figma/contact-bg.png" alt="" fill className="-z-10 object-cover" sizes="100vw" />
          <div className="absolute inset-0 -z-10 bg-black/80" />

          <h2 className="text-[clamp(32px,5vw,64px)] font-extrabold text-white">{contactCta.title}</h2>
          <p className="mx-auto mt-9 max-w-[829px] text-[clamp(18px,1.7vw,24px)] leading-snug text-[#ececec]">
            {contactCta.subtitle}
          </p>
          <Link
            href={contactCta.href}
            className="mx-auto mt-9 flex h-[55px] w-[200px] items-center justify-center gap-3 rounded-[48px] bg-brand text-[clamp(18px,1.4vw,24px)] font-extrabold text-white transition-colors hover:bg-brand-dark"
          >
            {contactCta.buttonLabel}
            <ChevronRight className="h-[11px] w-[6px]" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
