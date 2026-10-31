<?php get_header(); ?>
<main id="main" class="wrap section content-page">
<?php if (is_archive()) { the_archive_title('<h1>', '</h1>'); the_archive_description('<div class="archive-description">', '</div>'); } elseif (is_home()) { echo '<h1>Insights</h1>'; } elseif (is_search()) { echo '<h1>Search results</h1>'; } ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<article <?php post_class(); ?>>
<?php if (is_singular()) : the_title('<h1>', '</h1>'); the_content(); wp_link_pages(); else : ?>
<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
<?php the_excerpt(); endif; ?>
</article><?php endwhile; the_posts_pagination(); else : ?>
<h1>Nothing found</h1><p>Try searching for the product or information you need.</p><?php get_search_form(); endif; ?>
</main><?php get_footer(); ?>
