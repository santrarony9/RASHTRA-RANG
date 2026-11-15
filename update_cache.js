const fs = require('fs');
const { execSync } = require('child_process');

const catMap = {
  latest: '?rest_route=/wp/v2/posts&per_page=12',
  bengal: '?rest_route=/wp/v2/posts&categories=78&per_page=4',
  kolkata: '?rest_route=/wp/v2/posts&categories=89&per_page=4',
  national: '?rest_route=/wp/v2/posts&categories=35&per_page=4',
  politics: '?rest_route=/wp/v2/posts&categories=84&per_page=4',
  sports: '?rest_route=/wp/v2/posts&categories=91&per_page=3',
  film: '?rest_route=/wp/v2/posts&categories=77&per_page=3',
  business: '?rest_route=/wp/v2/posts&categories=141&per_page=4',
  international: '?rest_route=/wp/v2/posts&categories=138&per_page=4',
  society: '?rest_route=/wp/v2/posts&categories=83&per_page=3',
  health: '?rest_route=/wp/v2/posts&categories=140&per_page=3',
  religion: '?rest_route=/wp/v2/posts&categories=139&per_page=3',
  editorial: '?rest_route=/wp/v2/posts&categories=80&per_page=3',
  epaper: '?rest_route=/wp/v2/posts&categories=81&per_page=3',
};

const cache = JSON.parse(fs.readFileSync('preview/cached_posts.json', 'utf8'));

for (const [key, q] of Object.entries(catMap)) {
  try {
    const url = 'https://www.rashtrarang.com/' + q;
    console.log('Fetching', key, '...');
    const out = execSync(`curl.exe -s "${url}"`).toString();
    const parsed = JSON.parse(out);
    if (Array.isArray(parsed) && parsed.length > 0) {
      cache[key] = parsed;
      console.log('Saved', key, ':', parsed.length, 'posts');
    } else {
      console.log('Empty or not array for', key);
    }
  } catch (err) {
    console.error('Error fetching', key, err.message);
  }
}

fs.writeFileSync('preview/cached_posts.json', JSON.stringify(cache, null, 2), 'utf8');
console.log('All cached keys:', Object.keys(cache));
