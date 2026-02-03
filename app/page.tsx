import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Narrative from '@/components/Narrative'
import Impact from '@/components/Impact'
import Capabilities from '@/components/Capabilities'
import Philosophy from '@/components/Philosophy'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Narrative />
        <Impact />
        <Capabilities />
        <Philosophy />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
