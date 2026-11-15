<?php
/**
 * Static Page Template - Rashtra Rang Blocksy Daily News Edition
 *
 * @package RashtraRang
 */

get_header(); ?>

<div class="ct-container article-reading-view">
    <?php while (have_posts()) : the_post(); ?>

    <header class="article-header">
        <div class="article-meta-slashes">
            <a href="<?php echo esc_url(home_url('/')); ?>">होम</a>
            <span>/</span>
            <span style="color: var(--color-text-main); font-weight: 600;"><?php the_title(); ?></span>
        </div>
        <h1 class="article-title-h1">
            <?php the_title(); ?>
        </h1>
    </header>

    <div class="article-two-col-layout">
        <!-- Content Column -->
        <main class="article-content-column">
            <div class="article-content-body">
                <?php the_content(); ?>
            </div>
        </main>

        <!-- Sidebar Column -->
        <aside class="article-sidebar-column">
            <div class="worth-reading-box">
                <div class="block-heading-row">
                    <h3 class="block-title">महत्वपूर्ण नीतियां एवं लिंक</h3>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; padding-top: 10px;">
                    <a href="<?php echo esc_url(home_url('/')); ?>" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--color-border); text-decoration: none; color: inherit; font-size: 0.9rem;">
                        <span>मुख्य पृष्ठ (Homepage)</span><span style="color: var(--color-primary-red);">→</span>
                    </a>
                    <a href="<?php echo esc_url(home_url('/?cat=81')); ?>" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--color-border); text-decoration: none; color: inherit; font-size: 0.9rem;">
                        <span>ई-पेपर (E-Paper)</span><span style="color: var(--color-primary-red);">→</span>
                    </a>
                    <a href="<?php echo esc_url(home_url('/?cat=80')); ?>" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--color-border); text-decoration: none; color: inherit; font-size: 0.9rem;">
                        <span>संपादकीय आलेख (Opinions)</span><span style="color: var(--color-primary-red);">→</span>
                    </a>
                </div>
            </div>

            <!-- IT Rules Compliance Notice -->
            <div style="margin-top: 25px; padding: 18px; background-color: var(--color-card-bg); border: 1px solid var(--color-border); border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary-red);">
                <h4 style="color: var(--color-primary-red); font-size: 0.88rem; margin-bottom: 8px; font-weight: 700;">डिजिटल मीडिया आचार संहिता</h4>
                <p style="font-size: 0.80rem; line-height: 1.6; color: var(--color-text-muted);">
                    <strong>शिकायत निवारण अधिकारी:</strong> संतोष तिवारी<br>
                    <strong>ईमेल:</strong> editor@rashtrarang.com<br>
                    <strong>कार्यालय:</strong> कोलकाता, पश्चिम बंगाल<br>
                    सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम 2021 के अंतर्गत पंजीकृत।
                </p>
            </div>
        </aside>
    </div>

    <?php endwhile; ?>
</div>

<?php get_footer(); ?>
