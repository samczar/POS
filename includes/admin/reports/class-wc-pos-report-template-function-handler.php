<?php

namespace WKWC_POS\Includes\Admin\Reports;

use WKWC_POS\Templates\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Report_Template_Function_Handler' ) ) {

	/**
	*
	*/
	class WC_Pos_Report_Template_Function_Handler {
		/**
		* Add Menu in Backend
		*/

		public function wk_wc_pos_report_order() {

			new Admin\Reports\WC_Pos_Report_Order_Setting();

		}

		public function wk_wc_pos_report_customer() {

			$report_customer_list = new Admin\Reports\WC_Pos_Report_Customer_List();

			$report_customer_list->output_report();

		}

		public function wk_wc_pos_report_stock() {

			new Admin\Reports\WC_Pos_Report_Stock_Setting();

		}

		public function wk_wc_pos_report_tax() {

			new Admin\Reports\WC_Pos_Report_Tax_Setting();

		}

		public function wk_wc_pos_report_order_by_date() {

			$report_sales_by_date = new Admin\Reports\WC_Pos_Report_Sales_By_Date();

			$report_sales_by_date->output_report();

		}

		public function wk_wc_pos_report_order_by_product() {

			$report_sales_by_product = new Admin\Reports\WC_Pos_Report_Sales_By_Product();

			$report_sales_by_product->output_report();

		}

		public function wk_wc_pos_report_order_by_category() {

			$report_sales_by_category = new Admin\Reports\WC_Pos_Report_Sales_By_Category();

			$report_sales_by_category->output_report();

		}

		public function wk_wc_pos_report_order_by_coupon() {

			$report_coupon_usage = new Admin\Reports\WC_Pos_Report_Coupon_Usage();

			$report_coupon_usage->output_report();

		}

		public function wk_wc_pos_report_stock_low() {

			$report_low_in_stock = new Admin\Reports\WC_Pos_Report_Low_In_Stock();

			$report_low_in_stock->output_report();

		}

		public function wk_wc_pos_report_stock_out() {

			$report_out_of_stock = new Admin\Reports\WC_Pos_Report_Out_Of_Stock();

			$report_out_of_stock->output_report();

		}

		public function wk_wc_pos_report_stock_most() {

			$report_most_stocked = new Admin\Reports\WC_Pos_Report_Most_Stocked();

			$report_most_stocked->output_report();

		}

		public function wk_wc_pos_report_tax_by_code() {

			$report_taxes_by_code = new Admin\Reports\WC_Pos_Report_Taxes_By_Code();

			$report_taxes_by_code->output_report();

		}

		public function wk_wc_pos_report_tax_by_date() {

			$report_taxes_by_date = new Admin\Reports\WC_Pos_Report_Taxes_By_Date();

			$report_taxes_by_date->output_report();

		}

	}

}

