<?php
/**
* @author Webkul
* @version 2.0.0
* This file handles helper config class.
*/

namespace WKWC_POS\Helper\Product;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Products_Helper' ) ) {

	/**
	* Class for includin core Products data.
	*/
	class WC_Pos_Products_Helper implements Util\Product_Interface {

		public $table_name      = '';
		public $table_name_post = '';
		public $wpdb            = '';

		/**
		* Class constructor.
		*/
		public function __construct() {

			global $wpdb;

			$this->wpdb = $wpdb;

			$this->table_name = $wpdb->prefix . 'posts';

			$this->table_product_map = $wpdb->prefix . 'woocommerce_pos_outlet_product_map';
			$this->table_outlet_map  = $wpdb->prefix . 'woocommerce_pos_outlet_map';

		}


		public function pos_get_all_product_by_count( $search_query = '', $filtered_outlet = '' ) {

			$filtered_outlet_query = '';

			if ( ! empty( $filtered_outlet ) ) {
				$filtered_outlet_query = $this->wpdb->prepare( 'AND product_map.outlet_id=%d', $filtered_outlet );
			}

			if ( ! empty( $search_query ) ) {

				$items = $this->wpdb->get_row( "SELECT count(*) FROM $this->table_product_map as product_map LEFT JOIN $this->table_name as posts ON posts.ID=product_map.product_id where posts.post_type='product' AND posts.post_status='publish' AND  product_map.pos_status = 'enabled' $filtered_outlet_query AND posts.post_title like '%{$search_query}%'", ARRAY_A );

			} else {

				$items = $this->wpdb->get_row( "SELECT count(*) FROM $this->table_product_map as product_map LEFT JOIN $this->table_name as posts ON posts.ID=product_map.product_id where posts.post_type='product' AND posts.post_status='publish' AND  product_map.pos_status = 'enabled' $filtered_outlet_query", ARRAY_A );
			}
			$args = array(
				'search_query'          => $search_query,
				'filtered_outlet_query' => $filtered_outlet_query,
			);

			return apply_filters( 'wk_pos_wpml_pos_get_all_product_by_count', $items, $args );

		}


		public function get_all_pos_products( $search_query = '', $off, $perpage, $filtered_outlet = '' ) {

			$filtered_outlet_query = '';

			if ( ! empty( $filtered_outlet ) && empty( $search_query ) ) {
				$filtered_outlet_query = $this->wpdb->prepare( 'AND product_map.outlet_id=%d', $filtered_outlet );
			}

			if ( ! empty( $search_query ) && empty( $filtered_outlet ) ) {

				$items = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT product_map.outlet_id, product_map.product_id FROM $this->table_product_map as product_map LEFT JOIN $this->table_name as posts ON posts.ID=product_map.product_id where posts.post_type='product' AND product_map.pos_status = 'enabled' AND posts.post_status='publish' AND posts.post_title $filtered_outlet_query like %s LIMIT %d OFFSET %d ", "%{$search_query}%", $perpage, $off ), ARRAY_A );

			} elseif ( ! empty( $search_query ) && ! empty( $filtered_outlet ) ) {
				$items = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT product_map.outlet_id, product_map.product_id FROM $this->table_product_map as product_map LEFT JOIN $this->table_name as posts ON posts.ID=product_map.product_id where posts.post_type='product' AND product_map.pos_status = 'enabled' AND posts.post_status='publish' AND posts.post_title $filtered_outlet_query like %s AND product_map.outlet_id=%d LIMIT %d OFFSET %d ", "%{$search_query}%", $filtered_outlet, $perpage, $off ), ARRAY_A );
			} else {

				$items = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT product_map.outlet_id, product_map.product_id FROM $this->table_product_map as product_map LEFT JOIN $this->table_name as posts ON posts.ID=product_map.product_id where posts.post_type='product' AND posts.post_status='publish' AND product_map.pos_status = 'enabled' $filtered_outlet_query LIMIT %d OFFSET %d", $perpage, $off ), ARRAY_A );
			}
			$args = array(
				'search_query'          => $search_query,
				'off'                   => $off,
				'perpage'               => $perpage,
				'filtered_outlet_query' => $filtered_outlet_query,
			);

			return apply_filters( 'wk_pos_wpml_get_all_pos_products', $items, $args );

		}

	}

}
