<?php

/**
 * WooCommerce POS API setup
 *
 * @author   Webkul
 * @category API
 * @package  WooCommerce Point Of Sale API
 * @since    3.2.0
 */

namespace WKWC_POS\Api\Includes\Login;

use WKWC_POS\Api\Inc\WKWCPOS_API_Error_Handler;
use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}


class WKWCPOS_API_Login_User
{

	/**
	 * Base Name
	 *
	 * @var string $base the route base
	 */
	public $base = 'login';

	/**
	 * Namespace Name
	 *
	 * @var string $namespace the route namespace
	 */
	public $namespace = 'pos/v1';

	/**
	 * Constructor.
	 */
	public function __construct()
	{

		global $wpdb;
		$this->wpdb = $wpdb;

		$this->error  = new WKWCPOS_API_Error_Handler();
		$this->authentication = new WKWCPOS_API_Authentication();
	}

	/**
	 * API Callback.
	 */
	public function user_login($request)
	{
		try {

			$validate_auth_key = $this->authentication->wkwcpos_authenticate_request();

			if ($validate_auth_key != 'ok') {
				return array(
					'session_id'             => $validate_auth_key,
					'status'                 => 401,
					'invalid_auth_key_error' => __('Please provide valid Auth Key.', 'wc_pos'),
					'success'                => false,
				);
			}

			if (empty($request['key']) || empty($request['pass'])) {
				return array(
					"success" => false,
					"message" => __('Sorry, you must provide all parameters.', 'wc_pos')
				);
			}
			$email = $request['key'];
			$pass	= $request['pass'];
			$user = $this->check_user_exist($email, $pass);
			if (!empty($user)) {
				$roles = $user->roles;
				if (in_array('pos_user', $roles)) {
					$first_name = get_user_meta($user->ID, 'first_name', true);
					$last_name = get_user_meta($user->ID, 'last_name', true);
					return array(
						"success" 		=> true,
						"id" 	  		=> $user->ID,
						"last_name"   	=> $last_name,
						"first_name" 	=> $first_name,
						"email"   		=> $user->user_email,
						"profile_pic"  	=> get_avatar_url($user->ID),
						"message" 		=> __('Logged in successfully.', 'wc_pos')
					);
				}
			}

			return array(
				"success" => false,
				"message" => __('Invalid credentials.', 'wc_pos')
			);
		} catch (Exception $e) {
			return $this->error->set('exception', $e);
		}
	}

	/**
	 * Check User exist
	 * @param $user_object
	 * @return $user_data
	 */
	public function check_user_exist($email, $pass)
	{
		$user_exist = wp_authenticate($email, $pass);
		if (array_key_exists('errors', $user_exist))
			$user_exist = false;
		return $user_exist;
	}
}
