<?php
/*
Plugin Name: Characters, Rick&Morty Series
Description: Used to show a bar search to filter data characters of the Rick and Morty series.
Version: 1.0
Author: Omar Alvarez
Author URI: https://github.com/ohmalvarez
License: GPLv2 or later
Text Domain:
*/


if ( ! defined( "ABSPATH" ) ) {
    exit; // Exit if accessed directly
}


/**
 * I let this files public (any page/post) because shortcode could be added with no limitation.
 */
wp_register_style('rm_style', plugin_dir_url(__FILE__) . 'admin/css/style.min.css');
wp_register_script('rm_js', plugin_dir_url(__FILE__) . 'admin/js/api.min.js');

wp_enqueue_style('rm_style');
wp_enqueue_script('rm_js');


/**
 * Checks if user logged is admin and has permissions to handle plugins.
 *
 * @return void
 */
function check_user_caps(){
    if(
        ! is_admin() &&
        ! current_user_can( 'upload_plugins' ) &&
        ! current_user_can( 'install_plugins' ) &&
        ! current_user_can( 'activate_plugins' )
    ) {
        exit( 'Your profile cannot install this plugin.' );
    }
}


/**
 * Shows a search bar to interact with Rick&Morty api search characters through js.
 *
 * @param $atts array NOT useful for the moment but capable to expand filter search.
 * @return string
 */
function char_shortcode( $atts = [] ) {

    // start form
    $o = '<form role="search" method="POST" action="" class="">';

    // label
    $o .= '<label class="rm-label-search" for="">Search Character:</label>';

    $o .= '<div>';

    // input search
    $o .= '<input class="rm-input-search"  placeholder="" type="search" name="s" required>';

    // button
    $o .= '<button aria-label="Search" class="rm-button-search" type="submit" onclick="apiCall( this.form )"><strong>Search</strong></button>';

    $o .= '</div>';

    // end form
    $o .= '</form>';

    $o .= '<figure id="result" class="wp-block-table is-style-stripes"></figure>';

    // return output
    return $o;
}


add_shortcode( 'chars', 'char_shortcode' );

add_action( 'check_user_capabilities', 'check_user_caps', 999 );