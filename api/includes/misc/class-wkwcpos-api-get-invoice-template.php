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

use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;
use WKWC_POS\Api\Helper\WKWCPOS_API_User_Outlet_Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class WKWCPOS_API_Get_Invoice_Template {

	/**
	 * Base Name
	 *
	 * @var string $base the route base
	 */
	public $base = 'get-invoice-template';

	/**
	 * Namespace Name
	 *
	 * @var string $namespace the route namespace
	 */
	public $namespace  = 'pos/v1';
	public $table_name = '';
	public $wpdb       = '';

	/**
	 * Constructor.
	 */
	public function __construct() {

		global $wpdb;

		$this->wpdb = $wpdb;

		$this->helper         = new WKWCPOS_API_User_Outlet_Helper();
		$this->authentication = new WKWCPOS_API_Authentication();
		$this->table_name     = $this->wpdb->prefix . 'woocommerce_pos_invoice_templates';

	}

	/**
	 * Helper Functions
	 */

	public function get_invoice_template( $request ) {

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

		$pos_user = $request['logged_in_user_id'];

		$outlet_id = $this->helper->_get_pos_user_outlet_with_status( $pos_user );

		$outlet_invoice = '';

		if ( ! empty( $outlet_id ) ) {

			$outlet_invoice = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT outlet_invoice from {$this->wpdb->prefix}woocommerce_pos_outlets WHERE id = %d", $outlet_id ) );

			if ( ! empty( $outlet_invoice ) ) {
				$outlet_invoice = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT invoice_html from $this->table_name WHERE id=%d", $outlet_invoice ) );
				if ( empty( $outlet_invoice ) ) {
					$outlet_invoice = '';
				}
			} else {
				$outlet_invoice = '';
			}
		}

		return apply_filters( 'wkwcpos_modify_invoice_template_at_pos', $outlet_invoice, $pos_user );

	}

}
