import React from 'react';
import { ChevronDown, Target, Package, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStartCalculating: () => void;
}

export function HeroSection({ onStartCalculating }: HeroSectionProps) {
    return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-secondary" />
      
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("/features-keyart.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(187 100% 50% / 0.15) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 border border-primary/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono text-primary">TACTICAL OPERATIONS CENTER</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="text-foreground">Arc Raiders</span>
          <br />
          <span className="text-gradient-primary">Loot Master</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Calculate optimal stash value, plan loadouts, and maximize your expedition progression
        </p>

        {/* CTA Button */}
        <Button 
          size="lg"
          onClick={onStartCalculating}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan text-lg px-8 py-6 font-bold"
        >
          Start Calculating Now
          <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
        </Button>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-4xl mx-auto">
          <div className="card-tactical p-6 rounded-lg text-left">
            <Package className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">Stash Calculator</h3>
            <p className="text-sm text-muted-foreground">Track item values and optimize your storage</p>
          </div>
          
          <div className="card-tactical p-6 rounded-lg text-left">
            <Target className="w-8 h-8 text-secondary mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">Loadout Planner</h3>
            <p className="text-sm text-muted-foreground">Build the perfect kit for any mission</p>
          </div>
          
          <div className="card-tactical p-6 rounded-lg text-left">
            <TrendingUp className="w-8 h-8 text-success mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">Expedition Tracker</h3>
            <p className="text-sm text-muted-foreground">Plan your coin goals and progression</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs font-mono">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
