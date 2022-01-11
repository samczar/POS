<?php

namespace WKWC_POS\Includes\Admin\User;

use WP_User;
/*
 * This file handles POS User data saving.
 *
 * @package WooCommerce POS System
**/

use WKWC_POS\Inc\WC_Pos_Errors;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Manage_User' ) ) {
	class WC_Pos_Manage_User extends WC_Pos_Errors {

		protected $user_data    = '';
		protected $table_name   = '';
		protected $table_name2  = '';
		protected $current_user = '';
		protected $wpdb         = '';

		public function __construct( $data = '' ) {
			global $wpdb;

			$this->wpdb         = $wpdb;
			$this->current_user = get_current_user_id();
			$this->table_name   = $this->wpdb->prefix . 'woocommerce_pos_outlets';
			$this->table_name2  = $this->wpdb->prefix . 'woocommerce_pos_outlet_map';
			$this->user_data    = $data;
			$this->wk_wc_manage_pos_user_data();
		}

		public function wk_wc_manage_pos_user_data() {
			// if this fails, check_admin_referer() will automatically print a "failed" page and die.
			global $wpdb;
			if ( ! empty( $this->user_data ) && check_admin_referer( 'pos_action', 'pos_nonce_field' ) ) {

				$this->user_data = apply_filters( 'change_pos_user_data_before_add', $this->user_data );

				$user     = isset( $_GET['pos_user'] ) ? get_user_by( 'ID', intval( $_GET['pos_user'] ) ) : '';
				$email    = isset( $this->user_data['_pos_user_email'] ) ? sanitize_email( $this->user_data['_pos_user_email'] ) : '';
				$password = isset( $this->user_data['_pos_user_password'] ) ? wc_clean( wp_unslash( $this->user_data['_pos_user_password'] ) ) : '';

				$fname    = isset( $this->user_data['_pos_user_fname'] ) ? wc_clean( wp_unslash( $this->user_data['_pos_user_fname'] ) ) : '';
				$lname    = isset( $this->user_data['_pos_user_lname'] ) ? wc_clean( wp_unslash( $this->user_data['_pos_user_lname'] ) ) : '';
				$outlet   = isset( $this->user_data['_pos_outlet'] ) ? wc_clean( wp_unslash( $this->user_data['_pos_outlet'] ) ) : '';
				$username = isset( $this->user_data['_pos_username'] ) ? wc_clean( wp_unslash( $this->user_data['_pos_username'] ) ) : '';
				$pic      = isset( $this->user_data['_pos_user_pic_val'] ) ? wc_clean( wp_unslash( $this->user_data['_pos_user_pic_val'] ) ) : '';
				$status   = isset( $this->user_data['_pos_status'] ) ? wc_clean( wp_unslash( $this->user_data['_pos_status'] ) ) : '';

				$errors = array();

				if ( ! empty( $user ) ) {
					if ( empty( $email ) ) {
						$message = __( 'Pos manager email is empty ', 'wc_pos' );
						parent::set_error_code( 1 );
						parent::wk_wc_pos_print_notification( $message );
					}
				} else {
					if ( empty( $email ) ) {
						$message = __( 'Pos manager email is mandatory ', 'wc_pos' );
						parent::set_error_code( 1 );
						parent::wk_wc_pos_print_notification( $message );
					}

					if ( ! filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
						$message = __( 'Pos manager email is not valid ', 'wc_pos' );
						parent::set_error_code( 1 );
						parent::wk_wc_pos_print_notification( $message );
					}

					if ( email_exists( $email ) ) {
						$message = __( 'Pos manager email is already in use.', 'wc_pos' );
						parent::set_error_code( 1 );
						parent::wk_wc_pos_print_notification( $message );
					}
				}

				if ( empty( $password ) && empty( $user ) ) {
					$message = __( 'Pos manager password is mandatory.', 'wc_pos' );
					parent::set_error_code( 1 );
					parent::wk_wc_pos_print_notification( $message );
				}
				if ( empty( $fname ) ) {
					$message = __( 'Pos manager first name is mandatory.', 'wc_pos' );
					parent::set_error_code( 1 );
					parent::wk_wc_pos_print_notification( $message );
				}

				if ( empty( $lname ) ) {
					$message = __( 'Pos manager last Name is mandatory.', 'wc_pos' );
					parent::set_error_code( 1 );
					parent::wk_wc_pos_print_notification( $message );
				}

				if ( $status < 0 && $status > 1 ) {
					$message = __( 'Pos manager status is mandatory ', 'wc_pos' );
					parent::set_error_code( 1 );
					parent::wk_wc_pos_print_notification( $message );
				}

				if ( ! empty( $username ) && username_exists( $username ) ) {
					$message = __( 'Username is already in use, Please try different USERNAME.', 'wc_pos' );
					parent::set_error_code( 1 );
					parent::wk_wc_pos_print_notification( $message );
				}

				if ( empty( $user ) && preg_match( '/([%$#\*]+)/', $username ) ) {
					$message = __( 'Username does not allow Special Characters.', 'wc_pos' );
					parent::set_error_code( 1 );
					parent::wk_wc_pos_print_notification( $message );
				}

				if ( empty( $user ) && ( strlen( $username ) < 5 || strlen( $username ) > 20 ) ) {
					$message = __( 'Username length should be Greater then 5 and Less then 20.', 'wc_pos' );
					parent::set_error_code( 1 );
					parent::wk_wc_pos_print_notification( $message );
				}

				if ( parent::get_error_code() == 0 ) {
					if ( empty( $user ) ) {
						// Create new User
						$user_id = wp_create_user( $username, $password, $email );

						//  Set the nickname
						wp_update_user(
							array(
								'ID'         => $user_id,
								'nickname'   => $username,
								'first_name' => $fname,
								'last_name'  => $lname,
							)
						);

						if ( $pic ) {
							update_user_meta( $user_id, 'shr_pic', $pic );
						}

						// Set the role.
						$user = new WP_User( $user_id );
						$user->set_role( 'pos_user' );

						if ( $status == '1' ) {
							$data = array( 'user_status' => 1 ); // NULL value.
						} else {
							$data = array( 'user_status' => 0 ); // NULL value.
						}
						$format       = array( '%d' );  // Ignored when corresponding data is NULL, set to NULL for readability.
						$where        = array( 'id' => $user_id ); // NULL value in WHERE clause.
						$where_format = array( '%d' );  // Ignored when corresponding WHERE data is NULL, set to NULL for readability.
						$wpdb->update( $wpdb->prefix . 'users', $data, $where, $format, $where_format );

						do_action( 'wkwc_after_create_pos_user', $this->user_data, $user_id );

						if ( ! empty( $outlet ) || $outlet != '' ) {

							$res = $this->wpdb->delete(
								$this->table_name2,
								array(
									'user_id' => $user_id,
								),
								array( '%d' )
							);

							$this->wpdb->insert(
								$this->table_name2,
								array(
									'user_id'   => $user_id,
									'outlet_id' => $outlet,
								),
								array(
									'%d',
									'%d',
								)
							);
						}

						// Email the user.
						$link = home_url( '/pos' );

						$msg = sprintf( __( "Welcome! you are now new pos user.\n\n Your username: %1\$s \n\n Your Password: %2\$s \n\n Login Link: %3\$s", 'wc_pos' ), $username, $password, $link );

						wp_mail( $email, $msg, __( 'User Created Successfully', 'wc_pos' ) );

						$message = __( 'Pos manager created successfully', 'wc_pos' );
						parent::wk_wc_pos_print_notification( $message );
					} else {
						// Update user
						$pos_user = intval( $_GET['pos_user'] );
						// Set the nickname.
						wp_update_user(
							array(
								'ID'          => $pos_user,
								'nickname'    => $username,
								'first_name'  => $fname,
								'last_name'   => $lname,
								'user_status' => $status,
								'user_email'  => $email,
							)
						);

						update_user_meta( $pos_user, 'shr_pic', $pic );

						// Set the role.
						$user = new WP_User( $pos_user );

						/* if ( $status == '1' ) {
							$user->remove_role( 'pos_user' );
						} else {
							$user->set_role( 'pos_user' );
						} */
						if ( $status == '1' ) {
							$data = array( 'user_status' => 1 ); // NULL value.
						} else {
							$data = array( 'user_status' => 0 ); // NULL value.
						}
						$format       = array( '%d' );  // Ignored when corresponding data is NULL, set to NULL for readability.
						$where        = array( 'id' => $_GET['pos_user'] ); // NULL value in WHERE clause.
						$where_format = array( '%d' );  // Ignored when corresponding WHERE data is NULL, set to NULL for readability.
						$wpdb->update( $wpdb->prefix . 'users', $data, $where, $format, $where_format );

						do_action( 'wkwc_after_create_pos_user', $this->user_data, $pos_user );

						if ( ! empty( $outlet ) || $outlet != '-1' ) {

							$this->wpdb->delete(
								$this->table_name2,
								array(
									'user_id' => $pos_user,
								),
								array( '%d' )
							);

							$this->wpdb->insert(
								$this->table_name2,
								array(
									'user_id'   => $pos_user,
									'outlet_id' => $outlet,
								),
								array(
									'%d',
									'%d',
								)
							);
						}

						$message = __( 'Profile Updated Successfully.', 'wc_pos' );
						parent::wk_wc_pos_print_notification( $message );
					}
				} else {
					$message = __( 'Please fill up all the required fields ', 'wc_pos' );
					parent::wk_wc_pos_print_notification( $message );
				}
			}
		}
	}
}
