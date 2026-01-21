import React from 'react';

interface AdPlacementProps {
  id: string;
  width: number;
  height: number;
  className?: string;
  label?: string;
}

export function AdPlacement({ id, width, height, className = '', label }: AdPlacementProps) {
  return (
    <div 
      id={id}
      className={`ad-placeholder ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        maxWidth: '100%'
      }}
    >
      <span className="font-mono text-xs">
        {label || `Ad Space - ${width}x${height}`}
      </span>
    </div>
  );
}

export function TopLeaderboard() {
  return (
    <div className="hidden lg:flex justify-center py-2 bg-background-secondary">
      <AdPlacement id="ad-top-leaderboard" width={728} height={90} />
    </div>
  );
}

export function MobileTopBanner() {
  return (
    <div className="lg:hidden flex justify-center py-2 bg-background-secondary">
      <AdPlacement id="ad-mobile-top" width={320} height={50} />
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="hidden xl:block sticky top-24">
      <AdPlacement id="ad-right-sidebar" width={300} height={600} />
    </div>
  );
}

export function MidContentAd() {
  return (
    <div className="flex justify-center py-6">
      <div className="hidden lg:block">
        <AdPlacement id="ad-mid-content" width={728} height={90} />
      </div>
      <div className="lg:hidden">
        <AdPlacement id="ad-mobile-section" width={300} height={250} />
      </div>
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="flex justify-center py-4 bg-background-secondary">
      <div className="hidden lg:block">
        <AdPlacement id="ad-footer" width={728} height={90} />
      </div>
      <div className="lg:hidden">
        <AdPlacement id="ad-mobile-footer" width={320} height={50} />
      </div>
    </div>
  );
}

export function MobileStickyBottom() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-center py-1 bg-background-secondary border-t border-border">
      <AdPlacement id="ad-mobile-bottom" width={320} height={50} />
    </div>
  );
}
