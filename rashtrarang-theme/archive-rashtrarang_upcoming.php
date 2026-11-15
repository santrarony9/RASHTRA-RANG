<?php
/**
 * Archive Template for Upcoming News & Scheduled Coverage (आगामी कवरेज)
 *
 * @package RashtraRang
 */

get_header(); ?>

<div class="ct-container" style="padding-top: 35px; padding-bottom: 60px;">
    
    <!-- Archive Header -->
    <header class="category-archive-header" style="margin-bottom: 30px; border-bottom: 2px solid var(--color-border); padding-bottom: 20px;">
        <div class="article-meta-slashes" style="margin-bottom: 10px;">
            <a href="<?php echo esc_url(home_url('/')); ?>">होम</a>
            <span>/</span>
            <span style="color: var(--color-text-main); font-weight: 600;">आगामी कवरेज</span>
        </div>
        <h1 class="block-title" style="font-size: 2.2rem; margin: 0 0 10px 0;">
            🗓️ आगामी कवरेज एवं घोषणाएं (Upcoming Coverage & Events)
        </h1>
        <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6;">
            राष्ट्र रंग द्वारा आगामी दिनों में कवर किए जाने वाले महत्वपूर्ण राजनीतिक, सामाजिक, खेल एवं सांस्कृतिक कार्यक्रमों का विवरण।
        </p>
    </header>

    <!-- Top Advertisement Slot -->
    <?php rashtrarang_render_ad('ad_category_top', 'ad-slot-leaderboard reveal-on-scroll'); ?>

    <div class="article-two-col-layout">
        <!-- Main Upcoming Events Grid -->
        <main class="category-posts-column">
            <?php if (have_posts()) : ?>
                <div class="upcoming-cards-grid-3" style="grid-template-columns: repeat(2, 1fr); gap: 24px;">
                    <?php while (have_posts()) : the_post(); 
                        $u_date = get_post_meta(get_the_ID(), '_upcoming_event_date', true);
                        $u_time = get_post_meta(get_the_ID(), '_upcoming_event_time', true);
                        $u_venue = get_post_meta(get_the_ID(), '_upcoming_event_venue', true);
                        $disp_date = !empty($u_date) ? date('d M Y', strtotime($u_date)) : 'शीघ्र आ रहा है';
                        if (!empty($u_time)) $disp_date .= ' | ' . $u_time;
                    ?>
                        <article class="card-upcoming-item" style="border: 1px solid var(--color-border);">
                            <div class="card-media ct-media-zoom" style="height: 190px;">
                                <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                     alt="<?php the_title_attribute(); ?>" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                                <span class="upcoming-datetime-badge">🗓️ <?php echo esc_html($disp_date); ?></span>
                            </div>
                            <div class="card-body" style="padding: 18px;">
                                <?php if (!empty($u_venue)) : ?>
                                    <div class="upcoming-venue">📍 <?php echo esc_html($u_venue); ?></div>
                                <?php endif; ?>
                                <h3 class="card-title" style="font-size: 1.05rem; margin-bottom: 10px;">
                                    <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                </h3>
                                <div style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 16px;">
                                    <?php the_excerpt(); ?>
                                </div>
                                <a href="javascript:void(0)" onclick="setUpcomingReminder('<?php echo esc_js(get_the_title()); ?>', '<?php echo esc_js($disp_date); ?>')" class="btn-reminder" style="margin-top: auto;">
                                    🔔 रिमाइंडर सेट करें
                                </a>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>

                <div class="pagination-wrap" style="margin-top: 40px; display: flex; justify-content: center; gap: 8px;">
                    <?php
                    echo paginate_links(array(
                        'prev_text' => '← पिछला',
                        'next_text' => 'अगला →',
                        'type'      => 'plain',
                    ));
                    ?>
                </div>

            <?php else : ?>
                <div style="padding: 50px 20px; text-align: center; background: var(--color-card-bg); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
                    <p style="font-size: 1.1rem; color: var(--color-text-muted);">
                        इस समय कोई आगामी कार्यक्रम निर्धारित नहीं है।
                    </p>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="preview-btn" style="margin-top: 15px; display: inline-block;">
                        ← मुख्य पृष्ठ पर वापस जाएं
                    </a>
                </div>
            <?php endif; ?>
        </main>

        <!-- Sidebar Column -->
        <aside class="article-sidebar-column">
            <!-- Sidebar Top Ad -->
            <?php rashtrarang_render_ad('ad_sidebar_top', 'ad-slot-sidebar-300 reveal-on-scroll'); ?>

            <!-- E-Paper Box -->
            <div style="margin-top: 25px; padding: 20px; background-color: var(--color-card-bg); border: 1px solid var(--color-border); border-radius: var(--radius-sm); border-top: 3px solid var(--color-primary-red);">
                <h4 style="font-family: var(--font-editorial); font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 6px;">राष्ट्र रंग ई-पेपर</h4>
                <p style="font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 14px;">आज का संपूर्ण डिजिटल संस्करण अपने मोबाइल एवं कंप्यूटर पर पढ़ें।</p>
                <a href="<?php echo esc_url(home_url('/?cat=81')); ?>" style="display: block; text-align: center; padding: 10px; background-color: var(--color-primary-red); color: #FFFFFF; font-weight: 700; font-size: 0.85rem; border-radius: var(--radius-sm); text-decoration: none;">ई-पेपर संस्करण पढ़ें →</a>
            </div>

            <!-- Sidebar Sticky Half-Page Ad -->
            <?php rashtrarang_render_ad('ad_sidebar_sticky', 'ad-slot-sidebar-sticky reveal-on-scroll'); ?>
        </aside>
    </div>

</div>

<?php get_footer(); ?>
