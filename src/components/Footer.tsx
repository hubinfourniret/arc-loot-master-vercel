import React from 'react';
import { Crosshair, Github, Twitter, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-primary/20 border border-primary flex items-center justify-center">
              <Crosshair className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Arc Raiders Loot Master</h3>
              <p className="text-xs text-muted-foreground">Calculate • Plan • Dominate</p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://reddit.com/r/ArcRaiders" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground mt-6 pt-6 border-t border-border">
          <p>This is a fan-made tool. Arc Raiders™ is a trademark of Embark Studios.</p>
          <p className="mt-1">© {new Date().getFullYear()} Arc Raiders Loot Master. Not affiliated with Embark Studios.</p>
        </div>
      </div>
    </footer>
  );
}
