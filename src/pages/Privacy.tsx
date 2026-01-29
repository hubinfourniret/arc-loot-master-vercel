import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Cookie, BarChart3, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar activeSection="privacy" onNavigate={() => {}} />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-lg bg-primary/20 border border-primary flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <Card className="bg-card border-border">
            <CardContent className="p-8 space-y-8">
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Arc Raiders Loot Master ("we", "our", or "the site") respects your privacy and is committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, and protect information when you use our website.
                </p>
              </div>

              {/* Data Collection */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary flex items-center justify-center shrink-0 mt-1">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">Analytics & Advertising</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use <strong>Google Analytics</strong> to understand how visitors interact with our site. This helps us improve 
                    user experience and content. Google Analytics collects anonymous data such as pages visited, time spent on site, 
                    and general geographic location.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We also use <strong>Google AdSense</strong> to display advertisements. Google may use cookies to serve ads based 
                    on your prior visits to this or other websites. You can opt out of personalized advertising by visiting 
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                      Google Ads Settings
                    </a>.
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary flex items-center justify-center shrink-0 mt-1">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">Cookies (GDPR Compliance)</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our site uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. 
                    We use the following types of cookies:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
                    <li><strong>Analytics cookies:</strong> Help us understand site usage (Google Analytics)</li>
                    <li><strong>Advertising cookies:</strong> Used to deliver relevant ads (Google AdSense)</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    By continuing to use our site, you consent to the use of cookies. You can manage cookie preferences through 
                    your browser settings at any time.
                  </p>
                </div>
              </div>

              {/* Local Storage */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Local Data Storage</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your stash data, loadouts, and preferences are stored locally in your browser using localStorage. 
                  This data never leaves your device and is not transmitted to our servers. We do not have access to your 
                  saved game data.
                </p>
              </div>

              {/* No Data Selling */}
              <div className="bg-muted/50 border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-3">🔒 Your Data is Safe</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>We do not sell, trade, or rent your personal information to third parties.</strong> Any data collected 
                  is used solely to improve site functionality and user experience. We are committed to maintaining your trust 
                  and protecting your privacy.
                </p>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our site may contain links to external websites. We are not responsible for the privacy practices of these 
                  third-party sites. We encourage you to read their privacy policies before providing any personal information.
                </p>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary flex items-center justify-center shrink-0 mt-1">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">Questions?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to{' '}
                    <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
                  </p>
                </div>
              </div>

              {/* Updates */}
              <div className="text-sm text-muted-foreground border-t border-border pt-6">
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated 
                  revision date. We encourage you to review this policy periodically.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
