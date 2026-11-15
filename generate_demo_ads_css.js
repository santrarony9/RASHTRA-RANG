const fs = require('fs');

const demoAdsCss = `
/* ==========================================================================
   18. REALISTIC DEMO ADVERTISEMENT CREATIVES (MONETISATION PREVIEW)
   ========================================================================== */

/* Base Creative Wrapper */
.demo-ad-creative {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--radius-sm);
  text-decoration: none !important;
  color: #FFFFFF !important;
  font-family: var(--font-ui);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 12px 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  user-select: none;
}

.demo-ad-creative:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.ad-slot-box.has-creative {
  border: none;
  background: transparent;
  padding: 0;
}

.demo-ad-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 3px;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.demo-ad-title {
  font-size: 0.96rem;
  font-weight: 700;
  line-height: 1.35;
  margin: 0;
  color: #FFFFFF;
}

.demo-ad-desc {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 3px;
  line-height: 1.35;
}

.demo-ad-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 15px;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
  cursor: pointer;
  border: none;
}

.demo-ad-disclaimer {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 4px;
}

/* 1. TOP LEADERBOARD: State Bank of India (Banking) */
.demo-ad-sbi {
  background: linear-gradient(135deg, #09203F 0%, #153E75 100%);
  border: 1px solid #1D4E89;
  min-height: 90px;
}

.demo-ad-sbi .demo-ad-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.demo-ad-sbi .sbi-circle-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2575FC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.1rem;
  color: #FFFFFF;
  border: 2px solid #64B5F6;
  flex-shrink: 0;
}

.demo-ad-sbi .demo-ad-cta {
  background: #FFB300;
  color: #0B2240;
}

.demo-ad-sbi:hover .demo-ad-cta {
  background: #FFA000;
  transform: scale(1.04);
}

/* 2. HOMEPAGE BILLBOARD: Flipkart Electronics Fest (E-Commerce) */
.demo-ad-flipkart {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%);
  border: 2px solid #F59E0B;
  min-height: 250px;
  padding: 24px 30px;
  flex-direction: column;
  justify-content: space-between;
}

.demo-ad-flipkart-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(245, 158, 11, 0.3);
  padding-bottom: 10px;
  margin-bottom: 12px;
}

.demo-ad-flipkart-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1.2fr 2fr 1fr;
  gap: 20px;
  align-items: center;
}

.demo-ad-highlight-box {
  background: rgba(245, 158, 11, 0.15);
  border: 1px dashed #F59E0B;
  border-radius: 6px;
  padding: 12px;
  text-align: center;
}

.demo-ad-highlight-pct {
  font-size: 1.7rem;
  font-weight: 900;
  color: #FBBF24;
  line-height: 1;
}

.demo-ad-feature-pills {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.demo-ad-pill-item {
  background: rgba(255, 255, 255, 0.08);
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.demo-ad-flipkart .demo-ad-cta {
  background: #F59E0B;
  color: #0F172A;
  font-size: 0.88rem;
  padding: 10px 18px;
}

.demo-ad-flipkart:hover .demo-ad-cta {
  background: #D97706;
  transform: scale(1.03);
}

/* 3. IN-FEED CONTENT BREAKER: MakeMyTrip Holidays (Travel) */
.demo-ad-makemytrip {
  background: linear-gradient(135deg, #093A3E 0%, #10606B 100%);
  border: 1px solid #14808F;
  min-height: 90px;
}

.demo-ad-makemytrip .demo-ad-cta {
  background: #EF4444;
  color: #FFFFFF;
}

.demo-ad-makemytrip:hover .demo-ad-cta {
  background: #DC2626;
  transform: scale(1.04);
}

/* 4. SIDEBAR TOP RECTANGLE: Allen Career Institute (Education) */
.demo-ad-allen {
  background: linear-gradient(160deg, #1E1B4B 0%, #312E81 100%);
  border: 1px solid #4338CA;
  min-height: 250px;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding: 18px 16px;
}

.demo-ad-allen .demo-ad-cta {
  background: #06B6D4;
  color: #082F49;
  width: 100%;
}

.demo-ad-allen:hover .demo-ad-cta {
  background: #0891B2;
  color: #FFFFFF;
}

/* 5. SIDEBAR STICKY HALF-PAGE: Tanishq / Senco Jewellery (Local / Luxury) */
.demo-ad-tanishq {
  background: linear-gradient(175deg, #3A0713 0%, #580B1E 60%, #2A040D 100%);
  border: 2px solid #D4AF37;
  min-height: 580px;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding: 24px 18px;
}

.demo-ad-gold-ornament {
  font-size: 1.8rem;
  color: #D4AF37;
  margin-bottom: 4px;
}

.demo-ad-tanishq-title {
  font-family: var(--font-headline);
  font-size: 1.15rem;
  color: #FEEBC8;
  font-weight: 700;
  line-height: 1.35;
  margin: 10px 0;
}

.demo-ad-jewel-perks {
  text-align: left;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 14px;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.78rem;
}

.demo-ad-tanishq .demo-ad-cta {
  background: #D4AF37;
  color: #3A0713;
  width: 100%;
  padding: 10px;
  font-weight: 800;
}

.demo-ad-tanishq:hover .demo-ad-cta {
  background: #ECC94B;
  transform: scale(1.02);
}

/* 6. IN-ARTICLE INLINE AD: Health & Family Protection (Finance) */
.demo-ad-hdfc {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  border-left: 4px solid #10B981;
  border-radius: var(--radius-sm);
  min-height: 120px;
  padding: 16px 20px;
  margin: 15px auto;
  max-width: 728px;
}

.demo-ad-hdfc .demo-ad-cta {
  background: #10B981;
  color: #FFFFFF;
}

.demo-ad-hdfc:hover .demo-ad-cta {
  background: #059669;
  transform: scale(1.04);
}

/* 7. CATEGORY PAGE BANNER: Bengal Handloom & Silk Expo (Local Business) */
.demo-ad-bengal {
  background: linear-gradient(135deg, #7C2D12 0%, #991B1B 100%);
  border: 1px solid #B45309;
  min-height: 90px;
}

.demo-ad-bengal .demo-ad-cta {
  background: #FEF3C7;
  color: #78350F;
}

.demo-ad-bengal:hover .demo-ad-cta {
  background: #FDE68A;
  transform: scale(1.04);
}

/* 8. FOOTER BANNER: Tata Power Solar (Clean Tech) */
.demo-ad-solar {
  background: linear-gradient(135deg, #064E3B 0%, #065F46 100%);
  border: 1px solid #059669;
  min-height: 90px;
}

.demo-ad-solar .demo-ad-cta {
  background: #FBBF24;
  color: #064E3B;
}

.demo-ad-solar:hover .demo-ad-cta {
  background: #F59E0B;
  transform: scale(1.04);
}

/* Mobile Responsive Optimization for Demo Ads */
@media (max-width: 768px) {
  .demo-ad-creative {
    padding: 10px 14px;
    flex-direction: column;
    text-align: center;
    gap: 8px;
    height: auto;
  }

  .demo-ad-sbi .demo-ad-brand,
  .demo-ad-makemytrip .demo-ad-brand,
  .demo-ad-bengal .demo-ad-brand,
  .demo-ad-solar .demo-ad-brand {
    justify-content: center;
  }

  .demo-ad-flipkart {
    padding: 16px 12px;
  }

  .demo-ad-flipkart-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .demo-ad-cta {
    width: 100%;
    margin-top: 6px;
  }

  .demo-ad-title {
    font-size: 0.88rem;
  }

  .demo-ad-desc {
    font-size: 0.72rem;
  }
}
`;

// Append to rashtrarang-theme/style.css if not already present
let themeCss = fs.readFileSync('rashtrarang-theme/style.css', 'utf8');
if (!themeCss.includes('.demo-ad-creative')) {
    themeCss += '\n' + demoAdsCss;
    fs.writeFileSync('rashtrarang-theme/style.css', themeCss, 'utf8');
    console.log('Appended demo ads CSS to rashtrarang-theme/style.css');
} else {
    console.log('demo-ad-creative already present in rashtrarang-theme/style.css');
}

// Append to preview/style.css if not already present
let previewCss = fs.readFileSync('preview/style.css', 'utf8');
if (!previewCss.includes('.demo-ad-creative')) {
    previewCss += '\n' + demoAdsCss;
    fs.writeFileSync('preview/style.css', previewCss, 'utf8');
    console.log('Appended demo ads CSS to preview/style.css');
} else {
    console.log('demo-ad-creative already present in preview/style.css');
}
