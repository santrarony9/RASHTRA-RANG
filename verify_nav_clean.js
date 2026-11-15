const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');

// Check navigation HTML
const navMatch = html.match(/<ul class="menu-main-nav">[\s\S]*?<\/ul>/);
if (navMatch) {
    console.log('--- Navigation HTML ---');
    console.log(navMatch[0]);
    const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(navMatch[0]);
    console.log('Has Emoji in nav?', hasEmoji);
} else {
    console.error('menu-main-nav not found!');
}

// Check scripts
const scriptMatches = html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi);
let scriptIndex = 0;
let errors = 0;
for (const match of scriptMatches) {
    scriptIndex++;
    const scriptContent = match[1];
    if (!scriptContent.trim()) continue;
    try {
        new vm.Script(scriptContent);
    } catch (err) {
        errors++;
        console.error('ERROR in Script #' + scriptIndex + ':', err.message);
    }
}
console.log('Script parse errors:', errors);
