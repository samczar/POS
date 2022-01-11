<?php

/**
 * @author Webkul
 *
 * @version 2.0.0
 * This file handles all front end action callbacks.
 */

namespace WKWC_POS\Includes\Front;

use WKWC_POS\Api\WKWCPOS_API_Register_Routes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Front_Function_Handler' ) ) {
	class WC_Pos_Front_Function_Handler {

		public function wkwcpos_init_pos_api() {
			WC()->frontend_includes();
			if ( is_user_logged_in() || true ) {

				if ( empty( WC()->cart ) ) {
					WC()->cart = new \WC_Cart();
				}
				if ( empty( WC()->session ) ) {
					WC()->session = new \WC_Session_Handler();
					WC()->session->init();
				}

				add_filter( 'wkwcpos_data_stores', array( __CLASS__, 'wkpos_add_data_stores' ) );

			}
			new WKWCPOS_API_Register_Routes();
		}

		/**
		 * Adds data stores.
		 *
		 * @param array $data_stores list of data stores
		 *
		 * @return array
		 */
		public static function wkpos_add_data_stores( $data_stores ) {
			return array_merge(
				$data_stores,
				array(
					'report-revenue-stats'  => 'WKWC_POS\Api\Includes\Reports\Revenue\Stats\WKWCPOS_Revenue_Stats',
					'report-products-stats' => 'WKWC_POS\Api\Includes\Reports\Products\Stats\WKWCPOS_Products_Stats',
					'report-coupons-stats'  => 'WKWC_POS\Api\Includes\Reports\Coupons\Stats\WKWCPOS_Coupons_Stats',
					'report-orders-stats'   => 'WKWC_POS\Api\Includes\Reports\Orders\Stats\WKWCPOS_Orders_Stats',
					'report-taxes-stats'    => 'WKWC_POS\Api\Includes\Reports\Taxes\Stats\WKWCPOS_Taxes_Stats',
					'report-payments-stats' => 'WKWC_POS\Api\Includes\Reports\Payments\Stats\WKWCPOS_Payments_Stats',
				)
			);
		}

		public function wkwcpos_add_lost_password_link( $content ) {
			$content .= '<a href="' . esc_url( wc_lostpassword_url() ) . '" class="wkwcpos-lost-password">' . esc_html__( 'Lost Password?', 'wc_pos' ) . '</a>';

			return $content;
		}

		public function wkwcpos_reduce_pos_master_stock_on_placing_order( $order_id ) {
			$order = new \WC_Order( $order_id );

			if ( ! empty( $order ) ) {
				foreach ( $order->get_items() as $item ) {
					$id = ! empty( $item['variation_id'] ) ? $item['variation_id'] : $item['product_id'];

					$manage_stock = get_post_meta( $id, '_manage_stock', true );

					if ( $manage_stock == 'yes' ) {

						$master_stock = 0;

						if ( ! empty( $item['variation_id'] ) ) {

							$master_stock = get_post_meta( $id, '_pos_variation_master_stock', true );

						} else {

							$master_stock = get_post_meta( $id, '_pos_master_stock', true );

						}

						$updated_master_stock = ( ! empty( $master_stock ) && $master_stock > 0 ) ? intval( $master_stock ) - intval( $item['quantity'] ) : 0;

						if ( ! empty( $item['variation_id'] ) ) {

							update_post_meta( $id, '_pos_variation_master_stock', $updated_master_stock );

						} else {

							update_post_meta( $id, '_pos_master_stock', $updated_master_stock );

						}
					}
				}
			}
		}

		public function wkwcpos_stop_mails_for_customers( $order ) {
			if ( get_option( '_pos_mails_at_pos_end', 'enabled' ) == 'disabled' ) {
				$wk_wc_pos_outlet = get_post_meta( $order->get_id(), '_wk_wc_pos_outlet', true );

				if ( ! empty( $wk_wc_pos_outlet ) ) {
					remove_action( 'woocommerce_order_status_pending_to_processing_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
					remove_action( 'woocommerce_order_status_pending_to_completed_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
					remove_action( 'woocommerce_order_status_pending_to_on-hold_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
					remove_action( 'woocommerce_order_status_failed_to_processing_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
					remove_action( 'woocommerce_order_status_failed_to_completed_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
					remove_action( 'woocommerce_order_status_failed_to_on-hold_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
					remove_action( 'woocommerce_order_status_cancelled_to_processing_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
					remove_action( 'woocommerce_order_status_cancelled_to_completed_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
					remove_action( 'woocommerce_order_status_cancelled_to_on-hold_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
				}
			}
		}
	}
}
