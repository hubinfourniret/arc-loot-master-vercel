import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { StashCalculator } from '@/components/StashCalculator';
import { ExpeditionPlanner } from '@/components/ExpeditionPlanner';
import { LoadoutOptimizer } from '@/components/LoadoutOptimizer';
import { TierTable } from '@/components/TierTable';
import { FAQ } from '@/components/FAQ';
import { ShareButtons } from '@/components/ShareButtons';
import { Footer } from '@/components/Footer';
import { TopLeaderboard, MobileTopBanner, SidebarAd, MidContentAd, FooterAd, MobileStickyBottom } from '@/components/AdPlacement';
import { useStash } from '@/hooks/useStash';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { totalValue, addItem } = useStash();
  
  const calculatorRef = useRef<HTMLDivElement>(null);
  const loadoutRef = useRef<HTMLDivElement>(null);
  const tierTableRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    
    switch (section) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'calculator':
        calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'loadout':
        loadoutRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'tier-table':
        tierTableRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  const handleStartCalculating = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection('calculator');
  };

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      
      if (tierTableRef.current && scrollY >= tierTableRef.current.offsetTop) {
        setActiveSection('tier-table');
      } else if (loadoutRef.current && scrollY >= loadoutRef.current.offsetTop) {
        setActiveSection('loadout');
      } else if (calculatorRef.current && scrollY >= calculatorRef.current.offsetTop) {
        setActiveSection('calculator');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      
      {/* Top Ad */}
      <div className="pt-16">
        <TopLeaderboard />
        <MobileTopBanner />
      </div>

      <main className="relative">
        {/* Sidebar Ad - Desktop */}
        <div className="hidden xl:block fixed right-4 top-24 z-30">
          <SidebarAd />
        </div>

        <HeroSection onStartCalculating={handleStartCalculating} />
        
        <div ref={calculatorRef}>
          <StashCalculator />
        </div>
        
        <ExpeditionPlanner stashValue={totalValue} />
        
        <MidContentAd />
        
        <div ref={loadoutRef}>
          <LoadoutOptimizer />
        </div>
        
        <div ref={tierTableRef}>
          <TierTable onAddItem={addItem} />
        </div>
        
        <ShareButtons stashValue={totalValue} />
        
        <FAQ />
        
        <FooterAd />
      </main>

      <Footer />
      
      {/* Mobile Sticky Bottom Ad */}
      <MobileStickyBottom />
    </div>
  );
};

export default Index;
