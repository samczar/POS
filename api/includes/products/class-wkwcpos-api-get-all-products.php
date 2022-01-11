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

namespace WKWC_POS\Api\Includes\Products;

use WKWC_POS\Api\Inc\WKWCPOS_API_Error_Handler;
use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;
use WKWC_POS\Api\Helper\WKWCPOS_API_User_Outlet_Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class WKWCPOS_API_Get_All_Products {

	/**
	 * Base Name.
	 *
	 * @var string the route base
	 */
	public $base = 'get-products';

	/**
	 * Namespace Name.
	 *
	 * @var string the route namespace
	 */
	public $namespace = 'pos/v1';

	protected $wpdb = '';

	protected $centralized_inventory_enabled = false;

	/**
	 * Parent Constructor.
	 */
	public function __construct() {
		global $wpdb;
		$this->wpdb                          = $wpdb;
		$this->error                         = new WKWCPOS_API_Error_Handler();
		$this->helper                        = new WKWCPOS_API_User_Outlet_Helper();
		$this->centralized_inventory_enabled = apply_filters( 'wk_wc_pos_enable_centralized_inventory', false );
		$this->authentication                = new WKWCPOS_API_Authentication();
	}

	/**
	 * API Callback.
	 */
	public function get_popular_products( $request ) {
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

			$this->centralized_inventory_enabled = apply_filters( 'wk_wc_pos_enable_centralized_inventory', false );

			$pcat = array();

			$pos_user_products = array();

			$variation_arr = array();

			$new_attr = array();

			$manager_id = $request['logged_in_user_id'];

			$outlet_id = $this->helper->_get_pos_user_outlet_with_status( $manager_id );

			$outlet_products = array();

			if ( ! empty( $outlet_id ) ) {
				$pos_outlet = $this->helper->_get_pos_outlet( $outlet_id );

				$tax = new \WC_Tax();

				$rates = $tax->find_rates(
					array(
						'country'  => $pos_outlet->outlet_country,
						'city'     => $pos_outlet->outlet_city,
						'state'    => $pos_outlet->outlet_state,
						'postcode' => $pos_outlet->outlet_postcode,
					)
				);

				WC()->customer = new \WC_Customer( $manager_id );

				WC()->customer->set_shipping_country( $pos_outlet->outlet_country );
				WC()->customer->set_shipping_postcode( $pos_outlet->outlet_postcode );
				WC()->customer->set_shipping_state( $pos_outlet->outlet_state );
				WC()->customer->set_shipping_city( $pos_outlet->outlet_city );

				WC()->customer->set_billing_country( $pos_outlet->outlet_country );
				WC()->customer->set_billing_postcode( $pos_outlet->outlet_postcode );
				WC()->customer->set_billing_state( $pos_outlet->outlet_state );
				WC()->customer->set_billing_city( $pos_outlet->outlet_city );

				$raw_data = $request['raw_data'];

				$outlet_products = json_decode( stripslashes( $raw_data ) );

				$p = 0;

				if ( ! empty( $outlet_products ) ) {
					$include_unit_price_feature = empty( get_option( '_pos_unit_price_feature' ) ) || get_option( '_pos_unit_price_feature' ) == 'enabled';

					foreach ( $outlet_products as $o_key => $o_pro ) {
						$product_id = $o_pro->product_id;

						$_product = wc_get_product( $product_id );

						if ( empty( $_product ) ) {
							continue;
						}

						if ( $_product->post_type == 'product' ) {
							$product_type = $_product->get_type();

							if ( $product_type == 'variable' ) {
								$product = new \WC_Product_Variable( $product_id );

								$variations = $product->get_available_variations();

								$vst = array();

								if ( ! empty( $variations ) ) {
									foreach ( $product->get_variation_attributes() as $attribute_name => $options ) {
										$er = array();

										foreach ( $options as $key => $value ) {
											$er[] = $value;
										}
										$vst[ $attribute_name ] = $er;
									}

									foreach ( $_product->get_attributes() as $key => $attr ) {
										$key_arr   = array();
										$final_arr = array();

										$key_arr = $vst[ $attr['name'] ];

										for ( $i = 0; $i < count( $key_arr ); ++$i ) {
											$final_arr[ rawurldecode( $key_arr[ $i ] ) ] = trim( rawurldecode( $key_arr[ $i ] ) );
										}

										if ( (bool) $attr['is_variation'] && ! empty( $final_arr ) ) {
											$new_attr[] = array(
												'key'     => $key,
												'name'    => wc_attribute_label( $attr->get_name() ),
												'visible' => (bool) $attr['is_visible'],
												'variation' => (bool) $attr['is_variation'],
												'options' => $final_arr,
											);
										}
									}

									foreach ( $variations as $variation ) {
										$attributes = array();

										foreach ( $variation['attributes'] as $key => $value ) {

											$attributes[ rawurldecode( $key ) ] = rawurldecode( $value );

										}

										$variation_id  = $variation['variation_id'];
										$variation_obj = wc_get_product( $variation_id );

										$variation_manage_stock = $variation_obj->get_manage_stock() ? $variation_obj->get_manage_stock() : '';

										if ( $variation_manage_stock ) {
											$stock_qty = (int) $variation_obj->get_stock_quantity();
										} else {
											$stock_qty = $variation_obj->get_stock_status() ? $variation_obj->get_stock_status() : '';
										}

										if ( ! $this->centralized_inventory_enabled || $stock_qty > 0 || $stock_qty != 'outofstock' ) {

											if ( $stock_qty == 'instock' ) {
												$stock_qty = 5000;
											}

											$variation_image = ! empty( $variation_obj->get_image( 'thumbnail' ) ) ? $variation_obj->get_image( 'thumbnail' ) : '';

											if ( ! $this->centralized_inventory_enabled ) {
												$variation_max_stock = $this->helper->get_pos_product_stock( $variation_id, $outlet_id );
											} else {
												$variation_max_stock = $stock_qty;
											}

											$product_tax = 0;

											$display_regular_price = 0;

											$display_price = 0;

											$is_include_tax = get_option( 'woocommerce_prices_include_tax' );

											$shop_display = get_option( 'woocommerce_tax_display_shop' );

											$cart_display = get_option( 'woocommerce_tax_display_cart' );

											if ( $is_include_tax == 'yes' ) {
												if ( $shop_display == 'excl' && $cart_display == 'excl' ) {
													$display_regular_price = $variation_obj->get_regular_price();

													$display_price = wc_get_price_excluding_tax( $variation_obj );

													$product_tax = wc_get_price_including_tax( $variation_obj ) - wc_get_price_excluding_tax( $variation_obj );
												} elseif ( $shop_display == 'incl' && $cart_display == 'excl' ) {
													$display_regular_price = $variation_obj->get_regular_price();

													$display_price = wc_get_price_excluding_tax( $variation_obj );

													$product_tax = wc_get_price_including_tax( $variation_obj ) - wc_get_price_excluding_tax( $variation_obj );
												} elseif ( $shop_display == 'excl' && $cart_display == 'incl' ) {
													$display_regular_price = $variation_obj->get_regular_price();

													$display_price = $variation_obj->get_sale_price();

													$product_tax = 0;
												} else {
													$display_regular_price = $variation_obj->get_regular_price();

													$display_price = $variation_obj->get_sale_price();

													$product_tax = 0;
												}
											} else {
												if ( $shop_display == 'excl' && $cart_display == 'excl' ) {
													$display_regular_price = $variation_obj->get_regular_price();

													$display_price = wc_get_price_excluding_tax( $variation_obj );

													$product_tax = wc_get_price_including_tax( $variation_obj ) - wc_get_price_excluding_tax( $variation_obj );
												} elseif ( $shop_display == 'incl' && $cart_display == 'excl' ) {
													$display_regular_price = $variation_obj->get_regular_price();

													$display_price = wc_get_price_excluding_tax( $variation_obj );

													$product_tax = wc_get_price_including_tax( $variation_obj ) - wc_get_price_excluding_tax( $variation_obj );
												} elseif ( $shop_display == 'excl' && $cart_display == 'incl' ) {
													$display_regular_price = $variation_obj->get_regular_price();

													$display_price = wc_get_price_including_tax( $variation_obj );

													$product_tax = 0;
												} else {
													$display_regular_price = $variation_obj->get_regular_price();

													$display_price = wc_get_price_including_tax( $variation_obj );

													$product_tax = 0;
												}
											}

											$sale_var_price = apply_filters( 'pos_apply_discount_price', $display_price, $variation_id, $variation_max_stock );
											if ( $sale_var_price != $display_price && $sale_var_price > 0 ) {
												$discount_percent = ( ( $sale_var_price - $display_price ) / $display_price );
												$product_tax      = $product_tax + ( $product_tax * $discount_percent );
											}

											if ( ! empty( $variation_max_stock ) && $variation_max_stock > 0 ) {
												array_push(
													$variation_arr,
													array(
														'var_id' => $variation_id,
														'var_sku' => $variation_obj->get_sku(),
														'var_slug' => $variation_obj->get_slug(),
														'weight' => $include_unit_price_feature ? floatval( $variation_obj->get_weight() ) : 0,
														'length' => floatval( $variation_obj->get_length() ),
														'width' => floatval( $variation_obj->get_width() ),
														'height' => floatval( $variation_obj->get_height() ),
														'var_attr' => $attributes,
														'var_img' => $variation_image,
														'var_price' => $display_regular_price,
														'var_sale' => $sale_var_price,
														'stock' => (string) $variation_max_stock,
														'tax' => $product_tax,
														'originalTax' => $product_tax,
													)
												);
											}
										}
									}
								}
							}

							if ( ! $this->centralized_inventory_enabled ) {
								$pstock = $this->helper->get_pos_product_stock( $product_id, $outlet_id );
							} else {
								$product_manage_stock = $_product->get_manage_stock() ? $_product->get_manage_stock() : '';

								if ( $product_manage_stock ) {
									$pstock = (int) $_product->get_stock_quantity();
								} else {
									$pstock = $_product->get_stock_status() ? $_product->get_stock_status() : '';
								}
							}

							if ( $pstock == '' ) {
								$pstock = -1;
							}

							$pcat = $this->helper->get_pos_product_cat( $product_id );

							if ( $_product->get_status() == 'publish' ) {
								$product_tax = '';

								$tax_label = '';

								$cart_display = get_option( 'woocommerce_tax_display_cart' );

								// if ($cart_display != 'excl') {
								//     if (!wc_prices_include_tax()) {
								//         $tax_label = ' <small class="tax_label">'.WC()->countries->inc_tax_or_vat().'</small>';
								//     } else {
								//         $tax_label = ' <small class="tax_label">'.WC()->countries->ex_tax_or_vat().'</small>';
								//     }
								// }

								if ( $cart_display != 'excl' ) {
									$tax_label = ' <small class="tax_label">' . WC()->countries->inc_tax_or_vat() . '</small>';
								} else {
									$tax_label = ' <small class="tax_label">' . WC()->countries->ex_tax_or_vat() . '</small>';
								}

								if ( $product_type == 'variable' ) {
									$new_attr['variation'] = $variation_arr;

									$product_tax = wc_get_price_including_tax( $_product ) - $_product->get_price();

									$prices        = $_product->get_variation_prices( true );
									$min_price     = current( $prices['price'] );
									$max_price     = end( $prices['price'] );
									$min_reg_price = current( $prices['regular_price'] );
									$max_reg_price = end( $prices['regular_price'] );

									if ( $min_price !== $max_price ) {
										$regular_price = $max_price;
										$sale_price    = $min_price;
									} elseif ( $_product->is_on_sale() && $min_reg_price === $max_reg_price ) {
										$regular_price = $max_reg_price;
										$sale_price    = $min_price;
									} else {
										$regular_price = $min_price;
										$sale_price    = $min_price;
									}

									$display_price = apply_filters( 'pos_apply_discount_price', $sale_price, $_product->get_id(), $pstock );

									if ( empty( $display_price ) ) {
										$display_price = $regular_price;
									}

									if ( ! empty( $new_attr ) && ! empty( $new_attr['variation'] ) && ! empty( $regular_price ) ) {
										$pos_user_products[ $p ] = array(
											'product_id'  => $_product->get_id(),
											'sku'         => $_product->get_sku(),
											'slug'        => $_product->get_slug(),
											'title'       => filter_var( $_product->get_title(), FILTER_SANITIZE_SPECIAL_CHARS ),
											'price'       => $regular_price,
											'special'     => $display_price,
											'stock'       => (string) $pstock,
											'image'       => ! empty( $_product->get_image( 'thumbnail' ) ) ? $_product->get_image( 'thumbnail' ) : '',
											'categories'  => $pcat,
											'tax'         => $product_tax,
											'originalTax' => $product_tax,
											'tax_label'   => $tax_label,
											'variations'  => $new_attr,
											'type'        => $product_type,
											'weight_unit' => get_option( 'woocommerce_weight_unit' ),
											'dimension_unit' => get_option( 'woocommerce_dimension_unit' ),
										);
										$pos_user_products[ $p ] = apply_filters( 'manage_custom_product_type_support', $pos_user_products[ $p ], $_product, $p );
										++$p;
									}
								} else {
									if ( $pstock > 0 || $pstock != 'outofstock' ) {
										$regular_price = 0;

										$sale_price = 0;

										$product_tax = 0;

										$is_include_tax = get_option( 'woocommerce_prices_include_tax' );

										$shop_display = get_option( 'woocommerce_tax_display_shop' );

										$cart_display = get_option( 'woocommerce_tax_display_cart' );

										if ( $is_include_tax == 'yes' ) {
											if ( $shop_display == 'excl' && $cart_display == 'excl' ) {
												$regular_price = $_product->get_regular_price();

												$sale_price = wc_get_price_excluding_tax( $_product );

												$product_tax = floatval( wc_get_price_including_tax( $_product ) ) - floatval( wc_get_price_excluding_tax( $_product ) );
											} elseif ( $shop_display == 'incl' && $cart_display == 'excl' ) {
												$regular_price = $_product->get_regular_price();

												$sale_price = wc_get_price_excluding_tax( $_product );

												$product_tax = floatval( wc_get_price_including_tax( $_product ) ) - floatval( wc_get_price_excluding_tax( $_product ) );
											} elseif ( $shop_display == 'excl' && $cart_display == 'incl' ) {
												$regular_price = $_product->get_regular_price();

												$sale_price = $_product->get_sale_price();

												$sale_price = $sale_price ? $sale_price : $regular_price;

												$product_tax = 0;
											} else {
												$regular_price = $_product->get_regular_price();

												$sale_price = $_product->get_sale_price();

												$sale_price = $sale_price ? $sale_price : $regular_price;

												$product_tax = 0;
											}
										} else {
											if ( $shop_display == 'excl' && $cart_display == 'excl' ) {
												$regular_price = $_product->get_regular_price();

												$sale_price = wc_get_price_excluding_tax( $_product );

												$product_tax = floatval( wc_get_price_including_tax( $_product ) ) - floatval( wc_get_price_excluding_tax( $_product ) );
											} elseif ( $shop_display == 'incl' && $cart_display == 'excl' ) {
												$regular_price = $_product->get_regular_price();

												$sale_price = wc_get_price_excluding_tax( $_product );

												$product_tax = floatval( wc_get_price_including_tax( $_product ) ) - floatval( wc_get_price_excluding_tax( $_product ) );
											} elseif ( $shop_display == 'excl' && $cart_display == 'incl' ) {
												$regular_price = $_product->get_regular_price();

												$sale_price = wc_get_price_including_tax( $_product );

												$product_tax = 0;
											} else {
												$regular_price = $_product->get_regular_price();

												$sale_price = wc_get_price_including_tax( $_product );

												$product_tax = 0;
											}
										}

										$pstock = apply_filters( 'manage_custom_product_type_remaining_amount', $pstock, $_product );

										if ( ! empty( $_product->get_regular_price() ) && ! empty( $pstock ) && $pstock != 'outofstock' ) {

											if ( $pstock == 'instock' ) {

												$pstock = 5000;

											}

											$display_var_price = apply_filters( 'pos_apply_discount_price', $sale_price, $_product->get_id(), $pstock );

											if ( $sale_price != $display_var_price && $display_var_price != 0 ) {

												$discount_percent = ( ( $display_var_price - $sale_price ) / $sale_price );
												$product_tax      = $product_tax + ( $product_tax * $discount_percent );

											}

											$pos_user_products[ $p ] = array(
												'product_id' => $_product->get_id(),
												'sku'     => $_product->get_sku(),
												'slug'    => $_product->get_slug(),
												'title'   => $_product->get_title(),
												'price'   => $regular_price,
												'price_html' => $_product->get_price_html(),
												'special' => $display_var_price,
												'stock'   => (string) $pstock,
												'weight'  => $include_unit_price_feature ? floatval( $_product->get_weight() ) : 0,
												'length'  => floatval( $_product->get_length() ),
												'width'   => floatval( $_product->get_width() ),
												'height'  => floatval( $_product->get_height() ),
												'image'   => ! empty( $_product->get_image( 'thumbnail' ) ) ? $_product->get_image( 'thumbnail' ) : '',
												'categories' => $pcat,
												'originalTax' => $product_tax,
												'tax'     => $product_tax,
												'tax_label' => $tax_label,
												'variations' => 'false',
												'type'    => $product_type,
												'weight_unit' => get_option( 'woocommerce_weight_unit' ),
												'dimension_unit' => get_option( 'woocommerce_dimension_unit' ),
											);

											$pos_user_products[ $p ] = apply_filters( 'manage_custom_product_type_support', $pos_user_products[ $p ], $_product, $p );

											++$p;

										}
									}
								}
							}

							$variation_arr = array();

							$new_attr = array();

						}
					}
				} else {

					$pos_user_products = array();

				}
			}

			return apply_filters( 'wkwcpos_modify_products_response_at_pos', $pos_user_products, $manager_id, $outlet_id );

		} catch ( Exception $e ) {

			$this->error->set( 'exception', $e );

		}

	}

}
