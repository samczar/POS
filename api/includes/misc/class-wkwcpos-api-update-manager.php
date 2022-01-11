<?php
/**
 * WooCommerce POS API setup.
 *
 * @author   Webkul
 *
 * @category API
 *
 * @version    1.0.0
*/

namespace WKWC_POS\Api\Includes\Misc;

use WKWC_POS\Api\Inc\WKWCPOS_API_Error_Handler;
use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class WKWCPOS_API_Update_Manager
{
    /**
     * Base Name.
     *
     * @var string the route base
     */
    public $base = 'update-manager';

    /**
     * Namespace Name.
     *
     * @var string the route namespace
     */
    public $namespace = 'pos/v1';

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->error = new WKWCPOS_API_Error_Handler();
        $this->authentication = new WKWCPOS_API_Authentication();
    }

    /**
     * API Callback.
     */
    public function update_pos_manager($request)
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

            $user_arr = '';
            $user_first_name = '';
            $user_last_name = '';
            if ( !empty( $user_id ) && !empty( $request['form_data'] ) ) {
                $data = array();
                $data = json_decode(stripslashes($request['form_data']));
                $cpwd = $npwd = '';
                $data = (array) $data;
                $pos_user = $user_id;
                $oldpwd = '';


                if (!empty($data)) {
                    foreach ($data as $key => $value) {
                        if ($key == 'pos-user-fname') {
                            $user_first_name = strip_tags($value);
                        }

                        if ($key == 'pos-user-lname') {
                            $user_last_name = strip_tags($value);
                        }

                        if ($key == 'pos-user-ppwd') {
                            $oldpwd = strip_tags($value);
                        }

                        if ($key == 'pos-user-npwd') {
                            $npwd = strip_tags($value);
                        }

                        if ($key == 'pos-user-cpwd') {
                            $cpwd = strip_tags($value);
                        }

                        if (!empty($npwd) && !empty($cpwd) && $npwd == $cpwd) {
                            $user_arr = $npwd;
                        }
                    }
                }
            }

            if ($user_first_name != '') {
                update_user_meta( $pos_user, 'first_name', $user_first_name );
            }

            if ($user_last_name != '') {
                update_user_meta( $pos_user, 'last_name', $user_last_name );
            }
            if ($user_arr != '') {
                $user_data = get_userdata($pos_user);

                if (wp_check_password($oldpwd, $user_data->user_pass, $pos_user) && $user_arr != '') {

                    $user = new \WP_User( $pos_user );

                    wp_set_password($user_arr, $pos_user);

                    // Log-in again.
                    wp_set_auth_cookie( $pos_user );
                    wp_set_current_user( $pos_user );
                    do_action( 'wp_login', $user->user_login, $user );

                    return array( 'response' => true );
                } else {
                    return array( 'response' => false );
                }
            }

            return array( 'response' => true );
        } catch (Exception $e) {
            return $this->error->set('exception', $e);
        }
    }
}
