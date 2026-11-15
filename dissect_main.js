const fs = require('fs');
const html = fs.readFileSync('blocksy_main.html', 'utf8');

// Find major section containers
// In Blocksy / Gutenberg, sections are usually <div class="wp-block-group..."> or <div class="wp-block-columns...">
const lines = html.split('\n');
console.log('Lines in main:', lines.length);

// Let's find all section comments or top level divs in entry-content
const blocks = [...html.matchAll(/(<!-- wp:[\s\S]*?-->)/g)];
console.log('WP Block comments found:', blocks.length);
if (blocks.length > 0) {
    blocks.slice(0, 30).forEach(b => console.log(b[1].slice(0, 80)));
} else {
    // If no comments, let's look for classes
    const classRegex = /class="([^"]*(?:section|block|group|column|grid|hero|banner|container)[^"]*)"/g;
    let m;
    const classes = new Set();
    while ((m = classRegex.exec(html)) !== null) {
        classes.add(m[1]);
    }
    console.log('Classes found:', classes.size);
    [...classes].slice(0, 40).forEach(c => console.log(c));
}
