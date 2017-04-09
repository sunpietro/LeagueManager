<?php

// https://github.com/airesvsg/wp-rest-api-cache

function expose_rest_endpoints() {
    global $wp_post_types;
    global $wp_taxonomies;

    $wp_post_types['sp_player']->show_in_rest = true;
    $wp_post_types['sp_player']->rest_base = 'player';
    $wp_post_types['sp_player']->rest_controller_class = 'WP_REST_Posts_Controller';

    $wp_post_types['sp_team']->show_in_rest = true;
    $wp_post_types['sp_team']->rest_base = 'team';
    $wp_post_types['sp_team']->rest_controller_class = 'WP_REST_Posts_Controller';

    $wp_post_types['sp_staff']->show_in_rest = true;
    $wp_post_types['sp_staff']->rest_base = 'staff';
    $wp_post_types['sp_staff']->rest_controller_class = 'WP_REST_Posts_Controller';

    $wp_post_types['sp_table']->show_in_rest = true;
    $wp_post_types['sp_table']->rest_base = 'table';
    $wp_post_types['sp_table']->rest_controller_class = 'WP_REST_Posts_Controller';

    $wp_post_types['sp_list']->show_in_rest = true;
    $wp_post_types['sp_list']->rest_base = 'squad';
    $wp_post_types['sp_list']->rest_controller_class = 'WP_REST_Posts_Controller';

    $wp_post_types['sp_event']->show_in_rest = true;
    $wp_post_types['sp_event']->rest_base = 'game';
    $wp_post_types['sp_event']->rest_controller_class = 'WP_REST_Posts_Controller';

    $wp_post_types['sp_calendar']->show_in_rest = true;
    $wp_post_types['sp_calendar']->rest_base = 'calendar';
    $wp_post_types['sp_calendar']->rest_controller_class = 'WP_REST_Posts_Controller';

    $wp_taxonomies['sp_league']->show_in_rest = true;
    $wp_taxonomies['sp_league']->rest_base = 'competition';
    $wp_taxonomies['sp_league']->rest_controller_class = 'WP_REST_Terms_Controller';

    $wp_taxonomies['sp_season']->show_in_rest = true;
    $wp_taxonomies['sp_season']->rest_base = 'season';
    $wp_taxonomies['sp_season']->rest_controller_class = 'WP_REST_Terms_Controller';

    $wp_taxonomies['sp_venue']->show_in_rest = true;
    $wp_taxonomies['sp_venue']->rest_base = 'venue';
    $wp_taxonomies['sp_venue']->rest_controller_class = 'WP_REST_Terms_Controller';

    $wp_taxonomies['sp_position']->show_in_rest = true;
    $wp_taxonomies['sp_position']->rest_base = 'position';
    $wp_taxonomies['sp_position']->rest_controller_class = 'WP_REST_Terms_Controller';
}
add_action('init', 'expose_rest_endpoints');

require get_parent_theme_file_path('/inc/actions/event-actions.php');
require get_parent_theme_file_path('/inc/actions/player-actions.php');
require get_parent_theme_file_path('/inc/actions/team-actions.php');
