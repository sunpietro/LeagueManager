<?php

function rest_api_team_meta() {
    register_rest_field('sp_team', 'team_meta', array(
            'get_callback' => 'get_team_meta',
            'update_callback' => 'update_team_meta',
            'schema' => null,
        )
    );
}

function get_team_meta($object) {
    $postId = $object['id'];

    return get_post_meta($postId);
}

function update_team_meta($meta, $post) {
    $postId = $post->ID;

    foreach ($meta as $data) {
        update_post_meta($postId, $data['key'], $data['value']);
    }
}

add_action('rest_api_init', 'rest_api_team_meta');
