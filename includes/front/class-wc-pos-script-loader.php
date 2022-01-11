<?php

/**
 * @author Webkul
 * @implements Assets_Interface
 */

namespace WKWC_POS\Includes\Front;

use Automattic\WooCommerce\Admin\Features\Features;

use WKWC_POS\Helper\Invoice\WKWCPOS_Invoice_Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Script_Loader' ) ) {

	class WC_Pos_Script_Loader implements Util\Assets_Interface {

		public function wk_wc_pos_Init() {
			add_action( 'admin_enqueue_scripts', array( $this, 'wk_wc_pos_EnqueueScripts_Admin' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'wk_wc_pos_EnqueueScripts_Front' ) );
		}

		/**
		 * Admin scripts and style enqueue.
		 */
		public function wk_wc_pos_EnqueueScripts_Admin() {

			$pages = array( 'pos-system', 'pos-outlets', 'pos-products', 'pos-orders', 'wc-pos-reports', 'wc-pos-invoice-templates', 'wc-pos-settings', 'wc-pos-extensions', 'wkwcpos-setup' );

			if ( ! empty( $_GET['page'] ) && in_array( $_GET['page'], $pages ) ) {
				if ( 'wkwcpos-setup' !== $_GET['page'] ) {

					$args = array(
						'meta_key'   => 'deault_customer_pos',
						'meta_value' => '1',
					);

					$pos_customer = get_users( $args );
					$fname        = '';
					if ( $pos_customer ) {

						foreach ( $pos_customer as $customer ) {

							$id    = $customer->ID;
							$fname = get_user_meta( $id, 'first_name', true );

						}
					}
					if ( empty( $fname ) ) {
						wp_safe_redirect( admin_url() . 'admin.php?page=wkwcpos-setup' );
						die;
					}
				}
				wp_enqueue_media();

				wp_enqueue_style( 'wk-wc-pos-style', WK_WC_POS_API . 'assets/css/admin.css' );

				wp_enqueue_script( 'wk-wc-pos-select2-js', plugins_url() . '/woocommerce/assets/js/select2/select2.min.js', array( 'jquery' ) );

				wp_enqueue_style( 'wk-wc-pos-select2-css', plugins_url() . '/woocommerce/assets/css/select2.css' );

				wp_enqueue_style( 'wk-wc-pos-woocommerce-admin-styles', WC()->plugin_url() . '/assets/css/admin.css', array(), WK_WC_POS_VERSION );

				wp_enqueue_style( 'wk-wc-pos-jquery-ui-style', WC()->plugin_url() . '/assets/css/jquery-ui/jquery-ui.min.css', array(), WK_WC_POS_VERSION );

				wp_enqueue_script( 'wk-wc-pos-admin-script', WK_WC_POS_API . '/assets/js/plugin-pos.js', array( 'jquery' ), WK_WC_POS_VERSION );

				wp_register_script( 'wkwcpos-outlet-import', WK_WC_POS_API . '/assets/js/outlet-import.js', array( 'jquery' ), WK_WC_POS_VERSION, true );

				$footer_left          = sprintf( __( 'If you like <strong>Point of sale</strong> from <strong><a href="https://webkul.com/" target="_blank" class="wc-rating-link" data-rated="Thanks :)">Webkul</a></strong> please leave us a <a href="https://codecanyon.net/item/wordpress-woocommerce-pos-system-point-of-sale/21254976" target="_blank" class="wc-rating-link" data-rated="Thanks :)">★★★★★</a> rating. A huge thanks in advance!', 'wc_pos' ) );
				$barcode_page_preview = get_option( '_pos_barcode_print_page_preview' );

				$translation = array(
					'order_search'   => esc_html__( 'Search by order id', 'wc_pos' ),
					'user_search'    => esc_html__( 'Search by User Name', 'wc_pos' ),
					'outlet_search'  => esc_html__( 'Search by Outlet Name', 'wc_pos' ),
					'product_search' => esc_html__( 'Search by Product Name', 'wc_pos' ),
					'invoice_search' => esc_html__( 'Search by Invoice Name', 'wc_pos' ),
					'payment_search' => esc_html__( 'Search by Payment Name', 'wc_pos' ),
				);
				wp_localize_script(
					'wk-wc-pos-admin-script',
					'wk_wc_apipos_script',
					array(
						'api_admin_ajax'    => admin_url( 'admin-ajax.php' ),
						'pos_api_nonce'     => wp_create_nonce( 'api-ajaxnonce' ),
						'site_url'          => site_url(),
						'site_version'      => WK_WC_POS_VERSION,
						'footer_left'       => $footer_left,
						'page_preview'      => $barcode_page_preview,
						'admin_translation' => $translation,
					)
				);

				$dependencies = array( 'wp-components', 'wc-components', 'wkwcpos-navigation', 'wp-date', 'wp-i18n', 'moment', 'react', 'react-dom', 'wp-hooks', 'wp-util' );
				$dependencies = array( 'wp-components', 'wp-i18n', 'react', 'react-dom', 'wp-hooks' );

				wp_register_script( 'wkwcpos-invoice-script', WK_WC_POS_API . '/assets/dist/invoice/index.js', $dependencies, WK_WC_POS_VERSION, true );

				wp_register_style( 'wkwcpos-invoice-style', WK_WC_POS_API . '/assets/dist/invoice/style.css', array(), WK_WC_POS_VERSION );

				wp_set_script_translations( 'wkwcpos-invoice-script', 'wc_pos' );

			}

		}

		public function wk_wc_pos_EnqueueScripts_Front() {

			global $wp;
			$js_file_version  = WK_WC_POS_VERSION;
			$css_file_version = WK_WC_POS_VERSION;

			$query_vars = $wp->query_vars;

			if ( array_key_exists( 'pos', $wp->query_vars ) || ( array_key_exists( 'pagename', $query_vars ) && $query_vars['pagename'] == 'pos' ) ) {

				wp_enqueue_style( 'wk-wc-pos-login-css', WK_WC_POS_API . '/assets/css/pos-login.css', array(), WK_WC_POS_VERSION );

				wp_enqueue_script( 'wk-wc-pos-login', WK_WC_POS_API . 'assets/js/min/pos-login.min.js', array( 'jquery' ), WK_WC_POS_VERSION );

				if ( is_user_logged_in() ) {

					?>

					<script type="text/javascript">
						var wkwcpos_variables = {
							PLUGIN_PATH: "<?php echo esc_url( WK_WC_POS_API ); ?>",
							HOME_URL: "<?php echo esc_url( WKWCPOS_HOME_URL ); ?>",
							WKWCPOS_SITE_URL: "<?php echo esc_url( WKWCPOS_SITE_URL ); ?>",
							WK_GET_SESSION_ID_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-session-id' ); ?>",
							WK_GET_ORDERS_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-orders' ); ?>",
							WK_GET_ALL_PRODUCTS_IDS_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-products-id' ); ?>",
							WK_GET_POPULAR_PRODUCTS_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-products' ); ?>",
							WK_CREATE_CUSTOMER_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/create-customer' ); ?>",
							WK_GET_CUSTOMERS_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-customers' ); ?>",
							WK_DELETE_CUSTOMER_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/delete-customer' ); ?>",
							WK_CREATE_ORDER_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/create-order' ); ?>",
							WK_CREATE_OFFLINE_ORDER_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/create-offline-order' ); ?>",
							WK_CHECK_STOCK_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/check-stock' ); ?>",
							WK_CHECK_COUPON_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/check-coupon' ); ?>",
							WK_GET_TAX_DETAILS_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-tax-details' ); ?>",
							WK_GET_ALL_CATEGORIES_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-all-categories' ); ?>",
							WK_UPDATE_MANAGER_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/update-manager' ); ?>",
							WK_GET_COUNTRIES_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-countries' ); ?>",
							WK_GET_STATES_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-states' ); ?>",
							WK_GET_ALL_CURRENCIES_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/currencies' ); ?>",
							WK_GET_SALE_HISTORY_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-sale-history' ); ?>",
							WK_CREATE_DRAWER_PERDAY_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/create-drawer-perday' ); ?>",
							WK_GET_INVOICE_TEMPLATE_ENDPOINT: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/get-invoice-template' ); ?>",
							WK_CUSTOM_EMAILS: "<?php echo esc_url( WKWCPOS_SITE_URL . '/wp-json/pos/v1/custom_emails' ); ?>",
							WK_USER_PKEY: "<?php echo ! empty( get_option( 'wkwcpos_api_username' ) ) ? esc_attr( base64_encode( get_option( 'wkwcpos_api_username' ) ) ) : ''; ?>",
							WK_USER_PHASH: "<?php echo ! empty( get_option( 'wkwcpos_api_password' ) ) ? esc_attr( base64_encode( get_option( 'wkwcpos_api_password' ) ) ) : ''; ?>"
						};
					</script>

					<?php

					global $wpdb;

					$url = esc_attr( $_SERVER['REQUEST_URI'] );

					$outlet_payment = array();
					$dir            = wp_upload_dir();
					$user_id        = get_current_user_id();

					$user_data   = get_userdata( $user_id );
					$fname       = $user_data->user_firstname;
					$lname       = $user_data->user_lastname;
					$email       = $user_data->user_email;
					$profile_pic = get_user_meta( $user_id, 'shr_pic', true );

					if ( ! empty( $profile_pic ) ) {
						$url = $dir['baseurl'];

						$profile_pic = $url . $profile_pic;
					}

					$outlet_id = $wpdb->get_var( $wpdb->prepare( "SELECT outlet_id FROM {$wpdb->prefix}woocommerce_pos_outlet_map WHERE user_id=%d", $user_id ) );

					$outlet_data = $wpdb->get_row( $wpdb->prepare( "SELECT * from {$wpdb->prefix}woocommerce_pos_outlets WHERE id = %d", $outlet_id ), ARRAY_A );

					if ( ! empty( $outlet_data ) ) {
						$outlet_payment = ! empty( $outlet_data['outlet_payment'] ) ? $outlet_data['outlet_payment'] : array();

						if ( ! empty( $outlet_payment ) ) {
							$outlet_payment = implode( ', ', maybe_unserialize( $outlet_payment ) );
							$outlet_payment = $wpdb->get_results( "SELECT id, payment_slug, payment_name from {$wpdb->prefix}woocommerce_pos_payments WHERE payment_status=1 AND id IN ( $outlet_payment )", ARRAY_A );
							$outlet_payment = maybe_unserialize( $outlet_payment );

						} else {
							$outlet_payment = array();
						}
					}

					$value = array(
						'id'           => '0',
						'payment_slug' => 'card',
						'payment_name' => __( 'Card Payment', 'wc_pos' ),
					);

					array_push( $outlet_payment, (object) $value );

					$logo_invoice = get_option( '_pos_invoice_logo' );

					if ( ! empty( $logo_invoice ) ) {
						$logo_invoice = $dir['baseurl'] . $logo_invoice;
					} else {
						$logo_invoice = WK_WC_POS_API . '/assets/images/17241-200.png';
					}
					$pos_screen_logo = get_option( '_pos_logo_to_pos_screen' );
					$user            = apply_filters(
						'wkwcpos_modify_default_user_data',
						array(
							'user_id'          => $user_id,
							'outlet_id'        => $outlet_id,
							'outlet_data'      => $outlet_data,
							'pos_user_phone'   => get_user_meta( $user_id, 'billing_phone', true ),
							'pos_user'         => $user_data,
							'logo_invoice'     => $logo_invoice,
							'fname'            => $fname,
							'lname'            => $lname,
							'email'            => $email,
							'profile_pic'      => $profile_pic,
							'payment_option'   => maybe_unserialize( $outlet_payment ),
							'tax_type'         => get_option( 'woocommerce_prices_include_tax' ),
							'current_date'     => date_i18n( 'D M j, Y' ),
							'difference'       => ! empty( get_option( '_define_difference_after_absolute' ) ) ? intval( get_option( '_define_difference_after_absolute' ) ) : 5,
							'tax_display_cart' => get_option( 'woocommerce_tax_display_cart' ),
							'pos_screen_logo'  => $pos_screen_logo,
						)
					);

					$pos_variable_arr = wkwcpos_get_all_pos_variable();

					$logout_url = wp_logout_url( home_url( '/pos' ) );

					wp_enqueue_style( 'wk-wc-pos-fontstyle-style', WK_WC_POS_API . 'assets/css/min/font-awesome.min.css' );

					wp_enqueue_style( 'wk-wc-pos-basic-style', WK_WC_POS_API . 'assets/css/min/basic.min.css' );

					wp_enqueue_style( 'wk-wc-pos-notifier-style', WK_WC_POS_API . 'assets/css/min/jquery-confirm.min.css' );

					wp_enqueue_script( 'wk-wc-pos-notifier-script', WK_WC_POS_API . 'assets/js/min/jquery-confirm.min.js', array( 'jquery' ), WK_WC_POS_VERSION );

					$centralized_inventory_enabled = apply_filters( 'wk_wc_pos_enable_centralized_inventory', false );

					wp_register_script(
						'wc-csv',
						self::get_url( 'csv-export/index', 'js' ),
						array( 'moment' ),
						WK_WC_POS_VERSION,
						true
					);

					wp_register_script(
						'wc-currency',
						self::get_url( 'currency/index', 'js' ),
						array( 'wc-number' ),
						WK_WC_POS_VERSION,
						true
					);

					wp_set_script_translations( 'wc-currency', 'woocommerce' );

					wp_register_script(
						'wc-date',
						self::get_url( 'date/index', 'js' ),
						array( 'moment', 'wp-date', 'wp-i18n' ),
						WK_WC_POS_VERSION,
						true
					);

					wp_register_script(
						'wc-number',
						self::get_url( 'number/index', 'js' ),
						array(),
						WK_WC_POS_VERSION,
						true
					);

					wp_set_script_translations( 'wc-date', 'woocommerce' );

					$scripts = array(
						'wc-explat',
						'wc-experimental',
						'wc-customer-effort-score',
						'wc-notices',
						'wc-number',
						'wc-tracks',
						'wc-date',
						'wc-components',
						'wc-csv',
						'wc-store-data',
						'wc-currency',
						//'wkwcpos-navigation',
						'wc-navigation',
					);

					$scripts_map = array(
						'wc-csv'        => 'csv-export',
						'wc-store-data' => 'data',
					);

					$translated_scripts = array(
						'wc-currency',
						'wc-date',
						'wc-components',
						'wp-components',
						'wc-customer-effort-score',
					);

					foreach ( $scripts as $script ) {
						$script_path_name = isset( $scripts_map[ $script ] ) ? $scripts_map[ $script ] : str_replace( 'wc-', '', $script );

						try {
							$script_assets_filename = self::get_script_asset_filename( $script_path_name, 'index' );
							$script_assets          = require WC_ADMIN_ABSPATH . WC_ADMIN_DIST_JS_FOLDER . $script_path_name . '/' . $script_assets_filename;

							wp_register_script(
								$script,
								self::get_url( $script_path_name . '/index', 'js' ),
								$script_assets ['dependencies'],
								$js_file_version,
								true
							);

							if ( in_array( $script, $translated_scripts, true ) ) {
								wp_set_script_translations( $script, 'woocommerce' );
							}
						} catch ( \Exception $e ) {
							// Avoid crashing WordPress if an asset file could not be loaded.
							wc_caught_exception( $e, __CLASS__ . '::' . __FUNCTION__, $script_path_name );
						}
					}

					wp_register_style(
						'wc-components',
						self::get_url( 'components/style', 'css' ),
						array(),
						$css_file_version
					);
					wp_style_add_data( 'wc-components', 'rtl', 'replace' );

					wp_style_add_data( 'wc-components-ie', 'rtl', 'replace' );

					wp_register_style(
						'wc-customer-effort-score',
						self::get_url( 'customer-effort-score/style', 'css' ),
						array(),
						$css_file_version
					);
					wp_style_add_data( 'wc-customer-effort-score', 'rtl', 'replace' );

					wp_register_style(
						'wc-experimental',
						self::get_url( 'experimental/style', 'css' ),
						array(),
						$css_file_version
					);
					wp_style_add_data( 'wc-experimental', 'rtl', 'replace' );

					wp_localize_script(
						WC_ADMIN_APP,
						'wcAdminAssets',
						array(
							'path'    => plugins_url( self::get_path( 'js' ), WC_ADMIN_PLUGIN_FILE ),
							'version' => $js_file_version,
						)
					);

					// The "app" RTL files are in a different format than the components.
					$rtl = is_rtl() ? '.rtl' : '';

					wp_register_style(
						WC_ADMIN_APP,
						self::get_url( "app/style{$rtl}", 'css' ),
						array( 'wc-components', 'wc-customer-effort-score', 'wp-components', 'wc-experimental' ),
						$css_file_version
					);

					wp_register_style(
						'wc-onboarding',
						self::get_url( 'onboarding/style', 'css' ),
						array(),
						$css_file_version
					);

					wp_set_script_translations( 'wc-components', 'woocommerce' );

					wp_register_style(
						'wc-components',
						self::get_url( 'components/style', 'css' ),
						array(),
						WK_WC_POS_VERSION
					);
					wp_style_add_data( 'wc-components', 'rtl', 'replace' );

					wp_register_script(
						'wkwcpos-navigation',
						WK_WC_POS_API . 'assets/dist/navigation/index.js',
						array(),
						WK_WC_POS_VERSION
					);

					wp_enqueue_style( 'wk-wc-pos-css', WK_WC_POS_API . 'assets/dist/app/style.css', array( 'wp-components', 'wc-components' ), WK_WC_POS_VERSION );

					wp_set_script_translations( 'wkwcpos-navigation', 'wc_pos' );

					$dependencies = apply_filters( 'wkwcpos_manage_script_dependencies', array( 'wp-components', 'wc-components', 'wc-tracks', 'wkwcpos-navigation', 'wp-date', 'wp-i18n', 'moment', 'react', 'react-dom', 'wp-hooks', 'wp-util' ) );

					// $dependencies = apply_filters( 'wkwcpos_manage_script_dependencies', array( 'wp-components','react', 'wkwcpos-navigation', 'react-dom', 'wp-hooks', 'wp-util' ) );

					wp_enqueue_script(
						'wk-wc-pos-script',
						WK_WC_POS_API . 'assets/dist/app/index.js',
						$dependencies,
						WK_WC_POS_VERSION
					);

					wp_set_script_translations( 'wk-wc-pos-script', 'wc_pos' );

					$localize_array = array(
						'api_admin_ajax'                 => admin_url( 'admin-ajax.php' ),
						'pos_api_nonce'                  => wp_create_nonce( 'api-ajaxnonce' ),
						'logged_in'                      => $user,
						'logout_url'                     => $logout_url,
						'pos_tr'                         => $pos_variable_arr,
						'assets'                         => WK_WC_POS_API . '/assets',
						'wk_pos_validate_product_at_pay' => $centralized_inventory_enabled,
						'currency_format_num_decimals'   => esc_attr( wc_get_price_decimals() ),
						'currency_format_symbol'         => get_woocommerce_currency_symbol(),
						'currency_format_decimal_sep'    => esc_attr( wc_get_price_decimal_separator() ),
						'currency_format_thousand_sep'   => esc_attr( wc_get_price_thousand_separator() ),
						'auto_sync'                      => get_option( '_pos_auto_sync_offline_orders' ),
						'printer_type'                   => ! empty( get_option( '_pos_printer_type' ) ) ? get_option( '_pos_printer_type' ) : 'a4',
						'currency_format'                => esc_attr( str_replace( array( '%1$s', '%2$s' ), array( '%s', '%v' ), get_woocommerce_price_format() ) ),   // For accounting JS.
					);

					wp_localize_script( 'wk-wc-pos-script', 'apif_script', $localize_array );

					add_action(
						'wp_enqueue_scripts',
						function () {
							global $wp_styles;

							foreach ( $wp_styles->queue as $s ) {
								$pos_styles = array( 'wk-wc-pos-login-css', 'wk-wc-pos-fontstyle-style', 'wk-wc-pos-notifier-style', 'wk-wc-pos-css', 'wk-wc-pos-basic-style', 'wkposaddon-style', 'wkposaddon-flatpicker-style', 'wcpos-style', 'wc-components', 'wc-components-ie', 'wp-components' );
								$pos_styles = apply_filters( 'wkwcpos_add_custom_css', $pos_styles );
								if ( ! in_array( $s, $pos_styles, true ) ) {
									if ( isset( $wp_styles->registered[ $s ] ) && $wp_styles->registered[ $s ] ) {
										wp_deregister_style( $wp_styles->registered[ $s ]->handle );
									}
								}
							}
						},
						10000
					);

					do_action( 'wkwcpos_enqueue_pos_scripts' );

				}
			}
		}

		public static function get_script_asset_filename( $script_path_name, $file ) {
			$minification_supported = Features::exists( 'minified-js' );
			$script_min_filename    = $file . '.min.asset.php';
			$script_nonmin_filename = $file . '.asset.php';
			$script_asset_path      = WC_ADMIN_ABSPATH . WC_ADMIN_DIST_JS_FOLDER . $script_path_name . '/';

			// Check minification is supported first, to avoid multiple is_readable checks when minification is
			// not supported.
			if ( $minification_supported && is_readable( $script_asset_path . $script_min_filename ) ) {
				return $script_min_filename;
			} elseif ( is_readable( $script_asset_path . $script_nonmin_filename ) ) {
				return $script_nonmin_filename;
			} else {
				// could not find an asset file, throw an error.
				throw new \Exception( 'Could not find asset registry for ' . $script_path_name );
			}
		}
		public static function get_url( $file, $ext ) {
			$suffix = '';

			return plugins_url( self::get_path( $ext ) . $file . $suffix . '.' . $ext, WC_ADMIN_PLUGIN_FILE );
		}

		private static function get_path( $ext ) {
			return ( 'css' === $ext ) ? WC_ADMIN_DIST_CSS_FOLDER : WC_ADMIN_DIST_JS_FOLDER;
		}
	}
}
