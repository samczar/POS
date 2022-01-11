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

namespace WKWC_POS\Api\Includes;

use WKWC_POS\Api\Inc\WKWCPOS_API_Error_Handler;
use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class WKWCPOS_API_Get_Session_ID
{
    /**
     * Base Name.
     *
     * @var string the route base
     */
    public $base = 'get-session-id';

    /**
     * Namespace Name.
     *
     * @var string the route namespace
     */
    public $namespace = 'pos/v1';

    /**
     * Parent Constructor.
     */
    public function __construct()
    {
        $this->error = new WKWCPOS_API_Error_Handler();
        $this->authentication = new WKWCPOS_API_Authentication();
    }

    /**
     * API Callback.
     */
    public function get_session_id( $request )
    {
        try {

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

            return array(
                'status'      => 200,
                'success'     => true,
            );
            
        } catch (Exception $e) {
            $this->error->set('exception', $e);
        }
    }
}
