<?php
/**
 * WooCommerce POS API setup.
 *
 * @author   Webkul
 *
 * @category API
 *
 * @since    3.2.0
*/

namespace WKWC_POS\Api\Includes\Products;

use WKWC_POS\Api\Inc\WKWCPOS_API_Error_Handler;
use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;
use WKWC_POS\Api\Helper\WKWCPOS_API_User_Outlet_Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class WKWCPOS_API_Get_All_Products_Id {

	/**
	 * Base Name.
	 *
	 * @var string the route base
	 */
	public $base = 'get-products-id';

	/**
	 * Namespace Name.
	 *
	 * @var string the route namespace
	 */
	public $namespace = 'pos/v1';

	/**
	 * Parent Constructor.
	 */
	public function __construct() {
		$this->error          = new WKWCPOS_API_Error_Handler();
		$this->helper         = new WKWCPOS_API_User_Outlet_Helper();
		$this->authentication = new WKWCPOS_API_Authentication();
	}

	/**
	 * API Callback.
	 */
	public function get_all_pos_products_id( $request ) {
		try {

			$user_id = $request['logged_in_user_id'];

			$validate_auth_key = $this->authentication->wkwcpos_authenticate_request( $user_id );

			if ( $validate_auth_key != 'ok' ) {
				return array(
					'session_id'             => $validate_auth_key,
					'status'                 => 401,
					'invalid_auth_key_error' => __( 'Please provide valid Auth Key.', 'wc_pos' ),
					'success'                => false,
				);
			}

			if ( ! isset( $request['logged_in_user_id'] ) || empty( $request['logged_in_user_id'] ) ) {
				return $this->error->set( 'user_id_required' );
			}

			$manager_id = $request['logged_in_user_id'];

			$outlet_id = $this->helper->_get_pos_user_outlet_with_status( $manager_id );

			$outlet_products = array();

			if ( ! empty( $outlet_id ) ) {
				$outlet_products = $this->helper->get_pos_user_outlet_products( intval( $outlet_id ) );
			}

			return apply_filters( 'wkwcpos_modify_product_ids_response_at_pos', $outlet_products, $manager_id, $outlet_id );

		} catch ( Exception $e ) {
			$this->error->set( 'exception', $e );
		}
	}
}
