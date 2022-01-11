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

class WKWCPOS_API_Create_Order {

	/**
	 * Base Name.
	 *
	 * @var string the route base
	 */
	public $base = 'create-order';

	protected $wpdb;

	/**
	 * Namespace Name.
	 *
	 * @var string the route namespace
	 */
	public $namespace = 'pos/v1';

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->error  = new WKWCPOS_API_Error_Handler();
		$this->helper = new WKWCPOS_API_User_Outlet_Helper();

		global $wpdb;

		$this->wpdb = $wpdb;

		$this->centralized_inventory_enabled = apply_filters( 'wk_wc_pos_enable_centralized_inventory', false );

		$this->authentication = new WKWCPOS_API_Authentication();
	}

	/**
	 * API Callback.
	 */
	public function create_pos_order( $request ) {
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

			if ( ! empty( $request['data'] ) ) {
				$this->centralized_inventory_enabled = apply_filters( 'wk_wc_pos_enable_centralized_inventory', false );

				$customer_data = json_decode( $request['data'] );

				if ( ! empty( $customer_data->cart ) && ! empty( $customer_data->payment_mode ) && ! empty( $customer_data->user_id ) && ! empty( $customer_data->customer_id ) ) {
					$payment_method       = strip_tags( $customer_data->payment_mode );
					$payment_method_title = strip_tags( $customer_data->payment_title );
					$cash_pay             = floatval( $customer_data->cashPay );
					$card_pay             = floatval( $customer_data->cardPay );
					$pos_user             = intval( $customer_data->user_id );
					$customer_id          = intval( $customer_data->customer_id );

					$tendered = strip_tags( $customer_data->tendered );
					$pos_cart = json_decode( $customer_data->cart );

					if ( $cash_pay > 0 && $card_pay > 0 ) {
						$payment_method = 'Split';
					} elseif ( $cash_pay > 0 && $card_pay == 0 ) {
						$payment_method       = 'Cash';
						$payment_method_title = __( 'Cash', 'wc_pos' );
					} elseif ( $card_pay > 0 && $cash_pay == 0 ) {
						$payment_method = 'Card';
					}

					$order_data = array(
						'cart'                 => $pos_cart,
						'customer'             => $customer_id,
						'pos_user'             => $pos_user,
						'payment_method'       => $payment_method,
						'payment_method_title' => $payment_method_title,
						'card_pay'             => $card_pay,
						'cash_pay'             => $cash_pay,
						'offline_id'           => '',
					);

					if ( isset( $customer_data->coupon ) && ! empty( $customer_data->coupon ) ) {
						$pos_coupon = is_string( $customer_data->coupon ) ? json_decode( stripslashes( $customer_data->coupon ) ) : '';

						$order_data['coupon'] = $pos_coupon;
					}

					if ( ! empty( $tendered ) ) {
						$order_data['tendered'] = $tendered;
					}

					$discount      = apply_filters( 'wkpos_caluclate_discount', $customer_data );
					$customer_data = ( ! empty( $discount ) ) ?
					$discount : $customer_data->discount;

					if ( isset( $customer_data->discount ) && ! empty( $customer_data->discount ) ) {
						$pos_discount = is_string( $customer_data->discount ) ? json_decode( stripslashes( $customer_data->discount ) ) : '';

						$order_data['discount'] = $pos_discount;
					}
					if ( isset( $customer_data->order_note ) && ! empty( $customer_data->order_note ) ) {
						$order_note = is_string( $customer_data->order_note ) ? strip_tags( $customer_data->order_note ) : '';

						$order_data['order_note'] = $order_note;
					}

					if ( isset( $customer_data->currency_code->code ) && ! empty( $customer_data->currency_code->code ) ) {
						$currency_code = is_string( $customer_data->currency_code->code ) ? strip_tags( $customer_data->currency_code->code ) : '';

						$order_data['currency_code'] = $currency_code;
					}

					if ( ! empty( $order_data['payment_method'] ) && ( $order_data['payment_method'] == 'Card' || $order_data['payment_method'] == 'Split' ) ) {
						$order_data['payment_method'] = strip_tags( $customer_data->payment_mode );
					}

					$order_data = apply_filters( 'wkwcpos_change_order_data_for_process', $order_data, $customer_data, $user_id );

					$order = $this->create_order( $order_data, $user_id );
				}
			}

			return $order;
		} catch ( Exception $e ) {
			return $this->error->set( 'exception', $e );
		}
	}

	/*
	 * Helper Functions
	 */
	public function create_order( $order_data, $user_id = '' ) {
		$order_tab = $this->wpdb->prefix . 'woocommerce_order_items';

		$order_tab_meta = $this->wpdb->prefix . 'woocommerce_order_itemmeta';

		$order_detail_by_order_id = array();

		$pos_user = intval( $order_data['pos_user'] );

		$customer_id = $order_data['customer'];

		$order_note = ! empty( $order_data['order_note'] ) ? strip_tags( $order_data['order_note'] ) : '';

		$payment_method = strip_tags( $order_data['payment_method'] );

		$payment_method_title = strip_tags( $order_data['payment_method_title'] );

		$offline_id = $order_data['offline_id'];

		$cash_pay = floatval( $order_data['cash_pay'] );

		$card_pay = floatval( $order_data['card_pay'] );

		$coupon = isset( $order_data['coupon'] ) ? $order_data['coupon'] : 0;

		$discount = isset( $order_data['discount'] ) ? $order_data['discount'] : 0;

		$customer = new \WC_Customer( $customer_id );

		$tendered = ! empty( $order_data['tendered'] ) ? strip_tags( $order_data['tendered'] ) : 0;

		$outlet_id = $this->helper->_get_pos_user_outlet_with_status( $pos_user );

		$pos_outlet = $this->helper->_get_pos_outlet( $outlet_id );

		$billing_address = array(
			'first_name' => $customer->get_billing_first_name() ? $customer->get_billing_first_name() : $customer->get_first_name(),
			'last_name'  => $customer->get_billing_last_name() ? $customer->get_billing_last_name() : $customer->get_last_name(),
			'company'    => $customer->get_billing_company(),
			'address_1'  => $customer->get_billing_address_1(),
			'address_2'  => $customer->get_billing_address_2(),
			'city'       => $pos_outlet->outlet_city,
			'state'      => $pos_outlet->outlet_state,
			'postcode'   => $pos_outlet->outlet_postcode,
			'country'    => $pos_outlet->outlet_country,
			'email'      => $customer->get_billing_email(),
			'phone'      => $customer->get_billing_phone(),
		);

		$shipping_address = array(
			'first_name' => $customer->get_shipping_first_name(),
			'last_name'  => $customer->get_shipping_last_name(),
			'company'    => $customer->get_shipping_company(),
			'address_1'  => $customer->get_shipping_address_1(),
			'address_2'  => $customer->get_shipping_address_2(),
			'city'       => $pos_outlet->outlet_city,
			'state'      => $pos_outlet->outlet_state,
			'postcode'   => $pos_outlet->outlet_postcode,
			'country'    => $pos_outlet->outlet_country,
		);

		$this->currency = strip_tags( $order_data['currency_code'] );

		add_filter(
			'woocommerce_currency',
			function () {
				return $this->currency;
			},
			9999
		);

		$order = wc_create_order( array( 'customer_id' => $customer_id ) );

		if ( get_option( '_pos_mails_at_pos_end', 'enabled' ) == 'disabled' ) {
			remove_action( 'woocommerce_order_status_pending_to_processing_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
			remove_action( 'woocommerce_order_status_pending_to_processing_notification', array( WC()->mailer()->emails['WC_Email_Customer_Processing_Order'], 'trigger' ) );
			remove_action( 'woocommerce_order_status_pending_to_completed_notification', array( WC()->mailer()->emails['WC_Email_New_Order'], 'trigger' ) );
			remove_action( 'woocommerce_order_status_completed_notification', array( WC()->mailer()->emails['WC_Email_Customer_Completed_Order'], 'trigger' ) );
		}

		$order_id = $order->get_id();

		$arg = array(
			'currency' => $order_data['currency_code'],
		);

		$order_items = 0;

		update_post_meta( $order_id, '_tendered_amnt', $tendered );

		update_post_meta( $order_id, '_offline_id', $offline_id );

		$tax_display_cart = get_option( 'woocommerce_tax_display_cart' );

		$rates = '';

		$tax = new \WC_Tax();

		$outlet_id = $this->helper->_get_pos_user_outlet_with_status( $pos_user );

		if ( ! empty( $outlet_id ) ) {

			$pos_outlet = $this->helper->_get_pos_outlet( $outlet_id );

			$rates = $tax->find_rates(
				array(
					'country'  => $pos_outlet->outlet_country,
					'city'     => $pos_outlet->outlet_city,
					'state'    => $pos_outlet->outlet_state,
					'postcode' => $pos_outlet->outlet_postcode,
				)
			);

		}

		$rates = apply_filters( 'wkwcpos_modify_tax_details_at_pos', $rates, $pos_user );

		$tax_rate = 0;

		if ( wc_tax_enabled() ) {
			foreach ( $rates as $key => $rate ) {

				$tax_rate = $tax_rate + $rate['rate'];

			}
		}

		$order_tab      = $this->wpdb->prefix . 'woocommerce_order_items';
		$order_tab_meta = $this->wpdb->prefix . 'woocommerce_order_itemmeta';

		foreach ( $order_data['cart'] as $item ) {
			if ( $item->virtual ) {

				$real_price = $item->total;

				if ( get_option( 'woocommerce_tax_display_cart' ) != 'excl' ) {

					$real_price = ( ( $item->total * 100 ) / ( 100 + $tax_rate ) );

				}

				$pro_name = $item->name;
				$this->wpdb->insert(
					$order_tab,
					array(
						'order_item_name' => $pro_name,
						'order_item_type' => 'line_item',
						'order_id'        => $order_id,
					),
					array(
						'%s',
						'%s',
						'%d',
					)
				);

				$order_items = $order_items + $item->quantity;

				$order_item_id = $this->wpdb->insert_id;

				$insert_data = array(
					'_line_subtotal_tax' => 0,
					'_line_total'        => $real_price,
					'_qty'               => $item->quantity,
					'_line_subtotal'     => $real_price,
					'_tax_class'         => $item->tax_label,
					'_line_tax'          => 0,
				);

				$query_string = "INSERT INTO $order_tab_meta ( order_item_id, meta_key, meta_value) VALUES ";

				$custom_fields = $place_holders = array();

				foreach ( $insert_data as $key => $value ) {
					array_push( $custom_fields, $order_item_id, $key, $value );
					$place_holders[] = "('%d', '%s', '%s')";
				}

				$query_string .= implode( ', ', $place_holders );

				$this->wpdb->query( $this->wpdb->prepare( "$query_string ", $custom_fields ) );
			}
		}

		$products_discount = array();

		foreach ( $order_data['cart'] as $item ) {
			if ( ! $item->virtual ) {
				$posProduct = wc_get_product( $item->product_id );

				$product_rates = $tax->find_rates(
					array(
						'country'   => $pos_outlet->outlet_country,
						'city'      => $pos_outlet->outlet_city,
						'state'     => $pos_outlet->outlet_state,
						'postcode'  => $pos_outlet->outlet_postcode,
						'tax_class' => $posProduct->get_tax_class(),
					)
				);

				$product_rates    = apply_filters( 'wkwcpos_modify_product_tax_details_at_pos', $product_rates, $pos_user, $item->product_id );
				$product_tax_rate = 0;
				foreach ( $product_rates as $key => $rate ) {
					$product_tax_rate += $rate['rate'];
				}

				if ( $posProduct ) {
					$ptype = $posProduct->get_type();

					if ( $ptype == 'variable' ) {
						$variations = $item->options;

						if ( ! empty( $variations ) ) {
							foreach ( $variations as $vkey => $vvalue ) {
								if ( $vkey == 'var_id' ) {
									$product_id = $vvalue;

									$product_variation = wc_get_product( $product_id );

									$product_title = $item->name;

									$tax_status = get_post_meta( $product_id, '_tax_status', true );

									if ( $tax_display_cart == 'incl' && $tax_status != 'none' ) {
										$tax_excluded_price = $item->uf * $item->quantity / ( ( $product_tax_rate / 100 ) + 1 );

										$item_id = $order->add_product(
											$product_variation,
											$item->quantity,
											array(
												'subtotal' => $tax_excluded_price,
												'total'    => $tax_excluded_price,
												'name'     => $product_title,
											)
										);
									} else {
										$item_id = $order->add_product(
											$product_variation,
											$item->quantity,
											array(
												'subtotal' => $item->uf * $item->quantity,
												'total'    => $item->uf * $item->quantity,
												'name'     => $product_title,
											)
										);
									}

									$item_discount = wc_format_decimal( ( $item->special * $item->quantity ) - $item->uf_total, 2 );

									if ( $item_discount > 0 ) {
										$products_discount[ $product_id ] = $item_discount;
									}

									$order_items = $order_items + $item->quantity;

									if ( ! $this->centralized_inventory_enabled ) {
										$vmaster_stock         = get_post_meta( $product_id, '_pos_variation_master_stock', true );
										$vupdated_master_stock = ( ! empty( $vmaster_stock ) && $vmaster_stock > 0 ) ? intval( $vmaster_stock ) - intval( $item->quantity ) : 0;
										update_post_meta( $product_id, '_pos_variation_master_stock', $vupdated_master_stock );
										$pstock = $product_variation->get_stock_quantity();

										wc_update_product_stock( $product_variation, ( intval( $pstock ) + intval( $item->quantity ) ) );
									}
								}
							}
						}
					} elseif ( $item->type != 'webkul_brs' ) {
						$product_id = $item->product_id;

						$product_title = $item->name;

						$tax_status = get_post_meta( $product_id, '_tax_status', true );

						if ( $tax_display_cart == 'incl' && $tax_status != 'none' ) {
							$tax_excluded_price = $item->uf * $item->quantity / ( ( $product_tax_rate / 100 ) + 1 );

							$item_id = $order->add_product(
								$posProduct,
								$item->quantity,
								array(
									'subtotal' => $tax_excluded_price,
									'total'    => $tax_excluded_price,
									'name'     => $product_title,
								)
							);
						} else {

							$item_id = $order->add_product(
								$posProduct,
								$item->quantity,
								array(
									'subtotal' => $item->uf * $item->quantity,
									'total'    => $item->uf * $item->quantity,
									'name'     => $product_title,
								)
							);
						}

						$item_discount = wc_format_decimal( ( $item->special * $item->quantity ) - $item->uf_total, 2 );

						if ( $item_discount > 0 ) {
							$products_discount[ $product_id ] = $item_discount;
						}

						$order_items = $order_items + $item->quantity;

						if ( ! $this->centralized_inventory_enabled ) {
							$master_stock = get_post_meta( $product_id, '_pos_master_stock', true );

							$updated_master_stock = ( ! empty( $master_stock ) && $master_stock > 0 ) ? intval( $master_stock ) - intval( $item->quantity ) : 0;

							update_post_meta( $product_id, '_pos_master_stock', $updated_master_stock );

							$pstock = $posProduct->get_stock_quantity();

							wc_update_product_stock( $posProduct, intval( $pstock ) + intval( $item->quantity ) );
						}
					}

					if ( $ptype != 'simple' && $ptype != 'variable' ) {
						apply_filters( 'manage_custom_product_type_order_meta', $order, $item, $posProduct );
						$order_items = $order_items + $item->quantity;
					}

					if ( ! $this->centralized_inventory_enabled ) {
						$this->helper->update_outlet_product_stock( $product_id, $outlet_id, $item->quantity );
					}
				}
			}
		}

		$order->set_address( $billing_address, 'billing' );
		$order->set_address( $shipping_address, 'shipping' );

		if ( ! empty( $payment_method ) ) {
			$order->set_payment_method( $payment_method );
			$order->set_payment_method_title( $payment_method_title );

			update_post_meta( $order->get_id(), 'cash_pay', $cash_pay );
			update_post_meta( $order->get_id(), 'card_pay', $card_pay );
		}

		$order_discount = 0;
		if ( ! empty( $coupon ) ) {
			$c_amount = floatval( 0 );
			$match    = 0;
			foreach ( $coupon as $coupon_key => $coupon_val ) {
				if ( is_object( $coupon_val ) ) {
					if ( $coupon_val->type == 'percent' ) {
						foreach ( $order->get_items() as $order_item ) {
							if ( $coupon_val->product_categories ) {
								$catagory = $this->wc_pos_get_categories_by_product_id( $order_item->get_product_id(), 'ids' );
								foreach ( $coupon_val->product_categories as $c_catagory ) {
									foreach ( $catagory as $p_catagory ) {
										if ( (int) $p_catagory === (int) $c_catagory ) {
											$match = 1;
										}
										if ( 1 == (int) $match ) {
											$sub_total      = $order_item->get_subtotal();
											$total          = $order_item->get_total();
											$discount_total = $total * ( floatval( $coupon_val->price ) / 100 );
											$order_item->set_total( $total - $discount_total );
											$order_item->save();
											$c_amount += ( $total ) * ( $coupon_val->price / 100 );
										}
									}
								}
							} else {
								$sub_total      = $order_item->get_subtotal();
								$total          = $order_item->get_total();
								$discount_total = $total * ( floatval( $coupon_val->price ) / 100 );
								$order_item->set_total( $total - $discount_total );
								$order_item->save();
								$c_amount += ( $total ) * ( $coupon_val->price / 100 );
							}
						}
					} else {
						$discount_amount = floatval( $coupon_val->price );
						$discount_amount = floatval( number_format( $discount_amount, 2 ) );
						$this_order      = $order_items;
						foreach ( $order->get_items() as $order_item ) {
							$total          = $order_item->get_total();
							$qty            = $order_item->get_quantity();
							$discount_total = $discount_amount / $this_order;
							if ( $total > $qty * $discount_total ) {
								$order_item->set_total( $total - $qty * $discount_total );
								$discount_amount = $discount_amount - ( $qty * $discount_total );
								$this_order      = $this_order - $qty;
							} else {
								$order_item->set_total( $total - $total );
								$discount_amount = $discount_amount - $total;
								$this_order      = $this_order - $qty;
							}
							$order_item->save();
						}
						$c_amount = $coupon_val->price;
					}
					$item = new \WC_Order_Item_Coupon();

					$item->set_props(
						array(
							'code'         => $coupon_val->code,
							'discount'     => floatval( $c_amount ),
							'discount_tax' => 0,
							'order_id'     => $order->get_id(),
						)
					);

					$order->add_item( $item );
				}
			}
		}

		if ( ! empty( $products_discount ) ) {
			foreach ( $products_discount as $product_id => $product_discount ) {
				$order_discount += $product_discount;

				$item = new \WC_Order_Item_Coupon();

				$item->set_props(
					array(
						'code'         => get_post_field( 'post_name', $product_id ),
						'discount'     => floatval( $product_discount ),
						'discount_tax' => 0,
						'order_id'     => $order->get_id(),
					)
				);

				$order->add_item( $item );
			}
		}

		$order->calculate_totals();

		$order_total = $order->get_total();

		if ( ! empty( $discount ) ) {
			$amt = isset( $discount->amount ) ? floatval( -1 * $discount->amount ) : 0;

			if ( isset( $discount->type ) && $discount->type == 'percentage' ) {
				$amt = ( $order_total ) * ( floatval( -1 * $discount->amount ) / 100 );
			} elseif ( isset( $discount->type ) && $discount->type == 'fixed' ) {
				$amt = isset( $discount->amount ) ? floatval( -1 * $discount->amount ) : 0;
			}

			if ( ! empty( $amt ) ) {

				$order_total += $amt;

				$item = new \WC_Order_Item_Fee();

				$item->set_order_id( $order->get_id() );
				$item->set_name( esc_html__( 'POS Discount', 'wc_pos' ) );
				$item->set_tax_class( '' );
				$item->set_taxes(
					array(
						'total' => array(),
					)
				);
				$item->set_tax_status( 'none' );
				$item->set_total_tax( 0 );
				$item->set_total( floatval( $amt ) );

				$order->add_item( $item );
			}
		}

		$order->set_total( $order_total );
		// Confirm the order payment and add a note to it.
		! empty( $order_note ) ? $order->add_order_note( $order_note ) : '';

		if ( $order_data['payment_method'] == 'cash' || $order_data['payment_method'] == 'card' ) {
			$order->payment_complete();
		}

		update_post_meta( $order->get_id(), '_wk_wc_pos_outlet', $outlet_id );

		$order = apply_filters( 'wkwcpos_modify_creating_pos_order', $order, $order_data, $user_id );

		do_action( 'wkwcpos_after_creating_order', $order, $order_data, $user_id );

		if ( ! empty( $order_data['order_status'] ) ) {
			$order->update_status( strip_tags( $order_data['order_status'] ) );
		} else {
			if ( $order_data['payment_method'] == 'tazman' ) {
				$order->update_status( 'pending' );
			} else {

				$order->update_status( 'completed' );
			}
		}

		$order->save();

		//get same order
		$currency_code = $order->get_currency();

		$cur_symbol = get_woocommerce_currency_symbol( $currency_code );

		$items = $order->get_items();

		$order_detail_by_order_id['currency'] = $cur_symbol;
		$order_detail_by_order_id['id']       = $order->get_id();
		$order_detail_by_order_id['order_id'] = $order->get_id();

		$id = 0;
		$p  = 0;

		// order items loop
		if ( ! empty( $items ) ) {
			foreach ( $items as $key => $value ) {
				$value_data = $value->get_data();
				$meta       = array();

				$meta = apply_filters( 'get_order_item_meta_data', $meta, $value_data );

				$product_id = $value->get_product_id();

				if ( $product_id == 0 ) {
					$product_id = 'virtual' . $id;

					++$id;
				}

				$variable_id = $value->get_variation_id();

				$product_total_price = wc_price( $value_data['total'], $arg );

				$product_unit_price = wc_price( $value_data['total'] / $value_data['quantity'], $arg );

				$qty = $value_data['quantity'];

				$order_detail_by_order_id['products'][ $p ] = array(
					'product_id'          => $product_id,
					'product_name'        => $value['name'],
					'qty'                 => $qty,
					'variable_id'         => $variable_id,
					'product_total_price' => $product_total_price,
					'total_price'         => $value_data['total'],
					'product_unit_price'  => $product_unit_price,
					'product_meta_data'   => ! empty( $meta ) ? $meta : false,
				);

				$order_detail_by_order_id['products'][ $p ] = apply_filters( 'wkwcpos_update_order_product_detail', $order_detail_by_order_id['products'][ $p ], $product_id, $order );

				++$p;
			}
		} else {
			$order_detail_by_order_id['products'] = array();
		}

		// order tax
		foreach ( $order->get_tax_totals() as $tax_code => $tax ) {
			$order_detail_by_order_id['tax_lines'][] = array(
				'id'       => $tax->id,
				'rate_id'  => $tax->rate_id,
				'code'     => $tax_code,
				'title'    => $tax->label,
				'total'    => wc_price( wc_format_decimal( $tax->amount, 2 ), $arg ),
				'compound' => (bool) $tax->is_compound,
			);
		}

		$billing_phone                       = $order->get_billing_phone();
		$billing_fname                       = $order->get_billing_first_name();
		$billing_lname                       = $order->get_billing_last_name();
		$billing_address                     = $order->get_billing_address_1();
		$billing_address2                    = $order->get_billing_address_2();
		$order_detail_by_order_id['billing'] = array(
			'phone'    => $billing_phone,
			'fname'    => $billing_fname,
			'lname'    => $billing_lname,
			'address1' => $billing_address,
			'address2' => $billing_address2,
		);
		if ( $order->get_billing_country() ) {
			$billing_city                                    = $order->get_billing_city();
			$billing_postcode                                = $order->get_billing_postcode();
			$billing_state                                   = $order->get_billing_state();
			$billing_country                                 = WC()->countries->countries[ $order->get_billing_country() ];
			$order_detail_by_order_id['billing']['city']     = $billing_city;
			$order_detail_by_order_id['billing']['postcode'] = $billing_postcode;
			$order_detail_by_order_id['billing']['state']    = $billing_state;
			$order_detail_by_order_id['billing']['country']  = $billing_country;
		}

		$shipping_fname                       = $order->get_shipping_first_name();
		$shipping_lname                       = $order->get_shipping_last_name();
		$shipping_address                     = $order->get_shipping_address_1();
		$shipping_address2                    = ! empty( $order->get_shipping_address_2() ) ? $order->get_shipping_address_2() : '';
		$order_detail_by_order_id['shipping'] = array(
			'fname'    => $shipping_fname,
			'lname'    => $shipping_lname,
			'address1' => $shipping_address,
			'address2' => $shipping_address2,
		);
		if ( $order->get_shipping_country() ) {
			$shipping_city                                    = $order->get_shipping_city();
			$shipping_postcode                                = $order->get_shipping_postcode();
			$shipping_state                                   = $order->get_shipping_state();
			$shipping_country                                 = WC()->countries->countries[ $order->get_shipping_country() ];
			$order_detail_by_order_id['shipping']['city']     = $shipping_city;
			$order_detail_by_order_id['shipping']['postcode'] = $shipping_postcode;
			$order_detail_by_order_id['shipping']['state']    = $shipping_state;
			$order_detail_by_order_id['shipping']['country']  = $shipping_country;
		}
		$args = array(
			'post_id' => $order->get_id(),
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

		$order_detail_by_order_id['order_notes'] = $notes;

		$tendered = get_post_meta( $order->get_id(), '_tendered_amnt', true );

		if ( ! empty( $tendered ) ) {
			$parse_total = $order->get_total();
		} else {
			$tendered = 0;
		}

		$email                                     = $order->get_billing_email();
		$order_detail_by_order_id['email']         = $email;
		$order_date                                = $order->get_date_created();
		$order_date                                = $order_date->date_i18n( 'D M j, Y' );
		$order_date                                = $order_date;
		$order_detail_by_order_id['order_date']    = $order_date;
		$order_detail_by_order_id['payment_mode']  = $payment_method;
		$order_detail_by_order_id['payment_title'] = $payment_method_title;
		$order_detail_by_order_id['offline_id']    = $offline_id;
		$order_detail_by_order_id['cashPay']       = $cash_pay;
		$order_detail_by_order_id['cardPay']       = $card_pay;
		$order_detail_by_order_id['cashPay_html']  = wc_price( $cash_pay, $arg );
		$order_detail_by_order_id['cardPay_html']  = wc_price( $card_pay, $arg );

		$coupon          = array();
		$coupon_discount = 0;

		$ocoupons = $order->get_items( 'coupon' );

		if ( $ocoupons ) {
			foreach ( $ocoupons as $citem_id => $citem ) {
				$coupon[ esc_html( $citem->get_code() ) ] = wc_price( $citem->get_discount(), $arg );
				$coupon_discount                         += $citem->get_discount();
			}
		}

		$order_detail_by_order_id['cart_subtotal'] = wc_price( $order->get_subtotal(), $arg );

		$order_id = $order->get_id();

		$args = $this->wpdb->get_var( "SELECT order_item_id FROM {$this->wpdb->prefix}woocommerce_order_items WHERE order_id = $order_id AND order_item_name LIKE 'Pos Discount'" );

		$order_detail_by_order_id['discount'] = wc_price( 0, $args );
		if ( $args != null ) {
			$args = $this->wpdb->get_var( "SELECT meta_value FROM {$this->wpdb->prefix}woocommerce_order_itemmeta WHERE order_item_id = $args AND meta_key LIKE '_line_total'" );

			if ( $args != null && $args != 0 ) {
				$order_detail_by_order_id['discount'] = wc_price( $args, $arg );
			}
		}
		$balance                              = ( (float) $tendered ) - (float) $parse_total;
		$order_detail_by_order_id['tendered'] = wc_price( $tendered, $arg );
		$order_detail_by_order_id['balance']  = wc_price( $balance, $arg );

		$order_detail_by_order_id['order_type'] = 'online';

		$order_detail_by_order_id['coupons'] = $coupon;

		if ( ! isset( $order_detail_by_order_id['tax_lines'] ) ) {
			$order_detail_by_order_id['tax_lines'] = '';
		}

		$order_detail_by_order_id['order_total'] = $order->get_total();

		$order_detail_by_order_id['order_html'] = wc_price( $order->get_total(), $arg );

		if ( $totals = $order->get_order_item_totals() ) {
			foreach ( $totals as $key => $total ) {
				$label = $key;

				if ( $label == 'order_total' || $label == 'shipping' ) {
					if ( $label == 'order_total' ) {
						$order_detail_by_order_id['order_html'] = $total['value'];
					} else {
						$order_detail_by_order_id[ strtolower( $label ) ] = $total['value'];
					}
				}
			}
		}

		$order_detail_by_order_id['total_refund'] = $order->get_total_refunded();

		$stats_data   = array(
			'order_id'           => $order->get_id(),
			'parent_id'          => $order->get_parent_id(),
			'date_created'       => $order->get_date_created()->date( 'Y-m-d H:i:s' ),
			'date_created_gmt'   => gmdate( 'Y-m-d H:i:s', $order->get_date_created()->getTimestamp() ),
			'num_items_sold'     => self::get_num_items_sold( $order ),
			'total_sales'        => $order->get_total(),
			'tax_total'          => $order->get_total_tax(),
			'shipping_total'     => $order->get_shipping_total(),
			'net_total'          => self::get_net_total( $order ),
			'status'             => self::normalize_order_status( $order->get_status() ),
			'customer_id'        => $order->get_customer_id(),
			'returning_customer' => self::is_returning_customer( $order ),
			'outlet_id'          => $outlet_id,
		);
		$stats_format = array(
			'%d',
			'%d',
			'%s',
			'%s',
			'%d',
			'%f',
			'%f',
			'%f',
			'%f',
			'%s',
			'%d',
			'%d',
			'%d',
		);

		$this->wpdb->insert(
			$this->wpdb->prefix . 'woocommerce_pos_order_stats',
			$stats_data,
			$stats_format
		);

		$scheduled_post_id = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT ID FROM {$this->wpdb->prefix}posts WHERE post_type=%s AND post_status=%s AND post_content=%s", 'scheduled-action', 'pending', "[{$order->get_id()}]" ) );

		if ( ! empty( $scheduled_post_id ) ) {
			wp_update_post(
				array(
					'ID'          => $scheduled_post_id,
					'post_status' => 'publish',
				)
			);
		}
		return apply_filters( 'wkwcpos_modify_order_details_response_at_pos', $order_detail_by_order_id, $order, $user_id );
	}

	public function wc_pos_get_categories_by_product_id( $product_id, $fields ) {
		return wp_get_post_terms( $product_id, 'product_cat', array( 'fields' => $fields ) );
	}

	/**
	 * Check to see if an order's customer has made previous orders or not.
	 *
	 * @param array $order WC_Order object
	 *
	 * @return bool
	 */
	public static function is_returning_customer( $order ) {
		$customer_id = $order->get_customer_id();

		if ( ! $customer_id ) {
			return false;
		}

		return wc_get_customer_order_count( $customer_id ) > 1;
	}

	/**
	 * Calculation methods.
	 */

	/**
	 * Get number of items sold among all orders.
	 *
	 * @param array $order WC_Order object
	 *
	 * @return int
	 */
	protected static function get_num_items_sold( $order ) {
		$num_items = 0;

		$line_items = $order->get_items( 'line_item' );
		foreach ( $line_items as $line_item ) {
			$num_items += $line_item->get_quantity();
		}

		return $num_items;
	}

	/**
	 * Get the net amount from an order without shipping, tax, or refunds.
	 *
	 * @param array $order WC_Order object
	 *
	 * @return float
	 */
	protected static function get_net_total( $order ) {
		$net_total = floatval( $order->get_total() ) - floatval( $order->get_total_tax() ) - floatval( $order->get_shipping_total() );

		return (float) $net_total;
	}

	/**
	 * Maps order status provided by the user to the one used in the database.
	 *
	 * @param string $status order status
	 *
	 * @return string
	 */
	protected static function normalize_order_status( $status ) {
		$status = trim( $status );

		return 'wc-' . $status;
	}
}
