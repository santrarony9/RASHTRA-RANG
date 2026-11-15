const fs = require('fs');
const html = fs.readFileSync('blocksy_category_source.html', 'utf8');

const title = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
console.log('Category H1:', title ? title[1] : 'N/A');

const desc = html.match(/class="archive-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
console.log('Description:', desc ? desc[1] : 'N/A');

const entries = html.match(/<div class="entries"[^>]*>/i);
console.log('Entries container:', entries ? entries[0] : 'N/A');

const cards = [...html.matchAll(/<article[^>]*class="[^"]*entry-card[^"]*"[^>]*>/gi)];
console.log('Article cards count:', cards.length);

const pagination = html.match(/class="[^"]*ct-pagination[^"]*"/i);
console.log('Has pagination:', !!pagination);
