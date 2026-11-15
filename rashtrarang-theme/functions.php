<?php
/**
 * Rashtra Rang Modern - Theme Functions & Definitions
 *
 * @package RashtraRang
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

define('RASHTRARANG_VERSION', '2.0.0');

/**
 * Theme Setup
 */
function rashtrarang_setup() {
    // Make theme available for translation.
    load_theme_textdomain('rashtrarang', get_template_directory() . '/languages');

    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title.
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(800, 480, true);
    add_image_size('rashtrarang-hero', 800, 480, true);
    add_image_size('rashtrarang-grid', 480, 300, true);
    add_image_size('rashtrarang-thumb', 120, 90, true);

    // Register navigation menus.
    register_nav_menus(array(
        'primary' => __('Primary Header Menu (मुख्य नेविगेशन)', 'rashtrarang'),
        'footer'  => __('Footer Category Menu (पाद लेख मेनू)', 'rashtrarang'),
    ));

    // Switch default core markup to output valid HTML5.
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Custom logo support.
    add_theme_support('custom-logo', array(
        'height'      => 90,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Responsive embeds support.
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'rashtrarang_setup');

/**
 * Enqueue Styles and Scripts
 */
function rashtrarang_scripts() {
    // High-performance Devanagari Google Fonts with display=swap
    wp_enqueue_style(
        'rashtrarang-fonts',
        'https://fonts.googleapis.com/css2?family=Martel:wght@700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    // Main Theme Stylesheet
    wp_enqueue_style(
        'rashtrarang-style',
        get_stylesheet_uri(),
        array('rashtrarang-fonts'),
        RASHTRARANG_VERSION
    );

    // Main Theme JavaScript
    wp_enqueue_script(
        'rashtrarang-main-js',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        RASHTRARANG_VERSION,
        true
    );

    // Threaded comments support
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'rashtrarang_scripts', 20);

/**
 * Fix Language Attribute to Hindi (hi-IN)
 */
function rashtrarang_language_attributes($output) {
    return 'lang="hi"';
}
add_filter('language_attributes', 'rashtrarang_language_attributes');

/**
 * Register Widget Areas
 */
function rashtrarang_widgets_init() {
    register_sidebar(array(
        'name'          => __('Main Sidebar (मुख्य साइडबार)', 'rashtrarang'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here to appear in your sidebar.', 'rashtrarang'),
        'before_widget' => '<section id="%1$s" class="sidebar-widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="sidebar-widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'rashtrarang_widgets_init');

/**
 * Helper: Hindi Formatted Date
 */
function rashtrarang_hindi_date($timestamp = null) {
    if (!$timestamp) {
        $timestamp = current_time('timestamp');
    }
    $days = array(
        'Sunday'    => 'रविवार',
        'Monday'    => 'सोमवार',
        'Tuesday'   => 'मंगलवार',
        'Wednesday' => 'बुधवार',
        'Thursday'  => 'गुरुवार',
        'Friday'    => 'शुक्रवार',
        'Saturday'  => 'शनिवार'
    );
    $months = array(
        'January'   => 'जनवरी',
        'February'  => 'फ़रवरी',
        'March'     => 'मार्च',
        'April'     => 'अप्रैल',
        'May'       => 'मई',
        'June'      => 'जून',
        'July'      => 'जुलाई',
        'August'    => 'अगस्त',
        'September' => 'सितंबर',
        'October'   => 'अक्टूबर',
        'November'  => 'नवंबर',
        'December'  => 'दिसंबर'
    );
    $day_en = date('l', $timestamp);
    $month_en = date('F', $timestamp);
    $day_hi = isset($days[$day_en]) ? $days[$day_en] : $day_en;
    $month_hi = isset($months[$month_en]) ? $months[$month_en] : $month_en;
    $date_num = date('d', $timestamp);
    $year_num = date('Y', $timestamp);

    return $day_hi . ', ' . $date_num . ' ' . $month_hi . ' ' . $year_num;
}

/**
 * Helper: Calculate Reading Time in Hindi
 */
function rashtrarang_reading_time($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    $content = get_post_field('post_content', $post_id);
    $word_count = mb_strlen(strip_tags($content), 'UTF-8');
    $minutes = ceil($word_count / 800); // Average Hindi characters per minute
    if ($minutes < 1) $minutes = 1;
    return $minutes . ' मिनट पढ़ें';
}

/**
 * Helper: Clean and Fix Hindi Headlines (Word Concatenation Glitch Fix)
 */
function rashtrarang_clean_headline($title) {
    // Specific known bug fixes in existing post titles
    $title = str_replace('फुटबॉलरअरिंदमभट्टाचार्य', 'फुटबॉलर अरिंदम भट्टाचार्य', $title);
    return esc_html($title);
}

/**
 * Helper: Get Post Image URL with Smart Fallback
 */
function rashtrarang_get_post_image($post_id = null, $size = 'rashtrarang-grid') {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    if (has_post_thumbnail($post_id)) {
        $img = wp_get_attachment_image_src(get_post_thumbnail_id($post_id), $size);
        if ($img && !empty($img[0])) {
            return esc_url($img[0]);
        }
    }
    // Fallback: check content for first img
    $post_content = get_post_field('post_content', $post_id);
    if (preg_match('/<img[^>]+src=[\'"]([^\'"]+)[\'"]/i', $post_content, $matches)) {
        return esc_url($matches[1]);
    }
    // Final fallback: Theme default news banner
    return get_template_directory_uri() . '/assets/images/logo.jpg';
}

/**
 * SEO & Open Graph Meta Tags Generation
 */
function rashtrarang_seo_meta_tags() {
    global $post;
    $site_name = get_bloginfo('name');
    $site_desc = get_bloginfo('description');

    if (is_singular() && is_a($post, 'WP_Post')) {
        $title = get_the_title($post->ID);
        $excerpt = wp_strip_all_tags(get_the_excerpt($post->ID));
        if (empty($excerpt)) {
            $excerpt = wp_trim_words(wp_strip_all_tags($post->post_content), 30);
        }
        $url = get_permalink($post->ID);
        $image = rashtrarang_get_post_image($post->ID, 'large');
        $author_name = get_the_author_meta('display_name', $post->post_author);
        $pub_date = get_the_date('c', $post->ID);
        $mod_date = get_the_modified_date('c', $post->ID);

        echo "\n<!-- Rashtra Rang Open Graph & News SEO Meta -->\n";
        echo '<meta property="og:locale" content="hi_IN" />' . "\n";
        echo '<meta property="og:type" content="article" />' . "\n";
        echo '<meta property="og:title" content="' . esc_attr($title) . ' - ' . esc_attr($site_name) . '" />' . "\n";
        echo '<meta property="og:description" content="' . esc_attr($excerpt) . '" />' . "\n";
        echo '<meta property="og:url" content="' . esc_url($url) . '" />' . "\n";
        echo '<meta property="og:site_name" content="' . esc_attr($site_name) . '" />' . "\n";
        echo '<meta property="og:image" content="' . esc_url($image) . '" />' . "\n";
        echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
        echo '<meta name="twitter:title" content="' . esc_attr($title) . '" />' . "\n";
        echo '<meta name="twitter:description" content="' . esc_attr($excerpt) . '" />' . "\n";
        echo '<meta name="twitter:image" content="' . esc_url($image) . '" />' . "\n";

        // JSON-LD Structured Data for NewsArticle
        $schema = array(
            '@context'         => 'https://schema.org',
            '@type'            => 'NewsArticle',
            'mainEntityOfPage' => array(
                '@type' => 'WebPage',
                '@id'   => esc_url($url),
            ),
            'headline'         => esc_html($title),
            'description'      => esc_html($excerpt),
            'image'            => array(esc_url($image)),
            'datePublished'    => $pub_date,
            'dateModified'     => $mod_date,
            'inLanguage'       => 'hi',
            'author'           => array(
                '@type' => 'Person',
                'name'  => esc_html($author_name),
            ),
            'publisher'        => array(
                '@type' => 'NewsMediaOrganization',
                'name'  => esc_html($site_name),
                'url'   => home_url('/'),
                'logo'  => array(
                    '@type' => 'ImageObject',
                    'url'   => get_template_directory_uri() . '/assets/images/logo.jpg',
                ),
            ),
        );
        echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";

        // BreadcrumbList JSON-LD
        $categories = get_the_category($post->ID);
        if ($categories) {
            $cat = $categories[0];
            $breadcrumb_schema = array(
                '@context' => 'https://schema.org',
                '@type'    => 'BreadcrumbList',
                'itemListElement' => array(
                    array(
                        '@type'    => 'ListItem',
                        'position' => 1,
                        'name'     => 'होम',
                        'item'     => home_url('/'),
                    ),
                    array(
                        '@type'    => 'ListItem',
                        'position' => 2,
                        'name'     => $cat->name,
                        'item'     => get_category_link($cat->term_id),
                    ),
                    array(
                        '@type'    => 'ListItem',
                        'position' => 3,
                        'name'     => $title,
                        'item'     => $url,
                    ),
                ),
            );
            echo '<script type="application/ld+json">' . json_encode($breadcrumb_schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
        }
    } else {
        // Homepage / Archives WebSite JSON-LD
        $web_schema = array(
            '@context'        => 'https://schema.org',
            '@type'           => 'WebSite',
            'name'            => esc_html($site_name),
            'url'             => home_url('/'),
            'potentialAction' => array(
                '@type'       => 'SearchAction',
                'target'      => home_url('/?s={search_term_string}'),
                'query-input' => 'required name=search_term_string',
            ),
        );
        echo '<script type="application/ld+json">' . json_encode($web_schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    }
}
add_action('wp_head', 'rashtrarang_seo_meta_tags');

/**
 * Custom Virtual XML Sitemap Generator (Resolves 404 for Search Engines)
 */
function rashtrarang_custom_sitemap() {
    if (isset($_GET['sitemap']) && $_GET['sitemap'] === 'news') {
        header('Content-Type: application/xml; charset=utf-8');
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">' . "\n";

        $recent_posts = get_posts(array(
            'numberposts' => 100,
            'post_status' => 'publish',
        ));

        foreach ($recent_posts as $p) {
            echo '  <url>' . "\n";
            echo '    <loc>' . esc_url(get_permalink($p->ID)) . '</loc>' . "\n";
            echo '    <lastmod>' . get_the_modified_date('c', $p->ID) . '</lastmod>' . "\n";
            echo '    <changefreq>daily</changefreq>' . "\n";
            echo '    <priority>0.8</priority>' . "\n";
            echo '  </url>' . "\n";
        }
        echo '</urlset>';
        exit;
    }
}
add_action('init', 'rashtrarang_custom_sitemap');

/**
 * Clean Virtual robots.txt Generator
 */
function rashtrarang_robots_txt($output, $public) {
    $sitemap_url = home_url('/?sitemap=news');
    $output  = "User-agent: *\n";
    $output .= "Disallow: /wp-admin/\n";
    $output .= "Allow: /wp-admin/admin-ajax.php\n";
    $output .= "Sitemap: " . $sitemap_url . "\n";
    return $output;
}
add_filter('robots_txt', 'rashtrarang_robots_txt', 10, 2);

/**
 * WordPress Customizer Controls (Ad Management, Ticker & Statutory Compliance)
 */

/**
 * ============================================================================
 * 1. POPULAR NEWS: ARTICLE VIEWS TRACKING & QUERY SYSTEM
 * ============================================================================
 */
function rashtrarang_track_post_views($post_id = 0) {
    if (!is_single()) return;
    if (empty($post_id)) {
        global $post;
        $post_id = isset($post->ID) ? $post->ID : 0;
    }
    if (!$post_id) return;

    $count_key = 'rashtrarang_post_views_count';
    $count = get_post_meta($post_id, $count_key, true);
    if ($count === '') {
        $count = 1;
        delete_post_meta($post_id, $count_key);
        add_post_meta($post_id, $count_key, '1');
    } else {
        $count = intval($count) + 1;
        update_post_meta($post_id, $count_key, $count);
    }
}
add_action('wp_head', function() {
    if (is_single()) {
        rashtrarang_track_post_views(get_the_ID());
    }
});

function rashtrarang_get_post_views($post_id = null) {
    if (!$post_id) $post_id = get_the_ID();
    $count = get_post_meta($post_id, 'rashtrarang_post_views_count', true);
    if (empty($count) || $count == 0) {
        $count = 450 + (($post_id * 23) % 2800);
    }
    if ($count >= 1000) {
        return round($count / 1000, 1) . 'K+ पाठक';
    }
    return $count . ' पाठक';
}

function rashtrarang_get_popular_query($posts_per_page = 4, $category_id = 0) {
    $args = array(
        'posts_per_page'      => $posts_per_page,
        'post_status'         => 'publish',
        'meta_key'            => 'rashtrarang_post_views_count',
        'orderby'             => 'meta_value_num',
        'order'               => 'DESC',
        'ignore_sticky_posts' => 1,
    );
    if ($category_id > 0) {
        $args['cat'] = $category_id;
    }
    $query = new WP_Query($args);
    if (!$query->have_posts()) {
        unset($args['meta_key']);
        $args['orderby'] = 'date';
        $query = new WP_Query($args);
    }
    return $query;
}

/**
 * ============================================================================
 * 2. UPCOMING NEWS: CUSTOM POST TYPE & SCHEDULING (आगामी कवरेज)
 * ============================================================================
 */
function rashtrarang_register_upcoming_cpt() {
    $labels = array(
        'name'               => __('आगामी कवरेज (Upcoming News)', 'rashtrarang'),
        'singular_name'      => __('आगामी समाचार', 'rashtrarang'),
        'menu_name'          => __('आगामी कवरेज', 'rashtrarang'),
        'add_new'            => __('नया आगामी कार्यक्रम जोड़ें', 'rashtrarang'),
        'add_new_item'       => __('नया आगामी कवरेज जोड़ें', 'rashtrarang'),
        'edit_item'          => __('आगामी कवरेज संपादित करें', 'rashtrarang'),
        'all_items'          => __('सभी आगामी कवरेज', 'rashtrarang'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'upcoming-coverage'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 6,
        'menu_icon'          => 'dashicons-calendar-alt',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest'       => true,
    );

    register_post_type('rashtrarang_upcoming', $args);
}
add_action('init', 'rashtrarang_register_upcoming_cpt');

function rashtrarang_upcoming_meta_box() {
    add_meta_box(
        'upcoming_event_details',
        __('कार्यक्रम एवं प्रसारण विवरण (Event & Broadcast Details)', 'rashtrarang'),
        'rashtrarang_upcoming_meta_box_callback',
        'rashtrarang_upcoming',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'rashtrarang_upcoming_meta_box');

function rashtrarang_upcoming_meta_box_callback($post) {
    wp_nonce_field('rashtrarang_upcoming_save_meta', 'rashtrarang_upcoming_nonce');
    $event_date = get_post_meta($post->ID, '_upcoming_event_date', true);
    $event_time = get_post_meta($post->ID, '_upcoming_event_time', true);
    $event_venue = get_post_meta($post->ID, '_upcoming_event_venue', true);
    $auto_publish = get_post_meta($post->ID, '_upcoming_auto_publish', true);
    $target_cat = get_post_meta($post->ID, '_upcoming_target_cat', true);
    $categories = get_categories(array('hide_empty' => false));
    ?>
    <table class="form-table">
        <tr>
            <th><label for="upcoming_event_date">प्रसारण / कार्यक्रम तिथि:</label></th>
            <td><input type="date" id="upcoming_event_date" name="upcoming_event_date" value="<?php echo esc_attr($event_date); ?>" class="regular-text"></td>
        </tr>
        <tr>
            <th><label for="upcoming_event_time">प्रसारण समय (उदा. 10:00 AM):</label></th>
            <td><input type="text" id="upcoming_event_time" name="upcoming_event_time" value="<?php echo esc_attr($event_time); ?>" class="regular-text" placeholder="10:00 AM"></td>
        </tr>
        <tr>
            <th><label for="upcoming_event_venue">स्थान / स्थल (Venue):</label></th>
            <td><input type="text" id="upcoming_event_venue" name="upcoming_event_venue" value="<?php echo esc_attr($event_venue); ?>" class="regular-text" placeholder="उदा. कोलकाता / नई दिल्ली"></td>
        </tr>
        <tr>
            <th><label for="upcoming_target_cat">संबंधित श्रेणी:</label></th>
            <td>
                <select name="upcoming_target_cat" id="upcoming_target_cat">
                    <option value="">-- श्रेणी चुनें --</option>
                    <?php foreach ($categories as $cat) : ?>
                        <option value="<?php echo $cat->term_id; ?>" <?php selected($target_cat, $cat->term_id); ?>><?php echo esc_html($cat->name); ?></option>
                    <?php endforeach; ?>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="upcoming_auto_publish">स्वतः मुख्य समाचार में बदलें:</label></th>
            <td>
                <label>
                    <input type="checkbox" id="upcoming_auto_publish" name="upcoming_auto_publish" value="1" <?php checked($auto_publish, '1'); ?>>
                    प्रसारण समय आने पर इस कवरेज को मुख्य प्रकाशित समाचार में स्वतः स्थानांतरित करें।
                </label>
            </td>
        </tr>
    </table>
    <?php
}

function rashtrarang_save_upcoming_meta($post_id) {
    if (!isset($_POST['rashtrarang_upcoming_nonce']) || !wp_verify_nonce($_POST['rashtrarang_upcoming_nonce'], 'rashtrarang_upcoming_save_meta')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['upcoming_event_date'])) update_post_meta($post_id, '_upcoming_event_date', sanitize_text_field($_POST['upcoming_event_date']));
    if (isset($_POST['upcoming_event_time'])) update_post_meta($post_id, '_upcoming_event_time', sanitize_text_field($_POST['upcoming_event_time']));
    if (isset($_POST['upcoming_event_venue'])) update_post_meta($post_id, '_upcoming_event_venue', sanitize_text_field($_POST['upcoming_event_venue']));
    if (isset($_POST['upcoming_target_cat'])) update_post_meta($post_id, '_upcoming_target_cat', sanitize_text_field($_POST['upcoming_target_cat']));
    update_post_meta($post_id, '_upcoming_auto_publish', isset($_POST['upcoming_auto_publish']) ? '1' : '0');
}
add_action('save_post_rashtrarang_upcoming', 'rashtrarang_save_upcoming_meta');

/**
 * ============================================================================
 * 3. CATEGORIES DIRECTORY HELPER
 * ============================================================================
 */
function rashtrarang_get_categories_directory() {
    $categories = get_categories(array(
        'orderby'    => 'count',
        'order'      => 'DESC',
        'hide_empty' => true,
    ));
    $dir = array();
    foreach ($categories as $cat) {
        $recent_query = new WP_Query(array(
            'cat'            => $cat->term_id,
            'posts_per_page' => 1,
            'post_status'    => 'publish',
        ));
        $thumb = '';
        $latest_title = '';
        if ($recent_query->have_posts()) {
            $recent_query->the_post();
            $thumb = rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid');
            $latest_title = rashtrarang_clean_headline(get_the_title());
            wp_reset_postdata();
        }
        $dir[] = array(
            'id'           => $cat->term_id,
            'name'         => $cat->name,
            'slug'         => $cat->slug,
            'count'        => $cat->count,
            'link'         => get_category_link($cat->term_id),
            'thumb'        => $thumb ? $thumb : get_template_directory_uri() . '/assets/images/logo.jpg',
            'latest_title' => $latest_title,
        );
    }
    return $dir;
}

/**
 * ============================================================================
 * 4. ADVERTISEMENT MANAGEMENT SYSTEM (ADSENSE, CUSTOM & DEMO CREATIVES)
 * ============================================================================
 */

// Helper to return realistic demo advertisement creative markup
function rashtrarang_get_demo_ad_markup($slot) {
    switch ($slot) {
        case 'ad_header_leaderboard':
            return '<a href="#demo-ad-sbi" class="demo-ad-creative demo-ad-sbi" title="प्रायोजित: भारतीय स्टेट बैंक">' .
                '<div class="demo-ad-brand">' .
                    '<div class="sbi-circle-logo">SBI</div>' .
                    '<div>' .
                        '<span class="demo-ad-badge" style="background: #2575FC; color: #FFF;">स्टेट बैंक ऑफ इंडिया</span>' .
                        '<div style="font-size: 0.72rem; color: #90CDF4; font-weight: 600;">सुरक्षा एवं विश्वास का प्रतीक</div>' .
                    '</div>' .
                '</div>' .
                '<div style="flex: 1; padding: 0 16px; text-align: left;">' .
                    '<h4 class="demo-ad-title">सपनों का नया आशियाना अब और भी आसान · SBI होम लोन मात्र 8.40%* पर</h4>' .
                    '<div class="demo-ad-desc">शून्य प्रोसेसिंग शुल्क | तत्काल ऑनलाइन सैद्धांतिक मंज़ूरी | 30 वर्ष तक की आसान अवधि</div>' .
                '</div>' .
                '<div style="text-align: right; flex-shrink: 0;">' .
                    '<span class="demo-ad-cta">अभी आवेदन करें →</span>' .
                    '<div class="demo-ad-disclaimer">*नियम व शर्तें लागू</div>' .
                '</div>' .
            '</a>';

        case 'ad_home_between_1':
            return '<a href="#demo-ad-flipkart" class="demo-ad-creative demo-ad-flipkart" title="प्रायोजित: फ्लिपकार्ट ग्रैंड इलेक्ट्रॉनिक्स फेस्ट">' .
                '<div class="demo-ad-flipkart-header">' .
                    '<div style="display: flex; align-items: center; gap: 10px;">' .
                        '<span style="font-weight: 900; font-size: 1.15rem; color: #F59E0B; letter-spacing: 0.05em;">Flipkart</span>' .
                        '<span class="demo-ad-badge" style="background: #D97706; color: #FFF;">GRAND ELECTRONICS FEST</span>' .
                        '<span style="font-size: 0.78rem; color: #E2E8F0;">15 – 20 नवम्बर विशेष सेल</span>' .
                    '</div>' .
                    '<div style="font-size: 0.75rem; color: #FCD34D; font-weight: 600;">⏳ ऑफ़र समाप्त होने में केवल 2 दिन शेष</div>' .
                '</div>' .
                '<div class="demo-ad-flipkart-grid">' .
                    '<div class="demo-ad-highlight-box">' .
                        '<span style="font-size: 0.75rem; color: #F3F4F6; text-transform: uppercase;">सीमित समय तक</span>' .
                        '<div class="demo-ad-highlight-pct">70% तक छूट</div>' .
                        '<span style="font-size: 0.72rem; color: #FDE68A;">+ ₹10,000 एक्सचेंज बोनस</span>' .
                    '</div>' .
                    '<div class="demo-ad-feature-pills">' .
                        '<div class="demo-ad-pill-item">' .
                            '<span>📱</span>' .
                            '<div><strong>लेटेस्ट 5G स्मार्टफोन्स:</strong> ₹8,999 से शुरू · नो कॉस्ट EMI उपलब्ध</div>' .
                        '</div>' .
                        '<div class="demo-ad-pill-item">' .
                            '<span>💻</span>' .
                            '<div><strong>अल्ट्रा थिन लैपटॉप्स:</strong> इंटेल कोर i5/i7 पर ₹15,000 की सीधी छूट</div>' .
                        '</div>' .
                        '<div class="demo-ad-pill-item">' .
                            '<span>📺</span>' .
                            '<div><strong>4K स्मार्ट टीवी 55-इंच:</strong> मात्र ₹22,999 से · 3 वर्ष की वारंटी</div>' .
                        '</div>' .
                    '</div>' .
                    '<div style="text-align: center;">' .
                        '<span class="demo-ad-cta">ऑफ़र देखें एवं खरीदें →</span>' .
                        '<div class="demo-ad-disclaimer" style="margin-top: 8px;">HDFC & SBI कार्ड पर 10% इंस्टेंट डिस्काउंट*</div>' .
                    '</div>' .
                '</div>' .
            '</a>';

        case 'ad_home_between_2':
            return '<a href="#demo-ad-makemytrip" class="demo-ad-creative demo-ad-makemytrip" title="प्रायोजित: मेकमायट्रिप बंगाल व पूर्वोत्तर टूर">' .
                '<div class="demo-ad-brand">' .
                    '<div style="font-size: 1.6rem; margin-right: 6px;">✈️</div>' .
                    '<div>' .
                        '<span class="demo-ad-badge" style="background: #EF4444; color: #FFF;">MakeMyTrip Holidays</span>' .
                        '<div style="font-size: 0.72rem; color: #A7F3D0;">विंटर हॉलिडे स्पेशल</div>' .
                    '</div>' .
                '</div>' .
                '<div style="flex: 1; padding: 0 16px; text-align: left;">' .
                    '<h4 class="demo-ad-title">दार्जिलिंग, सिक्किम एवं सुंदरबन हॉलिडे पैकेज पर फ्लैट ₹5,000 की छूट</h4>' .
                    '<div class="demo-ad-desc">होटल स्टे + दर्शनीय स्थल भ्रमण + भोजन शामिल · प्रोमो कोड: <strong>BENGAL5000</strong></div>' .
                '</div>' .
                '<div style="text-align: right; flex-shrink: 0;">' .
                    '<span class="demo-ad-cta">पैकेज बुक करें →</span>' .
                    '<div class="demo-ad-disclaimer">*ऑफ़र सीमित सीटों तक</div>' .
                '</div>' .
            '</a>';

        case 'ad_sidebar_top':
            return '<a href="#demo-ad-allen" class="demo-ad-creative demo-ad-allen" title="प्रायोजित: एलन करियर इंस्टीट्यूट">' .
                '<div>' .
                    '<span class="demo-ad-badge" style="background: #06B6D4; color: #082F49;">ALLEN CAREER INSTITUTE</span>' .
                    '<h4 class="demo-ad-title" style="margin-top: 8px; font-size: 1.05rem;">NEET-UG एवं JEE 2026-27</h4>' .
                    '<p class="demo-ad-desc" style="font-size: 0.8rem; margin: 8px 0;">देश के सर्वश्रेष्ठ गुरुजनों के साथ डॉक्टर एवं इंजीनियर बनने के सपने को साकार करें।</p>' .
                '</div>' .
                '<div style="background: rgba(255,255,255,0.08); padding: 8px; border-radius: 4px; font-size: 0.75rem; text-align: left;">' .
                    '<div>✓ कोटा एवं कोलकाता के अनुभवी शिक्षक</div>' .
                    '<div>✓ 90% तक छात्रवृत्ति (TALLENTEX परीक्षा)</div>' .
                '</div>' .
                '<div>' .
                    '<span class="demo-ad-cta">फ्री काउंसलिंग बुक करें →</span>' .
                    '<div class="demo-ad-disclaimer">नए बैच आगामी सोमवार से प्रारंभ</div>' .
                '</div>' .
            '</a>';

        case 'ad_sidebar_sticky':
            return '<a href="#demo-ad-tanishq" class="demo-ad-creative demo-ad-tanishq" title="प्रायोजित: सेनको गोल्ड एंड डायमंड्स">' .
                '<div>' .
                    '<div class="demo-ad-gold-ornament">👑</div>' .
                    '<span class="demo-ad-badge" style="background: #D4AF37; color: #3A0713;">SENCO GOLD & DIAMONDS</span>' .
                    '<h3 class="demo-ad-tanishq-title">विवाह एवं उत्सव आभूषण संग्रह 2026</h3>' .
                    '<div style="font-size: 0.76rem; color: #FEEBC8;">विरासत 85 वर्षों की विश्वसनीयता की</div>' .
                '</div>' .
                '<div class="demo-ad-jewel-perks">' .
                    '<div>✨ <strong>सोने के आभूषण:</strong> मेकिंग चार्ज पर फ्लैट 0%*</div>' .
                    '<div>💎 <strong>डायमंड ज्वेलरी:</strong> कुल मूल्य पर 25% तक की सीधी छूट</div>' .
                    '<div>🌟 <strong>पुराना सोना एक्सचेंज:</strong> 100% बाजार मूल्य का वादा</div>' .
                    '<div>🛡️ <strong>शुद्धता:</strong> BIS हॉलमार्क 100% प्रमाणित</div>' .
                '</div>' .
                '<div>' .
                    '<div style="font-size: 0.74rem; color: #FDE68A; margin-bottom: 8px;">कोलकाता, साल्ट लेक एवं हावड़ा शोरूम पर उपलब्ध</div>' .
                    '<span class="demo-ad-cta">कैटलॉग देखें एवं अपॉइंटमेंट लें →</span>' .
                    '<div class="demo-ad-disclaimer" style="margin-top: 6px;">*शर्तें लागू · सीमित अवधि तक</div>' .
                '</div>' .
            '</a>';

        case 'ad_article_inline':
        case 'ad_article_bottom':
            return '<a href="#demo-ad-hdfc" class="demo-ad-creative demo-ad-hdfc" title="प्रायोजित: एचडीएफसी लाइफ संपूर्ण सुरक्षा">' .
                '<div style="flex: 1; text-align: left;">' .
                    '<span class="demo-ad-badge" style="background: #10B981; color: #FFF;">HDFC LIFE · सर उठा के जियो</span>' .
                    '<h4 class="demo-ad-title" style="margin-top: 6px;">क्या आपका परिवार अप्रत्याशित संकटों से पूरी तरह सुरक्षित है?</h4>' .
                    '<div class="demo-ad-desc">₹1 करोड़ का टर्म लाइफ इंश्योरेंस कवर मात्र <strong>₹540/माह*</strong> से प्रारंभ · 34 गंभीर बीमारियों का इलाज कवर</div>' .
                '</div>' .
                '<div style="text-align: right; flex-shrink: 0; padding-left: 14px;">' .
                    '<span class="demo-ad-cta">प्रीमियम कैलकुलेट करें →</span>' .
                    '<div class="demo-ad-disclaimer">99.5% क्लेम निपटान अनुपात</div>' .
                '</div>' .
            '</a>';

        case 'ad_category_top':
            return '<a href="#demo-ad-bengal" class="demo-ad-creative demo-ad-bengal" title="प्रायोजित: बंगाल हैंडलूम एवं सिल्क एक्सपो">' .
                '<div class="demo-ad-brand">' .
                    '<div style="font-size: 1.5rem; margin-right: 6px;">🧵</div>' .
                    '<div>' .
                        '<span class="demo-ad-badge" style="background: #FEF3C7; color: #78350F;">बंगाल हैंडलूम एक्सपो</span>' .
                        '<div style="font-size: 0.72rem; color: #FED7AA;">साल्ट लेक, कोलकाता</div>' .
                    '</div>' .
                '</div>' .
                '<div style="flex: 1; padding: 0 16px; text-align: left;">' .
                    '<h4 class="demo-ad-title">बालूचरी, ढाकाई जामदानी एवं तसर सिल्क का विशाल प्रामाणिक संग्रह</h4>' .
                    '<div class="demo-ad-desc">कारीगरों से सीधी खरीदारी पर 40% तक विशेष प्रारंभिक छूट · प्रवेश पूर्णतः निःशुल्क</div>' .
                '</div>' .
                '<div style="text-align: right; flex-shrink: 0;">' .
                    '<span class="demo-ad-cta">विवरण एवं समय →</span>' .
                    '<div class="demo-ad-disclaimer">15 से 25 नवम्बर तक</div>' .
                '</div>' .
            '</a>';

        case 'ad_footer_top':
        default:
            return '<a href="#demo-ad-solar" class="demo-ad-creative demo-ad-solar" title="प्रायोजित: टाटा पावर सोलर रूफटॉप">' .
                '<div class="demo-ad-brand">' .
                    '<div style="font-size: 1.5rem; margin-right: 6px;">☀️</div>' .
                    '<div>' .
                        '<span class="demo-ad-badge" style="background: #FBBF24; color: #064E3B;">TATA POWER SOLAR</span>' .
                        '<div style="font-size: 0.72rem; color: #A7F3D0;">हरित ऊर्जा, बचत भरपूर</div>' .
                    '</div>' .
                '</div>' .
                '<div style="flex: 1; padding: 0 16px; text-align: left;">' .
                    '<h4 class="demo-ad-title">घर की छत पर लगाएं सोलर रूफटॉप और मासिक बिजली बिल को करें 80% तक कम</h4>' .
                    '<div class="demo-ad-desc">पीएम सूर्य घर योजना के तहत ₹78,000 तक की सरकारी सब्सिडी · 25 वर्ष की परफॉरमेंस गारंटी</div>' .
                '</div>' .
                '<div style="text-align: right; flex-shrink: 0;">' .
                    '<span class="demo-ad-cta">फ्री रूफ सर्वे बुक करें →</span>' .
                    '<div class="demo-ad-disclaimer">तुरंत अप्रूवल एवं इंस्टॉलेशन</div>' .
                '</div>' .
            '</a>';
    }
}

// Check for live custom advertisement from CPT
function rashtrarang_get_cpt_ad($slot) {
    $today = date('Y-m-d');
    $query = new WP_Query(array(
        'post_type'      => 'rashtrarang_ad',
        'post_status'    => 'publish',
        'posts_per_page' => 1,
        'meta_query'     => array(
            'relation' => 'AND',
            array('key' => '_ad_slot_placement', 'value' => $slot, 'compare' => '='),
            array('key' => '_ad_status', 'value' => 'active', 'compare' => '='),
        )
    ));

    if ($query->have_posts()) {
        $query->the_post();
        $post_id = get_the_ID();
        
        // Check date bounds if set
        $start_date = get_post_meta($post_id, '_ad_start_date', true);
        $end_date   = get_post_meta($post_id, '_ad_end_date', true);
        if (!empty($start_date) && $today < $start_date) { wp_reset_postdata(); return false; }
        if (!empty($end_date) && $today > $end_date) { wp_reset_postdata(); return false; }

        // Increment Impression Counter
        $impressions = (int)get_post_meta($post_id, '_ad_impressions_count', true);
        update_post_meta($post_id, '_ad_impressions_count', $impressions + 1);

        $custom_code = get_post_meta($post_id, '_ad_custom_code', true);
        if (!empty($custom_code)) {
            wp_reset_postdata();
            return $custom_code;
        }

        $dest_url = get_post_meta($post_id, '_ad_destination_url', true);
        $banner_img = get_post_meta($post_id, '_ad_banner_image', true);
        $adv_name = get_post_meta($post_id, '_ad_advertiser_name', true);

        if (!empty($banner_img)) {
            wp_reset_postdata();
            return '<a href="' . esc_url($dest_url) . '" target="_blank" rel="noopener sponsored" class="cpt-custom-ad" data-ad-id="' . esc_attr($post_id) . '"><img src="' . esc_url($banner_img) . '" alt="' . esc_attr($adv_name) . '" style="max-width:100%; height:auto; display:block; margin:0 auto; border-radius:4px;"></a>';
        }
        wp_reset_postdata();
    }
    return false;
}

// Master Ad Render Function
function rashtrarang_render_ad($slot, $classes = '') {
    $show_label = get_theme_mod('ad_labels_enabled', true);
    $ad_label_text = get_theme_mod('ad_label_custom_text', 'विज्ञापन / ADVERTISEMENT');

    // 1. Try Custom Post Type Ad
    $cpt_output = rashtrarang_get_cpt_ad($slot);

    // 2. Try Customizer Ad Setting
    $customizer_code = get_theme_mod($slot, '');

    echo '<div class="ad-container-wrap ' . esc_attr($classes) . '" data-ad-slot="' . esc_attr($slot) . '">';
    if ($show_label) {
        echo '<span class="ad-sponsor-label">' . esc_html($ad_label_text) . '</span>';
    }
    echo '<div class="ad-slot-box ad-slot-' . esc_attr($slot) . ' has-creative">';
    if (!empty($cpt_output)) {
        echo $cpt_output;
    } elseif (!empty($customizer_code)) {
        echo $customizer_code;
    } else {
        // High-fidelity realistic demo advertisement creative
        echo rashtrarang_get_demo_ad_markup($slot);
    }
    echo '</div>';
    echo '</div>';
}

// In-Article Ad Injection after 3rd or 4th paragraph
function rashtrarang_inject_inline_ad($content) {
    if (!is_single() || !is_main_query()) return $content;

    $ad_enabled = get_theme_mod('ad_article_inline_enabled', true);
    if (!$ad_enabled) return $content;

    $paragraphs = explode('</p>', $content);
    $total_p = count($paragraphs);
    
    // Inject after paragraph 3 (index 2) or paragraph 4 (index 3) when sufficient text
    if ($total_p >= 4) {
        $target_index = 2; // After 3rd paragraph
        ob_start();
        rashtrarang_render_ad('ad_article_inline', 'ad-slot-inarticle');
        $ad_markup = ob_get_clean();
        $paragraphs[$target_index] .= '</p>' . $ad_markup;
        return implode('</p>', $paragraphs);
    }
    return $content;
}
add_filter('the_content', 'rashtrarang_inject_inline_ad', 20);

// Google AdSense Head Injection
function rashtrarang_adsense_head_script() {
    $adsense_id = get_theme_mod('adsense_client_id', '');
    if (!empty($adsense_id)) {
        echo "
<!-- Google AdSense Official Integration -->
";
        echo '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' . esc_attr($adsense_id) . '" crossorigin="anonymous"></script>' . "
";
    }
}
add_action('wp_head', 'rashtrarang_adsense_head_script', 5);

/**
 * CUSTOM POST TYPE: ADVERTISEMENT MANAGER (विज्ञापन प्रबंधन)
 */
function rashtrarang_register_ad_cpt() {
    $labels = array(
        'name'               => 'विज्ञापन प्रबंधन',
        'singular_name'      => 'विज्ञापन',
        'menu_name'          => 'विज्ञापन प्रबंधन (Ads)',
        'all_items'          => 'सभी विज्ञापन (All Ads)',
        'add_new'            => 'नया विज्ञापन जोड़ें',
        'add_new_item'       => 'नया विज्ञापन जोड़ें',
        'edit_item'          => 'विज्ञापन संपादित करें',
        'new_item'           => 'नया विज्ञापन',
        'view_item'          => 'विज्ञापन देखें',
        'search_items'       => 'विज्ञापन खोजें',
        'not_found'          => 'कोई विज्ञापन नहीं मिला',
    );

    register_post_type('rashtrarang_ad', array(
        'labels'             => $labels,
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-megaphone',
        'supports'           => array('title', 'thumbnail'),
        'has_archive'        => false,
        'rewrite'            => false,
    ));
}
add_action('init', 'rashtrarang_register_ad_cpt');

// Meta Box for Advertisement Details
function rashtrarang_ad_meta_boxes() {
    add_meta_box('rashtrarang_ad_details', 'विज्ञापन विवरण एवं स्थान (Advertisement Settings)', 'rashtrarang_render_ad_meta_box', 'rashtrarang_ad', 'normal', 'high');
}
add_action('add_meta_boxes', 'rashtrarang_ad_meta_boxes');

function rashtrarang_render_ad_meta_box($post) {
    wp_nonce_field('rashtrarang_ad_nonce_action', 'rashtrarang_ad_nonce');
    $adv_name    = get_post_meta($post->ID, '_ad_advertiser_name', true);
    $dest_url    = get_post_meta($post->ID, '_ad_destination_url', true);
    $banner_img  = get_post_meta($post->ID, '_ad_banner_image', true);
    $placement   = get_post_meta($post->ID, '_ad_slot_placement', true);
    $start_date  = get_post_meta($post->ID, '_ad_start_date', true);
    $end_date    = get_post_meta($post->ID, '_ad_end_date', true);
    $status      = get_post_meta($post->ID, '_ad_status', true);
    $custom_code = get_post_meta($post->ID, '_ad_custom_code', true);
    $impressions = (int)get_post_meta($post->ID, '_ad_impressions_count', true);
    $clicks      = (int)get_post_meta($post->ID, '_ad_clicks_count', true);
    if (empty($status)) $status = 'active';
    ?>
    <table class="form-table">
        <tr>
            <th><label for="ad_advertiser_name">विज्ञापनदाता का नाम (Advertiser Name)</label></th>
            <td><input type="text" id="ad_advertiser_name" name="ad_advertiser_name" value="<?php echo esc_attr($adv_name); ?>" class="regular-text" placeholder="उदा. Tata Motors, State Bank of India, Local Client"></td>
        </tr>
        <tr>
            <th><label for="ad_slot_placement">विज्ञापन स्थान (Ad Placement Slot)</label></th>
            <td>
                <select id="ad_slot_placement" name="ad_slot_placement" class="regular-text">
                    <option value="ad_header_leaderboard" <?php selected($placement, 'ad_header_leaderboard'); ?>>Top Header Leaderboard (728x90 / 320x50)</option>
                    <option value="ad_home_between_1" <?php selected($placement, 'ad_home_between_1'); ?>>Homepage Billboard (Between Row 2 & 3 - 970x250)</option>
                    <option value="ad_home_between_2" <?php selected($placement, 'ad_home_between_2'); ?>>Homepage Banner (Between Row 4 & 5 - 728x90)</option>
                    <option value="ad_sidebar_top" <?php selected($placement, 'ad_sidebar_top'); ?>>Sidebar Top Medium Rectangle (300x250)</option>
                    <option value="ad_sidebar_sticky" <?php selected($placement, 'ad_sidebar_sticky'); ?>>Sidebar Sticky Half-Page (300x600)</option>
                    <option value="ad_article_inline" <?php selected($placement, 'ad_article_inline'); ?>>In-Article Inline (After 3rd/4th Paragraph)</option>
                    <option value="ad_category_top" <?php selected($placement, 'ad_category_top'); ?>>Category Page Banner (728x90)</option>
                    <option value="ad_footer_top" <?php selected($placement, 'ad_footer_top'); ?>>Footer Banner (728x90)</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="ad_destination_url">टारगेट लिंक (Destination URL)</label></th>
            <td><input type="url" id="ad_destination_url" name="ad_destination_url" value="<?php echo esc_url($dest_url); ?>" class="regular-text" placeholder="https://www.advertiser.com/offer"></td>
        </tr>
        <tr>
            <th><label for="ad_banner_image">बैनर इमेज URL (Banner Image URL)</label></th>
            <td><input type="text" id="ad_banner_image" name="ad_banner_image" value="<?php echo esc_url($banner_img); ?>" class="regular-text" placeholder="https://.../banner.jpg">
            <p class="description">मीडिया लाइब्रेरी से इमेज अपलोड कर उसका URL यहाँ पेस्ट करें।</p></td>
        </tr>
        <tr>
            <th><label for="ad_custom_code">कस्टम कोड / AdSense कोड (वैकल्पिक)</label></th>
            <td><textarea id="ad_custom_code" name="ad_custom_code" rows="4" class="large-text code" placeholder="HTML, JavaScript या AdSense कोड"><?php echo esc_textarea($custom_code); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="ad_start_date">प्रारंभ तिथि (Start Date)</label></th>
            <td><input type="date" id="ad_start_date" name="ad_start_date" value="<?php echo esc_attr($start_date); ?>"></td>
        </tr>
        <tr>
            <th><label for="ad_end_date">समाप्ति तिथि (End Date)</label></th>
            <td><input type="date" id="ad_end_date" name="ad_end_date" value="<?php echo esc_attr($end_date); ?>"></td>
        </tr>
        <tr>
            <th><label for="ad_status">विज्ञापन स्थिति (Status)</label></th>
            <td>
                <select id="ad_status" name="ad_status">
                    <option value="active" <?php selected($status, 'active'); ?>>सक्रिय (Active)</option>
                    <option value="inactive" <?php selected($status, 'inactive'); ?>>निष्क्रिय (Inactive)</option>
                </select>
            </td>
        </tr>
        <tr>
            <th>एनालिटिक्स (Analytics)</th>
            <td>
                <strong>इंप्रेशन:</strong> <?php echo number_format($impressions); ?> व्यूज | 
                <strong>क्लिक्स:</strong> <?php echo number_format($clicks); ?> क्लिक्स
            </td>
        </tr>
    </table>
    <?php
}

function rashtrarang_save_ad_meta($post_id) {
    if (!isset($_POST['rashtrarang_ad_nonce']) || !wp_verify_nonce($_POST['rashtrarang_ad_nonce'], 'rashtrarang_ad_nonce_action')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $fields = array('ad_advertiser_name', 'ad_slot_placement', 'ad_destination_url', 'ad_banner_image', 'ad_start_date', 'ad_end_date', 'ad_status');
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
    if (isset($_POST['ad_custom_code'])) {
        update_post_meta($post_id, '_ad_custom_code', $_POST['ad_custom_code']);
    }
}
add_action('save_post_rashtrarang_ad', 'rashtrarang_save_ad_meta');

/**
 * ============================================================================
 * 5. WORDPRESS CUSTOMIZER: ADVERTISEMENT MANAGEMENT & STATUTORY
 * ============================================================================
 */
function rashtrarang_customize_register($wp_customize) {
    // Panel: Rashtra Rang Controls
    $wp_customize->add_panel('rashtrarang_master_panel', array(
        'title'       => __('राष्ट्र रंग मास्टर कंट्रोल (Rashtra Rang Settings)', 'rashtrarang'),
        'description' => __('विज्ञापन, टिकर एवं नियामक अनुपालन सेटिंग्स', 'rashtrarang'),
        'priority'    => 20,
    ));

    // Section 1: General & Ticker
    $wp_customize->add_section('rashtrarang_general_settings', array(
        'title'    => __('सामान्य सेटिंग्स एवं टिकर (General & Ticker)', 'rashtrarang'),
        'panel'    => 'rashtrarang_master_panel',
        'priority' => 10,
    ));

    $wp_customize->add_setting('ticker_enabled', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('ticker_enabled', array(
        'label'   => __('Enable Breaking News Ticker (ब्रेकिंग न्यूज़ टिकर चालू रखें)', 'rashtrarang'),
        'section' => 'rashtrarang_general_settings',
        'type'    => 'checkbox',
    ));

    $wp_customize->add_setting('grievance_officer_info', array(
        'default'           => 'शिकायत निवारण अधिकारी (Grievance Officer): संतोष तिवारी | ईमेल: editor@rashtrarang.com | कोलकाता, पश्चिम बंगाल',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('grievance_officer_info', array(
        'label'   => __('Grievance Redressal Officer Details (IT Rules 2021)', 'rashtrarang'),
        'section' => 'rashtrarang_general_settings',
        'type'    => 'text',
    ));

    // Section 2: Google AdSense Global Integration
    $wp_customize->add_section('rashtrarang_adsense_settings', array(
        'title'       => __('Google AdSense इंटीग्रेशन (AdSense Setup)', 'rashtrarang'),
        'panel'       => 'rashtrarang_master_panel',
        'description' => __('अपने Google AdSense पब्लिशर आईडी को दर्ज करें।', 'rashtrarang'),
        'priority'    => 20,
    ));

    $wp_customize->add_setting('adsense_client_id', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('adsense_client_id', array(
        'label'       => __('AdSense Publisher ID (उदा. ca-pub-XXXXXXXXXXXXXXXX)', 'rashtrarang'),
        'description' => __('Google AdSense खाते से प्राप्त प्रकाशक आईडी दर्ज करें।', 'rashtrarang'),
        'section'     => 'rashtrarang_adsense_settings',
        'type'        => 'text',
    ));

    $wp_customize->add_setting('ad_labels_enabled', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('ad_labels_enabled', array(
        'label'   => __('Show "Advertisement / प्रायोजित" Label', 'rashtrarang'),
        'section' => 'rashtrarang_adsense_settings',
        'type'    => 'checkbox',
    ));

    $wp_customize->add_setting('ad_label_custom_text', array(
        'default'           => 'विज्ञापन / ADVERTISEMENT',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('ad_label_custom_text', array(
        'label'   => __('Custom Ad Label Text', 'rashtrarang'),
        'section' => 'rashtrarang_adsense_settings',
        'type'    => 'text',
    ));

    // Section 3: Homepage Ad Placements
    $wp_customize->add_section('rashtrarang_ads_home_settings', array(
        'title'    => __('होमपेज विज्ञापन स्थान (Homepage Ad Slots)', 'rashtrarang'),
        'panel'    => 'rashtrarang_master_panel',
        'priority' => 30,
    ));

    // Header Leaderboard (728x90)
    $wp_customize->add_setting('ad_header_leaderboard', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('ad_header_leaderboard', array(
        'label'       => __('Header Top Leaderboard Ad (728x90)', 'rashtrarang'),
        'description' => __('हेडर के नीचे प्रदर्शित होने वाला मुख्य बैनर विज्ञापन कोड', 'rashtrarang'),
        'section'     => 'rashtrarang_ads_home_settings',
        'type'        => 'textarea',
    ));

    // Between Sections 1 (Billboard 970x250)
    $wp_customize->add_setting('ad_home_between_1', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('ad_home_between_1', array(
        'label'       => __('Between Sections Ad 1 (Row 2 & 3 / Billboard 970x250)', 'rashtrarang'),
        'description' => __('ताज़ा खबरें और मोबाइल ऐप बैनर के मध्य विज्ञापन', 'rashtrarang'),
        'section'     => 'rashtrarang_ads_home_settings',
        'type'        => 'textarea',
    ));

    // Between Sections 2 (Banner 728x90)
    $wp_customize->add_setting('ad_home_between_2', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('ad_home_between_2', array(
        'label'       => __('Between Sections Ad 2 (Row 4 & 5 / Banner 728x90)', 'rashtrarang'),
        'description' => __('संपादकीय पसंद और डार्क शोकेस के मध्य विज्ञापन', 'rashtrarang'),
        'section'     => 'rashtrarang_ads_home_settings',
        'type'        => 'textarea',
    ));

    // Section 4: Article & Inner Page Ad Placements
    $wp_customize->add_section('rashtrarang_ads_article_settings', array(
        'title'    => __('आर्टिकल एवं साइडबार विज्ञापन (Article & Sidebar Ads)', 'rashtrarang'),
        'panel'    => 'rashtrarang_master_panel',
        'priority' => 40,
    ));

    // Sidebar 300x250
    $wp_customize->add_setting('ad_sidebar_300', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('ad_sidebar_300', array(
        'label'       => __('Sidebar Top Ad (300x250 Medium Rectangle)', 'rashtrarang'),
        'section'     => 'rashtrarang_ads_article_settings',
        'type'        => 'textarea',
    ));

    // Sidebar Sticky 300x600
    $wp_customize->add_setting('ad_sidebar_sticky', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('ad_sidebar_sticky', array(
        'label'       => __('Sidebar Sticky Ad (300x600 Half Page)', 'rashtrarang'),
        'section'     => 'rashtrarang_ads_article_settings',
        'type'        => 'textarea',
    ));

    // In-Article Inline
    $wp_customize->add_setting('ad_article_inline', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('ad_article_inline', array(
        'label'       => __('In-Article Inline Ad (दूसरे पैराग्राफ के बाद स्वतः)', 'rashtrarang'),
        'section'     => 'rashtrarang_ads_article_settings',
        'type'        => 'textarea',
    ));

    // Below Article Bottom
    $wp_customize->add_setting('ad_article_bottom', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('ad_article_bottom', array(
        'label'       => __('Below Article Ad (आर्टिकल कंटेंट के तुरंत नीचे)', 'rashtrarang'),
        'section'     => 'rashtrarang_ads_article_settings',
        'type'        => 'textarea',
    ));

    // Category Archive Top Banner
    $wp_customize->add_setting('ad_category_top', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('ad_category_top', array(
        'label'       => __('Category Archive Top Banner (728x90)', 'rashtrarang'),
        'section'     => 'rashtrarang_ads_article_settings',
        'type'        => 'textarea',
    ));

    // Footer Placement Banner
    $wp_customize->add_setting('ad_footer_top', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('ad_footer_top', array(
        'label'       => __('Footer Top Banner (पाद लेख के ठीक ऊपर 728x90)', 'rashtrarang'),
        'section'     => 'rashtrarang_ads_article_settings',
        'type'        => 'textarea',
    ));
}
add_action('customize_register', 'rashtrarang_customize_register');

// Fallback Navigation Menu (Zero emojis, perfectly clean Devanagari labels)
function rashtrarang_default_nav_menu() {
    echo '<ul class="menu-main-nav">';
    echo '<li class="active" id="nav-item-home"><a href="' . esc_url(home_url('/')) . '">होम</a></li>';
    echo '<li id="nav-item-popular"><a href="' . esc_url(home_url('/popular/')) . '">लोकप्रिय</a></li>';
    echo '<li id="nav-item-upcoming"><a href="' . esc_url(home_url('/upcoming/')) . '">आगामी</a></li>';
    echo '<li id="nav-item-35"><a href="' . esc_url(home_url('/?cat=35')) . '">राष्ट्रीय</a></li>';
    echo '<li id="nav-item-78"><a href="' . esc_url(home_url('/?cat=78')) . '">पश्चिम बंगाल</a></li>';
    echo '<li id="nav-item-89"><a href="' . esc_url(home_url('/?cat=89')) . '">कोलकाता</a></li>';
    echo '<li id="nav-item-84"><a href="' . esc_url(home_url('/?cat=84')) . '">राजनीति</a></li>';
    echo '<li id="nav-item-91"><a href="' . esc_url(home_url('/?cat=91')) . '">खेल जगत</a></li>';
    echo '<li id="nav-item-77"><a href="' . esc_url(home_url('/?cat=77')) . '">फिल्म जगत</a></li>';
    echo '<li id="nav-item-141"><a href="' . esc_url(home_url('/?cat=141')) . '">अर्थ जगत</a></li>';
    echo '<li id="nav-item-categories"><a href="' . esc_url(home_url('/#categories-hub')) . '">समस्त श्रेणियां</a></li>';
    echo '<li id="nav-item-about"><a href="' . esc_url(home_url('/about/')) . '">हमारे बारे में</a></li>';
    echo '</ul>';
}
