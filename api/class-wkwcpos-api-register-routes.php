<?php
/**
 * WooCommerce POS API setup.
 *
 * @author   Webkul
 *
 * @category API
 *
 * @version    1.0.0
*/

namespace WKWC_POS\Api;

use WKWC_POS\Api\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register POS API Routes Class.
 *
 * @class WKWCPOS_API_Register_Routes
 */
class WKWCPOS_API_Register_Routes {

	/**
	 *  Constructor.
	 *
	 * @var object
	 */
	public function __construct() {

		$this->session_id           = new Includes\WKWCPOS_API_Get_Session_ID();
		$this->login                = new Includes\Login\WKWCPOS_API_Login_User();
		$this->category             = new Includes\Products\WKWCPOS_API_Product_Categories();
		$this->get_products         = new Includes\Products\WKWCPOS_API_Get_All_Products();
		$this->get_products_id      = new Includes\Products\WKWCPOS_API_Get_All_Products_Id();
		$this->customer             = new Includes\Customers\WKWCPOS_API_Get_Customers();
		$this->delete_customer      = new Includes\Customers\WKWCPOS_API_Delete_Customer();
		$this->create_customer      = new Includes\Customers\WKWCPOS_API_Create_Customer();
		$this->get_currencies       = new Includes\Misc\WKWCPOS_API_Get_Currencies();
		$this->get_countries        = new Includes\Misc\WKWCPOS_API_Get_Countries();
		$this->get_states           = new Includes\Misc\WKWCPOS_API_Get_States();
		$this->get_sale_history     = new Includes\Misc\WKWCPOS_API_Get_Sale_History();
		$this->create_drawer_perday = new Includes\Misc\WKWCPOS_API_Create_Drawer_Perday();
		$this->get_tax_details      = new Includes\Misc\WKWCPOS_API_Get_Tax_Details();
		$this->update_manager       = new Includes\Misc\WKWCPOS_API_Update_Manager();
		$this->custom_emails        = new Includes\Misc\WKWCPOS_API_Custom_Emails();
		$this->coupon_check         = new Includes\Orders\WKWCPOS_API_Coupon_Check();
		$this->stock_check          = new Includes\Orders\WKWCPOS_API_Product_Stock_Check();
		$this->create_order         = new Includes\Orders\WKWCPOS_API_Create_Order();
		$this->create_offline_order = new Includes\Orders\WKWCPOS_API_Create_Offline_Order();
		$this->get_orders           = new Includes\Orders\WKWCPOS_API_Get_Orders();
		$this->revenue_stats        = new Includes\Reports\Revenue\WKWCPOS_API_Revenue_Stats_Controller();
		$this->products_stats       = new Includes\Reports\Products\WKWCPOS_API_Products_Stats_Controller();
		$this->coupons_stats        = new Includes\Reports\Coupons\WKWCPOS_API_Coupons_Stats_Controller();
		$this->orders_stats         = new Includes\Reports\Orders\WKWCPOS_API_Orders_Stats_Controller();
		$this->taxes_stats          = new Includes\Reports\Taxes\WKWCPOS_API_Taxes_Stats_Controller();
		$this->payments_stats       = new Includes\Reports\Payments\WKWCPOS_API_Payments_Stats_Controller();
		$this->payment_modes        = new Includes\Payment\WKWCPOS_API_Get_Payment_Modes();
		$this->get_invoice_template = new Includes\Misc\WKWCPOS_API_Get_Invoice_Template();

		add_action( 'rest_api_init', array( $this, 'wkwcpos_register_api_routes' ) );

	}

	public function wkwcpos_register_api_routes() {

		//************GET-SESSION-ID API************//
		register_rest_route(
			$this->session_id->namespace,
			$this->session_id->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->session_id, 'get_session_id' ),
			)
		);
		//************GET-SESSION-ID API************//

		//************Login API************//
		register_rest_route(
			$this->login->namespace,
			$this->login->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->login, 'user_login' ),
			)
		);
		//************Login API************//

		//************GET-CATEGORIES API************//
		register_rest_route(
			$this->category->namespace,
			$this->category->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->category, 'get_all_categories' ),
			)
		);
		//************GET-CATEGORIES API************//

		//************GET-CUSTOMERS API************//
		register_rest_route(
			$this->customer->namespace,
			$this->customer->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->customer, 'get_customers' ),
			)
		);
		//************GET-CUSTOMERS API************//

		//************DELETE-CUSTOMER API************//
		register_rest_route(
			$this->delete_customer->namespace,
			$this->delete_customer->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->delete_customer, 'delete_customer' ),
			)
		);
		//************DELETE-CUSTOMER API************//

		//************CREATE-CUSTOMER API************//
		register_rest_route(
			$this->create_customer->namespace,
			$this->create_customer->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->create_customer, 'create_customer' ),
			)
		);
		//************CREATE-CUSTOMER API************//

		//************COUPON-CHECK API************//
		register_rest_route(
			$this->coupon_check->namespace,
			$this->coupon_check->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->coupon_check, 'check_coupon_online' ),
			)
		);
		//************COUPON-CHECK API************//

		//************GET-CURRENCIES API************//
		register_rest_route(
			$this->get_currencies->namespace,
			$this->get_currencies->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->get_currencies, 'get_currencies' ),
			)
		);
		//************GET-CURRENCIES API************//

		//************GET-COUNTRIES API************//
		register_rest_route(
			$this->get_countries->namespace,
			$this->get_countries->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->get_countries, 'get_list_of_countries' ),
			)
		);
		//************GET-COUNTRIES API************//

		//************GET-STATES API************//
		register_rest_route(
			$this->get_states->namespace,
			$this->get_states->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->get_states, 'get_list_of_states' ),
			)
		);
		//************GET-STATES API************//

		//************GET-Payment Modes API************//
		register_rest_route(
			$this->payment_modes->namespace,
			$this->payment_modes->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->payment_modes, 'get_list_of_payment_modes' ),
			)
		);
		//************GET-Payment Modes API************//

		//************SALARY-HISTORY API************//
		register_rest_route(
			$this->get_sale_history->namespace,
			$this->get_sale_history->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->get_sale_history, 'get_sale_history' ),
			)
		);
		//************SALARY-HISTORY API************//

		//************GET-TAX-DETAILS API************//
		register_rest_route(
			$this->get_tax_details->namespace,
			$this->get_tax_details->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->get_tax_details, 'get_tax_details' ),
			)
		);
		//************GET-TAX-DETAILS API************//

		//************GET-INVOICE-TEMPLATE API************//
		register_rest_route(
			$this->get_invoice_template->namespace,
			$this->get_invoice_template->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->get_invoice_template, 'get_invoice_template' ),
			)
		);
		//************GET-INVOICE-TEMPLATE API************//

		//************DRAWER-PERDAY API************//
		register_rest_route(
			$this->create_drawer_perday->namespace,
			$this->create_drawer_perday->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->create_drawer_perday, 'create_drawer_perday' ),
			)
		);
		//************DRAWER-PERDAY API************//

		//************UPDATE-POS-MANAGER API************//
		register_rest_route(
			$this->update_manager->namespace,
			$this->update_manager->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->update_manager, 'update_pos_manager' ),
			)
		);

		//************SEND CUSTOM EMAILS API************//
		register_rest_route(
			$this->custom_emails->namespace,
			$this->custom_emails->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->custom_emails, 'wkwc_send_custom_emails' ),
			)
		);
		//************UPDATE-POS-MANAGER API************//

		//************GET-POS-PRODUCTS-ID API************//
		register_rest_route(
			$this->get_products_id->namespace,
			$this->get_products_id->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->get_products_id, 'get_all_pos_products_id' ),
			)
		);
		//************GET-POS-PRODUCTS-ID API************//

		//************GET-PRODUCTS API************//
		register_rest_route(
			$this->get_products->namespace,
			$this->get_products->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->get_products, 'get_popular_products' ),
			)
		);
		//************GET-PRODUCTS API************//

		//************CHECK-PRODUCT-STOCK API************//
		register_rest_route(
			$this->stock_check->namespace,
			$this->stock_check->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->stock_check, 'wk_wc_pos_validate_product_stock' ),
			)
		);
		//************CHECK-PRODUCT-STOCK API************//

		//************CREATE-ORDERS API************//
		register_rest_route(
			$this->create_order->namespace,
			$this->create_order->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->create_order, 'create_pos_order' ),
			)
		);
		//************CREATE-ORDERS API************//

		//************CREATE-OFFLINE-ORDERS API************//
		register_rest_route(
			$this->create_offline_order->namespace,
			$this->create_offline_order->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->create_offline_order, 'create_offline_pos_order' ),
			)
		);
		//************CREATE-OFFLINE-ORDERS API************//

		//************GET-ORDERS API************//
		register_rest_route(
			$this->get_orders->namespace,
			$this->get_orders->base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this->get_orders, 'get_pos_order' ),
			)
		);
		//************GET-ORDERS API************//

		//************GET Report Revenue API************//
		register_rest_route(
			$this->revenue_stats->namespace,
			$this->revenue_stats->base,
			array(
				'methods'  => 'GET',
				'callback' => array( $this->revenue_stats, 'get_revenue_stats' ),
			)
		);
		//************GET-Report Revenue  API************//

		//************GET Report Products API************//
		register_rest_route(
			$this->products_stats->namespace,
			$this->products_stats->base,
			array(
				'methods'  => 'GET',
				'callback' => array( $this->products_stats, 'get_products_stats' ),
			)
		);
		//************GET-Report Products API************//

		//************GET Report Coupons API************//
		register_rest_route(
			$this->coupons_stats->namespace,
			$this->coupons_stats->base,
			array(
				'methods'  => 'GET',
				'callback' => array( $this->coupons_stats, 'get_coupons_stats' ),
			)
		);
		//************GET-Report Coupons API************//

		//************GET Report Orders API************//
		register_rest_route(
			$this->orders_stats->namespace,
			$this->orders_stats->base,
			array(
				'methods'  => 'GET',
				'callback' => array( $this->orders_stats, 'get_orders_stats' ),
			)
		);
		//************GET-Report Orders API************//

		//************GET Report Taxes API************//
		register_rest_route(
			$this->taxes_stats->namespace,
			$this->taxes_stats->base,
			array(
				'methods'  => 'GET',
				'callback' => array( $this->taxes_stats, 'get_taxes_stats' ),
			)
		);
		//************GET-Report Taxes API************//

		//************GET Report Payments API************//
		register_rest_route(
			$this->payments_stats->namespace,
			$this->payments_stats->base,
			array(
				'methods'  => 'GET',
				'callback' => array( $this->payments_stats, 'get_payments_stats' ),
			)
		);
		//************GET-Report Payments API************//

		do_action( 'wkwcpos_register_pos_rest_routes' );

	}
}
