const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchJson(endpoint) {
  return new Promise((resolve) => {
    const url = 'https://www.rashtrarang.com/index.php?rest_route=/wp/v2' + endpoint;
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(d));
        } catch(e) {
          console.error(`Error parsing JSON from ${endpoint}:`, e.message);
          resolve([]);
        }
      });
    }).on('error', (err) => {
      console.error(`HTTP error from ${endpoint}:`, err.message);
      resolve([]);
    });
  });
}

async function run() {
  console.log('Fetching live Rashtra Rang posts with full media embedding...');

  const categoryEndpoints = {
    latest: '/posts&per_page=20&_embed=true',
    national: '/posts&categories=35&per_page=15&_embed=true',
    bengal: '/posts&categories=78&per_page=15&_embed=true',
    kolkata: '/posts&categories=89&per_page=15&_embed=true',
    politics: '/posts&categories=84&per_page=10&_embed=true',
    sports: '/posts&categories=91&per_page=10&_embed=true',
    film: '/posts&categories=77&per_page=10&_embed=true',
    business: '/posts&categories=141&per_page=10&_embed=true',
    international: '/posts&categories=138&per_page=10&_embed=true',
    society: '/posts&categories=83&per_page=10&_embed=true',
    health: '/posts&categories=140&per_page=10&_embed=true',
    religion: '/posts&categories=139&per_page=10&_embed=true',
    editorial: '/posts&categories=80&per_page=10&_embed=true',
    epaper: '/posts&categories=81&per_page=10&_embed=true',
  };

  const results = {};
  for (const [key, ep] of Object.entries(categoryEndpoints)) {
    console.log(`Fetching ${key}...`);
    const data = await fetchJson(ep);
    if (Array.isArray(data)) {
      results[key] = data.map(post => {
        let mediaUrl = null;
        if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
          mediaUrl = post._embedded['wp:featuredmedia'][0].source_url;
        }
        return {
          id: post.id,
          date: post.date,
          link: post.link,
          title: post.title.rendered,
          excerpt: post.excerpt ? post.excerpt.rendered : '',
          content: post.content ? post.content.rendered : '',
          categories: post.categories,
          mediaUrl: mediaUrl || 'logo.jpg' // Use genuine Rashtra Rang logo as fallback, NEVER unsplash!
        };
      });
      console.log(`  Fetched ${results[key].length} posts for ${key}`);
    } else {
      results[key] = [];
    }
  }

  const outPath = path.join(__dirname, 'preview', 'cached_posts.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved comprehensive live data to ${outPath}`);
}

run();
