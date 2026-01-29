import React, { useState, useMemo } from 'react';
import { Plus, X, Wrench, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ItemImage } from '@/components/ItemImage';
import { getCompatibleMods, WeaponMod } from '@/data/mods';
import { AttachedMod } from '@/hooks/useStash';
import { cn } from '@/lib/utils';

interface WeaponModSelectorProps {
  weaponName: string;
  attachedMods: AttachedMod[];
  onAddMod: (modId: string) => void;
  onRemoveMod: (modId: string) => void;
}

export function WeaponModSelector({
  weaponName,
  attachedMods,
  onAddMod,
  onRemoveMod
}: WeaponModSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const compatibleMods = useMemo(() => {
    return getCompatibleMods(weaponName);
  }, [weaponName]);

  const availableMods = useMemo(() => {
    const attachedIds = new Set(attachedMods.map(am => am.modId));
    const attachedCategory = new Set(attachedMods.map(am => am.mod.modCategory));
    return compatibleMods.filter(mod => {
      if (attachedIds.has(mod.id) || attachedCategory.has(mod.modCategory)) return false;
      if (!searchTerm) return true;
      return mod.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [compatibleMods, attachedMods, searchTerm]);

  const totalModsValue = attachedMods.reduce((sum, am) => sum + am.mod.value, 0);
  const totalModsWeight = attachedMods.reduce((sum, am) => sum + am.mod.weight, 0);

  if (compatibleMods.length === 0) {
    return (
      <div className="text-xs text-muted-foreground italic">
        No compatible mods
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Attached Mods */}
      {attachedMods.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {attachedMods.map((am) => (
            <div
              key={am.modId}
              className="flex items-center gap-1 px-2 py-1 bg-accent/50 rounded-md text-xs border border-accent"
            >
              <ItemImage 
                src={am.mod.imageUrl} 
                alt={am.mod.name} 
                size="xs"
                rarity={am.mod.rarity}
              />
              <span className="text-foreground">{am.mod.name}</span>
              <span className="text-primary font-mono">+{am.mod.value}c</span>
              <button
                onClick={() => onRemoveMod(am.modId)}
                className="ml-1 p-0.5 hover:bg-destructive/20 rounded text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {attachedMods.length > 0 && (
        <div className="text-xs text-muted-foreground">
          Mods: <span className="text-primary font-mono">+{totalModsValue}c</span> / 
          <span className="font-mono ml-1">+{totalModsWeight.toFixed(2)}kg</span>
        </div>
      )}

      {/* Add Mod Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs gap-1"
          >
            <Wrench className="w-3 h-3" />
            Add Mod ({availableMods.length} available)
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              Mods for {weaponName}
            </DialogTitle>
          </DialogHeader>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search mods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Mods List */}
          <ScrollArea className="max-h-[400px]">
            {availableMods.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                {attachedMods.length === compatibleMods.length 
                  ? "All compatible mods are attached!"
                  : "No mods found"
                }
              </div>
            ) : (
              <div className="space-y-2 p-1">
                {availableMods.map((mod) => (
                  <div
                    key={mod.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border transition-all",
                      "border-border bg-muted/30 hover:bg-accent/50 cursor-pointer"
                    )}
                    onClick={() => {
                      onAddMod(mod.id);
                    }}
                  >
                    <ItemImage
                      src={mod.imageUrl}
                      alt={mod.name}
                      size="md"
                      rarity={mod.rarity}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">
                        {mod.name}
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {mod.description}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs">
                        <span className="text-primary font-mono">+{mod.value}c</span>
                        <span className="font-mono">+{mod.weight}kg</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="shrink-0 h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddMod(mod.id);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
