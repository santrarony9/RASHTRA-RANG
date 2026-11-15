const fs = require('fs');
const html = fs.readFileSync('blocksy_main.html', 'utf8');

const regex = /<div class="wp-block-greenshift-blocks-row[^>]*id="(gspb_row-id-[^"]+)"/g;
let m;
const rows = [];
while ((m = regex.exec(html)) !== null) {
    rows.push({ id: m[1], index: m.index });
}
console.log('Total Greenshift rows:', rows.length);

rows.forEach((r, i) => {
    const nextIdx = (i + 1 < rows.length) ? rows[i+1].index : html.length;
    const snippet = html.slice(r.index, nextIdx);
    const headings = [...snippet.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)]
        .map(h => `${h[1].toUpperCase()}: ${h[2].replace(/<[^>]+>/g, '').trim()}`);
    const cols = [...snippet.matchAll(/gspb_row__col--(\d+)/g)].map(c => c[1]);
    console.log(`\nRow ${i+1} [${r.id}] cols: [${cols.join(', ')}]`);
    console.log('Headings:', headings.slice(0, 6).join(' | '));
});
