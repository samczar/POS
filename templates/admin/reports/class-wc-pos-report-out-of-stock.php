<?php

namespace WKWC_POS\Templates\Admin\Reports;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'WC_Report_Stock' ) ) {
	require_once dirname( __FILE__ ) . '/class-wc-report-stock.php';
}

/**
 * WC_Report_Out_Of_Stock.
 *
 * @author      WooThemes
 *
 * @category    Admin
 *
 * @version     2.1.0
 */
class WC_Pos_Report_Out_Of_Stock extends WC_Report_Stock {

	/**
	 * No items found text.
	 */
	public function no_items() {
		_e( 'No out of stock products found.', 'wc_pos' );
	}

	/**
	 * Get Products matching stock criteria.
	 *
	 * @param int $current_page
	 * @param int $per_page
	 */
	public function get_items( $current_page, $per_page, $outlet_id ) {
		global $wpdb;

		$this->max_items = 0;
		$this->items     = array();

		// Get products using a query - this is too advanced for get_posts :(
		$stock = absint( max( get_option( '_pos_low_stock_warn' ), 0 ) );

		if ( $outlet_id == 0 ) {
			$this->items = $wpdb->get_results(
				$wpdb->prepare(
					"SELECT posts.ID AS id, posts.post_parent AS parent FROM $wpdb->posts AS posts,
					 $wpdb->postmeta as meta1 ,
					 $wpdb->postmeta as meta3
					 WHERE posts.ID = meta1.post_id AND
					 posts.ID = meta3.post_id AND
					 posts.post_type IN ('product','product_variation') AND
					 posts.post_status = 'publish' AND
					 meta1.meta_key = '_manage_stock' AND
					 (
						 (meta3.meta_key = '_pos_master_stock' AND meta3.meta_value <= 0)
						 OR
						 (meta3.meta_key = '_pos_variation_master_stock' AND meta3.meta_value <= 0)
					 )
					 GROUP BY posts.ID ORDER BY CAST(meta1.meta_value AS SIGNED) DESC LIMIT %d, %d",
					( $current_page - 1 ) * $per_page,
					$per_page
				)
			);

			$this->max_items = $wpdb->get_var(
				"SELECT COUNT(DISTINCT posts.ID) FROM $wpdb->posts AS posts,
			 $wpdb->postmeta as meta1 ,
			 $wpdb->postmeta as meta3
			 WHERE posts.ID = meta1.post_id AND
			 posts.ID = meta3.post_id AND
			 posts.post_type IN ('product','product_variation') AND
			 posts.post_status = 'publish' AND
			 meta1.meta_key = '_manage_stock' AND
			 (
				 (meta3.meta_key = '_pos_master_stock' AND meta3.meta_value <= 0)
				 OR
				 (meta3.meta_key = '_pos_variation_master_stock' AND meta3.meta_value <= 0)
			 ) "
			);
		} else {
			$outlet_map  = $wpdb->prefix . 'woocommerce_pos_outlet_map';
			$product_map = $wpdb->prefix . 'woocommerce_pos_outlet_product_map';

			$this->items = $wpdb->get_results(
				$wpdb->prepare(
					"SELECT posts.ID AS id, posts.post_parent AS parent FROM $wpdb->posts AS posts,
				 $wpdb->postmeta as meta1 ,
				 $wpdb->postmeta as meta3,
				 $product_map as mapped
				 WHERE posts.ID = meta1.post_id AND
				 posts.ID = meta3.post_id AND
				 posts.ID = mapped.product_id AND
				 posts.post_type IN ('product','product_variation') AND
				 posts.post_status = 'publish' AND
				 meta1.meta_key = '_manage_stock' AND
				 (
					 (meta3.meta_key = '_pos_master_stock')
					 OR
					 (meta3.meta_key = '_pos_variation_master_stock')
				 )AND
				 ( mapped.pos_stock <= 0 ) AND
				 mapped.outlet_id = $outlet_id
				 GROUP BY posts.ID ORDER BY CAST(meta1.meta_value AS SIGNED) DESC LIMIT %d, %d",
					( $current_page - 1 ) * $per_page,
					$per_page
				)
			);

			$this->max_items = $wpdb->get_var(
				"SELECT COUNT(DISTINCT posts.ID) FROM $wpdb->posts AS posts,
				 $wpdb->postmeta as meta1 ,
 				 $wpdb->postmeta as meta3,
				 $product_map as mapped
				 WHERE posts.ID = meta1.post_id AND
				 posts.ID = meta3.post_id AND
				 posts.ID = mapped.product_id AND
				 posts.post_type IN ('product','product_variation') AND
				 posts.post_status = 'publish' AND
				 meta1.meta_key = '_manage_stock' AND
				 (
			 		 (meta3.meta_key = '_pos_master_stock')
					 OR
					 (meta3.meta_key = '_pos_variation_master_stock')
				 )AND
				 ( mapped.pos_stock <= 0 )  AND
				 mapped.outlet_id = $outlet_id"
			);
		}
	}
}
