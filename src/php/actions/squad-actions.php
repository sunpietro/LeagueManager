<?php

function rest_api_squad_meta() {
    register_rest_field('sp_list', 'squad_meta', array(
            'get_callback' => 'get_squad_meta',
            'update_callback' => 'update_squad_meta',
            'schema' => null,
        )
    );
}

function get_squad_meta($object) {
    $postId = $object['id'];

    return get_post_meta($postId);
}

function update_squad_meta($meta, $post) {
    $postId = $post->ID;

    foreach ($meta as $data) {
        update_post_meta($postId, $data['key'], $data['value']);
    }
}

add_action('rest_api_init', 'rest_api_squad_meta');
