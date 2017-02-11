<?php
/**
 * @file
 * filtered_videos.features.inc
 */

/**
 * Implements hook_node_info().
 */
function filtered_videos_node_info() {
  $items = array(
    'filtered_videos' => array(
      'name' => t('Filtered Videos'),
      'base' => 'node_content',
      'description' => t('Filtered videos content type.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
