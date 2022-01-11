<?php
/**
 * WooCommerce POS API setup.
 *
 * @author   Webkul
 *
 * @category API
 *
 * @since    3.2.0
*/

namespace WKWC_POS\Api\Includes\Orders;

use WKWC_POS\Api\Inc\WKWCPOS_API_Error_Handler;
use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;
use WKWC_POS\Api\Helper\WKWCPOS_API_User_Outlet_Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class WKWCPOS_API_Get_Orders {

	/**
	 * Base Name.
	 *
	 * @var string the route base
	 */
	public $base = 'get-orders';

	/**
	 * Namespace Name.
	 *
	 * @var string the route namespace
	 */
	public $namespace = 'pos/v1';

	protected $wpdb = '';

	/**
	 * Constructor.
	 */
	public function __construct() {
		global $wpdb;

		$this->wpdb = $wpdb;

		$this->error          = new WKWCPOS_API_Error_Handler();
		$this->helper         = new WKWCPOS_API_User_Outlet_Helper();
		$this->authentication = new WKWCPOS_API_Authentication();
	}

	/**
	 * API Callback.
	 */
	public function get_pos_order( $request ) {
		try {
			$user_id = $request['logged_in_user_id'];

			$validate_auth_key = $this->authentication->wkwcpos_authenticate_request( $user_id );

			if ( $validate_auth_key != 'ok' ) {
				return array(
					'session_id'             => $validate_auth_key,
					'status'                 => 401,
					'invalid_auth_key_error' => __( 'Please provide valid Auth Key.', 'wc_pos' ),
					'success'                => false,
				);
			}

			if ( ! isset( $request['logged_in_user_id'] ) || empty( $request['logged_in_user_id'] ) ) {
				return $this->error->set( 'user_id_required' );
			}

			$pos_user = $request['logged_in_user_id'];

			$page = $request['page'];

			$table_name_order = $this->wpdb->prefix . 'woocommerce_order_items';

			$table_name_ordermeta = $this->wpdb->prefix . 'woocommerce_order_itemmeta';

			$outlet_id = $this->helper->_get_pos_user_outlet_with_status( $pos_user );

			$order_detail_by_order_id = array();

			if ( ! empty( $pos_user ) && ! empty( $outlet_id ) ) {
				$args = apply_filters(
					'wkwcpos_change_get_order_args',
					array(
						'post_type'      => 'shop_order',
						'meta_key'       => '_wk_wc_pos_outlet',
						'meta_value'     => $outlet_id,
						'posts_per_page' => '100',
						'offset'         => 100 * $page,
						'post_status'    => array_keys( wc_get_order_statuses() ),
					)
				);

				$order_query = get_posts( $args );

				$i = 0;

				if ( ! empty( $order_query ) ) :

					$order_detail_by_order_id = array();

					foreach ( $order_query as $order_key => $order_val ) {
						$p = 0;

						$coupon = array();

						$order = new \WC_Order( $order_val->ID );

						$currency_code = $order->get_currency();

						$currency_symbol = get_woocommerce_currency_symbol( $currency_code );

						$args = array(
							'currency' => $currency_code,
						);

						$items = $order->get_items();

						$order_detail_by_order_id[ $i ]['order_id'] = $order->get_id();
						$order_detail_by_order_id[ $i ]['id']       = $order->get_id();

						$order_detail_by_order_id[ $i ]['currency'] = $currency_symbol;

						$id = 1;

						foreach ( $items as $key => $value ) {
							$value_data = $value->get_data();

							$meta = array();

							$meta = apply_filters( 'get_order_item_meta_data', $meta, $value_data );

							$product_id = $value->get_product_id();

							if ( $product_id == 0 ) {
								$product_id = 'virtual' . $id;
								++$id;
							}
							$variable_id = $value->get_variation_id();

							$product_total_price = wc_price( $value_data['total'], $args );

							$qty = $value_data['quantity'];

							$product_unit_price = wc_price( $value_data['total'] / $qty, $args );

							$order_detail_by_order_id[ $i ]['products'][ $p ] = array(
								'product_id'          => $product_id,
								'product_name'        => $value['name'],
								'qty'                 => $qty,
								'variable_id'         => $variable_id,
								'product_unit_price'  => $product_unit_price,
								'total_price'         => $value_data['total'],
								'product_total_price' => $product_total_price,
								'product_meta_data'   => ! empty( $meta ) ? $meta : false,
							);

							$order_detail_by_order_id[ $i ]['products'][ $p ] = apply_filters( 'wkwcpos_update_order_product_detail', $order_detail_by_order_id[ $i ]['products'][ $p ], $product_id, $order );

							++$p;
						}

						foreach ( $order->get_tax_totals() as $tax_code => $tax ) {
							$order_detail_by_order_id[ $i ]['tax_lines'][] = array(
								'id'       => $tax->id,
								'rate_id'  => $tax->rate_id,
								'code'     => $tax_code,
								'title'    => $tax->label,
								'total'    => wc_price( wc_format_decimal( $tax->amount, 2 ), array( 'currency' => $order->get_currency() ) ),
								'compound' => (bool) $tax->is_compound,
							);
						}

						$billing_phone                             = $order->get_billing_phone();
						$billing_fname                             = $order->get_billing_first_name();
						$billing_lname                             = $order->get_billing_last_name();
						$billing_address                           = $order->get_billing_address_1();
						$billing_address2                          = $order->get_billing_address_2();
						$order_detail_by_order_id[ $i ]['billing'] = array(
							'phone'    => $billing_phone,
							'fname'    => $billing_fname,
							'lname'    => $billing_lname,
							'address1' => $billing_address,
							'address2' => $billing_address2,
						);
						if ( $order->get_billing_country() ) {
							$billing_city                                      = $order->get_billing_city();
							$billing_postcode                                  = $order->get_billing_postcode();
							$billing_state                                     = $order->get_billing_state();
							$billing_country                                   = WC()->countries->countries[ $order->get_billing_country() ];
							$order_detail_by_order_id[ $i ]['billing']['city'] = $billing_city;
							$order_detail_by_order_id[ $i ]['billing']['postcode'] = $billing_postcode;
							$order_detail_by_order_id[ $i ]['billing']['state']    = $billing_state;
							$order_detail_by_order_id[ $i ]['billing']['country']  = $billing_country;
						}

						$shipping_fname                             = $order->get_shipping_first_name();
						$shipping_lname                             = $order->get_shipping_last_name();
						$shipping_address                           = $order->get_shipping_address_1();
						$shipping_address2                          = ! empty( $order->get_shipping_address_2() ) ? $order->get_shipping_address_2() : '';
						$order_detail_by_order_id[ $i ]['shipping'] = array(
							'fname'    => $shipping_fname,
							'lname'    => $shipping_lname,
							'address1' => $shipping_address,
							'address2' => $shipping_address2,
						);
						if ( $order->get_shipping_country() ) {
							$shipping_city                                      = $order->get_shipping_city();
							$shipping_postcode                                  = $order->get_shipping_postcode();
							$shipping_state                                     = $order->get_shipping_state();
							$shipping_country                                   = WC()->countries->countries[ $order->get_shipping_country() ];
							$order_detail_by_order_id[ $i ]['shipping']['city'] = $shipping_city;
							$order_detail_by_order_id[ $i ]['shipping']['postcode'] = $shipping_postcode;
							$order_detail_by_order_id[ $i ]['shipping']['state']    = $shipping_state;
							$order_detail_by_order_id[ $i ]['shipping']['country']  = $shipping_country;
						}
						$args = array(
							'post_id' => $order_val->ID,
							'orderby' => 'comment_ID',
							'order'   => 'DESC',
							'approve' => 'approve',
							'type'    => 'order_note',
						);

						remove_filter( 'comments_clauses', array( 'WC_Comments', 'exclude_order_comments' ), 10, 1 );

						$notes = get_comments( $args );

						add_filter( 'comments_clauses', array( 'WC_Comments', 'exclude_order_comments' ), 10, 1 );

						if ( ! empty( $notes ) ) {
							$notes = wp_list_pluck( $notes, 'comment_content' );
						} else {
							$notes = array();
						}

						$order_detail_by_order_id[ $i ]['order_notes'] = $notes;

						$tendered = get_post_meta( $order_val->ID, '_tendered_amnt', true );

						$cash_pay = get_post_meta( $order_val->ID, 'cash_pay', true );

						$card_pay = get_post_meta( $order_val->ID, 'card_pay', true );

						if ( ! empty( $tendered ) ) {
							$parse_total = $order->get_total();
						} else {
							$tendered = 0;
						}

						if ( $order->get_payment_method() == 'cash' && $cash_pay == '' ) {
							$cash_pay = $tendered;
							$card_pay = 0;
						}

						if ( $order->get_payment_method() == 'card' && $card_pay == '' ) {
							$card_pay = $tendered;
							$cash_pay = 0;
						}

						$balance = (float) $tendered - (float) $parse_total;

						$order_detail_by_order_id[ $i ]['tendered'] = $tendered;

						$order_detail_by_order_id[ $i ]['balance'] = wc_price( $balance );

						$email                                        = $order->get_billing_email();
						$order_detail_by_order_id[ $i ]['email']      = $email;
						$order_date                                   = $order->get_date_created();
						$order_date                                   = $order_date->date_i18n( 'D M j, Y' );
						$order_detail_by_order_id[ $i ]['order_date'] = $order_date;
						$order_detail_by_order_id[ $i ]['payment_mode']  = $order->get_payment_method();
						$order_detail_by_order_id[ $i ]['payment_title'] = $order->get_payment_method_title();
						$order_detail_by_order_id[ $i ]['cashPay']       = $cash_pay;
						$order_detail_by_order_id[ $i ]['cardPay']       = $card_pay;
						$order_detail_by_order_id[ $i ]['cashPay_html']  = wc_price( $cash_pay, $args );
						$order_detail_by_order_id[ $i ]['cardPay_html']  = wc_price( $card_pay, $args );
						$coupons = $order->get_items( 'coupon' );

						if ( $coupons ) :

							foreach ( $coupons as $item_id => $item ) :

								$coupon[ esc_html( $item->get_code() ) ] = wc_price( $item->get_discount() );

						endforeach;

						endif;

						$order_detail_by_order_id[ $i ]['order_html'] = wc_price( $order->get_total(), $args );

						$currency_symbol = get_woocommerce_currency_symbol( get_woocommerce_currency() );

						$order_detail_by_order_id[ $i ]['cart_subtotal'] = '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">' . $currency_symbol . '</span>' . $order->get_subtotal() . '</bdi></span>';
						if ( $totals = $order->get_order_item_totals() ) {
							foreach ( $totals as $key => $total ) {
								$label = $key;

								if ( $label == 'order_total' || $label == 'shipping' ) {
									if ( $label == 'order_total' ) {
										$order_detail_by_order_id[ $i ]['order_html'] = $total['value'];
									} else {
										$order_detail_by_order_id[ $i ][ strtolower( $label ) ] = $total['value'];
									}
								}
							}
						}

						$args = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT order_item_id FROM $table_name_order WHERE order_id=%d  AND order_item_name LIKE 'Pos Discount'", $order->get_id() ) );

						$order_detail_by_order_id[ $i ]['discount'] = wc_price( 0, $args );
						if ( $args != null ) {
							$args = $this->wpdb->get_var( "SELECT meta_value FROM $table_name_ordermeta WHERE order_item_id = $args AND meta_key LIKE '_line_total'" );

							if ( $args != null && $args != 0 ) {
								$order_detail_by_order_id[ $i ]['discount'] = wc_price( $args );
							}
						}

						$order_detail_by_order_id[ $i ]['order_type'] = 'online';

						$order_detail_by_order_id[ $i ]['coupons'] = $coupon;

						if ( ! isset( $order_detail_by_order_id[ $i ]['tax_lines'] ) ) {
							$order_detail_by_order_id[ $i ]['tax_lines'] = '';
						}

						$order_detail_by_order_id[ $i ]['order_total']  = $order->get_total();
						$order_detail_by_order_id[ $i ]['total_refund'] = $order->get_total_refunded();
						$order_detail_by_order_id[ $i ]['customer_id']  = $order->get_customer_id();

						$order_detail_by_order_id[ $i ] = apply_filters( 'manage_custom_order_type_support', $order_detail_by_order_id[ $i ], $order, $i );

						++$i;
					}

				endif;
			}
			return apply_filters( 'wkwcpos_modify_get_orders_api_response', $order_detail_by_order_id, $pos_user, $outlet_id, $request );
		} catch ( Exception $e ) {
			return $this->error->set( 'exception', $e );
		}
	}
}
