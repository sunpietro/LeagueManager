<?php

function rest_api_player_meta() {
    register_rest_field('sp_player', 'player_meta', array(
            'get_callback' => 'get_player_meta',
           'update_callback' => 'update_player_meta',
           'schema' => null,
        )
    );
}

function get_player_meta($object) {
    $postId = $object['id'];
    $postMeta = get_post_meta($postId);

    $postMeta['image_url'] = wp_get_attachment_url($object['featured_media']);

    return $postMeta;
}

function update_player_meta($meta, $post) {
    $postId = $post->ID;

    foreach ($meta as $data) {
        update_post_meta($postId, $data['key'], $data['value']);
    }
}

add_action('rest_api_init', 'rest_api_player_meta');
