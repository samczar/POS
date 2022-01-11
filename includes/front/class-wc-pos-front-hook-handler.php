<?php

/**
* @author Webkul
* @version 2.0.0
* This file handles all front end actions.
*/

namespace WKWC_POS\Includes\Front;

use WKWC_POS\Includes\Front;

if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

if ( ! class_exists( 'WC_Pos_Front_Hook_Handler' ) ) {

  /**
  *
  */
  class WC_Pos_Front_Hook_Handler {

    public $function_handler = '';

    public function __construct() {

      $this->function_handler = new Front\WC_Pos_Front_Function_Handler();

      add_action( 'woocommerce_init', array( $this->function_handler, 'wkwcpos_init_pos_api' ) );

      add_filter( 'login_form_middle', array( $this->function_handler, 'wkwcpos_add_lost_password_link' ) );

      add_action( 'woocommerce_checkout_order_processed', array( $this->function_handler, 'wkwcpos_reduce_pos_master_stock_on_placing_order' ) );

      add_action( 'woocommerce_checkout_create_order', array( $this->function_handler, 'wkwcpos_stop_mails_for_customers' ), 1, 1 );

    }

  }

}

