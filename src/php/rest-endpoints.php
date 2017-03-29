<?php

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

function rest_api_create_event_info() {
    register_rest_field('sp_event', 'event_info', array(
           'get_callback' => 'get_event_info',
           'schema' => null,
        )
    );
}

function get_event_info( $object ) {
    $postId = $object['id'];
    $transientName = 'event-info-' . $postId;

    $current = get_transient($transientName);

    if ($current) {
        return $current;
    }

    $competition = wp_get_post_terms($postId, 'sp_league')[0];
    $season = wp_get_post_terms($postId, 'sp_season')[0];
    $homeTeam = get_post($object['teams'][0]);
    $awayTeam = get_post($object['teams'][1]);

    $info = array(
        'competition' => $competition,
        'teams' => array($homeTeam, $awayTeam),
        'season' => $season,
        'players' => array()
    );

    foreach ($object['players'] as $playerId) {
        if ($playerId > 0) {
            $info['players'][] = get_post($playerId);
        }
    }

    set_transient($transientName, $info);

    return $info;
}

add_action('rest_api_init', 'rest_api_create_event_info');
