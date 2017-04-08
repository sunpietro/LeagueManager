<?php

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
