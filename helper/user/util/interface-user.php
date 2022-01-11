<?php
/**
 * @author Webkul
 * @version 2.0.0
 * This file handles core config interface.
 */

namespace WKWC_POS\Helper\User\Util;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

interface User_Interface {
	/**
	 * Loads core config data.
	 */

	public function pos_get_all_users_count( $s = '' );

	public function pos_get_all_users( $s = '', $perpage, $offset );

	public function _get_pos_user_outlet( $puser_id );

	public function _get_pos_user_outlet_with_status();

}
