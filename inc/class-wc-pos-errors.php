<?php

/**
 * @author Webkul
 * @version 2.0.0
 * This file handles Shipping Area Data
 */

namespace WKWC_POS\Inc;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WC_Pos_Errors' ) ) {
    /**
     *Save shipping area data
     */
    class WC_Pos_Errors {

        public $error_code = '';

        public function __construct( $error_code = '' ) {

            $this->error_code = $error_code;

        }

        public function set_error_code( $code ) {

            if( !empty( $code )  ) {

                $this->error_code = $code;

            }
        }

        public function get_error_code() {
            return $this->error_code;
        }

        public function wk_wc_pos_print_notification( $message ) {

            if( is_admin() ) {

                if( $this->error_code == 0 ) {

                    echo '<div class="notice notice-success">';
                    echo '<p>'. $message . '</p>';
                    echo '</div>';

                } else if( $this->error_code == 1 ) {

                    echo '<div class="notice notice-error">';
                    echo '<p>'. $message . '</p>';
                    echo '</div>';
                }

            } else {

                if( $this->error_code == 0 ) {

                    wc_print_notice( $message, 'success' );

                } else if( $this->error_code == 1 ) {

                    wc_print_notice( $message, 'error' );

                }

            }

        }

    }

}
