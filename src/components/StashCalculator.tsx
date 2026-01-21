import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Save, Download, Upload, Copy, ChevronUp, ChevronDown, Package, Scale, Coins, Recycle, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStash, StashBackup } from '@/hooks/useStash';
import { items, itemTypes } from '@/data/items';
import { toast } from 'sonner';

type SortKey = 'name' | 'quantity' | 'value' | 'weight' | 'ratio';
type SortDirection = 'asc' | 'desc';

export function StashCalculator() {
  const {
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
  } = useStash();

  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('value');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [backups, setBackups] = useState<StashBackup[]>([]);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const sortedStashItems = useMemo(() => {
    return [...stashItems].sort((a, b) => {
      let aVal: number, bVal: number;
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
          aVal = a.item.value * a.quantity;
          bVal = b.item.value * b.quantity;
          break;
        case 'weight':
          aVal = a.item.weight * a.quantity;
          bVal = b.item.weight * b.quantity;
          break;
        case 'ratio':
          aVal = a.item.value / a.item.weight;
          bVal = b.item.value / b.item.weight;
          break;
        default:
          return 0;
      }
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [stashItems, sortKey, sortDirection]);

  const handleAddItem = () => {
    if (!selectedItemId) {
      toast.error('Please select an item');
      return;
    }
    addItem(selectedItemId, quantity);
    setSelectedItemId('');
    setQuantity(1);
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

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const weightPercent = (totalWeight / 150) * 100;
  const weightColor = weightPercent > 100 ? 'bg-destructive' : weightPercent > 80 ? 'bg-warning' : 'bg-success';

  return (
    <section id="calculator" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Stash Value <span className="text-gradient-primary">Calculator</span>
          </h2>
          <p className="text-muted-foreground">Add items to calculate your total stash value</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Item Form */}
            <div className="card-tactical rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Add Items to Your Stash
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2 bg-muted border-border"
                  />
                  <Select value={selectedItemId} onValueChange={setSelectedItemId}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue placeholder="Select an item..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border max-h-64">
                      {filteredItems.map(item => (
                        <SelectItem key={item.id} value={item.id}>
                          <span className="flex items-center gap-2">
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              item.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                              item.rarity === 'Rare' ? 'bg-primary/20 text-primary' :
                              'bg-muted-foreground/20 text-muted-foreground'
                            }`}>
                              {item.type.slice(0, 4)}
                            </span>
                            {item.name} - {item.value}c
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-24">
                  <label className="text-xs text-muted-foreground mb-1 block">Qty</label>
                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="bg-muted border-border"
                  />
                </div>
                
                <div className="flex items-end">
                  <Button onClick={handleAddItem} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
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
                    <Copy className="w-4 h-4 mr-1" /> Export
                  </Button>
                  <Button variant="destructive" size="sm" onClick={clearAll}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
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
                        <td colSpan={7} className="text-center py-12 text-muted-foreground">
                          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Your stash is empty. Add some items!</p>
                        </td>
                      </tr>
                    ) : (
                      sortedStashItems.map((stash) => (
                        <tr key={stash.itemId} className="border-t border-border hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-1.5 py-0.5 rounded border ${
                                stash.item.rarity === 'Legendary' ? 'rarity-legendary' :
                                stash.item.rarity === 'Rare' ? 'rarity-rare' : 'rarity-common'
                              }`}>
                                {stash.item.rarity.charAt(0)}
                              </span>
                              <span className="text-foreground font-medium">{stash.item.name}</span>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <Input
                              type="number"
                              min={1}
                              value={stash.quantity}
                              onChange={(e) => updateQuantity(stash.itemId, parseInt(e.target.value) || 0)}
                              className="w-16 h-8 text-center bg-muted border-border mx-auto"
                            />
                          </td>
                          <td className="p-3 text-right text-muted-foreground font-mono">
                            {stash.item.value.toLocaleString()}
                          </td>
                          <td className="p-3 text-right text-primary font-bold font-mono">
                            {(stash.item.value * stash.quantity).toLocaleString()}
                          </td>
                          <td className="p-3 text-right text-muted-foreground font-mono hidden sm:table-cell">
                            {(stash.item.weight * stash.quantity).toFixed(1)}kg
                          </td>
                          <td className="p-3 text-right text-success font-mono hidden md:table-cell">
                            {(stash.item.value / stash.item.weight).toFixed(1)}
                          </td>
                          <td className="p-3 text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(stash.itemId)}
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
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
                    {totalWeight.toFixed(1)} / 150kg
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
