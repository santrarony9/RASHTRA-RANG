const fs = require('fs');

// 1. Update single.php
let single = fs.readFileSync('rashtrarang-theme/single.php', 'utf8');

// Replace in-article ad with rashtrarang_render_ad and add bottom ad
const oldArticleBody = `            <div class="article-content-body">
                <?php 
                the_content(); 

                // In-article ad placement
                $ad_inline = get_theme_mod('ad_article_inline', '');
                if (!empty($ad_inline)) :
                ?>
                    <div style="margin: 25px 0; text-align: center; border: 1px dashed var(--color-border); padding: 15px;">
                        <span style="display: block; font-size: 0.72rem; color: var(--color-text-muted); margin-bottom: 6px;">विज्ञापन / ADVERTISEMENT</span>
                        <?php echo $ad_inline; ?>
                    </div>
                <?php endif; ?>
            </div>`;

const newArticleBody = `            <div class="article-content-body">
                <?php the_content(); ?>
            </div>

            <!-- Below Article Ad Slot -->
            <?php rashtrarang_render_ad('ad_article_bottom', 'ad-slot-inarticle reveal-on-scroll'); ?>`;

if (single.includes(oldArticleBody)) {
    single = single.replace(oldArticleBody, newArticleBody);
}

// Update sidebar ads
const oldSidebarAd = `            <!-- Sidebar Ad Slot -->
            <div style="margin-bottom: 25px; border: 1px dashed var(--color-border); padding: 15px; text-align: center;">
                <span style="display: block; font-size: 0.72rem; color: var(--color-text-muted); margin-bottom: 6px;">विज्ञापन / ADVERTISEMENT</span>
                <?php 
                $ad_sidebar = get_theme_mod('ad_sidebar_300', '');
                if (!empty($ad_sidebar)) :
                    echo $ad_sidebar;
                else : ?>
                    <div style="padding: 30px 10px; color: var(--color-text-muted); font-size: 0.85rem;">प्रायोजित विज्ञापन स्थान<br>300x250 Medium Rectangle</div>
                <?php endif; ?>
            </div>`;

const newSidebarAd = `            <!-- Sidebar Top Ad Slot (300x250) -->
            <?php rashtrarang_render_ad('ad_sidebar_top', 'ad-slot-sidebar-300 reveal-on-scroll'); ?>`;

if (single.includes(oldSidebarAd)) {
    single = single.replace(oldSidebarAd, newSidebarAd);
}

// Add sticky sidebar ad after epaper box
const oldEpaperBox = `            <!-- E-Paper Box -->
            <div style="margin-top: 25px; padding: 20px; background-color: var(--color-card-bg); border: 1px solid var(--color-border); border-radius: var(--radius-sm); border-top: 3px solid var(--color-primary-red);">
                <h4 style="font-family: var(--font-editorial); font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 6px;">राष्ट्र रंग ई-पेपर</h4>
                <p style="font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 14px;">आज का संपूर्ण डिजिटल संस्करण अपने मोबाइल एवं कंप्यूटर पर पढ़ें।</p>
                <a href="<?php echo esc_url(home_url('/?cat=81')); ?>" style="display: block; text-align: center; padding: 10px; background-color: var(--color-primary-red); color: #FFFFFF; font-weight: 700; font-size: 0.85rem; border-radius: var(--radius-sm); text-decoration: none;">ई-पेपर संस्करण पढ़ें →</a>
            </div>`;

const newEpaperBox = oldEpaperBox + `

            <!-- Sidebar Sticky Half-Page Ad (300x600) -->
            <?php rashtrarang_render_ad('ad_sidebar_sticky', 'ad-slot-sidebar-sticky reveal-on-scroll'); ?>`;

if (single.includes(oldEpaperBox) && !single.includes('ad_sidebar_sticky')) {
    single = single.replace(oldEpaperBox, newEpaperBox);
}

fs.writeFileSync('rashtrarang-theme/single.php', single, 'utf8');
console.log('Successfully updated rashtrarang-theme/single.php');

// 2. Update category.php
let cat = fs.readFileSync('rashtrarang-theme/category.php', 'utf8');

// Add category top ad banner right above two col layout
if (!cat.includes('ad_category_top')) {
    cat = cat.replace(
        '<div class="article-two-col-layout">',
        '<!-- Category Top Banner Ad -->\n    <?php rashtrarang_render_ad(\'ad_category_top\', \'ad-slot-leaderboard reveal-on-scroll\'); ?>\n\n    <div class="article-two-col-layout">'
    );
}

// Replace sidebar ad
const oldCatSidebarAd = `            <!-- Sidebar Ad Slot -->
            <div style="margin-bottom: 25px; border: 1px dashed var(--color-border); padding: 15px; text-align: center;">
                <span style="display: block; font-size: 0.72rem; color: var(--color-text-muted); margin-bottom: 6px;">विज्ञापन / ADVERTISEMENT</span>
                <div style="padding: 30px 10px; color: var(--color-text-muted); font-size: 0.85rem;">प्रायोजित विज्ञापन स्थान<br>300x250 Medium Rectangle</div>
            </div>`;

const newCatSidebarAd = `            <!-- Sidebar Top Ad Slot -->
            <?php rashtrarang_render_ad('ad_sidebar_top', 'ad-slot-sidebar-300 reveal-on-scroll'); ?>`;

if (cat.includes(oldCatSidebarAd)) {
    cat = cat.replace(oldCatSidebarAd, newCatSidebarAd);
}

fs.writeFileSync('rashtrarang-theme/category.php', cat, 'utf8');
console.log('Successfully updated rashtrarang-theme/category.php');
