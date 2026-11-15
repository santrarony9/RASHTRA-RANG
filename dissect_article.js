const fs = require('fs');
const html = fs.readFileSync('blocksy_article_source.html', 'utf8');

// Find article header and body
const headerMatch = html.match(/<header class="entry-header[^"]*"[^>]*>([\s\S]*?)<\/header>/i);
if (headerMatch) {
    console.log('--- ARTICLE HEADER ---');
    console.log(headerMatch[1].replace(/<svg[\s\S]*?<\/svg>/g, '').trim());
}

// Find main container layout (sidebar vs content)
const gridMatch = html.match(/<div class="ct-container-grid[^"]*"[^>]*>|<div class="ct-container"[^>]*>/i);
console.log('\nContainer tag:', gridMatch ? gridMatch[0] : 'N/A');

// Find share box
const shareMatch = html.match(/<div class="ct-share-box[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
if (shareMatch) {
    console.log('\n--- SHARE BOX ---');
    console.log(shareMatch[0].slice(0, 300));
}

// Find related posts
const relMatch = html.match(/<div class="ct-related-posts[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
if (relMatch) {
    console.log('\n--- RELATED POSTS ---');
    console.log(relMatch[0].slice(0, 400));
}
