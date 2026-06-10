import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { band } from '@/content/home'

export function Band() {
  return (
    <section className="bg-surface pb-20 lg:pb-28">
      <Container>
        <div className="relative h-[clamp(320px,40vw,780px)] overflow-hidden rounded-[12px]">
          {/* The caption "Hace más de 15 años" is baked into the source image. */}
          <Image
            src={band.image}
            alt={band.caption}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </Container>
    </section>
  )
}
