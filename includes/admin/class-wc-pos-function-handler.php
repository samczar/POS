<?php

/**
 * @author Webkul
 *
 * @version 2.1.0
 * This file handles all admin end action callbacks.
 */

namespace WKWC_POS\Includes\Admin;

use WKWC_POS\Includes;

use WKWC_POS\Templates\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Function_Handler' ) ) {
	class WC_Pos_Function_Handler implements Util\Admin_Settings_Interface {

		protected $wpdb = '';

		public function __construct() {
			global $wpdb;

			$this->wpdb = $wpdb;
		}

		public function wkwcpos_start_setup_wizard() {
			// Setup/welcome.
			if ( ! empty( $_GET['page'] ) && $_GET['page'] == 'wkwcpos-setup' ) {
				new Includes\Admin\WKWCPOS_Setup_Wizard();
			}
		}

		public function wk_wc_pos_add_dashboard_menu() {
			new Menu\WC_Pos_Admin_Menu_Template();
		}

		public function wk_wc_pos_general_settings() {
			new Admin\Settings\WC_Pos_General_Settings();
		}

		public function add_pos_screen_ids( $screen_id ) {
			$arr = 'point-of-sale_page_wc-pos-settings';

			array_push( $screen_id, $arr, 'toplevel_page_pos-system', 'toplevel_page_wkwcpos-setup', 'point-of-sale_page_pos-outlets', 'point-of-sale_page_wc-add-pos-user', 'point-of-sale_page_wc-pos-invoice-templates' );

			return $screen_id;
		}

		public function wk_wc_pos_customer_settings() {
			new Admin\Settings\WC_Pos_Customer_Settings();
		}

		public function wk_wc_pos_printer_settings() {
			new Admin\Settings\WC_Pos_Printer_Settings();
		}

		public function wk_wc_pos_payment_settings() {
			if ( isset( $_GET['action'] ) && ( $_GET['action'] == 'add' || $_GET['action'] == 'edit' ) ) {
				new Admin\Settings\WC_Pos_Manage_Payment();
			} else {
				new Admin\Settings\WC_Pos_Payment_List();
			}
		}

		public function wk_wc_pos_outlet_mass_assign_master_stock() {
			new Admin\Settings\WC_Pos_Mass_Assign_Product_Master_Stock_Settings();
		}

		public function wk_wc_pos_outlet_general_settings() {
			new Admin\Outlet\WC_Pos_Add_Outlet();
		}

		public function wk_wc_save_pos_user( $post ) {
			new Includes\Admin\User\WC_Pos_Manage_User( $post );
		}

		public function wk_wc_save_pos_outlet( $post ) {
			new Includes\Admin\Outlet\WC_Pos_Manage_Outlet( $post );
		}

		public function wkwcpos_order_stock_restore( $order_id ) {
			$order = wc_get_order( $order_id );

			$main_outlet = get_post_meta( $order->get_id(), '_wk_wc_pos_outlet', true );

			if ( ! empty( $main_outlet ) ) {

				$table_name = $this->wpdb->prefix . 'woocommerce_pos_outlet_product_map';

				foreach ( $order->get_items() as $item ) {

					$product_id = $item->get_product_id();

					$product_quantity = $item->get_quantity();

					$product = wc_get_product( $product_id );

					if ( $product->get_type() == 'simple' ) {

						$pos_stock = $this->wpdb->get_var( "SELECT pos_stock FROM $table_name WHERE product_id = $product_id AND outlet_id = $main_outlet" );

						$master_stock = get_post_meta( $product_id, '_pos_master_stock', true );

						if ( $pos_stock != '' ) {

							$pos_stock = intval( $pos_stock ) + intval( $product_quantity );

							$master_stock = $master_stock + $product_quantity;

							update_post_meta( $product_id, '_pos_master_stock', $master_stock );

							$pos_stock = $this->wpdb->get_results( "UPDATE $table_name SET pos_stock = $pos_stock WHERE product_id = $product_id AND outlet_id = $main_outlet" );
						}
					} elseif ( $product->get_type() == 'variable' ) {
						$product_variation_id = $item->get_variation_id();

						$pos_stock = $this->wpdb->get_var( "SELECT pos_stock FROM $table_name WHERE product_id = $product_variation_id AND outlet_id = $main_outlet" );

						$master_stock = get_post_meta( $product_variation_id, '_pos_variation_master_stock', true );

						if ( $pos_stock != '' ) {
							$pos_stock = intval( $pos_stock ) + intval( $product_quantity );

							$master_stock = $master_stock + $product_quantity;

							update_post_meta( $product_variation_id, '_pos_variation_master_stock', $master_stock );

							$pos_stock = $this->wpdb->get_results( "UPDATE $table_name SET pos_stock = $pos_stock WHERE product_id = $product_variation_id AND outlet_id = $main_outlet" );
						}
					}
				}
			}
		}

		public function wk_wc_pos_outlet_mgproducts_settings() {
			if ( isset( $_GET['page'] ) && $_GET['page'] == 'pos-outlets' && isset( $_GET['tab'] ) && $_GET['tab'] == 'manage-products' && isset( $_GET['outlet_id'] ) && ! empty( $_GET['outlet_id'] ) ) {
				$table_name = $this->wpdb->prefix . 'woocommerce_pos_outlets';

				$res_pos = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT * from $table_name WHERE id=%d", $_GET['outlet_id'] ) );

				if ( $res_pos ) {
					new Admin\Outlet\WC_Pos_Outlet_Product_List();
				} else {
					?>
					<div class='notice notice-error is-dismissible'>
						<p><?php esc_html_e( 'No Such Outlet found.', 'wc_pos' ); ?></p>
					</div>
					<?php
				}
			}
		}

		public function wk_wc_pos_register_settings() {
			// API Settings.
			register_setting( 'pos-general-settings-group', 'wkwcpos_api_username' );
			register_setting( 'pos-general-settings-group', 'wkwcpos_api_password' );

			// General Settings.
			register_setting( 'pos-general-settings-group', '_pos_heading_login' );
			register_setting( 'pos-general-settings-group', '_pos_footer_brand_link' );
			register_setting( 'pos-general-settings-group', '_pos_footer_brand_name' );
			register_setting( 'pos-general-settings-group', '_pos_popular_product_count' );
			register_setting( 'pos-general-settings-group', '_pos_low_stock_warn' );
			register_setting( 'pos-general-settings-group', '_define_difference_after_absolute' );
			register_setting( 'pos-general-settings-group', '_pos_logo_to_pos_screen' );
			register_setting( 'pos-general-settings-group', '_pos_barcode_print_page_preview' );
			register_setting( 'pos-general-settings-group', '_pos_auto_sync_offline_orders' );
			register_setting( 'pos-general-settings-group', '_pos_invoice_logo' );
			register_setting( 'pos-general-settings-group', '_pos_inventory_type' );
			register_setting( 'pos-general-settings-group', '_pos_product_default_status' );
			register_setting( 'pos-general-settings-group', '_pos_unit_price_feature' );
			register_setting( 'pos-general-settings-group', '_pos_mails_at_pos_end' );

			//PWA Settings
			register_setting( 'pos-general-settings-group', '_pos_pwa_name' );
			register_setting( 'pos-general-settings-group', '_pos_pwa_shortname' );
			register_setting( 'pos-general-settings-group', '_pos_pwa_themecolor' );
			register_setting( 'pos-general-settings-group', '_pos_pwa_bgcolor' );
			register_setting( 'pos-general-settings-group', '_pos_pwa_icon48' );
			register_setting( 'pos-general-settings-group', '_pos_pwa_icon96' );
			register_setting( 'pos-general-settings-group', '_pos_pwa_icon144' );
			register_setting( 'pos-general-settings-group', '_pos_pwa_icon196' );

			// Barcode Settings.
			register_setting( 'pos-barcode-settings-group', '_pos_barcode_width' );

			// Notification Settings.
			register_setting( 'pos-settings-group', 'pos_text' );
			register_setting( 'pos-settings-group', 'pos_text_color' );

			//Printer Settings
			register_setting( 'pos-printer-settings-group', '_pos_printer_type' );

			do_action( 'wkwcpos_save_printer_settings', 'pos-printer-settings-group' );
			do_action( 'wkwcpos_save_general_settings', 'pos-general-settings-group' );
			do_action( 'wkwcpos_save_barcode_settings', 'pos-barcode-settings-group' );
		}

		public function wk_wc_pos_custom_field_product_bulk_edit() {
			?>
			<div class="inline-edit-group">
				<label class="alignleft">
					<span class="title"><?php _e( 'Master Stock', 'wc_pos' ); ?></span>
					<span class="input-text-wrap">
						<select class="change_t_dostawy change_to" name="change_t_dostawy">
							<?php
							$options = array(
								''  => __( '— No change —', 'wc_pos' ),
								'1' => __( 'Change to:', 'wc_pos' ),
							);
							foreach ( $options as $key => $value ) {
								echo '<option value="' . esc_attr( $key ) . '">' . $value . '</option>';
							}
							?>
						</select>
					</span>
				</label>
				<label class="change-input">
					<input type="number" name="_pos_master_stock" class="text t_dostawy" min='0' placeholder="<?php _e( 'Enter master stock', 'wc_pos' ); ?>" value="" />
				</label>
			</div>
			<?php
		}

		public function wk_wc_pos_save_custom_field_product_bulk_edit( $product ) {
			if ( ! empty( $product ) && $product->is_type( 'simple' ) ) {
				$product_id = method_exists( $product, 'get_id' ) ? $product->get_id() : $product->id;

				if ( isset( $_REQUEST['_pos_master_stock'] ) ) {
					update_post_meta( $product_id, '_pos_master_stock', intval( $_REQUEST['_pos_master_stock'] ) );
				}
			}
		}

		public function wk_wc_pos_variation_settings_fields( $loop, $variation_data, $variation ) {
			// Number Field
			woocommerce_wp_text_input(
				array(
					'id'                => '_pos_variation_master_stock[' . $variation->ID . ']',
					'label'             => __( 'POS Variation Master Stock', 'wc_pos' ),
					'desc_tip'          => 'true',
					'description'       => __( 'POS Enter the master stock for variation.', 'wc_pos' ),
					'value'             => get_post_meta( $variation->ID, '_pos_variation_master_stock', true ),
					'custom_attributes' => array(
						'step' => 'any',
						'min'  => '0',
					),
				)
			);
		}

		public function wk_wc_pos_save_variation_settings_fields( $post_id ) {
			$table_name = $this->wpdb->prefix . 'woocommerce_pos_outlet_product_map';

			// manage master stock when product main stock is updated
			if ( isset( $_POST['variable_post_id'] ) ) {
				foreach ( $_POST['variable_post_id'] as $key => $value ) {
					$total_stock = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT pos_stock FROM $table_name WHERE product_id = '%d'", $value ) );

					$total_stock = wp_list_pluck( $total_stock, 'pos_stock' );

					$total_stock = array_sum( $total_stock );

					if ( isset( $_POST['_pos_variation_master_stock'][ $value ] ) && $_POST['_pos_variation_master_stock'][ $value ] ) {
						$master_stock = $_POST['_pos_variation_master_stock'][ $value ];

						$woo_stock = 0;

						if ( isset( $_POST['variable_manage_stock'][ $key ] ) && $_POST['variable_manage_stock'][ $key ] == 'on' && $_POST['variable_stock'][ $key ] ) {
							$woo_stock = $_POST['variable_stock'][ $key ];
						}
						$remaining_master_stock = $master_stock - $total_stock - $woo_stock;

						if ( $remaining_master_stock >= 0 ) {
							update_post_meta( $value, '_pos_variation_master_stock', $master_stock );
						} else {
							update_post_meta( $value, '_pos_variation_master_stock', ( $total_stock + $woo_stock ) );
						}
					}
				}
			}
		}

		public function wk_wc_pos_simple_woo_custom_fields() {
			global $post_id;

			$product = wc_get_product( $post_id );

			if ( ! empty( $product ) && $product->is_type( 'simple' ) ) {
				// Number Field
				woocommerce_wp_text_input(
					array(
						'id'                => '_pos_master_stock',
						'label'             => __( 'POS Master Stock', 'wc_pos' ),
						'desc_tip'          => 'true',
						'description'       => __( 'POS Enter the master stock for product.', 'wc_pos' ),
						'value'             => get_post_meta( $post_id, '_pos_master_stock', true ),
						'custom_attributes' => array(
							'step' => 'any',
							'min'  => '0',
						),
					)
				);
			}
		}

		public function wk_wc_pos_send_order_to_mypage( $order_id ) {
			$order = wc_get_order( $order_id );

			$pos_order = get_post_meta( $order_id, '_wk_wc_pos_outlet', true );

			if ( ! $pos_order ) {
				$items = $order->get_items();

				if ( ! empty( $items ) ) {
					foreach ( $items as $key => $value ) {
						if ( $value->get_variation_id() ) {
							$item_id = $value->get_variation_id();

							$item_master_stock = get_post_meta( $item_id, '_pos_variation_master_stock', true );

							$sold_quantity = $value->get_quantity();

							$updated_master_stock = ( $item_master_stock >= $sold_quantity ) ? ( $item_master_stock - $sold_quantity ) : $item_master_stock;

							update_post_meta( $item_id, '_pos_variation_master_stock', $updated_master_stock );
						} else {
							$item_id = $value->get_product_id();

							$item_master_stock = get_post_meta( $item_id, '_pos_master_stock', true );

							$sold_quantity = $value->get_quantity();

							$updated_master_stock = ( $item_master_stock >= $sold_quantity ) ? ( $item_master_stock - $sold_quantity ) : $item_master_stock;

							update_post_meta( $item_id, '_pos_master_stock', $updated_master_stock );
						}
					}
				}
			}
		}

		public function wk_wc_pos_manage_product_master_stock( $post_id ) {

			$table_name = $this->wpdb->prefix . 'woocommerce_pos_outlet_product_map';

			if ( isset( $_POST['product-type'] ) && 'simple' == $_POST['product-type'] ) {
				$total_stock = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT pos_stock FROM $table_name WHERE product_id = '%d'", $post_id ) );

				$total_stock = wp_list_pluck( $total_stock, 'pos_stock' );

				$total_stock = array_sum( $total_stock );

				if ( isset( $_POST['_pos_master_stock'] ) && $_POST['_pos_master_stock'] ) {
					$master_stock = $_POST['_pos_master_stock'];

					$woo_stock = 0;

					if ( isset( $_POST['_manage_stock'] ) && $_POST['_manage_stock'] == 'yes' && $_POST['_stock'] ) {
						$woo_stock = $_POST['_stock'];
					}
					$remaining_master_stock = $master_stock - $total_stock - $woo_stock;

					if ( $remaining_master_stock >= 0 ) {
						update_post_meta( $post_id, '_pos_master_stock', $master_stock );
					} else {
						update_post_meta( $post_id, '_pos_master_stock', ( $total_stock + $woo_stock ) );
					}
				}
			}

		}

		public function wkwcpos_enable_product_in_outlet( $post_id ) {

			if ( get_option( '_pos_product_default_status', 'enabled' ) == 'enabled' ) {

				global $wpdb;

				$outlets = $wpdb->get_results( "SELECT id FROM {$wpdb->prefix}woocommerce_pos_outlets", ARRAY_A );

				if ( ! empty( $outlets ) ) {

					$product_obj = wc_get_product( $post_id );

					if ( ! empty( $product_obj ) && is_object( $product_obj ) ) {

						foreach ( $outlets as $key => $outlet ) {

							$entry_exists = $wpdb->get_var( $wpdb->prepare( "SELECT id FROM {$wpdb->prefix}woocommerce_pos_outlet_product_map WHERE outlet_id=%d AND product_id=%d", $outlet['id'], $post_id ) );

							if ( empty( $entry_exists ) ) {

								if ( $product_obj->get_type() == 'variable' ) {

									$wpdb->insert(
										$wpdb->prefix . 'woocommerce_pos_outlet_product_map',
										array(
											'outlet_id'  => $outlet['id'],
											'product_id' => $post_id,
											'pos_status' => 'enabled',
											'pos_stock'  => 1000000,
										),
										array( '%d', '%d', '%s', '%d' )
									);
								} else {

									$wpdb->insert(
										$wpdb->prefix . 'woocommerce_pos_outlet_product_map',
										array(
											'outlet_id'  => $outlet['id'],
											'product_id' => $post_id,
											'pos_status' => 'enabled',
											'pos_stock'  => 0,
										),
										array( '%d', '%d', '%s', '%d' )
									);
								}
							}
						}
					}
				}
			}

		}

		public function wk_wc_pos_admin_bar_menus( $wp_admin_bar ) {
			if ( ! is_admin() || ! is_user_logged_in() ) {
				return;
			}

			// Show only when the user is a member of this site, or they're a super admin.
			if ( ! is_user_member_of_blog() && ! is_super_admin() ) {
				return;
			}

			// Don't display when shop page is the same of the page on front.
			if ( get_option( 'page_on_front' ) == wc_get_page_id( 'pos' ) ) {
				return;
			}

			// Add an option to visit the store.
			$wp_admin_bar->add_node(
				array(
					'parent' => 'site-name',
					'id'     => 'view-pos',
					'title'  => __( 'Visit POS', 'wc_pos' ),
					'href'   => wp_logout_url( site_url( 'pos' ) ),
				)
			);
		}
	}
}
