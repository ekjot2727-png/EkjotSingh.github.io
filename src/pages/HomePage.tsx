// Home page - Main landing page for Luna menstrual health app

import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/HeroSection';
import { 
  QuickActionsSection, 
  FeaturesSection, 
  DidYouKnowSection, 
  CTASection 
} from '@/components/HomeCards';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Luna - Menstrual Health & Cycle Tracker</title>
        <meta name="description" content="Track your period, learn about menstrual hygiene, get answers to your health questions, and connect with healthcare providers. Your trusted menstrual health companion." />
      </Helmet>

      <main>
        {/* Hero section with main CTA */}
        <HeroSection />

        {/* Quick action cards - pregnancy, cycle, discharge */}
        <QuickActionsSection />

        {/* Main features grid */}
        <FeaturesSection />

        {/* Did you know facts */}
        <DidYouKnowSection />

        {/* Final CTA section */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
