'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from '@/components/ui/icons'
import { locales, localeNames, localizeHref, stripLocale, type Locale } from '@/content/i18n'
import { cn } from '@/lib/cn'

const fullNames: Record<Locale, string> = { es: 'Español', en: 'English', ca: 'Català' }

/** Language picker: switches to the same page in another locale by stripping
 *  the current locale prefix and re-applying the target one. */
export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || '/'
  const { path } = stripLocale(pathname)

  return (
    <div className="group relative">
      <button
        type="button"
        className="flex h-10 items-center gap-1.5 text-[15px] font-extrabold text-ink"
        aria-label="Cambiar idioma"
      >
        {localeNames[locale]}
        <ChevronDown className="h-[5px] w-[10px]" />
      </button>
      <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="flex w-[150px] flex-col overflow-hidden rounded-2xl border border-line bg-white py-1.5 shadow-[0px_4px_15px_rgba(0,0,0,0.08)]">
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={localizeHref(path, l)}
                hrefLang={l}
                className={cn(
                  'block px-4 py-2 text-[15px] font-extrabold transition-colors',
                  l === locale ? 'text-brand' : 'text-ink hover:bg-chip',
                )}
              >
                {fullNames[l]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
