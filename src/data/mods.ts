// ============================================================================
// WEAPON MODS DATA - ARC Raiders Wiki
// ============================================================================

export interface WeaponMod {
  id: string;
  name: string;
  type: 'Mods';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  value: number;
  weight: number;
  stackSize: number;
  compatibleWith: string[]; // Weapon names
  imageUrl: string;
  description: string;
  modCategory: 'Underbarrel' | 'Tech Mod' | 'Muzzle' | 'Light Magazine' | 'Medium Magazine' | 'Shotgun Magazine' | 'Stock' | 'Shotgun Muzzle'
}

export const weaponMods: WeaponMod[] = [
  {
    id: "item_angled_grip_i",
    name: "Angled Grip I",
    type: "Mods",
    modCategory: "Underbarrel",
    rarity: "Common",
    value: 640,
    weight: 0.25,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Venator", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/b/b5/Angled_Grip_I.png/348px-Angled_Grip_I.png.webp",
    description: "Angled Grip I is a Weapon Mod that slightly reduces horizontal recoil."
  },
  {
    id: "item_angled_grip_ii",
    name: "Angled Grip II",
    type: "Mods",
    modCategory: "Underbarrel",
    rarity: "Uncommon",
    value: 2000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Venator", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/2/2b/Angled_Grip_II.png/348px-Angled_Grip_II.png.webp",
    description: "Angled Grip II is a Weapon Mod that moderately reduces horizontal recoil."
  },
  {
    id: "item_angled_grip_iii",
    name: "Angled Grip III",
    type: "Mods",
    modCategory: "Underbarrel",
    rarity: "Rare",
    value: 5000,
    weight: 0.75,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Venator", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/0/0f/Angled_Grip_III.png/348px-Angled_Grip_III.png.webp",
    description: "Angled Grip III is a Weapon Mod that significantly reduces horizontal recoil."
  },
  {
    id: "item_anvil_splitter",
    name: "Anvil Splitter",
    type: "Mods",
    modCategory: "Tech Mod",
    rarity: "Legendary",
    value: 7000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Anvil"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/e/ef/Anvil_Splitter.png/348px-Anvil_Splitter.png.webp",
    description: "Anvil Splitter is a Weapon Mod exclusively for the Anvil that replaces its standard single projectile with four weaker ones."
  },
  {
    id: "item_compensator_i",
    name: "Compensator I",
    type: "Mods",
    modCategory: "Muzzle",
    rarity: "Common",
    value: 640,
    weight: 0.25,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Anvil", "Arpeggio", "Burletta", "Osprey", "Renegade", "Torrente", "Venator", "Bettina", "Bobcat", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/5/5f/Compensator_I.png/348px-Compensator_I.png.webp",
    description: "Compensator I is a Weapon Mod that slightly reduces per-shot dispersion."
  },
  {
    id: "item_compensator_ii",
    name: "Compensator II",
    type: "Mods",
    modCategory: "Muzzle",
    rarity: "Uncommon",
    value: 2000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Anvil", "Arpeggio", "Burletta", "Osprey", "Renegade", "Torrente", "Venator", "Bettina", "Bobcat", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/0/0a/Compensator_II.png/348px-Compensator_II.png.webp",
    description: "Compensator II is a Weapon Mod that moderately reduces per-shot dispersion."
  },
  {
    id: "item_compensator_iii",
    name: "Compensator III",
    type: "Mods",
    modCategory: "Muzzle",
    rarity: "Rare",
    value: 5000,
    weight: 0.75,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Anvil", "Arpeggio", "Burletta", "Osprey", "Renegade", "Torrente", "Venator", "Bettina", "Bobcat", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/a/af/Compensator_III.png/348px-Compensator_III.png.webp",
    description: "Compensator III is a Weapon Mod that significantly reduces per-shot dispersion."
  },
  {
    id: "item_extended_barrel",
    name: "Extended Barrel",
    type: "Mods",
    modCategory: "Muzzle",
    rarity: "Epic",
    value: 5000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Anvil", "Arpeggio", "Burletta", "Osprey", "Renegade", "Torrente", "Bettina", "Bobcat", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/2/2f/Extended_Barrel.png/348px-Extended_Barrel.png.webp",
    description: "Extended Barrel is a Weapon Mod that moderately increases bullet velocity."
  },
  {
    id: "item_extended_light_mag_i",
    name: "Extended Light Mag I",
    type: "Mods",
    modCategory: "Light Magazine",
    rarity: "Common",
    value: 640,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Hairpin", "Kettle", "Stitcher", "Burletta", "Bobcat"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/2/23/Extended_Light_Mag_I.png/348px-Extended_Light_Mag_I.png.webp",
    description: "Extended Light Mag I is a Weapon Mod that slightly extends the Light Ammo capacity of compatible weapons."
  },
  {
    id: "item_extended_light_mag_ii",
    name: "Extended Light Mag II",
    type: "Mods",
    modCategory: "Light Magazine",
    rarity: "Uncommon",
    value: 2000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Hairpin", "Kettle", "Stitcher", "Burletta", "Bobcat"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/c/cf/Extended_Light_Mag_II.png/348px-Extended_Light_Mag_II.png.webp",
    description: "Extended Light Mag II is a Weapon Mod that moderately extends the Light Ammo capacity of compatible weapons."
  },
  {
    id: "item_extended_light_mag_iii",
    name: "Extended Light Mag III",
    type: "Mods",
    modCategory: "Light Magazine",
    rarity: "Rare",
    value: 5000,
    weight: 0.75,
    stackSize: 1,
    compatibleWith: ["Hairpin", "Kettle", "Stitcher", "Burletta", "Bobcat"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/4/40/Extended_Light_Mag_III.png/348px-Extended_Light_Mag_III.png.webp",
    description: "Extended Light Mag III is a Weapon Mod that significantly extends the Light Ammo capacity of compatible weapons."
  },
  {
    id: "item_extended_medium_mag_i",
    name: "Extended Medium Mag I",
    type: "Mods",
    modCategory: "Medium Magazine",
    rarity: "Common",
    value: 640,
    weight: 0.25,
    stackSize: 1,
    compatibleWith: ["Arpeggio", "Osprey", "Renegade", "Torrente", "Venator", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/4/44/Extended_Medium_Mag_I.png/348px-Extended_Medium_Mag_I.png.webp",
    description: "Extended Medium Mag I is a Weapon Mod that slightly extends the Medium Ammo capacity of compatible weapons."
  },
  {
    id: "item_extended_medium_mag_ii",
    name: "Extended Medium Mag II",
    type: "Mods",
    modCategory: "Medium Magazine",
    rarity: "Uncommon",
    value: 2000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Arpeggio", "Osprey", "Renegade", "Torrente", "Tempest", "Venator"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/5/50/Extended_Medium_Mag_II.png/348px-Extended_Medium_Mag_II.png.webp",
    description: "Extended Medium Mag II is a Weapon Mod that moderately extends the Medium Ammo capacity of compatible weapons."
  },
  {
    id: "item_extended_medium_mag_iii",
    name: "Extended Medium Mag III",
    type: "Mods",
    modCategory: "Medium Magazine",
    rarity: "Rare",
    value: 5000,
    weight: 0.75,
    stackSize: 1,
    compatibleWith: ["Arpeggio", "Osprey", "Renegade", "Torrente", "Tempest", "Venator"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/a/a1/Extended_Medium_Mag_III.png/348px-Extended_Medium_Mag_III.png.webp",
    description: "Extended Medium Mag III is a Weapon Mod that significantly extends the Medium Ammo capacity of compatible weapons."
  },
  {
    id: "item_extended_shotgun_mag_i",
    name: "Extended Shotgun Mag I",
    type: "Mods",
    modCategory: "Shotgun Magazine",
    rarity: "Common",
    value: 640,
    weight: 0.25,
    stackSize: 1,
    compatibleWith: ["Il Toro", "Vulcano"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/9/9b/Extended_Shotgun_Mag_I.png/348px-Extended_Shotgun_Mag_I.png.webp",
    description: "Extended Shotgun Mag I is a Weapon Mod that slightly extends the Shotgun Ammo capacity of compatible weapons."
  },
  {
    id: "item_extended_shotgun_mag_ii",
    name: "Extended Shotgun Mag II",
    type: "Mods",
    modCategory: "Shotgun Magazine",
    rarity: "Uncommon",
    value: 2000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Il Toro", "Vulcano"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/4/4f/Extended_Shotgun_Mag_II.png/348px-Extended_Shotgun_Mag_II.png.webp",
    description: "Extended Shotgun Mag II is a Weapon Mod that moderately extends the Shotgun Ammo capacity of compatible weapons."
  },
  {
    id: "item_extended_shotgun_mag_iii",
    name: "Extended Shotgun Mag III",
    type: "Mods",
    modCategory: "Shotgun Magazine",
    rarity: "Rare",
    value: 5000,
    weight: 0.75,
    stackSize: 1,
    compatibleWith: ["Il Toro", "Vulcano"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/7/77/Extended_Shotgun_Mag_III.png/348px-Extended_Shotgun_Mag_III.png.webp",
    description: "Extended Shotgun Mag III is a Weapon Mod that significantly extends the Shotgun Ammo capacity of shotguns."
  },
  {
    id: "item_horizontal_grip",
    name: "Horizontal Grip",
    type: "Mods",
    modCategory: "Underbarrel",
    rarity: "Epic",
    value: 7000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Venator", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/8/89/Horizontal_Grip.png/348px-Horizontal_Grip.png.webp",
    description: "Horizontal Grip is a Weapon Mod that moderately reduces both vertical and horizontal recoil."
  },
  {
    id: "item_kinetic_converter",
    name: "Kinetic Converter",
    type: "Mods",
    modCategory: "Stock",
    rarity: "Legendary",
    value: 7000,
    weight: 0.75,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Osprey", "Renegade", "Torrente", "Bettina", "Bobcat", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/7/71/Kinetic_Converter.png/348px-Kinetic_Converter.png.webp",
    description: "Kinetic Converter is a Weapon Mod that moderately increases fire rate and reduces horizontal and vertical recoil."
  },
  {
    id: "item_lightweight_stock",
    name: "Lightweight Stock",
    type: "Mods",
    modCategory: "Stock",
    rarity: "Epic",
    value: 5000,
    weight: 0.25,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Osprey", "Renegade", "Torrente", "Bettina", "Bobcat", "Hullcracker", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/c/cb/Lightweight_Stock.png/348px-Lightweight_Stock.png.webp",
    description: "Lightweight Stock is a Weapon Mod that moderately improves ADS and draw speed."
  },
  {
    id: "item_muzzle_brake_i",
    name: "Muzzle Brake I",
    type: "Mods",
    modCategory: "Muzzle",
    rarity: "Common",
    value: 640,
    weight: 0.25,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Anvil", "Arpeggio", "Burletta", "Osprey", "Renegade", "Torrente", "Venator", "Bettina", "Bobcat", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/4/4f/Muzzle_Brake_I.png/348px-Muzzle_Brake_I.png.webp",
    description: "Muzzle Brake I is a Weapon Mod that slightly reduces both vertical and horizontal recoil."
  },
  {
    id: "item_muzzle_brake_ii",
    name: "Muzzle Brake II",
    type: "Mods",
    modCategory: "Muzzle",
    rarity: "Uncommon",
    value: 2000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Anvil", "Arpeggio", "Burletta", "Osprey", "Renegade", "Torrente", "Venator", "Bettina", "Bobcat", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/2/23/Muzzle_Brake_II.png/348px-Muzzle_Brake_II.png.webp",
    description: "Muzzle Brake II is a Weapon Mod that moderately reduces both vertical and horizontal recoil."
  },
  {
    id: "item_muzzle_brake_iii",
    name: "Muzzle Brake III",
    type: "Mods",
    modCategory: "Muzzle",
    rarity: "Rare",
    value: 5000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Anvil", "Arpeggio", "Burletta", "Osprey", "Renegade", "Torrente", "Venator", "Bettina", "Bobcat", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/a/a2/Muzzle_Brake_III.png/348px-Muzzle_Brake_III.png.webp",
    description: "Muzzle Brake III is a Weapon Mod that significantly reduces both vertical and horizontal recoil."
  },
  {
    id: "item_padded_stock",
    name: "Padded Stock",
    type: "Mods",
    modCategory: "Stock",
    rarity: "Epic",
    value: 5000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Osprey", "Renegade", "Torrente", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/4/4b/Padded_Stock.png/348px-Padded_Stock.png.webp",
    description: "Padded Stock is a Weapon Mod that significantly improves stability."
  },
  {
    id: "item_shotgun_choke_i",
    name: "Shotgun Choke I",
    type: "Mods",
    modCategory: "Shotgun Muzzle",
    rarity: "Common",
    value: 640,
    weight: 0.25,
    stackSize: 1,
    compatibleWith: ["Il Toro", "Vulcano"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/0/07/Shotgun_Choke_I.png/348px-Shotgun_Choke_I.png.webp",
    description: "Shotgun Choke I is a Weapon Mod that slightly reduces base dispersion."
  },
  {
    id: "item_shotgun_choke_ii",
    name: "Shotgun Choke II",
    type: "Mods",
    modCategory: "Shotgun Muzzle",
    rarity: "Uncommon",
    value: 2000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Il Toro", "Vulcano"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/6/63/Shotgun_Choke_II.png/348px-Shotgun_Choke_II.png.webp",
    description: "Shotgun Choke II is a Weapon Mod that moderately reduces base dispersion."
  },
  {
    id: "item_shotgun_choke_iii",
    name: "Shotgun Choke III",
    type: "Mods",
    modCategory: "Shotgun Muzzle",
    rarity: "Rare",
    value: 5000,
    weight: 0.75,
    stackSize: 1,
    compatibleWith: ["Il Toro", "Vulcano"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/3/36/Shotgun_Choke_III.png/348px-Shotgun_Choke_III.png.webp",
    description: "Shotgun Choke III is a Weapon Mod that significantly reduces base dispersion."
  },
  {
    id: "item_shotgun_silencer",
    name: "Shotgun Silencer",
    type: "Mods",
    modCategory: "Shotgun Muzzle",
    rarity: "Epic",
    value: 5000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Il Toro", "Vulcano"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/4/4d/Shotgun_Silencer.png/348px-Shotgun_Silencer.png.webp",
    description: "Shotgun Silencer is a Weapon Mod that moderately reduces the amount of noise produced when firing."
  },
  {
    id: "item_silencer_i",
    name: "Silencer I",
    type: "Mods",
    modCategory: "Muzzle",
    rarity: "Uncommon",
    value: 2000,
    weight: 0.25,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Anvil", "Arpeggio", "Burletta", "Osprey", "Renegade", "Torrente", "Venator", "Bettina", "Bobcat", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/f/f7/Silencer_I.png/348px-Silencer_I.png.webp",
    description: "Silencer I is a Weapon Mod that slightly reduces the amount of noise produced when firing."
  },
  {
    id: "item_silencer_ii",
    name: "Silencer II",
    type: "Mods",
    modCategory: "Muzzle",
    rarity: "Rare",
    value: 5000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Anvil", "Arpeggio", "Burletta", "Osprey", "Renegade", "Torrente", "Venator", "Bettina", "Bobcat", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/c/c0/Silencer_II.png/348px-Silencer_II.png.webp",
    description: "Silencer II is a Weapon Mod that moderately reduces the amount of noise produced when firing."
  },
  {
    id: "item_silencer_iii",
    name: "Silencer III",
    type: "Mods",
    modCategory: "Muzzle",
    rarity: "Epic",
    value: 7000,
    weight: 0.75,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Anvil", "Arpeggio", "Burletta", "Osprey", "Renegade", "Torrente", "Venator", "Bettina", "Bobcat", "Tempest"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/3/3e/Silencer_III.png/348px-Silencer_III.png.webp",
    description: "Silencer III is a Weapon Mod that significantly reduces the amount of noise produced when firing."
  },
  {
    id: "item_stable_stock_i",
    name: "Stable Stock I",
    type: "Mods",
    modCategory: "Stock",
    rarity: "Common",
    value: 640,
    weight: 0.25,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Osprey", "Renegade", "Torrente", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/8/8d/Stable_Stock_I.png/348px-Stable_Stock_I.png.webp",
    description: "Stable Stock I is a Weapon Mod that slightly improves dispersion and recoil recovery time."
  },
  {
    id: "item_stable_stock_ii",
    name: "Stable Stock II",
    type: "Mods",
    modCategory: "Stock",
    rarity: "Uncommon",
    value: 2000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Osprey", "Renegade", "Torrente", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/b/b4/Stable_Stock_II.png/348px-Stable_Stock_II.png.webp",
    description: "Stable Stock II is a Weapon Mod that slightly improves dispersion and recoil recovery time."
  },
  {
    id: "item_stable_stock_iii",
    name: "Stable Stock III",
    type: "Mods",
    modCategory: "Stock",
    rarity: "Rare",
    value: 5000,
    weight: 0.75,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Osprey", "Renegade", "Torrente", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/e/eb/Stable_Stock_III.png/348px-Stable_Stock_III.png.webp",
    description: "Stable Stock III is a Weapon Mod that significantly improves dispersion and recoil recovery time."
  },
  {
    id: "item_vertical_grip_i",
    name: "Vertical Grip I",
    type: "Mods",
    modCategory: "Underbarrel",
    rarity: "Common",
    value: 640,
    weight: 0.25,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Venator", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/4/4d/Vertical_Grip_I.png/348px-Vertical_Grip_I.png.webp",
    description: "Vertical Grip I is a Weapon Mod that slightly reduces vertical recoil."
  },
  {
    id: "item_vertical_grip_ii",
    name: "Vertical Grip II",
    type: "Mods",
    modCategory: "Underbarrel",
    rarity: "Uncommon",
    value: 2000,
    weight: 0.5,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Venator", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/3/3c/Vertical_Grip_II.png/348px-Vertical_Grip_II.png.webp",
    description: "'Vertical Grip II is a Weapon Mod that moderately reduces vertical recoil."
  },
  {
    id: "item_vertical_grip_iii",
    name: "Vertical Grip III",
    type: "Mods",
    modCategory: "Underbarrel",
    rarity: "Rare",
    value: 5000,
    weight: 0.75,
    stackSize: 1,
    compatibleWith: ["Ferro", "Kettle", "Rattler", "Stitcher", "Arpeggio", "Il Toro", "Venator", "Bettina", "Bobcat", "Tempest", "Vulcano", "Aphelion"],
    imageUrl: "https://arcraiders.wiki/w/images/thumb/2/20/Vertical_Grip_III.png/348px-Vertical_Grip_III.png.webp",
    description: "Vertical Grip III is a Weapon Mod that significantly reduces vertical recoil."
  }
];

// Helper to get mods compatible with a specific weapon
export function getCompatibleMods(weaponName: string): WeaponMod[] {
  return weaponMods.filter(mod => mod.compatibleWith.includes(weaponName));
}

export function getModCategory(weaponName: string): WeaponMod[] {
  return weaponMods.filter(mod => mod.modCategory);
}

// Helper to get mod by ID
export function getModById(modId: string): WeaponMod | undefined {
  return weaponMods.find(mod => mod.id === modId);
}
