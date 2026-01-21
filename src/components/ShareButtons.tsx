import React from 'react';
import { Twitter, Facebook, Link2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareButtonsProps {
  stashValue: number;
}

export function ShareButtons({ stashValue }: ShareButtonsProps) {
  const shareText = `Just calculated my stash worth ${stashValue.toLocaleString()} coins in Arc Raiders Loot Master 🎯 What's your value?`;
  const shareUrl = window.location.href;

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleRedditShare = () => {
    const title = `My Loadout Setup Worth ${stashValue.toLocaleString()} coins`;
    const url = `https://www.reddit.com/r/ArcRaiders/submit?title=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="card-tactical rounded-lg p-6 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-foreground mb-2">Share Your Stats</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Show off your stash value to the community!
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={handleTwitterShare}
              className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            
            <Button
              onClick={handleRedditShare}
              className="bg-[#FF4500] hover:bg-[#e63e00] text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Reddit
            </Button>
            
            <Button
              onClick={handleFacebookShare}
              className="bg-[#1877F2] hover:bg-[#166fe5] text-white"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
            
            <Button
              variant="outline"
              onClick={handleCopyLink}
            >
              <Link2 className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
