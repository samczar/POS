<?php
/**
 * @author Webkul
 *
 * @version 2.1.0
 * This file handles all admin end actions.
 */

namespace WKWC_POS\Includes\Filters;

use WC_Countries;
use WKWC_POS\Templates\Front\WC_Pos_Login;
use WKWC_POS\Inc\WC_Pos_Errors;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Filter_Callbacks' ) ) {
	class WC_Pos_Filter_Callbacks extends WC_Pos_Errors {

		protected $wpdb;

		public function __construct() {
			global $wpdb;

			$this->wpdb = $wpdb;
		}

		public function wk_wc_get_pos_countries_list() {

			$countries_obj = new WC_Countries();
			$countries     = $countries_obj->__get( 'countries' );

			return $countries;
		}

		public function wk_wc_get_pos_outlet_list( $outlet_id ) {
			$outlet_arr = array();

			$table_name  = $this->wpdb->prefix . 'woocommerce_pos_outlets';
			$table_name2 = $this->wpdb->prefix . 'woocommerce_pos_outlet_map';

			if ( ! empty( $outlet_id ) ) {
				$res_out = $this->wpdb->get_row( "SELECT id,outlet_name from $table_name where outlet_status=0 and id=" . $outlet_id );

				if ( ! empty( $res_out ) ) {
					$outlet_arr[ $res_out->id ] = $res_out->outlet_name;
				}
			} else {
				$res_out = $this->wpdb->get_results( "select id,outlet_name from $table_name  where outlet_status=0" );

				if ( isset( $_GET['pos_user'] ) && ! empty( $_GET['pos_user'] ) ) {
					$pos_user = $_GET['pos_user'];

					$mapped_outlet = $this->wpdb->get_results( "select outlet_id from $table_name2 WHERE user_id =$pos_user OR user_id = '0' ", ARRAY_A );
				} else {
					$mapped_outlet = $this->wpdb->get_results( "select outlet_id from $table_name2  WHERE user_id = '0'", ARRAY_A );
				}

				if ( ! empty( $mapped_outlet ) ) {
					foreach ( $mapped_outlet as $key => $value ) {
						$mapped_outlet[ $key ] = $value['outlet_id'];
					}
				}

				// if (!empty($res_out)) {
				//     $outlet_arr[-1] = 'Select';

				//     foreach ($res_out as $res) :

				//         if (in_array($res->id, $mapped_outlet)) {
				//             $outlet_arr[$res->id] = $res->outlet_name;
				//         }

				//     endforeach;
				// }

				if ( ! empty( $res_out ) ) {
					$outlet_arr[-1] = 'Select';

					foreach ( $res_out as $res ) {
						$outlet_arr[ $res->id ] = $res->outlet_name;
					}
				}
			}

			return $outlet_arr;
		}

		public function wk_wc_save_pos_payment( $post ) {

			global $wpdb;
			$error_obj               = new WC_Pos_Errors();
			$pos_payment_name        = isset( $post['_pos_payment_name'] ) && ! empty( $post['_pos_payment_name'] ) ? $post['_pos_payment_name'] : '';
			$pos_payment_slug        = isset( $post['_pos_payment_slug'] ) && ! empty( $post['_pos_payment_slug'] ) ? $post['_pos_payment_slug'] : '';
			$pos_payment_description = isset( $post['_pos_payment_description'] ) && ! empty( $post['_pos_payment_description'] ) ? $post['_pos_payment_description'] : '';
			$pos_status              = isset( $post['_pos_status'] ) && ! empty( $post['_pos_status'] ) ? $post['_pos_status'] : 0;
			$payment_id              = isset( $_POST['_pos_payment_id'] ) && ! empty( $_POST['_pos_payment_id'] ) ? $_POST['_pos_payment_id'] : 0;
			if ( empty( $pos_payment_name ) ) {
				$message = __( 'Pos payment name is empty ', 'wc_pos' );
				$error_obj->set_error_code( 1 );
				$error_obj->wk_wc_pos_print_notification( $message );
			} elseif ( empty( $pos_payment_slug ) ) {
				$message = __( 'Pos payment slug is empty ', 'wc_pos' );
				$error_obj->set_error_code( 1 );
				$error_obj->wk_wc_pos_print_notification( $message );
			} elseif ( empty( $pos_payment_description ) ) {
				$message = __( 'Pos payment description is empty ', 'wc_pos' );
				$error_obj->set_error_code( 1 );
				$error_obj->wk_wc_pos_print_notification( $message );
			} else {
				if ( $payment_id ) {
					$wpdb->query( $wpdb->prepare( "UPDATE {$wpdb->prefix}woocommerce_pos_payments SET payment_name = %s, payment_description = %s , payment_status = %d , payment_slug = %s WHERE id = %d", $pos_payment_name, $pos_payment_description, $pos_status, $pos_payment_slug, $payment_id ) );
					$message = $pos_payment_name . __( ' Payment Gateway Updated Successfully ', 'wc_pos' );
					$error_obj->set_error_code( 0 );
					$error_obj->wk_wc_pos_print_notification( $message );
				} else {
					$wpdb->query( $wpdb->prepare( "INSERT INTO {$wpdb->prefix}woocommerce_pos_payments ( payment_name , payment_description , payment_status , payment_slug ) VALUES (%s, %s, %d, %s )", $pos_payment_name, $pos_payment_description, $pos_status, $pos_payment_slug ) );
					$message = $pos_payment_name . __( ' Payment Gateway Created Successfully', 'wc_pos' );
					$error_obj->set_error_code( 0 );
					$error_obj->wk_wc_pos_print_notification( $message );
				}
			}

		}

		public function wk_wc_save_pos_default_customer() {
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

			if ( empty( $email ) ) {
				$message = __( 'Customer email is mandatory ', 'wc_pos' );

				parent::set_error_code( 1 );
				parent::wk_wc_pos_print_notification( $message );
			}

			if ( ! filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
				$message = __( 'Customer email is not valid ', 'wc_pos' );
				parent::set_error_code( 1 );
				parent::wk_wc_pos_print_notification( $message );
			}

			if ( empty( $fname ) ) {
				$message = __( 'Customer first name is mandatory.', 'wc_pos' );
				parent::set_error_code( 1 );
				parent::wk_wc_pos_print_notification( $message );
			}

			if ( empty( $lname ) ) {
				$message = __( 'Customer last Name is mandatory.', 'wc_pos' );
				parent::set_error_code( 1 );
				parent::wk_wc_pos_print_notification( $message );
			}

			if ( empty( $pwd ) ) {
				$message = __( 'Customer password is mandatory.', 'wc_pos' );
				parent::set_error_code( 1 );
				parent::wk_wc_pos_print_notification( $message );
			}

			if ( empty( $phone ) ) {
				$message = __( 'Customer Phone number is mandatory.', 'wc_pos' );
				parent::set_error_code( 1 );
				parent::wk_wc_pos_print_notification( $message );
			}

			if ( ! empty( $phone ) && ( strlen( $phone ) < 9 || strlen( $phone ) > 12 ) ) {
				$message = __( 'Please enter a valid phone number(Only number allowed).', 'wc_pos' );
				parent::set_error_code( 1 );
				parent::wk_wc_pos_print_notification( $message );
			}

			if ( parent::get_error_code() == 0 ) {
				if ( isset( $_POST['save_default_customer'] ) ) {
					if ( ! empty( $email ) && ! empty( $pwd ) && ! empty( $lname ) && ! empty( $fname ) ) {
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

							wp_mail( $email, 'Welcome! you are now new customer On our POS SYSTEM', 'Your Password: ' . $pwd, __( 'Account created successfully', 'wc_pos' ) );

							?>

							<div class="notice notice-success is-dismissible">

								<p><?php esc_html_e( 'Default Customer for POS Created Successfully!', 'wc_pos' ); ?></p>


							</div>

							<?php
						}
					} else {
						?>

						<div class="notice notice-error is-dismissible">

							<p><?php esc_html_e( 'Ther must some required fields', 'wc_pos' ); ?></p>

						</div>

						<?php
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
					?>

				<div class="notice notice-success is-dismissible">

					<p><?php esc_html_e( 'Default Customer for POS Updated Successfully!', 'wc_pos' ); ?></p>

				</div>

					<?php
				}
			}
		}

		/**
		 * WordPress function for redirecting users on login based on user role.
		 */
		public function wk_wc_pos_managers_only() {

			$url = $_SERVER['REQUEST_URI'];

			if ( ! is_admin() && preg_match( '/\b\/pos\b/', $url ) && is_user_logged_in() ) {

				$user_id   = get_current_user_id();
				$user      = get_userdata( $user_id );
				$user_role = $user->roles;

				if ( empty( $user_role ) || ( ! empty( $user_role ) && ! in_array( 'pos_user', $user_role ) ) ) {
					$location = get_permalink( get_option( 'woocommerce_myaccount_page_id' ) );
					wp_safe_redirect( $location );
					exit( 0 );
				}
			}
		}

		public function wk_wc_pos_login_failed( $user ) {
			// check what page the login attempt is coming from.
			$referrer = $_SERVER['HTTP_REFERER'];

			// check that were not on the default login page.
			if ( isset( $_SERVER['HTTP_REFERER'] ) && ! empty( $referrer ) && ! strstr( $referrer, 'wp-login' ) && ! strstr( $referrer, 'wp-admin' ) && $user != null ) {
				// make sure we don’t already have a failed login attempt.
				if ( ! strstr( $referrer, '?login=failed' ) ) {
					// Redirect to the login page and append a querystring of login failed.
					wp_redirect( $referrer . '?login=failed' );
				} else {
					wp_redirect( $referrer );
				}

				exit;
			}
		}

		public function wk_wc_get_pos_user_status( $pos_user ) {
			$status_arr = array( esc_html__( 'Active', 'wc_pos' ), esc_html__( 'Deactive', 'wc_pos' ) );

			if ( ! empty( $pos_user ) ) {
				if ( in_array( $pos_user, $status_arr ) ) {
					return $status_arr;
				} else {
					return array( $status_arr[ $pos_user ] );
				}
			} else {
				return $status_arr;
			}
		}

		public function wk_wc_get_pos_outlet_status( $pos_user ) {
			$status_arr = array( esc_html__( 'Active', 'wc_pos' ), esc_html__( 'Deactive', 'wc_pos' ) );

			if ( ! empty( $pos_user ) ) {
				if ( in_array( $pos_user, $status_arr ) ) {
					return $status_arr;
				} else {
					return array( $status_arr[ $pos_user ] );
				}
			} else {
				return $status_arr;
			}
		}

		public function wk_wc_poslogin_init_internal() {
			add_rewrite_rule( 'pos$', 'index.php?pos=1', 'top' );
		}

		public function wk_wc_poslogin_query_vars( $query_vars ) {
			$query_vars[] = 'pos';
			$query_vars[] = 'pagename';
			$query_vars[] = 'main_page';
			$query_vars[] = 'view';
			$query_vars[] = 'pid';
			$query_vars[] = 'cid';

			return $query_vars;
		}

		public function wk_wc_poslogin_parse_request( &$wp ) {

			if ( array_key_exists( 'pos', $wp->query_vars ) || ( ! empty( $wp->query_vars['pagename'] ) && $wp->query_vars['pagename'] == 'pos' ) ) {

				new WC_Pos_Login();

				exit();
			}

			return;
		}

		/**
		* Function insert rules.
		*
		* @param array $rules rules.
		*/
		public function wkwcpos_insertcustom_rules( $rules ) {

			$newrules = array();

			$pos_page_slug = 'pos';

			$newrules = array(
				$pos_page_slug . '/(.+)/(.+)/(.+)?' => 'index.php?pagename=' . $pos_page_slug . '&main_page=$matches[1]&view=$matches[2]&pid=$matches[3]',
				$pos_page_slug . '/(.+)/([0-9]+)?'  => 'index.php?pagename=' . $pos_page_slug . '&main_page=$matches[1]&cid=$matches[2]',
				$pos_page_slug . '/(.+)/?'          => 'index.php?pagename=' . $pos_page_slug . '&main_page=$matches[1]',
			);

			return $newrules + $rules;

		}

		public function wkwcpos_include_custom_query_vars() {
			global $wp_query;

			$pagename  = isset( $wp_query->query_vars['pagename'] ) ? $wp_query->query_vars['pagename'] : '';
			$main_page = isset( $wp_query->query_vars['main_page'] ) ? $wp_query->query_vars['main_page'] : '';
			$view      = isset( $wp_query->query_vars['view'] ) ? $wp_query->query_vars['view'] : '';
			$pid       = isset( $wp_query->query_vars['pid'] ) ? $wp_query->query_vars['pid'] : '';
			$cid       = isset( $wp_query->query_vars['cid'] ) ? $wp_query->query_vars['cid'] : '';

			$main_pages = array(
				'orders',
				'cashier',
				'settings',
				'customers',
				'pay',
				'reports',
				'category',
			);

			$main_pages = apply_filters( 'wkwcpos_modify_main_pages_for_pos', $main_pages );

			$view_pages = array(
				'tab',
			);

			$pids = array(
				'history',
				'hold',
				'offline',
				'drawer',
				'sale',
				'today',
				'account',
				'other',
			);

			if ( ( ! empty( $pagename ) && 'pos' === $pagename ) ) {

				if ( ! empty( $main_page ) && in_array( $main_page, $main_pages ) ) {

					new WC_Pos_Login();

					if ( ! empty( $cid ) ) {

						new WC_Pos_Login();

					}

					if ( ! empty( $view ) && ! empty( $pid ) && in_array( $view, $view_pages ) && in_array( $pid, $pids ) ) {

						new WC_Pos_Login();

					}
				} elseif ( empty( $main_page ) ) {

					new WC_Pos_Login();

				}

				if ( is_user_logged_in() ) {
					new WC_Pos_Login();
				}

				die;

			}

		}
	}
}
