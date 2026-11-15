const fs = require('fs');

const data = JSON.parse(fs.readFileSync('preview/cached_posts.json', 'utf8'));

// Pool all posts
const allPosts = [
    ...(data.latest || []),
    ...(data.national || []),
    ...(data.bengal || []),
    ...(data.kolkata || []),
    ...(data.politics || []),
    ...(data.sports || []),
    ...(data.film || []),
    ...(data.business || []),
    ...(data.international || []),
    ...(data.society || []),
    ...(data.health || []),
    ...(data.religion || []),
    ...(data.editorial || [])
];

function getSafePost(primaryArr, idx) {
    if (primaryArr && primaryArr[idx]) return primaryArr[idx];
    return allPosts[(idx * 7) % allPosts.length] || {
        id: 2522,
        title: { rendered: 'राष्ट्र रंग दैनिक हिंदी समाचार' },
        excerpt: { rendered: 'सटीक, निर्भीक और निष्पक्ष डिजिटल पत्रकारिता।' },
        date: '2026-11-15T12:00:00'
    };
}

function cleanTitle(t) {
    if (!t) return '';
    return t.replace(/<[^>]+>/g, '').replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&amp;/g, '&').trim();
}

function formatDate(dStr) {
    if (!dStr) return '15 नवम्बर 2026';
    const d = new Date(dStr);
    const months = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

const fallbackImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80',
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
];

function getImage(post, idx = 0) {
    if (post && post.featured_media_url) return post.featured_media_url;
    return fallbackImages[idx % fallbackImages.length];
}

// Prepare 6 Section items
// Row 1
const heroLead = getSafePost(data.national, 0);
const trendingPosts = [getSafePost(data.national, 1), getSafePost(data.bengal, 0), getSafePost(data.kolkata, 0)];
const breakingList = [0, 1, 2, 3, 4].map(i => getSafePost(data.latest, i));

// Row 2
const row2Lead = getSafePost(data.bengal, 1);
const popularGrid = [getSafePost(data.politics, 0), getSafePost(data.sports, 0), getSafePost(data.film, 0), getSafePost(data.business, 0)];

// Row 4
const editorLead = getSafePost(data.editorial, 0);
const editorSubgrid = [getSafePost(data.kolkata, 1), getSafePost(data.sports, 1), getSafePost(data.film, 1)];
const worthReading = [0, 1, 2, 3, 4].map(i => getSafePost(data.politics, i));

// Row 5
const darkLead = getSafePost(data.international, 0);
const darkGrid = [0, 1, 2, 3].map(i => getSafePost(data.international, i + 1));
const videoList = [getSafePost(data.sports, 2), getSafePost(data.film, 2), getSafePost(data.national, 2)];

// Row 6
const cat1Lead = getSafePost(data.bengal, 2);
const cat1List = [0, 1, 2].map(i => getSafePost(data.bengal, i + 1));

const cat2Lead = getSafePost(data.kolkata, 2);
const cat2List = [0, 1, 2].map(i => getSafePost(data.kolkata, i + 1));

const cat3Lead = getSafePost(data.politics, 2);
const cat3List = [0, 1, 2].map(i => getSafePost(data.politics, i + 1));

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

<!-- MAIN HOMEPAGE CONTENT -->
<main id="main-content-view">
    <!-- VIEW: HOMEPAGE (6 BLOCKSY ROWS) -->
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
                                <img src="${getImage(heroLead, 0)}" alt="${cleanTitle(heroLead.title.rendered)}">
                                <span class="hero-badge">ख़ास खबर (HOT POST)</span>
                            </div>
                            <div class="hero-lead-body">
                                <h2 class="hero-lead-title">
                                    <a href="javascript:void(0)" onclick="showView('article', ${heroLead.id})">${cleanTitle(heroLead.title.rendered)}</a>
                                </h2>
                                <p class="hero-lead-excerpt">${cleanTitle(heroLead.excerpt ? heroLead.excerpt.rendered : '').slice(0, 150)}...</p>
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
                                        <img src="${getImage(p, idx + 1)}" alt="${cleanTitle(p.title.rendered)}">
                                    </div>
                                    <div class="card-body">
                                        <span class="badge-cat">ट्रेंडिंग</span>
                                        <h3 class="card-title">
                                            <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
                                        </h3>
                                        <span class="card-meta" style="font-size:0.72rem; color:var(--color-text-muted);">${formatDate(p.date)}</span>
                                    </div>
                                </article>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Col 4: Breaking News Vertical Stack -->
                    <div class="col-4">
                        <div class="breaking-news-box">
                            <div class="block-heading-row">
                                <h4 class="block-title">ब्रेकिंग न्यूज़ (Breaking News)</h4>
                            </div>
                            <div class="breaking-news-list">
                                ${breakingList.map((p, idx) => `
                                <article class="breaking-item-card">
                                    <div class="breaking-item-thumb ct-media-zoom">
                                        <img src="${getImage(p, idx + 2)}" alt="${cleanTitle(p.title.rendered)}">
                                    </div>
                                    <div class="breaking-item-content">
                                        <span class="item-cat">ताज़ा</span>
                                        <h3 class="item-title">
                                            <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
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
                                <img src="${getImage(row2Lead, 3)}" alt="${cleanTitle(row2Lead.title.rendered)}">
                                <span class="badge-cat" style="position:absolute; top:12px; left:12px;">पश्चिम बंगाल</span>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">
                                    <a href="javascript:void(0)" onclick="showView('article', ${row2Lead.id})">${cleanTitle(row2Lead.title.rendered)}</a>
                                </h2>
                                <p class="card-excerpt">${cleanTitle(row2Lead.excerpt ? row2Lead.excerpt.rendered : '').slice(0, 140)}...</p>
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
                                    <img src="${getImage(p, idx + 4)}" alt="${cleanTitle(p.title.rendered)}">
                                    <span class="badge-cat" style="position:absolute; top:8px; left:8px;">लोकप्रिय</span>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
                                    </h3>
                                    <div class="card-meta">${formatDate(p.date)}</div>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           ROW 3: APP PROMO / BILLBOARD BANNER (12 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-app-promo-section">
            <div class="ct-container">
                <div class="app-promo-card">
                    <div class="app-promo-content">
                        <h3 class="app-promo-title">राष्ट्र रंग मोबाइल ऐप डाउनलोड करें</h3>
                        <p class="app-promo-desc">पश्चिम बंगाल, राष्ट्रीय और अंतरराष्ट्रीय राजनीति की हर ताज़ा ख़बर सीधे अपने स्मार्टफोन पर तुरंत और बिना रुकावट पढ़ें।</p>
                        <div class="app-store-badges">
                            <a href="#" class="store-badge-btn google-play">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.35 0 .68.12.94.33l13.5 8.5c.63.4.63 1.33 0 1.73l-13.5 8.5c-.26.21-.59.34-.94.34-.83 0-1.5-.67-1.5-1.5z"/></svg>
                                Google Play पर पाएं
                            </a>
                            <a href="#" class="store-badge-btn app-store">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.64-.78 1.08-1.86.96-2.95-1 .04-2.12.67-2.77 1.44-.57.66-.99 1.77-.85 2.81 1.12.09 2.02-.52 2.66-1.3z"/></svg>
                                App Store से डाउनलोड करें
                            </a>
                        </div>
                    </div>
                    <div class="app-promo-visual">
                        <div class="phone-mockup">
                            <div class="phone-header">राष्ट्र रंग</div>
                            <p style="font-size:0.75rem; color:#aaa; margin-top:8px;">सटीक • निर्भीक • निष्पक्ष</p>
                            <span class="badge-cat" style="margin-top:10px;">लाइव 24×7</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           ROW 4: EDITOR CHOICE & WORTH READING (9 + 3 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-editor-choice-section">
            <div class="ct-container">
                <div class="blocksy-row-9-3">
                    <!-- Col 9: Editor Choice (1 Horizontal Lead + 3-Grid below) -->
                    <div class="col-9">
                        <div class="block-heading-row">
                            <h4 class="block-title">संपादकीय पसंद (Editor Choice)</h4>
                        </div>
                        <article class="card-horizontal-lead">
                            <div class="card-media ct-media-zoom">
                                <img src="${getImage(editorLead, 5)}" alt="${cleanTitle(editorLead.title.rendered)}">
                                <span class="badge-cat" style="position:absolute; top:12px; left:12px;">विशेष आलेख</span>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">
                                    <a href="javascript:void(0)" onclick="showView('article', ${editorLead.id})">${cleanTitle(editorLead.title.rendered)}</a>
                                </h2>
                                <p class="card-excerpt">${cleanTitle(editorLead.excerpt ? editorLead.excerpt.rendered : '').slice(0, 160)}...</p>
                                <div class="card-meta">संपादकीय आलेख • ${formatDate(editorLead.date)}</div>
                            </div>
                        </article>

                        <!-- 3-Card Subgrid -->
                        <div class="editor-subgrid-3">
                            ${editorSubgrid.map((p, idx) => `
                            <article class="card-subgrid-item">
                                <div class="card-media ct-media-zoom">
                                    <img src="${getImage(p, idx + 6)}" alt="${cleanTitle(p.title.rendered)}">
                                    <span class="badge-cat" style="position:absolute; top:8px; left:8px;">चयन</span>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
                                    </h3>
                                    <div class="card-meta" style="font-size:0.72rem; color:var(--color-text-muted);">${formatDate(p.date)}</div>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Col 3: Worth Reading + Newsletter Card -->
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
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
                                    </h3>
                                </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Newsletter Card -->
                        <div class="newsletter-subscribe-card" id="subscribe">
                            <h3 class="newsletter-title">दैनिक समाचार पत्र सदस्यता</h3>
                            <p class="newsletter-text">दिन की सबसे महत्वपूर्ण ख़बरों का निष्पक्ष विश्लेषण सीधे अपने इनबॉक्स में पाएं।</p>
                            <form class="newsletter-form" onsubmit="event.preventDefault(); alert('धन्यवाद! आप राष्ट्र रंग न्यूज़लेटर से जुड़ चुके हैं।');">
                                <input type="email" placeholder="आपका ईमेल पता..." required>
                                <button type="submit" class="btn-subscribe">सदस्यता लें</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==========================================================================
           ROW 5: DARK VIDEO & CATEGORY SHOWCASE (8 + 4 COLUMNS)
           ========================================================================== -->
        <section class="blocksy-dark-showcase-section">
            <div class="ct-container">
                <div class="blocksy-row-8-4">
                    <!-- Col 8: Lead Dark Story + 2x2 World Grid -->
                    <div class="col-8">
                        <article class="dark-lead-card">
                            <div class="dark-media ct-media-zoom">
                                <img src="${getImage(darkLead, 7)}" alt="${cleanTitle(darkLead.title.rendered)}">
                                <span class="badge-cat" style="position:absolute; top:14px; left:14px;">अंतर्राष्ट्रीय</span>
                            </div>
                            <div class="dark-body">
                                <h2 class="dark-title">
                                    <a href="javascript:void(0)" onclick="showView('article', ${darkLead.id})">${cleanTitle(darkLead.title.rendered)}</a>
                                </h2>
                                <p class="dark-excerpt">${cleanTitle(darkLead.excerpt ? darkLead.excerpt.rendered : '').slice(0, 150)}...</p>
                                <div class="dark-meta" style="font-size:0.75rem; color:#aaa;">${formatDate(darkLead.date)}</div>
                            </div>
                        </article>

                        <div class="block-heading-row dark-heading">
                            <h4 class="block-title">विश्व मंच से और अधिक (MORE FROM WORLD CATEGORY)</h4>
                        </div>
                        <div class="dark-grid-2x2">
                            ${darkGrid.map((p, idx) => `
                            <article class="card-dark-item">
                                <div class="card-media ct-media-zoom">
                                    <img src="${getImage(p, idx + 8)}" alt="${cleanTitle(p.title.rendered)}">
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
                                    </h3>
                                    <span style="font-size:0.7rem; color:#888;">${formatDate(p.date)}</span>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Col 4: Hot Videos with Play Icons -->
                    <div class="col-4">
                        <div class="hot-videos-box">
                            <div class="block-heading-row dark-heading">
                                <h4 class="block-title">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                                    वीडियो समाचार (Hot Videos)
                                </h4>
                            </div>
                            <div class="hot-videos-list">
                                ${videoList.map((p, idx) => `
                                <article class="video-card-item">
                                    <div class="video-thumb-wrap ct-media-zoom">
                                        <img src="${getImage(p, idx + 10)}" alt="${cleanTitle(p.title.rendered)}">
                                        <div class="video-play-icon">▶</div>
                                    </div>
                                    <h3 class="video-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
                                    </h3>
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
        <section class="blocksy-triple-cat-section">
            <div class="ct-container">
                <div class="blocksy-row-4-4-4">
                    <!-- Column 1: West Bengal -->
                    <div class="triple-cat-column">
                        <div class="block-heading-row">
                            <h4 class="block-title">पश्चिम बंगाल (West Bengal)</h4>
                        </div>
                        <article class="cat-featured-card">
                            <div class="card-media ct-media-zoom">
                                <img src="${getImage(cat1Lead, 12)}" alt="${cleanTitle(cat1Lead.title.rendered)}">
                                <span class="badge-cat" style="position:absolute; top:8px; left:8px;">राज्य</span>
                            </div>
                            <h3 class="card-title">
                                <a href="javascript:void(0)" onclick="showView('article', ${cat1Lead.id})">${cleanTitle(cat1Lead.title.rendered)}</a>
                            </h3>
                            <p class="card-excerpt">${cleanTitle(cat1Lead.excerpt ? cat1Lead.excerpt.rendered : '').slice(0, 110)}...</p>
                        </article>
                        <div class="cat-list-items">
                            ${cat1List.map((p, idx) => `
                            <article class="cat-list-item">
                                <div class="cat-list-thumb ct-media-zoom">
                                    <img src="${getImage(p, idx + 13)}" alt="${cleanTitle(p.title.rendered)}">
                                </div>
                                <div class="cat-list-content">
                                    <h4 class="item-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
                                    </h4>
                                    <span class="item-date">${formatDate(p.date)}</span>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Column 2: Kolkata -->
                    <div class="triple-cat-column">
                        <div class="block-heading-row">
                            <h4 class="block-title">कोलकाता (Kolkata Metro)</h4>
                        </div>
                        <article class="cat-featured-card">
                            <div class="card-media ct-media-zoom">
                                <img src="${getImage(cat2Lead, 15)}" alt="${cleanTitle(cat2Lead.title.rendered)}">
                                <span class="badge-cat" style="position:absolute; top:8px; left:8px;">महानगर</span>
                            </div>
                            <h3 class="card-title">
                                <a href="javascript:void(0)" onclick="showView('article', ${cat2Lead.id})">${cleanTitle(cat2Lead.title.rendered)}</a>
                            </h3>
                            <p class="card-excerpt">${cleanTitle(cat2Lead.excerpt ? cat2Lead.excerpt.rendered : '').slice(0, 110)}...</p>
                        </article>
                        <div class="cat-list-items">
                            ${cat2List.map((p, idx) => `
                            <article class="cat-list-item">
                                <div class="cat-list-thumb ct-media-zoom">
                                    <img src="${getImage(p, idx + 16)}" alt="${cleanTitle(p.title.rendered)}">
                                </div>
                                <div class="cat-list-content">
                                    <h4 class="item-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
                                    </h4>
                                    <span class="item-date">${formatDate(p.date)}</span>
                                </div>
                            </article>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Column 3: Politics -->
                    <div class="triple-cat-column">
                        <div class="block-heading-row">
                            <h4 class="block-title">राजनीति एवं शासन (Politics)</h4>
                        </div>
                        <article class="cat-featured-card">
                            <div class="card-media ct-media-zoom">
                                <img src="${getImage(cat3Lead, 18)}" alt="${cleanTitle(cat3Lead.title.rendered)}">
                                <span class="badge-cat" style="position:absolute; top:8px; left:8px;">राजनीति</span>
                            </div>
                            <h3 class="card-title">
                                <a href="javascript:void(0)" onclick="showView('article', ${cat3Lead.id})">${cleanTitle(cat3Lead.title.rendered)}</a>
                            </h3>
                            <p class="card-excerpt">${cleanTitle(cat3Lead.excerpt ? cat3Lead.excerpt.rendered : '').slice(0, 110)}...</p>
                        </article>
                        <div class="cat-list-items">
                            ${cat3List.map((p, idx) => `
                            <article class="cat-list-item">
                                <div class="cat-list-thumb ct-media-zoom">
                                    <img src="${getImage(p, idx + 19)}" alt="${cleanTitle(p.title.rendered)}">
                                </div>
                                <div class="cat-list-content">
                                    <h4 class="item-title">
                                        <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
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

    <!-- VIEW: SINGLE ARTICLE (?p=2522) -->
    <div id="view-article" style="display:none;">
        <div class="ct-container article-reading-view">
            <header class="article-header">
                <div class="article-meta-slashes">
                    <span>होम</span> / <span>राष्ट्रीय</span> / <span>आर्टिकल</span>
                </div>
                <h1 class="article-title-h1" id="article-h1">${cleanTitle(data.post2522 ? data.post2522.title.rendered : 'असम-बंगाल सीमा पर 300 ट्रक फंसे; केंद्र से दखल देने की मांग')}</h1>
                <div class="article-meta-slashes">
                    <strong>संपादकीय डेस्क</strong> <span>/</span> <span>15 नवम्बर 2026</span> <span>/</span> <span>3 मिनट पढ़ें</span>
                </div>
            </header>

            <div class="article-two-col-layout">
                <div class="article-content-column">
                    <div class="article-featured-image ct-media-zoom">
                        <img src="${(data.media2523 && data.media2523.source_url) ? data.media2523.source_url : getImage(heroLead, 0)}" alt="Featured article image">
                    </div>
                    <div class="article-content-body" id="article-body">
                        ${data.post2522 ? data.post2522.content.rendered : '<p>असम और पश्चिम बंगाल सीमा पर करीब 300 ट्रकों के फंसे होने के मामले में केंद्र सरकार से तत्काल हस्तक्षेप की मांग की गई है। आवश्यक वस्तुओं और कच्चे माल से लदे ये ट्रक पिछले कई दिनों से अंतर्राज्यीय सीमा पर अटके हुए हैं।</p><p>व्यापारिक संगठनों ने बताया कि प्रशासनिक औपचारिकताओं और विशेष जांच के कारण वाहनों की लंबी कतार लग गई है, जिससे आपूर्ति श्रृंखला बुरी तरह प्रभावित हो रही है।</p>'}
                    </div>

                    <!-- Blocksy Share Box -->
                    <div class="article-share-box">
                        <strong>साझा करें:</strong>
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
                                    <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
                                </h3>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- VIEW: CATEGORY ARCHIVE (?cat=89) -->
    <div id="view-category" style="display:none;">
        <div class="ct-container" style="padding: 30px 20px;">
            <div class="block-heading-row" style="margin-bottom: 25px;">
                <h1 class="block-title" id="category-heading" style="font-size: 1.8rem; font-family: var(--font-editorial);">कोलकाता समाचार</h1>
            </div>
            <div class="editor-subgrid-3" id="category-grid" style="grid-template-columns: repeat(3, 1fr);">
                ${(data.kolkata || []).slice(0, 9).map((p, idx) => `
                <article class="card-subgrid-item">
                    <div class="card-media ct-media-zoom">
                        <img src="${getImage(p, idx)}" alt="${cleanTitle(p.title.rendered)}">
                        <span class="badge-cat" style="position:absolute; top:8px; left:8px;">कोलकाता</span>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">
                            <a href="javascript:void(0)" onclick="showView('article', ${p.id})">${cleanTitle(p.title.rendered)}</a>
                        </h3>
                        <p style="font-size:0.8rem; color:var(--color-text-muted); margin:6px 0;">${cleanTitle(p.excerpt ? p.excerpt.rendered : '').slice(0, 90)}...</p>
                        <span class="card-meta" style="font-size:0.72rem; color:var(--color-text-muted);">${formatDate(p.date)}</span>
                    </div>
                </article>
                `).join('')}
            </div>
            <div style="margin-top: 30px; text-align: center;">
                <button class="preview-btn" onclick="showView('home')">← मुख्य पृष्ठ पर वापस जाएं</button>
            </div>
        </div>
    </div>

    <!-- VIEW: ABOUT US -->
    <div id="view-about" style="display:none;">
        <div class="ct-container" style="padding: 40px 20px; max-width: 860px;">
            <h1 style="font-family: var(--font-editorial); font-size: 2.2rem; font-weight: 800; margin-bottom: 20px; color: var(--color-primary-red);">हमारे बारे में (About Rashtra Rang)</h1>
            <div class="article-content-body">
                <p><strong>राष्ट्र रंग (Rashtra Rang)</strong> भारत का एक प्रतिष्ठित दैनिक हिंदी समाचार पत्र एवं डिजिटल न्यूज़ पोर्टल है। हमारा प्रधान कार्यालय कोलकाता, पश्चिम बंगाल में स्थित है। हम राष्ट्रीय, राज्य (पश्चिम बंगाल), महानगर कोलकाता, राजनीति, खेल, सिनेमा, व्यापार एवं अंतरराष्ट्रीय मामलों पर निष्पक्ष, निर्भीक और सटीक पत्रकारिता प्रदान करते हैं।</p>
                <h3 style="font-family: var(--font-editorial); margin: 25px 0 10px 0;">संपादकीय स्वतंत्रता एवं आचार संहिता</h3>
                <p>राष्ट्र रंग भारतीय प्रेस परिषद (PCI) के पत्रकारिता आचार संहिता के सिद्धांतों और सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021 का अक्षरशः अनुपालन करता है।</p>
                <div style="background-color: var(--color-card-bg); border: 1px solid var(--color-border); padding: 20px; border-radius: 4px; margin: 25px 0;">
                    <h4 style="color: var(--color-primary-red); margin-bottom: 8px;">शिकायत निवारण अधिकारी (Grievance Redressal Officer)</h4>
                    <p style="margin: 0;"><strong>अधिकारी का नाम:</strong> संतोष तिवारी<br><strong>पद:</strong> वरिष्ठ संपादकीय सलाहकार एवं शिकायत अधिकारी<br><strong>ईमेल:</strong> editor@rashtrarang.com<br><strong>पता:</strong> प्रधान कार्यालय, कोलकाता, पश्चिम बंगाल - 700001</p>
                </div>
                <button class="preview-btn" onclick="showView('home')">← मुख्य पृष्ठ पर वापस जाएं</button>
            </div>
        </div>
    </div>
</main>

<!-- ==========================================================================
   BLOCKSY FOOTER (BLACK 4-COLUMN FOOTER)
   ========================================================================== -->
<footer id="footer" class="ct-footer">
    <div class="footer-top-row">
        <div class="ct-container footer-grid-4">
            <!-- Col 1: Office info & Social icons -->
            <div class="footer-col">
                <h6>राष्ट्र रंग कार्यालय</h6>
                <p><strong>प्रकाशन समय:</strong> सोमवार - रविवार: 24×7 डिजिटल न्यूज़ डेस्क<br><strong>प्रधान कार्यालय:</strong> कोलकाता, पश्चिम बंगाल</p>
                <div class="footer-social-icons">
                    <a href="#" class="social-icon-box" aria-label="Facebook">FB</a>
                    <a href="#" class="social-icon-box" aria-label="X">X</a>
                    <a href="#" class="social-icon-box" aria-label="Instagram">IG</a>
                    <a href="#" class="social-icon-box" aria-label="YouTube">YT</a>
                    <a href="#" class="social-icon-box" aria-label="Telegram">TG</a>
                </div>
            </div>

            <!-- Col 2: Categories -->
            <div class="footer-col">
                <h6>प्रमुख श्रेणियां</h6>
                <ul class="footer-links">
                    <li><a href="javascript:void(0)" onclick="showView('category', 35, 'राष्ट्रीय')">राष्ट्रीय समाचार</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 78, 'पश्चिम बंगाल')">पश्चिम बंगाल</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 89, 'कोलकाता')">कोलकाता महानगर</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 84, 'राजनीति')">राजनीति एवं शासन</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 91, 'खेल जगत')">खेल जगत</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 77, 'फिल्म जगत')">फिल्म जगत</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 141, 'अर्थ जगत')">कारोबार एवं व्यापार</a></li>
                </ul>
            </div>

            <!-- Col 3: Information Links -->
            <div class="footer-col">
                <h6>महत्वपूर्ण जानकारी</h6>
                <ul class="footer-links">
                    <li><a href="#">गोपनीयता नीति (Privacy Policy)</a></li>
                    <li><a href="#">नियम एवं शर्तें (Terms & Conditions)</a></li>
                    <li><a href="#">साइटमैप (Sitemap)</a></li>
                    <li><a href="#">डिजिटल मीडिया आचार संहिता</a></li>
                    <li><a href="#">शिकायत निवारण (Grievance Officer)</a></li>
                </ul>
            </div>

            <!-- Col 4: Company Links -->
            <div class="footer-col">
                <h6>संस्थान एवं संपर्क</h6>
                <ul class="footer-links">
                    <li><a href="javascript:void(0)" onclick="showView('about')">हमारे बारे में (About Us)</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('about')">संपर्क करें (Contact Us)</a></li>
                    <li><a href="#">संपादकीय मंडल (Editorial Board)</a></li>
                    <li><a href="#">विज्ञापन दरें (Advertise)</a></li>
                    <li><a href="javascript:void(0)" onclick="showView('category', 81, 'ई-पेपर')">ई-पेपर (E-Paper)</a></li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Middle Row: Centered Brand Logo & Tagline -->
    <div class="footer-middle-row">
        <div class="ct-container text-center">
            <div class="footer-logo">
                <span class="logo-title">राष्ट्र रंग</span>
                <span class="logo-sub">RASHTRA RANG</span>
            </div>
            <p class="footer-tagline">दैनिक हिंदी समाचार पत्र एवं डिजिटल न्यूज़ पोर्टल | निष्पक्ष, निर्भीक, सटीक</p>
        </div>
    </div>

    <!-- Bottom Row: Copyright Notice -->
    <div class="footer-bottom-row">
        <div class="ct-container">
            <p>© 2026 राष्ट्र रंग (Rashtra Rang). सर्वाधिकार सुरक्षित। सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021 का पूर्ण अनुपालन।</p>
        </div>
    </div>
</footer>

<!-- SEARCH MODAL OVERLAY -->
<div id="search-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.92); z-index:10000; align-items:center; justify-content:center;">
    <div style="width:90%; max-width:600px; text-align:center;">
        <button onclick="closeSearchModal()" style="background:none; border:none; color:#fff; font-size:2rem; float:right; cursor:pointer;">&times;</button>
        <div style="clear:both; margin-top:20px;">
            <input type="text" id="search-input" placeholder="ख़बरें, राजनीति, खेल या विषय खोजें..." style="width:100%; padding:14px 20px; font-size:1.2rem; border-radius:4px; border:2px solid var(--color-primary-red); background:#1A1E24; color:#fff; outline:none;">
            <button onclick="alert('खोज परिणाम लोड हो रहे हैं...'); closeSearchModal();" style="margin-top:14px; padding:10px 24px; background:var(--color-primary-red); color:#fff; border:none; border-radius:4px; font-weight:700; cursor:pointer;">खोजें</button>
        </div>
    </div>
</div>

<!-- JAVASCRIPT LOGIC -->
<script>
    function toggleDarkMode() {
        var current = document.documentElement.getAttribute('data-theme');
        var next = (current === 'dark') ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.setAttribute('data-color-mode', next);
        localStorage.setItem('rashtrarang_theme', next);
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'category') {
            document.getElementById('view-category').style.display = 'block';
            document.getElementById('btn-view-category').classList.add('active');
            if (title) document.getElementById('category-heading').innerText = title + ' समाचार';
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

    function toggleMobileDrawer() {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var choice = confirm("मेनू विकल्प:\\n1. मुख्य पृष्ठ पर जाएं\\n2. " + (isDark ? 'लाइट' : 'डार्क') + " मोड बदलें\\n\\nक्या आप थीम बदलना चाहते हैं?");
        if (choice) {
            toggleDarkMode();
        }
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeSearchModal();
    });
</script>

</body>
</html>
`;

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('Successfully generated preview/index.html (length:', html.length, ')');
