# राष्ट्र रंग (Rashtra Rang) – Digital News Publication

**Official Website:** [https://www.rashtrarang.com/](https://www.rashtrarang.com/)  
**Tagline:** निष्पक्ष, निर्भीक, सटीक (Fair, Fearless, Accurate)  
**Design Standard:** Blocksy Daily News Editorial Architecture  
**Primary Accent:** Editorial Deep Red (`#B51F2B`)  
**Typography:** Martel (Headlines) & Noto Sans Devanagari (Body Copy & Navigation)  

---

## 📖 Overview

Rashtra Rang is a digital news publication and editorial portal built for Indian readers in Hindi. It replicates the Blocksy Daily News starter website layout while maintaining 100% integration with the authentic Rashtra Rang WordPress CMS database (595 published posts, 13 editorial categories, and original photo uploads).

---

## 🚀 Key Features & Enhancements

### 1. Blocksy Daily News 6-Row Layout
* **Row 1:** Hero Magazine Grid (Cols 8 + 4) featuring Dominant Lead Story, Hot Post badge, 3-Card Trending Subgrid, and 5 Breaking News items with 1:1 thumbnails.
* **Row 2:** Dual Feature Row (Cols 6 + 6) with Portrait Featured Card and 2x2 Category Grid.
* **Row 3:** Full-Width Mobile Application Promo Banner.
* **Row 4:** Editorial Choice (Cols 9 + 3) with Numbered "ज़रूर पढ़ें" Reading List and Newsletter Subscription.
* **Row 5:** Dark Showcase Section (`#14181E`) with World News and Video Play Overlay Cards.
* **Row 6:** Triple Regional Columns (पश्चिम बंगाल, कोलकाता, राजनीति एवं शासन).
* **Footer:** 4-Column Widget Grid, brand masthead, and India IT Rules 2021 Grievance Officer disclosures.

### 2. Popular News System (सर्वाधिक पढ़े गए समाचार)
* Automatic view tracking via `rashtrarang_track_post_views()` and post meta `rashtrarang_post_views_count`.
* Formatted view count badges (e.g. `2.4K+ पाठक`) and ranking badges (`01`, `02`, `03`...).
* Instant category filter tabs without page reloads.
* Dedicated template: `page-popular.php`.

### 3. Upcoming News Coverage (आगामी कवरेज)
* WordPress Custom Post Type: `rashtrarang_upcoming`.
* Admin dashboard meta fields: Event Date, Time, Venue/City, Target Category, and Auto-Publish toggle.
* Visual presentation with live red pulse dot indicator (`@keyframes pulse-dot`).
* Interactive **'रिमाइंडर सेट करें'** button with calendar download and browser notification confirmations.
* Dedicated archive template: `archive-rashtrarang_upcoming.php`.

### 4. Categories Directory Hub (सभी श्रेणियां एवं विषय सूची)
* Comprehensive directory showcasing all 13 verified categories:
  * राष्ट्रीय | पश्चिम बंगाल | कोलकाता | उत्तर प्रदेश / राजनीति | सोसाईटी | धर्म-अध्यात्म | संपादकीय | अर्थ जगत | स्वास्थ्य | अंतर्राष्ट्रीय | खेल जगत | ई-पेपर | फिल्म जगत.
* Live post counter badges (e.g. `182 लेख`), thumbnails, and latest story preview.
* Quick-jump horizontal scrolling pill bar for mobile and desktop.

### 5. Enterprise Advertisement Management System
* **8 Dedicated Ad Slots:**
  1. Header Leaderboard (`728x90` / `320x50`)
  2. Mid-Page Billboard (`970x250` between Rows 2 & 3)
  3. Mid-Page Banner (`728x90` between Rows 4 & 5)
  4. Sidebar Top Medium Rectangle (`300x250`)
  5. Sidebar Sticky Half-Page (`300x600`)
  6. In-Article Inline Banner (injected after 3rd/4th paragraph)
  7. Below-Article Matched Content Slot
  8. Pre-Footer Leaderboard (`728x90`)
* **WordPress Ad Manager CPT:** `rashtrarang_ad` for scheduling campaigns, setting start/end dates, upload banner artwork, and track impressions and clicks.
* **Google AdSense Ready:** Fixed aspect-ratio containers preventing Cumulative Layout Shift (CLS) with official *"ADVERTISEMENT / विज्ञापन"* labels.
* **Realistic Demo Ads:** Built-in preview creatives representing Banking (SBI), Shopping (Flipkart), Travel (MakeMyTrip), Education (Allen), Jewellery (Senco Gold), Health Insurance (HDFC Life), Culture (Bengal Handloom Expo), and Clean Tech (Tata Solar).

### 6. Clean Navigation & Centerline Alignment
* Zero emojis in navigation labels.
* Perfect vertical centerline alignment across Search button, all 12 navigation links, and the E-Paper pill (`0.000px` variance).
* Flush 3px red active underline indicator along the bottom edge of the 52px navbar.
* Smooth responsive stacking on mobile with offcanvas drawer navigation.

---

## 📦 Theme Installation & WordPress Setup

1. Locate the production theme zip file: `rashtrarang-modern.zip`.
2. In your WordPress Dashboard (`wp-admin`), navigate to **Appearance → Themes → Add New Theme → Upload Theme**.
3. Select `rashtrarang-modern.zip` and click **Install Now**.
4. Click **Activate**.
5. To configure Google AdSense or advertisements:
   * Visit **Appearance → Customize → Rashtra Rang: विज्ञापन प्रबंधन**.
   * Manage individual campaigns via the **विज्ञापन प्रबंधन (Ads)** menu in the WordPress dashboard.

---

## 💻 Local Development & Preview

To run the local preview testbed:

```bash
# Start local Node.js server
node server.js
```

Open `http://127.0.0.1:8085/` in your browser.

---

## 📄 License & Attribution

* **Publisher:** Rashtra Rang Digital Media.
* **Content:** All news articles, media uploads, and brand assets are intellectual property of Rashtra Rang.
