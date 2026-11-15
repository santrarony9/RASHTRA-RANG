const fs = require('fs');

const indexPhpContent = `<?php
/**
 * Master Homepage Template - Rashtra Rang Blocksy Daily News Edition
 * Complete Editorial Grid with Popular News, Upcoming Coverage, Categories Hub & Ad Management.
 *
 * @package RashtraRang
 */

get_header(); ?>

<!-- 1. TOP HEADER LEADERBOARD ADVERTISEMENT (728x90 / Google AdSense) -->
<div class="ct-container">
    <?php rashtrarang_render_ad('ad_header_leaderboard', 'ad-slot-leaderboard reveal-on-scroll'); ?>
</div>

<main id="main" class="site-main">

    <!-- ==========================================================================
       ROW 1: HERO MAGAZINE ROW (8 + 4 COLUMNS)
       ========================================================================== -->
    <section class="blocksy-hero-row reveal-on-scroll">
        <div class="ct-container">
            <div class="blocksy-row-8-4">
                <!-- Col 8: Lead Hero Story + Trending Subgrid -->
                <div class="col-8">
                    <?php
                    $hero_query = new WP_Query(array(
                        'posts_per_page'      => 4,
                        'post_status'         => 'publish',
                        'ignore_sticky_posts' => 1,
                    ));

                    if ($hero_query->have_posts()) :
                        $h_idx = 0;
                        $trending_posts = array();
                        while ($hero_query->have_posts()) : $hero_query->the_post();
                            $h_idx++;
                            if ($h_idx === 1) :
                                $cats = get_the_category();
                                $cat_name = !empty($cats) ? $cats[0]->name : 'ख़ास खबर';
                    ?>
                        <article class="hero-lead-card">
                            <div class="hero-lead-media ct-media-zoom">
                                <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-hero'); ?>" 
                                     alt="<?php the_title_attribute(); ?>" loading="eager">
                                <span class="hero-badge">ख़ास खबर (HOT POST)</span>
                            </div>
                            <div class="hero-lead-body">
                                <h2 class="hero-lead-title">
                                    <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                </h2>
                                <p class="hero-lead-excerpt"><?php echo wp_trim_words(strip_tags(get_the_excerpt()), 24); ?></p>
                                <div class="hero-meta-ribbon">
                                    <span><?php the_author(); ?></span> • <span><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span> • <span>3 मिनट पढ़ें</span>
                                </div>
                            </div>
                        </article>
                    <?php 
                            else :
                                $trending_posts[] = get_post();
                            endif;
                        endwhile;
                        wp_reset_postdata();
                    ?>

                    <!-- Trending Now Sub-Grid -->
                    <div class="trending-now-section">
                        <div class="block-heading-row">
                            <h4 class="block-title">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                                ट्रेंडिंग नाउ (Trending Now)
                            </h4>
                        </div>
                        <div class="trending-grid-3">
                            <?php foreach ($trending_posts as $t_post) : ?>
                            <article class="card-trending-mini">
                                <div class="card-media ct-media-zoom">
                                    <img src="<?php echo rashtrarang_get_post_image($t_post->ID, 'rashtrarang-thumb'); ?>" 
                                         alt="<?php echo esc_attr(get_the_title($t_post->ID)); ?>" loading="lazy">
                                </div>
                                <div class="card-body">
                                    <span class="badge-cat">ट्रेंडिंग</span>
                                    <h3 class="card-title">
                                        <a href="<?php echo esc_url(get_permalink($t_post->ID)); ?>"><?php echo esc_html(rashtrarang_clean_headline(get_the_title($t_post->ID))); ?></a>
                                    </h3>
                                    <span class="card-meta" style="font-size:0.72rem; color:var(--color-text-muted);"><?php echo rashtrarang_hindi_date(get_the_time('U', $t_post->ID)); ?></span>
                                </div>
                            </article>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <?php endif; ?>
                </div>

                <!-- Col 4: Breaking News Vertical Stack -->
                <div class="col-4">
                    <div class="breaking-news-box">
                        <div class="block-heading-row">
                            <h4 class="block-title">ब्रेकिंग न्यूज़ (Breaking News)</h4>
                        </div>
                        <div class="breaking-news-list">
                            <?php
                            $breaking_query = new WP_Query(array(
                                'posts_per_page'      => 5,
                                'offset'              => 4,
                                'post_status'         => 'publish',
                                'ignore_sticky_posts' => 1,
                            ));

                            if ($breaking_query->have_posts()) :
                                while ($breaking_query->have_posts()) : $breaking_query->the_post();
                            ?>
                                <article class="breaking-item-card">
                                    <div class="breaking-item-thumb ct-media-zoom">
                                        <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-thumb'); ?>" 
                                             alt="<?php the_title_attribute(); ?>" loading="lazy">
                                    </div>
                                    <div class="breaking-item-content">
                                        <span class="item-cat">ताज़ा</span>
                                        <h3 class="item-title">
                                            <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                        </h3>
                                        <span class="item-date"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                                    </div>
                                </article>
                            <?php endwhile; wp_reset_postdata(); endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================================================
       ROW 2: TWO-COLUMN FEATURE (6 + 6 COLUMNS)
       ========================================================================== -->
    <section class="blocksy-feature-2col reveal-on-scroll">
        <div class="ct-container">
            <div class="blocksy-row-6-6">
                <!-- Col 6 (Left): Breaking News Lead Story -->
                <div class="col-6">
                    <div class="block-heading-row">
                        <h4 class="block-title">ताज़ा खबरें (Breaking News)</h4>
                    </div>
                    <?php
                    $lead_query = new WP_Query(array(
                        'cat'                 => 78, // West Bengal
                        'posts_per_page'      => 1,
                        'post_status'         => 'publish',
                        'ignore_sticky_posts' => 1,
                    ));
                    if ($lead_query->have_posts()) :
                        while ($lead_query->have_posts()) : $lead_query->the_post();
                    ?>
                        <article class="card-featured-vertical">
                            <div class="card-media ct-media-zoom">
                                <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-hero'); ?>" 
                                     alt="<?php the_title_attribute(); ?>" loading="lazy">
                                <span class="badge-cat" style="position:absolute; top:12px; left:12px;">पश्चिम बंगाल</span>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">
                                    <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                </h2>
                                <p class="card-excerpt"><?php echo wp_trim_words(strip_tags(get_the_excerpt()), 22); ?></p>
                                <div class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?> • 2 मिनट पढ़ें</div>
                            </div>
                        </article>
                    <?php endwhile; wp_reset_postdata(); endif; ?>
                </div>

                <!-- Col 6 (Right): Popular Now 2x2 Grid -->
                <div class="col-6">
                    <div class="block-heading-row">
                        <h4 class="block-title">लोकप्रिय समाचार (Popular Now)</h4>
                    </div>
                    <div class="popular-grid-2x2">
                        <?php
                        $popular_query = rashtrarang_get_popular_query(4);
                        if ($popular_query->have_posts()) :
                            while ($popular_query->have_posts()) : $popular_query->the_post();
                                $cats = get_the_category();
                                $c_name = !empty($cats) ? $cats[0]->name : 'लोकप्रिय';
                        ?>
                            <article class="card-popular-grid">
                                <div class="card-media ct-media-zoom">
                                    <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                         alt="<?php the_title_attribute(); ?>" loading="lazy">
                                    <span class="badge-cat" style="position:absolute; top:8px; left:8px;"><?php echo esc_html($c_name); ?></span>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">
                                        <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                    </h3>
                                    <span class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?> • <?php echo rashtrarang_get_post_views(get_the_ID()); ?></span>
                                </div>
                            </article>
                        <?php endwhile; wp_reset_postdata(); endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================================================
       FEATURE 2: UPCOMING NEWS & SCHEDULED COVERAGE (आगामी कवरेज एवं घोषणाएं)
       ========================================================================== -->
    <section class="blocksy-upcoming-section reveal-on-scroll">
        <div class="ct-container">
            <div class="upcoming-box-container">
                <div class="upcoming-header-row">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="upcoming-badge-live">
                            <span class="upcoming-pulse-dot"></span>
                            आगामी कवरेज (Upcoming Coverage)
                        </span>
                        <span style="font-size: 0.85rem; color: var(--color-text-muted);">आगामी महत्वपूर्ण कार्यक्रम एवं लाइव प्रसारण घोषणाएं</span>
                    </div>
                    <a href="<?php echo esc_url(home_url('/upcoming-coverage/')); ?>" class="preview-btn" style="font-size:0.75rem; text-decoration:none;">सभी आगामी कार्यक्रम →</a>
                </div>

                <div class="upcoming-cards-grid-3">
                    <?php
                    $upcoming_query = new WP_Query(array(
                        'post_type'      => 'rashtrarang_upcoming',
                        'posts_per_page' => 3,
                        'post_status'    => 'publish',
                    ));

                    if ($upcoming_query->have_posts()) :
                        while ($upcoming_query->have_posts()) : $upcoming_query->the_post();
                            $u_date = get_post_meta(get_the_ID(), '_upcoming_event_date', true);
                            $u_time = get_post_meta(get_the_ID(), '_upcoming_event_time', true);
                            $u_venue = get_post_meta(get_the_ID(), '_upcoming_event_venue', true);
                            $disp_date = !empty($u_date) ? date('d M Y', strtotime($u_date)) : 'शीघ्र आ रहा है';
                            if (!empty($u_time)) $disp_date .= ' | ' . $u_time;
                    ?>
                        <article class="card-upcoming-item">
                            <div class="card-media ct-media-zoom">
                                <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                     alt="<?php the_title_attribute(); ?>" loading="lazy">
                                <span class="upcoming-datetime-badge">🗓️ <?php echo esc_html($disp_date); ?></span>
                            </div>
                            <div class="card-body">
                                <?php if (!empty($u_venue)) : ?>
                                    <div class="upcoming-venue">📍 <?php echo esc_html($u_venue); ?></div>
                                <?php endif; ?>
                                <h3 class="card-title">
                                    <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                </h3>
                                <a href="javascript:void(0)" onclick="setUpcomingReminder('<?php echo esc_js(get_the_title()); ?>', '<?php echo esc_js($disp_date); ?>')" class="btn-reminder">
                                    🔔 रिमाइंडर सेट करें
                                </a>
                            </div>
                        </article>
                    <?php endwhile; wp_reset_postdata(); else : 
                        // Fallback: Editorial Scheduled Events if no CPT posts added yet
                        $sample_upcoming = array(
                            array('title' => 'पश्चिम बंगाल विधानसभा शीतकालीन सत्र: विशेष लाइव रिपोर्टिंग', 'date' => '18 नवम्बर 2026 | प्रातः 10:00 बजे', 'venue' => 'कोलकाता विधान सौध', 'cat' => 'पश्चिम बंगाल'),
                            array('title' => 'भारत बनाम ऑस्ट्रेलिया टेस्ट सीरीज: मैच विश्लेषण एवं लाइव कवरेज', 'date' => '22 नवम्बर 2026 | दोपहर 01:30 बजे', 'venue' => 'ईडन गार्डन्स, कोलकाता', 'cat' => 'खेल जगत'),
                            array('title' => 'राष्ट्र रंग वार्षिक विचार मंच 2026: नीति एवं अर्थतंत्र संगोष्ठी', 'date' => '28 नवम्बर 2026 | प्रातः 11:00 बजे', 'venue' => 'साइंस सिटी ऑडिटोरियम', 'cat' => 'अर्थ जगत')
                        );
                        foreach ($sample_upcoming as $u) :
                    ?>
                        <article class="card-upcoming-item">
                            <div class="card-media ct-media-zoom">
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.jpg" alt="<?php echo esc_attr($u['title']); ?>" loading="lazy">
                                <span class="upcoming-datetime-badge">🗓️ <?php echo esc_html($u['date']); ?></span>
                            </div>
                            <div class="card-body">
                                <div class="upcoming-venue">📍 <?php echo esc_html($u['venue']); ?> • <strong><?php echo esc_html($u['cat']); ?></strong></div>
                                <h3 class="card-title"><?php echo esc_html($u['title']); ?></h3>
                                <a href="javascript:void(0)" onclick="setUpcomingReminder('<?php echo esc_js($u['title']); ?>', '<?php echo esc_js($u['date']); ?>')" class="btn-reminder">
                                    🔔 रिमाइंडर सेट करें
                                </a>
                            </div>
                        </article>
                    <?php endforeach; endif; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- 2. BETWEEN SECTIONS ADVERTISEMENT (Billboard 970x250 / 728x90) -->
    <div class="ct-container">
        <?php rashtrarang_render_ad('ad_home_between_1', 'ad-slot-billboard reveal-on-scroll'); ?>
    </div>

    <!-- ==========================================================================
       ROW 3: APP PROMO / BILLBOARD BANNER (12 COLUMNS)
       ========================================================================== -->
    <section class="blocksy-app-promo-section reveal-on-scroll">
        <div class="ct-container">
            <div class="app-promo-card">
                <div class="app-promo-content">
                    <span class="app-promo-badge">आधिकारिक ऐप</span>
                    <h3 class="app-promo-title">राष्ट्र रंग मोबाइल ऐप अभी डाउनलोड करें</h3>
                    <p class="app-promo-desc">देश-दुनिया, पश्चिम बंगाल एवं कोलकाता की हर ब्रेकिंग न्यूज़ सबसे पहले पाएं सीधे अपने स्मार्टफोन पर।</p>
                    <div class="app-promo-stores">
                        <a href="#playstore" class="btn-store-badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                            <span>Google Play पर उपलब्ध</span>
                        </a>
                        <a href="#appstore" class="btn-store-badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M15.97,4.74C16.63,3.94 17.07,2.83 16.95,1.71C15.98,1.75 14.8,2.36 14.11,3.16C13.5,3.87 12.97,5 13.12,6.1C14.2,6.18 15.31,5.54 15.97,4.74Z"/></svg>
                            <span>Apple App Store</span>
                        </a>
                    </div>
                </div>
                <div class="app-promo-media">
                    <div class="phone-mockup-frame">
                        <div class="phone-mockup-screen">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.jpg" alt="राष्ट्र रंग ऐप स्क्रीन" style="width:100%; height:100%; object-fit:contain; background:#fff; padding:10px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================================================
       FEATURE 1: DEDICATED POPULAR NEWS SECTION (सर्वाधिक लोकप्रिय खबरें)
       ========================================================================== -->
    <section class="blocksy-popular-section reveal-on-scroll">
        <div class="ct-container">
            <div class="popular-header-row">
                <div class="block-heading-row" style="margin-bottom:0;">
                    <h3 class="block-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-red)" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        सर्वाधिक लोकप्रिय खबरें (Most Read News)
                    </h3>
                </div>
                <div class="popular-filter-pills">
                    <button class="popular-pill-btn active">आज के टॉप</button>
                    <button class="popular-pill-btn">इस सप्ताह</button>
                    <button class="popular-pill-btn">सर्वाधिक चर्चित</button>
                </div>
            </div>

            <div class="popular-cards-grid-4">
                <?php
                $pop_section_query = rashtrarang_get_popular_query(4);
                if ($pop_section_query->have_posts()) :
                    $p_rank = 0;
                    while ($pop_section_query->have_posts()) : $pop_section_query->the_post();
                        $p_rank++;
                        $cats = get_the_category();
                        $c_name = !empty($cats) ? $cats[0]->name : 'लोकप्रिय';
                ?>
                    <article class="card-popular-hub">
                        <div class="card-media ct-media-zoom">
                            <a href="<?php the_permalink(); ?>">
                                <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                     alt="<?php the_title_attribute(); ?>" loading="lazy">
                            </a>
                            <span class="popular-rank-badge"><?php echo sprintf('%02d', $p_rank); ?></span>
                            <span class="view-counter-pill">👁️ <?php echo rashtrarang_get_post_views(get_the_ID()); ?></span>
                        </div>
                        <div class="card-body">
                            <div style="margin-bottom: 4px;">
                                <span class="badge-cat" style="font-size:0.68rem;"><?php echo esc_html($c_name); ?></span>
                            </div>
                            <h4 class="card-title">
                                <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                            </h4>
                            <span class="card-meta" style="font-size:0.72rem; color:var(--color-text-muted); margin-top:auto;"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                        </div>
                    </article>
                <?php endwhile; wp_reset_postdata(); endif; ?>
            </div>
        </div>
    </section>

    <!-- ==========================================================================
       ROW 4: EDITOR CHOICE & WORTH READING (9 + 3 COLUMNS)
       ========================================================================== -->
    <section class="blocksy-editor-choice-section reveal-on-scroll">
        <div class="ct-container">
            <div class="blocksy-row-9-3">
                <!-- Col 9: Editor's Choice Main Block -->
                <div class="col-9">
                    <div class="block-heading-row">
                        <h4 class="block-title">संपादकीय पसंद (Editor's Choice)</h4>
                    </div>
                    <?php
                    $editor_lead_query = new WP_Query(array(
                        'cat'                 => 80, // Editorial / Special
                        'posts_per_page'      => 1,
                        'post_status'         => 'publish',
                        'ignore_sticky_posts' => 1,
                    ));
                    if ($editor_lead_query->have_posts()) :
                        while ($editor_lead_query->have_posts()) : $editor_lead_query->the_post();
                    ?>
                        <article class="card-horizontal-lead">
                            <div class="card-media ct-media-zoom">
                                <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-hero'); ?>" 
                                     alt="<?php the_title_attribute(); ?>" loading="lazy">
                                <span class="badge-cat" style="position:absolute; top:12px; left:12px;">संपादकीय</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">
                                    <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                </h3>
                                <p class="card-excerpt"><?php echo wp_trim_words(strip_tags(get_the_excerpt()), 22); ?></p>
                                <div class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?> • विशेष संपादकीय विश्लेषण</div>
                            </div>
                        </article>
                    <?php endwhile; wp_reset_postdata(); endif; ?>

                    <!-- 3-Card Subgrid below lead -->
                    <div class="editor-subgrid-3">
                        <?php
                        $editor_sub_query = new WP_Query(array(
                            'posts_per_page'      => 3,
                            'offset'              => 1,
                            'post_status'         => 'publish',
                            'ignore_sticky_posts' => 1,
                        ));
                        if ($editor_sub_query->have_posts()) :
                            while ($editor_sub_query->have_posts()) : $editor_sub_query->the_post();
                        ?>
                            <article class="card-subgrid-item">
                                <div class="card-media ct-media-zoom">
                                    <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                         alt="<?php the_title_attribute(); ?>" loading="lazy">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                    </h4>
                                    <span class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                                </div>
                            </article>
                        <?php endwhile; wp_reset_postdata(); endif; ?>
                    </div>
                </div>

                <!-- Col 3: Worth Reading Numbered List + Newsletter Box -->
                <div class="col-3">
                    <div class="worth-reading-box">
                        <div class="block-heading-row">
                            <h4 class="block-title">ज़रूर पढ़ें (Worth Reading)</h4>
                        </div>
                        <div class="worth-reading-list">
                            <?php
                            $worth_query = new WP_Query(array(
                                'cat'                 => 84, // Politics
                                'posts_per_page'      => 5,
                                'post_status'         => 'publish',
                                'ignore_sticky_posts' => 1,
                            ));
                            if ($worth_query->have_posts()) :
                                $w_idx = 0;
                                while ($worth_query->have_posts()) : $worth_query->the_post();
                                    $w_idx++;
                            ?>
                                <div class="worth-reading-item">
                                    <span class="worth-number"><?php echo $w_idx; ?></span>
                                    <h3 class="worth-title">
                                        <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                    </h3>
                                </div>
                            <?php endwhile; wp_reset_postdata(); endif; ?>
                        </div>
                    </div>

                    <!-- Newsletter Subscribe Card -->
                    <div class="newsletter-widget-card" id="subscribe">
                        <h4 class="newsletter-title">दैनिक समाचार पत्र सदस्यता</h4>
                        <p class="newsletter-desc">प्रत्येक सुबह देश एवं दुनिया की प्रमुख खबरों का सटीक सारांश अपने ईमेल पर प्राप्त करें।</p>
                        <form onsubmit="alert('राष्ट्र रंग न्यूज़लेटर सदस्यता के लिए धन्यवाद!'); return false;">
                            <input type="email" placeholder="अपना ईमेल दर्ज करें..." required class="newsletter-input" style="width:100%; padding:10px 12px; font-size:0.85rem; border:1px solid var(--color-border); border-radius:3px; margin-bottom:10px; background:var(--color-bg); color:var(--color-text-main);">
                            <button type="submit" class="preview-btn" style="width:100%; padding:10px; font-weight:700; background:var(--color-primary-red); color:#fff; border:none; cursor:pointer;">सब्सक्राइब करें</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. BETWEEN SECTIONS ADVERTISEMENT (Banner 728x90) -->
    <div class="ct-container">
        <?php rashtrarang_render_ad('ad_home_between_2', 'ad-slot-leaderboard reveal-on-scroll'); ?>
    </div>

    <!-- ==========================================================================
       ROW 5: DARK VIDEO & CATEGORY SHOWCASE (8 + 4 COLUMNS, BACKGROUND #14181E)
       ========================================================================== -->
    <section class="blocksy-dark-showcase-section reveal-on-scroll">
        <div class="ct-container">
            <div class="blocksy-row-8-4">
                <!-- Col 8: World Lead Story + 2x2 Grid -->
                <div class="col-8">
                    <div class="block-heading-row dark-heading">
                        <h4 class="block-title">विश्व मंच से और अधिक (MORE FROM WORLD CATEGORY)</h4>
                    </div>
                    <?php
                    $world_lead_query = new WP_Query(array(
                        'cat'                 => 138, // International
                        'posts_per_page'      => 1,
                        'post_status'         => 'publish',
                        'ignore_sticky_posts' => 1,
                    ));
                    if ($world_lead_query->have_posts()) :
                        while ($world_lead_query->have_posts()) : $world_lead_query->the_post();
                    ?>
                        <article class="card-dark-lead">
                            <div class="card-media ct-media-zoom">
                                <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-hero'); ?>" 
                                     alt="<?php the_title_attribute(); ?>" loading="lazy">
                                <span class="badge-cat" style="position:absolute; top:12px; left:12px; background:var(--color-primary-red); color:#fff;">अंतर्राष्ट्रीय</span>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">
                                    <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                </h2>
                                <p class="card-excerpt"><?php echo wp_trim_words(strip_tags(get_the_excerpt()), 20); ?></p>
                                <div class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?> • ग्लोबल रिपोर्ट</div>
                            </div>
                        </article>
                    <?php endwhile; wp_reset_postdata(); endif; ?>

                    <!-- 2x2 Subgrid in Dark Section -->
                    <div class="dark-grid-2x2">
                        <?php
                        $world_grid_query = new WP_Query(array(
                            'cat'                 => 138,
                            'posts_per_page'      => 4,
                            'offset'              => 1,
                            'post_status'         => 'publish',
                            'ignore_sticky_posts' => 1,
                        ));
                        if ($world_grid_query->have_posts()) :
                            while ($world_grid_query->have_posts()) : $world_grid_query->the_post();
                        ?>
                            <article class="card-dark-subgrid">
                                <div class="card-media ct-media-zoom">
                                    <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                         alt="<?php the_title_attribute(); ?>" loading="lazy">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                    </h4>
                                    <span class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                                </div>
                            </article>
                        <?php endwhile; wp_reset_postdata(); endif; ?>
                    </div>
                </div>

                <!-- Col 4: Video Showcase / Hot Videos -->
                <div class="col-4">
                    <div class="hot-videos-box">
                        <div class="block-heading-row dark-heading">
                            <h4 class="block-title">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                                वीडियो समाचार (Hot Videos)
                            </h4>
                        </div>
                        <div class="hot-videos-list">
                            <?php
                            $video_query = new WP_Query(array(
                                'cat'                 => 91, // Sports / Video
                                'posts_per_page'      => 3,
                                'post_status'         => 'publish',
                                'ignore_sticky_posts' => 1,
                            ));
                            if ($video_query->have_posts()) :
                                while ($video_query->have_posts()) : $video_query->the_post();
                            ?>
                                <article class="card-video-item">
                                    <div class="card-media ct-media-zoom">
                                        <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                             alt="<?php the_title_attribute(); ?>" loading="lazy">
                                        <div class="video-play-overlay">
                                            <div class="video-play-circle">▶</div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <h4 class="card-title">
                                            <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                        </h4>
                                        <span class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                                    </div>
                                </article>
                            <?php endwhile; wp_reset_postdata(); endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================================================
       ROW 6: TRIPLE CATEGORY COLUMNS (4 + 4 + 4 COLUMNS)
       ========================================================================== -->
    <section class="blocksy-triple-cat-section reveal-on-scroll">
        <div class="ct-container">
            <div class="blocksy-row-4-4-4">
                <!-- Column 1: West Bengal -->
                <div class="col-4">
                    <div class="block-heading-row">
                        <h4 class="block-title">पश्चिम बंगाल (West Bengal)</h4>
                    </div>
                    <?php
                    $bengal_col_query = new WP_Query(array(
                        'cat'                 => 78,
                        'posts_per_page'      => 4,
                        'post_status'         => 'publish',
                        'ignore_sticky_posts' => 1,
                    ));
                    if ($bengal_col_query->have_posts()) :
                        $b_count = 0;
                        while ($bengal_col_query->have_posts()) : $bengal_col_query->the_post();
                            $b_count++;
                            if ($b_count === 1) :
                    ?>
                        <article class="card-featured-vertical" style="height:auto; margin-bottom:16px;">
                            <div class="card-media ct-media-zoom" style="height:190px;">
                                <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                     alt="<?php the_title_attribute(); ?>" loading="lazy">
                                <span class="badge-cat" style="position:absolute; top:8px; left:8px;">पश्चिम बंगाल</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title" style="font-size:1.05rem;">
                                    <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                </h3>
                                <span class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                            </div>
                        </article>
                        <div class="breaking-news-list">
                    <?php else : ?>
                            <article class="breaking-item-card">
                                <div class="breaking-item-thumb ct-media-zoom">
                                    <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-thumb'); ?>" 
                                         alt="<?php the_title_attribute(); ?>" loading="lazy">
                                </div>
                                <div class="breaking-item-content">
                                    <h4 class="item-title">
                                        <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                    </h4>
                                    <span class="item-date"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                                </div>
                            </article>
                    <?php 
                            endif;
                        endwhile;
                        echo '</div>';
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>

                <!-- Column 2: Kolkata -->
                <div class="col-4">
                    <div class="block-heading-row">
                        <h4 class="block-title">कोलकाता (Kolkata Metro)</h4>
                    </div>
                    <?php
                    $kol_col_query = new WP_Query(array(
                        'cat'                 => 89,
                        'posts_per_page'      => 4,
                        'post_status'         => 'publish',
                        'ignore_sticky_posts' => 1,
                    ));
                    if ($kol_col_query->have_posts()) :
                        $k_count = 0;
                        while ($kol_col_query->have_posts()) : $kol_col_query->the_post();
                            $k_count++;
                            if ($k_count === 1) :
                    ?>
                        <article class="card-featured-vertical" style="height:auto; margin-bottom:16px;">
                            <div class="card-media ct-media-zoom" style="height:190px;">
                                <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                     alt="<?php the_title_attribute(); ?>" loading="lazy">
                                <span class="badge-cat" style="position:absolute; top:8px; left:8px;">कोलकाता</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title" style="font-size:1.05rem;">
                                    <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                </h3>
                                <span class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                            </div>
                        </article>
                        <div class="breaking-news-list">
                    <?php else : ?>
                            <article class="breaking-item-card">
                                <div class="breaking-item-thumb ct-media-zoom">
                                    <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-thumb'); ?>" 
                                         alt="<?php the_title_attribute(); ?>" loading="lazy">
                                </div>
                                <div class="breaking-item-content">
                                    <h4 class="item-title">
                                        <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                    </h4>
                                    <span class="item-date"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                                </div>
                            </article>
                    <?php 
                            endif;
                        endwhile;
                        echo '</div>';
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>

                <!-- Column 3: Politics -->
                <div class="col-4">
                    <div class="block-heading-row">
                        <h4 class="block-title">राजनीति एवं शासन (Politics)</h4>
                    </div>
                    <?php
                    $pol_col_query = new WP_Query(array(
                        'cat'                 => 84,
                        'posts_per_page'      => 4,
                        'post_status'         => 'publish',
                        'ignore_sticky_posts' => 1,
                    ));
                    if ($pol_col_query->have_posts()) :
                        $p_count = 0;
                        while ($pol_col_query->have_posts()) : $pol_col_query->the_post();
                            $p_count++;
                            if ($p_count === 1) :
                    ?>
                        <article class="card-featured-vertical" style="height:auto; margin-bottom:16px;">
                            <div class="card-media ct-media-zoom" style="height:190px;">
                                <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                     alt="<?php the_title_attribute(); ?>" loading="lazy">
                                <span class="badge-cat" style="position:absolute; top:8px; left:8px;">राजनीति</span>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title" style="font-size:1.05rem;">
                                    <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                </h3>
                                <span class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                            </div>
                        </article>
                        <div class="breaking-news-list">
                    <?php else : ?>
                            <article class="breaking-item-card">
                                <div class="breaking-item-thumb ct-media-zoom">
                                    <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-thumb'); ?>" 
                                         alt="<?php the_title_attribute(); ?>" loading="lazy">
                                </div>
                                <div class="breaking-item-content">
                                    <h4 class="item-title">
                                        <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                    </h4>
                                    <span class="item-date"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                                </div>
                            </article>
                    <?php 
                            endif;
                        endwhile;
                        echo '</div>';
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================================================
       FEATURE 3: CATEGORIES DIRECTORY HUB (समस्त समाचार श्रेणियां)
       ========================================================================== -->
    <section class="blocksy-categories-hub-section reveal-on-scroll">
        <div class="ct-container">
            <div class="block-heading-row" style="margin-bottom:16px;">
                <h3 class="block-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-red)" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    समस्त समाचार श्रेणियां (Explore Categories)
                </h3>
            </div>

            <!-- Horizontal Scrollable Quick Jump Pills -->
            <div class="categories-scroll-nav-bar">
                <?php
                $all_cats = get_categories(array('orderby' => 'count', 'order' => 'DESC', 'hide_empty' => true));
                foreach ($all_cats as $c) :
                ?>
                    <a href="<?php echo esc_url(get_category_link($c->term_id)); ?>" class="category-nav-pill">
                        <span><?php echo esc_html($c->name); ?></span>
                        <span class="pill-count"><?php echo $c->count; ?></span>
                    </a>
                <?php endforeach; ?>
            </div>

            <!-- Visual 4-Column Category Grid -->
            <div class="categories-hub-grid">
                <?php
                $cat_dir = rashtrarang_get_categories_directory();
                $hub_cats = array_slice($cat_dir, 0, 8); // Top 8 prominent categories
                foreach ($hub_cats as $cat_item) :
                ?>
                    <a href="<?php echo esc_url($cat_item['link']); ?>" class="card-category-hub">
                        <img src="<?php echo esc_url($cat_item['thumb']); ?>" alt="<?php echo esc_attr($cat_item['name']); ?>" class="cat-hub-bg-img" loading="lazy">
                        <div class="cat-hub-gradient"></div>
                        <div class="cat-hub-content">
                            <span class="cat-hub-badge"><?php echo $cat_item['count']; ?>+ खबरें</span>
                            <h4 class="cat-hub-title"><?php echo esc_html($cat_item['name']); ?></h4>
                            <?php if (!empty($cat_item['latest_title'])) : ?>
                                <p class="cat-hub-latest">ताज़ा: <?php echo esc_html($cat_item['latest_title']); ?></p>
                            <?php endif; ?>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- 4. FOOTER TOP ADVERTISEMENT PLACEMENT (728x90) -->
    <div class="ct-container">
        <?php rashtrarang_render_ad('ad_footer_top', 'ad-slot-footer reveal-on-scroll'); ?>
    </div>

</main>

<?php get_footer(); ?>
`;

fs.writeFileSync('rashtrarang-theme/index.php', indexPhpContent, 'utf8');
console.log('Successfully updated rashtrarang-theme/index.php with all new features & ad placements!');
