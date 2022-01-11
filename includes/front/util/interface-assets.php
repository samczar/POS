<?php

/**
 * @author Webkul
 * @version 2.0.0
 * This file handles assets interface.
 */

namespace WKWC_POS\Includes\Front\Util;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

interface Assets_Interface {

    public function wk_wc_pos_Init();

    public function wk_wc_pos_EnqueueScripts_Admin();

    public function wk_wc_pos_EnqueueScripts_Front();

}

