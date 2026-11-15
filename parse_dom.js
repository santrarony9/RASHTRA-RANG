const fs = require('fs');

const html = fs.readFileSync('preview/index.html', 'utf8');

// HTML void elements (never have closing tags)
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

let tagRegex = /<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*?)?>/g;
let match;
let stack = [];

const startPos = html.indexOf('<div id="view-home">');
const endPos = html.indexOf('<div id="view-article"');

tagRegex.lastIndex = startPos;

while ((match = tagRegex.exec(html)) !== null) {
    if (match.index >= endPos) break;
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || voidTags.has(tagName);

    if (isClosing) {
        if (stack.length === 0) {
            console.log(`Extra closing tag </${tagName}> at char ${match.index}`);
        } else {
            const popped = stack.pop();
            if (popped.name !== tagName) {
                console.log(`MISMATCH at char ${match.index}: expected </${popped.name}> (opened at ${popped.index}: ${popped.tag}), found </${tagName}>`);
                stack.push(popped); // keep popped
            }
        }
    } else if (!isSelfClosing) {
        stack.push({ name: tagName, index: match.index, tag: fullTag.substring(0, 60) });
    }
}

console.log('Unclosed tags remaining:');
stack.forEach(s => console.log(`  <${s.name}> at char ${s.index}: ${s.tag}`));
