<?php
/**
 * Plugin Name: DeskPilot Blocks
 * Description: Custom Gutenberg blocks for the DeskPilot WordPress theme.
 * Version: 1.0.0
 * Author: Baskaran Chandrasekar
 * Text Domain: deskpilot
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register DeskPilot custom Gutenberg blocks.
 */
function deskpilot_register_blocks() {

    $blocks = array(
        'feature-grid',
        'stats',
        'testimonials',
        'pricing',
    );

    foreach ( $blocks as $block ) {
        register_block_type(
            __DIR__ . '/build/blocks/' . $block
        );
    }
}

add_action( 'init', 'deskpilot_register_blocks' );


/**
 * Load styles inside the Gutenberg editor.
 */
function deskpilot_enqueue_editor_styles() {
    $css_file = __DIR__ . '/build/style-index.css';

    if ( file_exists( $css_file ) ) {
        wp_enqueue_style(
            'deskpilot-feature-grid-editor',
            plugin_dir_url( __FILE__ ) . 'build/style-index.css',
            array(),
            filemtime( $css_file )
        );
    }
}
add_action( 'enqueue_block_editor_assets', 'deskpilot_enqueue_editor_styles' );