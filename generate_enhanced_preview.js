const fs = require('fs');

const data = JSON.parse(fs.readFileSync('preview/cached_posts.json', 'utf8'));

// Build allPosts
const allPosts = [];
const seenIds = new Set();

for (const [key, arr] of Object.entries(data)) {
    if (Array.isArray(arr)) {
        arr.forEach(p => {
            if (!seenIds.has(p.id)) {
                seenIds.add(p.id);
                allPosts.push(p);
            }
        });
    }
}

function getSafePost(primaryArr, idx) {
    if (primaryArr && primaryArr[idx]) return primaryArr[idx];
    return allPosts[(idx * 7) % allPosts.length] || {
        id: 2522,
        title: 'राष्ट्र रंग दैनिक हिंदी समाचार',
        excerpt: 'सटीक, निर्भीक और निष्पक्ष डिजिटल पत्रकारिता।',
        content: '<p>राष्ट्र रंग डिजिटल पोर्टल पर आपका स्वागत है।</p>',
        date: '2026-11-15T12:00:00',
        mediaUrl: 'logo.jpg'
    };
}

function cleanTitle(t) {
    if (!t) return '';
    if (typeof t === 'object' && t.rendered) t = t.rendered;
    return String(t)
        .replace(/<[^>]+>/g, '')
        .replace(/&#8211;/g, '–')
        .replace(/&#8217;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/फुटबॉलरअरिंदमभट्टाचार्य/g, 'फुटबॉलर अरिंदम भट्टाचार्य')
        .trim();
}

function cleanExcerpt(e) {
    if (!e) return '';
    if (typeof e === 'object' && e.rendered) e = e.rendered;
    return String(e)
        .replace(/<[^>]+>/g, '')
        .replace(/&#8211;/g, '–')
        .replace(/&#8217;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/\[&hellip;\]/g, '...')
        .trim();
}

function formatDate(dStr) {
    if (!dStr) return '15 नवम्बर 2026';
    const d = new Date(dStr);
    const months = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getImage(p) {
    if (p && p.mediaUrl && p.mediaUrl.startsWith('http')) return p.mediaUrl;
    if (p && p.featured_media_url && p.featured_media_url.startsWith('http')) return p.featured_media_url;
    return 'logo.jpg';
}

function getViews(id) {
    const n = 520 + ((id * 37) % 3100);
    return (n >= 1000) ? (n / 1000).toFixed(1) + 'K' : String(n);
}

// Prepare 6 Section items
const heroLead = getSafePost(data.national, 0);
const trendingPosts = [getSafePost(data.national, 1), getSafePost(data.bengal, 0), getSafePost(data.kolkata, 0)];
const breakingList = [0, 1, 2, 3, 4].map(i => getSafePost(data.latest, i));

const row2Lead = getSafePost(data.bengal, 1);
const popularGrid = [getSafePost(data.politics, 0), getSafePost(data.sports, 0), getSafePost(data.film, 0), getSafePost(data.business, 0)];

// Dedicated Popular News items
const popularSectionPosts = [
    getSafePost(data.latest, 0),
    getSafePost(data.kolkata, 1),
    getSafePost(data.bengal, 2),
    getSafePost(data.politics, 1)
];

// Upcoming Events Data
const upcomingEvents = [
    {
        title: 'पश्चिम बंगाल विधानसभा शीतकालीन सत्र: विशेष लाइव रिपोर्टिंग एवं सत्र विश्लेषण',
        date: '18 नवम्बर 2026 | 10:00 AM',
        venue: 'कोलकाता विधान सौध',
        cat: 'पश्चिम बंगाल',
        desc: 'विधानसभा में जनहित के विधेयकों, बजट चर्चा एवं विपक्ष के प्रस्तावों पर विशेष कवरेज।',
        mediaUrl: getImage(getSafePost(data.bengal, 0))
    },
    {
        title: 'भारत बनाम ऑस्ट्रेलिया टेस्ट सीरीज: कोलकाता से लाइव मैच विश्लेषण',
        date: '22 नवम्बर 2026 | 01:30 PM',
        venue: 'ईडन गार्डन्स स्टेडियम',
        cat: 'खेल जगत',
        desc: 'पूर्व भारतीय क्रिकेटरों एवं विशेषज्ञों के साथ ग्राउंड जीरो से लाइव बुलेटिन।',
        mediaUrl: getImage(getSafePost(data.sports, 0))
    },
    {
        title: 'राष्ट्र रंग आर्थिक विचार मंच 2026: पूर्वी भारत का औद्योगिक भविष्य',
        date: '28 नवम्बर 2026 | 11:00 AM',
        venue: 'साइंस सिटी ऑडिटोरियम, कोलकाता',
        cat: 'अर्थ जगत',
        desc: 'उद्योगपतियों, अर्थशास्त्रियों एवं नीति निर्धारकों के साथ विशेष संगोष्ठी।',
        mediaUrl: getImage(getSafePost(data.business, 0))
    }
];

// Categories Directory Hub list (13 Categories)
const categoriesHubList = [
    { id: 35, name: 'राष्ट्रीय', count: 210, post: getSafePost(data.national, 0) },
    { id: 78, name: 'पश्चिम बंगाल', count: 182, post: getSafePost(data.bengal, 0) },
    { id: 89, name: 'कोलकाता', count: 165, post: getSafePost(data.kolkata, 0) },
    { id: 84, name: 'राजनीति / UP', count: 29, post: getSafePost(data.politics, 0) },
    { id: 83, name: 'सोसाईटी', count: 29, post: getSafePost(data.society, 0) },
    { id: 139, name: 'धर्म-अध्यात्म', count: 23, post: getSafePost(data.religion, 0) },
    { id: 80, name: 'आलेख / विचार', count: 20, post: getSafePost(data.editorial, 0) },
    { id: 141, name: 'अर्थ जगत', count: 11, post: getSafePost(data.business, 0) },
    { id: 140, name: 'स्वास्थ्य', count: 8, post: getSafePost(data.health, 0) },
    { id: 138, name: 'अंतर्राष्ट्रीय', count: 7, post: getSafePost(data.international, 0) },
    { id: 91, name: 'खेल जगत', count: 6, post: getSafePost(data.sports, 0) },
    { id: 81, name: 'ई-पेपर', count: 5, post: getSafePost(data.epaper, 0) },
    { id: 77, name: 'फिल्म जगत', count: 2, post: getSafePost(data.film, 0) }
];

const editorLead = getSafePost(data.editorial, 0);
const editorSubgrid = [getSafePost(data.kolkata, 1), getSafePost(data.sports, 1), getSafePost(data.film, 1)];
const worthReading = [0, 1, 2, 3, 4].map(i => getSafePost(data.politics, i));

const darkLead = getSafePost(data.international, 0);
const darkGrid = [0, 1, 2, 3].map(i => getSafePost(data.international, i + 1));
const videoList = [getSafePost(data.sports, 2), getSafePost(data.film, 2), getSafePost(data.national, 2)];

const cat1Lead = getSafePost(data.bengal, 2);
const cat1List = [0, 1, 2].map(i => getSafePost(data.bengal, i + 3));

const cat2Lead = getSafePost(data.kolkata, 2);
const cat2List = [0, 1, 2].map(i => getSafePost(data.kolkata, i + 3));

const cat3Lead = getSafePost(data.politics, 2);
const cat3List = [0, 1, 2].map(i => getSafePost(data.politics, i + 3));

// Client-side JSON
const clientDataJson = JSON.stringify(allPosts.map(p => ({
    id: p.id,
    title: cleanTitle(p.title),
    excerpt: cleanExcerpt(p.excerpt).slice(0, 180),
    content: p.content || `<p>${cleanExcerpt(p.excerpt)}</p>`,
    date: formatDate(p.date),
    mediaUrl: getImage(p),
    link: p.link || `/?p=${p.id}`,
    categories: p.categories || [],
    views: getViews(p.id)
}))).replace(/</g, '\\u003c');

const html = `<!DOCTYPE html>
<html lang="hi" data-theme="light" data-color-mode="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>राष्ट्र रंग (Rashtra Rang) – निष्पक्ष, निर्भीक, सटीक | दैनिक हिंदी डिजिटल समाचार पत्र</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Martel:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">

    <!-- Zero-Flash Theme Initializer -->
    <script>
        (function() {
            var savedTheme = localStorage.getItem('rashtrarang_theme');
            if (savedTheme) {
                document.documentElement.setAttribute('data-theme', savedTheme);
                document.documentElement.setAttribute('data-color-mode', savedTheme);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.setAttribute('data-color-mode', 'dark');
            }
        })();
    </script>
    </head>
<body>

<!-- ==========================================================================
   RASHTRA RANG HEADER
   ========================================================================== -->
<header id="header" class="ct-header" data-id="type-1">
    <!-- Desktop Header -->
    <div class="ct-header-desktop">
        <!-- Middle Row: 120px height, Black Background -->
        <div class="ct-header-middle">
            <div class="ct-container ct-header-middle-container">
                <!-- Column Start: Hamburger & Dark Mode Switch -->
                <div class="ct-column-start">
                    <button class="ct-header-trigger" onclick="toggleMobileDrawer()" aria-label="मेनू खोलें">
                        <svg class="ct-icon" width="18" height="14" viewBox="0 0 18 14" fill="currentColor">
                            <rect y="0" width="18" height="1.8" rx="1"/>
                            <rect y="6.1" width="18" height="1.8" rx="1"/>
                            <rect y="12.2" width="18" height="1.8" rx="1"/>
                        </svg>
                        <span class="ct-trigger-label">मेनू</span>
                    </button>

                    <button class="ct-color-switch" onclick="toggleDarkMode()" aria-label="डार्क / लाइट मोड बदलें" title="डार्क / लाइट मोड बदलें">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>
                </div>

                <!-- Column Middle: Masthead Logo & Tagline -->
                <div class="ct-column-middle">
                    <div class="site-branding">
                        <a href="javascript:void(0)" onclick="showView('home')" class="site-logo-link">
                            <div class="masthead-title">राष्ट्र रंग</div>
                            <div class="masthead-sub">RASHTRA RANG</div>
                        </a>
                        <p class="site-description">दैनिक हिंदी समाचार पत्र एवं डिजिटल न्यूज़ पोर्टल | निष्पक्ष, निर्भीक, सटीक</p>
                    </div>
                </div>

                <!-- Column End: Date & Subscribe CTA Button -->
                <div class="ct-column-end">
                    <div class="header-date-badge">रविवार, 15 नवम्बर 2026</div>
                    <a href="#subscribe" class="ct-button-subscribe">सदस्यता लें</a>
                </div>
            </div>
        </div>

        <!-- Bottom Row: 52px Sticky Navigation Bar -->
        <div class="ct-header-bottom">
            <div class="ct-container ct-header-bottom-container">
                <!-- Search Button -->
                <div class="ct-column-start" style="flex: 0 0 auto;">
                    <button class="ct-header-search" onclick="openSearchModal()" aria-label="खोजें" title="सर्च करें">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>

                <!-- Navigation Links with Red Hover Indicator -->
                <div class="ct-column-middle">
                    <nav class="header-menu-1">
                        <ul class="menu-main-nav">
                            <li class="active" id="nav-item-home"><a href="javascript:void(0)" onclick="showView('home')">होम</a></li>
                            <li id="nav-item-popular"><a href="javascript:void(0)" onclick="showView('popular')">लोकप्रिय</a></li>
                            <li id="nav-item-upcoming"><a href="javascript:void(0)" onclick="showView('upcoming')">आगामी</a></li>
                            <li id="nav-item-35"><a href="javascript:void(0)" onclick="showView('category', 35, 'राष्ट्रीय')">राष्ट्रीय</a></li>
                            <li id="nav-item-78"><a href="javascript:void(0)" onclick="showView('category', 78, 'पश्चिम बंगाल')">पश्चिम बंगाल</a></li>
                            <li id="nav-item-89"><a href="javascript:void(0)" onclick="showView('category', 89, 'कोलकाता')">कोलकाता</a></li>
                            <li id="nav-item-84"><a href="javascript:void(0)" onclick="showView('category', 84, 'राजनीति')">राजनीति</a></li>
                            <li id="nav-item-91"><a href="javascript:void(0)" onclick="showView('category', 91, 'खेल जगत')">खेल जगत</a></li>
                            <li id="nav-item-77"><a href="javascript:void(0)" onclick="showView('category', 77, 'फिल्म जगत')">फिल्म जगत</a></li>
                            <li id="nav-item-141"><a href="javascript:void(0)" onclick="showView('category', 141, 'अर्थ जगत')">अर्थ जगत</a></li>
                            <li id="nav-item-categories"><a href="javascript:void(0)" onclick="showView('categories_hub')">समस्त श्रेणियां</a></li>
                            <li id="nav-item-about"><a href="javascript:void(0)" onclick="showView('about')">हमारे बारे में</a></li>
                        </ul>
                    </nav>
                </div>

                <!-- Language / E-Paper Switcher -->
                <div class="ct-column-end" style="flex: 0 0 auto;">
                    <a href="javascript:void(0)" onclick="showView('category', 81, 'ई-पेपर')" class="ct-epaper-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: -1px;"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                        ई-पेपर
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- 1. TOP HEADER LEADERBOARD ADVERTISEMENT (728x90) -->
<div class="ct-container reveal-on-scroll">
    <div class="ad-container-wrap" data-ad-slot="ad_header_leaderboard">
        <span class="ad-sponsor-label">विज्ञापन / ADVERTISEMENT</span>
        <div class="ad-slot-box ad-slot-leaderboard has-creative">
            <a href="#demo-ad-sbi" class="demo-ad-creative demo-ad-sbi" title="प्रायोजित: भारतीय स्टेट बैंक">
                <div class="demo-ad-brand">
                    <div class="sbi-circle-logo">SBI</div>
                    <div>
                        <span class="demo-ad-badge" style="background: #2575FC; color: #FFF;">स्टेट बैंक ऑफ इंडिया</span>
                        <div style="font-size: 0.72rem; color: #90CDF4; font-weight: 600;">सुरक्षा एवं विश्वास का प्रतीक</div>
                    </div>
                </div>
                <div style="flex: 1; padding: 0 16px; text-align: left;">
                    <h4 class="demo-ad-title">सपनों का नया आशियाना अब और भी आसान · SBI होम लोन मात्र 8.40%* पर</h4>
                    <div class="demo-ad-desc">शून्य प्रोसेसिंग शुल्क | तत्काल ऑनलाइन सैद्धांतिक मंज़ूरी | 30 वर्ष तक की आसान अवधि</div>
                </div>
                <div style="text-align: right; flex-shrink: 0;">
                    <span class="demo-ad-cta">अभी आवेदन करें →</span>
                    <div class="demo-ad-disclaimer">*नियम व शर्तें लागू</div>
                </div>
            </a>
        </div>
    </div>
</div>

<!-- MAIN CONTENT VIEW -->
<main id="main-content-view">
    <!-- ==================== VIEW: HOMEPAGE (ENHANCED BLOCKSY LAYOUT) ==================== -->
    <div id="view-home">
        <!-- ==========================================================================
           ROW 1: HERO MAGAZINE ROW (8 + 4 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-hero-row reveal-on-scroll">
            <div class="ct-container">
                <div class="blocksy-row-8-4">
                    <!-- Col 8: Lead Hero Story + Trending Subgrid -->
                    <div class="col-8">
                        <article class="hero-lead-card">
                            <div class="hero-lead-media ct-media-zoom">
                                <img src="${getImage(heroLead)}" alt="${cleanTitle(heroLead.title)}">
                                <span class="hero-badge">ख़ास खबर (HOT POST)</span>
                            </div>
                            <div class="hero-lead-body">
                                <h2 class="hero-lead-title">
                                    <a href="javascript:void(0)" onclick="showView('article', ${heroLead.id})">${cleanTitle(heroLead.title)}</a>
                                </h2>
                                <p class="hero-lead-excerpt">${cleanExcerpt(heroLead.excerpt).slice(0, 150)}...</p>
                                <div class="hero-meta-ribbon">
                                    <span>संपादकीय डेस्क</span> • <span>${formatDate(heroLead.date)}</span> • <span>3 मिनट पढ़ें</span> • <span>👁️ ${getViews(heroLead.id)} पाठक</span>
                                </div>
                            </div>
                        </article>

                        <!-- Trending Now Sub-Grid (3 Columns) -->
                        <div class="trending-now-section">
                            <div class="block-heading-row">
                                <h4 class="block-title">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                                    ट्रेंडिंग नाउ (Trending Now)
                                </h4>
                            </div>
                            <div class="trending-grid-3">
                                ${trendingPosts.map((p, idx) => `
                                <article class="card-trending-mini">
                                    <div class="card-media ct-media-zoom">
                                        <img src="${getImage(p)}" alt="${cleanTitle(p.title)}">
                                    </div>
                                    <div class="card-body">
                                        <span class="badge-cat">ट्रेंडिंग</span>
                                        <h3 class="card-title">
                                            <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                        </h3>
                                        <span class="card-meta" style="font-size:0.72rem; color:var(--color-text-muted);">${formatDate(p.date)}</span>
                                    </div>
                                </article>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Col 4: Breaking News Vertical List -->
                    <div class="col-4">
                        <div class="breaking-news-box">
                            <div class="block-heading-row">
                                <h4 class="block-title">ब्रेकिंग न्यूज़ (Breaking News)</h4>
                            </div>
                            <div class="breaking-news-list">
                                ${breakingList.map((p, idx) => `
                                <article class="breaking-item-card">
                                    <div class="breaking-item-thumb ct-media-zoom">
                                        <img src="${getImage(p)}" alt="${cleanTitle(p.title)}">
                                    </div>
                                    <div class="breaking-item-content">
                                        <span class="item-cat">ताज़ा</span>
                                        <h3 class="item-title">
                                            <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                        </h3>
                                        <span class="item-date">${formatDate(p.date)}</span>
                                    </div>
                                </article>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           ROW 2: TWO-COLUMN FEATURE (6 + 6 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-feature-2col reveal-on-scroll">
            <div class="ct-container">
                <div class="blocksy-row-6-6">
                    <!-- Col 6 (Left): Breaking News Lead Story -->
                    <div class="col-6">
                        <div class="block-heading-row">
                            <h4 class="block-title">ताज़ा खबरें (Breaking News)</h4>
                        </div>
                        <article class="card-featured-vertical">
                            <div class="card-media ct-media-zoom">
                                <img src="${getImage(row2Lead)}" alt="${cleanTitle(row2Lead.title)}">
                                <span class="badge-cat" style="position:absolute; top:12px; left:12px;">पश्चिम बंगाल</span>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">
                                    <a href="javascript:void(0)" onclick="showView('article', ${row2Lead.id})">${cleanTitle(row2Lead.title)}</a>
                                </h2>
                                <p class="card-excerpt">${cleanExcerpt(row2Lead.excerpt).slice(0, 140)}...</p>
                                <div class="card-meta">${formatDate(row2Lead.date)} • 2 मिनट पढ़ें • 👁️ ${getViews(row2Lead.id)}</div>
                            </div>
                        </article>
                    </div>

                    <!-- Col 6 (Right): Popular Now 2x2 Grid -->
                    <div class="col-6">
                        <div class="block-heading-row">
                            <h4 class="block-title">लोकप्रिय समाचार (Popular Now)</h4>
                        </div>
                        <div class="popular-grid-2x2">
                            ${popularGrid.map((p, idx) => `
                            <article class="card-popular-grid">
                                <div class="card-media ct-media-zoom">
                                    <img src="${getImage(p)}" alt="${cleanTitle(p.title)}">
                                    <span class="badge-cat" style="position:absolute; top:8px; left:8px;">लोकप्रिय</span>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                    </h3>
                                    <span class="card-meta">${formatDate(p.date)} • 👁️ ${getViews(p.id)}</span>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           FEATURE 2: UPCOMING NEWS & SCHEDULED COVERAGE (आगामी कवरेज एवं घोषणाएं)
           ========================================================================== -->
        <section class="blocksy-upcoming-section reveal-on-scroll">
            <div class="ct-container">
                <div class="upcoming-box-container">
                    <div class="upcoming-header-row">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span class="upcoming-badge-live">
                                <span class="upcoming-pulse-dot"></span>
                                आगामी कवरेज (Upcoming Coverage)
                            </span>
                            <span style="font-size: 0.85rem; color: var(--color-text-muted);">आगामी महत्वपूर्ण कार्यक्रम एवं लाइव प्रसारण घोषणाएं</span>
                        </div>
                        <button class="preview-btn" onclick="showView('upcoming')" style="font-size:0.75rem;">सभी आगामी कार्यक्रम देखें →</button>
                    </div>

                    <div class="upcoming-cards-grid-3">
                        ${upcomingEvents.map((ev, idx) => `
                        <article class="card-upcoming-item">
                            <div class="card-media ct-media-zoom">
                                <img src="${ev.mediaUrl}" alt="${ev.title}">
                                <span class="upcoming-datetime-badge">🗓️ ${ev.date}</span>
                            </div>
                            <div class="card-body">
                                <div class="upcoming-venue">📍 ${ev.venue} • <strong>${ev.cat}</strong></div>
                                <h3 class="card-title">${ev.title}</h3>
                                <p style="font-size:0.80rem; color:var(--color-text-muted); line-height:1.45; margin-bottom:12px;">${ev.desc}</p>
                                <a href="javascript:void(0)" onclick="setUpcomingReminder('${ev.title}', '${ev.date}')" class="btn-reminder">
                                    🔔 रिमाइंडर सेट करें
                                </a>
                            </div>
                        </article>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>

        <!-- 2. BETWEEN SECTIONS BILLBOARD ADVERTISEMENT (970x250) -->
        <div class="ct-container reveal-on-scroll">
            <div class="ad-container-wrap" data-ad-slot="ad_home_between_1">
                <span class="ad-sponsor-label">प्रायोजित विज्ञापन / SPONSORED BILLBOARD</span>
                <div class="ad-slot-box ad-slot-billboard has-creative">
                    <a href="#demo-ad-flipkart" class="demo-ad-creative demo-ad-flipkart" title="प्रायोजित: फ्लिपकार्ट ग्रैंड इलेक्ट्रॉनिक्स फेस्ट">
                        <div class="demo-ad-flipkart-header">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-weight: 900; font-size: 1.15rem; color: #F59E0B; letter-spacing: 0.05em;">Flipkart</span>
                                <span class="demo-ad-badge" style="background: #D97706; color: #FFF;">GRAND ELECTRONICS FEST</span>
                                <span style="font-size: 0.78rem; color: #E2E8F0;">15 – 20 नवम्बर विशेष सेल</span>
                            </div>
                            <div style="font-size: 0.75rem; color: #FCD34D; font-weight: 600;">⏳ ऑफ़र समाप्त होने में केवल 2 दिन शेष</div>
                        </div>
                        <div class="demo-ad-flipkart-grid">
                            <div class="demo-ad-highlight-box">
                                <span style="font-size: 0.75rem; color: #F3F4F6; text-transform: uppercase;">सीमित समय तक</span>
                                <div class="demo-ad-highlight-pct">70% तक छूट</div>
                                <span style="font-size: 0.72rem; color: #FDE68A;">+ ₹10,000 एक्सचेंज बोनस</span>
                            </div>
                            <div class="demo-ad-feature-pills">
                                <div class="demo-ad-pill-item">
                                    <span>📱</span>
                                    <div><strong>लेटेस्ट 5G स्मार्टफोन्स:</strong> ₹8,999 से शुरू · नो कॉस्ट EMI उपलब्ध</div>
                                </div>
                                <div class="demo-ad-pill-item">
                                    <span>💻</span>
                                    <div><strong>अल्ट्रा थिन लैपटॉप्स:</strong> इंटेल कोर i5/i7 पर ₹15,000 की सीधी छूट</div>
                                </div>
                                <div class="demo-ad-pill-item">
                                    <span>📺</span>
                                    <div><strong>4K स्मार्ट टीवी 55-इंच:</strong> मात्र ₹22,999 से · 3 वर्ष की वारंटी</div>
                                </div>
                            </div>
                            <div style="text-align: center;">
                                <span class="demo-ad-cta">ऑफ़र देखें एवं खरीदें →</span>
                                <div class="demo-ad-disclaimer" style="margin-top: 8px;">HDFC & SBI कार्ड पर 10% इंस्टेंट डिस्काउंट*</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- ==========================================================================
           ROW 3: FULL-WIDTH APP PROMO / BILLBOARD BANNER (12 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-app-promo-section reveal-on-scroll">
            <div class="ct-container">
                <div class="app-promo-card">
                    <div class="app-promo-content">
                        <span class="app-promo-badge">आधिकारिक ऐप</span>
                        <h3 class="app-promo-title">राष्ट्र रंग मोबाइल ऐप अभी डाउनलोड करें</h3>
                        <p class="app-promo-desc">देश-दुनिया, पश्चिम बंगाल एवं कोलकाता की हर ब्रेकिंग न्यूज़ सबसे पहले पाएं सीधे अपने स्मार्टफोन पर।</p>
                        <div class="app-promo-stores">
                            <a href="#playstore" class="btn-store-badge">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                                <span>Google Play पर उपलब्ध</span>
                            </a>
                            <a href="#appstore" class="btn-store-badge">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M15.97,4.74C16.63,3.94 17.07,2.83 16.95,1.71C15.98,1.75 14.8,2.36 14.11,3.16C13.5,3.87 12.97,5 13.12,6.1C14.2,6.18 15.31,5.54 15.97,4.74Z"/></svg>
                                <span>Apple App Store</span>
                            </a>
                        </div>
                    </div>
                    <div class="app-promo-media">
                        <div class="phone-mockup-frame">
                            <div class="phone-mockup-screen">
                                <img src="logo.jpg" alt="राष्ट्र रंग ऐप स्क्रीन" style="width:100%; height:100%; object-fit:contain; background:#fff; padding:10px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           FEATURE 1: DEDICATED POPULAR NEWS SECTION (सर्वाधिक लोकप्रिय खबरें / MOST-VIEWED)
           ========================================================================== -->
        <section class="blocksy-popular-section reveal-on-scroll">
            <div class="ct-container">
                <div class="popular-header-row">
                    <div class="block-heading-row" style="margin-bottom:0;">
                        <h3 class="block-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-red)" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            सर्वाधिक लोकप्रिय खबरें (Most Read News)
                        </h3>
                    </div>
                    <div class="popular-filter-pills">
                        <button class="popular-pill-btn active">आज के टॉप</button>
                        <button class="popular-pill-btn">इस सप्ताह</button>
                        <button class="popular-pill-btn">सर्वाधिक चर्चित</button>
                        <button class="preview-btn" onclick="showView('popular')" style="margin-left:8px; font-size:0.75rem;">पूरा पेज देखें →</button>
                    </div>
                </div>

                <div class="popular-cards-grid-4">
                    ${popularSectionPosts.map((p, idx) => `
                    <article class="card-popular-hub">
                        <div class="card-media ct-media-zoom">
                            <img src="${getImage(p)}" alt="${cleanTitle(p.title)}">
                            <span class="popular-rank-badge">0${idx + 1}</span>
                            <span class="view-counter-pill">👁️ ${getViews(p.id)} पाठक</span>
                        </div>
                        <div class="card-body">
                            <span class="badge-cat" style="font-size:0.68rem; margin-bottom:4px;">लोकप्रिय</span>
                            <h4 class="card-title">
                                <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                            </h4>
                            <span class="card-meta" style="font-size:0.72rem; color:var(--color-text-muted); margin-top:auto;">${formatDate(p.date)}</span>
                        </div>
                    </article>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           ROW 4: EDITOR CHOICE & WORTH READING (9 + 3 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-editor-choice-row reveal-on-scroll">
            <div class="ct-container">
                <div class="blocksy-row-9-3">
                    <!-- Col 9: Editor's Choice Main Block -->
                    <div class="col-9">
                        <div class="block-heading-row">
                            <h4 class="block-title">संपादकीय पसंद (Editor's Choice)</h4>
                        </div>
                        <article class="card-horizontal-lead">
                            <div class="card-media ct-media-zoom">
                                <img src="${getImage(editorLead)}" alt="${cleanTitle(editorLead.title)}">
                                <span class="badge-cat" style="position:absolute; top:12px; left:12px;">संपादकीय</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">
                                    <a href="javascript:void(0)" onclick="showView('article', ${editorLead.id})">${cleanTitle(editorLead.title)}</a>
                                </h3>
                                <p class="card-excerpt">${cleanExcerpt(editorLead.excerpt).slice(0, 130)}...</p>
                                <div class="card-meta">${formatDate(editorLead.date)} • संपादकीय विश्लेषण • 👁️ ${getViews(editorLead.id)}</div>
                            </div>
                        </article>

                        <!-- 3-Card Subgrid below lead -->
                        <div class="editor-subgrid-3">
                            ${editorSubgrid.map((p, idx) => `
                            <article class="card-subgrid-item">
                                <div class="card-media ct-media-zoom">
                                    <img src="${getImage(p)}" alt="${cleanTitle(p.title)}">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                    </h4>
                                    <span class="card-meta">${formatDate(p.date)}</span>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Col 3: Worth Reading Numbered List + Newsletter Box -->
                    <div class="col-3">
                        <div class="worth-reading-box">
                            <div class="block-heading-row">
                                <h4 class="block-title">ज़रूर पढ़ें (Worth Reading)</h4>
                            </div>
                            <div class="worth-reading-list">
                                ${worthReading.map((p, idx) => `
                                <div class="worth-reading-item">
                                    <span class="worth-number">${idx + 1}</span>
                                    <h3 class="worth-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                    </h3>
                                </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Newsletter Subscribe Widget Card -->
                        <div class="newsletter-widget-card" id="subscribe">
                            <h4 class="newsletter-title">दैनिक समाचार पत्र सदस्यता</h4>
                            <p class="newsletter-desc">प्रत्येक सुबह देश एवं दुनिया की प्रमुख खबरों का सटीक सारांश अपने ईमेल पर प्राप्त करें।</p>
                            <form onsubmit="alert('राष्ट्र रंग न्यूज़लेटर सदस्यता के लिए धन्यवाद!'); return false;">
                                <input type="email" placeholder="अपना ईमेल दर्ज करें..." required class="newsletter-input" style="width:100%; padding:10px 12px; font-size:0.85rem; border:1px solid var(--color-border); border-radius:3px; margin-bottom:10px; background:var(--color-bg); color:var(--color-text-main);">
                                <button type="submit" class="preview-btn" style="width:100%; padding:10px; font-weight:700; background:var(--color-primary-red); color:#fff; border:none; cursor:pointer;">सब्सक्राइब करें</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. BETWEEN SECTIONS BANNER ADVERTISEMENT (728x90) -->
        <div class="ct-container reveal-on-scroll">
            <div class="ad-container-wrap" data-ad-slot="ad_home_between_2">
                <span class="ad-sponsor-label">विज्ञापन / ADVERTISEMENT</span>
                <div class="ad-slot-box ad-slot-leaderboard has-creative">
                    <a href="#demo-ad-makemytrip" class="demo-ad-creative demo-ad-makemytrip" title="प्रायोजित: मेकमायट्रिप बंगाल व पूर्वोत्तर टूर">
                        <div class="demo-ad-brand">
                            <div style="font-size: 1.6rem; margin-right: 6px;">✈️</div>
                            <div>
                                <span class="demo-ad-badge" style="background: #EF4444; color: #FFF;">MakeMyTrip Holidays</span>
                                <div style="font-size: 0.72rem; color: #A7F3D0;">विंटर हॉलिडे स्पेशल</div>
                            </div>
                        </div>
                        <div style="flex: 1; padding: 0 16px; text-align: left;">
                            <h4 class="demo-ad-title">दार्जिलिंग, सिक्किम एवं सुंदरबन हॉलिडे पैकेज पर फ्लैट ₹5,000 की छूट</h4>
                            <div class="demo-ad-desc">होटल स्टे + दर्शनीय स्थल भ्रमण + भोजन शामिल · प्रोमो कोड: <strong>BENGAL5000</strong></div>
                        </div>
                        <div style="text-align: right; flex-shrink: 0;">
                            <span class="demo-ad-cta">पैकेज बुक करें →</span>
                            <div class="demo-ad-disclaimer">*ऑफ़र सीमित सीटों तक</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- ==========================================================================
           ROW 5: DARK SHOWCASE SECTION (8 + 4 COLUMNS, BACKGROUND #14181E)
           ========================================================================== -->
        <section class="blocksy-dark-showcase-section reveal-on-scroll">
            <div class="ct-container">
                <div class="blocksy-row-8-4">
                    <!-- Col 8: World Lead Story + 2x2 Grid -->
                    <div class="col-8">
                        <div class="block-heading-row dark-heading">
                            <h4 class="block-title">विश्व मंच से और अधिक (MORE FROM WORLD CATEGORY)</h4>
                        </div>
                        <article class="card-dark-lead">
                            <div class="card-media ct-media-zoom">
                                <img src="${getImage(darkLead)}" alt="${cleanTitle(darkLead.title)}">
                                <span class="badge-cat" style="position:absolute; top:12px; left:12px; background:var(--color-primary-red); color:#fff;">अंतर्राष्ट्रीय</span>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">
                                    <a href="javascript:void(0)" onclick="showView('article', ${darkLead.id})">${cleanTitle(darkLead.title)}</a>
                                </h2>
                                <p class="card-excerpt">${cleanExcerpt(darkLead.excerpt).slice(0, 120)}...</p>
                                <div class="card-meta">${formatDate(darkLead.date)} • ग्लोबल रिपोर्ट</div>
                            </div>
                        </article>

                        <!-- 2x2 Subgrid in Dark Section -->
                        <div class="dark-grid-2x2">
                            ${darkGrid.map((p, idx) => `
                            <article class="card-dark-subgrid">
                                <div class="card-media ct-media-zoom">
                                    <img src="${getImage(p)}" alt="${cleanTitle(p.title)}">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                    </h4>
                                    <span class="card-meta">${formatDate(p.date)}</span>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Col 4: Video Showcase / Hot Videos -->
                    <div class="col-4">
                        <div class="hot-videos-box">
                            <div class="block-heading-row dark-heading">
                                <h4 class="block-title">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                                    वीडियो समाचार (Hot Videos)
                                </h4>
                            </div>
                            <div class="hot-videos-list">
                                ${videoList.map((p, idx) => `
                                <article class="card-video-item">
                                    <div class="card-media ct-media-zoom">
                                        <img src="${getImage(p)}" alt="${cleanTitle(p.title)}">
                                        <div class="video-play-overlay">
                                            <div class="video-play-circle">▶</div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <h4 class="card-title">
                                            <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                        </h4>
                                        <span class="card-meta">${formatDate(p.date)}</span>
                                    </div>
                                </article>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           ROW 6: TRIPLE CATEGORY COLUMNS (4 + 4 + 4 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-triple-cat-row reveal-on-scroll">
            <div class="ct-container">
                <div class="blocksy-row-4-4-4">
                    <!-- Column 1: West Bengal -->
                    <div class="col-4">
                        <div class="block-heading-row">
                            <h4 class="block-title">पश्चिम बंगाल (West Bengal)</h4>
                        </div>
                        <article class="card-featured-vertical" style="height:auto; margin-bottom:16px;">
                            <div class="card-media ct-media-zoom" style="height:190px;">
                                <img src="${getImage(cat1Lead)}" alt="${cleanTitle(cat1Lead.title)}">
                                <span class="badge-cat" style="position:absolute; top:8px; left:8px;">पश्चिम बंगाल</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title" style="font-size:1.05rem;">
                                    <a href="javascript:void(0)" onclick="showView('article', ${cat1Lead.id})">${cleanTitle(cat1Lead.title)}</a>
                                </h3>
                                <span class="card-meta">${formatDate(cat1Lead.date)}</span>
                            </div>
                        </article>
                        <div class="breaking-news-list">
                            ${cat1List.map((p, idx) => `
                            <article class="breaking-item-card">
                                <div class="breaking-item-thumb ct-media-zoom">
                                    <img src="${getImage(p)}" alt="${cleanTitle(p.title)}">
                                </div>
                                <div class="breaking-item-content">
                                    <h4 class="item-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                    </h4>
                                    <span class="item-date">${formatDate(p.date)}</span>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Column 2: Kolkata -->
                    <div class="col-4">
                        <div class="block-heading-row">
                            <h4 class="block-title">कोलकाता (Kolkata Metro)</h4>
                        </div>
                        <article class="card-featured-vertical" style="height:auto; margin-bottom:16px;">
                            <div class="card-media ct-media-zoom" style="height:190px;">
                                <img src="${getImage(cat2Lead)}" alt="${cleanTitle(cat2Lead.title)}">
                                <span class="badge-cat" style="position:absolute; top:8px; left:8px;">कोलकाता</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title" style="font-size:1.05rem;">
                                    <a href="javascript:void(0)" onclick="showView('article', ${cat2Lead.id})">${cleanTitle(cat2Lead.title)}</a>
                                </h3>
                                <span class="card-meta">${formatDate(cat2Lead.date)}</span>
                            </div>
                        </article>
                        <div class="breaking-news-list">
                            ${cat2List.map((p, idx) => `
                            <article class="breaking-item-card">
                                <div class="breaking-item-thumb ct-media-zoom">
                                    <img src="${getImage(p)}" alt="${cleanTitle(p.title)}">
                                </div>
                                <div class="breaking-item-content">
                                    <h4 class="item-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                    </h4>
                                    <span class="item-date">${formatDate(p.date)}</span>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Column 3: Politics -->
                    <div class="col-4">
                        <div class="block-heading-row">
                            <h4 class="block-title">राजनीति एवं शासन (Politics)</h4>
                        </div>
                        <article class="card-featured-vertical" style="height:auto; margin-bottom:16px;">
                            <div class="card-media ct-media-zoom" style="height:190px;">
                                <img src="${getImage(cat3Lead)}" alt="${cleanTitle(cat3Lead.title)}">
                                <span class="badge-cat" style="position:absolute; top:8px; left:8px;">राजनीति</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title" style="font-size:1.05rem;">
                                    <a href="javascript:void(0)" onclick="showView('article', ${cat3Lead.id})">${cleanTitle(cat3Lead.title)}</a>
                                </h3>
                                <span class="card-meta">${formatDate(cat3Lead.date)}</span>
                            </div>
                        </article>
                        <div class="breaking-news-list">
                            ${cat3List.map((p, idx) => `
                            <article class="breaking-item-card">
                                <div class="breaking-item-thumb ct-media-zoom">
                                    <img src="${getImage(p)}" alt="${cleanTitle(p.title)}">
                                </div>
                                <div class="breaking-item-content">
                                    <h4 class="item-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                    </h4>
                                    <span class="item-date">${formatDate(p.date)}</span>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           FEATURE 3: CATEGORIES DIRECTORY HUB (समस्त समाचार श्रेणियां)
           ========================================================================== -->
        <section class="blocksy-categories-hub-section reveal-on-scroll">
            <div class="ct-container">
                <div class="block-heading-row" style="margin-bottom:16px;">
                    <h3 class="block-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-red)" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        समस्त समाचार श्रेणियां (Explore All Categories)
                    </h3>
                </div>

                <!-- Horizontal Scrollable Quick Jump Pills -->
                <div class="categories-scroll-nav-bar">
                    ${categoriesHubList.map(c => `
                    <a href="javascript:void(0)" onclick="showView('category', ${c.id}, '${c.name}')" class="category-nav-pill">
                        <span>${c.name}</span>
                        <span class="pill-count">${c.count}</span>
                    </a>
                    `).join('')}
                </div>

                <!-- Visual 4-Column Category Grid -->
                <div class="categories-hub-grid">
                    ${categoriesHubList.slice(0, 8).map(c => `
                    <a href="javascript:void(0)" onclick="showView('category', ${c.id}, '${c.name}')" class="card-category-hub">
                        <img src="${getImage(c.post)}" alt="${c.name}" class="cat-hub-bg-img" loading="lazy">
                        <div class="cat-hub-gradient"></div>
                        <div class="cat-hub-content">
                            <span class="cat-hub-badge">${c.count}+ खबरें</span>
                            <h4 class="cat-hub-title">${c.name}</h4>
                            <p class="cat-hub-latest">ताज़ा: ${cleanTitle(c.post.title)}</p>
                        </div>
                    </a>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- 4. FOOTER TOP BANNER ADVERTISEMENT (728x90) -->
        <div class="ct-container reveal-on-scroll">
            <div class="ad-container-wrap" data-ad-slot="ad_footer_top">
                <span class="ad-sponsor-label">विज्ञापन / ADVERTISEMENT</span>
                <div class="ad-slot-box ad-slot-footer has-creative">
                    <a href="#demo-ad-solar" class="demo-ad-creative demo-ad-solar" title="प्रायोजित: टाटा पावर सोलर रूफटॉप">
                        <div class="demo-ad-brand">
                            <div style="font-size: 1.5rem; margin-right: 6px;">☀️</div>
                            <div>
                                <span class="demo-ad-badge" style="background: #FBBF24; color: #064E3B;">TATA POWER SOLAR</span>
                                <div style="font-size: 0.72rem; color: #A7F3D0;">हरित ऊर्जा, बचत भरपूर</div>
                            </div>
                        </div>
                        <div style="flex: 1; padding: 0 16px; text-align: left;">
                            <h4 class="demo-ad-title">घर की छत पर लगाएं सोलर रूफटॉप और मासिक बिजली बिल को करें 80% तक कम</h4>
                            <div class="demo-ad-desc">पीएम सूर्य घर योजना के तहत ₹78,000 तक की सरकारी सब्सिडी · 25 वर्ष की परफॉरमेंस गारंटी</div>
                        </div>
                        <div style="text-align: right; flex-shrink: 0;">
                            <span class="demo-ad-cta">फ्री रूफ सर्वे बुक करें →</span>
                            <div class="demo-ad-disclaimer">तुरंत अप्रूवल एवं इंस्टॉलेशन</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- ==================== VIEW: DEDICATED POPULAR NEWS PAGE ==================== -->
    <div id="view-popular" style="display:none;">
        <div class="ct-container" style="padding-top: 35px; padding-bottom: 60px;">
            <header class="category-archive-header" style="margin-bottom: 25px; border-bottom: 2px solid var(--color-border); padding-bottom: 20px;">
                <div class="article-meta-slashes" style="margin-bottom: 10px;">
                    <a href="javascript:void(0)" onclick="showView('home')">होम</a> <span>/</span> <span style="font-weight: 600;">लोकप्रिय समाचार</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <h1 class="block-title" style="font-size: 2.2rem; margin: 0 0 8px 0;">
                            🔥 सर्वाधिक लोकप्रिय समाचार (Most Read News)
                        </h1>
                        <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
                            राष्ट्र रंग पर पाठकों द्वारा सर्वाधिक पढ़े जाने वाले ताज़ा, प्रामाणिक एवं चर्चित समाचार।
                        </p>
                    </div>
                    <div class="popular-filter-pills">
                        <button class="popular-pill-btn active">आज के टॉप</button>
                        <button class="popular-pill-btn">इस सप्ताह</button>
                        <button class="popular-pill-btn">सर्वाधिक चर्चित</button>
                    </div>
                </div>
            </header>

            <div class="article-two-col-layout">
                <div class="popular-posts-column">
                    <div class="editor-subgrid-3" style="grid-template-columns: repeat(2, 1fr); gap: 24px;">
                        ${allPosts.slice(0, 8).map((p, idx) => `
                        <article class="card-popular-hub" style="border: 1px solid var(--color-border);">
                            <div class="card-media ct-media-zoom" style="height: 180px;">
                                <img src="${getImage(p)}" alt="${cleanTitle(p.title)}" style="width: 100%; height: 100%; object-fit: cover;">
                                <span class="popular-rank-badge">0${idx + 1}</span>
                                <span class="view-counter-pill">👁️ ${getViews(p.id)} पाठक</span>
                            </div>
                            <div class="card-body">
                                <span class="badge-cat" style="font-size:0.68rem; margin-bottom:4px;">लोकप्रिय</span>
                                <h3 class="card-title" style="font-size: 1.05rem; margin-bottom: 8px;">
                                    <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                </h3>
                                <p style="font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5; margin: 6px 0 10px;">
                                    ${cleanExcerpt(p.excerpt).slice(0, 110)}...
                                </p>
                                <span class="card-meta" style="font-size: 0.72rem; color: var(--color-text-muted); margin-top: auto;">
                                    ${formatDate(p.date)}
                                </span>
                            </div>
                        </article>
                        `).join('')}
                    </div>
                    <div style="margin-top: 30px; text-align: center;">
                        <button class="preview-btn" onclick="showView('home')">← मुख्य पृष्ठ पर वापस जाएं</button>
                    </div>
                </div>

                <!-- Sidebar with Ad Slots -->
                <aside class="article-sidebar-column">
                    <div class="ad-container-wrap" data-ad-slot="ad_sidebar_top">
                        <span class="ad-sponsor-label">विज्ञापन / ADVERTISEMENT</span>
                        <div class="ad-slot-box ad-slot-sidebar-300 has-creative">
                            <a href="#demo-ad-allen" class="demo-ad-creative demo-ad-allen" title="प्रायोजित: एलन करियर इंस्टीट्यूट">
                                <div>
                                    <span class="demo-ad-badge" style="background: #06B6D4; color: #082F49;">ALLEN CAREER INSTITUTE</span>
                                    <h4 class="demo-ad-title" style="margin-top: 8px; font-size: 1.05rem;">NEET-UG एवं JEE 2026-27</h4>
                                    <p class="demo-ad-desc" style="font-size: 0.8rem; margin: 8px 0;">देश के सर्वश्रेष्ठ गुरुजनों के साथ डॉक्टर एवं इंजीनियर बनने के सपने को साकार करें।</p>
                                </div>
                                <div style="background: rgba(255,255,255,0.08); padding: 8px; border-radius: 4px; font-size: 0.75rem; text-align: left;">
                                    <div>✓ कोटा एवं कोलकाता के अनुभवी शिक्षक</div>
                                    <div>✓ 90% तक छात्रवृत्ति (TALLENTEX परीक्षा)</div>
                                </div>
                                <div>
                                    <span class="demo-ad-cta">फ्री काउंसलिंग बुक करें →</span>
                                    <div class="demo-ad-disclaimer">नए बैच आगामी सोमवार से प्रारंभ</div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="worth-reading-box">
                        <div class="block-heading-row">
                            <h4 class="block-title">ताज़ा सुर्खियां</h4>
                        </div>
                        <div class="worth-reading-list">
                            ${worthReading.map((p, idx) => `
                            <div class="worth-reading-item">
                                <span class="worth-number">${idx + 1}</span>
                                <h3 class="worth-title">
                                    <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                </h3>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>

    <!-- ==================== VIEW: DEDICATED UPCOMING NEWS PAGE ==================== -->
    <div id="view-upcoming" style="display:none;">
        <div class="ct-container" style="padding-top: 35px; padding-bottom: 60px;">
            <header class="category-archive-header" style="margin-bottom: 30px; border-bottom: 2px solid var(--color-border); padding-bottom: 20px;">
                <div class="article-meta-slashes" style="margin-bottom: 10px;">
                    <a href="javascript:void(0)" onclick="showView('home')">होम</a> <span>/</span> <span style="font-weight: 600;">आगामी कवरेज</span>
                </div>
                <h1 class="block-title" style="font-size: 2.2rem; margin: 0 0 10px 0;">
                    आगामी कवरेज एवं घोषणाएं (Upcoming Events & Live Coverage)
                </h1>
                <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6;">
                    राष्ट्र रंग संपादकीय टीम द्वारा आगामी दिनों में लाइव कवर किए जाने वाले महत्वपूर्ण राजनीतिक, सामाजिक, खेल एवं सांस्कृतिक आयोजनों का समयबद्ध विवरण।
                </p>
            </header>

            <div class="upcoming-cards-grid-3" style="grid-template-columns: repeat(2, 1fr); gap: 24px;">
                ${upcomingEvents.map((ev, idx) => `
                <article class="card-upcoming-item" style="border: 1px solid var(--color-border);">
                    <div class="card-media ct-media-zoom" style="height: 190px;">
                        <img src="${ev.mediaUrl}" alt="${ev.title}" style="width: 100%; height: 100%; object-fit: cover;">
                        <span class="upcoming-datetime-badge">🗓️ ${ev.date}</span>
                    </div>
                    <div class="card-body" style="padding: 18px;">
                        <div class="upcoming-venue">📍 ${ev.venue} • <strong>${ev.cat}</strong></div>
                        <h3 class="card-title" style="font-size: 1.05rem; margin-bottom: 10px;">${ev.title}</h3>
                        <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 16px;">${ev.desc}</p>
                        <a href="javascript:void(0)" onclick="setUpcomingReminder('${ev.title}', '${ev.date}')" class="btn-reminder" style="margin-top: auto;">
                            🔔 रिमाइंडर सेट करें
                        </a>
                    </div>
                </article>
                `).join('')}
            </div>

            <div style="margin-top: 35px; text-align: center;">
                <button class="preview-btn" onclick="showView('home')">← मुख्य पृष्ठ पर वापस जाएं</button>
            </div>
        </div>
    </div>

    <!-- ==================== VIEW: ALL CATEGORIES DIRECTORY HUB ==================== -->
    <div id="view-categories" style="display:none;">
        <div class="ct-container" style="padding-top: 35px; padding-bottom: 60px;">
            <header class="category-archive-header" style="margin-bottom: 30px; border-bottom: 2px solid var(--color-border); padding-bottom: 20px;">
                <div class="article-meta-slashes" style="margin-bottom: 10px;">
                    <a href="javascript:void(0)" onclick="showView('home')">होम</a> <span>/</span> <span style="font-weight: 600;">समस्त श्रेणियां</span>
                </div>
                <h1 class="block-title" style="font-size: 2.2rem; margin: 0 0 10px 0;">
                    📂 समस्त समाचार श्रेणियां (Complete Category Directory)
                </h1>
                <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6;">
                    राष्ट्र रंग के सभी 13 विषयगत विभागों एवं अनुभागों की विस्तृत डायरेक्टरी। किसी भी श्रेणी पर क्लिक कर उसकी सभी खबरें पढ़ें।
                </p>
            </header>

            <div class="categories-hub-grid">
                ${categoriesHubList.map(c => `
                <a href="javascript:void(0)" onclick="showView('category', ${c.id}, '${c.name}')" class="card-category-hub">
                    <img src="${getImage(c.post)}" alt="${c.name}" class="cat-hub-bg-img" loading="lazy">
                    <div class="cat-hub-gradient"></div>
                    <div class="cat-hub-content">
                        <span class="cat-hub-badge">${c.count}+ खबरें</span>
                        <h4 class="cat-hub-title">${c.name}</h4>
                        <p class="cat-hub-latest">ताज़ा: ${cleanTitle(c.post.title)}</p>
                    </div>
                </a>
                `).join('')}
            </div>

            <div style="margin-top: 35px; text-align: center;">
                <button class="preview-btn" onclick="showView('home')">← मुख्य पृष्ठ पर वापस जाएं</button>
            </div>
        </div>
    </div>

    <!-- ==================== VIEW: SINGLE ARTICLE (BLOCKSY READING VIEW) ==================== -->
    <div id="view-article" style="display:none;">
        <div class="ct-container article-reading-view">
            <header class="article-header">
                <div class="article-meta-slashes" id="article-breadcrumb">
                    <a href="javascript:void(0)" onclick="showView('home')">होम</a> <span>/</span> <span id="article-cat-label">राष्ट्रीय</span> <span>/</span> <span>आर्टिकल</span>
                </div>
                <h1 class="article-title-h1" id="article-h1">${cleanTitle(heroLead.title)}</h1>
                <div class="article-meta-slashes">
                    <strong>संपादकीय डेस्क</strong> <span>/</span> <span id="article-date-meta">${formatDate(heroLead.date)}</span> <span>/</span> <span>3 मिनट पढ़ें</span> <span>/</span> <span>👁️ ${getViews(heroLead.id)} पाठक</span>
                </div>
            </header>

            <div class="article-two-col-layout">
                <div class="article-content-column">
                    <div class="article-featured-image ct-media-zoom">
                        <img id="article-hero-img" src="${getImage(heroLead)}" alt="Featured article image">
                    </div>
                    <div class="article-content-body" id="article-body">
                        ${heroLead.content || `<p>${cleanExcerpt(heroLead.excerpt)}</p>`}
                    </div>

                    <!-- In-Article Mid-Content Ad Slot -->
                    <div class="ad-container-wrap" data-ad-slot="ad_article_inline">
                        <span class="ad-sponsor-label">विज्ञापन / ADVERTISEMENT</span>
                        <div class="ad-slot-box ad-slot-inarticle has-creative">
                            <a href="#demo-ad-hdfc" class="demo-ad-creative demo-ad-hdfc" title="प्रायोजित: एचडीएफसी लाइफ संपूर्ण सुरक्षा">
                                <div style="flex: 1; text-align: left;">
                                    <span class="demo-ad-badge" style="background: #10B981; color: #FFF;">HDFC LIFE · सर उठा के जियो</span>
                                    <h4 class="demo-ad-title" style="margin-top: 6px;">क्या आपका परिवार अप्रत्याशित संकटों से पूरी तरह सुरक्षित है?</h4>
                                    <div class="demo-ad-desc">₹1 करोड़ का टर्म लाइफ इंश्योरेंस कवर मात्र <strong>₹540/माह*</strong> से प्रारंभ · 34 गंभीर बीमारियों का इलाज कवर</div>
                                </div>
                                <div style="text-align: right; flex-shrink: 0; padding-left: 14px;">
                                    <span class="demo-ad-cta">प्रीमियम चेक करें →</span>
                                    <div class="demo-ad-disclaimer">99.5% क्लेम निपटान अनुपात</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <!-- Blocksy Share Box -->
                    <div class="article-share-box">
                        <strong>खबर साझा करें:</strong>
                        <div class="share-buttons-row">
                            <button class="btn-share whatsapp" onclick="alert('व्हाट्सएप पर शेयर करें')">WhatsApp</button>
                            <button class="btn-share facebook" onclick="alert('फेसबुक पर शेयर करें')">Facebook</button>
                            <button class="btn-share twitter" onclick="alert('X पर शेयर करें')">X</button>
                            <button class="btn-share copylink" onclick="navigator.clipboard.writeText(window.location.href); alert('लिंक कॉपी हो गया!');">कॉपी लिंक</button>
                        </div>
                    </div>

                    <!-- Below Article Ad Slot -->
                    <div class="ad-container-wrap" data-ad-slot="ad_article_bottom">
                        <span class="ad-sponsor-label">प्रायोजित सामग्री / MATCHED CONTENT</span>
                        <div class="ad-slot-box ad-slot-leaderboard has-creative">
                            <a href="#demo-ad-makemytrip" class="demo-ad-creative demo-ad-makemytrip" title="प्रायोजित यात्रा ऑफ़र">
                                <div class="demo-ad-brand">
                                    <div style="font-size: 1.6rem; margin-right: 6px;">🏖️</div>
                                    <div>
                                        <span class="demo-ad-badge" style="background: #EF4444; color: #FFF;">MakeMyTrip Holidays</span>
                                        <div style="font-size: 0.72rem; color: #A7F3D0;">सप्ताहांत स्पेशल टूर</div>
                                    </div>
                                </div>
                                <div style="flex: 1; padding: 0 16px; text-align: left;">
                                    <h4 class="demo-ad-title">दीघा, मंदारमणि एवं पुरी वीकेंड टूर पैकेज · 2 रात 3 दिन केवल ₹4,999 से</h4>
                                    <div class="demo-ad-desc">डीलक्स होटल + समुद्र तट दर्शनीय स्थल + ब्रेकफास्ट कॉम्प्लिमेंट्री</div>
                                </div>
                                <div style="text-align: right; flex-shrink: 0;">
                                    <span class="demo-ad-cta">ऑफ़र देखें →</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div style="margin-top: 30px;">
                        <button class="preview-btn" onclick="showView('home')">← मुख्य पृष्ठ पर वापस जाएं</button>
                    </div>
                </div>

                <!-- Sidebar with Ad Slots -->
                <div class="article-sidebar-column">
                    <!-- Sidebar Top Ad -->
                    <div class="ad-container-wrap" data-ad-slot="ad_sidebar_top">
                        <span class="ad-sponsor-label">विज्ञापन / ADVERTISEMENT</span>
                        <div class="ad-slot-box ad-slot-sidebar-300 has-creative">
                            <a href="#demo-ad-allen" class="demo-ad-creative demo-ad-allen" title="प्रायोजित: एलन करियर इंस्टीट्यूट">
                                <div>
                                    <span class="demo-ad-badge" style="background: #06B6D4; color: #082F49;">ALLEN CAREER INSTITUTE</span>
                                    <h4 class="demo-ad-title" style="margin-top: 8px; font-size: 1.05rem;">NEET-UG एवं JEE 2026-27</h4>
                                    <p class="demo-ad-desc" style="font-size: 0.8rem; margin: 8px 0;">देश के सर्वश्रेष्ठ गुरुजनों के साथ डॉक्टर एवं इंजीनियर बनने के सपने को साकार करें।</p>
                                </div>
                                <div style="background: rgba(255,255,255,0.08); padding: 8px; border-radius: 4px; font-size: 0.75rem; text-align: left;">
                                    <div>✓ कोटा एवं कोलकाता के अनुभवी शिक्षक</div>
                                    <div>✓ 90% तक छात्रवृत्ति (TALLENTEX परीक्षा)</div>
                                </div>
                                <div>
                                    <span class="demo-ad-cta">फ्री काउंसलिंग बुक करें →</span>
                                    <div class="demo-ad-disclaimer">नए बैच आगामी सोमवार से प्रारंभ</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="worth-reading-box">
                        <div class="block-heading-row">
                            <h4 class="block-title">अन्य महत्वपूर्ण खबरें</h4>
                        </div>
                        <div class="worth-reading-list">
                            ${worthReading.map((p, idx) => `
                            <div class="worth-reading-item">
                                <span class="worth-number">${idx + 1}</span>
                                <h3 class="worth-title">
                                    <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title)}</a>
                                </h3>
                            </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Sidebar Sticky Half-Page Ad -->
                    <div class="ad-container-wrap" data-ad-slot="ad_sidebar_sticky" style="margin-top:25px;">
                        <span class="ad-sponsor-label">विज्ञापन / ADVERTISEMENT</span>
                        <div class="ad-slot-box ad-slot-sidebar-sticky has-creative">
                            <a href="#demo-ad-tanishq" class="demo-ad-creative demo-ad-tanishq" title="प्रायोजित: सेनको गोल्ड एंड डायमंड्स">
                                <div>
                                    <div class="demo-ad-gold-ornament">👑</div>
                                    <span class="demo-ad-badge" style="background: #D4AF37; color: #3A0713;">SENCO GOLD & DIAMONDS</span>
                                    <h3 class="demo-ad-tanishq-title">विवाह एवं उत्सव आभूषण संग्रह 2026</h3>
                                    <div style="font-size: 0.76rem; color: #FEEBC8;">विरासत 85 वर्षों की विश्वसनीयता की</div>
                                </div>
                                <div class="demo-ad-jewel-perks">
                                    <div>✨ <strong>सोने के आभूषण:</strong> मेकिंग चार्ज पर फ्लैट 0%*</div>
                                    <div>💎 <strong>डायमंड ज्वेलरी:</strong> कुल मूल्य पर 25% तक की सीधी छूट</div>
                                    <div>🌟 <strong>पुराना सोना एक्सचेंज:</strong> 100% बाजार मूल्य का वादा</div>
                                    <div>🛡️ <strong>शुद्धता:</strong> BIS हॉलमार्क 100% प्रमाणित</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.74rem; color: #FDE68A; margin-bottom: 8px;">कोलकाता, साल्ट लेक एवं हावड़ा शोरूम पर उपलब्ध</div>
                                    <span class="demo-ad-cta">कैटलॉग देखें एवं अपॉइंटमेंट लें →</span>
                                    <div class="demo-ad-disclaimer" style="margin-top: 6px;">*शर्तें लागू · सीमित अवधि तक</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ==================== VIEW: CATEGORY ARCHIVE ==================== -->
    <div id="view-category" style="display:none;">
        <div class="ct-container" style="padding-top: 30px; padding-bottom: 50px;">
            <div class="article-meta-slashes">
                <a href="javascript:void(0)" onclick="showView('home')">होम</a> <span>/</span> <span id="category-crumb-name">कोलकाता</span>
            </div>
            <h1 class="block-title" id="category-heading" style="font-size: 2.2rem; margin: 15px 0;">कोलकाता समाचार</h1>
            <p style="color: var(--color-text-muted); margin-bottom: 25px;">राष्ट्र रंग पर संबंधित सभी ताज़ा, प्रामाणिक एवं विस्तृत खबरें।</p>
            
            <!-- Category Top Banner Ad -->
            <div class="ad-container-wrap" data-ad-slot="ad_category_top">
                <span class="ad-sponsor-label">विज्ञापन / ADVERTISEMENT</span>
                <div class="ad-slot-box ad-slot-leaderboard has-creative">
                    <a href="#demo-ad-bengal" class="demo-ad-creative demo-ad-bengal" title="प्रायोजित: बंगाल हैंडलूम एवं सिल्क एक्सपो">
                        <div class="demo-ad-brand">
                            <div style="font-size: 1.5rem; margin-right: 6px;">🧵</div>
                            <div>
                                <span class="demo-ad-badge" style="background: #FEF3C7; color: #78350F;">बंगाल हैंडलूम एक्सपो</span>
                                <div style="font-size: 0.72rem; color: #FED7AA;">साल्ट लेक, कोलकाता</div>
                            </div>
                        </div>
                        <div style="flex: 1; padding: 0 16px; text-align: left;">
                            <h4 class="demo-ad-title">बालूचरी, ढाकाई जामदानी एवं तसर सिल्क का विशाल प्रामाणिक संग्रह</h4>
                            <div class="demo-ad-desc">कारीगरों से सीधी खरीदारी पर 40% तक विशेष प्रारंभिक छूट · मेला प्रांगण, साल्ट लेक</div>
                        </div>
                        <div style="text-align: right; flex-shrink: 0;">
                            <span class="demo-ad-cta">स्थान एवं विवरण →</span>
                            <div class="demo-ad-disclaimer">प्रवेश पूर्णतः निःशुल्क</div>
                        </div>
                    </a>
                </div>
            </div>

            <div class="editor-subgrid-3" id="category-posts-container" style="grid-template-columns: repeat(3, 1fr);">
                <!-- Dynamically populated on view switch -->
            </div>
            <div style="margin-top: 30px; text-align: center;">
                <button class="preview-btn" onclick="showView('home')">← मुख्य पृष्ठ पर वापस जाएं</button>
            </div>
        </div>
    </div>

    <!-- ==================== VIEW: ABOUT US ==================== -->
    <div id="view-about" style="display:none;">
        <div class="ct-container article-reading-view">
            <h1 class="article-title-h1">हमारे बारे में (About Rashtra Rang)</h1>
            <div class="article-two-col-layout">
                <div class="article-content-column">
                    <div class="article-content-body">
                        <p><strong>राष्ट्र रंग (Rashtra Rang)</strong> पश्चिम बंगाल, कोलकाता एवं संपूर्ण भारत का प्रमुख डिजिटल हिंदी समाचार पत्र एवं डिजिटल न्यूज़ पोर्टल है। हमारा उद्देश्य निष्पक्ष, निर्भीक और सत्यनिष्ठ पत्रकारिता के माध्यम से जनता तक सही सूचना पहुंचाना है।</p>
                        <h3>संपादकीय नीति</h3>
                        <p>हम भारतीय प्रेस परिषद (Press Council of India) तथा सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021 के समस्त मानकों का अक्षरशः पालन करते हैं।</p>
                        <h3>शिकायत निवारण तंत्र (Grievance Redressal)</h3>
                        <p>सूचना प्रौद्योगिकी नियम 2021 के अंतर्गत हमारे शिकायत निवारण अधिकारी का विवरण निम्नलिखित है:</p>
                        <p><strong>नाम:</strong> संतोष तिवारी<br><strong>पद:</strong> शिकायत निवारण अधिकारी (Grievance Officer)<br><strong>ईमेल:</strong> editor@rashtrarang.com<br><strong>मुख्यालय:</strong> कोलकाता, पश्चिम बंगाल, भारत</p>
                    </div>
                </div>
                <div class="article-sidebar-column">
                    <div class="worth-reading-box">
                        <div class="block-heading-row">
                            <h4 class="block-title">महत्वपूर्ण लिंक</h4>
                        </div>
                        <ul style="padding:15px; list-style:none; line-height:2;">
                            <li><a href="javascript:void(0)" onclick="showView('home')">← मुख्य पृष्ठ</a></li>
                            <li><a href="javascript:void(0)" onclick="showView('category', 81, 'ई-पेपर')">ई-पेपर संस्करण</a></li>
                            <li><a href="https://www.rashtrarang.com/" target="_blank">लाइव पोर्टल लिंक</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- ==========================================================================
   RASHTRA RANG FOOTER
   ========================================================================== -->
<footer class="ct-footer" data-id="type-1">
    <div class="ct-container">
        <!-- 4-Column Footer Widget Grid -->
        <div class="footer-grid-4">
            <!-- Col 1: About & Office Details -->
            <div class="footer-col">
                <h4 class="footer-widget-title">राष्ट्र रंग (Rashtra Rang)</h4>
                <p class="footer-desc">कोलकाता एवं पश्चिम बंगाल से प्रकाशित दैनिक हिंदी समाचार पत्र एवं अग्रणी डिजिटल पोर्टल। निष्पक्ष, निर्भीक, सटीक।</p>
                <div class="footer-social-row">
                    <a href="https://facebook.com" target="_blank" class="footer-social-icon" aria-label="Facebook">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" class="footer-social-icon" aria-label="Twitter">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                    </a>
                    <a href="https://youtube.com" target="_blank" class="footer-social-icon" aria-label="YouTube">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                    </a>
                    <a href="https://whatsapp.com" target="_blank" class="footer-social-icon" aria-label="WhatsApp">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
                    </a>
                </div>
            </div>

            <!-- Col 2: Categories -->
            <div class="footer-col">
                <h4 class="footer-widget-title">प्रमुख श्रेणियां</h4>
                <ul class="footer-links-list">
                    <li><a href="javascript:void(0)" onclick="showView('category', 35, 'राष्ट्रीय')">राष्ट्रीय समाचार</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 78, 'पश्चिम बंगाल')">पश्चिम बंगाल</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 89, 'कोलकाता')">कोलकाता मेट्रो</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 84, 'राजनीति')">राजनीति एवं चुनाव</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 91, 'खेल जगत')">खेल जगत</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 77, 'फिल्म जगत')">फिल्म एवं मनोरंजन</a></li>
                </ul>
            </div>

            <!-- Col 3: Editorial Links -->
            <div class="footer-col">
                <h4 class="footer-widget-title">संपादकीय एवं विचार</h4>
                <ul class="footer-links-list">
                    <li><a href="javascript:void(0)" onclick="showView('category', 80, 'आलेख')">विशेष संपादकीय आलेख</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 141, 'अर्थ जगत')">अर्थ जगत एवं व्यापार</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 138, 'विदेश')">अंतर्राष्ट्रीय घटनाक्रम</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 140, 'स्वास्थ्य')">स्वास्थ्य एवं जीवनशैली</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 139, 'धर्म-अध्यात्म')">धर्म एवं संस्कृति</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 81, 'ई-पेपर')">ई-पेपर डिजिटल संस्करण</a></li>
                </ul>
            </div>

            <!-- Col 4: Corporate & Statutory -->
            <div class="footer-col">
                <h4 class="footer-widget-title">संस्थान एवं नीतियां</h4>
                <ul class="footer-links-list">
                    <li><a href="javascript:void(0)" onclick="showView('about')">हमारे बारे में (About Us)</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('about')">संपादकीय नीति (Editorial Policy)</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('about')">गोपनीयता नीति (Privacy Policy)</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('about')">नियम एवं शर्तें (Terms & Conditions)</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('about')">डिजिटल मीडिया आचार संहिता (IT Rules 2021)</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('about')">शिकायत निवारण अधिकारी (Grievance Officer)</a></li>
                </ul>
            </div>
        </div>

        <!-- Footer Bottom: Centered Logo & Copyright -->
        <div class="footer-bottom-bar">
            <div class="footer-logo-wrap">
                <div class="footer-logo-text">राष्ट्र रंग</div>
                <div class="footer-logo-sub">RASHTRA RANG</div>
            </div>
            <p class="footer-copyright">
                © 2026 <strong>राष्ट्र रंग (Rashtra Rang)</strong>. सर्वाधिकार सुरक्षित।<br>
                दैनिक हिंदी समाचार पत्र एवं डिजिटल न्यूज़ पोर्टल | सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम 2021 के अंतर्गत पंजीकृत।
            </p>
        </div>
    </div>
</footer>

<!-- Blocksy Mobile Offcanvas Drawer -->
<div class="ct-offcanvas-overlay" id="offcanvas-overlay" onclick="closeMobileDrawer()"></div>
<aside class="ct-offcanvas-drawer" id="offcanvas-drawer" aria-label="मोबाइल नेविगेशन मेनू">
    <div class="ct-offcanvas-header">
        <div class="ct-offcanvas-title">राष्ट्र रंग</div>
        <button class="ct-offcanvas-close" onclick="closeMobileDrawer()" aria-label="मेनू बंद करें">✕</button>
    </div>
    <div class="ct-offcanvas-body">
        <ul class="ct-offcanvas-nav">
            <li><a href="javascript:void(0)" onclick="showView('home'); closeMobileDrawer();">होम (Home)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('popular'); closeMobileDrawer();">लोकप्रिय समाचार (Popular)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('upcoming'); closeMobileDrawer();">आगामी कवरेज (Upcoming)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('categories_hub'); closeMobileDrawer();">समस्त श्रेणियां (Categories)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 35, 'राष्ट्रीय'); closeMobileDrawer();">राष्ट्रीय (National)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 78, 'पश्चिम बंगाल'); closeMobileDrawer();">पश्चिम बंगाल (West Bengal)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 89, 'कोलकाता'); closeMobileDrawer();">कोलकाता (Kolkata)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 84, 'राजनीति'); closeMobileDrawer();">राजनीति (Politics)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 91, 'खेल जगत'); closeMobileDrawer();">खेल जगत (Sports)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 77, 'फिल्म जगत'); closeMobileDrawer();">फिल्म जगत (Entertainment)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 141, 'अर्थ जगत'); closeMobileDrawer();">अर्थ जगत (Business)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 138, 'विदेश'); closeMobileDrawer();">विदेश (World)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 81, 'ई-पेपर'); closeMobileDrawer();">ई-पेपर (E-Paper)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('about'); closeMobileDrawer();">हमारे बारे में (About Us)</a></li>
        </ul>
        <div class="ct-offcanvas-actions">
            <button class="preview-btn" onclick="toggleDarkMode()" style="width: 100%; text-align: center; padding: 10px; font-weight: 700; background: var(--color-border); color: var(--color-text-main); border: none; cursor: pointer;">
                🌓 डार्क / लाइट मोड बदलें
            </button>
            <button class="preview-btn" onclick="openSearchModal(); closeMobileDrawer();" style="width: 100%; text-align: center; padding: 10px; font-weight: 700; background: var(--color-primary-red); color: #fff; border: none; cursor: pointer;">
                🔍 समाचार खोजें (Search)
            </button>
        </div>
    </div>
</aside>

<!-- SEARCH MODAL OVERLAY -->
<div id="search-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.92); z-index:10000; align-items:center; justify-content:center;">
    <div style="width:90%; max-width:650px; padding:20px; position:relative;">
        <button onclick="closeSearchModal()" style="background:none; border:none; color:#fff; font-size:2rem; float:right; cursor:pointer;">&times;</button>
        <div style="clear:both; padding-top:20px;">
            <input type="text" id="search-input" placeholder="ख़बरें, राजनीति, खेल या विषय खोजें..." style="width:100%; padding:14px 20px; font-size:1.2rem; border-radius:4px; border:2px solid var(--color-primary-red); background:#1A1E24; color:#fff; outline:none;">
            <button onclick="alert('खोज परिणाम लोड हो रहे हैं...'); closeSearchModal();" style="margin-top:14px; padding:10px 24px; background:var(--color-primary-red); color:#fff; border:none; border-radius:4px; font-weight:700; cursor:pointer;">खोजें</button>
        </div>
    </div>
</div>

<!-- CLIENT-SIDE JAVASCRIPT ENGINE & POSTS DATA -->
<script>
    const LIVE_POSTS = ${clientDataJson};
    const POSTS_BY_ID = {};
    LIVE_POSTS.forEach(p => { POSTS_BY_ID[p.id] = p; });

    function toggleDarkMode() {
        var current = document.documentElement.getAttribute('data-theme');
        var next = (current === 'dark') ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.setAttribute('data-color-mode', next);
        localStorage.setItem('rashtrarang_theme', next);
    }

    function openMobileDrawer() {
        var overlay = document.getElementById('offcanvas-overlay');
        var drawer = document.getElementById('offcanvas-drawer');
        if (overlay) overlay.classList.add('is-active');
        if (drawer) drawer.classList.add('is-active');
    }

    function closeMobileDrawer() {
        var overlay = document.getElementById('offcanvas-overlay');
        var drawer = document.getElementById('offcanvas-drawer');
        if (overlay) overlay.classList.remove('is-active');
        if (drawer) drawer.classList.remove('is-active');
    }

    function toggleMobileDrawer() {
        var drawer = document.getElementById('offcanvas-drawer');
        if (drawer && drawer.classList.contains('is-active')) {
            closeMobileDrawer();
        } else {
            openMobileDrawer();
        }
    }

    function setUpcomingReminder(title, date) {
        alert('राष्ट्र रंग आगामी कवरेज:\\n"' + title + '"\\nप्रसारण तिथि: ' + date + '\\n\\nआपके कैलेंडर / नोटिफिकेशन में रिमाइंडर जोड़ दिया गया है!');
    }

    function showArticle(id) {
        showView('article', id);
    }

    function showCategory(id, name) {
        showView('category', id, name);
    }

    function showView(view, id, title) {
        document.getElementById('view-home').style.display = 'none';
        document.getElementById('view-popular').style.display = 'none';
        document.getElementById('view-upcoming').style.display = 'none';
        document.getElementById('view-categories').style.display = 'none';
        document.getElementById('view-article').style.display = 'none';
        document.getElementById('view-category').style.display = 'none';
        document.getElementById('view-about').style.display = 'none';

        document.querySelectorAll('.menu-main-nav li').forEach(function(li) { li.classList.remove('active'); });

        if (view === 'home') {
            document.getElementById('view-home').style.display = 'block';
            var nav = document.getElementById('nav-item-home');
            if (nav) nav.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'popular') {
            document.getElementById('view-popular').style.display = 'block';
            var nav = document.getElementById('nav-item-popular');
            if (nav) nav.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'upcoming') {
            document.getElementById('view-upcoming').style.display = 'block';
            var nav = document.getElementById('nav-item-upcoming');
            if (nav) nav.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'categories_hub') {
            document.getElementById('view-categories').style.display = 'block';
            var nav = document.getElementById('nav-item-categories');
            if (nav) nav.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'article') {
            document.getElementById('view-article').style.display = 'block';
            const post = POSTS_BY_ID[id] || LIVE_POSTS[0];
            if (post) {
                document.getElementById('article-h1').innerText = post.title;
                document.getElementById('article-hero-img').src = post.mediaUrl || 'logo.jpg';
                document.getElementById('article-hero-img').alt = post.title;
                document.getElementById('article-date-meta').innerText = post.date;
                document.getElementById('article-body').innerHTML = post.content || ('<p>' + post.excerpt + '</p>');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'category') {
            document.getElementById('view-category').style.display = 'block';
            var nav = document.getElementById('nav-item-' + id);
            if (nav) nav.classList.add('active');

            const catTitle = title || 'समाचार';
            document.getElementById('category-crumb-name').innerText = catTitle;
            document.getElementById('category-heading').innerText = catTitle + ' समाचार';

            const catId = Number(id);
            const filtered = LIVE_POSTS.filter(p => Array.isArray(p.categories) && p.categories.includes(catId));
            const displayPosts = filtered.length > 0 ? filtered : LIVE_POSTS.slice(0, 9);

            const container = document.getElementById('category-posts-container');
            container.innerHTML = displayPosts.map(p => {
                return '<article class="card-subgrid-item" style="border: 1px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--color-card-bg);">' +
                    '<div class="card-media ct-media-zoom" style="height: 180px;">' +
                        '<img src="' + p.mediaUrl + '" alt="' + p.title + '" style="width: 100%; height: 100%; object-fit: cover;">' +
                        '<span class="badge-cat" style="position:absolute; top:8px; left:8px;">' + catTitle + '</span>' +
                    '</div>' +
                    '<div class="card-body" style="padding: 16px;">' +
                        '<h3 class="card-title" style="font-size: 1.05rem; margin-bottom: 8px;">' +
                            '<a href="javascript:void(0)" onclick="showArticle(' + p.id + ')">' + p.title + '</a>' +
                        '</h3>' +
                        '<p style="font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5; margin: 8px 0;">' + p.excerpt.slice(0, 100) + '...</p>' +
                        '<span class="card-meta" style="font-size: 0.72rem; color: var(--color-text-muted);">' + p.date + '</span>' +
                    '</div>' +
                '</article>';
            }).join('');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'about') {
            document.getElementById('view-about').style.display = 'block';
            var nav = document.getElementById('nav-item-about');
            if (nav) nav.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function openSearchModal() {
        document.getElementById('search-modal').style.display = 'flex';
        setTimeout(() => document.getElementById('search-input').focus(), 100);
    }

    function closeSearchModal() {
        document.getElementById('search-modal').style.display = 'none';
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearchModal();
            closeMobileDrawer();
        }
    });

    // IntersectionObserver for reveal-on-scroll animations
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    // Popular tabs filter interaction
    document.querySelectorAll('.popular-pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.popular-pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            var grid = document.querySelector('.popular-cards-grid-4');
            if (grid) {
                grid.classList.remove('tab-content-fade');
                void grid.offsetWidth;
                grid.classList.add('tab-content-fade');
            }
        });
    });
</script>

</body>
</html>
`;

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('Successfully generated enhanced preview/index.html! File length:', html.length);
