<?php

namespace WKWC_POS\Templates\Admin\Reports;

use WP_List_table;
use WP_User_Query;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

/**
 * WC_Pos_Report_Customer_List.
 *
 * @author      Webkul
 *
 * @category    Admin
 *
 * @version     2.2.0
 */
class WC_Pos_Report_Customer_List extends WP_List_Table {

	/**
	 * Constructor.
	 **/
	public $wpdb;

	public $pos_operator = '';

	public $outlet;

	public $payment = '';

	public $pos_pay_operator = '';

	public $pos_payment      = '';
	public $outlet_map_table = '';
	public $outlet_table     = '';

	public function __construct() {
		global $wpdb;

		$this->wpdb = $wpdb;

		$this->outlet_map_table = $this->wpdb->prefix . 'woocommerce_pos_outlet_map';

		$this->outlet_table = $this->wpdb->prefix . 'woocommerce_pos_outlets';

		parent::__construct(
			array(
				'singular' => 'customer',
				'plural'   => 'customers',
				'ajax'     => false,
			)
		);

		if ( isset( $_GET['outlet_id'] ) && ! empty( $_GET['outlet_id'] ) && $_GET['outlet_id'] > 0 ) {
			$this->outlet       = $_GET['outlet_id'];
			$this->pos_operator = '=';
		} else {
			$this->outlet       = 0;
			$this->pos_operator = '>';
			$this->outlet       = apply_filters( 'wkwcpos_change_user_value', $this->outlet );
			$this->pos_operator = apply_filters( 'wkwcpos_change_user_operatior_value', $this->pos_operator );
		}

		if ( isset( $_GET['payment'] ) && ! empty( $_GET['payment'] ) ) {
			$this->pos_payment      = $_GET['payment'];
			$this->pos_pay_operator = '=';
		} else {
			$this->pos_payment      = 'All Method';
			$this->pos_pay_operator = '!=';
		}
	}

	/**
	 * No items found text.
	 */
	public function no_items() {
		_e( 'No customers found.', 'wc_pos' );
	}

	/**
	 * Output the report.
	 */
	public function output_report() {
		$this->prepare_items();

		$custom_pos_payment_methods = $this->wpdb->get_results( "SELECT payment_slug, payment_name from {$this->wpdb->prefix}woocommerce_pos_payments", ARRAY_A );

		echo '<div id="poststuff" class="woocommerce-reports-wide">';

		if ( ! empty( $_GET['link_orders'] ) && wp_verify_nonce( $_REQUEST['_wpnonce'], 'link_orders' ) ) {
			$linked = wc_update_new_customer_past_orders( absint( $_GET['link_orders'] ) );

			echo '<div class="updated"><p>' . sprintf( _n( '%s previous order linked', '%s previous orders linked', $linked, 'wc_pos' ), $linked ) . '</p></div>';
		}

		if ( ! empty( $_GET['refresh'] ) && wp_verify_nonce( $_REQUEST['_wpnonce'], 'refresh' ) ) {
			$user_id = absint( $_GET['refresh'] );
			$user    = get_user_by( 'id', $user_id );

			delete_user_meta( $user_id, '_money_spent' );
			delete_user_meta( $user_id, '_order_count' );

			echo '<div class="updated"><p>' . sprintf( __( 'Refreshed stats for %s', 'wc_pos' ), $user->display_name ) . '</p></div>';
		}

		echo "<form action='' method = 'GET' style='float: left;margin: 5px;'>";
		echo "<input type = 'hidden' value = 'wc-pos-reports' name = 'page'>";
		echo "<input type = 'hidden' value = 'customer' name = 'tab'>";

		echo "<select name = 'payment'>";
		echo '<option value =  >' . __( 'All payment method', 'wc_pos' ) . '</option>';
		$selected = ! empty( $this->pos_payment ) && $this->pos_payment == 'cash' ? 'selected' : '';
		echo "<option value = 'cash'   $selected ?>" . __( '  Cash', 'wc_pos' ) . '</option>';
		$selected = ! empty( $this->pos_payment ) && $this->pos_payment == 'card' ? 'selected' : '';
		echo "<option value = 'card' $selected>" . __( ' Card ', 'wc_pos' ) . '</option>';
		foreach ( $custom_pos_payment_methods as $value ) {
			$selected = ! empty( $this->pos_payment ) && $this->pos_payment == $value['payment_slug'] ? esc_attr( 'selected' ) : '';
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
			$selected    = empty( ! $this->outlet_id ) && $this->outlet_id == $outlet ? 'selected' : '';
			echo "<option value = '$outlet' $selected >" . $outlet_name . '</option>';
		}
		echo '</select>';
		echo '<input type="submit" class ="button" class="hii" value = "' . __( 'Apply', 'wc_pos' ) . '"> ';
		echo '</form>';

		echo '<form method="post" id="woocommerce_customers">';

		$this->search_box( __( 'Search customers', 'wc_pos' ), 'customer_search' );
		$this->display();

		echo '</form>';
		echo '</div>';
	}

	/**
	 * Get column value.
	 *
	 * @param WP_User $user
	 * @param string  $column_name
	 *
	 * @return string
	 */
	public function column_default( $user, $column_name ) {
		switch ( $column_name ) {
			case 'customer_name':
				if ( $user->last_name && $user->first_name ) {
					return $user->last_name . ', ' . $user->first_name;
				} else {
					return '-';
				}

				// no break
			case 'username':
				return $user->user_login;

			case 'location':
				$state_code   = get_user_meta( $user->ID, 'billing_state', true );
				$country_code = get_user_meta( $user->ID, 'billing_country', true );

				$state   = isset( WC()->countries->states[ $country_code ][ $state_code ] ) ? WC()->countries->states[ $country_code ][ $state_code ] : $state_code;
				$country = isset( WC()->countries->countries[ $country_code ] ) ? WC()->countries->countries[ $country_code ] : $country_code;

				$value = '';

				if ( $state ) {
					$value .= $state . ', ';
				}

				$value .= $country;

				if ( $value ) {
					return $value;
				} else {
					return '-';
				}

				// no break
			case 'email':
				return '<a href="mailto:' . $user->user_email . '">' . $user->user_email . '</a>';

			case 'spent':
				return wc_price( $this->wc_get_customer_total_pos_spent( $user->ID ) );

			case 'orders':
				return $this->wc_get_customer_pos_order_count( $user->ID );

			case 'last_order':
				$orders = $this->wc_get_customer_pos_order_last_date( $user->ID );

				if ( ! empty( $orders ) ) {
					$order = (array) $orders[0];
					$date  = date_i18n( 'F j, Y', strtotime( $order['post_date'] ) );

					return '<a href="' . admin_url( 'post.php?post=' . $order['ID'] . '&action=edit' ) . '">' . _x( '#', 'hash before order number', 'wc_pos' ) . $order['ID'] . '</a> &ndash; ' . $date;
				} else {
					return '-';
				}

				break;

			case 'wc_actions':
				ob_start();
				?><p>
					<?php
					do_action( 'woocommerce_admin_user_actions_start', $user );

					$actions = array();

					$actions['refresh'] = array(
						'url'    => wp_nonce_url( add_query_arg( 'refresh', $user->ID ), 'refresh' ),
						'name'   => __( 'Refresh stats', 'wc_pos' ),
						'action' => 'refresh',
					);

					$actions['edit'] = array(
						'url'    => admin_url( 'user-edit.php?user_id=' . $user->ID ),
						'name'   => __( 'Edit', 'wc_pos' ),
						'action' => 'edit',
					);

					$orders = wc_get_orders(
						array(
							'limit'    => 1,
							'status'   => array_map( 'wc_get_order_status_name', wc_get_is_paid_statuses() ),
							'customer' => array( array( 0, $user->user_email ) ),
						)
					);

					if ( $orders ) {
						$actions['link'] = array(
							'url'    => wp_nonce_url( add_query_arg( 'link_orders', $user->ID ), 'link_orders' ),
							'name'   => __( 'Link previous orders', 'wc_pos' ),
							'action' => 'link',
						);
					}

					$actions = apply_filters( 'woocommerce_admin_user_actions', $actions, $user );

					foreach ( $actions as $action ) {
						printf( '<a class="button tips %s" href="%s" data-tip="%s">%s</a>', esc_attr( $action['action'] ), esc_url( $action['url'] ), esc_attr( $action['name'] ), esc_attr( $action['name'] ) );
					}

					do_action( 'woocommerce_admin_user_actions_end', $user );
					?>
				</p>
				<?php
				$user_actions = ob_get_contents();
				ob_end_clean();

				return $user_actions;
		}

		return '';
	}

	public function wc_get_customer_total_pos_spent( $user_id ) {
		$statuses = array_map( 'esc_sql', wc_get_is_paid_statuses() );
		$a        = "SELECT SUM(meta2.meta_value)
			FROM {$this->wpdb->prefix}posts as posts
			LEFT JOIN {$this->wpdb->postmeta} AS meta ON posts.ID = meta.post_id
			LEFT JOIN {$this->wpdb->postmeta} AS meta2 ON posts.ID = meta2.post_id
			LEFT JOIN {$this->wpdb->postmeta} AS meta3 ON posts.ID = meta3.post_id
			LEFT JOIN {$this->wpdb->postmeta} AS meta4 ON posts.ID = meta4.post_id
			WHERE   meta.meta_key       = '_customer_user'
			AND     meta.meta_value     = '" . esc_sql( $user_id ) . "'
			AND     posts.post_type     = 'shop_order'
			AND     posts.post_status   IN ( 'wc-" . implode( "','wc-", $statuses ) . "' )
			AND     meta2.meta_key      = '_order_total'
			AND     meta3.meta_key			= '_wk_wc_pos_outlet'
			AND 		meta3.meta_value		$this->pos_operator  $this->outlet
			AND     meta4.meta_key			= '_payment_method'
			AND 		meta4.meta_value		$this->pos_pay_operator '" . $this->pos_payment . "'";
		$args     = $this->wpdb->get_var( $a );

		return (float) $args;
	}

	public function wc_get_customer_pos_order_count( $user_id ) {
		$query = "SELECT COUNT(*)
		FROM {$this->wpdb->prefix}posts as posts
		LEFT JOIN {$this->wpdb->postmeta} AS meta ON posts.ID = meta.post_id
		LEFT JOIN {$this->wpdb->postmeta} AS meta2 ON posts.ID = meta2.post_id
		LEFT JOIN {$this->wpdb->postmeta} AS meta3 ON posts.ID = meta3.post_id

		WHERE   meta.meta_key = '_customer_user'
		AND     posts.post_type = 'shop_order'
		AND     posts.post_status IN ( '" . implode( "','", array_map( 'esc_sql', array_keys( wc_get_order_statuses() ) ) ) . "' )
		AND     meta2.meta_key			= '_wk_wc_pos_outlet'
		AND 		meta2.meta_value		$this->pos_operator $this->outlet
		AND     meta3.meta_key			= '_payment_method'
		AND 		meta3.meta_value		$this->pos_pay_operator '" . $this->pos_payment . "'
		AND     meta.meta_value = '" . esc_sql( $user_id ) . "'";

		$count = $this->wpdb->get_var( $query );

		return (int) $count;
	}

	public function wc_get_customer_pos_order_last_date( $user_id ) {
		$query = "SELECT *
		FROM {$this->wpdb->prefix}posts as posts
		LEFT JOIN {$this->wpdb->postmeta} AS meta ON posts.ID = meta.post_id
		LEFT JOIN {$this->wpdb->postmeta} AS meta2 ON posts.ID = meta2.post_id
		LEFT JOIN {$this->wpdb->postmeta} AS meta3 ON posts.ID = meta3.post_id
		WHERE   meta.meta_key = '_customer_user'
		AND     posts.post_type = 'shop_order'
		AND     posts.post_status IN ( '" . implode( "','", array_map( 'esc_sql', array_keys( wc_get_order_statuses() ) ) ) . "' )
		AND     meta2.meta_key			= '_wk_wc_pos_outlet'
		AND 		meta2.meta_value		$this->pos_operator  $this->outlet
		AND     meta3.meta_key			= '_payment_method'
		AND 		meta3.meta_value		$this->pos_pay_operator '" . $this->pos_payment . "'
		AND     meta.meta_value = '" . esc_sql( $user_id ) . "'
		ORDER BY posts.ID DESC
		LIMIT 1";
		$count = $this->wpdb->get_results( $query );

		return $count;
		// code...
	}

	/**
	 * Get columns.
	 *
	 * @return array
	 */
	public function get_columns() {
		$columns = array(
			'customer_name' => __( 'Name (Last, First)', 'wc_pos' ),
			'username'      => __( 'Username', 'wc_pos' ),
			'email'         => __( 'Email', 'wc_pos' ),
			'location'      => __( 'Location', 'wc_pos' ),
			'orders'        => __( 'Orders', 'wc_pos' ),
			'spent'         => __( 'Money spent', 'wc_pos' ),
			'last_order'    => __( 'Last order', 'wc_pos' ),
			'wc_actions'    => __( 'Actions', 'wc_pos' ),
		);

		return $columns;
	}

	/**
	 * Order users by name.
	 *
	 * @param WP_User_Query $query
	 *
	 * @return WP_User_Query
	 */
	public function order_by_last_name( $query ) {
		$s = ! empty( $_REQUEST['s'] ) ? stripslashes( $_REQUEST['s'] ) : '';

		$query->query_from   .= " LEFT JOIN {$this->wpdb->usermeta} as meta2 ON ({$this->wpdb->users}.ID = meta2.user_id) ";
		$query->query_where  .= " AND meta2.meta_key = 'last_name' ";
		$query->query_orderby = ' ORDER BY meta2.meta_value, user_login ASC ';

		if ( $s ) {
			$query->query_from   .= " LEFT JOIN {$this->wpdb->usermeta} as meta3 ON ({$this->wpdb->users}.ID = meta3.user_id)";
			$query->query_where  .= " AND ( user_login LIKE '%" . esc_sql( str_replace( '*', '', $s ) ) . "%' OR user_nicename LIKE '%" . esc_sql( str_replace( '*', '', $s ) ) . "%' OR meta3.meta_value LIKE '%" . esc_sql( str_replace( '*', '', $s ) ) . "%' ) ";
			$query->query_orderby = ' GROUP BY ID ' . $query->query_orderby;
		}

		return $query;
	}

	/**
	 * Prepare customer list items.
	 */
	public function prepare_items() {
		$current_page = absint( $this->get_pagenum() );
		$per_page     = 20;

		/*
		 * Init column headers.
		 */
		$this->_column_headers = array( $this->get_columns(), array(), $this->get_sortable_columns() );

		add_action( 'pre_user_query', array( $this, 'order_by_last_name' ) );

		/**
		 * Get users.
		 */
		$admin_users = new WP_User_Query(
			array(
				'role'   => 'administrator',
				'fields' => 'ID',
			)
		);

		$manager_users = new WP_User_Query(
			array(
				'role'   => 'shop_manager',
				'fields' => 'ID',
			)
		);

		$query = new WP_User_Query(
			array(
				'exclude' => array_merge( $admin_users->get_results(), $manager_users->get_results() ),
				'number'  => $per_page,
				'offset'  => ( $current_page - 1 ) * $per_page,
			)
		);

		$this->items = $query->get_results();

		remove_action( 'pre_user_query', array( $this, 'order_by_last_name' ) );

		/*
		 * Pagination.
		 */
		$this->set_pagination_args(
			array(
				'total_items' => $query->total_users,
				'per_page'    => $per_page,
				'total_pages' => ceil( $query->total_users / $per_page ),
			)
		);
	}
}
