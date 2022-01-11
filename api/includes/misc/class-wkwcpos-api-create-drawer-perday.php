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

namespace WKWC_POS\Api\Includes\Misc;

use WKWC_POS\Api\Inc\WKWCPOS_API_Error_Handler;
use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;
use WKWC_POS\Api\Helper\WKWCPOS_API_User_Outlet_Helper;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class WKWCPOS_API_Create_Drawer_Perday
{
    /**
     * Base Name.
     *
     * @var string the route base
     */
    public $base = 'create-drawer-perday';

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
        global $wpdb;

        $this->wpdb = $wpdb;

        $this->error = new WKWCPOS_API_Error_Handler();

        $this->helper = new WKWCPOS_API_User_Outlet_Helper();

        $this->authentication = new WKWCPOS_API_Authentication();
    }

    /**
     * Helper Functions.
     */
    private function save_drawer_amount($drawer_amt, $pos_user)
    {
        $table_name = $this->wpdb->prefix.'woocommerce_pos_drawer_transaction';

        $date_today = trim($drawer_amt['date']);

        list($day, $month, $year) = explode('/', $date_today);

        $date = new \DateTime();

        $date->setDate($year, $month, $day);

        $outlet_id = $this->helper->_get_pos_user_outlet_with_status($pos_user);

        $new_date = $date->format('Y-m-d');

        $opening_amount = !empty($drawer_amt['opening_balance']) ? $drawer_amt['opening_balance'] : 0;
        $closing_amount = !empty($drawer_amt['total_sale']) ? $drawer_amt['total_sale'] : 0;
        $card_amount = isset($drawer_amt['card_sale']) ? $drawer_amt['card_sale'] : 0;
        $cash_amount = isset($drawer_amt['cash_sale']) ? $drawer_amt['cash_sale'] : 0;
        $remark = isset($drawer_amt['drawer_note']) ? $drawer_amt['drawer_note'] : 0;

        $t_id = $this->wpdb->get_var($this->wpdb->prepare("SELECT t_id FROM $table_name WHERE date=%s AND outlet_id=%d", $new_date, $outlet_id));
        
        $id = 0;

        $data = array();

        if ($closing_amount > 0 && !empty($outlet_id)) {
            if (!empty($t_id)) {

                $db_data = apply_filters('modify_drawer_db_columns', array(
                    'card_amount' => $card_amount,

                    'cash_amount' => $cash_amount,

                    'opening_amount' => $opening_amount,

                    'closing_amount' => $closing_amount,

                    'remark' => !empty($remark) ? $remark : '',
                ), $drawer_amt);

                $res = $this->wpdb->update(
                    $table_name,

                    $db_data,

                    array('t_id' => $t_id)
                );

                $id = $t_id;
            } else {

                $db_data = apply_filters('modify_drawer_db_columns', array(
                    'outlet_id' => $outlet_id,

                    'card_amount' => $card_amount,

                    'cash_amount' => $cash_amount,

                    'opening_amount' => $opening_amount,

                    'closing_amount' => $closing_amount,

                    'date' => $new_date,

                    'remark' => !empty($remark) ? $remark : '',
                ), $drawer_amt);

                $res = $this->wpdb->insert(
                    $table_name,

                    $db_data
                );

                $id = $this->wpdb->insert_id;

            }

            if( $id ) {
                do_action( 'wkwcpos_perform_after_create_drawer', $db_data );
            }

            $data['response'] = apply_filters( 'modify_drawer_return_columns', array(
                'id' => $id,
                'opening_balance' => $opening_amount,
                'closing_balance' => $closing_amount,
                'card_sale' => $card_amount,
                'cash_sale' => $cash_amount,
                'drawer_note' => $remark,
                'date' => $new_date,
            ), $drawer_amt );
        }

        $data = apply_filters('wkwcpos_modify_drawer_details_at_pos', $data, $drawer_amt);

        if ($id || $closing_amount == 0) {
            return $data;
        } else {
            return array('response' => []);
        }
    }

    /**
     * API Callback.
     */
    public function create_drawer_perday($request)
    {
        try {
            $user_id = $request['logged_in_user_id'];

            $validate_auth_key = $this->authentication->wkwcpos_authenticate_request($user_id);

            if ($validate_auth_key != 'ok') {
                return array(
                    'session_id' => $validate_auth_key,
                    'status' => 401,
                    'invalid_auth_key_error' => __('Please provide valid Auth Key.', 'wc_pos'),
                    'success' => false,
                );
            }

            $result = false;

            $pos_user = intval($request['logged_in_user_id']);

            parse_str($request['drawer'], $drawer);

            if (!empty($pos_user) && !empty($drawer)) {
                $result = $this->save_drawer_amount($drawer, $pos_user);
            }

            return $result;
        } catch (Exception $e) {
            $this->error->set('exception', $e);
        }
    }
}
