<?php get_header(); ?>
<main id="main" class="wrap section catalogue-page">
<?php if (is_singular('product')): woocommerce_content(); else: ?>
<div class="catalogue-layout"><?php get_template_part('sidebar', 'catalogue'); ?><div class="catalogue-results"><p class="eyebrow">THE PRODUCT COLLECTION</p><?php woocommerce_content(); ?></div></div>
<?php endif; ?>
</main><?php get_footer(); ?>
