<?php
/**
 * @author Webkul
 *
 * @version 2.0.0
 * This file handles helper config class.
 */

namespace WKWC_POS\Helper\Order;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Orders_Helper' ) ) {
	/**
	 * Class for including pos Orders data.
	 */
	class WC_Pos_Orders_Helper implements Util\Order_Interface {

		public $table_name        = '';
		public $table_name_post   = '';
		public $order_status_list = '';
		public $wpdb              = '';

		/**
		 * Class constructor.
		 */
		public function __construct() {
			global $wpdb;

			$this->wpdb = $wpdb;

			$this->table_name = $wpdb->prefix . 'postmeta';

			$this->table_name_outlet = $this->wpdb->prefix . 'woocommerce_pos_outlets';

			$this->table_name_post = $wpdb->prefix . 'posts';

			$order_status = array_keys( wc_get_order_statuses() );

			$this->order_status_list = implode(
				',',
				array_map(
					function ( $val ) {
						return sprintf( "'%s'", $val );
					},
					$order_status
				)
			);
		}

		public function pos_get_all_outlets_name_and_id() {
			$response = array();
			$response = $this->wpdb->get_results( "Select id, outlet_name from $this->table_name_outlet", ARRAY_A );

			return apply_filters( 'wkwcpos_modify_all_outlets_names_for_filter_values', $response );
		}

		public function pos_get_outlet_name_by_id( $outlet_id ) {
			$response = '';
			$response = $this->wpdb->get_var( $this->wpdb->prepare( "Select outlet_name from $this->table_name_outlet WHERE id = %d", $outlet_id ) );

			return apply_filters( 'wkwcpos_modify_outlet_name_for_filter_values', $response );
		}

		public function pos_get_all_order_by_search_count( $search_query = '', $pay_method = '' ) {
			$search_query = apply_filters( 'wkwcpos_modify_search_query_for_getting_all_orders_count', $search_query );

			$pay_method = apply_filters( 'wkwcpos_modify_pay_method_for_getting_all_orders_count', $pay_method );

			if ( ! empty( $search_query ) && ! empty( $pay_method ) ) {
				$result = $this->wpdb->get_row(
					$this->wpdb->prepare(
						"SELECT count(*) FROM $this->table_name_post as posts , $this->table_name as postmeta,$this->table_name as postmeta2  where posts.ID = postmeta.post_id AND
				posts.ID = postmeta2.post_id AND posts.post_status IN (" . $this->order_status_list . ") AND posts.post_type = 'shop_order' AND  postmeta.meta_key = '_wk_wc_pos_outlet' AND postmeta2.meta_key = '_payment_method' AND postmeta2.meta_value = %s AND posts.ID=%d",
						$search_query,
						$pay_method
					),
					ARRAY_A
				);
			} elseif ( empty( $search_query ) && ! empty( $pay_method ) ) {
				$result = $this->wpdb->get_row(
					$this->wpdb->prepare(
						"SELECT count(*) FROM $this->table_name_post as posts , $this->table_name as postmeta,$this->table_name as postmeta2  where posts.ID = postmeta.post_id AND
				posts.ID = postmeta2.post_id AND posts.post_status IN (" . $this->order_status_list . ") AND posts.post_type = 'shop_order' AND  postmeta.meta_key = '_wk_wc_pos_outlet' AND postmeta2.meta_key = '_payment_method' AND postmeta2.meta_value = %s",
						$pay_method
					),
					ARRAY_A
				);
			} elseif ( ! empty( $search_query ) && empty( $pay_method ) ) {
				$result = $this->wpdb->get_row( $this->wpdb->prepare( "SELECT count(*) FROM $this->table_name_post as posts JOIN $this->table_name as postmeta on posts.ID = postmeta.post_id where posts.post_status IN (" . $this->order_status_list . ") AND posts.post_type = 'shop_order' AND  postmeta.meta_key = '_wk_wc_pos_outlet' AND posts.ID=%d", $search_query ), ARRAY_A );
			} else {
				$result = $this->wpdb->get_row( "SELECT count(*) FROM $this->table_name_post as posts JOIN $this->table_name as postmeta on posts.ID = postmeta.post_id where posts.post_status IN (" . $this->order_status_list . ") AND posts.post_type = 'shop_order' AND  postmeta.meta_key = '_wk_wc_pos_outlet'", ARRAY_A );
			}

			return apply_filters( 'wkwcpos_modify_pos_orders_count', $result, $search_query, $pay_method );
		}

		public function pos_get_all_orders( $perpage, $offset ) {
			$order_search = '';

			if ( isset( $_GET['s'] ) && ! empty( $_GET['s'] ) ) {
				$order_search = intval( $_GET['s'] );

				$args = array(
					'post_type'      => 'shop_order',
					'meta_key'       => '_wk_wc_pos_outlet',
					'include'        => $order_search,
					'posts_per_page' => $perpage,
					'offset'         => $offset,
					'post_status'    => array_keys( wc_get_order_statuses() ),
				);
			} elseif ( isset( $_GET['pos-payment-method'] ) && ! empty( $_GET['pos-payment-method'] ) ) {
				$payment_filter = $_GET['pos-payment-method'];

				$args = array(
					'post_type'      => 'shop_order',
					'meta_query'     => array(
						array(
							'key'   => '_payment_method',
							'value' => $payment_filter,
						),
						array(
							'key' => '_wk_wc_pos_outlet',
						),
					),
					'posts_per_page' => $perpage,
					'offset'         => $offset,
					'post_status'    => array_keys( wc_get_order_statuses() ),
				);
			} elseif ( isset( $_GET['pos-select-outlet'] ) && ! empty( $_GET['pos-select-outlet'] ) ) {
				$agent_search = intval( $_GET['pos-select-outlet'] );

				$args = array(
					'post_type'      => 'shop_order',
					'meta_key'       => '_wk_wc_pos_outlet',
					'meta_value'     => $agent_search,
					'posts_per_page' => $perpage,
					'offset'         => $offset,
					'post_status'    => array_keys( wc_get_order_statuses() ),
				);
			} else {
				$args = array(
					'post_type'      => 'shop_order',
					'meta_key'       => '_wk_wc_pos_outlet',
					'posts_per_page' => $perpage,
					'offset'         => $offset,
					'post_status'    => array_keys( wc_get_order_statuses() ),
				);
			}

			$pos_orders = get_posts( $args );

			return apply_filters( 'wkwcpos_modify_pos_orders', $pos_orders, $perpage, $offset, $order_search );
		}
	}
}
