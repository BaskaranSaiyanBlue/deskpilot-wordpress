<?php
/**
 * Theme setup for DeskPilot.
 *
 * @package DeskPilot
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function deskpilot_enqueue_styles() {
    wp_enqueue_style(
        'deskpilot-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version')
    );
}

add_action('wp_enqueue_scripts', 'deskpilot_enqueue_styles');


add_action( 'init', function() {
    // Prevent fatal errors on WordPress versions older than 7.1
    if ( ! function_exists( 'wp_register_icon_collection' ) || ! function_exists( 'wp_register_icon' ) ) {
        return;
    }

    // 1. Register your custom icon category/tab
    wp_register_icon_collection( 'my-brand', array(
        'label' => __( 'My Custom Icons', 'textdomain' ),
    ) );

    // 2. Register individual SVG files from your theme or plugin folder
    wp_register_icon( 'my-brand/custom-clients', array(
        'label'     => __( 'Clients', 'textdomain' ),
        'file_path' => get_theme_file_path( 'assets/icons/clients.svg' ),
    ) );
	wp_register_icon( 'my-brand/custom-clock', array(
        'label'     => __( 'Clock', 'textdomain' ),
        'file_path' => get_theme_file_path( 'assets/icons/clock.svg' ),
    ) );
	wp_register_icon( 'my-brand/custom-smile', array(
        'label'     => __( 'Smile', 'textdomain' ),
        'file_path' => get_theme_file_path( 'assets/icons/smile.svg' ),
    ) );
	wp_register_icon( 'my-brand/custom-ticket', array(
        'label'     => __( 'Ticket', 'textdomain' ),
        'file_path' => get_theme_file_path( 'assets/icons/ticket.svg' ),
    ) );
} );
