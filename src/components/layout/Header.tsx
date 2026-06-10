import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher'
import { ChevronDown, ChevronRight } from '@/components/ui/icons'
import { getDictionary, localizeHref, type Locale } from '@/content/i18n'
import { cn } from '@/lib/cn'

/** Fixed top navigation. The "Soluciones" / "Sobre nosotros" items reveal a
 *  dropdown on hover/focus (pure CSS via `group`). Locale-aware: labels come
 *  from the dictionary and links are prefixed for en/ca. */
export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const loc = (href: string) => localizeHref(href, locale)

  const nav = [
    {
      label: t.nav.soluciones,
      href: loc('/soluciones'),
      children: t.solutionsMenu.map((s) => ({ ...s, href: loc(s.href) })),
    },
    {
      label: t.nav.sobreNosotros,
      href: loc('/sobre-nosotros'),
      children: t.aboutMenu.map((a) => ({ ...a, href: loc(a.href) })),
    },
    { label: t.nav.noticias, href: loc('/noticias') },
    { label: t.nav.clientes, href: loc('/clientes') },
    { label: t.nav.trabaja, href: loc('/trabaja-con-nosotros') },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 shadow-[var(--shadow-nav)] backdrop-blur">
      <div className="mx-auto flex h-[88px] max-w-[1680px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12 xl:px-[97px]">
        <Logo variant="dark" locale={locale} />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex h-10 items-center gap-2 rounded-[48px] px-5 text-[15px] font-extrabold text-ink transition-colors group-hover:bg-chip"
                >
                  {item.label}
                  <ChevronDown className="h-[5px] w-[10px] text-ink" />
                </Link>
                <NavDropdown items={item.children as DropdownItem[]} />
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="flex h-10 items-center rounded-[48px] px-5 text-[15px] font-extrabold text-ink transition-colors hover:bg-chip"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-5">
          <LocaleSwitcher locale={locale} />
          <Link
            href={loc('/contacto')}
            className="flex h-10 items-center rounded-[28px] bg-brand px-6 text-[15px] font-extrabold text-white transition-colors hover:bg-brand-dark"
          >
            {t.nav.contacto}
          </Link>
        </div>
      </div>
    </header>
  )
}

type DropdownItem = { title?: string; label?: string; description?: string; href: string }

function NavDropdown({ items }: { items: DropdownItem[] }) {
  // Rich layout (icon bullet + description) only when items carry descriptions.
  const rich = items.some((i) => i.description)
  return (
    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
      <div
        className={cn(
          'rounded-[30px] border border-line bg-white p-8 shadow-[0px_4px_15px_rgba(0,0,0,0.08)]',
          rich ? 'grid w-[640px] grid-cols-2 gap-x-12 gap-y-9 p-10' : 'flex w-[280px] flex-col gap-4',
        )}
      >
        {items.map((s) => (
          <Link key={s.href} href={s.href} className="flex items-start gap-3.5">
            {rich && (
              <span className="mt-0.5 flex size-[30px] shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <ChevronRight className="h-[11px] w-[6px]" />
              </span>
            )}
            <span>
              <span className="block text-[18px] font-extrabold text-ink">{s.title ?? s.label}</span>
              {s.description && (
                <span className="mt-2 block text-[16px] leading-snug text-body">{s.description}</span>
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
