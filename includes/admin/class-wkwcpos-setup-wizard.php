<?php
/**
 * Setup Wizard Class
 *
 * Takes new users through some basic steps to setup their pos.
 *
 * @package     WooCommerce Point of Sale/Admin
 * @version     3.3.0
*/

namespace WKWC_POS\Includes\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * WKWCPOS_Setup_Wizard class.
 */
class WKWCPOS_Setup_Wizard {

	/**
	 * Current step
	 *
	 * @var string
	 */
	private $step = '';

	/**
	 * Steps for the setup wizard
	 *
	 * @var array
	 */
	private $steps = array();

	/**
	 * Hook in tabs.
	 */
	public function __construct() {
		if ( apply_filters( 'wkwcpos_enable_setup_wizard', true ) && current_user_can( 'manage_woocommerce' ) ) {
			add_action( 'admin_menu', array( $this, 'wkwcpos_admin_menus' ) );
			add_action( 'admin_init', array( $this, 'wkwcpos_setup_wizard' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'wkwcpos_enqueue_wizard_scripts' ) );
		}
	}

	/**
	 * Add admin menus/screens.
	 */
	public function wkwcpos_admin_menus() {
		add_dashboard_page( '', '', 'manage_options', 'wkwcpos-setup', '' );
	}


	/**
	 * Register/enqueue scripts and styles for the Setup Wizard.
	 *
	 * Hooked onto 'admin_enqueue_scripts'.
	 */
	public function wkwcpos_enqueue_wizard_scripts() {

		wp_enqueue_style( 'wc-setup', WC()->plugin_url() . '/assets/css/wc-setup.css', array( 'dashicons', 'install' ), WC_VERSION );

	}

	/**
	 * Show the setup wizard.
	 */
	public function wkwcpos_setup_wizard() {
		if ( empty( $_GET['page'] ) || 'wkwcpos-setup' !== $_GET['page'] ) { // WPCS: CSRF ok, input var ok.
			return;
		}

		$default_steps = array(
			'begin_wizard'     => array(
				'name'    => __( 'Begin Wizard', 'wc_pos' ),
				'view'    => array( $this, 'wkwcpos_setup_begin_wizard' ),
				'handler' => array( $this, 'wkwcpos_setup_begin_wizard_save' ),
			),
			'general_settings' => array(
				'name'    => __( 'General Settings', 'wc_pos' ),
				'view'    => array( $this, 'wkwcpos_setup_general_settings_wizard' ),
				'handler' => array( $this, 'wkwcpos_setup_general_settings_wizard_save' ),
			),
			'web_app_settings' => array(
				'name'    => __( 'Web App Settings', 'wc_pos' ),
				'view'    => array( $this, 'wkwcpos_setup_web_app_settings_wizard' ),
				'handler' => array( $this, 'wkwcpos_setup_web_app_settings_wizard_save' ),
			),
			'default_customer' => array(
				'name'    => __( 'Default Customer', 'wc_pos' ),
				'view'    => array( $this, 'wkwcpos_setup_default_customer_settings_wizard' ),
				'handler' => array( $this, 'wkwcpos_setup_default_customer_settings_wizard_save' ),
			),
			'next_steps'       => array(
				'name'    => __( 'Ready!', 'wc_pos' ),
				'view'    => array( $this, 'wkwcpos_setup_ready' ),
				'handler' => '',
			),
		);

		$this->steps = apply_filters( 'wkwcpos_setup_wizard_steps', $default_steps );
		$this->step  = isset( $_GET['step'] ) ? sanitize_key( $_GET['step'] ) : current( array_keys( $this->steps ) ); // WPCS: CSRF ok, input var ok.

		// @codingStandardsIgnoreStart
		if ( ! empty( $_POST['save_step'] ) && isset( $this->steps[ $this->step ]['handler'] ) ) {
			call_user_func( $this->steps[ $this->step ]['handler'], $this );
		}
		// @codingStandardsIgnoreEnd

		ob_start();
		$this->setup_wizard_header();
		$this->setup_wizard_steps();
		$this->setup_wizard_content();
		$this->setup_wizard_footer();
		exit;
	}

	/**
	 * Get the URL for the next step's screen.
	 *
	 * @param string $step  slug (default: current step).
	 * @return string       URL for next step if a next step exists.
	 *                      Admin URL if it's the last step.
	 *                      Empty string on failure.
	 * @since 3.0.0
	 */
	public function get_next_step_link( $step = '' ) {
		if ( ! $step ) {
			$step = $this->step;
		}

		$keys = array_keys( $this->steps );
		if ( end( $keys ) === $step ) {
			return admin_url();
		}

		$step_index = array_search( $step, $keys, true );
		if ( false === $step_index ) {
			return '';
		}

		return add_query_arg( 'step', $keys[ $step_index + 1 ], remove_query_arg( 'activate_error' ) );
	}

	/**
	 * Setup Wizard Header.
	 */
	public function setup_wizard_header() {
		set_current_screen();
		?>
		<!DOCTYPE html>
		<html <?php language_attributes(); ?>>
		<head>
			<meta name="viewport" content="width=device-width" />
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<title><?php esc_html_e( 'WooCommerce Point of Sale &rsaquo; Setup Wizard', 'wc_pos' ); ?></title>
			<?php do_action( 'admin_enqueue_scripts' ); ?>
			<?php wp_print_scripts( 'wkwcpos-setup' ); ?>
			<?php do_action( 'admin_print_styles' ); ?>
			<?php do_action( 'admin_head' ); ?>
		</head>
		<body class="wc-setup wp-core-ui">
			<div id="wc-logo">
				<a href="https://codecanyon.net/collections/8061240-point-of-sale-system-for-woocommerce-pos" class="wk-poslink" title="POS Add-ons | Webkul" target="_blank" rel="noopener"><img src="<?php echo esc_url( WK_WC_POS_API . '/assets/images/pos-product-icon.png' ); ?>?v=1.0" alt="<?php esc_attr_e( 'WooCommerce POS', 'wc_pos' ); ?>"  />
				<h1><?php esc_html_e( 'Woocommerce Point Of Sale', 'wc_pos' ); ?></h1>
				</a>
			</div>
		<?php
	}

	/**
	 * Setup Wizard Footer.
	 */
	public function setup_wizard_footer() {
		?>
			<?php if ( 'begin_wizard' === $this->step ) : ?>
				<a class="wc-setup-footer-links" href="<?php echo esc_url( admin_url() ); ?>"><?php esc_html_e( 'Not right now', 'wc_pos' ); ?></a>
			<?php elseif ( 'next_steps' !== $this->step ) : ?>
				<a class="wc-setup-footer-links" href="<?php echo esc_url( $this->get_next_step_link() ); ?>"><?php esc_html_e( 'Skip this step', 'wc_pos' ); ?></a>
			<?php endif; ?>
			<?php do_action( 'woocommerce_setup_footer' ); ?>
			</body>
		</html>
		<?php
	}

	/**
	 * Output the steps.
	 */
	public function setup_wizard_steps() {
		$output_steps = $this->steps;
		?>
		<ol class="wc-setup-steps">
			<?php
			foreach ( $output_steps as $step_key => $step ) {
				$is_completed = array_search( $this->step, array_keys( $this->steps ), true ) > array_search( $step_key, array_keys( $this->steps ), true );

				if ( $step_key === $this->step ) {
					?>
					<li class="active"><?php echo esc_html( $step['name'] ); ?></li>
					<?php
				} elseif ( $is_completed ) {
					?>
					<li class="done">
						<a href="<?php echo esc_url( add_query_arg( 'step', $step_key, remove_query_arg( 'activate_error' ) ) ); ?>"><?php echo esc_html( $step['name'] ); ?></a>
					</li>
					<?php
				} else {
					?>
					<li><?php echo esc_html( $step['name'] ); ?></li>
					<?php
				}
			}
			?>
		</ol>
		<?php
	}

	/**
	 * Output the content for the current step.
	 */
	public function setup_wizard_content() {
		echo '<div class="wc-setup-content wkwcpos-setup-content">';
		if ( ! empty( $this->steps[ $this->step ]['view'] ) ) {
			call_user_func( $this->steps[ $this->step ]['view'], $this );
		}
		echo '</div>';
	}

	/**
	 * Initial "General Settings Setup" step.
	 * API username, api password and inventory type.
	*/
	public function wkwcpos_setup_general_settings_wizard() {

		$api_username           = get_option( 'wkwcpos_api_username' );
		$inventory_type         = get_option( '_pos_inventory_type' );
		$product_default_status = get_option( '_pos_product_default_status' );
		$unit_price_feature     = get_option( '_pos_unit_price_feature' );
		$customer_mails         = get_option( '_pos_mails_at_pos_end' );

		?>
		<form method="post">
			<?php wp_nonce_field( 'wkwcpos-setup' ); ?>
			<p class="store-setup"><?php esc_html_e( 'The following wizard will help you configure your WooCommerce Point of Sale and get you started quickly.', 'wc_pos' ); ?></p>

			<div>

				<label class="location-prompt" for="wkwcpos_api_username"><?php esc_html_e( 'API Username', 'wc_pos' ); ?></label>
				<input type="text" id="wkwcpos_api_username" class="pos_wizard_input_css wkwcpos_api_username location-input" name="wkwcpos_api_username" required value="<?php echo esc_attr( $api_username ); ?>" />

				<label class="location-prompt" for="wkwcpos_api_password"><?php esc_html_e( 'API Password', 'wc_pos' ); ?></label>
				<input type="text" id="wkwcpos_api_password" class="pos_wizard_input_css wkwcpos_api_password location-input" name="wkwcpos_api_password" required value="<?php echo esc_attr( $this->wkwcpos_generate_random_password( 30 ) ); ?>" />

				<label for="_pos_inventory_type" class="location-prompt"><?php esc_html_e( 'Select Inventory Type', 'wc_pos' ); ?></label>
				<select id="_pos_inventory_type" name="_pos_inventory_type" required data-placeholder="<?php esc_attr_e( 'Select Inventory Type', 'wc_pos' ); ?>" aria-label="<?php esc_attr_e( 'Select Inventory Type', 'wc_pos' ); ?>" class="pos_wizard_input_css location-input wc-enhanced-select dropdown">

				<option value="centralized_stock" <?php echo $inventory_type == 'centralized_stock' ? esc_attr( 'selected="selected"' ) : ''; ?>><?php esc_html_e( 'Centralized Stock Inventory', 'wc_pos' ); ?></option>
				<option value="master_stock" <?php echo $inventory_type == 'master_stock' ? esc_attr( 'selected="selected"' ) : ''; ?>><?php esc_html_e( 'Master Stock Inventory', 'wc_pos' ); ?></option>

				</select>

				<label for="_pos_product_default_status" class="location-prompt"><?php esc_html_e( 'Default Product Status for Outlet', 'wc_pos' ); ?></label>
				<select id="_pos_product_default_status" name="_pos_product_default_status" required data-placeholder="<?php esc_attr_e( 'Default Product Status for Outlet', 'wc_pos' ); ?>" aria-label="<?php esc_attr_e( 'Default Product Status for Outlet', 'wc_pos' ); ?>" class="pos_wizard_input_css location-input wc-enhanced-select dropdown">

					<option value="enabled" <?php echo $product_default_status == 'enabled' ? esc_attr( 'selected="selected"' ) : ''; ?>><?php esc_html_e( 'Enabled', 'wc_pos' ); ?></option>
					<option value="disabled" <?php echo $product_default_status == 'disabled' ? esc_attr( 'selected="selected"' ) : ''; ?>><?php esc_html_e( 'Disabled', 'wc_pos' ); ?></option>

				</select>

				<label for="_pos_unit_price_feature" class="location-prompt"><?php esc_html_e( 'Enable Unit Price Feature', 'wc_pos' ); ?></label>

				<select id="_pos_unit_price_feature" name="_pos_unit_price_feature" required data-placeholder="<?php esc_attr_e( 'Enable Unit Price Feature', 'wc_pos' ); ?>" aria-label="<?php esc_attr_e( 'Enable Unit Price Feature', 'wc_pos' ); ?>" class="pos_wizard_input_css location-input wc-enhanced-select dropdown">

					<option value="enabled" <?php echo $unit_price_feature == 'enabled' ? esc_attr( 'selected="selected"' ) : ''; ?>><?php esc_html_e( 'Enabled', 'wc_pos' ); ?></option>
					<option value="disabled" <?php echo $unit_price_feature == 'disabled' ? esc_attr( 'selected="selected"' ) : ''; ?>><?php esc_html_e( 'Disabled', 'wc_pos' ); ?></option>

				</select>

				<label for="_pos_mails_at_pos_end" class="location-prompt"><?php esc_html_e( 'Enable Mails at POS end', 'wc_pos' ); ?>
				</label>
				<select id="_pos_mails_at_pos_end" name="_pos_mails_at_pos_end" required data-placeholder="<?php esc_attr_e( 'Enable Mails at POS end', 'wc_pos' ); ?>" aria-label="<?php esc_attr_e( 'Enable Mails at POS end', 'wc_pos' ); ?>" class="pos_wizard_input_css location-input wc-enhanced-select dropdown">
					<option value="enabled" <?php echo $customer_mails == 'enabled' ? esc_attr( 'selected="selected"' ) : ''; ?>><?php esc_html_e( 'Enabled', 'wc_pos' ); ?></option>
					<option value="disabled" <?php echo $customer_mails == 'disabled' ? esc_attr( 'selected="selected"' ) : ''; ?>><?php esc_html_e( 'Disabled', 'wc_pos' ); ?></option>
				</select>

			</div>

			<p class="wc-setup-actions step">
				<button type="submit" class="pos-btn-primary button button-large button-next" value="<?php esc_attr_e( 'Next!', 'wc_pos' ); ?>" name="save_step"><?php esc_html_e( 'Next!', 'wc_pos' ); ?></button>
			</p>
		</form>
		<?php

	}

	/**
	 * Save general setting options
	 */

	public function wkwcpos_setup_general_settings_wizard_save() {

		check_admin_referer( 'wkwcpos-setup' );

		$api_username           = isset( $_POST['wkwcpos_api_username'] ) ? wc_clean( wp_unslash( $_POST['wkwcpos_api_username'] ) ) : '';
		$api_password           = isset( $_POST['wkwcpos_api_password'] ) ? wc_clean( wp_unslash( $_POST['wkwcpos_api_password'] ) ) : '';
		$inventory_type         = isset( $_POST['_pos_inventory_type'] ) ? wc_clean( wp_unslash( $_POST['_pos_inventory_type'] ) ) : '';
		$product_default_status = isset( $_POST['_pos_product_default_status'] ) ? wc_clean( wp_unslash( $_POST['_pos_product_default_status'] ) ) : '';
		$unit_price_feature     = isset( $_POST['_pos_unit_price_feature'] ) ? wc_clean( wp_unslash( $_POST['_pos_unit_price_feature'] ) ) : '';
		$customer_mails         = isset( $_POST['_pos_mails_at_pos_end'] ) ? wc_clean( wp_unslash( $_POST['_pos_mails_at_pos_end'] ) ) : '';

		update_option( 'wkwcpos_api_username', $api_username );
		update_option( 'wkwcpos_api_password', $api_password );
		update_option( '_pos_inventory_type', $inventory_type );
		update_option( '_pos_product_default_status', $product_default_status );
		update_option( '_pos_unit_price_feature', $unit_price_feature );
		update_option( '_pos_mails_at_pos_end', $customer_mails );

		wp_safe_redirect( esc_url_raw( $this->get_next_step_link() ) );
		exit;

	}

	/**
	 * Initial "Web App Settings Setup" step.
	 * App name, short name, theme color, background color and media
	 */
	public function wkwcpos_setup_web_app_settings_wizard() {

		$pwa_name       = get_option( '_pos_pwa_name' );
		$pwa_shortname  = get_option( '_pos_pwa_shortname' );
		$pwa_themecolor = get_option( '_pos_pwa_themecolor' );
		$pwa_bgcolor    = get_option( '_pos_pwa_bgcolor' );

		?>
		<form method="post">
			<?php wp_nonce_field( 'wkwcpos-setup' ); ?>
			<p class="store-setup"><?php esc_html_e( 'The following wizard will help you configure your WooCommerce Point of Sale Web App and get you started quickly.', 'wc_pos' ); ?></p>

			<div>

				<label class="location-prompt" for="_pos_pwa_name"><?php esc_html_e( 'Name', 'wc_pos' ); ?></label>
				<input type="text" id="_pos_pwa_name" class="pos_wizard_input_css _pos_pwa_name location-input" name="_pos_pwa_name" value="<?php echo esc_attr( $pwa_name ); ?>" />

				<label class="location-prompt" for="_pos_pwa_shortname"><?php esc_html_e( 'Short Name', 'wc_pos' ); ?></label>
				<input type="text" id="_pos_pwa_shortname" class="pos_wizard_input_css _pos_pwa_shortname location-input" name="_pos_pwa_shortname" value="<?php echo esc_attr( $pwa_shortname ); ?>" />

				<div class="wkpos-theme-wrap">
					<div class="wkpos-theme">
						<label class="location-prompt" for="_pos_pwa_themecolor"><?php esc_html_e( 'Theme Color', 'wc_pos' ); ?></label>
						<input type="color" id="_pos_pwa_themecolor" class="pos_wizard_input_css _pos_pwa_themecolor location-input" name="_pos_pwa_themecolor" value="<?php echo esc_attr( $pwa_themecolor ); ?>" />
					</div>
					<div class="wkpos-theme">
						<label class="location-prompt" for="_pos_pwa_bgcolor"><?php esc_html_e( 'Background Color', 'wc_pos' ); ?></label>
						<input type="color" id="_pos_pwa_bgcolor" class="pos_wizard_input_css _pos_pwa_bgcolor location-input" name="_pos_pwa_bgcolor" value="<?php echo esc_attr( $pwa_bgcolor ); ?>" />
					</div>

				</div>

			</div>

			<p class="wc-setup-actions step">
				<button type="submit" class="pos-btm-primary button button-large button-next" value="<?php esc_attr_e( 'Next!', 'wc_pos' ); ?>" name="save_step"><?php esc_html_e( 'Next!', 'wc_pos' ); ?></button>
			</p>
		</form>
		<?php

	}

	/**
	 * Save web app setting options
	 */

	public function wkwcpos_setup_web_app_settings_wizard_save() {

		check_admin_referer( 'wkwcpos-setup' );

		$pwa_name       = isset( $_POST['_pos_pwa_name'] ) ? wc_clean( wp_unslash( $_POST['_pos_pwa_name'] ) ) : '';
		$pwa_shortname  = isset( $_POST['_pos_pwa_shortname'] ) ? wc_clean( wp_unslash( $_POST['_pos_pwa_shortname'] ) ) : '';
		$pwa_themecolor = isset( $_POST['_pos_pwa_themecolor'] ) ? wc_clean( wp_unslash( $_POST['_pos_pwa_themecolor'] ) ) : '';
		$pwa_bgcolor    = isset( $_POST['_pos_pwa_bgcolor'] ) ? wc_clean( wp_unslash( $_POST['_pos_pwa_bgcolor'] ) ) : '';

		update_option( '_pos_pwa_name', $pwa_name );
		update_option( '_pos_pwa_shortname', $pwa_shortname );
		update_option( '_pos_pwa_themecolor', $pwa_themecolor );
		update_option( '_pos_pwa_bgcolor', $pwa_bgcolor );

		wp_safe_redirect( esc_url_raw( $this->get_next_step_link() ) );
		exit;

	}

	/**
	 * Initial "Default Customer Settings Setup" step.
	 * New Customer default password and default customer details
	 */
	public function wkwcpos_setup_default_customer_settings_wizard() {

		$countries = apply_filters( 'get_countries_list', $_GET['page'] );

		$args = array(
			'meta_key'   => 'deault_customer_pos',
			'meta_value' => '1',
		);

		//Setting default values
		$fname        = '';
		$lname        = '';
		$company      = '';
		$postcode     = '';
		$address1     = '';
		$address2     = '';
		$billing_city = '';
		$country      = '';
		$phone        = '';
		$email        = '';
		$password     = '';

		$pos_customer = get_users( $args );
		if ( ! empty( $pos_customer ) ) {

			foreach ( $pos_customer as $customer ) {

				$id           = $customer->ID;
				$fname        = get_user_meta( $id, 'first_name', true );
				$lname        = get_user_meta( $id, 'last_name', true );
				$company      = get_user_meta( $id, 'billing_company', true );
				$postcode     = get_user_meta( $id, 'billing_postcode', true );
				$address1     = get_user_meta( $id, 'billing_address_1', true );
				$address2     = get_user_meta( $id, 'billing_address_2', true );
				$billing_city = get_user_meta( $id, 'billing_city', true );
				$country      = get_user_meta( $id, 'billing_country', true );
				$phone        = get_user_meta( $id, 'billing_phone', true );
				$email        = $customer->user_email;
				$password     = $customer->user_pass;
			}
		}

		?>
		<form method="post" class="wkwcpos-default-customer-setup">
			<?php wp_nonce_field( 'wkwcpos-setup' ); ?>
			<p class="store-setup"><?php esc_html_e( 'The following wizard will help you configure your WooCommerce Point of Sale Default Customer part and get you started quickly.', 'wc_pos' ); ?></p>

			<div>

				<h2><?php esc_html_e( 'Customer Details', 'wc_pos' ); ?></h2>

				<label class="location-prompt" for="_pos_defcustomer_fname"><?php esc_html_e( 'First Name', 'wc_pos' ); ?><strong>*</strong></label>
				<input type="text" id="_pos_defcustomer_fname" class="pos_wizard_input_css _pos_defcustomer_fname location-input" name="_pos_defcustomer_fname" value="<?php echo esc_attr( $fname ); ?>" />

				<label class="location-prompt" for="_pos_defcustomer_lname"><?php esc_html_e( 'Last Name', 'wc_pos' ); ?><strong>*</strong></label>
				<input type="text" id="_pos_defcustomer_lname" class="pos_wizard_input_css _pos_defcustomer_lname location-input" name="_pos_defcustomer_lname" value="<?php echo esc_attr( $lname ); ?>" />

				<label class="location-prompt" for="_pos_defcustomer_email"><?php esc_html_e( 'Email', 'wc_pos' ); ?><strong>*</strong></label>
				<input type="text" id="_pos_defcustomer_email" class="pos_wizard_input_css _pos_defcustomer_email location-input" name="_pos_defcustomer_email" value="<?php echo esc_attr( $email ); ?>" />

				<label class="location-prompt" for="_pos_defcustomer_password"><?php esc_html_e( 'Password', 'wc_pos' ); ?><strong>*</strong></label>
				<input type="text" id="_pos_defcustomer_password" class="pos_wizard_input_css _pos_defcustomer_password location-input" name="_pos_defcustomer_password" value="<?php echo ! empty( $password ) ? esc_attr( $password ) : wp_generate_password(); ?>" />

				<label class="location-prompt" for="_pos_defcustomer_telephone"><?php esc_html_e( 'Telephone', 'wc_pos' ); ?></label>
				<input type="text" id="_pos_defcustomer_telephone" class="pos_wizard_input_css _pos_defcustomer_telephone location-input" name="_pos_defcustomer_telephone" value="<?php echo esc_attr( $phone ); ?>" />

				<h2><?php esc_html_e( 'Customer Address', 'wc_pos' ); ?></h2>

				<label class="location-prompt" for="_pos_defcustomer_company"><?php esc_html_e( 'Company', 'wc_pos' ); ?></label>
				<input type="text" id="_pos_defcustomer_company" class="pos_wizard_input_css _pos_defcustomer_company location-input" name="_pos_defcustomer_company" value="<?php echo esc_attr( $company ); ?>" />

				<label class="location-prompt" for="_pos_defcustomer_address1"><?php esc_html_e( 'Address line 1', 'wc_pos' ); ?></label>
				<input type="text" id="_pos_defcustomer_address1" class="pos_wizard_input_css _pos_defcustomer_address1 location-input" name="_pos_defcustomer_address1" value="<?php echo esc_attr( $address1 ); ?>" />

				<label class="location-prompt" for="_pos_defcustomer_address2"><?php esc_html_e( 'Address line 2', 'wc_pos' ); ?></label>
				<input type="text" id="_pos_defcustomer_address2" class="pos_wizard_input_css _pos_defcustomer_address2 location-input" name="_pos_defcustomer_address2" value="<?php echo esc_attr( $address2 ); ?>" />

				<label class="location-prompt" for="_pos_defcustomer_city"><?php esc_html_e( 'City', 'wc_pos' ); ?></label>
				<input type="text" id="_pos_defcustomer_city" class="pos_wizard_input_css _pos_defcustomer_city location-input" name="_pos_defcustomer_city" value="<?php echo esc_attr( $billing_city ); ?>" />

				<label class="location-prompt" for="_pos_defcustomer_postcode"><?php esc_html_e( 'Postcode', 'wc_pos' ); ?></label>
				<input type="text" id="_pos_defcustomer_postcode" class="pos_wizard_input_css _pos_defcustomer_postcode location-input" name="_pos_defcustomer_postcode" value="<?php echo esc_attr( $postcode ); ?>" />

				<label for="_pos_store_country" class="location-prompt"><?php esc_html_e( 'Country', 'wc_pos' ); ?></label>
				<select id="_pos_store_country" name="_pos_store_country" required data-placeholder="<?php esc_attr_e( 'Country', 'wc_pos' ); ?>" aria-label="<?php esc_attr_e( 'Country', 'wc_pos' ); ?>" class="pos_wizard_input_css location-input wc-enhanced-select dropdown">

					<?php

					if ( ! empty( $countries ) ) {

						foreach ( $countries as $country_code => $country_name ) {
							?>
							<option value="<?php echo esc_attr( $country_code ); ?>" <?php echo selected( $country_code, $country ); ?>><?php echo esc_html( $country_name ); ?></option>
							<?php
						}
					}

					?>

				</select>

				<?php

				if ( ! empty( $pos_customer ) ) {

					?>

					<input type="hidden" name="default_customer_id" value="<?php echo esc_attr( $id ); ?>">

					<?php

				}

				?>

			</div>

			<p class="wc-setup-actions step">
				<button type="submit" class="pos-btm-primary button button-large button-next" value="<?php esc_attr_e( 'Next!', 'wc_pos' ); ?>" name="save_step"><?php esc_html_e( 'Next!', 'wc_pos' ); ?></button>
			</p>
		</form>
		<?php

	}

	/**
	 * Save default customer setting options
	 */

	public function wkwcpos_setup_default_customer_settings_wizard_save() {

		check_admin_referer( 'wkwcpos-setup' );

		$pwd      = strip_tags( $_POST['_pos_defcustomer_password'] );
		$fname    = strip_tags( $_POST['_pos_defcustomer_fname'] );
		$lname    = strip_tags( $_POST['_pos_defcustomer_lname'] );
		$email    = strip_tags( $_POST['_pos_defcustomer_email'] );
		$phone    = strip_tags( $_POST['_pos_defcustomer_telephone'] );
		$company  = strip_tags( $_POST['_pos_defcustomer_company'] );
		$addr1    = strip_tags( $_POST['_pos_defcustomer_address1'] );
		$addr2    = strip_tags( $_POST['_pos_defcustomer_address2'] );
		$city     = strip_tags( $_POST['_pos_defcustomer_city'] );
		$postcode = strip_tags( $_POST['_pos_defcustomer_postcode'] );
		$country  = strip_tags( $_POST['_pos_store_country'] );

		$error_code = 0;

		if ( empty( $email ) ) {
			$message    = __( 'Customer email is mandatory ', 'wc_pos' );
			$error_code = 1;
		}

		if ( ! filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
			$message    = __( 'Customer email is not valid ', 'wc_pos' );
			$error_code = 1;
		}

		if ( empty( $fname ) ) {
			$message    = __( 'Customer first name is mandatory.', 'wc_pos' );
			$error_code = 1;
		}

		if ( empty( $lname ) ) {
			$message    = __( 'Customer last Name is mandatory.', 'wc_pos' );
			$error_code = 1;
		}

		if ( empty( $pwd ) ) {
			$message    = __( 'Customer password is mandatory.', 'wc_pos' );
			$error_code = 1;
		}

		if ( empty( $phone ) ) {
			$message    = __( 'Customer Phone number is mandatory.', 'wc_pos' );
			$error_code = 1;
		}

		if ( ! empty( $phone ) && ( strlen( $phone ) < 9 || strlen( $phone ) > 12 ) ) {
			$message    = __( 'Please enter a valid phone number(Only number allowed).', 'wc_pos' );
			$error_code = 1;
		}

		if ( $error_code == 0 ) {

			if ( empty( $_POST['default_customer_id'] ) ) {

				if ( false == email_exists( $email ) ) {

					// Generate the password and create the user.
					$elm = explode( '@', $email );
					$elm = $elm[0];

					$user_id = wc_create_new_customer( $email, $elm, $pwd );

					// Set the nickname
					wp_update_user(
						array(
							'ID'         => $user_id,
							'nickname'   => $email,
							'first_name' => $fname,
							'last_name'  => $lname,
						)
					);

					update_user_meta( $user_id, 'billing_first_name', $fname );
					update_user_meta( $user_id, 'billing_last_name', $lname );
					update_user_meta( $user_id, 'billing_company', $company );
					update_user_meta( $user_id, 'billing_address_1', $addr1 );
					update_user_meta( $user_id, 'billing_address_2', $addr2 );
					update_user_meta( $user_id, 'billing_city', $city );
					update_user_meta( $user_id, 'billing_postcode', $postcode );
					update_user_meta( $user_id, 'billing_country', $country );
					update_user_meta( $user_id, 'billing_email', $email );
					update_user_meta( $user_id, 'billing_phone', $phone );
					update_user_meta( $user_id, 'deault_customer_pos', true );

					wp_mail( $email, _( 'Welcome! you are now new customer on our POS SYSTEM', 'Your Password: ', 'wc_pos' ) . $pwd, __( 'Account created successfully', 'wc_pos' ) );

				}
			} else {

				$user_id = $_POST['default_customer_id'];

				// Set the nickname
				wp_update_user(
					array(
						'ID'         => $user_id,
						'first_name' => $fname,
						'last_name'  => $lname,
						'user_email' => $email,
						'user_pass'  => $pwd,
					)
				);

				update_user_meta( $user_id, 'billing_first_name', $fname );
				update_user_meta( $user_id, 'billing_last_name', $lname );
				update_user_meta( $user_id, 'billing_company', $company );
				update_user_meta( $user_id, 'billing_address_1', $addr1 );
				update_user_meta( $user_id, 'billing_address_2', $addr2 );
				update_user_meta( $user_id, 'billing_city', $city );
				update_user_meta( $user_id, 'billing_postcode', $postcode );
				update_user_meta( $user_id, 'billing_country', $country );
				update_user_meta( $user_id, 'billing_email', $email );
				update_user_meta( $user_id, 'billing_phone', $phone );
				update_user_meta( $user_id, 'deault_customer_pos', true );

			}

			wp_safe_redirect( esc_url_raw( $this->get_next_step_link() ) );
			exit;

		} else {
			?>
			<div class='wkwcpos-wizard-setup-error'>
				<p><?php echo $message; ?></p>
			</div>
			<?php
		}

	}

	public function wkwcpos_setup_begin_wizard() {

		$docs_url  = 'https://webkul.com/blog/woocommerce-pos/';
		$help_text = sprintf(
			/* translators: %1$s: link to videos, %2$s: link to docs */
			__( 'Checkout our <a href="%1$s" target="_blank">User Guide</a> to learn more about WooCommerce Point of Sale.', 'wc_pos' ),
			esc_url( $docs_url )
		);

		?>
		<h1 style="text-align:center !important"><?php esc_html_e( "You're ready to start selling with WooCommerce Point of Sale!", 'wc_pos' ); ?></h1>

		<form method="post">

			<?php wp_nonce_field( 'wkwcpos-setup' ); ?>

			<p class="wc-setup-actions step">
				<button type="submit" class="pos-btn-primary button button-large button-next" value="<?php esc_attr_e( "Let's go!", 'wc_pos' ); ?>" name="save_step"><?php esc_html_e( "Let's go!", 'wc_pos' ); ?></button>
			</p>

		</form>

		<p class="next-steps-help-text"><?php echo wp_kses_post( $help_text ); ?></p>
		<?php

	}

	/**
	 * Generate random password.
	 *
	 * @param $length
	 *
	 * @return $password
	*/
	public function wkwcpos_generate_random_password( $length ) {

		if ( '' == get_option( 'wkwcpos_api_password' ) ) {
			$password = substr( str_shuffle( str_repeat( $x = 'fdfe012tswtrwerwe345etrte6789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil( $length / strlen( $x ) ) ) ), 1, $length );

			return $password;
		} else {
			$password = get_option( 'wkwcpos_api_password' );

			return $password;
		}
	}

	/**
	 * Redirect to begin steps.
	 */
	public function wkwcpos_setup_begin_wizard_save() {

		check_admin_referer( 'wkwcpos-setup' );

		wp_safe_redirect( esc_url_raw( $this->get_next_step_link() ) );
		exit;

	}

	/**
	 * Final step.
	 */
	public function wkwcpos_setup_ready() {
		// We've made it! Don't prompt the user to run the wizard again.
		\WC_Admin_Notices::remove_notice( 'wkwcpos-setup-install' );

		update_option( 'wkwcpos_setup_finished', true );

		$docs_url  = 'https://webkul.com/blog/woocommerce-pos/';
		$help_text = sprintf(
			/* translators: %1$s: link to videos, %2$s: link to docs */
			__( 'Checkout our <a href="%1$s" target="_blank">User Guide</a> to learn more about WooCommerce Point of Sale.', 'wc_pos' ),
			esc_url( $docs_url )
		);
		?>
		<h1 style="text-align:center !important"><?php esc_html_e( "You're ready to start selling with WooCommerce Point of Sale!", 'wc_pos' ); ?></h1>

		<ul class="wc-wizard-next-steps">
			<li class="wc-wizard-next-step-item">
				<div class="wc-wizard-next-step-description">
					<p class="next-step-heading"><?php esc_html_e( 'Next step', 'wc_pos' ); ?></p>
					<h3 class="next-step-description"><?php esc_html_e( 'Create some outlets', 'wc_pos' ); ?></h3>
					<p class="next-step-extra-info"><?php esc_html_e( "You're ready to add outlet to your store.", 'wc_pos' ); ?></p>
				</div>
				<div class="wc-wizard-next-step-action">
					<p class="wc-setup-actions step">
						<a class="button pos-btm-primary button-large" target="__blank" href="<?php echo esc_url( admin_url( 'admin.php?page=pos-outlets&action=add' ) ); ?>">
							<?php esc_html_e( 'Create a outlet', 'wc_pos' ); ?>
						</a>
					</p>
				</div>
			</li>
			<li class="wc-wizard-next-step-item">
				<div class="wc-wizard-next-step-description">
					<p class="next-step-heading"><?php esc_html_e( 'Have an existing POS?', 'wc_pos' ); ?></p>
					<h3 class="next-step-description"><?php esc_html_e( 'Import outlets', 'wc_pos' ); ?></h3>
					<p class="next-step-extra-info"><?php esc_html_e( 'Transfer existing outlets to your new store — just import a CSV file.', 'wc_pos' ); ?></p>
				</div>
				<div class="wc-wizard-next-step-action">
					<p class="wc-setup-actions step">
						<a class="button pos-btm-primary button-large" href="<?php echo esc_url( admin_url( 'admin.php?page=pos-outlets&action=outlet-import' ) ); ?>">
							<?php esc_html_e( 'Import outlets', 'wc_pos' ); ?>
						</a>
					</p>
				</div>
			</li>
			<li class="wc-wizard-additional-steps">
				<div class="wc-wizard-next-step-description">
					<p class="next-step-heading"><?php esc_html_e( 'You can also:', 'wc_pos' ); ?></p>
				</div>
				<div class="wc-wizard-next-step-action">
					<p class="wc-setup-actions step">
						<a class="button pos-btm-primary button-large" href="<?php echo esc_url( admin_url() ); ?>">
							<?php esc_html_e( 'Visit Dashboard', 'wc_pos' ); ?>
						</a>
						<a class="button button-large" href="<?php echo esc_url( admin_url( 'admin.php?page=wc-pos-settings' ) ); ?>">
							<?php esc_html_e( 'Review Settings', 'wc_pos' ); ?>
						</a>
					</p>
				</div>
			</li>
		</ul>
		<p class="next-steps-help-text"><?php echo wp_kses_post( $help_text ); ?></p>
		<?php
	}
}
