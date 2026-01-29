import { useState, useEffect, useCallback } from 'react';
import { Item, getItemById, WeaponLevel } from '@/data/items';
import { WeaponMod, getModById } from '@/data/mods';

export interface AttachedMod {
  modId: string;
  mod: WeaponMod;
}

export interface StashItem {
  itemId: string;
  quantity: number;
  item: Item;
  weaponLevel?: WeaponLevel; // Only for weapons
  attachedMods?: AttachedMod[]; // Mods attached to this weapon
}

export interface StashBackup {
  id: string;
  timestamp: number;
  items: StashItem[];
  name: string;
}

const STASH_KEY = 'arcraiders_stash';
const BACKUPS_KEY = 'arcraiders_stash_backups';

// Helper to calculate effective value considering weapon level + mods
export const getEffectiveValue = (stashItem: StashItem): number => {
  let baseValue = 0;
  
  if (stashItem.item.type === 'Weapons' && stashItem.weaponLevel) {
    const values = stashItem.item.value as number[];
    baseValue = values[stashItem.weaponLevel - 1] || values[0];
  } else if (Array.isArray(stashItem.item.value)) {
    baseValue = stashItem.item.value[0];
  } else {
    baseValue = stashItem.item.value;
  }
  
  // Add mods value
  const modsValue = stashItem.attachedMods?.reduce((sum, am) => sum + am.mod.value, 0) || 0;
  
  return baseValue + modsValue;
};

// Helper to calculate effective weight including mods
export const getEffectiveWeight = (stashItem: StashItem): number => {
  const baseWeight = stashItem.item.weight;
  const modsWeight = stashItem.attachedMods?.reduce((sum, am) => sum + am.mod.weight, 0) || 0;
  return baseWeight + modsWeight;
};

export function useStash() {
  const [stashItems, setStashItems] = useState<StashItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STASH_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validItems = parsed.filter((s: any) => getItemById(s.itemId));
        setStashItems(validItems.map((s: any) => {
          // Restore attached mods
          const attachedMods = s.attachedMods?.map((am: any) => {
            const mod = getModById(am.modId);
            return mod ? { modId: am.modId, mod } : null;
          }).filter(Boolean) || [];

          return {
            ...s,
            item: getItemById(s.itemId)!,
            attachedMods
          };
        }));
      } catch (e) {
        console.error('Failed to load stash:', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    const toSave = stashItems.map(({ itemId, quantity, weaponLevel, attachedMods }) => ({ 
      itemId, 
      quantity,
      ...(weaponLevel && { weaponLevel }),
      ...(attachedMods?.length && { attachedMods: attachedMods.map(am => ({ modId: am.modId })) })
    }));
    localStorage.setItem(STASH_KEY, JSON.stringify(toSave));
  }, [stashItems]);

  const addItem = useCallback((itemId: string, quantity: number = 1, weaponLevel?: WeaponLevel) => {
    const item = getItemById(itemId);
    if (!item) return;

    setStashItems(prev => {
      // For weapons, we need to check both itemId AND level
      const existing = prev.find(s => 
        s.itemId === itemId && 
        (item.type !== 'Weapons' || s.weaponLevel === weaponLevel) && s.attachedMods.length === 0
      );
      
      if (existing) {
        return prev.map(s => 
          s.itemId === itemId && (item.type !== 'Weapons' || s.weaponLevel === weaponLevel)
            ? { ...s, quantity: s.quantity + quantity }
            : s
        );
      }
      
      return [...prev, { 
        itemId, 
        quantity, 
        item,
        ...(item.type === 'Weapons' && { weaponLevel: weaponLevel || 1, attachedMods: [] })
      }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number, weaponLevel?: WeaponLevel) => {
    if (quantity <= 0) {
      removeItem(itemId, weaponLevel);
      return;
    }
    setStashItems(prev => 
      prev.map(s => {
        if (s.itemId === itemId) {
          // For weapons, also check level
          if (s.item.type === 'Weapons' && s.weaponLevel !== weaponLevel) {
            return s;
          }
          return { ...s, quantity };
        }
        return s;
      })
    );
  }, []);

  const removeItem = useCallback((itemId: string, weaponLevel?: WeaponLevel) => {
    setStashItems(prev => prev.filter(s => {
      if (s.itemId !== itemId) return true;
      // For weapons, also check level
      if (s.item.type === 'Weapons' && s.weaponLevel !== weaponLevel) return true;
      return false;
    }));
  }, []);

  // Add a mod to a weapon in stash
  const addModToWeapon = useCallback((itemId: string, weaponLevel: WeaponLevel, modId: string) => {
    const mod = getModById(modId);
    if (!mod) return;

    setStashItems(prev => prev.map(s => {
      if (s.itemId === itemId && s.weaponLevel === weaponLevel) {
        // Check if mod already attached
        if (s.attachedMods?.some(am => am.modId === modId)) {
          return s;
        }
        return {
          ...s,
          attachedMods: [...(s.attachedMods || []), { modId, mod }]
        };
      }
      return s;
    }));
  }, []);

  // Remove a mod from a weapon in stash
  const removeModFromWeapon = useCallback((itemId: string, weaponLevel: WeaponLevel, modId: string) => {
    setStashItems(prev => prev.map(s => {
      if (s.itemId === itemId && s.weaponLevel === weaponLevel) {
        return {
          ...s,
          attachedMods: s.attachedMods?.filter(am => am.modId !== modId) || []
        };
      }
      return s;
    }));
  }, []);

  const clearAll = useCallback(() => {
    setStashItems([]);
  }, []);

  const saveBackup = useCallback((name?: string) => {
    const backups = getBackups();
    const newBackup: StashBackup = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      items: stashItems,
      name: name || `Backup ${new Date().toLocaleString()}`
    };
    backups.unshift(newBackup);
    // Keep only last 10 backups
    localStorage.setItem(BACKUPS_KEY, JSON.stringify(backups.slice(0, 10)));
    return newBackup;
  }, [stashItems]);

  const getBackups = useCallback((): StashBackup[] => {
    try {
      const saved = localStorage.getItem(BACKUPS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, []);

  const loadBackup = useCallback((backupId: string) => {
    const backups = getBackups();
    const backup = backups.find(b => b.id === backupId);
    if (backup) {
      const validItems = backup.items.filter(s => getItemById(s.itemId));
      setStashItems(validItems.map(s => {
        const attachedMods = s.attachedMods?.map(am => {
          const mod = getModById(am.modId);
          return mod ? { modId: am.modId, mod } : null;
        }).filter(Boolean) as AttachedMod[] || [];

        return {
          ...s,
          item: getItemById(s.itemId)!,
          attachedMods
        };
      }));
    }
  }, [getBackups]);

  const exportAsText = useCallback(() => {
    const lines = stashItems.map(s => {
      const effectiveValue = getEffectiveValue(s);
      const effectiveWeight = getEffectiveWeight(s);
      const levelText = s.weaponLevel ? ` (Lvl ${s.weaponLevel})` : '';
      const modsText = s.attachedMods?.length ? ` [${s.attachedMods.map(am => am.mod.name).join(', ')}]` : '';
      return `${s.item.name}${levelText}${modsText} x${s.quantity} - ${effectiveValue * s.quantity} coins (${(effectiveWeight * s.quantity).toFixed(2)}kg)`;
    });
    const total = stashItems.reduce((sum, s) => sum + getEffectiveValue(s) * s.quantity, 0);
    const weight = stashItems.reduce((sum, s) => sum + getEffectiveWeight(s) * s.quantity, 0);
    
    return `=== Arc Raiders Stash ===\n${lines.join('\n')}\n\nTotal: ${total.toLocaleString()} coins\nWeight: ${weight.toFixed(1)}kg\nRatio: ${(total / weight).toFixed(2)} coins/kg`;
  }, [stashItems]);

  const exportToFile = useCallback(() => {
    const data = stashItems.map(({ itemId, quantity, weaponLevel, attachedMods }) => ({ 
      itemId, 
      quantity,
      ...(weaponLevel && { weaponLevel }),
      ...(attachedMods?.length && { attachedMods: attachedMods.map(am => ({ modId: am.modId })) })
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arc-raiders-stash-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [stashItems]);

  const importFromFile = useCallback((file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (Array.isArray(data)) {
            const validItems = data.filter((s: any) => s.itemId && typeof s.quantity === 'number' && getItemById(s.itemId));
            setStashItems(validItems.map((s: any) => {
              const attachedMods = s.attachedMods?.map((am: any) => {
                const mod = getModById(am.modId);
                return mod ? { modId: am.modId, mod } : null;
              }).filter(Boolean) || [];

              return {
                itemId: s.itemId,
                quantity: s.quantity,
                weaponLevel: s.weaponLevel,
                item: getItemById(s.itemId)!,
                attachedMods
              };
            }));
            resolve(true);
          } else {
            resolve(false);
          }
        } catch {
          resolve(false);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsText(file);
    });
  }, []);

  // Calculations - using effective value and weight for weapons with mods
  const totalValue = stashItems.reduce((sum, s) => sum + getEffectiveValue(s) * s.quantity, 0);
  const totalWeight = stashItems.reduce((sum, s) => sum + getEffectiveWeight(s) * s.quantity, 0);
  const valuePerWeight = totalWeight > 0 ? totalValue / totalWeight : 0;
  const recycleValue = Math.floor(totalValue * 0.5);
  const uniqueItems = stashItems.length;

  const valueByType = stashItems.reduce((acc, s) => {
    acc[s.item.type] = (acc[s.item.type] || 0) + getEffectiveValue(s) * s.quantity;
    return acc;
  }, {} as Record<string, number>);

  return {
    stashItems,
    addItem,
    updateQuantity,
    removeItem,
    addModToWeapon,
    removeModFromWeapon,
    clearAll,
    saveBackup,
    getBackups,
    loadBackup,
    exportAsText,
    exportToFile,
    importFromFile,
    totalValue,
    totalWeight,
    valuePerWeight,
    recycleValue,
    uniqueItems,
    valueByType,
  };
}
