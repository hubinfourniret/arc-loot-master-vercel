export interface Item {
  id: string;
  name: string;
  type: 'Weapons' | 'Consumables' | 'Crafting Materials' | 'Gear' | 'Ammo' | 'Throwables';
  value: number;
  weight: number;
  rarity: 'Common' | 'Rare' | 'Legendary';
  dps?: number;
  description: string;
}

export const items: Item[] = [
  // Weapons
  { id: "weapon_assault_rifle_01", name: "Assault Rifle DMR", type: "Weapons", value: 3500, weight: 8.5, rarity: "Rare", dps: 285, description: "Medium-range assault rifle" },
  { id: "weapon_smg_01", name: "Vector SMG", type: "Weapons", value: 2800, weight: 5.2, rarity: "Rare", dps: 340, description: "High fire rate submachine gun" },
  { id: "weapon_shotgun_01", name: "Breacher Shotgun", type: "Weapons", value: 2200, weight: 7.8, rarity: "Common", dps: 420, description: "Close-range devastation" },
  { id: "weapon_sniper_01", name: "Longshot Rifle", type: "Weapons", value: 5500, weight: 12.0, rarity: "Legendary", dps: 180, description: "Precision long-range sniper" },
  { id: "weapon_pistol_01", name: "Sidearm P9", type: "Weapons", value: 800, weight: 2.1, rarity: "Common", dps: 95, description: "Reliable backup weapon" },
  { id: "weapon_lmg_01", name: "Suppressor LMG", type: "Weapons", value: 4200, weight: 15.5, rarity: "Rare", dps: 310, description: "Sustained fire support" },
  { id: "weapon_crossbow_01", name: "Silent Hunter", type: "Weapons", value: 3800, weight: 6.5, rarity: "Rare", dps: 150, description: "Silent elimination tool" },
  { id: "weapon_launcher_01", name: "Devastator RPG", type: "Weapons", value: 8500, weight: 18.0, rarity: "Legendary", dps: 850, description: "Anti-vehicle launcher" },
  { id: "weapon_smg_02", name: "Compact MP7", type: "Weapons", value: 1900, weight: 4.0, rarity: "Common", dps: 280, description: "Lightweight SMG" },
  { id: "weapon_rifle_01", name: "Battle Rifle MK4", type: "Weapons", value: 4800, weight: 9.5, rarity: "Legendary", dps: 320, description: "Elite combat rifle" },

  // Consumables
  { id: "consumable_medkit_01", name: "Medical Kit", type: "Consumables", value: 450, weight: 1.5, rarity: "Common", description: "Restores full health" },
  { id: "consumable_stim_01", name: "Combat Stim", type: "Consumables", value: 650, weight: 0.5, rarity: "Rare", description: "Temporary damage boost" },
  { id: "consumable_bandage_01", name: "Field Bandage", type: "Consumables", value: 120, weight: 0.3, rarity: "Common", description: "Quick heal small wounds" },
  { id: "consumable_painkiller_01", name: "Painkillers", type: "Consumables", value: 280, weight: 0.2, rarity: "Common", description: "Reduces damage taken" },
  { id: "consumable_adrenaline_01", name: "Adrenaline Shot", type: "Consumables", value: 850, weight: 0.4, rarity: "Rare", description: "Speed and stamina boost" },
  { id: "consumable_antidote_01", name: "Antidote Vial", type: "Consumables", value: 380, weight: 0.3, rarity: "Common", description: "Cures poison effects" },
  { id: "consumable_energy_01", name: "Energy Drink", type: "Consumables", value: 150, weight: 0.5, rarity: "Common", description: "Stamina recovery" },
  { id: "consumable_ration_01", name: "Military Ration", type: "Consumables", value: 320, weight: 1.0, rarity: "Common", description: "Slow health regeneration" },

  // Crafting Materials
  { id: "craft_metal_01", name: "Scrap Metal", type: "Crafting Materials", value: 85, weight: 2.0, rarity: "Common", description: "Basic crafting material" },
  { id: "craft_electronics_01", name: "Electronic Parts", type: "Crafting Materials", value: 220, weight: 0.8, rarity: "Common", description: "For tech repairs" },
  { id: "craft_polymer_01", name: "Advanced Polymer", type: "Crafting Materials", value: 380, weight: 1.2, rarity: "Rare", description: "High-grade synthetic" },
  { id: "craft_crystal_01", name: "Arc Crystal", type: "Crafting Materials", value: 1200, weight: 0.5, rarity: "Legendary", description: "Rare energy source" },
  { id: "craft_fabric_01", name: "Reinforced Fabric", type: "Crafting Materials", value: 145, weight: 0.6, rarity: "Common", description: "Armor repairs" },
  { id: "craft_chemical_01", name: "Chemical Compound", type: "Crafting Materials", value: 290, weight: 0.4, rarity: "Rare", description: "Explosive synthesis" },
  { id: "craft_wire_01", name: "Copper Wiring", type: "Crafting Materials", value: 95, weight: 0.3, rarity: "Common", description: "Electrical repairs" },
  { id: "craft_titanium_01", name: "Titanium Alloy", type: "Crafting Materials", value: 650, weight: 1.8, rarity: "Rare", description: "Premium metal" },
  { id: "craft_battery_01", name: "Power Cell", type: "Crafting Materials", value: 420, weight: 1.0, rarity: "Rare", description: "Energy storage" },
  { id: "craft_circuit_01", name: "Circuit Board", type: "Crafting Materials", value: 180, weight: 0.2, rarity: "Common", description: "Tech component" },

  // Gear
  { id: "gear_helmet_01", name: "Tactical Helmet", type: "Gear", value: 1800, weight: 3.5, rarity: "Rare", description: "Head protection" },
  { id: "gear_vest_01", name: "Combat Vest", type: "Gear", value: 2400, weight: 8.0, rarity: "Rare", description: "Torso armor" },
  { id: "gear_backpack_01", name: "Assault Pack", type: "Gear", value: 1200, weight: 2.0, rarity: "Common", description: "+20kg capacity" },
  { id: "gear_boots_01", name: "Tactical Boots", type: "Gear", value: 950, weight: 2.5, rarity: "Common", description: "Movement speed bonus" },
  { id: "gear_gloves_01", name: "Combat Gloves", type: "Gear", value: 680, weight: 0.8, rarity: "Common", description: "Grip enhancement" },
  { id: "gear_mask_01", name: "Gas Mask", type: "Gear", value: 750, weight: 1.2, rarity: "Common", description: "Toxin immunity" },
  { id: "gear_nightvision_01", name: "Night Vision Goggles", type: "Gear", value: 3200, weight: 1.5, rarity: "Legendary", description: "See in darkness" },
  { id: "gear_exo_01", name: "Exo-Skeleton Frame", type: "Gear", value: 8500, weight: 12.0, rarity: "Legendary", description: "+50kg carry capacity" },
  { id: "gear_cloak_01", name: "Stealth Cloak", type: "Gear", value: 4500, weight: 3.0, rarity: "Legendary", description: "Reduced detection" },
  { id: "gear_belt_01", name: "Utility Belt", type: "Gear", value: 520, weight: 1.0, rarity: "Common", description: "Extra slots" },

  // Ammo
  { id: "ammo_rifle_01", name: "Rifle Ammo Box", type: "Ammo", value: 180, weight: 2.5, rarity: "Common", description: "60 rounds 5.56mm" },
  { id: "ammo_smg_01", name: "SMG Ammo Box", type: "Ammo", value: 150, weight: 1.8, rarity: "Common", description: "90 rounds 9mm" },
  { id: "ammo_shotgun_01", name: "Shotgun Shells", type: "Ammo", value: 220, weight: 3.0, rarity: "Common", description: "24 shells 12ga" },
  { id: "ammo_sniper_01", name: "Sniper Rounds", type: "Ammo", value: 350, weight: 2.0, rarity: "Rare", description: "20 rounds .308" },
  { id: "ammo_pistol_01", name: "Pistol Magazine", type: "Ammo", value: 80, weight: 0.8, rarity: "Common", description: "30 rounds 9mm" },
  { id: "ammo_heavy_01", name: "Heavy Ammo Crate", type: "Ammo", value: 420, weight: 5.5, rarity: "Rare", description: "100 rounds 7.62mm" },
  { id: "ammo_explosive_01", name: "Explosive Rounds", type: "Ammo", value: 680, weight: 3.5, rarity: "Legendary", description: "High damage ammo" },
  { id: "ammo_ap_01", name: "Armor Piercing Mag", type: "Ammo", value: 450, weight: 2.2, rarity: "Rare", description: "Penetration bonus" },

  // Throwables
  { id: "throw_frag_01", name: "Frag Grenade", type: "Throwables", value: 380, weight: 0.8, rarity: "Common", description: "Explosive damage" },
  { id: "throw_smoke_01", name: "Smoke Grenade", type: "Throwables", value: 180, weight: 0.6, rarity: "Common", description: "Area concealment" },
  { id: "throw_flash_01", name: "Flashbang", type: "Throwables", value: 280, weight: 0.5, rarity: "Common", description: "Blind enemies" },
  { id: "throw_molotov_01", name: "Molotov Cocktail", type: "Throwables", value: 250, weight: 0.7, rarity: "Common", description: "Area denial fire" },
  { id: "throw_emp_01", name: "EMP Grenade", type: "Throwables", value: 650, weight: 0.6, rarity: "Rare", description: "Disable electronics" },
  { id: "throw_decoy_01", name: "Decoy Device", type: "Throwables", value: 320, weight: 0.4, rarity: "Rare", description: "Distract enemies" },
  { id: "throw_mine_01", name: "Proximity Mine", type: "Throwables", value: 580, weight: 1.2, rarity: "Rare", description: "Trap placement" },
  { id: "throw_c4_01", name: "C4 Explosive", type: "Throwables", value: 850, weight: 1.5, rarity: "Legendary", description: "Remote detonation" },
  { id: "throw_gas_01", name: "Toxic Gas Canister", type: "Throwables", value: 480, weight: 0.9, rarity: "Rare", description: "Poison damage" },
  { id: "throw_stun_01", name: "Stun Bomb", type: "Throwables", value: 350, weight: 0.5, rarity: "Common", description: "Slow enemies" },
];

export const itemTypes = ['Weapons', 'Consumables', 'Crafting Materials', 'Gear', 'Ammo', 'Throwables'] as const;
export const rarities = ['Common', 'Rare', 'Legendary'] as const;

export const getItemById = (id: string): Item | undefined => items.find(item => item.id === id);
export const getItemsByType = (type: string): Item[] => items.filter(item => item.type === type);
export const getItemsByRarity = (rarity: string): Item[] => items.filter(item => item.rarity === rarity);
