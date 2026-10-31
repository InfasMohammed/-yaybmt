<?php
$taxonomy=get_taxonomy(get_queried_object()->taxonomy);
if (!$taxonomy || !in_array('product', $taxonomy->object_type, true)) { require get_template_directory().'/index.php'; return; }
get_header(); ?>
<main id="main" class="wrap section catalogue-page"><div class="catalogue-layout">
<?php get_template_part('sidebar', 'catalogue'); ?>
<div class="catalogue-results"><p class="eyebrow">PRODUCT CATALOGUE</p><h1><?php echo esc_html(single_term_title('', false)); ?></h1>
<?php the_archive_description('<div class="archive-description">','</div>'); ?>
<?php if (have_posts()): ?><div class="archive-products">
<?php while(have_posts()): the_post(); ?><a class="archive-product" href="<?php the_permalink(); ?>"><div class="archive-product-image"><?php if (has_post_thumbnail()): the_post_thumbnail('medium_large', ['loading'=>'lazy']); else: ?><span>Product image coming soon</span><?php endif; ?></div><?php the_title('<h2>','</h2>'); ?></a><?php endwhile; ?>
</div><?php the_posts_pagination(['mid_size'=>1, 'prev_text'=>'←', 'next_text'=>'→']); ?>
<?php else: ?><p>No products are available in this range yet. <a href="mailto:sales@yaybmt.com">Contact our team about your requirements.</a></p><?php endif; ?>
</div></div></main><?php get_footer(); ?>
