import React, { useState, useMemo, useRef } from 'react';
import { Trash2, Save, Upload, Copy, ChevronUp, ChevronDown, Package, Scale, Coins, Recycle, Hash, FileDown, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStash, StashBackup, getEffectiveValue, getEffectiveWeight } from '@/hooks/useStash';
import { WeaponLevel } from '@/data/items';
import { ItemImage } from '@/components/ItemImage';
import { ItemSearchCombobox } from '@/components/ItemSearchCombobox';
import { WeaponModSelector } from '@/components/WeaponModSelector';
import { toast } from 'sonner';

type SortKey = 'name' | 'quantity' | 'value' | 'weight' | 'ratio';
type SortDirection = 'asc' | 'desc';

export function StashCalculator() {
  const {
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
  } = useStash();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sortKey, setSortKey] = useState<SortKey>('value');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [backups, setBackups] = useState<StashBackup[]>([]);

  const sortedStashItems = useMemo(() => {
    return [...stashItems].sort((a, b) => {
      let aVal: number, bVal: number;
      const aValue = a.item.type === "Weapons" ? a.item.value[a.weaponLevel] : a.item.value
      const bValue = b.item.type === "Weapons" ? b.item.value[b.weaponLevel] : b.item.value
      switch (sortKey) {
        case 'name':
          return sortDirection === 'asc' 
            ? a.item.name.localeCompare(b.item.name)
            : b.item.name.localeCompare(a.item.name);
        case 'quantity':
          aVal = a.quantity;
          bVal = b.quantity;
          break;
        case 'value':
          aVal = aValue * a.quantity;
          bVal = bValue * b.quantity;
          break;
          break;
        case 'weight':
          aVal = a.item.weight * a.quantity;
          bVal = b.item.weight * b.quantity;
          break;
        case 'ratio':
          aVal = aValue / a.item.weight;
          bVal = bValue / b.item.weight;
          break;
        default:
          return 0;
      }
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [stashItems, sortKey, sortDirection]);

  const handleAddItem = (itemId: string, qty: number, weaponLevel?: WeaponLevel) => {
    addItem(itemId, qty, weaponLevel);
    toast.success('Item added to stash');
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const handleSaveBackup = () => {
    saveBackup();
    setBackups(getBackups());
    toast.success('Stash backup saved');
  };

  const handleLoadBackup = (id: string) => {
    loadBackup(id);
    toast.success('Backup loaded');
  };

  const handleExport = () => {
    const text = exportAsText();
    navigator.clipboard.writeText(text);
    toast.success('Stash copied to clipboard');
  };

  const handleExportFile = () => {
    exportToFile();
    toast.success('Stash exported to file');
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const success = await importFromFile(file);
    if (success) {
      toast.success('Stash imported successfully');
    } else {
      toast.error('Failed to import stash - invalid file format');
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const weightPercent = (totalWeight / 90) * 100;
  const weightColor = weightPercent > 100 ? 'bg-destructive' : weightPercent > 80 ? 'bg-warning' : 'bg-success';

  return (
    <section id="calculator" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Stash Value <span className="text-gradient-primary">Calculator</span>
          </h2>
          <p className="text-muted-foreground">Search and add items to calculate your total stash value</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Item Form - New Combobox */}
            <div className="card-tactical rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Quick Add Items
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Search by name, type or rarity. Click + or press Enter to add items quickly.
              </p>
              <ItemSearchCombobox onAddItem={handleAddItem} />
            </div>

            {/* Stash Table */}
            <div className="card-tactical rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-foreground">Your Stash</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveBackup}>
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                  <Select onValueChange={handleLoadBackup}>
                    <SelectTrigger className="w-32 h-9 bg-muted border-border">
                      <Upload className="w-4 h-4 mr-1" />
                      <span className="text-xs">Load</span>
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {getBackups().map(b => (
                        <SelectItem key={b.id} value={b.id}>
                          {new Date(b.timestamp).toLocaleDateString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Copy className="w-4 h-4 mr-1" /> Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportFile}>
                    <FileDown className="w-4 h-4 mr-1" /> Export
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <FileUp className="w-4 h-4 mr-1" /> Import
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                  <Button variant="destructive" size="sm" onClick={clearAll}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="w-16 p-3 text-sm font-semibold text-muted-foreground">Image</th>
                      <th 
                        className="text-left p-3 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                        onClick={() => handleSort('name')}
                      >
                        <span className="flex items-center gap-1">Item Name <SortIcon column="name" /></span>
                      </th>
                      <th 
                        className="text-center p-3 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                        onClick={() => handleSort('quantity')}
                      >
                        <span className="flex items-center justify-center gap-1">Qty <SortIcon column="quantity" /></span>
                      </th>
                      <th className="text-right p-3 text-sm font-semibold text-muted-foreground">Value/Unit</th>
                      <th 
                        className="text-right p-3 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                        onClick={() => handleSort('value')}
                      >
                        <span className="flex items-center justify-end gap-1">Total <SortIcon column="value" /></span>
                      </th>
                      <th 
                        className="text-right p-3 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground hidden sm:table-cell"
                        onClick={() => handleSort('weight')}
                      >
                        <span className="flex items-center justify-end gap-1">Weight <SortIcon column="weight" /></span>
                      </th>
                      <th 
                        className="text-right p-3 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground hidden md:table-cell"
                        onClick={() => handleSort('ratio')}
                      >
                        <span className="flex items-center justify-end gap-1">Ratio <SortIcon column="ratio" /></span>
                      </th>
                      <th className="text-center p-3 text-sm font-semibold text-muted-foreground w-16">Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedStashItems.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-muted-foreground">
                          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Your stash is empty. Add some items!</p>
                        </td>
                      </tr>
                    ) : (
                      sortedStashItems.map((stash) => {
                        const effectiveValue = getEffectiveValue(stash);
                        const effectiveWeight = getEffectiveWeight(stash);
                        const stashKey = stash.item.type === 'Weapons' 
                          ? `${stash.itemId}-lvl${stash.weaponLevel}` 
                          : stash.itemId;
                        const isWeapon = stash.item.type === 'Weapons';
                        
                        return (
                          <tr key={stashKey} className="border-t border-border hover:bg-muted/30 transition-colors align-top">
                            <td className="p-3">
                              <ItemImage 
                                src={stash.item.imageUrl} 
                                alt={stash.item.name} 
                                size="sm" 
                                rarity={stash.item.rarity} 
                              />
                            </td>
                            <td className="p-3">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-xs px-1.5 py-0.5 rounded border ${
                                    stash.item.rarity === 'Legendary' ? 'rarity-legendary' :
                                    stash.item.rarity === 'Rare' ? 'rarity-rare' : 'rarity-common'
                                  }`}>
                                    {stash.item.rarity.charAt(0)}
                                  </span>
                                  <span className="text-foreground font-medium">{stash.item.name}</span>
                                  {stash.weaponLevel && (
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-accent text-accent-foreground">
                                      Lvl {stash.weaponLevel}
                                    </span>
                                  )}
                                </div>
                                {/* Weapon Mods Section */}
                                {isWeapon && stash.weaponLevel && (
                                  <WeaponModSelector
                                    weaponName={stash.item.name}
                                    attachedMods={stash.attachedMods || []}
                                    onAddMod={(modId) => addModToWeapon(stash.itemId, stash.weaponLevel!, modId)}
                                    onRemoveMod={(modId) => removeModFromWeapon(stash.itemId, stash.weaponLevel!, modId)}
                                  />
                                )}
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <Input
                                type="number"
                                min={1}
                                value={stash.quantity}
                                onChange={(e) => updateQuantity(stash.itemId, parseInt(e.target.value) || 0, stash.weaponLevel)}
                                className="w-16 h-8 text-center bg-muted border-border mx-auto"
                              />
                            </td>
                            <td className="p-3 text-right text-muted-foreground font-mono">
                              {effectiveValue.toLocaleString()}
                            </td>
                            <td className="p-3 text-right text-primary font-bold font-mono">
                              {(effectiveValue * stash.quantity).toLocaleString()}
                            </td>
                            <td className="p-3 text-right text-muted-foreground font-mono hidden sm:table-cell">
                              {(effectiveWeight * stash.quantity).toFixed(1)}kg
                            </td>
                            <td className="p-3 text-right text-success font-mono hidden md:table-cell">
                              {(effectiveValue / effectiveWeight).toFixed(1)}
                            </td>
                            <td className="p-3 text-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(stash.itemId, stash.weaponLevel)}
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-4">
            <div className="card-tactical rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Stash Summary</h3>
              
              {/* Total Value */}
              <div className="bg-muted/50 rounded-lg p-4 mb-4 border border-primary/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Coins className="w-4 h-4" />
                  <span className="text-sm">Total Stash Value</span>
                </div>
                <div className="text-3xl font-bold text-primary font-mono">
                  {totalValue.toLocaleString()}
                  <span className="text-lg ml-1 text-primary/70">coins</span>
                </div>
              </div>

              {/* Weight */}
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Scale className="w-4 h-4" />
                    <span className="text-sm">Total Weight</span>
                  </div>
                  <span className="font-mono text-foreground">
                    {totalWeight.toFixed(1)}kg
                  </span>
                </div>
                <div className="progress-tactical h-3 rounded">
                  <div 
                    className={`progress-tactical-fill rounded ${weightColor}`}
                    style={{ width: `${Math.min(100, weightPercent)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {weightPercent > 100 ? '⚠️ Over capacity!' : weightPercent > 80 ? '⚠️ Near capacity' : '✅ Good capacity'}
                </p>
              </div>

              {/* Other Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Value/Weight</div>
                  <div className="text-lg font-bold text-success font-mono">
                    {valuePerWeight.toFixed(2)}
                    <span className="text-xs ml-1">c/kg</span>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Recycle className="w-3 h-3" /> Recycle Value
                  </div>
                  <div className="text-lg font-bold text-warning font-mono">
                    {recycleValue.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3 col-span-2">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Hash className="w-3 h-3" /> Unique Items
                  </div>
                  <div className="text-lg font-bold text-foreground font-mono">
                    {uniqueItems}
                  </div>
                </div>
              </div>
            </div>

            {/* Value by Type */}
            <div className="card-tactical rounded-lg p-6">
              <h3 className="text-sm font-bold text-muted-foreground mb-3">Value by Type</h3>
              <div className="space-y-2">
                {Object.entries(valueByType)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, value]) => {
                    const percent = totalValue > 0 ? (value / totalValue) * 100 : 0;
                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{type}</span>
                          <span className="text-foreground font-mono">{value.toLocaleString()}</span>
                        </div>
                        <div className="progress-tactical h-2 rounded">
                          <div 
                            className="h-full rounded bg-primary/70"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
