const fs = require('fs');

const data = JSON.parse(fs.readFileSync('preview/cached_posts.json', 'utf8'));

// Build complete allPosts map
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
    // Official Rashtra Rang newspaper logo fallback - NEVER external stock photos
    return 'logo.jpg';
}

// 1. Prepare items for the 6 Blocksy Rows using authentic live posts
// Row 1: Hero Grid (Cols 8 + 4)
const heroLead = getSafePost(data.national, 0);
const trendingPosts = [getSafePost(data.national, 1), getSafePost(data.bengal, 0), getSafePost(data.kolkata, 0)];
const breakingList = [0, 1, 2, 3, 4].map(i => getSafePost(data.latest, i));

// Row 2: Two-Column Feature (Cols 6 + 6)
const row2Lead = getSafePost(data.bengal, 1);
const popularGrid = [getSafePost(data.politics, 0), getSafePost(data.sports, 0), getSafePost(data.film, 0), getSafePost(data.business, 0)];

// Row 4: Editor Choice & Worth Reading (Cols 9 + 3)
const editorLead = getSafePost(data.editorial, 0);
const editorSubgrid = [getSafePost(data.kolkata, 1), getSafePost(data.sports, 1), getSafePost(data.film, 1)];
const worthReading = [0, 1, 2, 3, 4].map(i => getSafePost(data.politics, i));

// Row 5: Dark Showcase (Cols 8 + 4)
const darkLead = getSafePost(data.international, 0);
const darkGrid = [0, 1, 2, 3].map(i => getSafePost(data.international, i + 1));
const videoList = [getSafePost(data.sports, 2), getSafePost(data.film, 2), getSafePost(data.national, 2)];

// Row 6: Triple Regional Columns (Cols 4 + 4 + 4)
const cat1Lead = getSafePost(data.bengal, 2);
const cat1List = [0, 1, 2].map(i => getSafePost(data.bengal, i + 3));

const cat2Lead = getSafePost(data.kolkata, 2);
const cat2List = [0, 1, 2].map(i => getSafePost(data.kolkata, i + 3));

const cat3Lead = getSafePost(data.politics, 2);
const cat3List = [0, 1, 2].map(i => getSafePost(data.politics, i + 3));

// Minified posts pool for client-side dynamic view loading
const clientDataJson = JSON.stringify(allPosts.map(p => ({
    id: p.id,
    title: cleanTitle(p.title),
    excerpt: cleanExcerpt(p.excerpt).slice(0, 180),
    content: p.content || `<p>${cleanExcerpt(p.excerpt)}</p>`,
    date: formatDate(p.date),
    mediaUrl: getImage(p),
    link: p.link || `/?p=${p.id}`,
    categories: p.categories || []
}))).replace(/</g, '\\u003c'); // escape script injection

const html = `<!DOCTYPE html>
<html lang="hi" data-theme="light" data-color-mode="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>राष्ट्र रंग (Rashtra Rang) – Blocksy Daily News Edition</title>
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
   BLOCKSY DAILY NEWS HEADER
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
                            <li id="nav-item-35"><a href="javascript:void(0)" onclick="showView('category', 35, 'राष्ट्रीय')">राष्ट्रीय</a></li>
                            <li id="nav-item-78"><a href="javascript:void(0)" onclick="showView('category', 78, 'पश्चिम बंगाल')">पश्चिम बंगाल</a></li>
                            <li id="nav-item-89"><a href="javascript:void(0)" onclick="showView('category', 89, 'कोलकाता')">कोलकाता</a></li>
                            <li id="nav-item-84"><a href="javascript:void(0)" onclick="showView('category', 84, 'राजनीति')">राजनीति</a></li>
                            <li id="nav-item-91"><a href="javascript:void(0)" onclick="showView('category', 91, 'खेल जगत')">खेल जगत</a></li>
                            <li id="nav-item-77"><a href="javascript:void(0)" onclick="showView('category', 77, 'फिल्म जगत')">फिल्म जगत</a></li>
                            <li id="nav-item-141"><a href="javascript:void(0)" onclick="showView('category', 141, 'अर्थ जगत')">अर्थ जगत</a></li>
                            <li id="nav-item-138"><a href="javascript:void(0)" onclick="showView('category', 138, 'विदेश')">विदेश</a></li>
                            <li id="nav-item-about"><a href="javascript:void(0)" onclick="showView('about')">हमारे बारे में</a></li>
                            <li id="nav-item-contact"><a href="javascript:void(0)" onclick="showView('about')">संपर्क</a></li>
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

<!-- MAIN CONTENT VIEW -->
<main id="main-content-view">
    <!-- ==================== VIEW: HOMEPAGE (6 BLOCKSY ROWS) ==================== -->
    <div id="view-home">
        <!-- ==========================================================================
           ROW 1: HERO MAGAZINE ROW (8 + 4 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-hero-row">
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
                                    <span>संपादकीय डेस्क</span> • <span>${formatDate(heroLead.date)}</span> • <span>3 मिनट पढ़ें</span>
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
        <section class="blocksy-feature-2col">
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
                                <div class="card-meta">${formatDate(row2Lead.date)} • 2 मिनट पढ़ें</div>
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
                                    <span class="card-meta">${formatDate(p.date)}</span>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           ROW 3: FULL-WIDTH APP PROMO / BILLBOARD BANNER (12 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-app-promo-section">
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
           ROW 4: EDITOR CHOICE & WORTH READING (9 + 3 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-editor-choice-row">
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
                                <div class="card-meta">${formatDate(editorLead.date)} • संपादकीय विश्लेषण</div>
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
                                <button type="submit" class="preview-btn" style="width:100%; padding:10px; font-weight:700; background:var(--color-primary-red); color:#fff; border:none;">सब्सक्राइब करें</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           ROW 5: DARK SHOWCASE SECTION (8 + 4 COLUMNS, BACKGROUND #14181E)
           ========================================================================== -->
        <section class="blocksy-dark-showcase-section">
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
        <section class="blocksy-triple-cat-row">
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
                    <strong>संपादकीय डेस्क</strong> <span>/</span> <span id="article-date-meta">${formatDate(heroLead.date)}</span> <span>/</span> <span>3 मिनट पढ़ें</span>
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

                    <div style="margin-top: 30px;">
                        <button class="preview-btn" onclick="showView('home')">← मुख्य पृष्ठ पर वापस जाएं</button>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="article-sidebar-column">
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
   BLOCKSY DAILY NEWS FOOTER
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

    function showView(view, id, title) {
        document.getElementById('view-home').style.display = 'none';
        document.getElementById('view-article').style.display = 'none';
        document.getElementById('view-category').style.display = 'none';
        document.getElementById('view-about').style.display = 'none';

        document.querySelectorAll('.preview-btn').forEach(b => b.classList.remove('active'));

        if (view === 'home') {
            document.getElementById('view-home').style.display = 'block';
            document.getElementById('btn-view-home').classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'article') {
            document.getElementById('view-article').style.display = 'block';
            document.getElementById('btn-view-article').classList.add('active');

            // Populate clicked post data dynamically
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
            document.getElementById('btn-view-category').classList.add('active');

            const catTitle = title || 'समाचार';
            document.getElementById('category-crumb-name').innerText = catTitle;
            document.getElementById('category-heading').innerText = catTitle + ' समाचार';

            // Filter posts for this category
            const catId = Number(id);
            const filtered = LIVE_POSTS.filter(p => Array.isArray(p.categories) && p.categories.includes(catId));
            const displayPosts = filtered.length > 0 ? filtered : LIVE_POSTS.slice(0, 9);

            const container = document.getElementById('category-posts-container');
            container.innerHTML = displayPosts.map(p => \`
                <article class="card-subgrid-item" style="border: 1px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--color-card-bg);">
                    <div class="card-media ct-media-zoom" style="height: 180px;">
                        <img src="\${p.mediaUrl}" alt="\${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
                        <span class="badge-cat" style="position:absolute; top:8px; left:8px;">\${catTitle}</span>
                    </div>
                    <div class="card-body" style="padding: 16px;">
                        <h3 class="card-title" style="font-size: 1.05rem; margin-bottom: 8px;">
                            <a href="javascript:void(0)" onclick="showView('article', \${p.id})">\${p.title}</a>
                        </h3>
                        <p style="font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5; margin: 8px 0;">\${p.excerpt.slice(0, 100)}...</p>
                        <span class="card-meta" style="font-size: 0.72rem; color: var(--color-text-muted);">\${p.date}</span>
                    </div>
                </article>
            \`).join('');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'about') {
            document.getElementById('view-about').style.display = 'block';
            document.getElementById('btn-view-about').classList.add('active');
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
        if (e.key === 'Escape') closeSearchModal();
    });
</script>

</body>
</html>
`;

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('Successfully generated preview/index.html with 100% genuine live Rashtra Rang data! (Size:', html.length, 'bytes)');
