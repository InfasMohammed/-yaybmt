<?php
if (!defined('ABSPATH')) { exit; }
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('woocommerce');
    register_nav_menus(['primary' => 'Primary navigation']);
});
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('yaybmt', get_theme_file_uri('/assets/site.css'), [], '0.10.0');
    wp_enqueue_script('yaybmt', get_theme_file_uri('/assets/site.js'), [], '0.10.0', true);
}, 20);
// Keep canonical URLs and metadata owned by WordPress / the existing SEO plugin.
// Never generate prices, ratings, or reviews from unverified catalogue data.
function yaybmt_url($path) { return esc_url(home_url($path)); }

// Homepage catalogue images remain editable without changing theme files.
function yaybmt_ranges() {
    return ['marine-locks'=>'Marine locks', 'marine-sanitary'=>'Marine sanitary fittings', 'cp-fittings'=>'CP fittings', 'flush-valves'=>'Flush valves', 'mirrors-cabinets'=>'Mirrors & cabinets', 'marine-furniture'=>'Marine furniture fittings', 'marine-hardware'=>'Marine hardware fittings', 'abrasives'=>'Abrasives', 'fasteners'=>'Fasteners', 'general-hardware'=>'General hardware', 'industrial-pipes'=>'Oil field & industrial pipe fittings', 'plumbing'=>'PPR/UPVC pipes & fittings'];
}
add_action('customize_register', function ($customizer) {
    $customizer->add_section('yaybmt_hero', ['title'=>'Homepage background image', 'priority'=>34]);
    $customizer->add_setting('yaybmt_hero_image', ['default'=>'', 'sanitize_callback'=>'esc_url_raw']);
    $customizer->add_control(new WP_Customize_Image_Control($customizer, 'yaybmt_hero_image', ['label'=>'Hero background image', 'description'=>'Choose a wide landscape image. A dark overlay keeps the heading readable.', 'section'=>'yaybmt_hero']));
    $customizer->add_section('yaybmt_catalogue', ['title'=>'Homepage product images', 'priority'=>35]);
    foreach (yaybmt_ranges() as $key=>$label) {
        $setting='yaybmt_image_'.$key;
        $customizer->add_setting($setting, ['default'=>'', 'sanitize_callback'=>'esc_url_raw']);
        $customizer->add_control(new WP_Customize_Image_Control($customizer, $setting, ['label'=>$label, 'section'=>'yaybmt_catalogue']));
    }
});

// Connect homepage ranges to the existing catalogue; never create competing taxonomies.
function yaybmt_catalogue_url() {
    if (function_exists('wc_get_page_permalink') && wc_get_page_id('shop') > 0) {
        return esc_url(wc_get_page_permalink('shop'));
    }
    return yaybmt_url('/#ranges');
}
function yaybmt_range_url($key, $label) {
    $ranges = [
        'marine-locks'=>['product_brand','marine-locks'],
        'marine-sanitary'=>['product_brand','marine-sanitary-fittings'],
        'cp-fittings'=>['product_cat','cp-fittings'],
        'flush-valves'=>['product_cat','flush-valve'],
        'mirrors-cabinets'=>['product_cat','mirror-cabinets'],
        'marine-furniture'=>['product_cat','marine-furniture-fittings'],
        'marine-hardware'=>['product_cat','marine-hardware-fittings'],
        'abrasives'=>['product_cat','abrasives'],
        'fasteners'=>['product_cat','fasteners'],
        'general-hardware'=>['product_cat','general-hardware'],
        'industrial-pipes'=>['product_cat','oil-field-industrial-pipe-fittings'],
        'plumbing'=>['product_cat','ppr-upvc-pipes-fittings'],
    ];
    if (isset($ranges[$key]) && taxonomy_exists($ranges[$key][0])) {
        $term = get_term_by('slug', $ranges[$key][1], $ranges[$key][0]);
        if ($term) {
            $url = get_term_link($term);
            if (!is_wp_error($url)) { return esc_url($url); }
        }
    }
    if ($key === 'marine-locks') { return yaybmt_url('/brand/marine-locks/'); }
    return esc_url('mailto:sales@yaybmt.com?subject='.rawurlencode('Product enquiry: '.$label));
}
add_action('woocommerce_single_product_summary', function () {
    global $product;
    if (!$product) { return; }
    $subject = 'Product enquiry: '.$product->get_name();
    $body = 'Please confirm specifications and availability for '.$product->get_name().".\n".get_permalink($product->get_id());
    echo '<div class="product-enquiry"><a class="button" href="'.esc_url('mailto:sales@yaybmt.com?subject='.rawurlencode($subject).'&body='.rawurlencode($body)).'">Enquire about this product <span aria-hidden="true">→</span></a><p>Send our team your quantity and required specifications.</p></div>';
}, 35);

// Preserve the established Marine Locks archive when old articles use the wrong route.
add_action('template_redirect', function () {
    $requested = wp_parse_url(wp_unslash($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH);
    $old_path = wp_parse_url(home_url('/product-category/marine-locks/'), PHP_URL_PATH);
    if ($requested && untrailingslashit($requested) === untrailingslashit($old_path)) {
        wp_safe_redirect(home_url('/brand/marine-locks/'), 301);
        exit;
    }
}, 1);

// A shared frame keeps differently shaped images aligned across every product row.
add_filter('woocommerce_product_get_image', function ($image) {
    if (trim($image) === '') {
        $image = '<span class="product-image-label">Product image coming soon</span>';
    }
    return '<div class="product-card-media">'.$image.'</div>';
}, 20);
add_filter('woocommerce_loop_add_to_cart_link', function ($html, $product) {
    return $product->get_price() === '' ? '' : $html;
}, 20, 2);

// One source of confirmed contact details for every theme template.
function yaybmt_contact() {
    return [
        'location'=>'Deira, Dubai',
        'phone'=>'+971 4 227 8616', 'phone_uri'=>'tel:+97142278616',
        'whatsapp'=>'+971 56 736 9803', 'whatsapp_url'=>'https://wa.me/971567369803',
        'sales'=>'sales@yaybmt.com', 'info'=>'info@yaybmt.com',
        'map'=>'https://www.google.com/maps?ll=25.272995,55.311195&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=10643360148458649588',
        'instagram'=>'https://www.instagram.com/yaybmt/',
        'facebook'=>'https://www.facebook.com/people/Yusuf-Al-Yousfi-Building-Materials-Trading-LLC/61573646427608/',
    ];
}
function yaybmt_whatsapp_url($message = '') {
    $url = yaybmt_contact()['whatsapp_url'];
    return $message !== '' ? $url.'?text='.rawurlencode($message) : $url;
}
function yaybmt_whatsapp_icon() {
    return yaybmt_brand_icon('whatsapp');
}
function yaybmt_brand_icon($name) {
    if (!in_array($name, ['whatsapp', 'instagram', 'facebook'], true)) { return ''; }
    $path=get_theme_file_path('/assets/icons/'.$name.'.svg');
    return is_readable($path) ? file_get_contents($path) : '';
}
function yaybmt_logo_url($position) {
    if (!in_array($position, ['header', 'footer'], true)) { return ''; }
    $configured=get_theme_mod('yaybmt_'.$position.'_logo');
    if ($configured) { return $configured; }
    if ($position==='header' && has_custom_logo()) {
        $url=wp_get_attachment_image_url(get_theme_mod('custom_logo'), 'full');
        if ($url) { return $url; }
    }
    $file=$position==='header' ? '/assets/logo-header-original.jpg' : '/assets/logo-footer-original.png';
    return is_readable(get_theme_file_path($file)) ? get_theme_file_uri($file) : '';
}
add_action('customize_register', function($customizer) {
    $customizer->add_section('yaybmt_branding', ['title'=>'Company logos', 'priority'=>30]);
    foreach(['header'=>'Header logo (green original)', 'footer'=>'Footer logo (white original)'] as $position=>$label) {
        $setting='yaybmt_'.$position.'_logo';
        $customizer->add_setting($setting, ['default'=>'', 'sanitize_callback'=>'esc_url_raw']);
        $customizer->add_control(new WP_Customize_Image_Control($customizer, $setting, ['label'=>$label, 'section'=>'yaybmt_branding']));
    }
});

function yaybmt_navigation_terms($taxonomy, $top_level = false) {
    if (!taxonomy_exists($taxonomy)) { return []; }
    $args = ['taxonomy'=>$taxonomy, 'hide_empty'=>false, 'orderby'=>'name'];
    if ($top_level) { $args['parent'] = 0; }
    $terms = get_terms($args);
    return is_wp_error($terms) ? [] : $terms;
}
