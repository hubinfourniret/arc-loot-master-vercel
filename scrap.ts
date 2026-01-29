// scrape-arcraiders-weapons-complete.ts
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

interface WeaponRow {
    name: string;
    pageUrl: string;
    imageUrl: string;
    imageFileName: string;
    ammo: string;
    weaponType: string;
    rarity: string;
    weight: number;
    damage: string;
    fireRate: string;
    headshotMultiplier: string;
    range: string;
    stability: string;
    agility: string;
    stealth: string;
    arcArmorPen: string;
    specialTrait: string;
    magazineSize: string;
    firingMode: string;
    sellPrices: number[];
}

const BASE_URL = 'https://arcraiders.wiki';

const scrapeAllWeaponTables = async (page: puppeteer.Page): Promise<WeaponRow[]> => {
    await page.goto(`${BASE_URL}/wiki/Weapons`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('table.wikitable.sortable');

    const list = await page.evaluate(() => {
        const result: any[] = [];
        const tables = document.querySelectorAll('table.wikitable.sortable.jquery-tablesorter');

        tables.forEach((table) => {
            const rows = Array.from(table.querySelectorAll('tbody tr'));

            rows.forEach((row) => {
                const firstTd = row.querySelector('td');
                if (!firstTd) return;

                const ilinkSpan = firstTd.querySelector('span.template-ilink');
                if (!ilinkSpan) return;

                const weaponLink =
                    ilinkSpan.querySelector('a[title]') ||
                    firstTd.querySelector('a[title]');

                if (!weaponLink) return;

                const href = weaponLink.getAttribute('href');
                const name =
                    weaponLink.getAttribute('title') ||
                    weaponLink.textContent?.trim() ||
                    '';
                if (!href || !name) return;

                const pageUrl = href.startsWith('http')
                    ? href
                    : `https://arcraiders.wiki${href}`;

                const img = ilinkSpan.querySelector('picture img') as HTMLImageElement | null;
                const rawImgSrc = img?.getAttribute('src') || '';
                const imageUrl = rawImgSrc
                    ? rawImgSrc.startsWith('http')
                        ? rawImgSrc
                        : `https://arcraiders.wiki${rawImgSrc}`
                    : '';
                const imageFileName = imageUrl
                    ? imageUrl.split('/').pop()!.split('?')[0]
                    : '';

                result.push({
                    name,
                    pageUrl,
                    imageUrl,
                    imageFileName,
                });
            });
        });

        return result;
    });

    return list;
};

const scrapeWeaponPage = async (
    page: puppeteer.Page,
    weapon: WeaponRow
): Promise<WeaponRow> => {
    await page.goto(weapon.pageUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('table.infobox.floatright', { timeout: 10000 });

    const details = await page.evaluate(() => {
        const infobox = document.querySelector(
            'table.infobox.floatright'
        ) as HTMLTableElement | null;
        if (!infobox) throw new Error('infobox not found');

        const data: any = {
            ammo: '',
            weaponType: '',
            rarity: '',
            weight: 0,
            damage: '',
            fireRate: '',
            headshotMultiplier: '',
            range: '',
            stability: '',
            agility: '',
            stealth: '',
            arcArmorPen: '',
            specialTrait: '',
            magazineSize: '',
            firingMode: '',
            sellPrices: [],
        };

        // 1) Récupérer ammo, type, rarity depuis les lignes data-tag
        const tagRows = infobox.querySelectorAll('tr.data-tag');
        if (tagRows.length >= 1) {
            const ammoRow = tagRows[0];
            const ammoTd = ammoRow.querySelector('td');
            const ammoText = ammoTd?.textContent?.trim() || '';
            data.ammo = ammoText.replace(/\s+/g, ' ');
        }
        if (tagRows.length >= 2) {
            const typeRow = tagRows[1];
            const typeText = typeRow.querySelector('a')?.textContent?.trim() || '';
            data.weaponType = typeText;
        }
        if (tagRows.length >= 3) {
            const rarityRow = tagRows[2];
            const rarityText =
                rarityRow.querySelector('a')?.textContent?.trim() || '';
            data.rarity = rarityText.replace('Weapons', '').trim();
        }

        // 2) Parcourir toutes les lignes de stats
        const statRows = infobox.querySelectorAll('tr.infobox-data');
        statRows.forEach((row) => {
            const th = row.querySelector('th[scope="row"]');
            const td = row.querySelector('td');
            if (!th || !td) return;

            const label = th.textContent?.trim() || '';

            switch (label) {
                case 'Weight':
                    // ✅ CORRIGÉ : Récupérer tous les spans et prendre le dernier
                    { const weightDiv = td.querySelector('div.template-weight');
                    if (weightDiv) {
                        // Méthode 1 : Récupérer tous les enfants directs <span>
                        const allSpans = Array.from(weightDiv.querySelectorAll('span'));
                        const weightSpan = allSpans[allSpans.length - 1]; // Dernier span
                        const weightText = weightSpan?.textContent?.trim() || '0';
                        data.weight = parseFloat(weightText);

                        // OU Méthode 2 : Utiliser le textContent de la div directement
                        // const fullText = weightDiv.textContent?.trim() || '0';
                        // const weightMatch = fullText.match(/[\d.]+/);
                        // if (weightMatch) {
                        //   data.weight = parseFloat(weightMatch[0]);
                        // }
                    }
                    break; }

                case 'Ammo':
                    { const ammoText = td.textContent?.trim() || '';
                    data.ammo = ammoText.replace(/\s+/g, ' ');
                    break; }

                case 'Magazine Size':
                    data.magazineSize = td.textContent?.trim() || '';
                    break;

                case 'Firing Mode':
                    data.firingMode = td.textContent?.trim() || '';
                    break;

                case 'ARC Armor Penetration':
                    data.arcArmorPen = td.textContent?.trim() || '';
                    break;

                case 'Special Trait':
                    data.specialTrait = td.textContent?.trim() || '';
                    break;

                case 'Damage':
                    data.damage = td.textContent?.trim() || '';
                    break;

                case 'Fire Rate':
                    data.fireRate = td.textContent?.trim() || '';
                    break;

                case 'Headshot Multiplier':
                    data.headshotMultiplier = td.textContent?.trim() || '';
                    break;

                case 'Range':
                    data.range = td.textContent?.trim() || '';
                    break;

                case 'Stability':
                    data.stability = td.textContent?.trim() || '';
                    break;

                case 'Agility':
                    data.agility = td.textContent?.trim() || '';
                    break;

                case 'Stealth':
                    data.stealth = td.textContent?.trim() || '';
                    break;

                case 'Sell Price':
                    // Récupérer les 4 prix (niveaux I, II, III, IV)
                    { const priceSpans = td.querySelectorAll('span.template-price');
                    const prices: number[] = [];

                    priceSpans.forEach((span) => {
                        const priceText = span.textContent?.trim() || '';
                        const priceMatch = priceText.replace(/,/g, '').match(/\d+/);
                        if (priceMatch) {
                            prices.push(parseInt(priceMatch[0]));
                        }
                    });

                    // S'assurer d'avoir 4 valeurs
                    while (prices.length < 4) {
                        prices.push(0);
                    }
                    data.sellPrices = prices.slice(0, 4);
                    break; }

                default:
                    break;
            }
        });

        return data;
    });

    return {
        ...weapon,
        ...details,
    };
};

const generateTypeScript = (weapons: WeaponRow[]): string => {
    let output = '';
    output += '// ============================================================================\n';
    output += '// WEAPONS DATA - ARC Raiders Wiki\n';
    output += '// ============================================================================\n\n';
    output += 'export const weapons = [\n';

    weapons.forEach((weapon, idx) => {
        const comma = idx < weapons.length - 1 ? ',' : '';

        // Calculer les valeurs
        const damage = parseFloat(weapon.damage) || 0;
        const fireRate = parseFloat(weapon.fireRate) || 0;
        const dps = Math.round(damage * fireRate);

        // Magazine
        let magazine = 0;
        if (weapon.magazineSize) {
            const magMatch = weapon.magazineSize.match(/\d+/);
            magazine = magMatch ? parseInt(magMatch[0]) : 0;
        }

        // Range
        const rangeVal = weapon.range || '';
        const rangeStr = rangeVal ? `"${rangeVal}"` : 'null';

        // ID
        const weaponId = `weapon_${weapon.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

        // Description
        const description = weapon.specialTrait
            ? `${weapon.weaponType} • ${weapon.specialTrait}`
            : `${weapon.weaponType} • Uses ${weapon.ammo}`;

        output += '  {\n';
        output += `    id: "${weaponId}",\n`;
        output += `    name: "${weapon.name}",\n`;
        output += `    type: "Weapons",\n`;
        output += `    class: "${weapon.weaponType}",\n`;
        output += `    rarity: "${weapon.rarity}",\n`;
        output += `    value: [${weapon.sellPrices.join(', ')}],\n`;
        output += `    weight: ${weapon.weight},\n`;
        output += `    damage: ${damage},\n`;
        output += `    fireRate: ${fireRate},\n`;
        output += `    firingMode: "${weapon.firingMode}",\n`;
        output += `    range: ${rangeStr},\n`;
        output += `    magazine: ${magazine},\n`;
        output += `    ammo: "${weapon.ammo}",\n`;
        output += `    dps: ${dps},\n`;
        output += `    mods: "Unknown",\n`;
        output += `    imageUrl: "${weapon.imageUrl}",\n`;
        output += `    description: "${description}"\n`;
        output += `  }${comma}\n`;
    });

    output += '];\n';
    return output;
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1920, height: 1080 }
    });
    const page = await browser.newPage();

    console.log('📄 Récupération de la liste des armes...');
    const list = await scrapeAllWeaponTables(page);
    console.log(`✅ ${list.length} armes trouvées\n`);

    const results: WeaponRow[] = [];

    for (let i = 0; i < list.length; i++) {
        const base = list[i];
        console.log(`[${i + 1}/${list.length}] ${base.name}`);

        try {
            const full = await scrapeWeaponPage(page, base);
            results.push(full);
            console.log(`  ✅ ${full.rarity} | Weight: ${full.weight}kg | Prix: [${full.sellPrices.join(', ')}]`);
        } catch (e: any) {
            console.error(`  ❌ Erreur: ${e.message || e}`);
        }

        await new Promise((res) => setTimeout(res, 1500));
    }

    await browser.close();

    const tsCode = generateTypeScript(results);
    const outPath = path.resolve('weapons_data.ts');
    fs.writeFileSync(outPath, tsCode, 'utf8');

    console.log(`\n✅ ${results.length} armes sauvegardées dans: ${outPath}`);
})();
