<?php

namespace WKWC_POS\Templates\Admin\Reports;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'WC_Pos_Report_Stock_Setting' ) ) {

	/**
	 *
	 */
	class WC_Pos_Report_Stock_Setting {

		protected $wpdb;
		protected $outlet_table;
		protected $outlet_mapped_table;

		function __construct() {

			global $wpdb;

			$this->wpdb = $wpdb;

			$this->outlet_map_table = $this->wpdb->prefix . 'woocommerce_pos_outlet_map';

			$this->outlet_table = $this->wpdb->prefix . 'woocommerce_pos_outlets';

			$this->wk_wc_pos_get_report_stock_setting_template();

		}

		public function wk_wc_pos_get_report_stock_setting_template() {

			settings_errors();

			echo '<ul class="subsubsub" style="float:none">';

			$sections = array(
				'1' => 'Low in Stock',
				'2' => 'Out of Stock',
				'3' => 'Most Stocked',
			);

			$current_section = empty( $_GET['section'] ) ? '1' : intval( $_GET['section'] );

			$outlet_id = empty( $_GET['outlet_id'] ) ? '' : ( $_GET['outlet_id'] );

			$array_keys = array_keys( $sections );

			if ( isset( $_GET['outlet_id'] ) && ! empty( $_GET['outlet_id'] ) ) {

				$user_id = $_GET['outlet_id'];

				foreach ( $sections as $id => $label ) {
					echo '<li><a href="' . admin_url( 'admin.php?page=wc-pos-reports&outlet_id=' . $user_id . '&tab=stock&section=' . $id ) . '" class="' . ( $current_section == $id ? 'current' : '' ) . '">' . $label . '</a> ' . ( end( $array_keys ) == $id ? '' : '|' ) . ' </li>';
				}
			} else {

				foreach ( $sections as $id => $label ) {
					echo '<li><a href="' . admin_url( 'admin.php?page=wc-pos-reports&tab=stock&section=' . $id ) . '" class="' . ( $current_section == $id ? 'current' : '' ) . '">' . $label . '</a> ' . ( end( $array_keys ) == $id ? '' : '|' ) . ' </li>';
				}
			}

			echo '</ul>';
			echo "<form action=' ' method = 'GET' >";
			echo "<input type = 'hidden' value = 'wc-pos-reports' name = 'page'>";
			echo "<input type = 'hidden' value = 'stock' name = 'tab'>";
			echo "<input type = 'hidden' value = $current_section name = 'section'>";

			echo '<select name = "outlet_id" value = 1>';
			echo '<option value = >' . __( 'All outlet', 'wc_pos' ) . '</option>';

			$outlets = $this->wpdb->get_results( "SELECT id, outlet_name as name FROM $this->outlet_table , $this->outlet_map_table WHERE id = outlet_id AND user_id > 0" );

			foreach ( $outlets as $key => $value ) {

				$outlet      = $value->id;
				$outlet_name = $value->name;
				$selected    = empty( ! $outlet_id ) && $outlet_id == $outlet ? 'selected' : '';
				echo "<option value = '$outlet' $selected >" . __( "$outlet_name Outlet", 'wc_pos' ) . '</option>';

			}
			echo '</select>';
			echo '<input type="submit" class ="button" value = "' . __( 'Apply', 'wc_pos' ) . '"> ';
			echo '</form>';

			do_action( 'wk_pos_report_stock_section_pos_' . $current_section );

		}

	}

}
