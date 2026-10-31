<?php
/** Existing catalogue taxonomies own their URLs and counts. */
if (!defined('ABSPATH')) { exit; }
$brand_taxonomy = '';
foreach (['brand', 'product_brand', 'pwb-brand', 'yith_product_brand'] as $candidate) {
    if (taxonomy_exists($candidate)) { $brand_taxonomy = $candidate; break; }
}
?>
<aside class="catalogue-sidebar" aria-label="Browse products">
<?php foreach (['Brands'=>$brand_taxonomy, 'Categories'=>'product_cat'] as $heading=>$taxonomy): ?>
<section class="catalogue-filter"><h2><?php echo esc_html($heading); ?></h2>
<?php $terms = $taxonomy && taxonomy_exists($taxonomy) ? get_terms(['taxonomy'=>$taxonomy, 'hide_empty'=>false, 'orderby'=>'name']) : []; ?>
<?php if (!is_wp_error($terms) && $terms): ?><ul>
<?php foreach ($terms as $term): $url=get_term_link($term); if (is_wp_error($url)) { continue; } $current=is_tax($taxonomy, $term->term_id); ?>
<li><a href="<?php echo esc_url($url); ?>"<?php if ($current) { echo ' aria-current="page"'; } ?>><span><?php echo esc_html($term->name); ?></span><span class="term-count"><?php echo esc_html($term->count); ?></span></a></li>
<?php endforeach; ?></ul><?php else: ?><p class="catalogue-empty">Your existing <?php echo esc_html(strtolower($heading)); ?> will appear here after the catalogue is imported.</p><?php endif; ?>
</section><?php endforeach; ?>
</aside>
