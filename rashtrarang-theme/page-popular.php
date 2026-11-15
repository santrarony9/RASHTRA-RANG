<?php
/**
 * Template Name: Popular News Page (सर्वाधिक लोकप्रिय समाचार)
 *
 * @package RashtraRang
 */

get_header(); ?>

<div class="ct-container" style="padding-top: 35px; padding-bottom: 60px;">
    
    <!-- Page Header Banner -->
    <header class="category-archive-header" style="margin-bottom: 25px; border-bottom: 2px solid var(--color-border); padding-bottom: 20px;">
        <div class="article-meta-slashes" style="margin-bottom: 10px;">
            <a href="<?php echo esc_url(home_url('/')); ?>">होम</a>
            <span>/</span>
            <span style="color: var(--color-text-main); font-weight: 600;">लोकप्रिय समाचार</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
            <div>
                <h1 class="block-title" style="font-size: 2.2rem; margin: 0 0 8px 0;">
                    🔥 सर्वाधिक लोकप्रिय समाचार (Most Popular News)
                </h1>
                <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
                    राष्ट्र रंग पर पाठकों द्वारा सर्वाधिक पढ़े जाने वाले ताज़ा, प्रामाणिक एवं चर्चित समाचार।
                </p>
            </div>
            <div class="popular-filter-pills">
                <button class="popular-pill-btn active">आज के टॉप</button>
                <button class="popular-pill-btn">इस सप्ताह</button>
                <button class="popular-pill-btn">सर्वाधिक चर्चित</button>
            </div>
        </div>
    </header>

    <!-- Top Advertisement Slot -->
    <?php rashtrarang_render_ad('ad_category_top', 'ad-slot-leaderboard reveal-on-scroll'); ?>

    <div class="article-two-col-layout">
        <!-- Main Popular Posts Grid -->
        <main class="popular-posts-column">
            <?php
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
            $pop_page_query = new WP_Query(array(
                'posts_per_page'      => 10,
                'paged'               => $paged,
                'post_status'         => 'publish',
                'meta_key'            => 'rashtrarang_post_views_count',
                'orderby'             => 'meta_value_num',
                'order'               => 'DESC',
                'ignore_sticky_posts' => 1,
            ));

            if (!$pop_page_query->have_posts()) {
                // Fallback to recent posts if no views metadata exists yet
                $pop_page_query = new WP_Query(array(
                    'posts_per_page' => 10,
                    'paged'          => $paged,
                    'post_status'    => 'publish',
                ));
            }

            if ($pop_page_query->have_posts()) :
            ?>
                <div class="editor-subgrid-3" style="grid-template-columns: repeat(2, 1fr); gap: 24px;">
                    <?php 
                    $rank = ($paged - 1) * 10;
                    while ($pop_page_query->have_posts()) : $pop_page_query->the_post(); 
                        $rank++;
                        $cats = get_the_category();
                        $c_name = !empty($cats) ? $cats[0]->name : 'लोकप्रिय';
                    ?>
                        <article class="card-popular-hub" style="border: 1px solid var(--color-border);">
                            <div class="card-media ct-media-zoom" style="height: 180px;">
                                <a href="<?php the_permalink(); ?>">
                                    <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                         alt="<?php the_title_attribute(); ?>" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                                </a>
                                <span class="popular-rank-badge"><?php echo sprintf('%02d', $rank); ?></span>
                                <span class="view-counter-pill">👁️ <?php echo rashtrarang_get_post_views(get_the_ID()); ?></span>
                            </div>
                            <div class="card-body">
                                <div style="margin-bottom: 6px;">
                                    <span class="badge-cat" style="font-size: 0.68rem;"><?php echo esc_html($c_name); ?></span>
                                </div>
                                <h3 class="card-title" style="font-size: 1.05rem; margin-bottom: 8px;">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php echo rashtrarang_clean_headline(get_the_title()); ?>
                                    </a>
                                </h3>
                                <p style="font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5; margin: 6px 0 10px;">
                                    <?php echo wp_trim_words(strip_tags(get_the_excerpt()), 18, '...'); ?>
                                </p>
                                <span class="card-meta" style="font-size: 0.72rem; color: var(--color-text-muted); margin-top: auto;">
                                    <?php echo rashtrarang_hindi_date(get_the_time('U')); ?>
                                </span>
                            </div>
                        </article>
                    <?php endwhile; wp_reset_postdata(); ?>
                </div>

                <!-- Numbered Pagination -->
                <div class="pagination-wrap" style="margin-top: 40px; display: flex; justify-content: center; gap: 8px;">
                    <?php
                    echo paginate_links(array(
                        'total'     => $pop_page_query->max_num_pages,
                        'current'   => $paged,
                        'prev_text' => '← पिछला',
                        'next_text' => 'अगला →',
                        'type'      => 'plain',
                    ));
                    ?>
                </div>

            <?php else : ?>
                <p style="padding: 40px 0; font-size: 1.1rem; color: var(--color-text-muted);">
                    इस समय कोई लोकप्रिय समाचार उपलब्ध नहीं है।
                </p>
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
