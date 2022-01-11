<?php

namespace WKWC_POS\Templates\Admin\Outlet;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Add_Outlet' ) ) {
	class WC_Pos_Add_Outlet {

		public function __construct() {
			$this->wk_wc_pos_get_add_outlet_template();
		}

		public function wk_wc_pos_get_add_outlet_template() {
			if ( isset( $_POST['save-outlet'] ) || isset( $_POST['update-outlet'] ) ) {
				if ( ! isset( $_POST['pos_outlet_nonce_field'] ) || ! wp_verify_nonce( $_POST['pos_outlet_nonce_field'], 'pos_outlet_action' ) ) {
					echo __( 'Sorry, your nonce did not verify.', 'wc_pos' );
					exit;
				} else {
					do_action( 'woocommerce_manage_pos_outlet', $_POST );
				}
			}

			$countries = apply_filters( 'get_countries_list', $_GET['page'] );

			$outlet_id = $pos_outlet_status = '';

			$res_out = '';

			global $wpdb;

			$arr          = $wpdb->get_results( "SELECT id, payment_name FROM {$wpdb->prefix}woocommerce_pos_payments WHERE payment_status=1" );
			$payment_list = array();
			foreach ( $arr as $list ) {
				$payment_list[ $list->id ] = $list->payment_name;
			}

			$arr          = $wpdb->get_results( "SELECT id, name FROM {$wpdb->prefix}woocommerce_pos_invoice_templates" );
			$invoice_list = array(
				'' => esc_html__( 'Select invoice template', 'wc_pos' ),
			);
			foreach ( $arr as $list ) {
				$invoice_list[ $list->id ] = $list->name;
			}

			$assigned         = array();
			$assigned_invoice = '';

			if ( isset( $_GET['outlet_id'] ) && ! empty( intval( $_GET['outlet_id'] ) ) && isset( $_GET['outlet_action'] ) && $_GET['outlet_action'] == 'edit' ) {

				$table_name = $wpdb->prefix . 'woocommerce_pos_outlets';

				$res_out = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table_name WHERE id=%d", $_GET['outlet_id'] ) );

				if ( $res_out ) {
					$pos_outlet_name     = $res_out->outlet_name;
					$pos_outlet_status   = $res_out->outlet_status;
					$pos_outlet_addr     = $res_out->outlet_address;
					$pos_outlet_city     = $res_out->outlet_city;
					$pos_outlet_state    = $res_out->outlet_state;
					$pos_outlet_postcode = $res_out->outlet_postcode;
					$pos_outlet_country  = $res_out->outlet_country;
					$assigned            = ! empty( $res_out->outlet_payment ) ? maybe_unserialize( $res_out->outlet_payment ) : array();
					$assigned_invoice    = ! empty( $res_out->outlet_invoice ) ? $res_out->outlet_invoice : '';
				}
			}

			$outlet_status = apply_filters( 'pos_outlet_status', $outlet_id ); ?>
		<h2 class="hndle ui-sortable-handle"><span><?php _e( 'Add outlet for POS user', 'wc_pos' ); ?></span></h2>

		<div id="wrapper">

		  <div id="dashboard_right_now" class="formcontainer pos pos-settings">

			<form action="" method="post">

			  <?php wp_nonce_field( 'pos_outlet_action', 'pos_outlet_nonce_field' ); ?>

			  <div class="inside">

				<div class="main">

				  <div class="pos-wrap">
					<?php
					wkwcpos_text_input(
						array(
							'id'          => '_pos_outlet_name',
							'value'       => ! empty( $pos_outlet_name ) ? $pos_outlet_name : '',
							'label'       => __( 'Outlet Name', 'wc_pos' ),
							'desc_tip'    => true,
							'description' => __( 'Enter POS Outlet Name.', 'wc_pos' ),
						)
					);
					?>
				  </div>

				  <?php isset( $_GET['outlet_id'] ) ? do_action( 'pos_manage_outlets_custom_fields', $_GET['outlet_id'] ) : do_action( 'pos_manage_outlets_custom_fields', '' ); ?>

				  <div class="options_group">

					<?php
					wkwcpos_text_input(
						array(
							'id'          => '_pos_outlet_addr',
							'value'       => ! empty( $pos_outlet_addr ) ? $pos_outlet_addr : '',
							'label'       => __( 'Outlet Address', 'wc_pos' ),
							'desc_tip'    => true,
							'description' => __( 'POS Outlet Address.', 'wc_pos' ),
							'type'        => 'text',
						)
					);
					?>

				  </div>

				  <div class="options_group">

					<?php

					wkwcpos_select(
						array(
							'id'          => '_pos_outlet_status',
							'label'       => __( 'Select Status', 'wc_pos' ),
							'value'       => $pos_outlet_status,
							'options'     => $outlet_status,
							'desc_tip'    => true,
							'description' => __( 'Select Status for the pos outlet.', 'wc_pos' ),
						)
					);
					?>

				  </div>

				  <div class="options_group">

					<?php
					wkwcpos_text_input(
						array(
							'id'          => '_pos_outlet_city',
							'value'       => ! empty( $pos_outlet_city ) ? $pos_outlet_city : '',
							'label'       => __( 'Outlet City', 'wc_pos' ),
							'desc_tip'    => true,
							'description' => __( 'Enter POS Outlet City.', 'wc_pos' ),
						)
					);
					?>

				  </div>

				  <div class="options_group">

					<?php
					wkwcpos_text_input(
						array(
							'id'          => '_pos_outlet_state',
							'value'       => ! empty( $pos_outlet_state ) ? $pos_outlet_state : '',
							'label'       => __( 'Outlet State', 'wc_pos' ),
							'desc_tip'    => true,
							'description' => __( 'Enter POS Outlet State.', 'wc_pos' ),
						)
					);
					?>

				  </div>

				  <div class="options_group">

					<?php

					wkwcpos_text_input(
						array(
							'id'          => '_pos_outlet_postcode',
							'value'       => ! empty( $pos_outlet_postcode ) ? $pos_outlet_postcode : '',
							'label'       => __( 'Outlet Postcode', 'wc_pos' ),
							'desc_tip'    => true,
							'description' => __( 'Enter POS Postcode.', 'wc_pos' ),
						)
					);
					?>

				  </div>
				  <div class="options_group">

					<?php
					wkwcpos_select(
						array(
							'id'          => '_pos_outlet_country',
							'value'       => ! empty( $pos_outlet_country ) ? $pos_outlet_country : '',
							'label'       => __( 'Outlet Country', 'wc_pos' ),
							'options'     => $countries,
							'desc_tip'    => true,
							'description' => __( 'Display country list.', 'wc_pos' ),
						)
					);
					?>

				  </div>

				  <div class="options_group">

										<?php

										wkwcpos_select(
											array(
												'id'       => '_pos_outlet_payment',
												'name'     => '_pos_outlet_payment[]',
												'label'    => __( 'Additional Payment Option', 'wc_pos' ),
												'value'    => $assigned,
												'options'  => $payment_list,
												'desc_tip' => true,
												'custom_attributes' => array( 'multiple' => true ),
												'description' => __( 'Select Additional Payment Option here for outlets.', 'wc_pos' ),
											)
										);
										?>

									</div>

				  <div class="options_group">

										<?php

										wkwcpos_select(
											array(
												'id'       => '_pos_outlet_invoice',
												'name'     => '_pos_outlet_invoice',
												'label'    => __( 'Select Invoice Template', 'wc_pos' ),
												'value'    => $assigned_invoice,
												'options'  => $invoice_list,
												'desc_tip' => true,
												'description' => __( 'Select invoice template for the current outlet.', 'wc_pos' ),
											)
										);
										?>

									</div>

				  <?php do_action( 'wkwcpos_manage_outlet_form_fields', $res_out ); ?>

				</div>

			  </div>

			  <div class="submitter">

				<?php

				if ( isset( $_GET['outlet_id'] ) && ! empty( $_GET['outlet_id'] ) ) :

					?>

				  <input type="hidden" name="_pos_outlet_id" value="<?php echo $_GET['outlet_id']; ?>">

				  <button type="submit" name="update-outlet" class="button button-primary"><?php esc_html_e( 'Update Outlet', 'wc_pos' ); ?></button>

					<?php do_action( 'pos_update_inventory_by_barcode' ); ?>

					<?php add_thickbox(); ?>

				<?php else : ?>

				  <button type="submit" name="save-outlet" class="button button-primary"><?php esc_html_e( 'Save Outlet', 'wc_pos' ); ?></button>

				<?php endif; ?>

			  </div>

			</form>

		  </div>

			<?php
		}
	}
}
