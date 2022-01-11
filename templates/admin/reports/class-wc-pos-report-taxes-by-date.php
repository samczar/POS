<?php

namespace WKWC_POS\Templates\Admin\Reports;

use WC_Admin_Report;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!class_exists('WC_Admin_Report')) {
    require_once WC()->plugin_path().'/includes/admin/reports/class-wc-admin-report.php';
}

/**
 * WC_Report_Taxes_By_Date.
 *
 * @author      WooThemes
 *
 * @category    Admin
 *
 * @version     2.1.0
 */
class WC_Pos_Report_Taxes_By_Date extends WC_Admin_Report
{
    /**
     * Get the legend for the main chart sidebar.
     *
     * @return array
     */
    public function get_chart_legend()
    {
        return array();
    }

    public $pos_operator = '';

    public $outlet;

    public $pos_pay_operator = '';

    public $pos_payment = '';

    /**
     * Output an export link.
     */
    public function get_export_button()
    {
        $current_range = !empty($_GET['range']) ? sanitize_text_field($_GET['range']) : 'last_month';

        if (isset($_GET['outlet_id']) && !empty($_GET['outlet_id']) && $_GET['outlet_id'] > 0) {
            global $wpdb;
            $outlet_map = $wpdb->prefix.'woocommerce_pos_outlet_map';
            $this->outlet = $_GET['outlet_id'];

            $this->pos_operator = '=';
        } else {
            $this->outlet = 0;
            $this->pos_operator = '>';
            $this->outlet = apply_filters('wkwcpos_change_outlet_value', $this->outlet);
            $this->pos_operator = apply_filters('wkwcpos_change_user_operatior_value', $this->pos_operator);
        }

        if (isset($_GET['payment']) && !empty($_GET['payment'])) {
            $this->pos_payment = $_GET['payment'];
            $this->pos_pay_operator = '=';
        } else {
            $this->pos_payment = 'All Method';
            $this->pos_pay_operator = '!=';
        } ?>
		<a
			href="#"
			download="report-<?php echo esc_attr($current_range); ?>-<?php echo date_i18n('Y-m-d', current_time('timestamp')); ?>.csv"
			class="export_csv"
			data-export="table"
		>
			<?php _e('Export CSV', 'wc_pos'); ?>
		</a>
		<?php
    }

    /**
     * Output the report.
     */
    public function output_report()
    {
        $ranges = array(
            'year' => __('Year', 'wc_pos'),
            'last_month' => __('Last month', 'wc_pos'),
            'month' => __('This month', 'wc_pos'),
        );

        $current_range = !empty($_GET['range']) ? sanitize_text_field($_GET['range']) : 'month';

        if (!in_array($current_range, array('custom', 'year', 'last_month', 'month', '7day'))) {
            $current_range = 'month';
        }

        $this->check_current_range_nonce($current_range);
        $this->calculate_current_range($current_range);

        $hide_sidebar = true;

        $suffix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
        wp_register_script('wc-reports', WC()->plugin_url().'/assets/js/admin/reports'.$suffix.'.js', array('jquery', 'jquery-ui-datepicker'), WC_VERSION);
        wp_enqueue_script('wc-reports');

        include WC()->plugin_path().'/includes/admin/views/html-report-by-date.php';
    }

    /**
     * Get the main chart.
     */
    public function get_main_chart()
    {
        $query_data = array(
            '_order_tax' => array(
                'type' => 'meta',
                'function' => 'SUM',
                'name' => 'tax_amount',
            ),
            '_order_shipping_tax' => array(
                'type' => 'meta',
                'function' => 'SUM',
                'name' => 'shipping_tax_amount',
            ),
            '_order_total' => array(
                'type' => 'meta',
                'function' => 'SUM',
                'name' => 'total_sales',
            ),
            '_order_shipping' => array(
                'type' => 'meta',
                'function' => 'SUM',
                'name' => 'total_shipping',
            ),
            'ID' => array(
                'type' => 'post_data',
                'function' => 'COUNT',
                'name' => 'total_orders',
                'distinct' => true,
            ),
            'post_date' => array(
                'type' => 'post_data',
                'function' => '',
                'name' => 'post_date',
            ),
        );

        $tax_rows_orders = $this->get_order_report_data(
            array(
                'data' => $query_data,
                'group_by' => $this->group_by_query,
                'order_by' => 'post_date ASC',
                'query_type' => 'get_results',
                'filter_range' => true,
                'order_types' => wc_get_order_types('sales-reports'),
                'order_status' => array('completed', 'processing', 'on-hold', 'refunded'),
                'where_meta' => array(
                                                            array(
                                                                'type' => 'meta',
                                                                'meta_key' => '_wk_wc_pos_outlet',
                                                                'meta_value' => $this->outlet,
                                                                'operator' => $this->pos_operator,
                                                            ),
                                                            'relation' => 'and',
                                                            array(
                                                                'type' => 'meta',
                                                                'meta_key' => '_payment_method',
                                                                'meta_value' => $this->pos_payment,
                                                                'operator' => $this->pos_pay_operator,
                                                            ),
                                                        ),
            )
        );

        $tax_rows_full_refunds = $this->get_order_report_data(
            array(
                'data' => array(
                    'ID' => array(
                        'type' => 'post_data',
                        'distinct' => true,
                        'function' => '',
                        'name' => 'ID',
                    ),
                    'post_parent' => array(
                        'type' => 'post_data',
                        'function' => '',
                        'name' => 'post_parent',
                    ),
                    'post_date' => array(
                        'type' => 'post_data',
                        'function' => '',
                        'name' => 'post_date',
                    ),
                ),
                'where_meta' => array(
                                                array(
                                                    'type' => 'meta',
                                                    'meta_key' => '_wk_wc_pos_outlet',
                                                    'meta_value' => $this->outlet,
                                                    'operator' => $this->pos_operator,
                                                ),
                                                'relation' => 'and',
                                                array(
                                                    'type' => 'meta',
                                                    'meta_key' => '_payment_method',
                                                    'meta_value' => $this->pos_payment,
                                                    'operator' => $this->pos_pay_operator,
                                                ),
                                            ),
                'query_type' => 'get_results',
                'filter_range' => true,
                'order_types' => array('shop_order_refund'),
                'parent_order_status' => array('refunded'),
            )
        );

        $tax_rows_partial_refunds = $this->get_order_report_data(
            array(
                'data' => $query_data,
                'group_by' => $this->group_by_query,
                'order_by' => 'post_date ASC',
                'query_type' => 'get_results',
                'filter_range' => true,
                'order_types' => array('shop_order_refund'),
                'parent_order_status' => array('completed', 'processing', 'on-hold'),
                'where_meta' => array(
                                                                array(
                                                                    'type' => 'meta',
                                                                    'meta_key' => '_wk_wc_pos_outlet',
                                                                    'meta_value' => $this->outlet,
                                                                    'operator' => $this->pos_operator,
                                                                ),
                                                                'relation' => 'and',
                                                                array(
                                                                    'type' => 'meta',
                                                                    'meta_key' => '_payment_method',
                                                                    'meta_value' => $this->pos_payment,
                                                                    'operator' => $this->pos_pay_operator,
                                                                ),
                                                            ), // Partial refunds inside refunded orders should be ignored.
            )
        );

        $tax_rows = array();

        foreach ($tax_rows_orders + $tax_rows_partial_refunds as $tax_row) {
            $key = date(('month' === $this->chart_groupby) ? 'Ym' : 'Ymd', strtotime($tax_row->post_date));
            $tax_rows[$key] = isset($tax_rows[$key]) ? $tax_rows[$key] : (object) array(
                'tax_amount' => 0,
                'shipping_tax_amount' => 0,
                'total_sales' => 0,
                'total_shipping' => 0,
                'total_orders' => 0,
            );
        }

        foreach ($tax_rows_orders as $tax_row) {
            $key = date(('month' === $this->chart_groupby) ? 'Ym' : 'Ymd', strtotime($tax_row->post_date));
            $tax_rows[$key]->total_orders += $tax_row->total_orders;
            $tax_rows[$key]->tax_amount += $tax_row->tax_amount;
            $tax_rows[$key]->shipping_tax_amount += $tax_row->shipping_tax_amount;
            $tax_rows[$key]->total_sales += $tax_row->total_sales;
            $tax_rows[$key]->total_shipping += $tax_row->total_shipping;
        }

        foreach ($tax_rows_partial_refunds as $tax_row) {
            $key = date(('month' === $this->chart_groupby) ? 'Ym' : 'Ymd', strtotime($tax_row->post_date));
            $tax_rows[$key]->tax_amount += $tax_row->tax_amount;
            $tax_rows[$key]->shipping_tax_amount += $tax_row->shipping_tax_amount;
            $tax_rows[$key]->total_sales += $tax_row->total_sales;
            $tax_rows[$key]->total_shipping += $tax_row->total_shipping;
        }

        foreach ($tax_rows_full_refunds as $tax_row) {
            $key = date(('month' === $this->chart_groupby) ? 'Ym' : 'Ymd', strtotime($tax_row->post_date));
            $tax_rows[$key] = isset($tax_rows[$key]) ? $tax_rows[$key] : (object) array(
                'tax_amount' => 0,
                'shipping_tax_amount' => 0,
                'total_sales' => 0,
                'total_shipping' => 0,
                'total_orders' => 0,
            );
            $parent_order = wc_get_order($tax_row->post_parent);

            if ($parent_order) {
                $tax_rows[$key]->tax_amount += $parent_order->get_cart_tax() * -1;
                $tax_rows[$key]->shipping_tax_amount += $parent_order->get_shipping_tax() * -1;
                $tax_rows[$key]->total_sales += $parent_order->get_total() * -1;
                $tax_rows[$key]->total_shipping += $parent_order->get_shipping_total() * -1;
            }
        } ?>
		<table class="widefat">
			<thead>
				<tr>
					<th><?php _e('Period', 'wc_pos'); ?></th>
					<th class="total_row"><?php _e('Number of orders', 'wc_pos'); ?></th>
					<th class="total_row"><?php _e('Total sales', 'wc_pos'); ?> <?php echo wc_help_tip(__("This is the sum of the 'Order total' field within your orders.", 'wc_pos')); ?></th>
					<th class="total_row"><?php _e('Total shipping', 'wc_pos'); ?> <?php echo wc_help_tip(__("This is the sum of the 'Shipping total' field within your orders.", 'wc_pos')); ?></th>
					<th class="total_row"><?php _e('Total tax', 'wc_pos'); ?> <?php echo wc_help_tip(__('This is the total tax for the rate (shipping tax + product tax).', 'wc_pos')); ?></th>
					<th class="total_row"><?php _e('Net profit', 'wc_pos'); ?> <?php echo wc_help_tip(__('Total sales minus shipping and tax.', 'wc_pos')); ?></th>
				</tr>
			</thead>
			<?php if (!empty($tax_rows)) : ?>
				<tbody>
					<?php
                    foreach ($tax_rows as $date => $tax_row) {
                        $gross = $tax_row->total_sales - $tax_row->total_shipping;
                        $total_tax = $tax_row->tax_amount + $tax_row->shipping_tax_amount; ?>
						<tr>
							<th scope="row">
								<?php echo ('month' === $this->chart_groupby) ? date_i18n('F', strtotime($date.'01')) : date_i18n(get_option('date_format'), strtotime($date)); ?>
							</th>
							<td class="total_row"><?php echo $tax_row->total_orders; ?></td>
							<td class="total_row"><?php echo wc_price($gross); ?></td>
							<td class="total_row"><?php echo wc_price($tax_row->total_shipping); ?></td>
							<td class="total_row"><?php echo wc_price($total_tax); ?></td>
							<td class="total_row"><?php echo wc_price($gross - $total_tax); ?></td>
						</tr>
						<?php
                    } ?>
				</tbody>
				<tfoot>
					<?php
                        $gross = array_sum(wp_list_pluck((array) $tax_rows, 'total_sales')) - array_sum(wp_list_pluck((array) $tax_rows, 'total_shipping'));
        $total_tax = array_sum(wp_list_pluck((array) $tax_rows, 'tax_amount')) + array_sum(wp_list_pluck((array) $tax_rows, 'shipping_tax_amount')); ?>
					<tr>
						<th scope="row"><?php _e('Totals', 'wc_pos'); ?></th>
						<th class="total_row"><?php echo array_sum(wp_list_pluck((array) $tax_rows, 'total_orders')); ?></th>
						<th class="total_row"><?php echo wc_price($gross); ?></th>
						<th class="total_row"><?php echo wc_price(array_sum(wp_list_pluck((array) $tax_rows, 'total_shipping'))); ?></th>
						<th class="total_row"><?php echo wc_price($total_tax); ?></th>
						<th class="total_row"><?php echo wc_price($gross - $total_tax); ?></th>
					</tr>
				</tfoot>
			<?php else : ?>
				<tbody>
					<tr>
						<td><?php _e('No taxes found in this period', 'wc_pos'); ?></td>
					</tr>
				</tbody>
			<?php endif; ?>
		</table>
		<?php
    }
}
