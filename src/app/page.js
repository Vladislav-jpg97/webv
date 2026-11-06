import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackgroundEffects from '@/components/animations/BackgroundEffects';
import ScrollAnimations from '@/components/animations/ScrollAnimations';
import Hero from '@/components/sections/Hero';
import Ribbon from '@/components/sections/Ribbon';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Process from '@/components/sections/Process';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

export default function Page() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Ribbon />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollAnimations />
    </>
  );
}
