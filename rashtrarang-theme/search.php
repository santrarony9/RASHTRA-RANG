<?php
/**
 * Search Results Template - Rashtra Rang Modern
 *
 * @package RashtraRang
 */

get_header(); ?>

<div class="archive-header-banner">
    <div class="container">
        <nav class="article-breadcrumbs" style="margin-bottom: 8px;">
            <a href="<?php echo esc_url(home_url('/')); ?>">होम</a>
            <span>/</span>
            <span>खोज परिणाम</span>
        </nav>
        <h1 class="archive-title">
            खोज परिणाम: "<?php echo get_search_query(); ?>"
        </h1>
        <div class="archive-description">
            <?php 
            global $wp_query;
            echo 'कुल ' . $wp_query->found_posts . ' परिणाम प्राप्त हुए।';
            ?>
        </div>
    </div>
</div>

<main class="main-content-layout">
    <div class="container">
        <div class="editorial-grid-2col">
            <div class="editorial-stream">
                <?php if (have_posts()) : ?>
                    <div class="news-cards-grid-3">
                        <?php while (have_posts()) : the_post(); 
                            $cats = get_the_category();
                            $cname = !empty($cats) ? $cats[0]->name : 'समाचार';
                        ?>
                            <article class="news-card-standard">
                                <div class="news-card-thumb">
                                    <a href="<?php the_permalink(); ?>">
                                        <img src="<?php echo rashtrarang_get_post_image(get_the_ID(), 'rashtrarang-grid'); ?>" 
                                             alt="<?php the_title_attribute(); ?>" 
                                             class="news-card-img" loading="lazy">
                                    </a>
                                </div>
                                <div class="news-card-body">
                                    <div class="news-card-meta">
                                        <span class="category-badge"><?php echo esc_html($cname); ?></span>
                                    </div>
                                    <h3 class="news-card-headline">
                                        <a href="<?php the_permalink(); ?>">
                                            <?php echo rashtrarang_clean_headline(get_the_title()); ?>
                                        </a>
                                    </h3>
                                    <span class="news-card-date"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></span>
                                </div>
                            </article>
                        <?php endwhile; ?>
                    </div>
                    <div class="pagination-wrap">
                        <?php echo paginate_links(array('prev_text' => '← पिछला', 'next_text' => 'अगला →')); ?>
                    </div>
                <?php else : ?>
                    <div style="padding: 40px 0;">
                        <h3>कोई परिणाम नहीं मिला</h3>
                        <p style="color: #666; margin-top: 8px;">कृपया दूसरे शब्दों का उपयोग करके पुनः प्रयास करें।</p>
                    </div>
                <?php endif; ?>
            </div>

            <aside class="site-sidebar">
                <div class="sidebar-widget">
                    <h3 class="sidebar-widget-title">ताज़ा सुर्खियां</h3>
                    <div class="trending-post-list">
                        <?php
                        $recent = get_posts(array('numberposts' => 5));
                        $r = 0;
                        foreach ($recent as $post) : setup_postdata($post); $r++;
                        ?>
                            <article class="trending-item">
                                <span class="trending-number"><?php echo $r; ?></span>
                                <div>
                                    <h4 class="trending-headline">
                                        <a href="<?php the_permalink(); ?>"><?php echo rashtrarang_clean_headline(get_the_title()); ?></a>
                                    </h4>
                                    <div class="trending-date"><?php echo rashtrarang_hindi_date(get_the_time('U')); ?></div>
                                </div>
                            </article>
                        <?php endforeach; wp_reset_postdata(); ?>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</main>

<?php get_footer(); ?>
