<?php
/**
 * WooCommerce Point of Sale\API\Reports\DataStore class file.
 *
 * @package WooCommerce Point of Sale/Classes
 */

namespace WKWC_POS\Api\Includes\Reports\Taxes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WKWC_POS\Api\Includes\Reports\Revenue\WKWCPOS_Report_DataStore;
use WKWC_POS\Api\Includes\Reports\TimeInterval;
use WKWC_POS\Api\WKWCPOS_Sql_Query;

/**
 * WooCommerce Point of Sale\API\Reports\DataStore: Common parent for custom report data stores.
 */
class WKWCPOS_Taxes_DataStore extends WKWCPOS_Sql_Query {
	/**
	 * Table used to get the data.
	 *
	 * @var string
	 */
	const TABLE_NAME = 'wc_order_tax_lookup';

	protected $cache_group = 'taxes';

	/**
	 * Mapping columns to data type to return correct response types.
	 *
	 * @var array
	 */
	protected $column_types = array(
		'tax_rate_id'  => 'intval',
		'name'         => 'strval',
		'tax_rate'     => 'floatval',
		'country'      => 'strval',
		'state'        => 'strval',
		'priority'     => 'intval',
		'total_tax'    => 'floatval',
		'order_tax'    => 'floatval',
		'shipping_tax' => 'floatval',
		'orders_count' => 'intval',
	);

	/**
	 * SQL columns to select in the db query and their mapping to SQL code.
	 *
	 * @var array
	 */
	protected $report_columns = array(
		'name'         => 'tax_rate_name as name',
		'tax_rate'     => 'tax_rate',
		'country'      => 'tax_rate_country as country',
		'state'        => 'tax_rate_state as state',
		'priority'     => 'tax_rate_priority as priority',
		'total_tax'    => 'SUM(total_tax) as total_tax',
		'order_tax'    => 'SUM(order_tax) as order_tax',
		'shipping_tax' => 'SUM(shipping_tax) as shipping_tax',
	);

	/**
	 * Constructor
	 */
	public function __construct() {
		global $wpdb;
		$table_name = $wpdb->prefix . self::TABLE_NAME;

		// Avoid ambigious column order_id in SQL query.
		$this->report_columns['tax_rate_id'] = "{$table_name}.tax_rate_id";
		$this->report_columns['orders_count'] = "COUNT( DISTINCT ( CASE WHEN total_tax >= 0 THEN {$table_name}.order_id END ) ) as orders_count";
	}

	/**
	 * Set up all the hooks for maintaining and populating table data.
	 */
	public static function init() {
		add_action( 'woocommerce_reports_delete_order_stats', array( __CLASS__, 'sync_on_order_delete' ), 15 );
	}

	/**
	 * Fills FROM clause of SQL request based on user supplied parameters.
	 *
	 * @param array  $query_args          Query arguments supplied by the user.
	 * @param string $order_status_filter Order status subquery.
	 */
	protected function add_from_sql_params( $query_args, $order_status_filter ) {
		global $wpdb;
		$table_name = $wpdb->prefix . self::TABLE_NAME;

		if ( $order_status_filter ) {
			$this->subquery->add_sql_clause( 'join', "JOIN {$wpdb->prefix}woocommerce_pos_order_stats ON {$table_name}.order_id = {$wpdb->prefix}woocommerce_pos_order_stats.order_id" );
		}

		if ( isset( $query_args['taxes'] ) && ! empty( $query_args['taxes'] ) ) {
			$this->add_sql_clause( 'join', "JOIN {$wpdb->prefix}woocommerce_tax_rates ON default_results.tax_rate_id = {$wpdb->prefix}woocommerce_tax_rates.tax_rate_id" );
		} else {
			$this->subquery->add_sql_clause( 'join', "JOIN {$wpdb->prefix}woocommerce_tax_rates ON {$table_name}.tax_rate_id = {$wpdb->prefix}woocommerce_tax_rates.tax_rate_id" );
		}
	}

	/**
	 * Updates the database query with parameters used for Taxes report: categories and order status.
	 *
	 * @param array $query_args Query arguments supplied by the user.
	 */
	protected function add_sql_query_params( $query_args ) {
		global $wpdb;
		$order_tax_lookup_table = $wpdb->prefix . self::TABLE_NAME;

		$this->add_time_period_sql_params( $query_args, $order_tax_lookup_table );
		$this->get_limit_sql_params( $query_args );
		$this->add_order_by_sql_params( $query_args );
		$order_status_filter = $this->get_status_subquery( $query_args );
		$this->add_from_sql_params( $query_args, $order_status_filter );

		if ( isset( $query_args['taxes'] ) && ! empty( $query_args['taxes'] ) ) {
			$allowed_taxes = self::get_filtered_ids( $query_args, 'taxes' );
			$this->subquery->add_sql_clause( 'where', "AND {$order_tax_lookup_table}.tax_rate_id IN ({$allowed_taxes})" );
		}

		if ( $order_status_filter ) {
			$this->subquery->add_sql_clause( 'where', "AND ( {$order_status_filter} )" );
		}
	}

	/**
	 * Returns filtered comma separated ids, based on query arguments from the user.
	 *
	 * @param array  $query_args Parameters supplied by the user.
	 * @param string $field      Query field to filter.
	 * @param string $separator  Field separator.
	 * @return string
	 */
	protected function get_filtered_ids( $query_args, $field, $separator = ',' ) {
		$ids_str = '';
		$ids     = isset( $query_args[ $field ] ) && is_array( $query_args[ $field ] ) ? $query_args[ $field ] : array();

		/**
		 * Filter the IDs before retrieving report data.
		 *
		 * Allows filtering of the objects included or excluded from reports.
		 *
		 * @param array  $ids        List of object Ids.
		 * @param array  $query_args The original arguments for the request.
		 * @param string $field      The object type.
		 * @param string $context    The data store context.
		 */
		$ids = apply_filters( 'woocommerce_pos_reports_ ' . $field, $ids, $query_args, $field, $this->context );

		if ( ! empty( $ids ) ) {
			$ids_str = implode( $separator, $ids );
		}
		return $ids_str;
	}

	/**
	 * Returns order status subquery to be used in WHERE SQL query, based on query arguments from the user.
	 *
	 * @param array  $query_args Parameters supplied by the user.
	 * @param string $operator   AND or OR, based on match query argument.
	 * @return string
	 */
	protected function get_status_subquery( $query_args, $operator = 'AND' ) {
		global $wpdb;

		$subqueries        = array();
		$excluded_statuses = array();
		if ( isset( $query_args['status_is'] ) && is_array( $query_args['status_is'] ) && count( $query_args['status_is'] ) > 0 ) {
			$allowed_statuses = array_map( array( $this, 'normalize_order_status' ), $query_args['status_is'] );
			if ( $allowed_statuses ) {
				$subqueries[] = "{$wpdb->prefix}woocommerce_pos_order_stats.status IN ( '" . implode( "','", $allowed_statuses ) . "' )";
			}
		}

		if ( isset( $query_args['status_is_not'] ) && is_array( $query_args['status_is_not'] ) && count( $query_args['status_is_not'] ) > 0 ) {
			$excluded_statuses = array_map( array( $this, 'normalize_order_status' ), $query_args['status_is_not'] );
		}

		if ( ( ! isset( $query_args['status_is'] ) || empty( $query_args['status_is'] ) )
			&& ( ! isset( $query_args['status_is_not'] ) || empty( $query_args['status_is_not'] ) )
		) {
			$excluded_statuses = array_map( array( $this, 'normalize_order_status' ), $this->get_excluded_report_order_statuses() );
		}

		if ( $excluded_statuses ) {
			$subqueries[] = "{$wpdb->prefix}woocommerce_pos_order_stats.status NOT IN ( '" . implode( "','", $excluded_statuses ) . "' )";
		}

		return implode( " $operator ", $subqueries );
	}

	/**
	 * Maps order status provided by the user to the one used in the database.
	 *
	 * @param string $status Order status.
	 * @return string
	 */
	protected static function normalize_order_status( $status ) {
		$status = trim( $status );
		return 'wc-' . $status;
	}

	/**
	 * Casts strings returned from the database to appropriate data types for output.
	 *
	 * @param array $array Associative array of values extracted from the database.
	 * @return array|WP_Error
	 */
	protected function cast_numbers( $array ) {
		$retyped_array = array();
		$column_types  = apply_filters( 'woocommerce_rest_reports_column_types', $this->column_types, $array );
		foreach ( $array as $column_name => $value ) {
			if ( is_array( $value ) ) {
				$value = $this->cast_numbers( $value );
			}

			if ( isset( $column_types[ $column_name ] ) ) {
				$retyped_array[ $column_name ] = $column_types[ $column_name ]( $value );
			} else {
				$retyped_array[ $column_name ] = $value;
			}
		}
		return $retyped_array;
	}

	/**
	 * Fills in interval gaps from DB with 0-filled objects.
	 *
	 * @param array    $db_intervals   Array of all intervals present in the db.
	 * @param DateTime $start_datetime Start date.
	 * @param DateTime $end_datetime   End date.
	 * @param string   $time_interval  Time interval, e.g. day, week, month.
	 * @param stdClass $data           Data with SQL extracted intervals.
	 * @return stdClass
	 */
	protected function fill_in_missing_intervals( $db_intervals, $start_datetime, $end_datetime, $time_interval, &$data ) {
		// @todo This is ugly and messy.
		$local_tz = new \DateTimeZone( wc_timezone_string() );
		// At this point, we don't know when we can stop iterating, as the ordering can be based on any value.
		$time_ids     = array_flip( wp_list_pluck( $data->intervals, 'time_interval' ) );
		$db_intervals = array_flip( $db_intervals );
		// Totals object used to get all needed properties.
		$totals_arr = get_object_vars( $data->totals );
		foreach ( $totals_arr as $key => $val ) {
			$totals_arr[ $key ] = 0;
		}
		// @todo Should 'products' be in intervals?
		unset( $totals_arr['products'] );
		while ( $start_datetime <= $end_datetime ) {
			$next_start = TimeInterval::iterate( $start_datetime, $time_interval );
			$time_id    = TimeInterval::time_interval_id( $time_interval, $start_datetime );
			// Either create fill-zero interval or use data from db.
			if ( $next_start > $end_datetime ) {
				$interval_end = $end_datetime->format( 'Y-m-d H:i:s' );
			} else {
				$prev_end_timestamp = (int) $next_start->format( 'U' ) - 1;
				$prev_end           = new \DateTime();
				$prev_end->setTimestamp( $prev_end_timestamp );
				$prev_end->setTimezone( $local_tz );
				$interval_end = $prev_end->format( 'Y-m-d H:i:s' );
			}
			if ( array_key_exists( $time_id, $time_ids ) ) {
				// For interval present in the db for this time frame, just fill in dates.
				$record               = &$data->intervals[ $time_ids[ $time_id ] ];
				$record['date_start'] = $start_datetime->format( 'Y-m-d H:i:s' );
				$record['date_end']   = $interval_end;
			} elseif ( ! array_key_exists( $time_id, $db_intervals ) ) {
				// For intervals present in the db outside of this time frame, do nothing.
				// For intervals not present in the db, fabricate it.
				$record_arr                  = array();
				$record_arr['time_interval'] = $time_id;
				$record_arr['date_start']    = $start_datetime->format( 'Y-m-d H:i:s' );
				$record_arr['date_end']      = $interval_end;
				$data->intervals[]           = array_merge( $record_arr, $totals_arr );
			}
			$start_datetime = $next_start;
		}
		return $data;
	}

	/**
	 * Sorts intervals according to user's request.
	 *
	 * They are pre-sorted in SQL, but after adding gaps, they need to be sorted including the added ones.
	 *
	 * @param stdClass $data      Data object, must contain an array under $data->intervals.
	 * @param string   $sort_by   Ordering property.
	 * @param string   $direction DESC/ASC.
	 */
	protected function sort_intervals( &$data, $sort_by, $direction ) {
		$this->sort_array( $data->intervals, $sort_by, $direction );
	}

	/**
	 * Removes extra records from intervals so that only requested number of records get returned.
	 *
	 * @param stdClass $data           Data from whose intervals the records get removed.
	 * @param int      $page_no        Offset requested by the user.
	 * @param int      $items_per_page Number of records requested by the user.
	 * @param int      $db_interval_count Database interval count.
	 * @param int      $expected_interval_count Expected interval count on the output.
	 * @param string   $order_by Order by field.
	 * @param string   $order ASC or DESC.
	 */
	protected function remove_extra_records( &$data, $page_no, $items_per_page, $db_interval_count, $expected_interval_count, $order_by, $order ) {
		if ( 'date' === strtolower( $order_by ) ) {
			$offset = 0;
		} else {
			if ( 'asc' === strtolower( $order ) ) {
				$offset = ( $page_no - 1 ) * $items_per_page;
			} else {
				$offset = ( $page_no - 1 ) * $items_per_page - $db_interval_count;
			}
			$offset = $offset < 0 ? 0 : $offset;
		}
		$count = $expected_interval_count - ( $page_no - 1 ) * $items_per_page;
		if ( $count < 0 ) {
			$count = 0;
		} elseif ( $count > $items_per_page ) {
			$count = $items_per_page;
		}
		$data->intervals = array_slice( $data->intervals, $offset, $count );
	}

	/**
	 * Sorts array of arrays based on subarray key $sort_by.
	 *
	 * @param array  $arr       Array to sort.
	 * @param string $sort_by   Ordering property.
	 * @param string $direction DESC/ASC.
	 */
	protected function sort_array( &$arr, $sort_by, $direction ) {
		$this->order_by = $this->normalize_order_by( $sort_by );
		$this->order    = $direction;
		usort( $arr, array( $this, 'interval_cmp' ) );
	}

	/**
	 * Updates start and end dates for intervals so that they represent intervals' borders, not times when data in db were recorded.
	 *
	 * E.g. if there are db records for only Tuesday and Thursday this week, the actual week interval is [Mon, Sun], not [Tue, Thu].
	 *
	 * @param DateTime $start_datetime Start date.
	 * @param DateTime $end_datetime End date.
	 * @param string   $time_interval Time interval, e.g. day, week, month.
	 * @param array    $intervals Array of intervals extracted from SQL db.
	 */
	protected function update_interval_boundary_dates( $start_datetime, $end_datetime, $time_interval, &$intervals ) {
		$local_tz = new \DateTimeZone( wc_timezone_string() );
		foreach ( $intervals as $key => $interval ) {
			$datetime = new \DateTime( $interval['datetime_anchor'], $local_tz );

			$prev_start = TimeInterval::iterate( $datetime, $time_interval, true );
			// @todo Not sure if the +1/-1 here are correct, especially as they are applied before the ?: below.
			$prev_start_timestamp = (int) $prev_start->format( 'U' ) + 1;
			$prev_start->setTimestamp( $prev_start_timestamp );
			if ( $start_datetime ) {
				$date_start                      = $prev_start < $start_datetime ? $start_datetime : $prev_start;
				$intervals[ $key ]['date_start'] = $date_start->format( 'Y-m-d H:i:s' );
			} else {
				$intervals[ $key ]['date_start'] = $prev_start->format( 'Y-m-d H:i:s' );
			}

			$next_end           = TimeInterval::iterate( $datetime, $time_interval );
			$next_end_timestamp = (int) $next_end->format( 'U' ) - 1;
			$next_end->setTimestamp( $next_end_timestamp );
			if ( $end_datetime ) {
				$date_end                      = $next_end > $end_datetime ? $end_datetime : $next_end;
				$intervals[ $key ]['date_end'] = $date_end->format( 'Y-m-d H:i:s' );
			} else {
				$intervals[ $key ]['date_end'] = $next_end->format( 'Y-m-d H:i:s' );
			}

			$intervals[ $key ]['interval'] = $time_interval;
		}
	}

	/**
	 * Compares two report data objects by pre-defined object property and ASC/DESC ordering.
	 *
	 * @param stdClass $a Object a.
	 * @param stdClass $b Object b.
	 * @return string
	 */
	private function interval_cmp( $a, $b ) {
		if ( '' === $this->order_by || '' === $this->order || !isset( $a[ $this->order_by ] ) || !isset( $b[ $this->order_by ] ) ) {
			return 0;
			// @todo Should return WP_Error here perhaps?
		}
		if ( $a[ $this->order_by ] === $b[ $this->order_by ] ) {
			// As relative order is undefined in case of equality in usort, second-level sorting by date needs to be enforced
			// so that paging is stable.
			if ( $a['time_interval'] === $b['time_interval'] ) {
				return 0; // This should never happen.
			} elseif ( $a['time_interval'] > $b['time_interval'] ) {
				return 1;
			} elseif ( $a['time_interval'] < $b['time_interval'] ) {
				return -1;
			}
		} elseif ( $a[ $this->order_by ] > $b[ $this->order_by ] ) {
			return strtolower( $this->order ) === 'desc' ? -1 : 1;
		} elseif ( $a[ $this->order_by ] < $b[ $this->order_by ] ) {
			return strtolower( $this->order ) === 'desc' ? 1 : -1;
		}
	}

	/**
	 * Change structure of intervals to form a correct response.
	 *
	 * Also converts local datetimes to GMT and adds them to the intervals.
	 *
	 * @param array $intervals Time interval, e.g. day, week, month.
	 */
	protected function create_interval_subtotals( &$intervals ) {
		foreach ( $intervals as $key => $interval ) {
			$start_gmt = TimeInterval::convert_local_datetime_to_gmt( $interval['date_start'] );
			$end_gmt   = TimeInterval::convert_local_datetime_to_gmt( $interval['date_end'] );
			// Move intervals result to subtotals object.
			$intervals[ $key ] = array(
				'interval'       => $interval['time_interval'],
				'date_start'     => $interval['date_start'],
				'date_start_gmt' => $start_gmt->format( TimeInterval::$sql_datetime_format ),
				'date_end'       => $interval['date_end'],
				'date_end_gmt'   => $end_gmt->format( TimeInterval::$sql_datetime_format ),
			);

			unset( $interval['interval'] );
			unset( $interval['date_start'] );
			unset( $interval['date_end'] );
			unset( $interval['datetime_anchor'] );
			unset( $interval['time_interval'] );
			$intervals[ $key ]['subtotals'] = (object) $this->cast_numbers( $interval );
		}
	}

	/**
	 * Fills ORDER BY clause of SQL request based on user supplied parameters.
	 *
	 * @param array $query_args Parameters supplied by the user.
	 */
	protected function add_order_by_sql_params( $query_args ) {
		if ( isset( $query_args['orderby'] ) ) {
			$order_by_clause = $this->normalize_order_by( $query_args['orderby'] );
		} else {
			$order_by_clause = '';
		}

		$this->clear_sql_clause( 'order_by' );
		$this->add_sql_clause( 'order_by', $order_by_clause );
		$this->add_orderby_order_clause( $query_args, $this );
	}

	/**
	 * Add order by order SQL clause.
	 *
	 * @param array    $query_args Parameters supplied by the user.
	 * @param SqlQuery $sql_query  Query object.
	 */
	protected function add_orderby_order_clause( $query_args, &$sql_query ) {
		if ( isset( $query_args['order'] ) ) {
			$sql_query->add_sql_clause( 'order_by', $query_args['order'] );
		} else {
			$sql_query->add_sql_clause( 'order_by', 'DESC' );
		}
	}

	/**
	 * Fills LIMIT clause of SQL request based on user supplied parameters.
	 *
	 * @param array $query_args Parameters supplied by the user.
	 * @return array
	 */
	protected function get_limit_sql_params( $query_args ) {
		$params = $this->get_limit_params( $query_args );

		$this->clear_sql_clause( 'limit' );
		$this->add_sql_clause( 'limit', "LIMIT {$params['offset']}, {$params['per_page']}" );
		return $params;
	}

	/**
	 * Fills WHERE clause of SQL request with date-related constraints.
	 *
	 * @param array  $query_args Parameters supplied by the user.
	 * @param string $table_name Name of the db table relevant for the date constraint.
	 */
	protected function add_time_period_sql_params( $query_args, $table_name ) {
		$this->clear_sql_clause( array( 'from', 'where_time', 'where' ) );
		if ( isset( $this->subquery ) ) {
			$this->subquery->clear_sql_clause( 'where_time' );
		}

		if ( isset( $query_args['before'] ) && '' !== $query_args['before'] ) {
			if ( is_a( $query_args['before'], 'WC_DateTime' ) ) {
				$datetime_str = $query_args['before']->date( TimeInterval::$sql_datetime_format );
			} else {
				$datetime_str = $query_args['before']->format( TimeInterval::$sql_datetime_format );
			}
			if ( isset( $this->subquery ) ) {
				$this->subquery->add_sql_clause( 'where_time', "AND {$table_name}.date_created <= '$datetime_str'" );
			} else {
				$this->add_sql_clause( 'where_time', "AND {$table_name}.date_created <= '$datetime_str'" );
			}
		}

		if ( isset( $query_args['after'] ) && '' !== $query_args['after'] ) {
			if ( is_a( $query_args['after'], 'WC_DateTime' ) ) {
				$datetime_str = $query_args['after']->date( TimeInterval::$sql_datetime_format );
			} else {
				$datetime_str = $query_args['after']->format( TimeInterval::$sql_datetime_format );
			}
			if ( isset( $this->subquery ) ) {
				$this->subquery->add_sql_clause( 'where_time', "AND {$table_name}.date_created >= '$datetime_str'" );
			} else {
				$this->add_sql_clause( 'where_time', "AND {$table_name}.date_created >= '$datetime_str'" );
			}
		}
	}

	/**
	 * Converts input datetime parameters to local timezone. If there are no inputs from the user in query_args,
	 * uses default from $defaults.
	 *
	 * @param array $query_args Array of query arguments.
	 * @param array $defaults Array of default values.
	 */
	protected function normalize_timezones( &$query_args, $defaults ) {
		$local_tz = new \DateTimeZone( wc_timezone_string() );
		foreach ( array( 'before', 'after' ) as $query_arg_key ) {
			if ( isset( $query_args[ $query_arg_key ] ) && is_string( $query_args[ $query_arg_key ] ) ) { 
				$datetime = new \DateTime($query_args[$query_arg_key], $local_tz);
				// In case timezone was forced by using +HH:MM, convert to local timezone.
				$datetime->setTimezone( $local_tz );
				$query_args[ $query_arg_key ] = $datetime;
			} elseif ( isset( $query_args[ $query_arg_key ] ) && is_a( $query_args[ $query_arg_key ], 'DateTime' ) ) {
				// In case timezone is in other timezone, convert to local timezone.
				$query_args[ $query_arg_key ]->setTimezone( $local_tz );
			} else {
			 
				$query_args[ $query_arg_key ] = isset( $defaults[ $query_arg_key ] ) ? $defaults[ $query_arg_key ] : null;
			}
		}
 
	}

	/**
	 * Returns the report data based on parameters supplied by the user.
	 *
	 * @param array $query_args  Query parameters.
	 * @return stdClass|WP_Error Data.
	 */
	public function get_items( $query_args ) {
		global $wpdb;
		$table_name = $wpdb->prefix . self::TABLE_NAME;

		// These defaults are only partially applied when used via REST API, as that has its own defaults.
		$defaults   = array(
			'per_page' => get_option( 'posts_per_page' ),
			'page'     => 1,
			'order'    => 'DESC',
			'orderby'  => 'tax_rate_id',
			'before'   => TimeInterval::default_before(),
			'after'    => TimeInterval::default_after(),
			'fields'   => '*',
			'taxes'    => array(),
		);
		$query_args = wp_parse_args( $query_args, $defaults );
		$this->normalize_timezones( $query_args, $defaults );

		/*
		 * We need to get the cache key here because
		 * parent::update_intervals_sql_params() modifies $query_args.
		 */
		$cache_key = $this->get_cache_key( $query_args );
		$data      = $this->get_cached_data( $cache_key );

		if ( false === $data ) {
			$this->initialize_queries();

			$data = (object) array(
				'data'    => array(),
				'total'   => 0,
				'pages'   => 0,
				'page_no' => 0,
			);

			$this->add_sql_query_params( $query_args );
			$params = $this->get_limit_params( $query_args );

			if ( isset( $query_args['taxes'] ) && ! empty( $query_args['taxes'] ) ) {
				$total_results = count( $query_args['taxes'] );
				$total_pages   = (int) ceil( $total_results / $params['per_page'] );

				$inner_selections = array( 'tax_rate_id', 'total_tax', 'order_tax', 'shipping_tax', 'orders_count' );
				$outer_selections = array( 'name', 'tax_rate', 'country', 'state', 'priority' );

				$selections      = $this->selected_columns( array( 'fields' => $inner_selections ) );
				$fields          = $this->get_fields( $query_args );
				$join_selections = $this->format_join_selections( $fields, array( 'tax_rate_id' ), $outer_selections );
				$ids_table       = $this->get_ids_table( $query_args['taxes'], 'tax_rate_id' );

				$this->subquery->clear_sql_clause( 'select' );
				$this->subquery->add_sql_clause( 'select', $this->selected_columns( array( 'fields' => $inner_selections ) ) );
				$this->add_sql_clause( 'select', $join_selections );
				$this->add_sql_clause( 'from', '(' );
				$this->add_sql_clause( 'from', $this->subquery->get_query_statement() );
				$this->add_sql_clause( 'from', ") AS {$table_name}" );
				$this->add_sql_clause(
					'right_join',
					"RIGHT JOIN ( {$ids_table} ) AS default_results
					ON default_results.tax_rate_id = {$table_name}.tax_rate_id"
				);

				$taxes_query = $this->get_query_statement();
			} else {
				$db_records_count = (int) $wpdb->get_var(
					"SELECT COUNT(*) FROM (
						{$this->subquery->get_query_statement()}
					) AS tt"
				); // WPCS: cache ok, DB call ok, unprepared SQL ok.

				$total_results = $db_records_count;
				$total_pages   = (int) ceil( $db_records_count / $params['per_page'] );

				if ( $query_args['page'] < 1 || $query_args['page'] > $total_pages ) {
					return $data;
				}

				$this->subquery->clear_sql_clause( 'select' );
				$this->subquery->add_sql_clause( 'select', $this->selected_columns( $query_args ) );
				$this->subquery->add_sql_clause( 'order_by', $this->get_sql_clause( 'order_by' ) );
				$taxes_query = $this->subquery->get_query_statement();
			}

			$tax_data = $wpdb->get_results(
				$taxes_query,
				ARRAY_A
			); // WPCS: cache ok, DB call ok, unprepared SQL ok.

			if ( null === $tax_data ) {
				return $data;
			}

			$tax_data = array_map( array( $this, 'cast_numbers' ), $tax_data );
			$data     = (object) array(
				'data'    => $tax_data,
				'total'   => $total_results,
				'pages'   => $total_pages,
				'page_no' => (int) $query_args['page'],
			);

			$this->set_cached_data( $cache_key, $data );
		}

		return $data;
	}

	/**
	 * Maps ordering specified by the user to columns in the database/fields in the data.
	 *
	 * @param string $order_by Sorting criterion.
	 * @return string
	 */
	protected function normalize_order_by( $order_by ) {
		global $wpdb;

		if ( 'tax_code' === $order_by ) {
			return 'CONCAT_WS( "-", NULLIF(tax_rate_country, ""), NULLIF(tax_rate_state, ""), NULLIF(tax_rate_name, ""), NULLIF(tax_rate_priority, "") )';
		} elseif ( 'rate' === $order_by ) {
			return "CAST({$wpdb->prefix}woocommerce_tax_rates.tax_rate as DECIMAL(7,4))";
		}

		return $order_by;
	}

	/**
	 * Create or update an entry in the wc_order_tax_lookup table for an order.
	 *
	 * @param int $order_id Order ID.
	 * @return int|bool Returns -1 if order won't be processed, or a boolean indicating processing success.
	 */
	public static function sync_order_taxes( $order_id ) {
		global $wpdb;

		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			return -1;
		}

		$tax_items   = $order->get_items( 'tax' );
		$num_updated = 0;

		foreach ( $tax_items as $tax_item ) {
			$result = $wpdb->replace(
				$wpdb->prefix . self::TABLE_NAME,
				array(
					'order_id'     => $order->get_id(),
					'date_created' => $order->get_date_created( 'edit' )->date( TimeInterval::$sql_datetime_format ),
					'tax_rate_id'  => $tax_item->get_rate_id(),
					'shipping_tax' => $tax_item->get_shipping_tax_total(),
					'order_tax'    => $tax_item->get_tax_total(),
					'total_tax'    => $tax_item->get_tax_total() + $tax_item->get_shipping_tax_total(),
				),
				array(
					'%d',
					'%s',
					'%d',
					'%f',
					'%f',
					'%f',
				)
			);

			/**
			 * Fires when tax's reports are updated.
			 *
			 * @param int $tax_rate_id Tax Rate ID.
			 * @param int $order_id    Order ID.
			 */
			do_action( 'woocommerce_reports_update_tax', $tax_item->get_rate_id(), $order->get_id() );

			// Sum the rows affected. Using REPLACE can affect 2 rows if the row already exists.
			$num_updated += 2 === intval( $result ) ? 1 : intval( $result );
		}

		return ( count( $tax_items ) === $num_updated );
	}

	/**
	 * Clean taxes data when an order is deleted.
	 *
	 * @param int $order_id Order ID.
	 */
	public static function sync_on_order_delete( $order_id ) {
		global $wpdb;

		$wpdb->delete( $wpdb->prefix . self::TABLE_NAME, array( 'order_id' => $order_id ) );

		/**
		 * Fires when tax's reports are removed from database.
		 *
		 * @param int $tax_rate_id Tax Rate ID.
		 * @param int $order_id    Order ID.
		 */
		do_action( 'woocommerce_reports_delete_tax', 0, $order_id );

		ReportsCache::invalidate();
	}

	/**
	 * Initialize query objects.
	 */
	protected function initialize_queries() {
		global $wpdb;
		$this->subquery = new WKWCPOS_Sql_Query( $this->context . '_subquery' );
		$this->subquery->clear_all_clauses();
		$this->subquery->add_sql_clause( 'select', $wpdb->prefix . self::TABLE_NAME . '.tax_rate_id' );
		$this->subquery->add_sql_clause( 'from', $wpdb->prefix . self::TABLE_NAME );
		$this->subquery->add_sql_clause( 'group_by', $wpdb->prefix . self::TABLE_NAME . '.tax_rate_id' );
	}

	/**
	 * Fills LIMIT parameters of SQL request based on user supplied parameters.
	 *
	 * @param array $query_args Parameters supplied by the user.
	 * @return array
	 */
	protected function get_limit_params( $query_args = array() ) {
		if ( isset( $query_args['per_page'] ) && is_numeric( $query_args['per_page'] ) ) {
			$this->limit_parameters['per_page'] = (int) $query_args['per_page'];
		} else {
			$this->limit_parameters['per_page'] = get_option( 'posts_per_page' );
		}

		$this->limit_parameters['offset'] = 0;
		if ( isset( $query_args['page'] ) ) {
			$this->limit_parameters['offset'] = ( (int) $query_args['page'] - 1 ) * $this->limit_parameters['per_page'];
		}

		return $this->limit_parameters;
	}

	/**
	 * Fills FROM and WHERE clauses of SQL request for 'Intervals' section of data response based on user supplied parameters.
	 *
	 * @param array  $query_args Parameters supplied by the user.
	 * @param string $table_name Name of the db table relevant for the date constraint.
	 */
	protected function add_intervals_sql_params( $query_args, $table_name ) {
		$this->clear_sql_clause( array( 'from', 'where_time', 'where' ) );

		$this->add_time_period_sql_params( $query_args, $table_name );

		if ( isset( $query_args['interval'] ) && '' !== $query_args['interval'] ) {
			$interval = $query_args['interval'];
			$this->clear_sql_clause( 'select' );
			$this->add_sql_clause( 'select', TimeInterval::db_datetime_format( $interval, $table_name ) );
		}
	}

	/**
	 * Updates the LIMIT query part for Intervals query of the report.
	 *
	 * If there are less records in the database than time intervals, then we need to remap offset in SQL query
	 * to fetch correct records.
	 *
	 * @param array  $query_args Query arguments.
	 * @param int    $db_interval_count Database interval count.
	 * @param int    $expected_interval_count Expected interval count on the output.
	 * @param string $table_name Name of the db table relevant for the date constraint.
	 */
	protected function update_intervals_sql_params( &$query_args, $db_interval_count, $expected_interval_count, $table_name ) {
		if ( $db_interval_count === $expected_interval_count ) {
			return;
		}

		$params   = $this->get_limit_params( $query_args );
		$local_tz = new \DateTimeZone( wc_timezone_string() );
		if ( 'date' === strtolower( $query_args['orderby'] ) ) {
			// page X in request translates to slightly different dates in the db, in case some
			// records are missing from the db.
			$start_iteration = 0;
			$end_iteration   = 0;
			if ( 'asc' === strtolower( $query_args['order'] ) ) {
				// ORDER BY date ASC.
				$new_start_date    = $query_args['after'];
				$intervals_to_skip = ( $query_args['page'] - 1 ) * $params['per_page'];
				$latest_end_date   = $query_args['before'];
				for ( $i = 0; $i < $intervals_to_skip; $i++ ) {
					if ( $new_start_date > $latest_end_date ) {
						$new_start_date  = $latest_end_date;
						$start_iteration = 0;
						break;
					}
					$new_start_date = TimeInterval::iterate( $new_start_date, $query_args['interval'] );
					$start_iteration ++;
				}

				$new_end_date = clone $new_start_date;
				for ( $i = 0; $i < $params['per_page']; $i++ ) {
					if ( $new_end_date > $latest_end_date ) {
						break;
					}
					$new_end_date = TimeInterval::iterate( $new_end_date, $query_args['interval'] );
					$end_iteration ++;
				}
				if ( $new_end_date > $latest_end_date ) {
					$new_end_date  = $latest_end_date;
					$end_iteration = 0;
				}
				if ( $end_iteration ) {
					$new_end_date_timestamp = (int) $new_end_date->format( 'U' ) - 1;
					$new_end_date->setTimestamp( $new_end_date_timestamp );
				}
			} else {
				// ORDER BY date DESC.
				$new_end_date        = $query_args['before'];
				$intervals_to_skip   = ( $query_args['page'] - 1 ) * $params['per_page'];
				$earliest_start_date = $query_args['after'];
				for ( $i = 0; $i < $intervals_to_skip; $i++ ) {
					if ( $new_end_date < $earliest_start_date ) {
						$new_end_date  = $earliest_start_date;
						$end_iteration = 0;
						break;
					}
					$new_end_date = TimeInterval::iterate( $new_end_date, $query_args['interval'], true );
					$end_iteration ++;
				}

				$new_start_date = clone $new_end_date;
				for ( $i = 0; $i < $params['per_page']; $i++ ) {
					if ( $new_start_date < $earliest_start_date ) {
						break;
					}
					$new_start_date = TimeInterval::iterate( $new_start_date, $query_args['interval'], true );
					$start_iteration ++;
				}
				if ( $new_start_date < $earliest_start_date ) {
					$new_start_date  = $earliest_start_date;
					$start_iteration = 0;
				}
				if ( $start_iteration ) {
					// @todo Is this correct? should it only be added if iterate runs? other two iterate instances, too?
					$new_start_date_timestamp = (int) $new_start_date->format( 'U' ) + 1;
					$new_start_date->setTimestamp( $new_start_date_timestamp );
				}
			}
			// @todo - Do this without modifying $query_args?
			$query_args['adj_after']  = $new_start_date;
			$query_args['adj_before'] = $new_end_date;
			$adj_after                = $new_start_date->format( TimeInterval::$sql_datetime_format );
			$adj_before               = $new_end_date->format( TimeInterval::$sql_datetime_format );
			$this->interval_query->clear_sql_clause( array( 'where_time', 'limit' ) );
			$this->interval_query->add_sql_clause( 'where_time', "AND {$table_name}.date_created <= '$adj_before'" );
			$this->interval_query->add_sql_clause( 'where_time', "AND {$table_name}.date_created >= '$adj_after'" );
			$this->clear_sql_clause( 'limit' );
			$this->add_sql_clause( 'limit', 'LIMIT 0,' . $params['per_page'] );
		} else {
			if ( 'asc' === $query_args['order'] ) {
				$offset = ( ( $query_args['page'] - 1 ) * $params['per_page'] ) - ( $expected_interval_count - $db_interval_count );
				$offset = $offset < 0 ? 0 : $offset;
				$count  = $query_args['page'] * $params['per_page'] - ( $expected_interval_count - $db_interval_count );
				if ( $count < 0 ) {
					$count = 0;
				} elseif ( $count > $params['per_page'] ) {
					$count = $params['per_page'];
				}

				$this->clear_sql_clause( 'limit' );
				$this->add_sql_clause( 'limit', 'LIMIT ' . $offset . ',' . $count );
			}
			// Otherwise no change in limit clause.
			// @todo - Do this without modifying $query_args?
			$query_args['adj_after']  = $query_args['after'];
			$query_args['adj_before'] = $query_args['before'];
		}
	}

	/**
	 * Returns a list of columns selected by the query_args formatted as a comma separated string.
	 *
	 * @param array $query_args User-supplied options.
	 * @return string
	 */
	protected function selected_columns( $query_args ) {
		$selections = $this->report_columns;

		if ( isset( $query_args['fields'] ) && is_array( $query_args['fields'] ) ) {
			$keep = array();
			foreach ( $query_args['fields'] as $field ) {
				if ( isset( $selections[ $field ] ) ) {
					$keep[ $field ] = $selections[ $field ];
				}
			}
			$selections = implode( ', ', $keep );
		} else {
			$selections = implode( ', ', $selections );
		}
		return $selections;
	}

	/**
	 * Get the excluded order statuses used when calculating reports.
	 *
	 * @return array
	 */
	protected static function get_excluded_report_order_statuses() {
		$excluded_statuses = \WC_Admin_Settings::get_option( 'woocommerce_excluded_report_order_statuses', array( 'pending', 'failed', 'cancelled' ) );
		$excluded_statuses = array_merge( array( 'trash' ), $excluded_statuses );
		return apply_filters( 'woocommerce_reports_excluded_order_statuses', $excluded_statuses );
	}

}
