const https = require('https');

function fetchJson(endpoint) {
  return new Promise((resolve) => {
    https.get('https://www.rashtrarang.com/index.php?rest_route=/wp/v2' + endpoint, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch(e) { resolve({ error: e.message, raw: d.substring(0, 200) }); }
      });
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

async function run() {
  const cats = await fetchJson('/categories&per_page=30');
  if (Array.isArray(cats)) {
    console.log('Categories count:', cats.length);
    cats.forEach(c => console.log(`Category ID ${c.id}: ${c.name} (${c.count} posts)`));
  } else {
    console.log('Categories response:', cats);
  }
}
run();
