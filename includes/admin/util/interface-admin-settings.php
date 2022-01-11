<?php

/**
 * @author Webkul
 * @version 2.1.0
 * This file handles admin settings interface.
 */

namespace WKWC_POS\Includes\Admin\Util;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

interface Admin_Settings_interface {


	/**
	 * Add Menu in Backend
	**/
	public function wk_wc_pos_add_dashboard_menu();

	/**
	 * Register ElasticSearch Settings
	**/
	public function wk_wc_pos_register_settings();

}

