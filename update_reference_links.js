const fs = require('fs');
const path = require('path');

function fixHtml(filename) {
    const filePath = path.join(__dirname, 'preview', filename);
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    html = html.replace(/href=['"][^'"]*global\.css[^'"]*['"]/g, 'href="blocksy_global.css"');
    html = html.replace(/href=['"][^'"]*main\.min\.css[^'"]*['"]/g, 'href="blocksy_main.css"');
    html = html.replace(/href=['"][^'"]*taxonomies\.css[^'"]*['"]/g, 'href="blocksy_taxonomies.css"');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated CSS links in ${filename}`);
}

fixHtml('reference.html');
fixHtml('reference_article.html');
fixHtml('reference_category.html');
