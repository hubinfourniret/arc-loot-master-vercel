import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Crosshair, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar activeSection="about" onNavigate={() => {}} />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-lg bg-primary/20 border border-primary flex items-center justify-center mx-auto mb-6 glow-cyan">
              <Crosshair className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Arc Raiders Loot Master
            </h1>
            <p className="text-lg text-muted-foreground">
              Your ultimate companion for loot optimization
            </p>
          </div>

          {/* Content */}
          <Card className="bg-card border-border">
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">What is Arc Raiders Loot Master?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Arc Raiders Loot Master is a free, community-driven tool designed to help players maximize their loot efficiency in Arc Raiders. 
                  Whether you're planning an expedition, optimizing your loadout, or calculating the value of your stash, our calculator provides 
                  accurate data and helpful insights to make your gameplay experience smoother and more rewarding.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Features</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our tool includes a comprehensive stash value calculator that tracks your inventory worth, an expedition planner to help you 
                  decide what to bring on your next run, a loadout optimizer with weapon mod support, and a complete tier table of all items 
                  in the game. All data is stored locally on your device, so your progress is always saved and your privacy is protected.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Community & Updates</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We're constantly updating our database with the latest item values, weapon stats, and mod information from the game. 
                  Our data is sourced from the community and official game updates to ensure accuracy. If you notice any outdated information 
                  or have suggestions for new features, we'd love to hear from you!
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-muted/50 border border-border rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-2">⚠️ Fan-Made Tool Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  Arc Raiders Loot Master is an unofficial, fan-made tool created by the community for the community. 
                  This project is not affiliated with, endorsed by, or connected to Embark Studios in any way. 
                  Arc Raiders™ is a trademark of Embark Studios. All game assets and item data belong to their respective owners.
                </p>
              </div>

              {/* Contact CTA */}
              <div className="text-center pt-6">
                <p className="text-muted-foreground mb-4">
                  Have questions, suggestions, or found a bug?
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Contact Us <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
