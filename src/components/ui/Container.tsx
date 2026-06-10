import { cn } from '@/lib/cn'

/** Centered content column. The Figma board centres ~1634px of content on a
 *  1920px canvas; we cap at 1680px and pad in on smaller viewports. */
export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-12 xl:px-[120px]', className)}>
      {children}
    </div>
  )
}
