const fs = require('fs');

let fn = fs.readFileSync('rashtrarang-theme/functions.php', 'utf8');

// Replace customize_register and append all new systems
const newSystems = `
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
 * 4. ADVERTISEMENT MANAGEMENT SYSTEM (ADSENSE & CUSTOM BANNERS)
 * ============================================================================
 */
function rashtrarang_render_ad($slot, $classes = '') {
    $ad_code = get_theme_mod($slot, '');
    $show_label = get_theme_mod('ad_labels_enabled', true);
    $ad_label_text = get_theme_mod('ad_label_custom_text', 'विज्ञापन / ADVERTISEMENT');

    $slot_names = array(
        'ad_header_leaderboard' => '728x90 Leaderboard (Header)',
        'ad_home_between_1'     => '970x250 Billboard (Between Row 2 & 3)',
        'ad_home_between_2'     => '728x90 Banner (Between Row 4 & 5)',
        'ad_sidebar_top'        => '300x250 Medium Rectangle (Sidebar)',
        'ad_sidebar_sticky'     => '300x600 Half Page (Sidebar Sticky)',
        'ad_article_inline'     => 'In-Article Responsive Banner (Mid-content)',
        'ad_article_bottom'     => '728x90 / Matched Content (Below Article)',
        'ad_category_top'       => '728x90 Banner (Category Archive Top)',
        'ad_footer_top'         => '728x90 Banner (Above Footer)',
    );

    echo '<div class="ad-container-wrap ' . esc_attr($classes) . '" data-ad-slot="' . esc_attr($slot) . '">';
    if ($show_label) {
        echo '<span class="ad-sponsor-label">' . esc_html($ad_label_text) . '</span>';
    }
    echo '<div class="ad-slot-box ad-slot-' . esc_attr($slot) . '">';
    if (!empty($ad_code)) {
        echo $ad_code;
    } else {
        $placeholder_text = isset($slot_names[$slot]) ? $slot_names[$slot] : 'Ad Space';
        echo '<div class="ad-placeholder-inner"><span>' . esc_html($placeholder_text) . '</span><small>Google AdSense / HTML5 Banner Slot</small></div>';
    }
    echo '</div>';
    echo '</div>';
}

function rashtrarang_inject_inline_ad($content) {
    if (!is_single() || !is_main_query()) return $content;

    $ad_enabled = get_theme_mod('ad_article_inline_enabled', true);
    if (!$ad_enabled) return $content;

    $paragraphs = explode('</p>', $content);
    $total_p = count($paragraphs);
    if ($total_p >= 3) {
        $target_index = 1;
        ob_start();
        rashtrarang_render_ad('ad_article_inline', 'ad-slot-inarticle');
        $ad_markup = ob_get_clean();
        $paragraphs[$target_index] .= '</p>' . $ad_markup;
        return implode('</p>', $paragraphs);
    }
    return $content;
}
add_filter('the_content', 'rashtrarang_inject_inline_ad', 20);

function rashtrarang_adsense_head_script() {
    $adsense_id = get_theme_mod('adsense_client_id', '');
    if (!empty($adsense_id)) {
        echo "\\n<!-- Google AdSense Official Script -->\\n";
        echo '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' . esc_attr($adsense_id) . '" crossorigin="anonymous"></script>' . "\\n";
    }
}
add_action('wp_head', 'rashtrarang_adsense_head_script', 5);

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
`;

// Replace older customize function with new complete systems
const cutIdx = fn.indexOf('function rashtrarang_customize_register');
if (cutIdx !== -1) {
    fn = fn.substring(0, cutIdx) + newSystems;
    fs.writeFileSync('rashtrarang-theme/functions.php', fn, 'utf8');
    console.log('Successfully updated rashtrarang-theme/functions.php with complete new systems!');
} else {
    console.log('Could not find customize_register cut point.');
}
