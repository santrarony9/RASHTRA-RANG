const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching live WordPress data from rashtrarang.com...');
  const baseUrl = 'https://www.rashtrarang.com/index.php?rest_route=/wp/v2';
  
  try {
    const [latest, bengal, kolkata, national, post2522, media2523] = await Promise.all([
      fetchJson(`${baseUrl}/posts&per_page=12`),
      fetchJson(`${baseUrl}/posts&categories=78&per_page=6`),
      fetchJson(`${baseUrl}/posts&categories=89&per_page=6`),
      fetchJson(`${baseUrl}/posts&categories=35&per_page=6`),
      fetchJson(`${baseUrl}/posts/2522`),
      fetchJson(`${baseUrl}/media/2523`)
    ]);

    const cache = {
      latest,
      bengal,
      kolkata,
      national,
      post2522,
      media2523
    };

    const outPath = path.join(__dirname, 'preview', 'cached_posts.json');
    fs.writeFileSync(outPath, JSON.stringify(cache, null, 2), 'utf8');
    console.log(`Saved cached live data to ${outPath}`);
  } catch (err) {
    console.error('Error fetching live data:', err);
  }
}

main();
