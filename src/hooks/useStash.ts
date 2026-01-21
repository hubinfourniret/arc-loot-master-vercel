import { useState, useEffect, useCallback } from 'react';
import { Item, getItemById } from '@/data/items';

export interface StashItem {
  itemId: string;
  quantity: number;
  item: Item;
}

export interface StashBackup {
  id: string;
  timestamp: number;
  items: StashItem[];
  name: string;
}

const STASH_KEY = 'arcraiders_stash';
const BACKUPS_KEY = 'arcraiders_stash_backups';

export function useStash() {
  const [stashItems, setStashItems] = useState<StashItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STASH_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validItems = parsed.filter((s: any) => getItemById(s.itemId));
        setStashItems(validItems.map((s: any) => ({
          ...s,
          item: getItemById(s.itemId)!
        })));
      } catch (e) {
        console.error('Failed to load stash:', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    const toSave = stashItems.map(({ itemId, quantity }) => ({ itemId, quantity }));
    localStorage.setItem(STASH_KEY, JSON.stringify(toSave));
  }, [stashItems]);

  const addItem = useCallback((itemId: string, quantity: number = 1) => {
    const item = getItemById(itemId);
    if (!item) return;

    setStashItems(prev => {
      const existing = prev.find(s => s.itemId === itemId);
      if (existing) {
        return prev.map(s => 
          s.itemId === itemId 
            ? { ...s, quantity: s.quantity + quantity }
            : s
        );
      }
      return [...prev, { itemId, quantity, item }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setStashItems(prev => 
      prev.map(s => s.itemId === itemId ? { ...s, quantity } : s)
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setStashItems(prev => prev.filter(s => s.itemId !== itemId));
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
      setStashItems(validItems.map(s => ({
        ...s,
        item: getItemById(s.itemId)!
      })));
    }
  }, [getBackups]);

  const exportAsText = useCallback(() => {
    const lines = stashItems.map(s => 
      `${s.item.name} x${s.quantity} - ${s.item.value * s.quantity} coins (${s.item.weight * s.quantity}kg)`
    );
    const total = stashItems.reduce((sum, s) => sum + s.item.value * s.quantity, 0);
    const weight = stashItems.reduce((sum, s) => sum + s.item.weight * s.quantity, 0);
    
    return `=== Arc Raiders Stash ===\n${lines.join('\n')}\n\nTotal: ${total.toLocaleString()} coins\nWeight: ${weight.toFixed(1)}kg\nRatio: ${(total / weight).toFixed(2)} coins/kg`;
  }, [stashItems]);

  // Calculations
  const totalValue = stashItems.reduce((sum, s) => sum + s.item.value * s.quantity, 0);
  const totalWeight = stashItems.reduce((sum, s) => sum + s.item.weight * s.quantity, 0);
  const valuePerWeight = totalWeight > 0 ? totalValue / totalWeight : 0;
  const recycleValue = Math.floor(totalValue * 0.5);
  const uniqueItems = stashItems.length;

  const valueByType = stashItems.reduce((acc, s) => {
    acc[s.item.type] = (acc[s.item.type] || 0) + s.item.value * s.quantity;
    return acc;
  }, {} as Record<string, number>);

  return {
    stashItems,
    addItem,
    updateQuantity,
    removeItem,
    clearAll,
    saveBackup,
    getBackups,
    loadBackup,
    exportAsText,
    totalValue,
    totalWeight,
    valuePerWeight,
    recycleValue,
    uniqueItems,
    valueByType,
  };
}
