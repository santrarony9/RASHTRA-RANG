const fs = require('fs');
const html = fs.readFileSync('blocksy_daily_news_source.html', 'utf8');

// Find all top-level sections or direct containers inside main
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (!mainMatch) {
    console.log('No main tag found');
    process.exit(1);
}

const mainContent = mainMatch[1];

// Let's find sections or wp-block-groups or ct-container inside main
const sectionRegex = /<(section|div)\s+([^>]*?(?:class=["'][^"']*(?:ct-section|wp-block-|entry-content|hero|popular|trending|container)[^"']*["'])[^>]*)>/gi;
let match;
console.log('--- DIRECT MAJOR SECTIONS / BLOCKS IN MAIN ---');
const regex = /<section[^>]*>|<div class="wp-block-group[^"]*"[^>]*>|<div class="ct-container[^"]*"[^>]*>/g;
let pos = 0;

// Let's parse with simple cheerio or string matching
// We can use a script to inspect headers, containers, grids
const titles = [...mainContent.matchAll(/<(h[1-6]|span|p)[^>]*class=["'][^"']*(?:heading|title|block-title)[^"']*["'][^>]*>([\s\S]*?)<\/\1>/gi)];
console.log('\n--- HEADINGS IN MAIN ---');
titles.forEach(t => console.log(t[1], ':', t[2].replace(/<[^>]+>/g, '').trim()));

// Let's find all h2 tags
const h2s = [...mainContent.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
console.log('\n--- ALL H2 TAGS IN MAIN ---');
h2s.forEach(t => console.log('H2:', t[1].replace(/<[^>]+>/g, '').trim()));
