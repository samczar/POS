<?php
/**
 * WooCommerce POS API setup
 *
 * @author   Webkul
 * @category API
 * @package  WooCommerce Point Of Sale API
 * @since    3.2.0
*/

namespace WKWC_POS\Api\Includes\Misc;

use WKWC_POS\Api\Inc\WKWCPOS_API_Error_Handler;
use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;
use WKWC_POS\Api\Helper\WKWCPOS_API_User_Outlet_Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


class WKWCPOS_API_Get_Tax_Details {

	/**
	 * Base Name
	 *
	 * @var string $base the route base
	 */
	public $base = 'get-tax-details';

	/**
	 * Namespace Name
	 *
	 * @var string $namespace the route namespace
	 */
	public $namespace = 'pos/v1';

	/**
	 * Constructor.
	 */
	public function __construct() {

		global $wpdb;

		$this->wpdb = $wpdb;

		$this->error  = new WKWCPOS_API_Error_Handler();
		$this->helper  = new WKWCPOS_API_User_Outlet_Helper();
		$this->authentication = new WKWCPOS_API_Authentication();

	}

	/**
	 * Helper Functions
	 */

	public function get_tax_details( $request ) {

		$user_id = $request['logged_in_user_id'];

		$validate_auth_key = $this->authentication->wkwcpos_authenticate_request( $user_id );

		if ( $validate_auth_key != 'ok' ) {
			return array(
				'session_id'  => $validate_auth_key,
				'status'      => 401,
				'invalid_auth_key_error' => __( 'Please provide valid Auth Key.', 'wc_pos' ),
				'success'     => false,
			);
		}

		$rates = '';

		$tax = new \WC_Tax();

		$pos_user = $request['logged_in_user_id'];

		$outlet_id = $this->helper->_get_pos_user_outlet_with_status( $pos_user );

		if( !empty( $outlet_id ) ) {

			$pos_outlet = $this->helper->_get_pos_outlet($outlet_id);

			$rates = $tax->find_rates( array(
				'country'   => $pos_outlet->outlet_country,
				'city'      => $pos_outlet->outlet_city,
				'state'     => $pos_outlet->outlet_state,
				'postcode'  => $pos_outlet->outlet_postcode,
			) );

		}

		return apply_filters( 'wkwcpos_modify_tax_details_at_pos', $rates, $pos_user );

	}

}
