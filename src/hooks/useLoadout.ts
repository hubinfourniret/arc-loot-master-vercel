import { useState, useEffect, useCallback } from 'react';
import { Item, getItemById, items } from '@/data/items';

export interface LoadoutSlot {
  slotId: number;
  slotName: string;
  slotType: string;
  item: Item | null;
}

export interface SavedLoadout {
  id: string;
  name: string;
  timestamp: number;
  slots: { slotId: number; itemId: string | null }[];
}

const LOADOUTS_KEY = 'arcraiders_loadouts';
const CURRENT_LOADOUT_KEY = 'arcraiders_current_loadout';

const defaultSlots: LoadoutSlot[] = [
  { slotId: 1, slotName: 'Primary Weapon', slotType: 'Weapons', item: null },
  { slotId: 2, slotName: 'Secondary Weapon', slotType: 'Weapons', item: null },
  { slotId: 3, slotName: 'Consumables', slotType: 'Consumables', item: null },
  { slotId: 4, slotName: 'Gear', slotType: 'Gear', item: null },
  { slotId: 5, slotName: 'Throwables', slotType: 'Throwables', item: null },
];

const presets = {
  safe: {
    name: 'Solo Safe Run',
    items: ['weapon_pistol_01', 'weapon_smg_02', 'consumable_medkit_01', 'gear_backpack_01', 'throw_smoke_01']
  },
  aggressive: {
    name: 'Aggressive Trio Kit',
    items: ['weapon_assault_rifle_01', 'weapon_shotgun_01', 'consumable_stim_01', 'gear_vest_01', 'throw_frag_01']
  },
  farming: {
    name: 'Crafting/Farming',
    items: ['weapon_pistol_01', null, 'consumable_energy_01', 'gear_backpack_01', null]
  },
  custom: {
    name: 'Custom Build',
    items: [null, null, null, null, null]
  }
};

export function useLoadout() {
  const [slots, setSlots] = useState<LoadoutSlot[]>(defaultSlots);

  useEffect(() => {
    const saved = localStorage.getItem(CURRENT_LOADOUT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSlots(defaultSlots.map((slot, i) => ({
          ...slot,
          item: parsed[i]?.itemId ? getItemById(parsed[i].itemId) || null : null
        })));
      } catch (e) {
        console.error('Failed to load loadout:', e);
      }
    }
  }, []);

  useEffect(() => {
    const toSave = slots.map(s => ({ slotId: s.slotId, itemId: s.item?.id || null }));
    localStorage.setItem(CURRENT_LOADOUT_KEY, JSON.stringify(toSave));
  }, [slots]);

  const setSlotItem = useCallback((slotId: number, itemId: string | null) => {
    const item = itemId ? getItemById(itemId) || null : null;
    setSlots(prev => prev.map(s => 
      s.slotId === slotId ? { ...s, item } : s
    ));
  }, []);

  const clearSlot = useCallback((slotId: number) => {
    setSlots(prev => prev.map(s => 
      s.slotId === slotId ? { ...s, item: null } : s
    ));
  }, []);

  const applyPreset = useCallback((presetKey: keyof typeof presets) => {
    const preset = presets[presetKey];
    setSlots(defaultSlots.map((slot, i) => ({
      ...slot,
      item: preset.items[i] ? getItemById(preset.items[i]!) || null : null
    })));
  }, []);

  const getSavedLoadouts = useCallback((): SavedLoadout[] => {
    try {
      const saved = localStorage.getItem(LOADOUTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, []);

  const saveLoadout = useCallback((name: string) => {
    const loadouts = getSavedLoadouts();
    const newLoadout: SavedLoadout = {
      id: Date.now().toString(),
      name,
      timestamp: Date.now(),
      slots: slots.map(s => ({ slotId: s.slotId, itemId: s.item?.id || null }))
    };
    loadouts.unshift(newLoadout);
    localStorage.setItem(LOADOUTS_KEY, JSON.stringify(loadouts.slice(0, 20)));
    return newLoadout;
  }, [slots, getSavedLoadouts]);

  const loadSavedLoadout = useCallback((loadoutId: string) => {
    const loadouts = getSavedLoadouts();
    const loadout = loadouts.find(l => l.id === loadoutId);
    if (loadout) {
      setSlots(defaultSlots.map((slot, i) => {
        const saved = loadout.slots.find(s => s.slotId === slot.slotId);
        return {
          ...slot,
          item: saved?.itemId ? getItemById(saved.itemId) || null : null
        };
      }));
    }
  }, [getSavedLoadouts]);

  const exportLoadout = useCallback(() => {
    const data = {
      slots: slots.map(s => ({ slotId: s.slotId, itemId: s.item?.id || null }))
    };
    return btoa(JSON.stringify(data));
  }, [slots]);

  const importLoadout = useCallback((encoded: string) => {
    try {
      const data = JSON.parse(atob(encoded));
      setSlots(defaultSlots.map((slot) => {
        const saved = data.slots.find((s: any) => s.slotId === slot.slotId);
        return {
          ...slot,
          item: saved?.itemId ? getItemById(saved.itemId) || null : null
        };
      }));
      return true;
    } catch {
      return false;
    }
  }, []);

  // Helper to get base value for an item (handles weapon arrays)
  const getItemValue = (item: Item): number => {
    if (Array.isArray(item.value)) {
      return item.value[0] || 0; // Default to level 1 for loadout
    }
    return item.value;
  };

  // Calculations
  const filledSlots = slots.filter(s => s.item !== null);
  const totalValue = filledSlots.reduce((sum, s) => sum + getItemValue(s.item!), 0);
  const totalWeight = filledSlots.reduce((sum, s) => sum + (s.item?.weight || 0), 0);
  const totalDps = filledSlots
    .filter(s => s.item?.dps)
    .reduce((sum, s) => sum + (s.item?.dps || 0), 0);
  
  const maxLoss = totalValue;
  const safeProfit = Math.floor(totalValue * 1.3);
  
  const weightCapacity = 50;
  const weightPercent = (totalWeight / weightCapacity) * 100;

  const getBestRatioItem = () => {
    const withRatio = filledSlots
      .filter(s => s.item)
      .map(s => ({
        item: s.item!,
        ratio: getItemValue(s.item!) / s.item!.weight
      }))
      .sort((a, b) => b.ratio - a.ratio);
    return withRatio[0]?.item || null;
  };

  return {
    slots,
    setSlotItem,
    clearSlot,
    applyPreset,
    presets,
    getSavedLoadouts,
    saveLoadout,
    loadSavedLoadout,
    exportLoadout,
    importLoadout,
    totalValue,
    totalWeight,
    totalDps,
    maxLoss,
    safeProfit,
    weightCapacity,
    weightPercent,
    getBestRatioItem,
  };
}
