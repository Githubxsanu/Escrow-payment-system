import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VisualFlow from '@/components/VisualFlow';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Statistics from '@/components/Statistics';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <VisualFlow />
        <Features />
        <HowItWorks />
        <Statistics />
        <Testimonials />
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
