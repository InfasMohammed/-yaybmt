<?php
function yaybmt_is_design_sample() {
    return isset($_GET['design_sample']) && $_GET['design_sample']==='1' && (is_singular('product') || is_post_type_archive('product') || is_tax(['product_brand','product_cat']));
}
add_action('wp_enqueue_scripts', function () {
    if (yaybmt_is_design_sample()) { wp_enqueue_style('yaybmt-design-sample', home_url('/yaybmt-samples/sample.css'), ['yaybmt'], filemtime('/var/www/html/yaybmt-samples/sample.css')); wp_enqueue_script('yaybmt-design-sample', home_url('/yaybmt-samples/sample.js'), [], filemtime('/var/www/html/yaybmt-samples/sample.js'), true); }
}, 30);
add_filter('template_include', function ($template) { return yaybmt_is_design_sample() ? '/var/www/html/yaybmt-samples/template.php' : $template; }, 100);
add_filter('woocommerce_loop_product_link', function ($url) { return yaybmt_is_design_sample() ? add_query_arg('design_sample', '1', $url) : $url; });

add_filter('body_class', function ($classes) { if(yaybmt_is_design_sample()){ $classes[]='yb-sample'; } return $classes; });
