import React, { useState } from 'react';
import { Target, Shield, Zap, AlertTriangle, Save, Share2, Crosshair, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLoadout } from '@/hooks/useLoadout';
import { items } from '@/data/items';
import { toast } from 'sonner';

export function LoadoutOptimizer() {
  const {
    slots,
    setSlotItem,
    clearSlot,
    applyPreset,
    presets,
    getSavedLoadouts,
    saveLoadout,
    loadSavedLoadout,
    exportLoadout,
    totalValue,
    totalWeight,
    totalDps,
    maxLoss,
    safeProfit,
    weightCapacity,
    weightPercent,
    getBestRatioItem,
  } = useLoadout();

  const [loadoutName, setLoadoutName] = useState('');
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handleApplyPreset = (presetKey: keyof typeof presets) => {
    applyPreset(presetKey);
    setActivePreset(presetKey);
    toast.success(`Applied ${presets[presetKey].name} preset`);
  };

  const handleSaveLoadout = () => {
    if (!loadoutName.trim()) {
      toast.error('Please enter a loadout name');
      return;
    }
    saveLoadout(loadoutName);
    setLoadoutName('');
    toast.success('Loadout saved!');
  };

  const handleExport = () => {
    const encoded = exportLoadout();
    const url = `${window.location.origin}?loadout=${encoded}`;
    navigator.clipboard.writeText(url);
    toast.success('Share link copied to clipboard!');
  };

  const weightColor = weightPercent > 100 ? 'bg-destructive' : weightPercent > 80 ? 'bg-warning' : 'bg-success';
  const bestRatioItem = getBestRatioItem();

  const getItemsForSlot = (slotType: string) => {
    if (slotType === 'Consumables') {
      return items.filter(i => i.type === 'Consumables' || i.type === 'Ammo');
    }
    return items.filter(i => i.type === slotType);
  };

  return (
    <section id="loadout" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Loadout <span className="text-gradient-primary">Optimizer</span>
          </h2>
          <p className="text-muted-foreground">Plan your perfect raid kit</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Preset Buttons */}
          <div className="card-tactical rounded-lg p-4 mb-6">
            <h3 className="text-sm font-bold text-muted-foreground mb-3">Quick Presets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(presets).map(([key, preset]) => (
                <Button
                  key={key}
                  variant={activePreset === key ? "default" : "outline"}
                  onClick={() => handleApplyPreset(key as keyof typeof presets)}
                  className={`justify-start ${activePreset === key ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  {key === 'safe' && <Shield className="w-4 h-4 mr-2" />}
                  {key === 'aggressive' && <Crosshair className="w-4 h-4 mr-2" />}
                  {key === 'farming' && <Zap className="w-4 h-4 mr-2" />}
                  {key === 'custom' && <Star className="w-4 h-4 mr-2" />}
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Loadout Slots */}
            <div className="lg:col-span-2 space-y-4">
              {slots.map((slot) => (
                <div key={slot.slotId} className="card-tactical rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg border border-border flex items-center justify-center flex-shrink-0">
                      {slot.item ? (
                        <span className={`text-2xl font-bold ${
                          slot.item.rarity === 'Legendary' ? 'text-yellow-400' :
                          slot.item.rarity === 'Rare' ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {slot.item.name.charAt(0)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-2xl">?</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-muted-foreground">
                          Slot {slot.slotId}: {slot.slotName}
                        </span>
                        {slot.item && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => clearSlot(slot.slotId)}
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <Select
                        value={slot.item?.id || ''}
                        onValueChange={(value) => setSlotItem(slot.slotId, value)}
                      >
                        <SelectTrigger className="bg-muted border-border">
                          <SelectValue placeholder={`Select ${slot.slotType.toLowerCase()}...`} />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border max-h-64">
                          {getItemsForSlot(slot.slotType).map(item => (
                            <SelectItem key={item.id} value={item.id}>
                              <span className="flex items-center gap-2">
                                <span className={`text-xs px-1.5 py-0.5 rounded border ${
                                  item.rarity === 'Legendary' ? 'rarity-legendary' :
                                  item.rarity === 'Rare' ? 'rarity-rare' : 'rarity-common'
                                }`}>
                                  {item.rarity.charAt(0)}
                                </span>
                                {item.name} - {item.value}c / {item.weight}kg
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {slot.item && (
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span>💰 {slot.item.value.toLocaleString()} coins</span>
                          <span>⚖️ {slot.item.weight}kg</span>
                          {slot.item.dps && <span>🎯 {slot.item.dps} DPS</span>}
                          <span className={`px-1.5 py-0.5 rounded ${
                            slot.item.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                            slot.item.rarity === 'Rare' ? 'bg-primary/20 text-primary' :
                            'bg-muted-foreground/20'
                          }`}>
                            {slot.item.rarity}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Save/Export Actions */}
              <div className="card-tactical rounded-lg p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Loadout name..."
                      value={loadoutName}
                      onChange={(e) => setLoadoutName(e.target.value)}
                      className="bg-muted border-border"
                    />
                    <Button onClick={handleSaveLoadout} className="bg-primary text-primary-foreground">
                      <Save className="w-4 h-4 mr-1" /> Save
                    </Button>
                  </div>
                  <Button variant="outline" onClick={handleExport}>
                    <Share2 className="w-4 h-4 mr-1" /> Share Link
                  </Button>
                  <Select onValueChange={loadSavedLoadout}>
                    <SelectTrigger className="w-40 bg-muted border-border">
                      <span className="text-sm">Load Saved</span>
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {getSavedLoadouts().map(l => (
                        <SelectItem key={l.id} value={l.id}>
                          {l.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Loadout Analysis */}
            <div className="space-y-4">
              <div className="card-tactical rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Loadout Analysis
                </h3>

                {/* Total Value */}
                <div className="bg-muted/50 rounded-lg p-4 mb-4 border border-primary/30">
                  <div className="text-sm text-muted-foreground mb-1">Total Loadout Value</div>
                  <div className="text-2xl font-bold text-primary font-mono">
                    {totalValue.toLocaleString()} <span className="text-sm">coins</span>
                  </div>
                </div>

                {/* Weight */}
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Weight</span>
                    <span className="font-mono text-foreground">{totalWeight.toFixed(1)} / {weightCapacity}kg</span>
                  </div>
                  <div className="progress-tactical h-3 rounded">
                    <div 
                      className={`h-full rounded ${weightColor}`}
                      style={{ width: `${Math.min(100, weightPercent)}%` }}
                    />
                  </div>
                </div>

                {/* DPS */}
                {totalDps > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                      <Crosshair className="w-3 h-3" /> Combined DPS
                    </div>
                    <div className="text-xl font-bold text-secondary font-mono">{totalDps}</div>
                  </div>
                )}

                {/* Risk Analysis */}
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-bold text-destructive">Risk Analysis</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">
                      Max loss if killed: <span className="text-destructive font-mono">{maxLoss.toLocaleString()}</span>
                    </p>
                    <p className="text-muted-foreground">
                      Safe extraction profit: <span className="text-success font-mono">+{(safeProfit - totalValue).toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                {/* Best Ratio Item */}
                {bestRatioItem && (
                  <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Best Value/Weight</div>
                    <div className="text-foreground font-bold">{bestRatioItem.name}</div>
                    <div className="text-xs text-success font-mono">
                      {(bestRatioItem.value / bestRatioItem.weight).toFixed(1)} coins/kg
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
