<?php

namespace WKWC_POS\Templates\Admin\User;

use WKWC_POS\Helper;

/**
*
* This file handles addition of new pos user.
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Add_User' ) ) {

	/**
	*
	*/
	class WC_Pos_Add_User extends Helper\User\WC_Pos_User_Helper {

		function __construct() {

			$this->verify_nonce();

			$this->wk_wc_pos_get_add_user_template();

		}

		public function wk_wc_pos_get_add_user_template() {

			$pos_user = '';
			$status   = 0;
			$pic      = WK_WC_POS_API . '/assets/images/17241-200.png';

			$short_pic = '';

			$pos_outlet = '';

			if ( ! empty( $_GET['pos_user'] ) && isset( $_GET['action'] ) && $_GET['action'] == 'edit' ) {

				global $wpdb;

				$table_name_map = $wpdb->prefix . 'woocommerce_pos_outlet_map';

				$pos_user_det = get_userdata( $_GET['pos_user'] );

				if ( ! empty( $pos_user_det ) ) {

					$short_pic = get_user_meta( $pos_user_det->ID, 'shr_pic', true );

					if ( ! empty( $short_pic ) ) {
						$pic = wp_upload_dir()['baseurl'] . $short_pic;
					}
					$psd            = $pos_user_det->user_pass;
					$pos_username   = $pos_user_det->user_nicename;
					$pos_user_email = $pos_user_det->user_email;
					$pos_user_fname = $pos_user_det->user_firstname;
					$pos_user_lname = $pos_user_det->user_lastname;
					$status         = $pos_user_det->user_status;

					$outlet_id = $this->_get_pos_user_outlet( $_GET['pos_user'] );

					if ( ! empty( $outlet_id ) ) {

						$pos_outlet = $outlet_id;
					}
				}
			}

			$status_list = apply_filters( 'pos_user_status', $pos_user );

			$pos_outlet_list = apply_filters( 'pos_outlet_list', $pos_user );

			if ( isset( $_POST['pos_user'] ) ) {

				$pos_username = isset( $_POST['_pos_username'] ) ? $_POST['_pos_username'] : '';

			}

			if ( isset( $_POST['_pos_outlet'] ) ) {

				$pos_outlet = isset( $_POST['_pos_outlet'] ) ? $_POST['_pos_outlet'] : '';

			}

			if ( isset( $_POST['_pos_user_fname'] ) ) {

				$pos_user_fname = isset( $_POST['_pos_user_fname'] ) ? $_POST['_pos_user_fname'] : '';

			}

			if ( isset( $_POST['_pos_user_lname'] ) ) {

				$pos_user_lname = isset( $_POST['_pos_user_lname'] ) ? $_POST['_pos_user_lname'] : '';

			}

			if ( isset( $_POST['_pos_user_email'] ) ) {

				$pos_user_email = isset( $_POST['_pos_user_email'] ) ? $_POST['_pos_user_email'] : '';

			}

			if ( isset( $_POST['_pos_status'] ) ) {

				$status = isset( $_POST['_pos_status'] ) ? $_POST['_pos_status'] : '';

			}

			?>

			<div class="wrap">

				<h2 class="hndle ui-sortable-handle"><span>
				<?php
				if ( 'add' == $_GET['action'] ) {
					 echo __( 'Add POS USER', 'wc_pos' );
				} else {

					echo __( 'Edit POS USER', 'wc_pos' );
				}
				?>
				</span></h2>

				<div id="wrapper">

					<div id="dashboard_right_now" class="formcontainer pos pos-settings">

						<form action="" method="post">

							<?php wp_nonce_field( 'pos_action', 'pos_nonce_field' ); ?>

							<div class="inside">

								<div class="main">

									<div class="pos-wrap">
										<?php

										if ( isset( $_GET['pos_user'] ) && ! empty( intval( $_GET['pos_user'] ) ) ) {

											?>

											<label for="_pos_username"><?php echo __( 'User Name', 'wc_pos' ); ?></label>
											<h3 class="pos_input_css disabled"><?php echo $pos_username; ?></h3>

											<?php

										} else {

											wkwcpos_text_input(
												array(
													'id' => '_pos_username',
													'value' => ! empty( $pos_username ) ? $pos_username : '',
													'label' => __( 'User Name', 'wc_pos' ),
													'desc_tip' => true,
													'description' => __( 'Enter User Name.', 'wc_pos' ),
												)
											);
										}

										?>
									</div>

									<div class="options_group">

										<?php
										wkwcpos_select(
											array(
												'id'       => '_pos_outlet',
												'value'    => $pos_outlet,
												'label'    => __( 'Select Outlet', 'wc_pos' ),
												'options'  => $pos_outlet_list,
												'desc_tip' => true,
												'description' => __( 'Select Outlet for the pos user.', 'wc_pos' ),
											)
										);
										?>

									</div>

									<div class="options_group">

										<?php
										wkwcpos_text_input(
											array(
												'id'       => '_pos_user_fname',
												'value'    => ! empty( $pos_user_fname ) ? $pos_user_fname : '',
												'label'    => __( 'First Name', 'wc_pos' ),
												'desc_tip' => true,
												'description' => __( 'POS User First Name.', 'wc_pos' ),
												'type'     => 'text',
											)
										);
										?>

									</div>

									<div class="options_group">
										<?php
										wkwcpos_text_input(
											array(
												'id'       => '_pos_user_lname',
												'value'    => ! empty( $pos_user_lname ) ? $pos_user_lname : '',
												'label'    => __( 'Last Name', 'wc_pos' ),
												'desc_tip' => true,
												'description' => __( 'POS User Last Name.', 'wc_pos' ),
												'type'     => 'text',
											)
										);
										?>
									</div>


									<div class="options_group">

										<?php

										wkwcpos_text_input(
											array(
												'id'       => '_pos_user_email',
												'value'    => ! empty( $pos_user_email ) ? $pos_user_email : '',
												'label'    => __( 'Email', 'wc_pos' ),
												'desc_tip' => true,
												'description' => __( 'POS User Email Address.', 'wc_pos' ),
											)
										);

										?>

									</div>

									<label><?php echo __( 'Your Pic', 'wc_pos' ); ?></label>

									<img src="<?php echo $pic; ?>" alt='profile pic' class="image-url" width="150">

									<?php

									wkwcpos_text_input(
										array(
											'id'    => '_pos_user_pic_val',
											'value' => $short_pic,
											'label' => '',
											'type'  => 'hidden',
										)
									);

									?>

									<div class="options_group">

										<?php

										wkwcpos_text_input(
											array(
												'id'       => '_pos_user_pic',
												'value'    => 'Profile Pic',
												'label'    => __( 'Upload', 'wc_pos' ),
												'desc_tip' => true,
												'type'     => 'button',
												'description' => __( 'POS User Profile Pic.', 'wc_pos' ),
												'class'    => 'page-title-action',
											)
										);

										?>

									</div>

									<div class="options_group">

										<?php
										if ( empty( $psd ) ) {
											wkwcpos_text_input(
												array(
													'id'   => '_pos_user_password',
													'value' => ! empty( $psd ) ? $psd : wp_generate_password(),
													'label' => __( 'Password', 'wc_pos' ),
													'desc_tip' => true,
													'type' => 'text',
													'description' => __( 'POS User Password Auto Generated.', 'wc_pos' ),
												)
											);
										}

										?>

									</div>

									<div class="options_group">

										<?php

										wkwcpos_select(
											array(
												'id'       => '_pos_status',
												'label'    => __( 'Status', 'wc_pos' ),
												'value'    => $status,
												'options'  => $status_list,
												'desc_tip' => true,
												'description' => __( 'Select Status for the pos user.', 'wc_pos' ),
											)
										);
										?>

									</div>

									<?php do_action( 'wkwcpos_manage_user_form_fields' ); ?>

								</div>

							</div>

							<div class="submitter">

								<?php

								if ( isset( $_GET['pos_user'] ) && ! empty( $_GET['pos_user'] ) ) :

									?>

								<input type="hidden" name="_pos_user" value="<?php echo $_GET['pos_user']; ?>">

								<button type="submit" name="update-user" class="button button-primary"><?php echo __( 'Update User', 'wc_pos' ); ?></button>

							<?php else : ?>

								<button type="submit" name="save-user" class="button button-primary"><?php echo __( 'Save User', 'wc_pos' ); ?></button>

							<?php endif; ?>

						</div>

					</form>

				</div>
				</div>

				<script>
					jQuery("#_dd_products").select2();
				</script>

			</div>
			<?php

		}

		public function verify_nonce() {

			if ( isset( $_POST['save-user'] ) || isset( $_POST['update-user'] ) ) {

				if ( ! isset( $_POST['pos_nonce_field'] ) || ! wp_verify_nonce( $_POST['pos_nonce_field'], 'pos_action' ) ) {

					print __( 'Sorry, your nonce did not verify.', 'wc_pos' );
					exit;

				} else {

					do_action( 'woocommerce_manage_pos_user', $_POST );

				}
			}

		}

	}

}
