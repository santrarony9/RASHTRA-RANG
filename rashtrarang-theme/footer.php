<?php
/**
 * Footer Template - Blocksy Daily News Edition
 *
 * @package RashtraRang
 */
?>

<!-- ==========================================================================
   BLOCKSY FOOTER (BLACK 4-COLUMN FOOTER WITH LEGAL & COMPLIANCE)
   ========================================================================== -->
<footer id="footer" class="ct-footer" data-id="type-1">
    <!-- Top Row: 4 Widget Columns -->
    <div class="footer-top-row">
        <div class="ct-container footer-grid-4">
            <!-- Col 1: Editorial Office & Social Media -->
            <div class="footer-col">
                <h6>राष्ट्र रंग कार्यालय</h6>
                <p><strong>प्रकाशन समय:</strong> सोमवार - रविवार: 24×7 डिजिटल न्यूज़ डेस्क<br><strong>प्रधान कार्यालय:</strong> कोलकाता, पश्चिम बंगाल - 700001</p>
                <div class="footer-social-icons">
                    <a href="https://facebook.com/rashtrarangnews" target="_blank" rel="noopener noreferrer" class="social-icon-box" aria-label="Facebook">FB</a>
                    <a href="https://x.com/RASHTRAR" target="_blank" rel="noopener noreferrer" class="social-icon-box" aria-label="X">X</a>
                    <a href="https://instagram.com/rashtrarang" target="_blank" rel="noopener noreferrer" class="social-icon-box" aria-label="Instagram">IG</a>
                    <a href="https://youtube.com/@rashtrarang" target="_blank" rel="noopener noreferrer" class="social-icon-box" aria-label="YouTube">YT</a>
                    <a href="https://t.me/rashtrarang" target="_blank" rel="noopener noreferrer" class="social-icon-box" aria-label="Telegram">TG</a>
                </div>
            </div>

            <!-- Col 2: Categories -->
            <div class="footer-col">
                <h6>प्रमुख श्रेणियां</h6>
                <ul class="footer-links">
                    <li><a href="<?php echo esc_url(home_url('/?cat=35')); ?>">राष्ट्रीय समाचार</a></li>
                    <li><a href="<?php echo esc_url(home_url('/?cat=78')); ?>">पश्चिम बंगाल</a></li>
                    <li><a href="<?php echo esc_url(home_url('/?cat=89')); ?>">कोलकाता महानगर</a></li>
                    <li><a href="<?php echo esc_url(home_url('/?cat=84')); ?>">राजनीति एवं शासन</a></li>
                    <li><a href="<?php echo esc_url(home_url('/?cat=91')); ?>">खेल जगत</a></li>
                    <li><a href="<?php echo esc_url(home_url('/?cat=77')); ?>">फिल्म जगत</a></li>
                    <li><a href="<?php echo esc_url(home_url('/?cat=141')); ?>">कारोबार एवं व्यापार</a></li>
                </ul>
            </div>

            <!-- Col 3: Legal & Disclosures -->
            <div class="footer-col">
                <h6>महत्वपूर्ण जानकारी</h6>
                <ul class="footer-links">
                    <li><a href="<?php echo esc_url(home_url('/privacy-policy/')); ?>">गोपनीयता नीति (Privacy Policy)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/terms/')); ?>">नियम एवं शर्तें (Terms & Conditions)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/sitemap_index.xml')); ?>">साइटमैप (Sitemap)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/editorial-ethics/')); ?>">डिजिटल मीडिया आचार संहिता</a></li>
                    <li><a href="<?php echo esc_url(home_url('/grievance/')); ?>">शिकायत निवारण (Grievance Officer)</a></li>
                </ul>
            </div>

            <!-- Col 4: Company Links -->
            <div class="footer-col">
                <h6>संस्थान एवं संपर्क</h6>
                <ul class="footer-links">
                    <li><a href="<?php echo esc_url(home_url('/about/')); ?>">हमारे बारे में (About Us)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">संपर्क करें (Contact Us)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/editorial-board/')); ?>">संपादकीय मंडल (Editorial Board)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/advertise/')); ?>">विज्ञापन दरें (Advertise With Us)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/?cat=81')); ?>">ई-पेपर संस्करण (E-Paper)</a></li>
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

    <!-- Bottom Row: Copyright Notice & IT Rules Compliance -->
    <div class="footer-bottom-row">
        <div class="ct-container">
            <p>© <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. सर्वाधिकार सुरक्षित। सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021 का पूर्ण अनुपालन।</p>
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
            <li><a href="<?php echo esc_url(home_url('/')); ?>">होम (Home)</a></li>
            <li><a href="<?php echo esc_url(home_url('/?cat=1')); ?>">राष्ट्रीय (National)</a></li>
            <li><a href="<?php echo esc_url(home_url('/?cat=4')); ?>">पश्चिम बंगाल (West Bengal)</a></li>
            <li><a href="<?php echo esc_url(home_url('/?cat=5')); ?>">कोलकाता (Kolkata)</a></li>
            <li><a href="<?php echo esc_url(home_url('/?cat=6')); ?>">राजनीति (Politics)</a></li>
            <li><a href="<?php echo esc_url(home_url('/?cat=7')); ?>">खेल जगत (Sports)</a></li>
            <li><a href="<?php echo esc_url(home_url('/?cat=8')); ?>">फिल्म जगत (Entertainment)</a></li>
            <li><a href="<?php echo esc_url(home_url('/?cat=9')); ?>">अर्थ जगत (Business)</a></li>
            <li><a href="<?php echo esc_url(home_url('/?cat=10')); ?>">विदेश (World)</a></li>
            <li><a href="<?php echo esc_url(home_url('/?cat=81')); ?>">ई-पेपर (E-Paper)</a></li>
            <li><a href="<?php echo esc_url(home_url('/about-us/')); ?>">हमारे बारे में (About Us)</a></li>
        </ul>
        <div class="ct-offcanvas-actions">
            <button class="preview-btn" onclick="toggleDarkMode()" style="width: 100%; text-align: center; padding: 10px; font-weight: 700; background: var(--color-border); border: none; cursor: pointer;">
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
    <div style="width:90%; max-width:600px; text-align:center;">
        <button onclick="closeSearchModal()" style="background:none; border:none; color:#fff; font-size:2rem; float:right; cursor:pointer;" aria-label="बंद करें">&times;</button>
        <div style="clear:both; margin-top:20px;">
            <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
                <input type="search" name="s" id="search-input" placeholder="ख़बरें, राजनीति, खेल या विषय खोजें..." style="width:100%; padding:14px 20px; font-size:1.2rem; border-radius:4px; border:2px solid var(--color-primary-red); background:#1A1E24; color:#fff; outline:none;" required>
                <button type="submit" style="margin-top:14px; padding:10px 24px; background:var(--color-primary-red); color:#fff; border:none; border-radius:4px; font-weight:700; cursor:pointer;">खोजें</button>
            </form>
        </div>
    </div>
</div>

<script>
function toggleDarkMode() {
    var cur = document.documentElement.getAttribute('data-theme');
    var nxt = (cur === 'dark') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nxt);
    document.documentElement.setAttribute('data-color-mode', nxt);
    localStorage.setItem('rashtrarang_theme', nxt);
}
function openSearchModal() {
    var m = document.getElementById('search-modal');
    if (m) {
        m.style.display = 'flex';
        setTimeout(function() {
            var inp = document.getElementById('search-input');
            if (inp) inp.focus();
        }, 100);
    }
}
function closeSearchModal() {
    var m = document.getElementById('search-modal');
    if (m) m.style.display = 'none';
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
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSearchModal();
});
</script>

<?php wp_footer(); ?>
</body>
</html>
