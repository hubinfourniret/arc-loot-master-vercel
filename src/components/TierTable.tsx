import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Star, ChevronUp, ChevronDown, Award, Scale, Gem, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { allItems, itemTypes, rarities } from '@/data/items';
import { ItemImage } from '@/components/ItemImage';
import { toast } from 'sonner';
interface TierTableProps {
  onAddItem: (itemId: string, quantity: number) => void;
}

type SortKey = 'name' | 'value' | 'weight' | 'ratio' | 'rarity';
type SortDirection = 'asc' | 'desc';

export function TierTable({ onAddItem }: TierTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [rarityFilters, setRarityFilters] = useState<string[]>(['Common','Uncommon', 'Rare', 'Epic', 'Legendary']);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('value');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const toggleRarityFilter = (rarity: string) => {
    setRarityFilters(prev => 
      prev.includes(rarity) 
        ? prev.filter(r => r !== rarity)
        : [...prev, rarity]
    );
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    const filtered = allItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesRarity = rarityFilters.includes(item.rarity);
      return matchesSearch && matchesType && matchesRarity;
    });

    // Sort favorites first, then by chosen key
    return filtered.sort((a, b) => {
      const aFav = favorites.has(a.id) ? 1 : 0;
      const bFav = favorites.has(b.id) ? 1 : 0;
      if (aFav !== bFav) return bFav - aFav;

      let aVal: number[] | number, bVal: number[] | number;
      switch (sortKey) {
        case 'name':
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'value':
          aVal = a.value;
          bVal = b.value;
          break;
        case 'weight':
          aVal = a.weight;
          bVal = b.weight;
          break;
        case 'ratio':
          aVal = a?.value[1] / a.weight;
          bVal = b?.value[1] / b.weight;
          break;
        case 'rarity':
          { const rarityOrder = { 'Common': 0, "Uncommon": 1,'Rare': 2, 'Epic': 3, 'Legendary': 4 };
          aVal = rarityOrder[a.rarity];
          bVal = rarityOrder[b.rarity];
          break; }
        default:
          return 0;
      }
      return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
  }, [allItems, searchTerm, typeFilter, rarityFilters, favorites, sortKey, sortDirection]);

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  // Find special items
  const bestRatioItem = allItems.reduce((best, item) =>
    ((item.type === "Weapons" ? item.value[1] : item.value) / item.weight) > ((best.type === "Weapons" ? best.value[1] : best.value) / best.weight) ? item : best
  );
  const heaviestItem = allItems.reduce((heavy, item) =>
    item.weight > heavy.weight ? item : heavy
  );
  const mostValuable = allItems.reduce((val, item) =>
    item.value > val.value ? item : val
  );

  return (
    <section id="tier-table" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Loot Value <span className="text-gradient-primary">Tier Table</span>
          </h2>
          <p className="text-muted-foreground">Complete database of all Arc Raiders items</p>
        </div>

        {/* Filters */}
        <div className="card-tactical rounded-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48 bg-muted border-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Types</SelectItem>
                {itemTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rarity Filters */}
            <div className="flex items-center gap-4">
              {rarities.map(rarity => (
                <label key={rarity} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={rarityFilters.includes(rarity)}
                    onCheckedChange={() => toggleRarityFilter(rarity)}
                    className="border-border"
                  />
                  <span className={`text-sm ${
                    rarity === 'Legendary' ? 'text-yellow-400' :
                    rarity === 'Rare' ? 'text-primary' : 
                    rarity === 'Epic' ? 'text-purple-400' :
                    rarity === 'Uncommon' ? 'text-green-400' : 'text-muted-foreground'
                  }`}>
                    {rarity}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card-tactical rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="w-10 p-3"></th>
                  <th className="w-16 p-3 text-sm font-semibold text-muted-foreground">Image</th>
                  <th 
                    className="text-left p-3 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('name')}
                  >
                    <span className="flex items-center gap-1">Item Name <SortIcon column="name" /></span>
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-muted-foreground hidden sm:table-cell">
                    Type
                  </th>
                  <th 
                    className="text-right p-3 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('value')}
                  >
                    <span className="flex items-center justify-end gap-1">Value (Lvl 1) <SortIcon column="value" /></span>
                  </th>
                  <th className="text-right p-3 text-sm font-semibold text-muted-foreground hidden md:table-cell">
                    <span className="text-xs">Lvl 2</span>
                  </th>
                  <th className="text-right p-3 text-sm font-semibold text-muted-foreground hidden lg:table-cell">
                    <span className="text-xs">Lvl 3</span>
                  </th>
                  <th className="text-right p-3 text-sm font-semibold text-muted-foreground hidden lg:table-cell">
                    <span className="text-xs">Lvl 4</span>
                  </th>
                  <th 
                    className="text-right p-3 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground hidden md:table-cell"
                    onClick={() => handleSort('weight')}
                  >
                    <span className="flex items-center justify-end gap-1">Weight <SortIcon column="weight" /></span>
                  </th>
                  <th 
                    className="text-right p-3 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground hidden lg:table-cell"
                    onClick={() => handleSort('ratio')}
                  >
                    <span className="flex items-center justify-end gap-1">Ratio <SortIcon column="ratio" /></span>
                  </th>
                  <th 
                    className="text-center p-3 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('rarity')}
                  >
                    <span className="flex items-center justify-center gap-1">Rarity <SortIcon column="rarity" /></span>
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-muted-foreground hidden xl:table-cell">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Location</span>
                  </th>
                  <th className="w-16 p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedItems.map((item) => {
                  const isBestRatio = item.id === bestRatioItem.id;
                  const isHeaviest = item.id === heaviestItem.id;
                  const isMostValuable = item.id === mostValuable.id;
                  const isFavorite = favorites.has(item.id);
                  
                  return (
                    <tr 
                      key={item.id} 
                      className={`border-t border-border hover:bg-muted/30 transition-colors ${
                        isFavorite ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="p-3 text-center">
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className={`p-1 rounded transition-colors ${
                            isFavorite ? 'text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                      </td>
                      <td className="p-3">
                        <ItemImage 
                          src={item?.imageUrl}
                          alt={item.name} 
                          size="md" 
                          rarity={item.rarity} 
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-foreground font-medium">{item.name}</span>
                          <div className="flex flex-wrap gap-1">
                            {isBestRatio && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-success/20 text-success flex items-center gap-1">
                                <Award className="w-3 h-3" /> Best Ratio
                              </span>
                            )}
                            {isMostValuable && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary flex items-center gap-1">
                                <Gem className="w-3 h-3" /> Valuable
                              </span>
                            )}
                            {isHeaviest && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-warning/20 text-warning flex items-center gap-1">
                                <Scale className="w-3 h-3" /> Heaviest
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground hidden sm:table-cell">
                        <span className="text-xs px-2 py-1 rounded bg-muted">{item.type}</span>
                      </td>
                      <td className="p-3 text-right text-primary font-mono font-bold">
                        {item.type === "Weapons" ? item.value[0].toLocaleString() : item.value.toLocaleString()}
                      </td>
                      {/* Weapon level values - only show for weapons */}
                      <td className="p-3 text-right text-muted-foreground font-mono hidden md:table-cell">
                        {item.value[1] ? item.value[1].toLocaleString() : "-"}
                      </td>
                      <td className="p-3 text-right text-muted-foreground font-mono hidden lg:table-cell">
                        {item.value[2] ? item.value[2].toLocaleString() : "-"}
                      </td>
                      <td className="p-3 text-right text-muted-foreground font-mono hidden lg:table-cell">
                        {item.value[3] ? item.value[3].toLocaleString() : "-"}
                      </td>
                      <td className="p-3 text-right text-muted-foreground font-mono hidden md:table-cell">
                        {item.weight}kg
                      </td>
                      <td className="p-3 text-right text-success font-mono hidden lg:table-cell">
                        {((item.type === "Weapons" ? item.value[1] : item.value) / item.weight).toFixed(1)}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`text-xs px-2 py-1 rounded border ${
                          item.rarity === 'Legendary' ? 'rarity-legendary bg-yellow-500/10' :
                          item.rarity === 'Rare' ? 'rarity-rare bg-primary/10' :
                          item.rarity === 'Epic' ? 'rarity-epic bg-purple-500/10' :
                          item.rarity === 'Uncommon' ? 'rarity-uncommon bg-green-500/10' :
                          'rarity-common bg-muted'
                        }`}>
                          {item.rarity}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground text-sm hidden xl:table-cell">
                        {item.canBeFoundIn || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-border text-sm text-muted-foreground">
            Showing {filteredAndSortedItems.length} of {allItems.length} items
          </div>
        </div>
      </div>
    </section>
  );
}
