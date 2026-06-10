/** Small inline icons used by buttons and "ver más" links. */

export function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 6 11" fill="none" aria-hidden>
      <path d="M1 1l4 4.5L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 11 6" fill="none" aria-hidden>
      <path d="M1 1l4.5 4L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 7.5l3.2 3.3L12 3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Download({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 1v9m0 0L4.5 6.5M8 10l3.5-3.5M2 13h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
