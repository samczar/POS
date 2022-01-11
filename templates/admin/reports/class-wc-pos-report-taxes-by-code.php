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
 * WC_Report_Taxes_By_Code.
 *
 * @author      WooThemes
 *
 * @category    Admin
 *
 * @version     2.1.0
 */
class WC_Pos_Report_Taxes_By_Code extends WC_Admin_Report
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
        global $wpdb;

        $query_data = array(
            'order_item_name' => array(
                'type' => 'order_item',
                'function' => '',
                'name' => 'tax_rate',
            ),
            'tax_amount' => array(
                'type' => 'order_item_meta',
                'order_item_type' => 'tax',
                'function' => '',
                'name' => 'tax_amount',
            ),
            'shipping_tax_amount' => array(
                'type' => 'order_item_meta',
                'order_item_type' => 'tax',
                'function' => '',
                'name' => 'shipping_tax_amount',
            ),
            'rate_id' => array(
                'type' => 'order_item_meta',
                'order_item_type' => 'tax',
                'function' => '',
                'name' => 'rate_id',
            ),
            'ID' => array(
                'type' => 'post_data',
                'function' => '',
                'name' => 'post_id',
            ),
        );

        $query_where = array(
            array(
                'key' => 'order_item_type',
                'value' => 'tax',
                'operator' => '=',
            ),
            array(
                'key' => 'order_item_name',
                'value' => '',
                'operator' => '!=',
            ),
        );

        $tax_rows_orders = $this->get_order_report_data(
            array(
                'data' => $query_data,
                'where' => $query_where,
                'order_by' => 'posts.post_date ASC',
                'query_type' => 'get_results',
                'filter_range' => true,
                'order_types' => array_merge(wc_get_order_types('sales-reports'), array('shop_order_refund')),
                'order_status' => array('completed', 'processing', 'on-hold'),
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
                                                    ), // Partial refunds inside refunded orders should be ignored
            )
        );

        // Merge
        $tax_rows = array();

        foreach ($tax_rows_orders as $tax_row) {
            $key = $tax_row->rate_id;
            $tax_rows[$key] = isset($tax_rows[$key]) ? $tax_rows[$key] : (object) array(
                'tax_amount' => 0,
                'shipping_tax_amount' => 0,
                'total_orders' => 0,
            );

            if ('shop_order_refund' !== get_post_type($tax_row->post_id)) {
                ++$tax_rows[$key]->total_orders;
            }

            $tax_rows[$key]->tax_rate = $tax_row->tax_rate;
            $tax_rows[$key]->tax_amount += wc_round_tax_total($tax_row->tax_amount);
            $tax_rows[$key]->shipping_tax_amount += wc_round_tax_total($tax_row->shipping_tax_amount);
        } ?>
		<table class="widefat">
			<thead>
				<tr>
					<th><?php _e('Tax', 'wc_pos'); ?></th>
					<th><?php _e('Rate', 'wc_pos'); ?></th>
					<th class="total_row"><?php _e('Number of orders', 'wc_pos'); ?></th>
					<th class="total_row"><?php _e('Tax amount', 'wc_pos'); ?> <?php echo wc_help_tip(__('This is the sum of the "Tax rows" tax amount within your orders.', 'wc_pos')); ?></th>
					<th class="total_row"><?php _e('Shipping tax amount', 'wc_pos'); ?> <?php echo wc_help_tip(__('This is the sum of the "Tax rows" shipping tax amount within your orders.', 'wc_pos')); ?></th>
					<th class="total_row"><?php _e('Total tax', 'wc_pos'); ?> <?php echo wc_help_tip(__('This is the total tax for the rate (shipping tax + product tax).', 'wc_pos')); ?></th>
				</tr>
			</thead>
			<?php if (!empty($tax_rows)) : ?>
				<tbody>
					<?php
                    foreach ($tax_rows as $rate_id => $tax_row) {
                        $rate = $wpdb->get_var($wpdb->prepare("SELECT tax_rate FROM {$wpdb->prefix}woocommerce_tax_rates WHERE tax_rate_id = %d;", $rate_id)); ?>
						<tr>
							<th scope="row"><?php echo apply_filters('woocommerce_reports_taxes_tax_rate', $tax_row->tax_rate, $rate_id, $tax_row); ?></th>
							<td><?php echo apply_filters('woocommerce_reports_taxes_rate', $rate, $rate_id, $tax_row); ?>%</td>
							<td class="total_row"><?php echo $tax_row->total_orders; ?></td>
							<td class="total_row"><?php echo wc_price($tax_row->tax_amount); ?></td>
							<td class="total_row"><?php echo wc_price($tax_row->shipping_tax_amount); ?></td>
							<td class="total_row"><?php echo wc_price($tax_row->tax_amount + $tax_row->shipping_tax_amount); ?></td>
						</tr>
						<?php
                    } ?>
				</tbody>
				<tfoot>
					<tr>
						<th scope="row" colspan="3"><?php _e('Total', 'wc_pos'); ?></th>
						<th class="total_row"><?php echo wc_price(wc_round_tax_total(array_sum(wp_list_pluck((array) $tax_rows, 'tax_amount')))); ?></th>
						<th class="total_row"><?php echo wc_price(wc_round_tax_total(array_sum(wp_list_pluck((array) $tax_rows, 'shipping_tax_amount')))); ?></th>
						<th class="total_row"><strong><?php echo wc_price(wc_round_tax_total(array_sum(wp_list_pluck((array) $tax_rows, 'tax_amount')) + array_sum(wp_list_pluck((array) $tax_rows, 'shipping_tax_amount')))); ?></strong></th>
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
