<?php
/**
 * @author Webkul
 *
 * @version 2.2.0
 * This file handles general settings template
 */

namespace WKWC_POS\Templates\Admin\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'WC_Pos_General_Settings' ) ) {
	/**
	 * General Settings Template.
	 */
	class WC_Pos_General_Settings {

		public function __construct() {
			$this->wk_wc_pos_get_general_settings_template();

			if ( isset( $_GET['settings-updated'] ) && $_GET['settings-updated'] == true ) {
				$this->wkwcpos_generate_new_manifest();
			}
		}

		public function wkwcpos_generate_new_manifest() {
			$form_url = 'admin.php?page=pos-system';

			require_once WK_WC_POS_PLUGIN_FILE . 'includes/class-wkwcpos-service-worker-activator.php';

			\WKWCPOS_Service_Worker_Activator::wkwcpos_generate_new_manifest_file( $form_url );
		}

		public function wk_wc_pos_get_general_settings_template() {
			settings_errors();

			$logo_invoice = get_option( '_pos_invoice_logo' );

			$icon48  = ! empty( get_option( '_pos_pwa_icon48' ) ) ? site_url( get_option( '_pos_pwa_icon48' ) ) : WK_WC_POS_API . 'assets/images/48.png';
			$icon96  = ! empty( get_option( '_pos_pwa_icon96' ) ) ? site_url( get_option( '_pos_pwa_icon96' ) ) : WK_WC_POS_API . 'assets/images/96.png';
			$icon144 = ! empty( get_option( '_pos_pwa_icon144' ) ) ? site_url( get_option( '_pos_pwa_icon144' ) ) : WK_WC_POS_API . 'assets/images/144.png';
			$icon196 = ! empty( get_option( '_pos_pwa_icon196' ) ) ? site_url( get_option( '_pos_pwa_icon196' ) ) : WK_WC_POS_API . 'assets/images/196.png'; ?>

			<div id="wrapper">

				<div id="dashboard_right_now" class="formcontainer pos pos-settings">

					<div class="inside">

						<div class="main">

							<form method="post" action="options.php">

								<?php settings_fields( 'pos-general-settings-group' ); ?>

								<?php do_settings_sections( 'pos-general-settings-group' ); ?>

								<h3><?php esc_html_e( 'General', 'wc_pos' ); ?></h3>

								<p><i><?php esc_html_e( 'If you wish to run the POS wizard then please click on the button', 'wc_pos' ); ?></i>&nbsp;&nbsp;<a href="<?php echo esc_url( admin_url( 'admin.php?page=wkwcpos-setup' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Setup wizard', 'wc_pos' ); ?></a></p>

								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => 'wkwcpos_api_username',
											'value'       => ! empty( get_option( 'wkwcpos_api_username' ) ) ? get_option( 'wkwcpos_api_username' ) : '',
											'label'       => __( 'API Username', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'This will be the username for the connection to the API. This can be anything just used to connect our POS API.', 'wc_pos' ),
											'type'        => 'text',
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => 'wkwcpos_api_password',
											'value'       => $this->wkwcpos_generate_random_password( 30 ),
											'label'       => __( 'API Password', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'This will be the password for the connection to the API. This can be anything just used to connect our POS API.', 'wc_pos' ),
											'type'        => 'text',
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => '_pos_heading_login',
											'value'       => ! empty( get_option( '_pos_heading_login' ) ) ? get_option( '_pos_heading_login' ) : '',
											'label'       => __( 'POS Heading Login', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'This will be the primary heading on the login page.', 'wc_pos' ),
											'type'        => 'text',
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => '_pos_footer_brand_name',
											'value'       => ! empty( get_option( '_pos_footer_brand_name' ) ) ? get_option( '_pos_footer_brand_name' ) : '',
											'label'       => __( 'Brand name for footer section', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'This will be the brand name on login page in footer section.', 'wc_pos' ),
											'type'        => 'text',
										)
									);
									?>

								</div>
								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => '_pos_footer_brand_link',
											'value'       => ! empty( get_option( '_pos_footer_brand_link' ) ) ? get_option( '_pos_footer_brand_link' ) : '',
											'label'       => __( 'Brand Link for footer section', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'This will be the brand name link on login page in footer section.', 'wc_pos' ),
											'type'        => 'url',
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_select(
										array(
											'id'          => '_pos_inventory_type',
											'value'       => ! empty( get_option( '_pos_inventory_type' ) ) ? get_option( '_pos_inventory_type' ) : '',
											'label'       => __( 'Select Inventory Type', 'wc_pos' ),
											'options'     => array(
												'centralized_stock' => __( 'Centralized Stock Inventory', 'wc_pos' ),
												'master_stock' => __( 'Master Stock Inventory', 'wc_pos' ),
											),
											'desc_tip'    => true,
											'description' => __( 'This is a inventory type which you want for your system.', 'wc_pos' ),
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_select(
										array(
											'id'          => '_pos_product_default_status',
											'value'       => ! empty( get_option( '_pos_product_default_status' ) ) ? get_option( '_pos_product_default_status' ) : '',
											'label'       => __( 'Default Product Status for Outlet', 'wc_pos' ),
											'options'     => array(
												'enabled'  => __( 'Enabled', 'wc_pos' ),
												'disabled' => __( 'Disabled', 'wc_pos' ),
											),
											'desc_tip'    => true,
											'description' => __( 'By enabling this feature, all new created products will be enabled by default in all outlets', 'wc_pos' ),
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_select(
										array(
											'id'          => '_pos_unit_price_feature',
											'value'       => ! empty( get_option( '_pos_unit_price_feature' ) ) ? get_option( '_pos_unit_price_feature' ) : '',
											'label'       => __( 'Enable Unit Price Feature', 'wc_pos' ),
											'options'     => array(
												'enabled'  => __( 'Enabled', 'wc_pos' ),
												'disabled' => __( 'Disabled', 'wc_pos' ),
											),
											'desc_tip'    => true,
											'description' => __( 'By enabling this feature, product if having weight, will be sold according to its weight in outlets.', 'wc_pos' ),
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_select(
										array(
											'id'          => '_pos_mails_at_pos_end',
											'value'       => ! empty( get_option( '_pos_mails_at_pos_end' ) ) ? get_option( '_pos_mails_at_pos_end' ) : '',
											'label'       => __( 'Enable Mails at POS end', 'wc_pos' ),
											'options'     => array(
												'enabled'  => __( 'Enabled', 'wc_pos' ),
												'disabled' => __( 'Disabled', 'wc_pos' ),
											),
											'desc_tip'    => true,
											'description' => __( 'If you disable this option then customers and admin will not receive any mails after placing an order at POS end.', 'wc_pos' ),
										)
									);
									?>

								</div>

								<?php do_action( 'pos_manage_general_settings_custom_fields', $_GET['page'] ); ?>

								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => '_pos_low_stock_warn',
											'value'       => ! empty( get_option( '_pos_low_stock_warn' ) ) ? get_option( '_pos_low_stock_warn' ) : '',
											'label'       => __( 'Quantity For Low Stock Warning', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'This will be the maximum quantity for products to show the low stock warnings.', 'wc_pos' ),
											'type'        => 'number',
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => '_define_difference_after_absolute',
											'value'       => ! empty( get_option( '_define_difference_after_absolute' ) ) ? get_option( '_define_difference_after_absolute' ) : '5',
											'label'       => __( 'Amount you want to increase after roundoff', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'Amount you want to increase after roundoff in POS payment custom Option.', 'wc_pos' ),
											'type'        => 'number',
										)
									);
									?>

								</div>
								<div class="options_group">
									<?php
									wkwcpos_select(
										array(
											'id'          => '_pos_auto_sync_offline_orders',
											'value'       => ! empty( get_option( '_pos_auto_sync_offline_orders' ) ) ? get_option( '_pos_auto_sync_offline_orders' ) : '',
											'label'       => __( 'Auto Sync Offline Orders', 'wc_pos' ),
											'options'     => array(
												'enable'  => __( 'Enable', 'wc_pos' ),
												'disable' => __( 'Disable', 'wc_pos' ),
											),
											'desc_tip'    => true,
											'description' => __( 'Offline orders will sync automatically when you will create any order online', 'wc_pos' ),
										)
									);
									?>
								</div>
								<div class="options_group">
									<?php
									wkwcpos_select(
										array(
											'id'          => '_pos_barcode_print_page_preview',
											'value'       => ! empty( get_option( '_pos_barcode_print_page_preview' ) ) ? get_option( '_pos_barcode_print_page_preview' ) : '',
											'label'       => __( 'Barcode Print Preview', 'wc_pos' ),
											'options'     => array(
												'portrait' => __( 'Portrait', 'wc_pos' ),
												'landscape' => __( 'Landscape', 'wc_pos' ),
											),
											'desc_tip'    => true,
											'description' => __( 'Barcode Print preview will appear in this page format', 'wc_pos' ),
										)
									);
									?>
								</div>
								<div class="options_group">
									<?php
									wkwcpos_select(
										array(
											'id'          => '_pos_logo_to_pos_screen',
											'value'       => ! empty( get_option( '_pos_logo_to_pos_screen' ) ) ? get_option( '_pos_logo_to_pos_screen' ) : '',
											'label'       => __( 'Enable POS Logo to POS screen header', 'wc_pos' ),
											'options'     => array(
												'disabled' => __( 'Disabled', 'wc_pos' ),
												'enabled'  => __( 'Enabled', 'wc_pos' ),
											),
											'desc_tip'    => true,
											'description' => __( 'If you disable this option then POS screen will show only web username.', 'wc_pos' ),
										)
									);
									?>
								</div>


								<label>
									<?php echo __( 'Invoice Logo', 'wc_pos' ); ?>
								</label>

								<?php
								$dir = wp_upload_dir();
								if ( ! empty( $logo_invoice ) ) {
									?>
									<img src="<?php echo $dir['baseurl'] . $logo_invoice; ?>" alt='<?php esc_attr_e( 'Invoice Logo', 'wc_pos' ); ?>' class="logo-url" width="150">
									<?php
								} else {
									?>
									<img src="<?php echo WK_WC_POS_API . '/assets/images/17241-200.png'; ?>" alt='<?php esc_attr_e( 'Invoice Logo', 'wc_pos' ); ?>' class="logo-url" width="150">
									<?php
								}

								wkwcpos_text_input(
									array(
										'id'    => '_pos_invoice_logo',
										'value' => $logo_invoice,
										'label' => '',
										'type'  => 'hidden',
									)
								);
			?>

								<div class="options_group">

									<?php

									wkwcpos_text_input(
										array(
											'id'          => '_pos_upload_logo',
											'value'       => 'Upload',
											'label'       => __( 'Upload', 'wc_pos' ),
											'desc_tip'    => true,
											'type'        => 'button',
											'description' => __( 'POS invoice logo.', 'wc_pos' ),
											'class'       => 'page-title-action',
										)
									);
									?>

								</div>

								<?php do_action( 'wkwcpos_after_manage_general_setting_form_fields' ); ?>

								<hr>

								<h3><?php esc_html_e( 'Web APP Settings', 'wc_pos' ); ?></h3>

								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => '_pos_pwa_name',
											'value'       => ! empty( get_option( '_pos_pwa_name' ) ) ? get_option( '_pos_pwa_name' ) : '',
											'label'       => __( 'Name', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'This will be the name for POS Progressive Web App.', 'wc_pos' ),
											'type'        => 'text',
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => '_pos_pwa_shortname',
											'value'       => ! empty( get_option( '_pos_pwa_shortname' ) ) ? get_option( '_pos_pwa_shortname' ) : '',
											'label'       => __( 'Short Name', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'This will be the short name for POS Progressive Web App.', 'wc_pos' ),
											'type'        => 'text',
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => '_pos_pwa_themecolor',
											'value'       => ! empty( get_option( '_pos_pwa_themecolor' ) ) ? get_option( '_pos_pwa_themecolor' ) : '',
											'label'       => __( 'Theme Color', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'This will be the theme color for POS Progressive Web App.', 'wc_pos' ),
											'type'        => 'color',
										)
									);
									?>

								</div>

								<div class="options_group">

									<?php
									wkwcpos_text_input(
										array(
											'id'          => '_pos_pwa_bgcolor',
											'value'       => ! empty( get_option( '_pos_pwa_bgcolor' ) ) ? get_option( '_pos_pwa_bgcolor' ) : '',
											'label'       => __( 'Background Color', 'wc_pos' ),
											'desc_tip'    => true,
											'description' => __( 'This will be the background color for POS Progressive Web App.', 'wc_pos' ),
											'type'        => 'color',
										)
									);
									?>

								</div>

								<?php do_action( 'wkwcpos_manage_web_app_setting_form_fields', $_GET['page'] ); ?>

								<hr>

								<h3><?php esc_html_e( 'Media', 'wc_pos' ); ?></h3>

								<table class="form-table media-settings-table">

									<tbody>

										<tr valign="top">
											<th scope="row" class="titledesc">
												<label for="pos-pwa-icon48"><?php esc_html_e( 'App Icon (48x48)', 'wc_pos' ); ?></label>
											</th>

											<td>
												<img src="<?php echo esc_url( $icon48 ); ?>" alt='icon' class="image-url" width="48">
												<input type="hidden" id="pos-pwa-icon48" name="_pos_pwa_icon48" value="<?php echo esc_attr( ! empty( get_option( '_pos_pwa_icon48' ) ) ? get_option( '_pos_pwa_icon48' ) : '' ); ?>" /><br /><br />
												<button data-id="pos-pwa-icon48" class="button-primary icon-uploader" /><?php esc_html_e( 'Upload Icon', 'wc_pos' ); ?></button>
											</td>
										</tr>

										<tr valign="top">
											<th scope="row" class="titledesc">
												<label for="pos-pwa-icon96"><?php esc_html_e( 'App Icon (96x96)', 'wc_pos' ); ?></label>
											</th>

											<td>
												<img src="<?php echo esc_url( $icon96 ); ?>" alt='icon' class="image-url" width="96">
												<input type="hidden" id="pos-pwa-icon96" name="_pos_pwa_icon96" value="<?php echo esc_attr( ! empty( get_option( '_pos_pwa_icon96' ) ) ? get_option( '_pos_pwa_icon96' ) : '' ); ?>" /><br /><br />
												<button data-id="pos-pwa-icon96" class="button-primary icon-uploader" /><?php esc_html_e( 'Upload Icon', 'wc_pos' ); ?></button>

											</td>
										</tr>

										<tr valign="top">
											<th scope="row" class="titledesc">
												<label for="pos-pwa-icon144"><?php esc_html_e( 'App Icon (144x144)', 'wc_pos' ); ?></label>
											</th>

											<td>
												<img src="<?php echo esc_url( $icon144 ); ?>" alt='icon' class="image-url" width="144">
												<input type="hidden" id="pos-pwa-icon144" name="_pos_pwa_icon144" value="<?php echo esc_attr( ! empty( get_option( '_pos_pwa_icon144' ) ) ? get_option( '_pos_pwa_icon144' ) : '' ); ?>" /><br /><br />
												<button data-id="pos-pwa-icon144" class="button-primary icon-uploader" /><?php esc_html_e( 'Upload Icon', 'wc_pos' ); ?></button>

											</td>
										</tr>

										<tr valign="top">
											<th scope="row" class="titledesc">
												<label for="pos-pwa-icon196"><?php echo esc_html__( 'App Icon (196x196)', 'wc_pos' ); ?></label>
											</th>

											<td>
												<img src="<?php echo esc_url( $icon196 ); ?>" alt='icon' class="image-url" width="196">

												<input type="hidden" id="pos-pwa-icon196" name="_pos_pwa_icon196" value="<?php echo esc_attr( ! empty( get_option( '_pos_pwa_icon196' ) ) ? get_option( '_pos_pwa_icon196' ) : '' ); ?>" /><br /><br />
												<button data-id="pos-pwa-icon196" class="button-primary icon-uploader" /><?php esc_html_e( 'Upload Icon', 'wc_pos' ); ?></button>

											</td>
										</tr>

										<?php do_action( 'wkwcpos_manage_media_setting_form_fields', $_GET['page'] ); ?>

									</tbody>
								</table>
								<!-- <button type="submit" class="pos_button_css"> <?php echo __( 'Save General', 'wc_pos' ); ?> </button> -->
								<?php submit_button( __( 'Save General', 'wc_pos' ) ); ?>

							</form>

						</div>

					</div>

				</div>

			</div>

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
	}
}
