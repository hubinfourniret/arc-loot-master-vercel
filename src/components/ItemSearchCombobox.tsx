import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Plus, Search } from 'lucide-react';
import { allItems, BaseItem, WeaponLevel } from '@/data/items';
import { ItemImage } from '@/components/ItemImage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ItemSearchComboboxProps {
  onAddItem: (itemId: string, quantity: number, weaponLevel?: WeaponLevel) => void;
}

const WEAPON_LEVELS: WeaponLevel[] = [1, 2, 3, 4];

export function ItemSearchCombobox({ onAddItem }: ItemSearchComboboxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [weaponLevels, setWeaponLevels] = useState<Record<string, WeaponLevel>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return allItems.slice(0, 50);
    
    const term = searchTerm.toLowerCase();
    return allItems.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.type.toLowerCase().includes(term) ||
      item.rarity.toLowerCase().includes(term)
    ).slice(0, 50);
  }, [searchTerm]);

  // Reset itemRefs when filtered items change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, filteredItems.length);
  }, [filteredItems.length]);

  // Auto-scroll to keep selected item visible
  useEffect(() => {
    if (isOpen && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex, isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        const isInRadixPortal = (target as Element).closest?.('[data-radix-popper-content-wrapper]');
        if (!isInRadixPortal) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleQuickAdd(filteredItems[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleQuickAdd = (item: BaseItem) => {
    const qty = quantities[item.id] || 1;
    const level = item.type === 'Weapons' ? (weaponLevels[item.id] || 1) : undefined;
    onAddItem(item.id, qty, level);
    // Reset quantity after adding
    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  const updateQuantity = (itemId: string, value: number) => {
    setQuantities(prev => ({ ...prev, [itemId]: Math.max(1, value) }));
  };

  const updateWeaponLevel = (itemId: string, level: WeaponLevel) => {
    setWeaponLevels(prev => ({ ...prev, [itemId]: level }));
  };

  const getRarityStyles = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'border-yellow-500/30 bg-yellow-500/5';
      case 'Epic':
        return 'border-purple-500/30 bg-purple-500/5';
      case 'Rare':
        return 'border-primary/30 bg-primary/5';
      case 'Uncommon':
        return 'border-green-500/30 bg-green-500/5';
      default:
        return 'border-border bg-muted/30';
    }
  };

  // Calculate displayed value based on level for weapons
  const getDisplayedValue = (item: BaseItem, level: number): number => {
    if (item.type === 'Weapons') {
      return item.value[level-1]
    }
    return item.value as number;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search items by name, type, or rarity..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 bg-muted border-border h-12 text-base"
        />
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-2 bg-popover border border-border rounded-lg shadow-xl overflow-hidden"
        >
          <div 
            ref={listRef}
            className="max-h-[400px] overflow-y-auto overscroll-contain"
          >
            {filteredItems.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <p>No items found for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {filteredItems.map((item, index) => {
                  const isWeapon = item.type === 'Weapons';
                  const currentLevel = weaponLevels[item.id] || 1;
                  const displayedValue = getDisplayedValue(item, currentLevel);
                  
                  return (
                    <div
                      ref={(el) => { itemRefs.current[index] = el; }}
                      key={item.id}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg border transition-all cursor-pointer",
                        getRarityStyles(item.rarity),
                        index === selectedIndex && "ring-2 ring-primary",
                        "hover:bg-accent/50"
                      )}
                      onClick={() => setSelectedIndex(index)}
                    >
                      {/* Item Image */}
                      <ItemImage
                        src={item.imageUrl}
                        alt={item.name}
                        size="md"
                        rarity={item.rarity}
                      />

                      {/* Item Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground truncate">
                            {item.name}
                          </span>
                          <span className={cn(
                            "text-xs px-1.5 py-0.5 rounded shrink-0",
                            item.rarity === 'Legendary' && 'bg-yellow-500/20 text-yellow-400',
                            item.rarity === 'Epic' && 'bg-purple-500/20 text-purple-400',
                            item.rarity === 'Rare' && 'bg-primary/20 text-primary',
                            item.rarity === 'Uncommon' && 'bg-green-500/20 text-green-400',
                            item.rarity === 'Common' && 'bg-muted-foreground/20 text-muted-foreground'
                          )}>
                            {item.rarity}
                          </span>
                          {isWeapon && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-accent text-accent-foreground shrink-0">
                              Lvl {currentLevel}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{item.type}</span>
                          <span className="text-primary font-mono">{displayedValue}c</span>
                          <span className="font-mono">{item.weight}kg</span>
                        </div>
                      </div>

                      {/* Weapon Level Selector */}
                      {isWeapon && (
                        <Select
                          value={currentLevel.toString()}
                          onValueChange={(val) => {
                            updateWeaponLevel(item.id, parseInt(val) as WeaponLevel);
                          }}
                        >
                          <SelectTrigger
                            className="w-20 h-8 bg-background border-border"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <SelectValue placeholder="Lvl" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border z-[60]">
                            {WEAPON_LEVELS.map((level) => (
                              <SelectItem key={level} value={level.toString()}>
                                Lvl {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {/* Quantity & Add */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Input
                          type="number"
                          min={1}
                          value={quantities[item.id] || 1}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, parseInt(e.target.value) || 1);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-16 h-8 text-center bg-background border-border"
                        />
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAdd(item);
                          }}
                          className="h-8 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Keyboard hints */}
          <div className="border-t border-border px-3 py-2 bg-muted/50 flex items-center gap-4 text-xs text-muted-foreground">
            <span><kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">Enter</kbd> Add item</span>
            <span><kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">Esc</kbd> Close</span>
          </div>
        </div>
      )}
    </div>
  );
}
