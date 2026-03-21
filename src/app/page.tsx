import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Translation } from '@/components/Translation';
import { WhyDiktame } from '@/components/WhyDiktame';
import { Speed } from '@/components/Speed';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Translation />
      <WhyDiktame />
      <Speed />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
