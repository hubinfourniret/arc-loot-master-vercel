import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface ItemImageProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rarity?: 'Common' |'Uncommon'| 'Rare' | 'Epic' | 'Legendary';
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
};

export function ItemImage({ src, alt, size = 'md', rarity = 'Common', className = '' }: ItemImageProps) {
  const [hasError, setHasError] = useState(false);

  const borderColor = 
    rarity === 'Legendary' ? 'border-yellow-500/50' :
    rarity === 'Rare' ? 'border-primary/50' : 
    rarity === 'Epic' ? 'border-purple/50' :
    rarity === 'Uncommon' ? 'border-green/50' :
    'border-border';

  const bgColor =
    rarity === 'Legendary' ? 'bg-yellow-500/10' :
    rarity === 'Rare' ? 'bg-primary/10' :
    rarity === 'Epic' ? 'bg-purple-500/10' :
    rarity === 'Uncommon' ? 'bg-green-500/10' :
    'bg-muted';

  if (!src || hasError) {
    return (
      <div 
        className={`${sizeClasses[size]} ${bgColor} rounded-lg border-2 ${borderColor} flex items-center justify-center flex-shrink-0 ${className}`}
      >
        <Package className="w-1/2 h-1/2 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} ${bgColor} rounded-lg border-2 ${borderColor} overflow-hidden flex-shrink-0 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-contain p-1"
      />
    </div>
  );
}
