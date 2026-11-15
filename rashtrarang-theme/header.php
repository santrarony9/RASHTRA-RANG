<?php
/**
 * Header Template - Blocksy Daily News Edition
 *
 * @package RashtraRang
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="light" data-color-mode="light">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Martel:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
    /* Blocksy-style Instant Dark Mode Initializer */
    (function() {
        var t = localStorage.getItem('rashtrarang_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (t === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.setAttribute('data-color-mode', 'dark');
        }
    })();
    </script>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- READING PROGRESS INDICATOR (FIXED TOP) -->
<div id="reading-progress-bar" aria-hidden="true"></div>

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
                        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo-link" rel="home">
                            <div class="masthead-title">राष्ट्र रंग</div>
                            <div class="masthead-sub">RASHTRA RANG</div>
                        </a>
                        <p class="site-description">दैनिक हिंदी समाचार पत्र एवं डिजिटल न्यूज़ पोर्टल | निष्पक्ष, निर्भीक, सटीक</p>
                    </div>
                </div>

                <!-- Column End: Date & Subscribe CTA Button -->
                <div class="ct-column-end">
                    <div class="header-date-badge"><?php echo rashtrarang_hindi_date(); ?></div>
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
                    <nav class="header-menu-1" aria-label="<?php esc_attr_e('Main Navigation', 'rashtrarang'); ?>">
                        <?php
                        if (has_nav_menu('primary')) :
                            wp_nav_menu(array(
                                'theme_location' => 'primary',
                                'menu_class'     => 'menu-main-nav',
                                'container'      => false,
                                'depth'          => 2,
                                'fallback_cb'    => 'rashtrarang_default_nav_menu'
                            ));
                        else :
                            rashtrarang_default_nav_menu();
                        endif;
                        ?>
                    </nav>
                </div>

                <!-- Language / E-Paper Switcher -->
                <div class="ct-column-end" style="flex: 0 0 auto;">
                    <a href="<?php echo esc_url(home_url('/?cat=81')); ?>" class="ct-epaper-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: -1px;"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                        ई-पेपर
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>
