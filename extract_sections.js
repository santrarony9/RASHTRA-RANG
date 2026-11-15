const fs = require('fs');
const html = fs.readFileSync('blocksy_main.html', 'utf8');

// The main element contains .entry-content > .ct-container-full or similar
// Let's find all top-level elements inside .entry-content
const entryMatch = html.match(/<div class="entry-content">([\s\S]*?)<\/div>\s*<\/article>/i);
if (!entryMatch) {
    console.log('No entry-content found');
    process.exit(1);
}

const content = entryMatch[1];
console.log('Entry content length:', content.length);

// Let's split by top-level wp-block-greenshift-blocks-row or ct-container
// Let's find all matches of <div class="wp-block-greenshift-blocks-row
const regex = /<div class="wp-block-greenshift-blocks-row[\s\S]*?(?=<div class="wp-block-greenshift-blocks-row|$)/g;
let sections = [];
let m;
while ((m = regex.exec(content)) !== null) {
    sections.push(m[0]);
}

console.log('Top-level Greenshift row sections found:', sections.length);
sections.forEach((s, idx) => {
    // Find headings
    const headings = [...s.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)]
        .map(h => `${h[1].toUpperCase()}: ${h[2].replace(/<[^>]+>/g, '').trim()}`);
    console.log(`\n--- SECTION ${idx + 1} (length ${s.length}) ---`);
    console.log('Headings:', headings.slice(0, 10).join(' | '));
});
