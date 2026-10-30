<!doctype html><html <?php language_attributes(); ?>><head><meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width, initial-scale=1"><?php wp_head(); ?></head><body <?php body_class(); ?>><?php wp_body_open(); $contact=yaybmt_contact(); ?><a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap header-row">
<a class="company-logo" href="<?php echo yaybmt_url('/'); ?>" aria-label="Yusuf Al Yousfi home"><?php $logo=yaybmt_logo_url('header'); if ($logo): ?><img src="<?php echo esc_url($logo); ?>" alt="Yusuf Al Yousfi Building Materials Trading LLC"><?php else: ?><span>Yusuf Al Yousfi<small>BUILDING MATERIALS TRADING LLC</small></span><?php endif; ?></a>
<button class="menu-toggle" aria-expanded="false" aria-controls="primary-nav">Menu <span aria-hidden="true">☰</span></button>
<nav id="primary-nav" aria-label="Primary navigation">
<?php if (has_nav_menu('primary')): wp_nav_menu(['theme_location'=>'primary','container'=>false,'menu_class'=>'nav-links']); else: ?>
<details class="nav-dropdown"><summary>Products <span aria-hidden="true">⌄</span></summary><div class="nav-panel"><a href="<?php echo yaybmt_catalogue_url(); ?>">All products →</a><?php foreach(yaybmt_navigation_terms('product_cat',true) as $term): if($term->slug==='uncategorized') { continue; } $url=get_term_link($term); if(is_wp_error($url)) { continue; } ?><a href="<?php echo esc_url($url); ?>"><?php echo esc_html(wp_specialchars_decode($term->name,ENT_QUOTES)); ?></a><?php endforeach; ?></div></details>
<a href="<?php echo yaybmt_url('/brand/marine-locks/'); ?>">Marine locks</a>
<details class="nav-dropdown"><summary>Brands <span aria-hidden="true">⌄</span></summary><div class="nav-panel"><?php $brands=yaybmt_navigation_terms('product_brand'); if (!$brands): ?><a href="<?php echo yaybmt_url('/#brands'); ?>">View our brands →</a><?php endif; foreach($brands as $term): $url=get_term_link($term); if(is_wp_error($url)) { continue; } ?><a href="<?php echo esc_url($url); ?>"><?php echo esc_html(wp_specialchars_decode($term->name,ENT_QUOTES)); ?></a><?php endforeach; ?></div></details>
<a href="<?php echo yaybmt_url('/#company'); ?>">Our company</a><a href="<?php echo yaybmt_url('/#contact'); ?>">Contact</a>
<?php endif; ?></nav>
</div></header>
