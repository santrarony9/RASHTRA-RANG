<?php
/**
 * Comments Template - Rashtra Rang Modern
 *
 * @package RashtraRang
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="article-comments-area">
    <div class="section-heading">
        <h3 class="section-title">
            <span class="section-title-badge">प्रतिक्रिया</span>
            पाठकों की राय (<?php echo get_comments_number(); ?>)
        </h3>
    </div>

    <?php if (have_comments()) : ?>
        <ul class="comment-list" style="margin-bottom: 28px;">
            <?php
            wp_list_comments(array(
                'style'       => 'ul',
                'short_ping'  => true,
                'avatar_size' => 42,
            ));
            ?>
        </ul>
    <?php endif; ?>

    <?php if (comments_open()) : ?>
        <div class="comment-form-wrap">
            <?php
            comment_form(array(
                'title_reply'          => 'अपनी टिप्पणी दर्ज करें',
                'title_reply_to'       => '%s को उत्तर दें',
                'cancel_reply_link'    => 'उत्तर रद्द करें',
                'label_submit'         => 'टिप्पणी भेजें',
                'comment_notes_before' => '<p style="font-size: 0.85rem; color: #666; margin-bottom: 12px;">आपका ईमेल पता प्रकाशित नहीं किया जाएगा।</p>',
            ));
            ?>
        </div>
    <?php else : ?>
        <p style="color: #888; font-size: 0.9rem;">इस समाचार पर टिप्पणियां बंद हैं।</p>
    <?php endif; ?>
</div>
