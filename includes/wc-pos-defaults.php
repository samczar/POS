<?php

/**
 * Output a text input box.
 *
 * @param array $field
 */
function wkwcpos_text_input( $field ) {
	$field['placeholder']   = isset( $field['placeholder'] ) ? $field['placeholder'] : '';
	$field['class']         = isset( $field['class'] ) ? $field['class'] : 'short';
	$field['style']         = isset( $field['style'] ) ? $field['style'] : '';
	$field['wrapper_class'] = isset( $field['wrapper_class'] ) ? $field['wrapper_class'] : '';
	$field['value']         = isset( $field['value'] ) ? $field['value'] : '';
	$field['name']          = isset( $field['name'] ) ? $field['name'] : $field['id'];
	$field['type']          = isset( $field['type'] ) ? $field['type'] : 'text';
	$field['desc_tip']      = isset( $field['desc_tip'] ) ? $field['desc_tip'] : false;
	$field['min']           = isset( $field['min'] ) ? $field['min'] : '';
	$field['max']           = isset( $field['max'] ) ? $field['max'] : '';
	$field['required']      = isset( $field['required'] ) ? ( $field['required'] ? '*' : '' ) : '';
	$data_type              = empty( $field['data_type'] ) ? '' : $field['data_type'];

	switch ( $data_type ) {
		case 'price':
			$field['class'] .= ' wc_input_price';
			$field['value']  = wc_format_localized_price( $field['value'] );
			break;
		case 'decimal':
			$field['class'] .= ' wc_input_decimal';
			$field['value']  = wc_format_localized_decimal( $field['value'] );
			break;
		case 'stock':
			$field['class'] .= ' wc_input_stock';
			$field['value']  = wc_stock_amount( $field['value'] );
			break;
		case 'url':
			$field['class'] .= ' wc_input_url';
			$field['value']  = esc_url( $field['value'] );
			break;

		default:
			break;
	}

	// Custom attribute handling
	$custom_attributes = array();

	if ( ! empty( $field['custom_attributes'] ) && is_array( $field['custom_attributes'] ) ) {
		foreach ( $field['custom_attributes'] as $attribute => $value ) {
			$custom_attributes[] = esc_attr( $value );
		}
	}
	echo '<p class="form-field ' . esc_attr( $field['id'] ) . '_field ' . esc_attr( $field['wrapper_class'] ) . '">
	<label for="' . esc_attr( $field['id'] ) . '">' . wp_kses_post( $field['label'] ) . ' <b> ' . esc_attr( $field['required'] ) . ' </b></label>';

	echo '<input type="' . esc_attr( $field['type'] ) . '" min="' . esc_attr( $field['min'] ) . '"  max="' . esc_attr( $field['max'] ) . '" class="pos_input_css ' . esc_attr( $field['class'] ) . '" style="' . esc_attr( $field['style'] ) . 'width:400px;" name="' . esc_attr( $field['name'] ) . '" id="' . esc_attr( $field['id'] ) . '" value="' . esc_attr( $field['value'] ) . '" placeholder="' . esc_attr( $field['placeholder'] ) . '" ' . implode( ' ', $custom_attributes ) . ' /> ';

	if ( ! empty( $field['description'] ) && false !== $field['desc_tip'] ) {
		echo wc_help_tip( $field['description'] );
	}

	if ( ! empty( $field['description'] ) && false === $field['desc_tip'] ) {
		echo '<span class="description">' . wp_kses_post( $field['description'] ) . '</span>';
	}
	echo '</p>';
}

/**
 * Output a hidden input box.
 *
 * @param array $field
 */

/**
 * Output a textarea input box.
 *
 * @param array $field
 */
function wkwcpos_textarea_input( $field ) {
	$field['placeholder']   = isset( $field['placeholder'] ) ? $field['placeholder'] : '';
	$field['class']         = isset( $field['class'] ) ? $field['class'] : 'short';
	$field['style']         = isset( $field['style'] ) ? $field['style'] : '';
	$field['wrapper_class'] = isset( $field['wrapper_class'] ) ? $field['wrapper_class'] : '';
	$field['value']         = isset( $field['value'] ) ? $field['value'] : '';
	$field['desc_tip']      = isset( $field['desc_tip'] ) ? $field['desc_tip'] : false;
	$field['name']          = isset( $field['name'] ) ? $field['name'] : $field['id'];
	$field['rows']          = isset( $field['rows'] ) ? $field['rows'] : 2;
	$field['cols']          = isset( $field['cols'] ) ? $field['cols'] : 20;
	$field['required']      = isset( $field['required'] ) ? ( $field['required'] ? '*' : '' ) : '';

	// Custom attribute handling
	$custom_attributes = array();

	if ( ! empty( $field['custom_attributes'] ) && is_array( $field['custom_attributes'] ) ) {
		foreach ( $field['custom_attributes'] as $attribute => $value ) {
			$custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $value ) . '"';
		}
	}

	echo '<p class="form-field ' . esc_attr( $field['id'] ) . '_field ' . esc_attr( $field['wrapper_class'] ) . '">
	<label for="' . esc_attr( $field['id'] ) . '">' . wp_kses_post( $field['label'] ) . ' <b> ' . esc_attr( $field['required'] ) . ' </b></label>';

	echo '<textarea class="pos_input_css ' . esc_attr( $field['class'] ) . '" style="' . esc_attr( $field['style'] ) . 'width:400px; padding: 0 8px;"  name="' . esc_attr( $field['name'] ) . '" id="' . esc_attr( $field['id'] ) . '" placeholder="' . esc_attr( $field['placeholder'] ) . '" rows="' . esc_attr( $field['rows'] ) . '" cols="' . esc_attr( $field['cols'] ) . '" ' . implode( ' ', $custom_attributes ) . '>' . esc_textarea( $field['value'] ) . '</textarea> ';

	if ( ! empty( $field['description'] ) && false !== $field['desc_tip'] ) {
		echo wc_help_tip( $field['description'] );
	}

	if ( ! empty( $field['description'] ) && false === $field['desc_tip'] ) {
		echo '<span class="description">' . wp_kses_post( $field['description'] ) . '</span>';
	}
	echo '</p>';
}

/**
 * Output a checkbox input box.
 *
 * @param array $field
 */
function wkwcpos_checkbox( $field ) {
	$field['class']         = isset( $field['class'] ) ? $field['class'] : 'checkbox';
	$field['style']         = isset( $field['style'] ) ? $field['style'] : '';
	$field['wrapper_class'] = isset( $field['wrapper_class'] ) ? $field['wrapper_class'] : '';
	$field['value']         = isset( $field['value'] ) ? $field['value'] : '';
	$field['cbvalue']       = isset( $field['cbvalue'] ) ? $field['cbvalue'] : 'yes';
	$field['name']          = isset( $field['name'] ) ? $field['name'] : $field['id'];
	$field['desc_tip']      = isset( $field['desc_tip'] ) ? $field['desc_tip'] : false;

	// Custom attribute handling
	$custom_attributes = array();

	if ( ! empty( $field['custom_attributes'] ) && is_array( $field['custom_attributes'] ) ) {
		foreach ( $field['custom_attributes'] as $attribute => $value ) {
			$custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $value ) . '"';
		}
	}

	echo '<p class="form-field ' . esc_attr( $field['id'] ) . '_field ' . esc_attr( $field['wrapper_class'] ) . '">
		<label for="' . esc_attr( $field['id'] ) . '">' . wp_kses_post( $field['label'] ) . '</label>';

	echo '<input type="checkbox" class="' . esc_attr( $field['class'] ) . '" style="' . esc_attr( $field['style'] ) . '" name="' . esc_attr( $field['name'] ) . '" id="' . esc_attr( $field['id'] ) . '" value="' . esc_attr( $field['cbvalue'] ) . '" ' . checked( $field['value'], $field['cbvalue'], false ) . '  ' . implode( ' ', $custom_attributes ) . '/> ';

	if ( ! empty( $field['description'] ) && false !== $field['desc_tip'] ) {
		echo wc_help_tip( $field['description'] );
	}

	if ( ! empty( $field['description'] ) && false === $field['desc_tip'] ) {
		echo '<span class="description">' . wp_kses_post( $field['description'] ) . '</span>';
	}
	echo '</p>';
}

/**
 * Output a select input box.
 *
 * @param array $field
 */
function wkwcpos_select( $field ) {
	$field['class']         = isset( $field['class'] ) ? $field['class'] : 'select short';
	$field['style']         = isset( $field['style'] ) ? $field['style'] : '';
	$field['wrapper_class'] = isset( $field['wrapper_class'] ) ? $field['wrapper_class'] : '';
	$field['value']         = isset( $field['value'] ) ? $field['value'] : '';
	$field['name']          = isset( $field['name'] ) ? $field['name'] : $field['id'];
	$field['desc_tip']      = isset( $field['desc_tip'] ) ? $field['desc_tip'] : false;
	$field['required']      = isset( $field['required'] ) ? ( $field['required'] ? '*' : '' ) : '';

	// Custom attribute handling
	$custom_attributes = array();

	if ( ! empty( $field['custom_attributes'] ) && is_array( $field['custom_attributes'] ) ) {
		foreach ( $field['custom_attributes'] as $attribute => $value ) {
			$custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $value ) . '"';
		}
	}

	echo '<p class="form-field ' . esc_attr( $field['id'] ) . '_field ' . esc_attr( $field['wrapper_class'] ) . '">
		<label for="' . esc_attr( $field['id'] ) . '">' . wp_kses_post( $field['label'] ) . ' <b> ' . esc_attr( $field['required'] ) . ' </b></label>';

	echo '<select id="' . esc_attr( $field['id'] ) . '" name="' . esc_attr( $field['name'] ) . '" class="pos_input_css ' . esc_attr( $field['class'] ) . '" style="' . esc_attr( $field['style'] ) . 'width:400px; padding: 0 8px;" ' . implode( ' ', $custom_attributes ) . '>';
	if ( is_array( $field['value'] ) ) {
		foreach ( $field['options'] as $key => $value ) {
			if ( in_array( $key, $field['value'] ) ) {
				echo '<option value="' . esc_attr( $key ) . '" selected=selected>' . esc_html( $value ) . '</option>';
			} else {
				echo '<option value="' . esc_attr( $key ) . '">' . esc_html( $value ) . '</option>';
			}
		}
	} else {
		foreach ( $field['options'] as $key => $value ) {
			echo '<option value="' . esc_attr( $key ) . '" ' . selected( esc_attr( $field['value'] ), esc_attr( $key ), false ) . '>' . esc_html( $value ) . '</option>';
		}
	}
	if ( ! empty( $field['description'] ) && false !== $field['desc_tip'] ) {
		echo wc_help_tip( $field['description'] );
	}

	if ( ! empty( $field['description'] ) && false === $field['desc_tip'] ) {
		echo '<span class="description">' . wp_kses_post( $field['description'] ) . '</span>';
	}

	echo '</select> ';

	echo '</p>';
}

/**
 * Output a radio input box.
 *
 * @param array $field
 */
function wkwcpos_get_all_pos_variable() {
	$email_send                        = __( 'Email Send Successfully', 'wc_pos' );
	$refund_text                       = __( 'Refunded Amount', 'wc_pos' );
	$product_name_text                 = __( 'Product Name', 'wc_pos' );
	$empty_default_customer            = __( 'Please select customer for this order', 'wc_pos' );
	$note_text                         = __( 'Note ', 'wc_pos' );
	$currency                          = __( 'USD', 'wc_pos' );
	$warning_text                      = __( 'Warning!', 'wc_pos' );
	$success_text                      = __( 'Success', 'wc_pos' );
	$cart_added_success_msg            = __( 'Cart has been added succesfully.', 'wc_pos' );
	$cart_deleted_success_msg          = __( 'Cart has been deleted succesfully.', 'wc_pos' );
	$already_products_in_cart_for_hold = __( 'There are products in your current cart, kindly process them first.', 'wc_pos' );
	$validated_text                    = __( 'This field is validated', 'wc_pos' );
	$order_note_enter_text             = __( 'Enter Order Note', 'wc_pos' );
	$order_note_text                   = __( 'Order Note', 'wc_pos' );
	$order_heading_text                = __( 'Order ID', 'wc_pos' );
	$order_date_heading_text           = __( 'Order Date', 'wc_pos' );
	$customer_heading_text             = __( 'Customer', 'wc_pos' );
	$text_empty_cart                   = __( 'The cart is empty', 'wc_pos' );
	$text_empty_hold                   = __( 'You can not put empty cart on hold!', 'wc_pos' );
	$discount_text                     = __( 'Discount', 'wc_pos' );
	$tax_text                          = __( 'Tax', 'wc_pos' );
	$balance_text                      = __( 'Change', 'wc_pos' );
	$total_text                        = __( 'Total', 'wc_pos' );
	$payment_text                      = __( 'Payable Amount', 'wc_pos' );
	$notice_text                       = __( 'Notice', 'wc_pos' );
	$coupon_text                       = __( 'Coupon', 'wc_pos' );
	$apply_text                        = __( 'Apply', 'wc_pos' );
	$delete_text                       = __( 'Delete', 'wc_pos' );
	$edit_text                         = __( 'Edit', 'wc_pos' );
	$add_customer_text                 = __( 'Add Customer', 'wc_pos' );
	$button_cart                       = __( 'Add to cart', 'wc_pos' );
	$proceed_text                      = __( 'Proceed', 'wc_pos' );
	$order_notify_text                 = __( 'This process will generate an order depending upon the status Online or Offline. Do you still wanna do it.?', 'wc_pos' );
	$no_note_text                      = __( 'No note', 'wc_pos' );
	$err_text                          = __( 'Error', 'wc_pos' );
	$cancel_btn_text                   = __( 'Cancel', 'wc_pos' );
	$coupon_validate_text              = __( "Please don't keep coupon code field empty.", 'wc_pos' );
	$product_validate_text             = __( "Please don't keep any field empty.", 'wc_pos' );
	$text_item_detail                  = __( 'Hold Order', 'wc_pos' );
	$hold_cart_text                    = __( 'Hold Cart', 'wc_pos' );
	$cart_detail                       = __( 'Cart', 'wc_pos' );
	$select_category_text              = __( 'Select a category from the list below', 'wc_pos' );
	$list_category_text                = __( 'Listing Category', 'wc_pos' );
	$currency_not_availabel_txt        = __( 'Currency Not available', 'wc_pos' );
	$pos_currency_text                 = __( 'POS Currency', 'wc_pos' );
	$form_field_validate               = __( 'Above form fields are not correct', 'wc_pos' );
	$updating_account_text             = __( 'Updating account', 'wc_pos' );
	$account_update_success_text       = __( 'Account has been updated successfully', 'wc_pos' );
	$customer_update_success_text      = __( 'Customer has been updated successfully', 'wc_pos' );
	$customer_added_success_text       = __( 'Customer has been added successfully', 'wc_pos' );
	$setting_update_success_text       = __( 'Setting has been updated successfully', 'wc_pos' );
	$confirmation_text                 = __( 'Confirmation', 'wc_pos' );
	$create_new_customer_text          = __( 'Creating New Customer', 'wc_pos' );
	$update_existing_customer_text     = __( 'Updating Existing Customer', 'wc_pos' );
	$drawer_text                       = __( 'Please enter opening amount for cash drawer.', 'wc_pos' );
	$drawer_closed_text                = __( 'Drawer Closed Successfully.', 'wc_pos' );
	$closing_drawer_text               = __( 'Closing drawer...', 'wc_pos' );
	$drawer_validate_text              = __( 'Please enter valid opening cash amount.', 'wc_pos' );
	$delete_customer_title_text        = __( 'Delete Customer', 'wc_pos' );
	$deleting_customer_title_text      = __( 'Deleting Customer', 'wc_pos' );
	$save_customer_text                = __( 'Save Customer', 'wc_pos' );
	$search_order_text                 = __( 'Search order by id, customer', 'wc_pos' );
	$offline_search_order_text         = __( 'Search offline order by id', 'wc_pos' );
	$printInvoice_text                 = __( 'Print Invoice', 'wc_pos' );
	$sale_summary_text                 = __( 'Sale Summary', 'wc_pos' );
	$sub_total_text                    = __( 'Sub Total', 'wc_pos' );
	$unit_text                         = __( 'Unit(s)', 'wc_pos' );
	$logout_heading                    = __( 'Logout', 'wc_pos' );
	$confirm_logout_text               = __( 'Are you sure you want to logout?', 'wc_pos' );
	$processing_order_text             = __( 'Processing Order', 'wc_pos' );
	$error_coupon_offline              = __( 'Warning: Coupon is either invalid, expired or reached its usage limit!', 'wc_pos' );
	$searching_product_text            = __( 'Searching Products', 'wc_pos' );
	$error_load_products               = __( 'Could not load products', 'wc_pos' );
	$text_loading_populars             = __( 'Loading Populars', 'wc_pos' );
	$error_load_populars               = __( 'Could not load popular products', 'wc_pos' );
	$text_loading_orders               = __( 'Loading Orders', 'wc_pos' );
	$error_load_orders                 = __( 'Could not load orders', 'wc_pos' );
	$text_loading_customers            = __( 'Loading Customers', 'wc_pos' );
	$error_load_customers              = __( 'Could not load customers', 'wc_pos' );
	$error_offline_customer            = __( 'Cannot add, edit, delete customer in offline mode', 'wc_pos' );
	$error_offline_account             = __( 'Cannot update account in offline mode', 'wc_pos' );
	$text_loading_categories           = __( 'Loading Categories', 'wc_pos' );
	$error_load_categories             = __( 'Could not load categories', 'wc_pos' );
	$text_loading                      = __( 'Loading...', 'wc_pos' );
	$button_upload                     = __( 'Upload File', 'wc_pos' );
	$text_product_options              = __( "Fill the product's options", 'wc_pos' );
	$error_keyword                     = __( 'Old Password is wrong.', 'wc_pos' );
	$error_products                    = __( 'No products found', 'wc_pos' );
	$text_online_mode                  = __( 'You have successfully entered online mode', 'wc_pos' );
	$error_enter_online                = __( 'You can not enter online mode as you are disconnected', 'wc_pos' );
	$text_offline_mode                 = __( 'You are About to enter offline mode', 'wc_pos' );
	$error_no_category_product         = __( 'No products found in this category', 'wc_pos' );
	$error_no_customer                 = __( 'No customer found', 'wc_pos' );
	$error_no_category_order           = __( 'No orders found ', 'wc_pos' );
	$text_select_customer              = __( 'You have successfully selected a customer for checkout', 'wc_pos' );
	$error_customer_add                = __( 'You can not add a new customer as you are offline right now', 'wc_pos' );
	$text_remove_customer              = __( 'You have successfully selected guest for checkout', 'wc_pos' );
	$error_checkout                    = __( 'Add atleast one product to checkout', 'wc_pos' );
	$text_balance_due                  = __( 'Balance due:', 'wc_pos' );
	$text_order_success                = __( 'The order has been successfully placed', 'wc_pos' );
	$text_sync_order                   = __( 'Sync. all offline orders', 'wc_pos' );
	$sync_process_text                 = __( 'Syncing Offline Order(s)', 'wc_pos' );
	$sync_success_text                 = __( 'All orders are synced', 'wc_pos' );
	$text_sync_single_order            = __( 'Sync Offline Orders', 'wc_pos' );
	$text_no_orders                    = __( 'No Orders Available', 'wc_pos' );
	$order_note_empty                  = __( 'order note empty', 'wc_pos' );
	$error_sync_orders                 = __( 'You can not synchronize orders as you are offline right now', 'wc_pos' );
	$text_another_cart                 = __( 'You have selected another cart for checkout', 'wc_pos' );
	$text_cart_deleted                 = __( 'The current cart has been successfully deleted', 'wc_pos' );
	$text_current_deleted              = __( 'The cart has been successfully deleted', 'wc_pos' );
	$text_cart_empty                   = __( 'The cart is empty', 'wc_pos' );
	$text_cart_add                     = __( 'The current cart is put on hold and a new cart successfully added', 'wc_pos' );
	$text_option_required              = __( 'Fill all the required options to continue adding this product to the cart', 'wc_pos' );
	$text_product_not_added            = __( '%product-name% could not be added to the cart', 'wc_pos' );
	$text_no_quantity                  = __( 'The quantity for %product-name% is not available', 'wc_pos' );
	$cash_payment_title                = __( 'Cash Payment', 'wc_pos' );
	$text_all_products                 = __( 'All Products', 'wc_pos' );
	$invalid_percentage                = __( 'Invalid Percentage value, must be less than or equal to 100', 'wc_pos' );
	$invalid_discount                  = __( 'Discount cannot be applied due to invalid total amount', 'wc_pos' );
	$coupon_code_enter_text            = __( 'Enter Coupon Code', 'wc_pos' );
	$apply_coupon_text                 = __( 'Apply Coupon', 'wc_pos' );
	$apply_coupon_error                = __( 'First add product in cart', 'wc_pos' );
	$applying_coupon_text              = __( 'Applying Coupon', 'wc_pos' );
	$coupon_applied_text               = __( 'Coupon applied successfully', 'wc_pos' );
	$barcode_enter_text                = __( 'Enter Barcode', 'wc_pos' );
	$offline_text                      = __( 'Offline', 'wc_pos' );
	$online_text                       = __( 'Online', 'wc_pos' );
	$coupon_offline_notification       = __( 'Coupon cannot be applied on offline mode', 'wc_pos' );
	$coupon_remove_notification        = __( 'Coupon removed successfully', 'wc_pos' );
	$coupon_remove_error_notification  = __( 'Error occurred while removing Coupon. Please try again', 'wc_pos' );
	$text_search                       = __( 'Search', 'wc_pos' );
	$text_option_notifier              = __( 'Select Variation from the list below', 'wc_pos' );
	$text_low_stock                    = __( 'This product is having low stock.', 'wc_pos' );
	$text_special_price                = __( 'This product is on discount.', 'wc_pos' );
	$text_cust_delete                  = __( 'Are you sure you want to delete customer?', 'wc_pos' );
	$change_customer_text              = __( 'Want to Change the Customer?', 'wc_pos' );
	$change_customer_title_text        = __( 'Change Customer', 'wc_pos' );
	$okay_text                         = __( 'Okay', 'wc_pos' );
	$invalid_paid_amt                  = __( 'Entered amount cannot be paid', 'wc_pos' );
	$error_no_orders                   = __( 'No orders available', 'wc_pos' );
	$text_loading_shipping_cost        = __( 'Calculating Shipping Cost', 'wc_pos' );
	$shipping_text                     = __( 'Shipping', 'wc_pos' );
	$tax_total_text                    = __( 'Tax Total', 'wc_pos' );
	$add_product_add                   = __( 'Add New Product', 'wc_pos' );
	$add_product_name                  = __( 'Product Name', 'wc_pos' );
	$add_product_price                 = __( 'Product Price', 'wc_pos' );
	$add_product_quantity              = __( 'Product Quantity', 'wc_pos' );
	$validate_product_quantity         = __( 'Please enter a valid Quantity', 'wc_pos' );
	$validate_product_price            = __( 'Please enter a valid Price', 'wc_pos' );
	$add_text                          = __( 'Add', 'wc_pos' );
	$validate_product_name_len         = __( 'Product name length must be more 3', 'wc_pos' );
	$reset                             = __( 'Reset', 'wc_pos' );
	$reset_cart                        = __( 'Reset Cart', 'wc_pos' );
	$orders                            = __( 'Orders', 'wc_pos' );
	$home                              = __( 'Home', 'wc_pos' );
	$cashier                           = __( 'Cashier', 'wc_pos' );
	$cash_text                         = __( 'Cash', 'wc_pos' );
	$card_text                         = __( 'Other Payments', 'wc_pos' );
	$customers                         = __( 'Customers', 'wc_pos' );
	$settings                          = __( 'Settings', 'wc_pos' );
	$opening_drawer_amount             = __( 'Opening Drawer Amount', 'wc_pos' );
	$today_cash_sale                   = __( 'Today Cash Sale', 'wc_pos' );
	$today_card_sale                   = __( 'Today Other Payment Sale', 'wc_pos' );
	$time                              = __( 'Time', 'wc_pos' );
	$order_total                       = __( 'Order Total', 'wc_pos' );
	$payment_mode                      = __( 'Payment Mode', 'wc_pos' );
	$drawer_amount_details             = __( 'Drawer Account Summary', 'wc_pos' );
	$opening_amount                    = __( 'Opening Amount', 'wc_pos' );
	$today_sale                        = __( 'Today Sale', 'wc_pos' );
	$expected_amount_in_drawer         = __( 'Expected Amount in Drawer', 'wc_pos' );
	$counted_drawer_amount             = __( 'Counted Drawer Amount', 'wc_pos' );
	$remarks                           = __( 'Remarks', 'wc_pos' );
	$closing_drawer_detail             = __( 'Closing Drawer Detail', 'wc_pos' );
	$difference_between_closing_and_opening_Amount = __( 'Difference', 'wc_pos' );
	$close_drawer                                  = __( 'Close Drawer', 'wc_pos' );
	$cash_balance                                  = __( 'Cash balance', 'wc_pos' );
	$date                                    = __( 'Date', 'wc_pos' );
	$card_sale                               = __( 'Other Payments', 'wc_pos' );
	$cash_sale                               = __( 'Cash Sale', 'wc_pos' );
	$total_sale                              = __( 'Total Sale', 'wc_pos' );
	$drawer_note                             = __( 'Drawer Note', 'wc_pos' );
	$close_counter                           = __( 'Close Counter', 'wc_pos' );
	$today_cash                              = __( 'Today Cash', 'wc_pos' );
	$sale_history                            = __( 'Sale History', 'wc_pos' );
	$hold_sale                               = __( 'Hold Sale', 'wc_pos' );
	$offline_sale                            = __( 'Offline Sale', 'wc_pos' );
	$customer_name                           = __( 'Customer Name', 'wc_pos' );
	$customer_phone                          = __( 'Customer Phone', 'wc_pos' );
	$customer_email                          = __( 'Customer Email', 'wc_pos' );
	$address                                 = __( 'Address', 'wc_pos' );
	$first_name                              = __( 'First name', 'wc_pos' );
	$last_name                               = __( 'Last name', 'wc_pos' );
	$billing_email                           = __( 'Billing Email', 'wc_pos' );
	$address_1                               = __( 'Address 1', 'wc_pos' );
	$address_2                               = __( 'Address 2', 'wc_pos' );
	$country                                 = __( 'Country', 'wc_pos' );
	$state                                   = __( 'State', 'wc_pos' );
	$city                                    = __( 'City', 'wc_pos' );
	$pincode                                 = __( 'Pincode', 'wc_pos' );
	$phone                                   = __( 'Phone', 'wc_pos' );
	$customer_name_empty_validation          = __( 'Customer name cannot be empty', 'wc_pos' );
	$customer_phone_empty_validation         = __( 'Customer phone cannot be empty', 'wc_pos' );
	$customer_email_empty_validation         = __( 'Customer email cannot be empty', 'wc_pos' );
	$customer_phone_type_validation          = __( 'Only Numbers allowed', 'wc_pos' );
	$customer_phone_valid_validation         = __( 'Not a valid phone number', 'wc_pos' );
	$customer_email_valid_validation         = __( 'Customer email is not valid', 'wc_pos' );
	$customer_pincode_valid_validation       = __( 'Customer pincode is not valid', 'wc_pos' );
	$customer_city_valid_validation          = __( 'Customer city is not valid', 'wc_pos' );
	$customer_billing_email_valid_validation = __( 'Customer billing email is not valid', 'wc_pos' );
	$pos_first_name_empty_validation         = __( 'First name is not valid', 'wc_pos' );
	$pos_last_name_empty_validation          = __( 'Last name is not valid', 'wc_pos' );
	$pos_email_empty_validation              = __( 'Pos manager email cannot be empty', 'wc_pos' );
	$pos_email_valid_validation              = __( 'Pos manager email is not valid', 'wc_pos' );
	$pos_old_pswd_empty_validation           = __( 'Old password cannot be empty', 'wc_pos' );
	$pos_new_pswd_empty_validation           = __( 'New password cannot be empty', 'wc_pos' );
	$pos_cnf_pswd_empty_validation           = __( 'Confirm password cannot be empty', 'wc_pos' );
	$pos_cnf_pswd_same_validation            = __( 'Both password is not same', 'wc_pos' );

	$account_settings       = __( 'Account Settings', 'wc_pos' );
	$other_settings         = __( 'Other Settings', 'wc_pos' );
	$email_text             = __( 'Email', 'wc_pos' );
	$previous_password      = __( 'Previous Password', 'wc_pos' );
	$new_password           = __( 'New Password', 'wc_pos' );
	$confirm_password       = __( 'Confirm Password', 'wc_pos' );
	$update_account         = __( 'Update Account', 'wc_pos' );
	$select_currency        = __( 'Select Currency', 'wc_pos' );
	$select_invoice_printer = __( 'Select Invoice Printer', 'wc_pos' );
	$select_language        = __( 'Select Language', 'wc_pos' );
	$english                = __( 'English', 'wc_pos' );
	$save_settings          = __( 'Save Settings', 'wc_pos' );
	$only_letters           = __( 'Only letters', 'wc_pos' );
	$tendered               = __( 'Tendered', 'wc_pos' );
	$split_payment_text     = __( 'Split Payment', 'wc_pos' );
	$change                 = __( 'Change', 'wc_pos' );
	$clear                  = __( 'C', 'wc_pos' );
	$other_payment_title    = __( 'Other Payments', 'wc_pos' );
	$subtotal_text          = __( 'Subtotal', 'wc_pos' );
	$order_summary          = __( 'Order Summary', 'wc_pos' );
	$tax_text               = __( 'Tax', 'wc_pos' );
	$order_text             = __( 'Order', 'wc_pos' );
	$customer_text          = __( 'Customer', 'wc_pos' );
	$confirm_payment        = __( 'Confirm Payment', 'wc_pos' );
	$generate_invoice       = __( 'Generate Invoice', 'wc_pos' );
	//$order_note_text              = __( 'Add order note here', 'wc_pos' );
	$sync_orders                  = __( 'Sync Orders', 'wc_pos' );
	$no_sync_orders               = __( ' No offline order to Sync', 'wc_pos' );
	$reloading_text               = __( 'Reloading data', 'wc_pos' );
	$loading_categories_text      = __( 'Loading Categories', 'wc_pos' );
	$loading_countries_text       = __( 'Loading Countries', 'wc_pos' );
	$loading_states_text          = __( 'Loading States', 'wc_pos' );
	$loading_currencies           = __( 'Loading Currencies', 'wc_pos' );
	$loading_sale_text            = __( 'Loading sales', 'wc_pos' );
	$upadting_manager_text        = __( 'Updating Manager details', 'wc_pos' );
	$loading_tax_text             = __( 'Loading Tax', 'wc_pos' );
	$grand_total_text             = __( 'Grand Total', 'wc_pos' );
	$remove_not_valid_products    = __( ' out of stock now, please remove them from cart.', 'wc_pos' );
	$is                           = __( ' is', 'wc_pos' );
	$are                          = __( ' are', 'wc_pos' );
	$payment_detail               = __( 'Payment Detail', 'wc_pos' );
	$pay_by_cash_text             = __( 'Pay By Cash', 'wc_pos' );
	$pay_by_card_text             = __( 'Pay By Other', 'wc_pos' );
	$discount_title_text          = __( 'Apply discount to sale', 'wc_pos' );
	$pay_text                     = __( 'Pay', 'wc_pos' );
	$customer_delete_success_text = __( 'Customer has been deleted successfully', 'wc_pos' );
	$quantity_text                = __( 'Quantity', 'wc_pos' );
	$unit_price_text              = __( 'Unit Price', 'wc_pos' );
	$total_price_text             = __( 'Total Price', 'wc_pos' );
	$send_to                      = __( 'Do you want to send this order via mail to: ', 'wc_pos' );
	$customer_name                = __( 'Customer name : ', 'wc_pos' );
	$email_text1                  = __( ' Email : ', 'wc_pos' );
	$send_email                   = __( 'Send order email', 'wc_pos' );

	$data = array(
		'send_email'                                    => $send_email,
		'email_text1'                                   => $email_text1,
		'customer_name'                                 => $customer_name,
		'send_to'                                       => $send_to,
		'email_send'                                    => $email_send,
		'empty_default_customer'                        => $empty_default_customer,
		'product_name_text'                             => $product_name_text,
		'quantity_text'                                 => $quantity_text,
		'unit_price_text'                               => $unit_price_text,
		'total_price_text'                              => $total_price_text,
		'cart_added_success_msg'                        => $cart_added_success_msg,
		'already_products_in_cart_for_hold'             => $already_products_in_cart_for_hold,
		'cart_deleted_success_msg'                      => $cart_deleted_success_msg,
		'customer_delete_success_text'                  => $customer_delete_success_text,
		'customer_update_success_text'                  => $customer_update_success_text,
		'customer_added_success_text'                   => $customer_added_success_text,
		'pos_cnf_pswd_same_validation'                  => $pos_cnf_pswd_same_validation,
		'pay_text'                                      => $pay_text,
		'discount_title_text'                           => $discount_title_text,
		'apply_text'                                    => $apply_text,
		'pay_by_cash_text'                              => $pay_by_cash_text,
		'pay_by_card_text'                              => $pay_by_card_text,
		'payment_detail'                                => $payment_detail,
		'hold_cart_text'                                => $hold_cart_text,
		'is'                                            => $is,
		'are'                                           => $are,
		'remove_not_valid_products'                     => $remove_not_valid_products,
		'grand_total_text'                              => $grand_total_text,
		'loading_tax_text'                              => $loading_tax_text,
		'upadting_manager_text'                         => $upadting_manager_text,
		'loading_sale_text'                             => $loading_sale_text,
		'loading_currencies'                            => $loading_currencies,
		'loading_states_text'                           => $loading_states_text,
		'loading_countries_text'                        => $loading_countries_text,
		'loading_categories_text'                       => $loading_categories_text,
		'reloading_text'                                => $reloading_text,
		'cash_text'                                     => $cash_text,
		'card_text'                                     => $card_text,
		'split_payment_text'                            => $split_payment_text,
		'customer_city_valid_validation'                => $customer_city_valid_validation,
		'customer_pincode_valid_validation'             => $customer_pincode_valid_validation,
		'no_sync_orders'                                => $no_sync_orders,
		'sync_orders'                                   => $sync_orders,
		'hold_sale'                                     => $hold_sale,
		'offline_sale'                                  => $offline_sale,
		'note_text'                                     => $note_text,
		'order_date_heading_text'                       => $order_date_heading_text,
		'order_note_text'                               => $confirm_payment,
		'confirm_payment'                               => $confirm_payment,
		'generate_invoice'                              => $generate_invoice,
		'customer_text'                                 => $customer_text,
		'order_text'                                    => $order_text,
		'order_summary'                                 => $order_summary,
		'subtotal_text'                                 => $subtotal_text,
		'other_payment_title'                           => $other_payment_title,
		'clear'                                         => $clear,
		'change'                                        => $change,
		'tendered'                                      => $tendered,
		'only_letters'                                  => $only_letters,
		'pos_first_name_empty_validation'               => $pos_first_name_empty_validation,
		'pos_last_name_empty_validation'                => $pos_last_name_empty_validation,
		'pos_email_empty_validation'                    => $pos_email_empty_validation,
		'pos_email_valid_validation'                    => $pos_email_valid_validation,
		'pos_old_pswd_empty_validation'                 => $pos_old_pswd_empty_validation,
		'pos_new_pswd_empty_validation'                 => $pos_new_pswd_empty_validation,
		'pos_cnf_pswd_empty_validation'                 => $pos_cnf_pswd_empty_validation,
		'account_settings'                              => $account_settings,
		'other_settings'                                => $other_settings,
		'email_text'                                    => $email_text,
		'previous_password'                             => $previous_password,
		'new_password'                                  => $new_password,
		'confirm_password'                              => $confirm_password,
		'update_account'                                => $update_account,
		'select_currency'                               => $select_currency,
		'select_language'                               => $select_language,
		'english'                                       => $english,
		'save_settings'                                 => $save_settings,
		'select_invoice_printer'                        => $select_invoice_printer,
		'edit_text'                                     => $edit_text,
		'customer_name_empty_validation'                => $customer_name_empty_validation,
		'customer_phone_empty_validation'               => $customer_phone_empty_validation,
		'customer_email_empty_validation'               => $customer_email_empty_validation,
		'customer_phone_type_validation'                => $customer_phone_type_validation,
		'customer_phone_valid_validation'               => $customer_phone_valid_validation,
		'customer_email_valid_validation'               => $customer_email_valid_validation,
		'customer_billing_email_valid_validation'       => $customer_billing_email_valid_validation,
		'customer_name'                                 => $customer_name,
		'customer_phone'                                => $customer_phone,
		'customer_email'                                => $customer_email,
		'address'                                       => $address,
		'first_name'                                    => $first_name,
		'last_name'                                     => $last_name,
		'billing_email'                                 => $billing_email,
		'address_1'                                     => $address_1,
		'address_2'                                     => $address_2,
		'country'                                       => $country,
		'state'                                         => $state,
		'city'                                          => $city,
		'pincode'                                       => $pincode,
		'phone'                                         => $phone,
		'sale_history'                                  => $sale_history,
		'today_cash'                                    => $today_cash,
		'close_counter'                                 => $close_counter,
		'total_sale'                                    => $total_sale,
		'drawer_note'                                   => $drawer_note,
		'cash_sale'                                     => $cash_sale,
		'card_sale'                                     => $card_sale,
		'date'                                          => $date,
		'cash_balance'                                  => $cash_balance,
		'drawer_amount_details'                         => $drawer_amount_details,
		'opening_amount'                                => $opening_amount,
		'today_sale'                                    => $today_sale,
		'expected_amount_in_drawer'                     => $expected_amount_in_drawer,
		'counted_drawer_amount'                         => $counted_drawer_amount,
		'remarks'                                       => $remarks,
		'closing_drawer_detail'                         => $closing_drawer_detail,
		'difference_between_closing_and_opening_Amount' => $difference_between_closing_and_opening_Amount,
		'close_drawer'                                  => $close_drawer,
		'payment_mode'                                  => $payment_mode,
		'order_total'                                   => $order_total,
		'time'                                          => $time,
		'today_card_sale'                               => $today_card_sale,
		'today_cash_sale'                               => $today_cash_sale,
		'opening_drawer_amount'                         => $opening_drawer_amount,
		'reset'                                         => $reset,
		'reset_cart'                                    => $reset_cart,
		'orders'                                        => $orders,
		'home'                                          => $home,
		'cashier'                                       => $cashier,
		'customers'                                     => $customers,
		'currency'                                      => $currency,
		'settings'                                      => $settings,
		'warning_text'                                  => $warning_text,
		'success_text'                                  => $success_text,
		'validated_text'                                => $validated_text,
		'order_note_enter_text'                         => $order_note_enter_text,
		'order_note_text'                               => $order_note_text,
		'order_heading_text'                            => $order_heading_text,
		'customer_heading_text'                         => $customer_heading_text,
		'text_empty_cart'                               => $text_empty_cart,
		'text_empty_hold'                               => $text_empty_hold,
		'discount_text'                                 => $discount_text,
		'tax_text'                                      => $tax_text,
		'shipping_text'                                 => $shipping_text,
		'tax_total_text'                                => $tax_total_text,
		'balance_text'                                  => $balance_text,
		'total_text'                                    => $total_text,
		'payment_text'                                  => $payment_text,
		'notice_text'                                   => $notice_text,
		'coupon_text'                                   => $coupon_text,
		'delete_text'                                   => $delete_text,
		'cart_detail'                                   => $cart_detail,
		'add_customer_text'                             => $add_customer_text,
		'proceed_text'                                  => $proceed_text,
		'order_notify_text'                             => $order_notify_text,
		'no_note_text'                                  => $no_note_text,
		'err_text'                                      => $err_text,
		'cancel_btn_text'                               => $cancel_btn_text,
		'coupon_validate_text'                          => $coupon_validate_text,
		'product_validate_text'                         => $product_validate_text,
		'select_category_text'                          => $select_category_text,
		'list_category_text'                            => $list_category_text,
		'currency_not_availabel_txt'                    => $currency_not_availabel_txt,
		'pos_currency_text'                             => $pos_currency_text,
		'form_field_validate'                           => $form_field_validate,
		'updating_account_text'                         => $updating_account_text,
		'account_update_success_text'                   => $account_update_success_text,
		'setting_update_success_text'                   => $setting_update_success_text,
		'confirmation_text'                             => $confirmation_text,
		'create_new_customer_text'                      => $create_new_customer_text,
		'update_existing_customer_text'                 => $update_existing_customer_text,
		'drawer_text'                                   => $drawer_text,
		'drawer_closed_text'                            => $drawer_closed_text,
		'closing_drawer_text'                           => $closing_drawer_text,
		'drawer_validate_text'                          => $drawer_validate_text,
		'delete_customer_title_text'                    => $delete_customer_title_text,
		'deleting_customer_title_text'                  => $deleting_customer_title_text,
		'save_customer_text'                            => $save_customer_text,
		'search_order_text'                             => $search_order_text,
		'offline_search_order_text'                     => $offline_search_order_text,
		'printInvoice_text'                             => $printInvoice_text,
		'sale_summary_text'                             => $sale_summary_text,
		'sub_total_text'                                => $sub_total_text,
		'unit_text'                                     => $unit_text,
		'logout_heading'                                => $logout_heading,
		'confirm_logout_text'                           => $confirm_logout_text,
		'processing_order_text'                         => $processing_order_text,
		'error_coupon_offline'                          => $error_coupon_offline,
		'searching_product_text'                        => $searching_product_text,
		'error_load_products'                           => $error_load_products,
		'text_loading_populars'                         => $text_loading_populars,
		'error_load_populars'                           => $error_load_populars,
		'text_loading_orders'                           => $text_loading_orders,
		'error_load_orders'                             => $error_load_orders,
		'text_loading_customers'                        => $text_loading_customers,
		'error_load_customers'                          => $error_load_customers,
		'error_offline_customer'                        => $error_offline_customer,
		'error_offline_account'                         => $error_offline_account,
		'text_loading_categories'                       => $text_loading_categories,
		'text_item_detail'                              => $text_item_detail,
		'error_load_categories'                         => $error_load_categories,
		'text_loading'                                  => $text_loading,
		'button_upload'                                 => $button_upload,
		'text_product_options'                          => $text_product_options,
		'error_keyword'                                 => $error_keyword,
		'error_products'                                => $error_products,
		'text_online_mode'                              => $text_online_mode,
		'error_enter_online'                            => $error_enter_online,
		'text_offline_mode'                             => $text_offline_mode,
		'error_no_category_product'                     => $error_no_category_product,
		'error_no_customer'                             => $error_no_customer,
		'text_select_customer'                          => $text_select_customer,
		'error_customer_add'                            => $error_customer_add,
		'text_remove_customer'                          => $text_remove_customer,
		'error_checkout'                                => $error_checkout,
		'text_balance_due'                              => $text_balance_due,
		'text_order_success'                            => $text_order_success,
		'text_sync_order'                               => $text_sync_order,
		'sync_process_text'                             => $sync_process_text,
		'sync_success_text'                             => $sync_success_text,
		'text_sync_single_order'                        => $text_sync_single_order,
		'text_no_orders'                                => $text_no_orders,
		'order_note_empty'                              => $order_note_empty,
		'error_sync_orders'                             => $error_sync_orders,
		'text_another_cart'                             => $text_another_cart,
		'text_cart_deleted'                             => $text_cart_deleted,
		'text_current_deleted'                          => $text_current_deleted,
		'text_cart_empty'                               => $text_cart_empty,
		'text_cart_add'                                 => $text_cart_add,
		'text_option_required'                          => $text_option_required,
		'text_product_not_added'                        => $text_product_not_added,
		'text_no_quantity'                              => $text_no_quantity,
		'cash_payment_title'                            => $cash_payment_title,
		'text_all_products'                             => $text_all_products,
		'invalid_percentage'                            => $invalid_percentage,
		'invalid_discount'                              => $invalid_discount,
		'coupon_code_enter_text'                        => $coupon_code_enter_text,
		'apply_coupon_text'                             => $apply_coupon_text,
		'apply_coupon_error'                            => $apply_coupon_error,
		'applying_coupon_text'                          => $applying_coupon_text,
		'coupon_applied_text'                           => $coupon_applied_text,
		'barcode_enter_text'                            => $barcode_enter_text,
		'offline_text'                                  => $offline_text,
		'online_text'                                   => $online_text,
		'coupon_offline_notification'                   => $coupon_offline_notification,
		'coupon_remove_notification'                    => $coupon_remove_notification,
		'coupon_remove_error_notification'              => $coupon_remove_error_notification,
		'text_search'                                   => $text_search,
		'text_option_notifier'                          => $text_option_notifier,
		'text_low_stock'                                => $text_low_stock,
		'text_special_price'                            => $text_special_price,
		'text_cust_delete'                              => $text_cust_delete,
		'change_customer_text'                          => $change_customer_text,
		'change_customer_title_text'                    => $change_customer_title_text,
		'okay_text'                                     => $okay_text,
		'invalid_paid_amt'                              => $invalid_paid_amt,
		'error_no_orders'                               => $error_no_orders,
		'add_to_cart'                                   => $button_cart,
		'text_loading_shipping_cost'                    => $text_loading_shipping_cost,
		'add_product_add'                               => $add_product_add,
		'add_product_name'                              => $add_product_name,
		'add_product_price'                             => $add_product_price,
		'add_product_quantity'                          => $add_product_quantity,
		'add_text'                                      => $add_text,
		'validate_product_quantity'                     => $validate_product_quantity,
		'validate_product_price'                        => $validate_product_price,
		'validate_product_name_len'                     => $validate_product_name_len,
		'error_no_category_order'                       => $error_no_category_order,
		'refund_text'                                   => $refund_text,
		'title'                                         => get_bloginfo( 'name' ),

	);

	$data = apply_filters( 'wkwc_add_custom_key_to_translate', $data );

	return $data;
}
