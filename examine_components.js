const fs = require('fs');
const html = fs.readFileSync('blocksy_main.html', 'utf8');

function findSample(label, regex) {
    const match = html.match(regex);
    console.log(`\n=================== ${label} ===================`);
    if (match) {
        console.log(match[0].slice(0, 800));
    } else {
        console.log('Not found');
    }
}

// 1. Lead card
findSample('1. HERO LEAD CARD', /<article class="wp-block-post[^"]*category-travel tag-hot[\s\S]*?<\/article>/i);

// 2. Trending Now card
findSample('2. TRENDING NOW CARD', /<h4[^>]*>Trending Now<\/h4>[\s\S]*?<article[\s\S]*?<\/article>/i);

// 3. Breaking news list item in Col-4
findSample('3. BREAKING NEWS COL-4 ITEM', /<h4[^>]*>Breaking News<\/h4>[\s\S]*?<article[\s\S]*?<\/article>/i);

// 4. Popular Now card in Col-6
findSample('4. POPULAR NOW CARD', /<h4[^>]*>Popular Now<\/h4>[\s\S]*?<article[\s\S]*?<\/article>/i);

// 5. Hot Video card
findSample('5. HOT VIDEO CARD', /<h4[^>]*>Hot Videos<\/h4>[\s\S]*?<article[\s\S]*?<\/article>/i);

// 6. Category column card (Science / Culture / Politics)
findSample('6. CATEGORY COLUMN CARD', /<h4[^>]*>SCIENCE<\/h4>[\s\S]*?<article[\s\S]*?<\/article>/i);
