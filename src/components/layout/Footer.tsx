import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { certBadges, copyright, footerColumns, legalLinks } from '@/content/site'

const linkClass = 'text-[clamp(16px,1.1vw,20px)] text-muted transition-colors hover:text-white'
const headingClass = 'text-[clamp(18px,1.2vw,24px)] font-extrabold text-white'

interface FooterProps {
  contact: { address: string; email: string; phone: string }
  social: Array<{ label: string; href: string; icon: string }>
}

export function Footer({ contact, social }: FooterProps) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1680px] px-5 py-16 sm:px-8 lg:px-12 xl:px-[109px] lg:py-24">
        <Logo variant="light" />

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {/* Contact block */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className={headingClass}>Dirección</h3>
              <p className="mt-3 max-w-[280px] text-[clamp(16px,1.1vw,20px)] text-muted">{contact.address}</p>
            </div>
            <div>
              <h3 className={headingClass}>Teléfono</h3>
              <p className="mt-3 text-[clamp(16px,1.1vw,20px)] text-muted">{contact.phone}</p>
            </div>
            <div>
              <h3 className={headingClass}>Email</h3>
              <a href={`mailto:${contact.email}`} className={`mt-3 block ${linkClass}`}>
                {contact.email}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerColumns).map((col) => (
            <div key={col.title}>
              <h3 className={headingClass}>{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-4">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h3 className={headingClass}>Redes sociales</h3>
            <div className="mt-5 flex items-center gap-4">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="opacity-90 transition-opacity hover:opacity-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-12 border-white/15" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-[clamp(14px,1vw,18px)] text-muted">{copyright}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[clamp(13px,0.95vw,18px)] text-muted hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-5">
            {certBadges.map((src) => (
              <div key={src} className="relative h-[70px] w-[120px]">
                <Image src={src} alt="Certificación" fill className="object-contain" sizes="120px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
