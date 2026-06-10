import Link from 'next/link'
import { localizeHref, type Locale } from '@/content/i18n'

/** Altech lockup: red isotype + wordmark. The wordmark ships in a dark and a
 *  light variant so it reads on both the white header and the dark footer. */
export function Logo({ variant = 'dark', locale = 'es' }: { variant?: 'dark' | 'light'; locale?: Locale }) {
  const wordmark = variant === 'light' ? '/figma/logo-word-footer.svg' : '/figma/logo-word-header.svg'
  return (
    <Link href={localizeHref('/', locale)} className="flex items-center gap-2.5" aria-label="Altech — inicio">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/figma/logo-icon-red-header.svg" alt="" className="h-[30px] w-auto" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={wordmark} alt="Altech" className="h-[22px] w-auto" />
    </Link>
  )
}
