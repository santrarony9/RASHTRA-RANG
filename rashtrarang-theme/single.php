<?php
/**
 * Single Article Page Template - Rashtra Rang Blocksy Daily News Edition
 *
 * @package RashtraRang
 */

get_header(); ?>

<div class="ct-container article-reading-view">
    <?php while (have_posts()) : the_post(); 
        $categories = get_the_category();
        $primary_cat = !empty($categories) ? $categories[0] : null;
        $clean_title = rashtrarang_clean_headline(get_the_title());
        $reading_time = rashtrarang_reading_time(get_the_ID());
        $post_url = get_permalink();
        $has_custom_excerpt = has_excerpt();
    ?>

    <!-- 1. ARTICLE HEADER -->
    <header class="article-header">
        <div class="article-meta-slashes">
            <a href="<?php echo esc_url(home_url('/')); ?>">होम</a>
            <span>/</span>
            <?php if ($primary_cat) : ?>
                <a href="<?php echo esc_url(get_category_link($primary_cat->term_id)); ?>">
                    <?php echo esc_html($primary_cat->name); ?>
                </a>
                <span>/</span>
            <?php endif; ?>
            <span><?php echo esc_html(wp_trim_words($clean_title, 6)); ?></span>
        </div>

        <h1 class="article-title-h1">
            <?php echo $clean_title; ?>
        </h1>

        <div class="article-meta-slashes">
            <strong><?php the_author(); ?></strong>
            <span>/</span>
            <time datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                <?php echo rashtrarang_hindi_date(get_the_time('U')); ?>
            </time>
            <span>/</span>
            <span><?php echo esc_html($reading_time); ?></span>
        </div>
    </header>

    <!-- 2. TWO-COLUMN LAYOUT -->
    <div class="article-two-col-layout">
        <!-- Content Column -->
        <article id="post-<?php the_ID(); ?>" <?php post_class('article-content-column'); ?>>
            
            <?php if (has_post_thumbnail()) : 
                $thumb_id = get_post_thumbnail_id();
                $caption = wp_get_attachment_caption($thumb_id);
            ?>
                <figure class="article-featured-image ct-media-zoom">
                    <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'full'); ?>" 
                         alt="<?php the_title_attribute(); ?>">
                    <?php if (!empty($caption)) : ?>
                        <figcaption style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 8px; font-style: italic;">
                            <?php echo esc_html($caption); ?>
                        </figcaption>
                    <?php endif; ?>
                </figure>
            <?php endif; ?>

            <?php if ($has_custom_excerpt || !empty(get_the_excerpt())) : ?>
                <div class="article-lead-excerpt">
                    <?php echo wp_trim_words(strip_tags(get_the_excerpt()), 35, '...'); ?>
                </div>
            <?php endif; ?>

            <div class="article-content-body">
                <?php the_content(); ?>
            </div>

            <!-- Below Article Ad Slot -->
            <?php rashtrarang_render_ad('ad_article_bottom', 'ad-slot-inarticle reveal-on-scroll'); ?>

            <!-- Blocksy Share Box -->
            <div class="article-share-box">
                <strong style="color: var(--color-text-main); font-size: 0.9rem;">खबर साझा करें:</strong>
                <div class="share-buttons-row">
                    <a href="https://api.whatsapp.com/send?text=<?php echo urlencode($clean_title . ' ' . $post_url); ?>" 
                       target="_blank" rel="noopener noreferrer" class="btn-share whatsapp">
                        WhatsApp
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode($post_url); ?>" 
                       target="_blank" rel="noopener noreferrer" class="btn-share facebook">
                        Facebook
                    </a>
                    <a href="https://twitter.com/intent/tweet?text=<?php echo urlencode($clean_title); ?>&url=<?php echo urlencode($post_url); ?>" 
                       target="_blank" rel="noopener noreferrer" class="btn-share twitter">
                        X
                    </a>
                    <button type="button" class="btn-share copylink" onclick="navigator.clipboard.writeText('<?php echo esc_url($post_url); ?>'); alert('लिंक कॉपी हो गया!');">
                        कॉपी लिंक
                    </button>
                </div>
            </div>

            <!-- Related Articles -->
            <?php if ($primary_cat) : 
                $related_query = new WP_Query(array(
                    'cat'            => $primary_cat->term_id,
                    'post__not_in'   => array(get_the_ID()),
                    'posts_per_page' => 3,
                    'post_status'    => 'publish',
                ));
                if ($related_query->have_posts()) :
            ?>
                <section class="related-news-section" style="margin-top: 40px; padding-top: 25px; border-top: 1px solid var(--color-border);">
                    <div class="block-heading-row" style="margin-bottom: 20px;">
                        <h3 class="block-title">संबंधित खबरें</h3>
                    </div>
                    <div class="editor-subgrid-3">
                        <?php while ($related_query->have_posts()) : $related_query->the_post(); ?>
                            <article class="card-subgrid-item">
                                <div class="card-media ct-media-zoom">
                                    <a href="<?php the_permalink(); ?>">
                                        <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                             alt="<?php the_title_attribute(); ?>" loading="lazy">
                                    </a>
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="<?php the_permalink(); ?>">
                                            <?php echo rashtrarang_clean_headline(get_the_title()); ?>
                                        </a>
                                    </h4>
                                    <span class="card-meta"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                                </div>
                            </article>
                        <?php endwhile; wp_reset_postdata(); ?>
                    </div>
                </section>
            <?php endif; endif; ?>

            <!-- Post Navigation (Prev / Next) -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 35px; padding-top: 25px; border-top: 1px solid var(--color-border);">
                <?php 
                $prev_post = get_previous_post();
                $next_post = get_next_post();
                ?>
                <?php if (!empty($prev_post)) : ?>
                    <a href="<?php echo esc_url(get_permalink($prev_post->ID)); ?>" style="padding: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); text-decoration: none; color: inherit;">
                        <div style="font-size: 0.75rem; color: var(--color-primary-red); font-weight: 700; margin-bottom: 4px;">← पिछली खबर</div>
                        <div style="font-size: 0.88rem; font-weight: 600; line-height: 1.4; color: var(--color-text-main);"><?php echo rashtrarang_clean_headline(get_the_title($prev_post->ID)); ?></div>
                    </a>
                <?php else: ?>
                    <div></div>
                <?php endif; ?>

                <?php if (!empty($next_post)) : ?>
                    <a href="<?php echo esc_url(get_permalink($next_post->ID)); ?>" style="padding: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); text-decoration: none; color: inherit; text-align: right;">
                        <div style="font-size: 0.75rem; color: var(--color-primary-red); font-weight: 700; margin-bottom: 4px;">अगली खबर →</div>
                        <div style="font-size: 0.88rem; font-weight: 600; line-height: 1.4; color: var(--color-text-main);"><?php echo rashtrarang_clean_headline(get_the_title($next_post->ID)); ?></div>
                    </a>
                <?php endif; ?>
            </div>

            <!-- Comments Area -->
            <?php
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>

        </article>

        <!-- Sidebar Column -->
        <aside class="article-sidebar-column">
            <!-- Sidebar Top Ad Slot (300x250) -->
            <?php rashtrarang_render_ad('ad_sidebar_top', 'ad-slot-sidebar-300 reveal-on-scroll'); ?>

            <!-- Worth Reading Widget -->
            <div class="worth-reading-box">
                <div class="block-heading-row">
                    <h3 class="block-title">ताज़ा एवं चर्चित खबरें</h3>
                </div>
                <div class="worth-reading-list">
                    <?php
                    $side_query = new WP_Query(array('posts_per_page' => 5, 'post_status' => 'publish'));
                    if ($side_query->have_posts()) :
                        $s_rank = 0;
                        while ($side_query->have_posts()) : $side_query->the_post();
                            $s_rank++;
                    ?>
                        <div class="worth-reading-item">
                            <span class="worth-number"><?php echo $s_rank; ?></span>
                            <h4 class="worth-title">
                                <a href="<?php the_permalink(); ?>">
                                    <?php echo rashtrarang_clean_headline(get_the_title()); ?>
                                </a>
                            </h4>
                        </div>
                    <?php endwhile; wp_reset_postdata(); endif; ?>
                </div>
            </div>

            <!-- E-Paper Box -->
            <div style="margin-top: 25px; padding: 20px; background-color: var(--color-card-bg); border: 1px solid var(--color-border); border-radius: var(--radius-sm); border-top: 3px solid var(--color-primary-red);">
                <h4 style="font-family: var(--font-editorial); font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 6px;">राष्ट्र रंग ई-पेपर</h4>
                <p style="font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 14px;">आज का संपूर्ण डिजिटल संस्करण अपने मोबाइल एवं कंप्यूटर पर पढ़ें।</p>
                <a href="<?php echo esc_url(home_url('/?cat=81')); ?>" style="display: block; text-align: center; padding: 10px; background-color: var(--color-primary-red); color: #FFFFFF; font-weight: 700; font-size: 0.85rem; border-radius: var(--radius-sm); text-decoration: none;">ई-पेपर संस्करण पढ़ें →</a>
            </div>

            <!-- Sidebar Sticky Half-Page Ad (300x600) -->
            <?php rashtrarang_render_ad('ad_sidebar_sticky', 'ad-slot-sidebar-sticky reveal-on-scroll'); ?>
        </aside>
    </div>

    <?php endwhile; ?>
</div>

<?php get_footer(); ?>
