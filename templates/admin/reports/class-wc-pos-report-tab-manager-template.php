<?php

namespace WKWC_POS\Templates\Admin\Reports;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Report_Tab_Manager_Template' ) ) {

	/**
	 *
	 */
	class WC_Pos_Report_Tab_Manager_Template {

		function __construct() {

			$this->wk_wc_pos_get_report_tab_manager_template();

		}

		public function wk_wc_pos_get_report_tab_manager_template() {

			$tabber = '';

			if ( isset( $_GET['page'] ) && ! empty( $_GET['page'] ) ) {

				$page = $_GET['page'];

				if ( $page == 'wc-pos-reports' ) :

					$wksa_tabs = array(
						'order'    => __( 'Order', 'wc_pos' ),
						'customer' => __( 'Customer', 'wc_pos' ),
						'stock'    => __( 'Stock', 'wc_pos' ),
						'tax'      => __( 'Tax', 'wc_pos' ),
					);

					$wksa_tabs = apply_filters( 'wkwcpos_modify_report_tabs', $wksa_tabs );

					$current_tab = empty( $_GET['tab'] ) ? 'order' : sanitize_title( $_GET['tab'] );

					echo '<div class="wrap outlet">';
					echo  '<h1>';

					if ( isset( $_GET['outlet_id'] ) && ! empty( $_GET['outlet_id'] ) ) {

						global $wpdb;

						$outlet_id   = $_GET['outlet_id'];
						$outlet      = $wpdb->prefix . 'woocommerce_pos_outlets';
						$outlet_name = $wpdb->get_var( "SELECT outlet_name FROM $outlet WHERE id = " . $outlet_id );
						echo __( 'POS Reports - ' . ucfirst( $outlet_name ) . ' Outlet', 'wc_pos' );
						echo '</h1>';
						echo '<nav class="nav-tab-wrapper">';
						foreach ( $wksa_tabs as $name => $label ) {

							echo '<a href="' . admin_url( 'admin.php?page=wc-pos-reports&outlet_id=' . $outlet_id . '&tab=' . $name . $tabber ) . '" class="nav-tab ' . ( $current_tab == $name ? 'nav-tab-active' : '' ) . '">' . $label . '</a>';

						}
					} else {
						echo __( 'POS Reports', 'wc_pos' );
						echo '</h1>';
						echo '<nav class="nav-tab-wrapper">';
						foreach ( $wksa_tabs as $name => $label ) {

								echo '<a href="' . admin_url( 'admin.php?page=wc-pos-reports&tab=' . $name . $tabber ) . '" class="nav-tab ' . ( $current_tab == $name ? 'nav-tab-active' : '' ) . '">' . $label . '</a>';

						}
					}

					echo '</nav>';

					do_action( 'wk_pos_report_' . $current_tab );

					echo '</div>';

			  endif;
			}

		}

	}

}


