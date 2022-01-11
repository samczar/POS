<?php

namespace WKWC_POS\Templates\Admin;

use WP_List_Table;
use WKWC_POS\Inc\WC_Pos_Errors;
use WKWC_POS\Helper\Order\WC_Pos_Orders_Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

if ( ! class_exists( 'WC_Pos_Outlet_Order_List' ) ) {
	class WC_Pos_Outlet_Order_List extends WP_List_Table {

		protected $wpdb;
		protected $table_name;
		protected $table_name_post;
		protected $order_obj;
		protected $error_obj;

		public function __construct() {
			global $wpdb;

			$this->wpdb = $wpdb;

			$this->table_name = $this->wpdb->prefix . 'postmeta';

			$this->table_name_post = $this->wpdb->prefix . 'posts';

			parent::__construct(
				array(
					'singular' => __( 'POS Order List', 'wc_pos' ),
					'plural'   => __( 'POS Order List', 'wc_pos' ),
					'ajax'     => false,
				)
			);
		}

		public function prepare_items() {
			$this->order_obj = new WC_Pos_Orders_Helper();
			$this->error_obj = new WC_Pos_Errors();

			$current_url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

			if ( strpos( $current_url, '_wp_http_referer' ) !== false ) {
				$new_url = remove_query_arg( array( '_wp_http_referer', '_wpnonce' ), stripslashes( $current_url ) );
				wp_redirect( $new_url );
			}

			$columns = $this->get_columns();

			$sortable = $this->get_sortable_columns();

			$hidden = $this->get_hidden_columns();

			$this->process_bulk_action();

			$search_query = '';

			if ( isset( $_GET['s'] ) && ! empty( $_GET['s'] ) ) {
				$search_query = sanitize_text_field( $_GET['s'] );
			}

			$items = $this->order_obj->pos_get_all_order_by_search_count( $search_query );

			$data = $this->table_data();

			$totalItems = array_values( $items )[0];

			$screen = get_current_screen();

			$perpage = get_option( 'posts_per_page', true );

			$this->_column_headers = array( $columns, $hidden, $sortable );

			if ( empty( $per_page ) || $per_page < 1 ) {
				$per_page = $screen->get_option( 'per_page', 'default' );
			}

			usort( $data, array( $this, 'usort_reorder' ) );

			$totalPages = ceil( $totalItems / $perpage );

			$currentPage = $this->get_pagenum();

			$this->set_pagination_args(
				array(
					'total_items' => $totalItems,

					'total_pages' => $totalPages,

					'per_page'    => $perpage,
				)
			);

			$this->items = $data;
		}

		public function usort_reorder( $a, $b ) {

			$orderby = ( ! empty( $_REQUEST['orderby'] ) ) ? $_REQUEST['orderby'] : 'order_id';

			$order = ( ! empty( $_REQUEST['order'] ) ) ? $_REQUEST['order'] : 'desc';

			//$result = strcmp( $a[ $orderby ], $b[ $orderby ] );
			$order = ( $order === 'asc' ) ? 'asc' : 'desc';
			if ( 'asc' == $order ) {

				if ( $a[ $orderby ] == $b[ $orderby ] ) {
					return 1;
				} elseif ( $a[ $orderby ] < $b[ $orderby ] ) {
					return -1;
				} else {
					return 1;
				}
			} else {
				if ( $a[ $orderby ] == $b[ $orderby ] ) {
					return 1;
				} elseif ( $a[ $orderby ] > $b[ $orderby ] ) {
					return -1;
				} else {
					return 1;
				}
			}

			//return
		}

		/**
		 * Define the columns that are going to be used in the table.
		 *
		 * @return array $columns, the array of columns to use with the table
		 */
		public function get_columns() {
			return array(
				'cb'             => '<input type="checkbox" />',

				'order'          => __( 'Order', 'wc_pos' ),

				'pos_agent'      => __( 'POS Outlet', 'wc_pos' ),

				'customer'       => __( 'Customer', 'wc_pos' ),

				'total_quantity' => __( 'Total Quantity', 'wc_pos' ),

				'status'         => __( 'Status', 'wc_pos' ),

				'total'          => __( 'Total', 'wc_pos' ),

				'date_added'     => __( 'Date Added', 'wc_pos' ),
			);
		}

		public function column_default( $item, $column_name ) {
			switch ( $column_name ) {
				case 'cb':
				case 'order':
				case 'pos_agent':
				case 'customer':
				case 'total_quantity':
				case 'status':
				case 'total':
				case 'date_added':
					return $item[ $column_name ];

				default:
					return print_r( $item, true );
			}
		}

		/**
		 * Decide which columns to activate the sorting functionality on.
		 *
		 * @return array $sortable, the array of columns that can be sorted by the user
		 */
		public function get_sortable_columns() {
			return $sortable = array(
				'order'      => array( 'order', true ),

				'date_added' => array( 'date_added', true ),

				'pos_agent'  => array( 'pos_agent', true ),

				'customer'   => array( 'customer', true ),
			);
		}

		public function get_hidden_columns() {
			return array();
		}

		public function column_cb( $item ) {
			return sprintf( '<input type="checkbox" id="store_%s" name="store[]" value="%s" />', $item['order_id'], $item['order_id'] );
		}

		/**
		 * Process bulk actions.
		 */
		public function process_bulk_action() {
			if ( isset( $_GET['pos-select-outlet'] ) && ! empty( intval( $_GET['pos-select-outlet'] ) ) ) {
				if ( isset( $_GET['store'] ) && ! empty( $_GET['store'] ) ) {
					$arr = array();

					if ( is_array( $_GET['store'] ) ) {
						$store = $_GET['store'];

						$agent = intval( $_GET['pos-select-outlet'] );

						foreach ( $store as $st ) {
							update_post_meta( intval( $st ), '_wk_wc_pos_outlet', $agent );

							$arr[] = '#' . $st;
						}

						if ( ! empty( $arr ) ) {
							$str = implode( ',', $arr );

							$message = '<p>' . $str . ' ' . __( 'Order(s) updated successfully', 'wc_pos' ) . '</p>';
							$this->error_obj->set_error_code( 1 );
							$this->error_obj->wk_wc_pos_print_notification( $message );
						}
					}
				}
			}
		}

		private function table_data() {
			$data = array();

			$perpage = get_option( 'posts_per_page', true );

			if ( isset( $_GET['paged'] ) ) {
				$page = $_GET['paged'];
			} else {
				$page = 1;
			}

			$offset = ( $page - 1 ) * $perpage;

			$pos_orders = $this->order_obj->pos_get_all_orders( $perpage, $offset );

			if ( ! empty( $pos_orders ) ) {
				foreach ( $pos_orders as $pos_order_k => $pos_order_v ) {
					$order_id       = $pos_order_v->ID;
					$order_link     = '<a href="' . get_edit_post_link( $order_id ) . '">#' . $order_id . '</a>';
					$order          = wc_get_order( $order_id );
					$pos_agent      = $this->order_obj->pos_get_outlet_name_by_id( get_post_meta( $order_id, '_wk_wc_pos_outlet', true ) );
					$pos_customer   = get_the_author_meta( 'user_login', $order->get_user_id() );
					$total_quantity = $order->get_item_count();
					$status         = $order->get_status();
					$date_created   = wc_format_datetime( $order->get_date_created() );
					$order_total    = $order->get_formatted_order_total();
					$status         = "<mark class='order-status status-" . $status . " tips'><span>" . ucwords( $status ) . '</span></mark>';

					$data[] = array(
						'order_id'       => $order_id,

						'order'          => $order_link,

						'pos_agent'      => ! empty( $pos_agent ) ? $pos_agent : 'N/A',

						'customer'       => $pos_customer,

						'total_quantity' => $total_quantity,

						'status'         => $status,

						'total'          => $order_total,

						'date_added'     => $date_created,
					);
				}
			}

			return apply_filters( 'wc_pos_orders_list_table_data_filter', $data );
		}

		public function extra_tablenav( $which ) {
			$nonce = wp_create_nonce();

			if ( $which == 'top' ) {
				?>

				<div class="alignleft actions bulkactions">

					<select name="pos-select-outlet" id="pos-select-outlet" class="pos_input_css" style="min-width:200px;">

						<option value=""><?php echo __( 'Select Outlet', 'wc_pos' ); ?></option>

						<?php

						$pos_outlets = $this->order_obj->pos_get_all_outlets_name_and_id();

						foreach ( $pos_outlets as $u_key => $u_value ) {
							?>
							<option value="<?php echo esc_attr( $u_value['id'] ); ?>"><?php echo ! empty( $u_value['id'] ) ? $u_value['outlet_name'] : 'N/A'; ?></option>
							<?php
						}
						?>
					</select>

					<input type="hidden" name="pos_nonce" value="<?php echo $nonce; ?>">

					<?php submit_button( __( 'Select Outlet', 'wc_pos' ), 'button', 'select-agent', false ); ?>

				</div>

				<?php
			}
		}

		public function column_order( $item ) {
			$actions = array(
				'edit' => sprintf( '<a href="' . get_edit_post_link( $item['order_id'] ) . '">' . __( 'Edit', 'wc_pos' ) . '</a>' ),
			);

			return sprintf( '%1$s %2$s', $item['order'], $this->row_actions( $actions ) );
		}
	}
}

$pos_outlet_orders = new WC_Pos_Outlet_Order_List();

$pos_outlet_orders->prepare_items();

?>
<div class="wrap">

	<h2 class="hndle ui-sortable-handle"><span><?php echo __( 'POS Orders', 'wc_pos' ); ?></span></h2>

	<form method="GET">

		<input type="hidden" name="page" value="<?php echo $_REQUEST['page']; ?>" />

		<?php

		$pos_outlet_orders->search_box( __( 'Search', 'wc_pos' ), 'pos-order-search-id' );

		$pos_outlet_orders->display();

		?>

	</form>

</div>
