<?php

/**
 * @author Webkul
 *
 * @version 2.1.0
 * This file handles all admin end actions.
 */

namespace WKWC_POS\Includes\Admin;

use WKWC_POS\Includes\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Hook_Handler' ) ) {
	class WC_Pos_Hook_Handler {

		public function __construct() {
			$function_handler = new Admin\WC_Pos_Function_Handler();

			$report_function_handler = new Admin\Reports\WC_Pos_Report_Template_Function_Handler();

			add_action( 'init', array( $function_handler, 'wkwcpos_start_setup_wizard' ) );

			// admin menu
			add_action( 'admin_menu', array( $function_handler, 'wk_wc_pos_add_dashboard_menu' ), 99 );

			add_action( 'admin_init', array( $function_handler, 'wk_wc_pos_register_settings' ) );

			add_action( 'woocommerce_manage_pos_user', array( $function_handler, 'wk_wc_save_pos_user' ), 10, 1 );

			add_filter( 'woocommerce_screen_ids', array( $function_handler, 'add_pos_screen_ids' ), 10, 1 );

			add_action( 'woocommerce_manage_pos_outlet', array( $function_handler, 'wk_wc_save_pos_outlet' ), 10, 1 );

			// hooks for Add pos Outlet tab.
			add_action( 'wk_add_edit_pos_general', array( $function_handler, 'wk_wc_pos_outlet_general_settings' ), 1, 1 );
			add_action( 'wk_add_edit_pos_manage-products', array( $function_handler, 'wk_wc_pos_outlet_mgproducts_settings' ), 10, 1 );

			// hooks for basic settings of pos system.
			add_action( 'pos_general-settings', array( $function_handler, 'wk_wc_pos_general_settings' ), 10, 1 );
			add_action( 'pos_customer-settings', array( $function_handler, 'wk_wc_pos_customer_settings' ), 10, 1 );
			add_action( 'pos_payment-option', array( $function_handler, 'wk_wc_pos_payment_settings' ), 10, 1 );
			add_action( 'pos_printer-settings', array( $function_handler, 'wk_wc_pos_printer_settings' ), 10, 1 );

			//hook for pos report tab
			add_action( 'wk_pos_report_order', array( $report_function_handler, 'wk_wc_pos_report_order' ), 1, 1 );
			add_action( 'wk_pos_report_customer', array( $report_function_handler, 'wk_wc_pos_report_customer' ), 10, 1 );
			add_action( 'wk_pos_report_stock', array( $report_function_handler, 'wk_wc_pos_report_stock' ), 10, 1 );
			add_action( 'wk_pos_report_tax', array( $report_function_handler, 'wk_wc_pos_report_tax' ), 10, 1 );

			// hooks for pos report order.
			add_action( 'wk_pos_report_order_section_pos_date', array( $report_function_handler, 'wk_wc_pos_report_order_by_date' ), 1, 1 );
			add_action( 'wk_pos_report_order_section_pos_product', array( $report_function_handler, 'wk_wc_pos_report_order_by_product' ), 10, 1 );
			add_action( 'wk_pos_report_order_section_pos_sales_by_category', array( $report_function_handler, 'wk_wc_pos_report_order_by_category' ), 10, 1 );
			add_action( 'wk_pos_report_order_section_pos_coupon_usage', array( $report_function_handler, 'wk_wc_pos_report_order_by_coupon' ), 10, 1 );

			// hooks for pos report stock.
			add_action( 'wk_pos_report_stock_section_pos_1', array( $report_function_handler, 'wk_wc_pos_report_stock_low' ), 1, 1 );
			add_action( 'wk_pos_report_stock_section_pos_2', array( $report_function_handler, 'wk_wc_pos_report_stock_out' ), 10, 1 );
			add_action( 'wk_pos_report_stock_section_pos_3', array( $report_function_handler, 'wk_wc_pos_report_stock_most' ), 10, 1 );

			// hooks for pos report tax.
			add_action( 'wk_pos_report_tax_section_pos_1', array( $report_function_handler, 'wk_wc_pos_report_tax_by_code' ), 1, 1 );
			add_action( 'wk_pos_report_tax_section_pos_2', array( $report_function_handler, 'wk_wc_pos_report_tax_by_date' ), 10, 1 );

			$centralized_inventory_enabled = apply_filters( 'wk_wc_pos_enable_centralized_inventory', false );

			if ( ! $centralized_inventory_enabled ) {

				add_action( 'woocommerce_order_status_cancelled', array( $function_handler, 'wkwcpos_order_stock_restore' ) );

				add_action( 'pos_assign-mass-masterstock', array( $function_handler, 'wk_wc_pos_outlet_mass_assign_master_stock' ), 10, 1 );

				// Add a custom field to product bulk edit special page

				add_action( 'woocommerce_product_bulk_edit_start', array( $function_handler, 'wk_wc_pos_custom_field_product_bulk_edit' ), 10, 0 );

				// Save the custom fields data when submitted for product bulk edit

				add_action( 'woocommerce_product_bulk_edit_save', array( $function_handler, 'wk_wc_pos_save_custom_field_product_bulk_edit' ), 10, 1 );

				add_action( 'woocommerce_product_after_variable_attributes', array( $function_handler, 'wk_wc_pos_variation_settings_fields' ), 10, 3 );

				// Save Variation Settings
				add_action( 'woocommerce_save_product_variation', array( $function_handler, 'wk_wc_pos_save_variation_settings_fields' ), 10, 2 );
				add_action( 'woocommerce_product_options_inventory_product_data', array( $function_handler, 'wk_wc_pos_simple_woo_custom_fields' ) );

				add_action( 'save_post', array( $function_handler, 'wk_wc_pos_manage_product_master_stock' ), 10 );
			}

			add_action( 'save_post', array( $function_handler, 'wkwcpos_enable_product_in_outlet' ), 1 );

			add_action( 'admin_bar_menu', array( $function_handler, 'wk_wc_pos_admin_bar_menus' ), 10, 1 );
		}
	}
}
