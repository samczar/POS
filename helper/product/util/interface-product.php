<?php
/**
 * @author Webkul
 * @version 2.0.0
 * This file handles core pos Products interface.
 */

namespace WKWC_POS\Helper\Product\Util;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

interface Product_Interface {

	public function pos_get_all_product_by_count();

	public function get_all_pos_products( $search_query = '', $off, $perpage, $filtered_outlet = '' );

}
