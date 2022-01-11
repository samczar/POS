<?php

/**
 * @author Webkul
 *
 * @version 2.0.0
 * This file handles all front end ajax callbacks.
 */

namespace WKWC_POS\Includes\Front\Ajax_Invoice;

use WKWC_POS\Helper\Invoice\WKWCPOS_Invoice_Helper;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('WC_Pos_Front_Ajax_Invoice_Functions')) {
    class WC_Pos_Front_Ajax_Invoice_Functions
    {
        protected $wpdb = '';

        public function __construct()
        {
            global $wpdb;

            $this->wpdb = $wpdb;
            $this->invoice_helper = new WKWCPOS_Invoice_Helper();
        }

        public function wkwcpos_save_invoice()
        {
            if (check_ajax_referer('api-ajaxnonce', 'nonce', false)) {

                $data = [
                    'invoice_html' => ! empty( $_POST[ 'invoice_html' ] ) ? stripslashes_deep( $_POST[ 'invoice_html' ] ) : '',
                    'id'           => ! empty( $_POST['id'] ) ? $_POST['id'] : '',
                ];

                $success = $this->invoice_helper->wkwcpos_save_invoice_html( $data );

                wp_send_json([
                    'success' => $success,
                ]);
                exit();
            }
        }
    }
}
