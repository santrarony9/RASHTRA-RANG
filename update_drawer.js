const fs = require('fs');

// 1. Update preview/index.html
let previewHtml = fs.readFileSync('preview/index.html', 'utf8');

const drawerHtml = `
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
            <li><a href="javascript:void(0)" onclick="showView('category', 1, 'राष्ट्रीय'); closeMobileDrawer();">राष्ट्रीय (National)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 4, 'पश्चिम बंगाल'); closeMobileDrawer();">पश्चिम बंगाल (West Bengal)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 5, 'कोलकाता'); closeMobileDrawer();">कोलकाता (Kolkata)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 6, 'राजनीति'); closeMobileDrawer();">राजनीति (Politics)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 7, 'खेल जगत'); closeMobileDrawer();">खेल जगत (Sports)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 8, 'फिल्म जगत'); closeMobileDrawer();">फिल्म जगत (Entertainment)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 9, 'अर्थ जगत'); closeMobileDrawer();">अर्थ जगत (Business)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 10, 'विदेश'); closeMobileDrawer();">विदेश (World)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('category', 81, 'ई-पेपर'); closeMobileDrawer();">ई-पेपर (E-Paper)</a></li>
            <li><a href="javascript:void(0)" onclick="showView('about'); closeMobileDrawer();">हमारे बारे में (About Us)</a></li>
        </ul>
        <div class="ct-offcanvas-actions">
            <button class="preview-btn" onclick="toggleDarkMode()" style="width: 100%; text-align: center; padding: 10px; font-weight: 700;">
                🌓 डार्क / लाइट मोड बदलें
            </button>
            <button class="preview-btn" onclick="openSearchModal(); closeMobileDrawer();" style="width: 100%; text-align: center; padding: 10px; font-weight: 700;">
                🔍 समाचार खोजें (Search)
            </button>
        </div>
    </div>
</aside>
`;

// Insert drawer right before search modal
previewHtml = previewHtml.replace('<!-- SEARCH MODAL -->', drawerHtml + '\n<!-- SEARCH MODAL -->');

// Replace toggleMobileDrawer function
const oldMobileFunc = /function toggleMobileDrawer\(\) \{[\s\S]*?if \(choice\) toggleDarkMode\(\);\s*\}/;
const newMobileFunc = `function openMobileDrawer() {
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
    }`;

previewHtml = previewHtml.replace(oldMobileFunc, newMobileFunc);
fs.writeFileSync('preview/index.html', previewHtml, 'utf8');
console.log('Updated preview/index.html with real offcanvas drawer.');

// 2. Update rashtrarang-theme/footer.php
let footerPhp = fs.readFileSync('rashtrarang-theme/footer.php', 'utf8');
const wpDrawerHtml = `
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
`;

footerPhp = footerPhp.replace('<!-- SEARCH MODAL -->', wpDrawerHtml + '\n<!-- SEARCH MODAL -->');
const oldWpMobileFunc = /function toggleMobileDrawer\(\) \{[\s\S]*?if \(choice\) toggleDarkMode\(\);\s*\}/;
footerPhp = footerPhp.replace(oldWpMobileFunc, newMobileFunc);
fs.writeFileSync('rashtrarang-theme/footer.php', footerPhp, 'utf8');
console.log('Updated rashtrarang-theme/footer.php with real offcanvas drawer.');
