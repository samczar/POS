<?php

namespace WKWC_POS\Templates\Admin\Reports;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'WC_Pos_Report_Order_Setting' ) ) {
	class WC_Pos_Report_Order_Setting {

		protected $wpdb;
		protected $outlet_table;
		protected $outlet_mapped_table;

		public function __construct() {
			global $wpdb;

			$this->wpdb = $wpdb;

			$this->outlet_table        = $this->wpdb->prefix . 'woocommerce_pos_outlets';
			$this->outlet_mapped_table = $this->wpdb->prefix . 'woocommerce_pos_outlet_map';

			$this->wk_wc_pos_get_report_order_setting_template();
		}

		public function wk_wc_pos_get_report_order_setting_template() {
			settings_errors();

			$custom_pos_payment_methods = $this->wpdb->get_results( "Select payment_slug, payment_name from {$this->wpdb->prefix}woocommerce_pos_payments", ARRAY_A );

			echo '<ul class="subsubsub" style="float:none">';

			$sections = array(
				'date'              => 'Sales by date',
				'product'           => 'Sales by product',
				'sales_by_category' => 'Sales by category',
				'coupon_usage'      => 'Coupon by date',
			);

			$current_section = empty( $_GET['report'] ) ? 'date' : ( $_GET['report'] );

			$payment = ( ! isset( $_GET['payment'] ) && empty( $_GET['payment'] ) ) ? '' : ( $_GET['payment'] );

			$outlet_id = empty( $_GET['outlet_id'] ) ? '' : ( $_GET['outlet_id'] );

			$array_keys = array_keys( $sections );

			$range = '';

			if ( isset( $_GET['range'] ) && ! empty( $_GET['range'] ) ) {
				$range = $_GET['range'];
			}

			if ( isset( $_GET['outlet_id'] ) && ! empty( $_GET['outlet_id'] ) ) {
				$user_id = $_GET['outlet_id'];

				foreach ( $sections as $id => $label ) {
					echo '<li><a href="' . admin_url( 'admin.php?page=wc-pos-reports&outlet_id=' . $user_id . '&tab=order&report=' . $id ) . '" class="' . ( $current_section == $id ? 'current' : '' ) . '">' . $label . '</a> ' . ( end( $array_keys ) == $id ? '' : '|' ) . ' </li>';
				}
			} else {
				foreach ( $sections as $id => $label ) {
					echo '<li><a href="' . admin_url( 'admin.php?page=wc-pos-reports&tab=order&report=' . $id ) . '" class="' . ( $current_section == $id ? 'current' : '' ) . '">' . $label . '</a> ' . ( end( $array_keys ) == $id ? '' : '|' ) . ' </li>';
				}
			}
			echo '</ul>';
			echo "<form action=' ' method = 'GET' >";
			echo "<input type = 'hidden' value = 'wc-pos-reports' name = 'page'>";
			echo "<input type = 'hidden' value = 'order' name = 'tab'>";
			echo "<input type = 'hidden' value = $current_section name = 'report'>";
			echo "<input type = 'hidden' value = $range name = 'range'>";
			echo "<select name = 'payment'>";
			echo '<option value =  >' . __( 'All payment method', 'wc_pos' ) . '</option>';
			$selected = empty( ! $payment ) && $payment == 'cash' ? 'selected' : '';
			echo "<option value = 'cash'   $selected ?>" . __( '  Cash', 'wc_pos' ) . '</option>';
			$selected = empty( ! $payment ) && $payment == 'card' ? 'selected' : '';
			echo "<option value = 'card' $selected>" . __( ' Card ', 'wc_pos' ) . '</option>';
			foreach ( $custom_pos_payment_methods as $value ) {
				$selected = ! empty( $payment ) && $payment == $value['payment_slug'] ? esc_attr( 'selected' ) : '';
				echo '<option value =' . esc_attr( $value['payment_slug'] ) . " $selected>" . esc_attr( $value['payment_name'] ) . '</option>';
			}
			echo apply_filters( 'wkwcpos_payment_list', '' );
			echo '</select>';
			do_action( 'wkwcpos_add_custom_filter_for_report' );
			echo '<select name = "outlet_id" value = 1>';
			echo '<option value = >' . __( 'All outlet', 'wc_pos' ) . '</option>';

			$outlets = $this->wpdb->get_results( "SELECT id, outlet_name as name FROM $this->outlet_table" );
			foreach ( $outlets as $key => $value ) {
				$outlet      = $value->id;
				$outlet_name = $value->name;
				$selected    = empty( ! $outlet_id ) && $outlet_id == $outlet ? 'selected' : '';
				echo "<option value = '$outlet' $selected >" . $outlet_name . '</option>';
			}
			echo '</select>';
			echo '<input type="submit" class ="button" class="pos_button_css" value = "' . __( 'Apply', 'wc_pos' ) . '"> ';
			echo '</form>';
			do_action( 'wk_pos_report_order_section_pos_' . $current_section );
		}
	}
}
