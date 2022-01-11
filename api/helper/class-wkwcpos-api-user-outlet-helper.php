<?php
/**
 * WooCommerce POS API setup.
 *
 * @author   Webkul
 *
 * @category API
 *
 * @version    1.0.0
*/

namespace WKWC_POS\Api\Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * POS User Outlet Handler.
 *
 * @class WKWCPOS_API_User_Outlet_Helper
 */
class WKWCPOS_API_User_Outlet_Helper {

	public function __construct() {
		global $wpdb;
		$this->wpdb                          = $wpdb;
		$this->map_table                     = $wpdb->prefix . 'woocommerce_pos_outlet_map';
		$this->outlet_table                  = $wpdb->prefix . 'woocommerce_pos_outlets';
		$this->product_table                 = $wpdb->prefix . 'woocommerce_pos_outlet_product_map';
		$this->posts_table                   = $wpdb->prefix . 'posts';
		$this->centralized_inventory_enabled = apply_filters( 'wk_wc_pos_enable_centralized_inventory', false );

	}

	public function _get_pos_user_outlet_with_status( $puser_id ) {
		$outlet_id = $this->wpdb->get_var( $this->wpdb->prepare( "select map.outlet_id from $this->map_table as map JOIN $this->outlet_table  as outlet ON outlet.id=map.outlet_id where map.user_id=%d AND outlet.outlet_status=0", $puser_id ) );

		return apply_filters( 'wkwcpos_modify_enabled_outlet_id_for_pos_user', $outlet_id, $puser_id );

	}

	public function get_pos_product_stock( $product_id, $outlet_id = '' ) {

		$result = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT pos_stock FROM $this->product_table WHERE product_id =%d and outlet_id=%d", $product_id, $outlet_id ) );

		return apply_filters( 'wkwcpos_modify_product_pos_stock_by_product_and_outlet_id', $result, $product_id, $outlet_id );

	}

	public function get_pos_product_cat( $pro_id ) {
		$product_cat_id = array();

		$terms = get_the_terms( $pro_id, 'product_cat' );

		if ( $terms ) {
			foreach ( $terms as $term ) {
				$product_cat_id[] = $term->term_id;

				if ( $term->parent != 0 ) {
					$product_cat_id[] = $term->parent;

					$product_cat_id = $this->check_parent( $product_cat_id, $term->parent );
				}
			}
		}

		return apply_filters( 'wkwcpos_modify_product_category_ids_by_product_id', $product_cat_id, $pro_id );

	}

	public function check_parent( $arr_ids, $cat_id ) {
		$cat = get_term( $cat_id );

		$parent_id = $cat->parent;

		if ( $parent_id != 0 ) {
			$arr_ids[] = $parent_id;

			$this->check_parent( $arr_ids, $parent_id );
		}

		return $arr_ids;
	}

	public function update_outlet_product_stock( $product_id, $outlet_id, $product_qty ) {

		$pos_stock = $this->get_pos_product_stock( $product_id, $outlet_id );

		if ( $pos_stock ) {
			$new_pos_stock = abs( $pos_stock ) - abs( $product_qty );
		} else {
			$new_pos_stock = '';
		}
		if ( apply_filters( 'wkwcpos_reduce_pos_stock_from_outlet', true, $product_id, $outlet_id, $product_qty ) ) {

			$this->wpdb->update(
				$this->product_table,
				array(
					'pos_stock' => $new_pos_stock,
				),
				array(
					'product_id' => $product_id,
					'outlet_id'  => $outlet_id,
				)
			);
		}

	}

	public function _get_pos_outlet( $outlet_id ) {
		$response = $this->wpdb->get_row( "select * from $this->outlet_table where id=" . $outlet_id );

		return apply_filters( 'wkwcpos_modify_outlet_by_outlet_id', $response, $outlet_id );
	}

	public function get_pos_user_outlet_products( $outlet_id ) {

		if ( ! $this->centralized_inventory_enabled ) {
			$res = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT outlet_product_map.product_id from $this->product_table as outlet_product_map JOIN $this->posts_table as posts ON outlet_product_map.product_id=posts.ID WHERE outlet_product_map.pos_status='enabled' AND outlet_product_map.pos_stock > 0 AND outlet_product_map.outlet_id=%d AND outlet_product_map.product_id=posts.ID AND posts.post_status=%s", $outlet_id, 'publish' ) );

		} else {
			$res = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT outlet_product_map.product_id from $this->product_table as outlet_product_map JOIN $this->posts_table as posts ON outlet_product_map.product_id=posts.ID WHERE outlet_product_map.pos_status='enabled' AND outlet_product_map.outlet_id=%d AND outlet_product_map.product_id=posts.ID AND posts.post_status=%s", $outlet_id, 'publish' ) );

		}

		$res = apply_filters( 'wkwcpos_modify_outlet_product_ids_by_outlet_id', $res, $outlet_id );

		if ( ! empty( $res ) ) {
			return $res;
		} else {
			return '';
		}
	}
}
