<?php
/**
 * Category Archive Template - Rashtra Rang Blocksy Daily News Edition
 *
 * @package RashtraRang
 */

get_header(); 
$current_cat = get_queried_object();
?>

<div class="ct-container" style="padding-top: 35px; padding-bottom: 60px;">
    
    <!-- Category Header -->
    <header class="category-archive-header" style="margin-bottom: 30px; border-bottom: 2px solid var(--color-border); padding-bottom: 20px;">
        <div class="article-meta-slashes" style="margin-bottom: 10px;">
            <a href="<?php echo esc_url(home_url('/')); ?>">होम</a>
            <span>/</span>
            <span style="color: var(--color-text-main); font-weight: 600;"><?php single_cat_title(); ?></span>
        </div>
        <h1 class="block-title" style="font-size: 2.2rem; margin: 0 0 10px 0;">
            <?php single_cat_title(); ?>
        </h1>
        <?php 
        $cat_desc = category_description();
        if (!empty($cat_desc)) :
        ?>
            <div style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6;"><?php echo $cat_desc; ?></div>
        <?php else : ?>
            <div style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6;">राष्ट्र रंग पर <?php single_cat_title(); ?> से संबंधित सभी ताज़ा एवं महत्वपूर्ण खबरें।</div>
        <?php endif; ?>
    </header>

    <!-- Category Top Banner Ad -->
    <?php rashtrarang_render_ad('ad_category_top', 'ad-slot-leaderboard reveal-on-scroll'); ?>

    <div class="article-two-col-layout">
        <!-- Main Category Posts Grid -->
        <main class="category-posts-column">
            <?php if (have_posts()) : ?>
                <div class="editor-subgrid-3" style="grid-template-columns: repeat(2, 1fr); gap: 24px;">
                    <?php while (have_posts()) : the_post(); ?>
                        <article class="card-subgrid-item" style="border: 1px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--color-card-bg);">
                            <div class="card-media ct-media-zoom" style="height: 180px;">
                                <a href="<?php the_permalink(); ?>">
                                    <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                         alt="<?php the_title_attribute(); ?>" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                                </a>
                            </div>
                            <div class="card-body" style="padding: 16px;">
                                <h3 class="card-title" style="font-size: 1.05rem; margin-bottom: 8px;">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php echo rashtrarang_clean_headline(get_the_title()); ?>
                                    </a>
                                </h3>
                                <p style="font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5; margin: 8px 0;">
                                    <?php echo wp_trim_words(strip_tags(get_the_excerpt()), 18, '...'); ?>
                                </p>
                                <span class="card-meta" style="font-size: 0.72rem; color: var(--color-text-muted);">
                                    <?php echo rashtrarang_hindi_date(get_the_time('U')); ?>
                                </span>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>

                <!-- Numbered Pagination -->
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
                        इस श्रेणी में अभी कोई समाचार उपलब्ध नहीं है।
                    </p>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="preview-btn" style="margin-top: 15px; display: inline-block;">
                        ← मुख्य पृष्ठ पर वापस जाएं
                    </a>
                </div>
            <?php endif; ?>
        </main>

        <!-- Sidebar Column -->
        <aside class="article-sidebar-column">
            <!-- Sidebar Top Ad Slot -->
            <?php rashtrarang_render_ad('ad_sidebar_top', 'ad-slot-sidebar-300 reveal-on-scroll'); ?>

            <!-- Worth Reading Widget -->
            <div class="worth-reading-box">
                <div class="block-heading-row">
                    <h3 class="block-title">अन्य महत्वपूर्ण खबरें</h3>
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
        </aside>
    </div>

</div>

<?php get_footer(); ?>
