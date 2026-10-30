<?php
/** Run with PHP inside the local/staging WordPress container after an authorized restore. */
require '/var/www/html/wp-load.php';
if (!in_array(wp_get_environment_type(), ['local', 'staging'], true)) {
    fwrite(STDERR, "Refusing to modify a production database.\n");
    exit(1);
}
global $wpdb;
// Preserve genuine reviews. Stop the extra schema plugin from inventing default ones.
$settings = get_option('sd_data', []);
if (is_array($settings)) {
    $settings['saswp_default_review'] = 0;
    update_option('sd_data', $settings);
}
$plugins = get_option('active_plugins', []);
update_option('active_plugins', array_values(array_diff($plugins, ['schema-and-structured-data-for-wp/structured-data-for-wp.php'])));
$articles = $wpdb->get_results("SELECT ID,post_content,post_excerpt FROM {$wpdb->posts} WHERE post_status='publish' AND post_type='post' AND post_content LIKE '%/product-category/marine-locks%'");
foreach ($articles as $article) {
    $result = wp_update_post([
        'ID'=>$article->ID,
        'post_content'=>wp_slash(str_replace('/product-category/marine-locks', '/brand/marine-locks', $article->post_content)),
        'post_excerpt'=>wp_slash(str_replace('/product-category/marine-locks', '/brand/marine-locks', $article->post_excerpt)),
    ], true);
    if (is_wp_error($result)) { fwrite(STDERR, "An article update failed.\n"); exit(1); }
}
if (function_exists('_wc_term_recount')) {
    foreach (['product_brand', 'product_cat'] as $taxonomy) {
        if (!taxonomy_exists($taxonomy)) { continue; }
        $ids = get_terms(['taxonomy'=>$taxonomy, 'hide_empty'=>false, 'fields'=>'tt_ids']);
        if (is_wp_error($ids)) { fwrite(STDERR, "Term lookup failed.\n"); exit(1); }
        _wc_term_recount($ids, get_taxonomy($taxonomy), true, true);
    }
    delete_transient('wc_term_counts');
}
update_option('blog_public', '0');
flush_rewrite_rules();
echo count($articles)." article links repaired; synthetic default reviews disabled; catalogue counts refreshed; staging indexing disabled.\n";
