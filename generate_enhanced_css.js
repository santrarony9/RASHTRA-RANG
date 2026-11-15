const fs = require('fs');

const cssAdditions = `
/* ==========================================================================
   14. POPULAR NEWS (सर्वाधिक लोकप्रिय खबरें / MOST-VIEWED SECTION)
   ========================================================================== */
.blocksy-popular-section {
  padding: 35px 0 25px;
  background-color: var(--color-soft-bg);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.popular-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  flex-wrap: wrap;
  gap: 12px;
}

.popular-filter-pills {
  display: flex;
  gap: 6px;
  background: var(--color-canvas-bg);
  padding: 4px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.popular-pill-btn {
  background: transparent;
  border: none;
  padding: 5px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-text-muted);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.popular-pill-btn.active, .popular-pill-btn:hover {
  background-color: var(--color-primary-red);
  color: #FFFFFF;
}

.popular-cards-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card-popular-hub {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, border-color 0.28s ease;
}

.card-popular-hub:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--color-primary-red);
}

.card-popular-hub .card-media {
  height: 160px;
  position: relative;
  overflow: hidden;
}

.card-popular-hub .popular-rank-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 28px;
  height: 28px;
  background-color: var(--color-primary-red);
  color: #FFFFFF;
  font-weight: 800;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  z-index: 2;
}

.card-popular-hub .view-counter-pill {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(2px);
  color: #FFFFFF;
  font-size: 0.70rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  z-index: 2;
}

.card-popular-hub .card-body {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-popular-hub .card-title {
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.35;
  margin: 6px 0 10px 0;
  flex: 1;
}

.card-popular-hub .card-title a {
  color: var(--color-text-main);
  text-decoration: none;
  transition: color 0.15s ease;
}

.card-popular-hub .card-title a:hover {
  color: var(--color-primary-red);
}

/* ==========================================================================
   15. UPCOMING NEWS / SCHEDULED COVERAGE (आगामी कवरेज एवं घोषणाएं)
   ========================================================================== */
.blocksy-upcoming-section {
  padding: 30px 0;
}

.upcoming-box-container {
  background: linear-gradient(135deg, rgba(181, 31, 43, 0.04) 0%, rgba(20, 24, 30, 0.02) 100%);
  border: 1px solid rgba(181, 31, 43, 0.22);
  border-left: 4px solid var(--color-primary-red);
  border-radius: var(--radius-sm);
  padding: 24px;
}

[data-theme="dark"] .upcoming-box-container {
  background: linear-gradient(135deg, rgba(181, 31, 43, 0.12) 0%, rgba(22, 27, 34, 0.8) 100%);
  border-color: rgba(181, 31, 43, 0.35);
}

.upcoming-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 10px;
}

.upcoming-badge-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: var(--color-primary-red);
  color: #FFFFFF;
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 2px;
  letter-spacing: 0.04em;
}

.upcoming-pulse-dot {
  width: 7px;
  height: 7px;
  background-color: #FFFFFF;
  border-radius: 50%;
  animation: pulse-dot 1.6s infinite ease-in-out;
}

.upcoming-cards-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card-upcoming-item {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease;
}

.card-upcoming-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.card-upcoming-item .card-media {
  height: 140px;
  position: relative;
  overflow: hidden;
}

.card-upcoming-item .upcoming-datetime-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(10, 12, 14, 0.85);
  backdrop-filter: blur(2px);
  color: #FFFFFF;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  z-index: 2;
  border-left: 2px solid var(--color-primary-red);
}

.card-upcoming-item .card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-upcoming-item .upcoming-venue {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-upcoming-item .card-title {
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.35;
  margin: 0 0 10px 0;
  flex: 1;
}

.card-upcoming-item .btn-reminder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-primary-red);
  background-color: rgba(181, 31, 43, 0.08);
  border: 1px solid rgba(181, 31, 43, 0.2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.card-upcoming-item .btn-reminder:hover {
  background-color: var(--color-primary-red);
  color: #FFFFFF;
}

/* ==========================================================================
   16. NEWS CATEGORIES HUB (समस्त श्रेणियां / VISUAL DIRECTORY)
   ========================================================================== */
.blocksy-categories-hub-section {
  padding: 35px 0 25px;
  background-color: var(--color-canvas-bg);
  border-top: 1px solid var(--color-border);
}

.categories-scroll-nav-bar {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin-bottom: 22px;
  scrollbar-width: thin;
}

.category-nav-pill {
  white-space: nowrap;
  padding: 6px 14px;
  background-color: var(--color-soft-bg);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-text-main);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.category-nav-pill:hover, .category-nav-pill.active {
  background-color: var(--color-primary-red);
  color: #FFFFFF;
  border-color: var(--color-primary-red);
  transform: translateY(-1px);
}

.category-nav-pill .pill-count {
  font-size: 0.70rem;
  padding: 1px 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.category-nav-pill:hover .pill-count {
  background: rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
}

.categories-hub-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card-category-hub {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  text-decoration: none;
  background-color: #111317;
  border: 1px solid var(--color-border);
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, border-color 0.28s ease;
}

.card-category-hub:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
  border-color: var(--color-primary-red);
}

.card-category-hub .cat-hub-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.65;
}

.card-category-hub:hover .cat-hub-bg-img {
  transform: scale(1.06);
  opacity: 0.78;
}

.card-category-hub .cat-hub-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.88) 100%);
  z-index: 1;
}

.card-category-hub .cat-hub-content {
  position: relative;
  z-index: 2;
  color: #FFFFFF;
}

.card-category-hub .cat-hub-badge {
  display: inline-block;
  background-color: var(--color-primary-red);
  color: #FFFFFF;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 2px;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.card-category-hub .cat-hub-title {
  font-family: var(--font-editorial);
  font-size: 1.15rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 4px 0;
  line-height: 1.25;
}

.card-category-hub .cat-hub-latest {
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.82);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

/* ==========================================================================
   17. ADVERTISEMENT MANAGEMENT SYSTEM (ADSENSE & CUSTOM BANNERS)
   ========================================================================== */
.ad-container-wrap {
  width: 100%;
  margin: 25px 0;
  text-align: center;
  position: relative;
  clear: both;
}

.ad-sponsor-label {
  display: block;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 5px;
  font-weight: 600;
}

.ad-slot-box {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--color-soft-bg);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-sm);
  transition: border-color 0.2s ease;
}

.ad-slot-box:hover {
  border-color: rgba(181, 31, 43, 0.4);
}

.ad-placeholder-inner {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-weight: 600;
}

.ad-placeholder-inner small {
  font-size: 0.72rem;
  color: #888888;
  font-weight: 400;
}

/* Specific Dimension Slots to Prevent Layout Shift (CLS) */
.ad-slot-leaderboard {
  max-width: 728px;
  min-height: 90px;
}

.ad-slot-billboard {
  max-width: 970px;
  min-height: 110px;
}

.ad-slot-sidebar-300 {
  max-width: 300px;
  min-height: 250px;
}

.ad-slot-sidebar-sticky {
  max-width: 300px;
  min-height: 500px;
  position: sticky;
  top: 80px;
}

.ad-slot-inarticle {
  max-width: 650px;
  min-height: 100px;
  margin: 28px auto;
}

.ad-slot-footer {
  max-width: 728px;
  min-height: 90px;
  margin-top: 25px;
}

/* ==========================================================================
   18. PROFESSIONAL MOTION & ANIMATIONS (EDITORIAL MOTION SYSTEM)
   ========================================================================== */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.35); opacity: 0.65; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-loading {
  background: linear-gradient(90deg, var(--color-border) 25%, var(--color-soft-bg) 50%, var(--color-border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Smooth Tab Fade Transition */
.tab-content-fade {
  animation: tabFadeIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes tabFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Accessibility: Respect Reduced Motion Preferences */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* Responsive adjustments for new modules */
@media (max-width: 999.98px) {
  .popular-cards-grid-4,
  .categories-hub-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .upcoming-cards-grid-3 {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .ad-slot-billboard,
  .ad-slot-leaderboard {
    max-width: 100%;
    min-height: 80px;
  }
}

@media (max-width: 640px) {
  .popular-cards-grid-4,
  .categories-hub-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .popular-header-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .ad-slot-leaderboard,
  .ad-slot-billboard,
  .ad-slot-footer {
    min-height: 60px;
  }
}
`;

fs.appendFileSync('preview/style.css', cssAdditions);
fs.appendFileSync('rashtrarang-theme/style.css', cssAdditions);
console.log('Successfully appended enhanced CSS to preview/style.css and rashtrarang-theme/style.css');
