<?php
/**
 * @author Webkul
 * @version 2.0.0
 * This file handles core pos orders interface.
 */

namespace WKWC_POS\Helper\Order\Util;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

interface Order_Interface {

	public function pos_get_all_order_by_search_count( $search_query = '', $pay_method = '' );

	public function pos_get_all_orders( $perpage, $offset );

}
