<?php
/**
 * REST API Reports revenue stats controller.
 *
 * Handles requests to the /reports/revenue/stats endpoint.
 */

namespace WKWC_POS\Api\Includes\Reports\Payments\Stats;

use WKWC_POS\Api\Includes\Reports\TimeInterval;
use WKWC_POS\Api\Includes\Reports\Revenue\WKWCPOS_Report_DataStore;

defined('ABSPATH') || exit;

/**
 * REST API Reports revenue stats controller class.
 *
 * @extends WC_REST_Reports_Controller
 */
class WKWCPOS_Payments_Stats extends WKWCPOS_Report_DataStore
{
    /**
     * Table used to get the data.
     *
     * @var string
     */
    const TABLE_NAME = 'woocommerce_pos_drawer_transaction';

    /**
     * Cron event name.
     */
    const CRON_EVENT = 'woocommerce_pos_drawer_transaction';

    /**
     * Type for each column to cast values correctly later.
     *
     * @var array
     */
    protected $column_types = array(
        'cash_amount' => 'floatval',
        'card_amount' => 'floatval',
    );

    /**
     * SQL definition for each column.
     *
     * @var array
     */
    protected $report_columns = array();

    /**
     * Constructor.
     */
    public function __construct()
    {
        global $wpdb;

        $table_name = $wpdb->prefix.self::TABLE_NAME;

        // Avoid ambigious columns in SQL query.
        $this->report_columns = array(
            'cash_amount' => "SUM({$table_name}.cash_amount) AS cash_amount",
            'card_amount' => "SUM({$table_name}.card_amount) AS card_amount",
        );
    }

    /**
     * Set up all the hooks for maintaining and populating table data.
     */
    public static function init()
    {
        add_action('delete_post', array(__CLASS__, 'delete_order'));
    }

    /**
     * Returns the report data based on parameters supplied by the user.
     *
     * @param array $query_args query parameters
     *
     * @return stdClass|WP_Error data
     */
    public function get_items($query_args)
    {
        global $wpdb;

        $table_name = $wpdb->prefix.self::TABLE_NAME;

        // These defaults are only applied when not using REST API, as the API has its own defaults that overwrite these for most values (except before, after, etc).
        $defaults = array(
            'per_page' => get_option('posts_per_page'),
            'page' => 1,
            'order' => 'DESC',
            'orderby' => 'date',
            'before' => TimeInterval::default_before(),
            'after' => TimeInterval::default_after(),
            'interval' => 'week',
            'fields' => '*',
            'segmentby' => '',
            'match' => 'all',
            'status_is' => array(),
            'status_is_not' => array(),
            'product_includes' => array(),
            'product_excludes' => array(),
            'coupon_includes' => array(),
            'coupon_excludes' => array(),
            'customer' => '',
            'categories' => array(),
        );

        $query_args = wp_parse_args($query_args, $defaults);
        $this->normalize_timezones($query_args, $defaults);

        $cache_key = $this->get_cache_key($query_args);
        $data = wp_cache_get($cache_key, $this->cache_group);

        if (false === $data) {
            $data = (object) array(
                'totals' => (object) array(),
                'intervals' => (object) array(),
                'total' => 0,
                'pages' => 0,
                'page_no' => 0,
            );

            $selections = $this->selected_columns($query_args);
            $totals_query = $this->get_time_period_sql_params($query_args, $table_name, true);
            $intervals_query = $this->get_intervals_sql_params($query_args, $table_name, true);

            // Additional filtering for Orders report.

            $totals = $wpdb->get_results(
                "SELECT
						{$selections}
					FROM
						{$table_name}
						{$totals_query['from_clause']} 
					WHERE
						1=1
						{$totals_query['where_time_clause']}
						{$totals_query['where_clause']}",
                ARRAY_A
            ); // WPCS: cache ok, DB call ok, unprepared SQL ok.

            if (null === $totals) {
                return new WP_Error('woocommerce_reports_revenue_result_failed', __('Sorry, fetching revenue data failed.', 'wc_pos'));
            }

            $totals[0]['segments'] = array();
            $totals = (object) $this->cast_numbers($totals[0]);

            $db_intervals = $wpdb->get_col(
                "SELECT
							{$intervals_query['select_clause']} AS time_interval
						FROM
							{$table_name}
							{$intervals_query['from_clause']} 
						WHERE
							1=1
							{$intervals_query['where_time_clause']}
							{$intervals_query['where_clause']}
						GROUP BY
							time_interval"
            ); // WPCS: cache ok, DB call ok, , unprepared SQL ok.

            $db_interval_count = count($db_intervals);
            $expected_interval_count = TimeInterval::intervals_between($query_args['after'], $query_args['before'], $query_args['interval']);
            $total_pages = (int) ceil($expected_interval_count / $intervals_query['per_page']);

            if ($query_args['page'] < 1 || $query_args['page'] > $total_pages) {
                return $data;
            }
            $this->update_intervals_sql_params($intervals_query, $query_args, $db_interval_count, $expected_interval_count, $table_name, true);

            if ('' !== $selections) {
                $selections = ', '.$selections;
            }

            $intervals = $wpdb->get_results(
                "SELECT
							MAX({$table_name}.date) AS datetime_anchor,
							{$intervals_query['select_clause']} AS time_interval
							{$selections}
						FROM
							{$table_name}
							{$intervals_query['from_clause']} 
						WHERE
							1=1
							{$intervals_query['where_time_clause']}
							{$intervals_query['where_clause']}
						GROUP BY
							time_interval
						ORDER BY
							{$intervals_query['order_by_clause']}
						{$intervals_query['limit']}",
                ARRAY_A
            ); // WPCS: cache ok, DB call ok, unprepared SQL ok.

            if (null === $intervals) {
                return new \WP_Error('woocommerce_reports_revenue_result_failed', __('Sorry, fetching revenue data failed.', 'wc_pos'));
            }

            $data = (object) array(
                'totals' => $totals,
                'intervals' => $intervals,
                'total' => $expected_interval_count,
                'pages' => $total_pages,
                'page_no' => (int) $query_args['page'],
            );

            if (TimeInterval::intervals_missing($expected_interval_count, $db_interval_count, $intervals_query['per_page'], $query_args['page'], $query_args['order'], $query_args['orderby'], count($intervals))) {
                $this->fill_in_missing_intervals($db_intervals, $query_args['adj_after'], $query_args['adj_before'], $query_args['interval'], $data);
                $this->sort_intervals($data, $query_args['orderby'], $query_args['order']);
                $this->remove_extra_records($data, $query_args['page'], $intervals_query['per_page'], $db_interval_count, $expected_interval_count, $query_args['orderby'], $query_args['order']);
            } else {
                $this->update_interval_boundary_dates($query_args['after'], $query_args['before'], $query_args['interval'], $data->intervals);
            }

            // $segmenter->add_intervals_segments($data, $intervals_query, $table_name);
            $this->create_interval_subtotals($data->intervals);

            wp_cache_set($cache_key, $data, $this->cache_group);
        }

        return $data;
    }

    /**
     * Get unique products based on user time query.
     *
     * @param string $from_clause       from clause with date query
     * @param string $where_time_clause where clause with date query
     * @param string $where_clause      where clause with date query
     *
     * @return int unique product count
     */
    public function get_unique_product_count($from_clause, $where_time_clause, $where_clause)
    {
        global $wpdb;

        $table_name = $wpdb->prefix.self::TABLE_NAME;

        return $wpdb->get_var(
            "SELECT
					COUNT( DISTINCT {$wpdb->prefix}wc_order_product_lookup.product_id )
				FROM
					{$wpdb->prefix}wc_order_product_lookup JOIN {$table_name} ON {$wpdb->prefix}wc_order_product_lookup.order_id = {$table_name}.order_id
					{$from_clause}
				WHERE
					1=1
					{$where_time_clause}
					{$where_clause}"
        ); // WPCS: cache ok, DB call ok, unprepared SQL ok.
    }

    /**
     * Add order information to the lookup table when orders are created or modified.
     *
     * @param int $post_id post ID
     *
     * @return int|bool returns -1 if order won't be processed, or a boolean indicating processing success
     */
    public static function sync_order($post_id)
    {
        if ('shop_order' !== get_post_type($post_id) && 'shop_order_refund' !== get_post_type($post_id)) {
            return -1;
        }

        $order = wc_get_order($post_id);
        if (!$order) {
            return -1;
        }

        return self::update($order);
    }

    /**
     * Update the database with stats data.
     *
     * @param WC_Order|WC_Order_Refund $order order or refund to update row for
     *
     * @return int|bool returns -1 if order won't be processed, or a boolean indicating processing success
     */
    public static function update($order)
    {
        global $wpdb;
        $table_name = $wpdb->prefix.self::TABLE_NAME;

        if (!$order->get_id() || !$order->get_date_created()) {
            return -1;
        }

        $data = array(
            'order_id' => $order->get_id(),
            'parent_id' => $order->get_parent_id(),
            'date_created' => $order->get_date_created()->date('Y-m-d H:i:s'),
            'date_created_gmt' => gmdate('Y-m-d H:i:s', $order->get_date_created()->getTimestamp()),
            'num_items_sold' => self::get_num_items_sold($order),
            'total_sales' => $order->get_total(),
            'tax_total' => $order->get_total_tax(),
            'shipping_total' => $order->get_shipping_total(),
            'net_total' => self::get_net_total($order),
            'status' => self::normalize_order_status($order->get_status()),
            'customer_id' => $order->get_report_customer_id(),
            'returning_customer' => $order->is_returning_customer(),
            'outlet_id' => get_post_meta( $order->get_id(), '_wk_wc_pos_outlet', true ),
        );
        $format = array(
            '%d',
            '%d',
            '%s',
            '%s',
            '%d',
            '%f',
            '%f',
            '%f',
            '%f',
            '%s',
            '%d',
            '%d',
            '%d',
        );

        if ('shop_order_refund' === $order->get_type()) {
            $parent_order = wc_get_order($order->get_parent_id());
            if ($parent_order) {
                $data['parent_id'] = $parent_order->get_id();
                $format[] = '%d';
            }
        } else {
            $data['returning_customer'] = self::is_returning_customer($order);
        }

        // Update or add the information to the DB.
        $result = $wpdb->replace($table_name, $data, $format);

        /*
         * Fires when order's stats reports are updated.
         *
         * @param int $order_id Order ID.
         */
        do_action('woocommerce_reports_update_order_stats', $order->get_id());

        // Check the rows affected for success. Using REPLACE can affect 2 rows if the row already exists.
        return 1 === $result || 2 === $result;
    }

    /**
     * Calculation methods.
     */

    /**
     * Get number of items sold among all orders.
     *
     * @param array $order WC_Order object
     *
     * @return int
     */
    protected static function get_num_items_sold($order)
    {
        $num_items = 0;

        $line_items = $order->get_items('line_item');
        foreach ($line_items as $line_item) {
            $num_items += $line_item->get_quantity();
        }

        return $num_items;
    }

    /**
     * Get the net amount from an order without shipping, tax, or refunds.
     *
     * @param array $order WC_Order object
     *
     * @return float
     */
    protected static function get_net_total($order)
    {
        $net_total = floatval($order->get_total()) - floatval($order->get_total_tax()) - floatval($order->get_shipping_total());

        return (float) $net_total;
    }

    /**
     * Check to see if an order's customer has made previous orders or not.
     *
     * @param array $order WC_Order object
     *
     * @return bool
     */
    public static function is_returning_customer($order)
    {
        $customer_id = $order->get_customer_id();

        if (!$customer_id) {
            return false;
        }

        return wc_get_customer_order_count($customer_id) > 1;
    }

    /**
     * Returns string to be used as cache key for the data.
     *
     * @param array $params query parameters
     *
     * @return string
     */
    protected function get_cache_key($params)
    {
        return 'woocommerce_'.self::TABLE_NAME.'_stats_'.md5(wp_json_encode($params));
    }
}
