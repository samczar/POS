<?php
/**
 * @author Webkul
 * @version 2.0.0
 * This file handles core config interface.
 */

namespace WKWC_POS\Helper\Outlet\Util;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

interface Outlet_Interface {
	/**
	 * Loads core config data.
	 */

	public function update_outlet_status( $action, $outlet_id );

	public function delete_vendor_outlet( $outlet_id );

	public function pos_get_all_outlet_by_search_count( $text = '' );

	public function pos_get_all_outlet_by_search( $text, $off, $perpage );

	public function pos_get_all_outlets();
	
	public function _get_pos_outlet();

	public function _get_pos_user_outlet();

}
