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
