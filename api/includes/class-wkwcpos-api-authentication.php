<?php
/**
 * WooCommerce POS API setup
 *
 * @author   Webkul
 * @category API
 * @package  WooCommerce Point Of Sale API
 * @since    3.2.0
*/

namespace WKWC_POS\Api\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register POS API Permission Check.
 *
 * @class WKWCPOS_API_Authentication
 */
class WKWCPOS_API_Authentication {

	public $error = '';

	/**
	 * Request authenticate function
	 */
	public function wkwcpos_authenticate_request( $user_id = '' )
	{

		$auth_key = '';

		if( function_exists( 'apache_request_headers' ) ) {

			$auth = apache_request_headers();

			if( isset( $auth['authkey'] ) && !empty( $auth['authkey'] ) ) {

				$auth_key = $auth['authkey'];

			} else if( isset( $auth['Authkey'] ) && !empty( $auth['Authkey'] ) ) {

				$auth_key = $auth['Authkey'];

			} else if( isset( $auth['AUTHKEY'] ) && !empty( $auth['AUTHKEY'] ) ) {

				$auth_key = $auth['AUTHKEY'];

			}

		} else {
			$auth_key = $_SERVER['HTTP_AUTHKEY'];
		}

		if ( !empty( $auth_key ) ) {
			if ( $this->wkwcpos_validate_session_id( $auth_key, $user_id ) ) {
				return 'ok';
			} else {

				if( get_user_meta( $user_id, 'wkwcpos_api_session_id', true ) ) {
					return get_user_meta( $user_id, 'wkwcpos_api_session_id', true );
				}

				$session_id_data = $this->wkwcpos_generate_random_string();

				if( !empty( $user_id ) ) {
					update_user_meta( $user_id, 'wkwcpos_api_session_id', $session_id_data );
				} else {
					update_option( 'wkwcpos_api_session_id', $session_id_data );
				}

				return $session_id_data;
			}
		} else {

			if( get_user_meta( $user_id, 'wkwcpos_api_session_id', true ) ) {
				return get_user_meta( $user_id, 'wkwcpos_api_session_id', true );
			}
			
			$session_id_data = $this->wkwcpos_generate_random_string();

			if( !empty( $user_id ) ) {
				update_user_meta( $user_id, 'wkwcpos_api_session_id', $session_id_data );
			} else {
				update_option( 'wkwcpos_api_session_id', $session_id_data );
			}

			return $session_id_data;

		}

	}

	/**
	 * Validate received session id
	 * @param $auth_key
	 * @return bool
	 */
	private function wkwcpos_validate_session_id( $auth_key, $user_id )
	{
		$h1 = md5( get_option( 'wkwcpos_api_username' ) . ':' . get_option( 'wkwcpos_api_password' ) );
		
		if( !empty( $user_id ) ) {
			$session_id_data_result = get_user_meta( $user_id, 'wkwcpos_api_session_id', true );
		} else {
			$session_id_data_result = get_option( 'wkwcpos_api_session_id' );
		}
		
		$h2 = md5( strtolower( $h1 ) . ':' . $session_id_data_result );
		
		if ( strtolower( $h2 ) == $auth_key ) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Generate random string
	 * @param $length
	 * @return $random_string
	 */
	function wkwcpos_generate_random_string( $length = 50 )
	{
		$random_string = substr( str_shuffle( str_repeat( $x = '989213119013123abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil( $length / strlen( $x ) ) ) ), 1, $length );

		return $random_string;
	}

}
