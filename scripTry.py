# convert_items_csv_to_ts.py
import csv
from collections import defaultdict

csv_file = 'items_arcraiders.csv'  # Ton fichier CSV
output_file = 'items_data.ts'

# Mapping catégories
category_map = {
    'Quick Use': 'Consumables',
    'Nature': 'Crafting Materials',
    'Basic Material': 'Crafting Materials',
    'Topside Material': 'Crafting Materials',
    'Refined Material': 'Crafting Materials',
    'Recyclable': 'Crafting Materials',
    'Trinket': 'Gear',
    'Key': 'Gear',
    'Mods': 'Gear',
    'Augment': 'Gear',
    'Shield': 'Gear',
    'Ammunition': 'Ammo',
    'Misc': 'Consumables',
}

# Rarity mapping
rarity_map = {
    'Common': 'Common',
    'Uncommon': 'Uncommon',
    'Rare': 'Rare',
    'Epic': 'Epic',
    'Legendary': 'Legendary'
}

# Lire le CSV et organiser par catégorie
items_by_type = defaultdict(list)

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)

    for item in reader:
        item_type = category_map.get(item['Category'], 'Consumables')

        # Créer l'ID
        item_id = item['Name'].lower()
        item_id = item_id.replace(' ', '_').replace('-', '_')
        item_id = item_id.replace('(', '').replace(')', '')
        item_id = item_id.replace('.', '').replace("'", '').replace('%', '')
        item_id = f"item_{item_id}"

        # Parser les valeurs
        weight = float(item['Weight']) if item['Weight'] and item['Weight'] != '0' else 0.5
        stack_size = int(item['StackSize']) if item['StackSize'] else 1
        value = int(item['SellPrice']) if item['SellPrice'] else 100

        rarity = rarity_map.get(item['Rarity'], 'Common')

        items_by_type[item_type].append({
            'id': item_id,
            'name': item['Name'].replace('"', '\\"'),
            'type': item_type,
            'rarity': rarity,
            'value': value,
            'weight': weight,
            'imageUrl': item['ImageUrl'],
            'description': f"{item['Category']} item"
        })

# Générer le fichier TypeScript
with open(output_file, 'w', encoding='utf-8') as f:
    f.write("// ============================================================================\n")
    f.write("// ITEMS DATA - Généré depuis ARC Raiders Wiki CSV\n")
    f.write("// ============================================================================\n\n")

    for item_type in ['Consumables', 'Crafting Materials', 'Gear', 'Ammo']:
        items_list = items_by_type[item_type]
        if not items_list:
            continue

        f.write(f"// {item_type.upper()} ({len(items_list)} items)\n")
        f.write(f"export const {item_type.lower().replace(' ', '_')}: BaseItem[] = [\n")

        for idx, item in enumerate(items_list):
            comma = "," if idx < len(items_list) - 1 else ""
            f.write("  {\n")
            f.write(f'    id: "{item["id"]}",\n')
            f.write(f'    name: "{item["name"]}",\n')
            f.write(f'    type: "{item["type"]}",\n')
            f.write(f'    rarity: "{item["rarity"]}",\n')
            f.write(f'    value: {item["value"]},\n')
            f.write(f'    weight: {item["weight"]},\n')
            f.write(f'    description: "{item["description"]}"\n')
            f.write(f"  }}{comma}\n")

        f.write("];\n\n")

print(f"✅ Fichier généré: {output_file}")
print(f"📊 Items par catégorie:")
for item_type, items_list in items_by_type.items():
    print(f"  - {item_type}: {len(items_list)} items")
