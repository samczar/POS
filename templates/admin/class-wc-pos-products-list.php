<?php

namespace WKWC_POS\Templates\Admin;

use WP_List_Table;
use WKWC_POS\Helper\Product\WC_Pos_Products_Helper;
use WKWC_POS\Inc\WC_Pos_Errors;
use WKWC_POS\Helper\Outlet\Product\Outlet_Product_Helper;
use WKWC_POS\Helper\Outlet\WC_Pos_Outlet_Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

if ( ! class_exists( 'WC_Pos_Products_List' ) ) {
	class WC_Pos_Products_List extends WP_List_Table {

		protected $product_obj                   = '';
		protected $error_obj                     = '';
		protected $pproduct_obj                  = '';
		protected $outlet_helper                 = '';
		protected $centralized_inventory_enabled = false;

		public function __construct() {
			$this->centralized_inventory_enabled = apply_filters( 'wk_wc_pos_enable_centralized_inventory', false );

			parent::__construct(
				array(
					'singular' => __( 'POS Product List', 'wc_pos' ),
					'plural'   => __( 'POS Product List', 'wc_pos' ),
					'ajax'     => false,
				)
			);
		}

		public function prepare_items() {
			$this->product_obj  = new WC_Pos_Products_Helper();
			$this->error_obj    = new WC_Pos_Errors();
			$this->pproduct_obj = new Outlet_Product_Helper();

			$current_url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

			if ( strpos( $current_url, '_wp_http_referer' ) !== false ) {
				$new_url = remove_query_arg( array( '_wp_http_referer', '_wpnonce' ), stripslashes( $current_url ) );
				wp_redirect( $new_url );
			}

			$columns = $this->get_columns();

			$sortable = $this->get_sortable_columns();

			$hidden = $this->get_hidden_columns();

			$this->process_bulk_action();

			$search_query = ! empty( $_GET['s'] ) ? sanitize_text_field( $_GET['s'] ) : '';

			$filtered_outlet = ! empty( $_GET['outlet'] ) ? sanitize_text_field( $_GET['outlet'] ) : '';

			$items = $this->product_obj->pos_get_all_product_by_count( $search_query, $filtered_outlet );

			$totalItems = array_values( $items )[0];

			$data = $this->table_data();

			$perpage = get_option( 'posts_per_page', true );

			$this->_column_headers = array( $columns, $hidden, $sortable );

			usort( $data, array( $this, 'usort_reorder' ) );

			$totalPages = ceil( $totalItems / $perpage );

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
			$orderby = ( ! empty( $_REQUEST['orderby'] ) ) ? $_REQUEST['orderby'] : 'product_name';

			$order = ( ! empty( $_REQUEST['order'] ) ) ? $_REQUEST['order'] : 'asc';

			$result = strcmp( $a[ $orderby ], $b[ $orderby ] );

			return ( $order === 'asc' ) ? $result : -$result;
		}

		/**
		 * Define the columns that are going to be used in the table.
		 *
		 * @return array $columns, the array of columns to use with the table
		 */
		public function get_columns() {
			$columns = array(
				'cb'             => '<input type="checkbox" />',

				'product_name'   => __( 'Product Name', 'wc_pos' ),

				'image'          => __( 'Image', 'wc_pos' ),

				'outlet'         => __( 'Outlet', 'wc_pos' ),

				'price'          => __( 'Price', 'wc_pos' ),

				'total_quantity' => __( 'Total Quantity', 'wc_pos' ),

				'status'         => __( 'Status', 'wc_pos' ),

				'barcode'        => __( 'Barcode', 'wc_pos' ),
			);

			if ( ! $this->centralized_inventory_enabled ) {
				$columns['assign_pos'] = __( 'Assigned POS Quantity', 'wc_pos' );
			}

			return $columns;
		}

		public function column_default( $item, $column_name ) {
			switch ( $column_name ) {
				case 'product_name':
				case 'image':
				case 'outlet':
				case 'price':
				case 'total_quantity':
				case 'status':
				case 'barcode':
				case 'assign_pos':
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
			return array(
				'product_name' => array( 'product_name', true ),

				'status'       => array( 'status', true ),
			);
		}

		public function get_hidden_columns() {
			return array();
		}

		public function column_cb( $item ) {
			return sprintf( '<input type="checkbox" id="pos_product_%s" name="pos_product[]" value="%s" />', $item['id'], $item['id'] );
		}

		private function table_data() {
			$perpage = get_option( 'posts_per_page', true );

			if ( isset( $_GET['paged'] ) ) {
				$page = $_GET['paged'];
			} else {
				$page = 1;
			}

			$off = ( $page - 1 ) * $perpage;

			$search_query = ! empty( $_GET['s'] ) ? sanitize_text_field( $_GET['s'] ) : '';

			$filtered_outlet = ! empty( $_GET['outlet'] ) ? sanitize_text_field( $_GET['outlet'] ) : '';

			$products = $this->product_obj->get_all_pos_products( $search_query, $off, $perpage, $filtered_outlet );

			$data = array();

			add_thickbox();

			if ( ! empty( $products ) ) {
				foreach ( $products as $product ) {
					extract( $product );
					$product_id = $product['product_id'];
					$outlet_id  = $product['outlet_id'];
					$p_value    = wc_get_product( $product_id );
					if ( $p_value && $p_value->post_type == 'product' ) {
						$image = $p_value->get_image();
						$name  = $p_value->get_title();
						$price = wc_price( $p_value->get_price() );

						$stock        = $p_value->get_stock_quantity() ? $p_value->get_stock_quantity() : 0;
						$manage_stock = $p_value->get_manage_stock() ? $p_value->get_manage_stock() : '';
						if ( $manage_stock ) {
							$stock = (int) $stock;
						} else {
							$stock = $p_value->get_stock_status() ? $p_value->get_stock_status() : '';
						}

						$status      = $p_value->get_status();
						$barcode_id  = get_post_meta( $product_id, '_pos_barcode_id', true );
						$barcode_sku = get_post_meta( $product_id, '_pos_barcode_sku', true );
						if ( $p_value->is_type( 'variable' ) ) {
							?>
							<div id="pos-variable-product-barcode-thickbox-<?php echo $product_id; ?>" style="display:none;">
							<p><strong style="width:310px;display:inline-block;"><?php echo __( 'Product', 'wc_pos' ); ?>
								</strong><strong style="width:195px;display:inline-block;"><?php echo __( 'Barcode(By ID & SKU)', 'wc_pos' ); ?></strong><strong><?php echo __( 'Print barcode', 'wc_pos' ); ?></strong></p>
							<hr>
							<?php
							if ( $p_value->get_available_variations() ) {
								foreach ( $p_value->get_available_variations() as $key => $value ) {
									$variation_data = wc_get_product( $value['variation_id'] );
									$sku            = $variation_data->get_sku();
									$var_id         = $value['variation_id'];
									$barcode_id     = get_post_meta( $var_id, '_pos_barcode_id', true );
									$barcode_sku    = get_post_meta( $var_id, '_pos_barcode_sku', true );
									?>
									<p>
										<strong style="width:300px;display:inline-block;"><?php echo $variation_data->get_formatted_name(); ?></strong><span style="width:200px;display:inline-block;">
																									 <?php
																										$barcode_image = '';
																										if ( ! empty( $barcode_id ) ) {
																											echo '<img src="' . WK_WC_POS_API . 'library/barcode-image.php?code=' . $barcode_id . '" alt="barcode" style="max-width: 200px;"/></br>';
																										} else {
																											echo esc_html__( 'No Barcode Image By ID', 'wc_pos' ) . '</br>';
																										}
																										if ( ! empty( $barcode_sku ) ) {
																											echo '<img src="' . WK_WC_POS_API . 'library/barcode-image.php?code=' . $barcode_sku . '" alt="barcode" style="max-width: 200px;"/>';
																										} else {
																											echo esc_html__( 'No Barcode Image By SKU', 'wc_pos' );
																										}

																										do_action( 'WKWCPOS_add_custom_barcode_for_variation', $var_id );
																										echo '</span>';
																										$barcode_id  = $barcode_id ? WK_WC_POS_API . 'library/barcode-image.php?code=' . $barcode_id : '';
																										$barcode_sku = $barcode_sku ? WK_WC_POS_API . 'library/barcode-image.php?code=' . $barcode_sku : '';

																										$custom_data_value = apply_filters( 'WKWCPOS_add_custom_data_option', '', $var_id );
																										$title             = get_the_title( $var_id );
																										$print_barcode     = '<a href="' . admin_url( 'admin.php?page=pos-products' ) . '" class="print-barcode" data-sku="' . $sku . '" data-title="' . $title . '" data-image-id="' . $barcode_id . '" data-image-sku="' . $barcode_sku . '"  alt="barcode" ' . $custom_data_value . ' style="display:inline-block; position:absolute;right: 25px;"/>Print Barcode </a>';

																										echo apply_filters( 'wkwcpos_add_print_variation_coloum_', $print_barcode, $var_id, $custom_data_value );

																										ob_start();
																										$barcode_image = ob_get_clean();
																										?>
									</p>
									<?php
								}
							}
							?>
							<hr>
							</div>

							<?php
							$barcode_image = '<a href="#TB_inline?width=600&height=auto&inlineId=pos-variable-product-barcode-thickbox-' . $product_id . '" title="' . __( 'Variations', 'wc_pos' ) . '" class="thickbox button-primary">' . __( 'barcode', 'wc_pos' ) . '</a>';
						} else {
							$barcode_image = '';
							if ( ! empty( $barcode_id ) ) {
								ob_start();
								echo '<p><strong>' . esc_html__( 'By ID', 'wc_pos' ) . '</strong></p>';
								echo '<img src="' . WK_WC_POS_API . 'library/barcode-image.php?code=' . $barcode_id . '" alt="barcode" style="max-width: 125px;min-height: 21px;"/>';
							} else {
								ob_start();
							}
							if ( ! empty( $barcode_sku ) ) {
								echo '<p><strong>' . esc_html__( 'By SKU', 'wc_pos' ) . '</strong></p>';
								echo '<img src="' . WK_WC_POS_API . 'library/barcode-image.php?code=' . $barcode_sku . '" alt="barcode" style="max-width: 125px;min-height: 21px;"/>';
								$barcode_image = ob_get_clean();
							} else {
								$barcode_image = ob_get_clean();
							}
						}
						$barcode_image = apply_filters( 'WKWCPOS_show_custom_barcode', $barcode_image, $product_id );

						$outlet = $this->pproduct_obj->get_pos_outlet_name( $outlet_id );
						$pstock = $this->pproduct_obj->get_total_stock( $product_id, $outlet_id );
						$pstock = ! empty( $pstock ) ? array_column( $pstock, 'stock' )[0] : '';

						if ( $p_value->is_type( 'variable' ) ) {
							?>
							<div id="pos-variable-product-thickbox-<?php echo $product_id; ?>" style="display:none;">
								<p><strong style="width:350px;display:inline-block;"><?php echo __( 'Product', 'wc_pos' ); ?>
									</strong><strong><?php echo __( 'Assigned POS Quantity', 'wc_pos' ); ?></strong></p>
								<hr>
								<?php
								if ( $p_value->get_available_variations() ) {
									foreach ( $p_value->get_available_variations() as $key => $value ) {
										$variation_data = wc_get_product( $value['variation_id'] );
										$pstock         = $this->pproduct_obj->get_pos_product_stock( $value['variation_id'], $outlet_id );
										?>
									<p><strong style="width:350px;display:inline-block;"><?php echo $variation_data->get_formatted_name(); ?>
										</strong><?php echo esc_html( $pstock ); ?></p>
										<?php
									}
								}
								?>
								<hr>
							</div>

							<?php
							$pstock_data = '<a href="#TB_inline?width=200&height=auto&inlineId=pos-variable-product-thickbox-' . $product_id . '" title="' . __( 'Variations', 'wc_pos' ) . '" class="thickbox button-primary">' . __( 'Variation stock', 'wc_pos' ) . '</a>';
						} else {
							$pstock_data = $pstock;
						}

						$pos_products_data = array(
							'id'             => $product_id,

							'outlet'         => $outlet,

							'image'          => $image,

							'product_name'   => $name,

							'price'          => $price,

							'total_quantity' => $stock,

							'status'         => $status,

							'barcode'        => $barcode_image,
						);

						if ( ! $this->centralized_inventory_enabled ) {
							$pos_products_data['assign_pos'] = $pstock_data;
						}

						$data[] = $pos_products_data;
					}
				}
			}

			return $data;
		}

		/**
		 * Bulk actions on list.
		 */
		public function get_bulk_actions() {
			return apply_filters(
				'wkwcpos_add_bulk_action_in_product_page',
				array(
					'generate_barcode'     => __( 'Generate Barcode by ID', 'wc_pos' ),
					'generate_barcode_sku' => __( 'Generate Barcode by SKU', 'wc_pos' ),
				)
			);
		}

		/**
		 * Process bulk actions.
		 */
		public function process_bulk_action() {
			$count = 0;
			if ( $this->current_action() === 'generate_barcode' ) {
				if ( isset( $_GET['pos_product'] ) && ! empty( $_GET['pos_product'] ) ) {
					if ( is_array( $_GET['pos_product'] ) ) {
						$ids             = $_GET['pos_product'];
						$generated_count = 0;
						foreach ( $ids as $id ) {
							$barcode = '';
							$product = wc_get_product( $id );
							if ( $product->is_type( 'variable' ) ) {
								$var = $product->get_available_variations();
								foreach ( $var as $key => $value ) {
									$var_id  = $value['variation_id'];
									$barcode = get_post_meta( $var_id, '_pos_barcode_id', true );

									$code = wkwcpos_barcode( '', 'id' . $id . '&' . $var_id );

									if ( empty( $barcode ) ) {
										update_post_meta( $var_id, '_pos_barcode_id', $code );
										$generated_count++;
										$generated = true;
									}
								}
							} else {
								$barcode = get_post_meta( $id, '_pos_barcode_id', true );

								$code = wkwcpos_barcode( '', 'id' . $id );

								if ( empty( $barcode ) ) {
									update_post_meta( $id, '_pos_barcode_id', $code );
									$generated_count++;
									$generated = true;

								}
							}
						}
						if ( true || ! empty( $generated_count ) ) {
							$this->error_obj->wk_wc_pos_print_notification( __( 'Barcode generated by ID successfully.', 'wc_pos' ) );
						}
					} else {
						$id      = $_GET['pos_product'];
						$barcode = '';
						$product = wc_get_product( $id );
						if ( $product->is_type( 'variable' ) ) {
							$var = $product->get_available_variations();
							foreach ( $var as $key => $value ) {
								$var_id  = $value['variation_id'];
								$barcode = get_post_meta( $var_id, '_pos_barcode_id', true );
								$title   = 'wkpos' . $id;

								$code = wkwcpos_barcode( '', 'id' . $id . '&' . $var_id );
								if ( empty( $barcode ) ) {
									update_post_meta( $var_id, '_pos_barcode_id', $code );
									$this->error_obj->wk_wc_pos_print_notification( __( 'Barcode generated by ID successfully.', 'wc_pos' ) );
								}
							}
						} else {
							$barcode = get_post_meta( $id, '_pos_barcode_id', true );

							$code = wkwcpos_barcode( '', 'id' . $id );
							if ( empty( $barcode ) ) {
								update_post_meta( $id, '_pos_barcode_id', $code );
								$this->error_obj->wk_wc_pos_print_notification( __( 'Barcode generated by ID successfully.', 'wc_pos' ) );
							}
						}
					}
				}
			}

			if ( $this->current_action() === 'generate_barcode_sku' ) {
				if ( isset( $_GET['pos_product'] ) && ! empty( $_GET['pos_product'] ) ) {
					if ( is_array( $_GET['pos_product'] ) ) {
						$ids = $_GET['pos_product'];
						foreach ( $ids as $id ) {
							$barcode = '';
							$product = wc_get_product( $id );
							if ( $product->is_type( 'variable' ) ) {
								$var = $product->get_available_variations();
								foreach ( $var as $key => $value ) {
									$var_id      = $value['variation_id'];
									$barcode     = get_post_meta( $var_id, '_pos_barcode_sku', true );
									$title       = 'wkpos' . $id;
									$var_product = wc_get_product( $var_id );
									if ( ! empty( $var_product->get_sku() ) ) {
										$code = wkwcpos_barcode( '', 'sku' . $id . '&' . $var_product->get_sku() );
										if ( empty( $barcode ) ) {
											update_post_meta( $var_id, '_pos_barcode_sku', $code );
											$generated = true;
										}
									}
								}
							} else {
								$barcode = get_post_meta( $id, '_pos_barcodes_sku', true );
								$title   = 'wkpos' . $id;

								if ( ! empty( $product->get_sku() ) ) {
									$code = wkwcpos_barcode( '', 'sku' . $product->get_sku() );
									if ( empty( $barcode ) ) {
										update_post_meta( $id, '_pos_barcode_sku', $code );
										$generated = true;
									}
								}
							}
						}
						if ( ! empty( $generated ) ) {
							$this->error_obj->wk_wc_pos_print_notification( __( 'Barcode generated by SKU successfully.', 'wc_pos' ) );
						}
					} else {
						$id      = $_GET['pos_product'];
						$barcode = '';
						$product = wc_get_product( $id );
						if ( $product->is_type( 'variable' ) ) {
							$var = $product->get_available_variations();
							foreach ( $var as $key => $value ) {
								$var_id      = $value['variation_id'];
								$barcode     = get_post_meta( $var_id, '_pos_barcode_sku', true );
								$title       = 'wkpos' . $id;
								$var_product = wc_get_product( $var_id );
								if ( ! empty( $var_product->get_sku() ) ) {
									$code = wkwcpos_barcode( '', 'sku' . $id . '&' . $var_product->get_sku() );
									if ( empty( $barcode ) ) {
										update_post_meta( $var_id, '_pos_barcode_sku', $code );
										$this->error_obj->wk_wc_pos_print_notification( __( 'Barcode generated by SKU successfully.', 'wc_pos' ) );
									}
								}
							}
						} else {
							$barcode = get_post_meta( $id, '_pos_barcodes_sku', true );
							$title   = 'wkpos' . $id;

							if ( ! empty( $product->get_sku() ) ) {
								$code = wkwcpos_barcode( '', 'sku' . $product->get_sku() );
								if ( empty( $barcode ) ) {
									update_post_meta( $id, '_pos_barcode_sku', $code );
									$this->error_obj->wk_wc_pos_print_notification( __( 'Barcode generated by SKU successfully.', 'wc_pos' ) );
								}
							}
						}
					}
				}
			}
			do_action( 'wkwcpos_custom_bulk_action_in_product_page', $_GET );
			if ( $count > 0 ) {
				echo  '<div class="notice notice-error is-dismissible">';
				echo '<p>' . __( 'Commision id is not valid.', 'wc_pos' ) . '</p>';
				echo '</div>';
			}
		}

		public function column_product_name( $item ) {
			$product     = wc_get_product( $item['id'] );
			$sku         = $product->get_sku();
			$barcode_id  = get_post_meta( $item['id'], '_pos_barcode_id', true );
			$barcode_id  = $barcode_id ? WK_WC_POS_API . 'library/barcode-image.php?code=' . $barcode_id : '';
			$barcode_sku = get_post_meta( $item['id'], '_pos_barcode_sku', true );
			$barcode_sku = $barcode_sku ? WK_WC_POS_API . 'library/barcode-image.php?code=' . $barcode_sku : '';

			$paged           = ! empty( $_REQUEST['paged'] ) ? $_REQUEST['paged'] : 1;
			$search_query    = ! empty( $_GET['s'] ) ? sanitize_text_field( $_GET['s'] ) : '';
			$filtered_outlet = ! empty( $_GET['outlet'] ) ? sanitize_text_field( $_GET['outlet'] ) : '';

			$actions = apply_filters(
				'wkwcpos_add_coloum_action',
				array(
					'print_barcode'        => sprintf( '<a href="' . admin_url( 'admin.php?page=pos-products' ) . '" class="print-barcode" data-sku="%s" data-image-id="%s" data-image-sku="%s" data-title="%s">%s</a>', $sku, $barcode_id, $barcode_sku, get_the_title( $item['id'] ), esc_html__( 'Print Barcode', 'wc_pos' ) ),
					'generate_barcode'     => sprintf( '<a href="' . admin_url( 'admin.php?page=pos-products&action=generate_barcode&pos_product=%s&paged=%d&s=%s&outlet=%s' ) . '">%s</a>', $item['id'], $paged, $search_query, $filtered_outlet, esc_html__( 'Generate Barcode by ID', 'wc_pos' ) ),
					'generate_barcode_sku' => sprintf( '<a href="' . admin_url( 'admin.php?page=pos-products&action=generate_barcode_sku&pos_product=%s&paged=%d&s=%s&outlet=%s' ) . '">%s</a>', $item['id'], $paged, $search_query, $filtered_outlet, esc_html__( 'Generate Barcode by SKU', 'wc_pos' ) ),
				),
				$item
			);

			$product = wc_get_product( $item['id'] );

			if ( ! empty( $product ) && is_object( $product ) && $product->get_type() == 'variable' ) {
				unset( $actions['print_barcode'] );
			}

			return sprintf( '%1$s %2$s', $item['product_name'], $this->row_actions( $actions ) );
		}

		/**
		 * List Filters.
		 *
		 * @param string $which position of filter
		 */
		public function extra_tablenav( $which ) {
			$this->outlet_helper = new WC_Pos_Outlet_Helper();

			$all_outlets = $this->outlet_helper->pos_get_all_outlets();

			$selected_outlet = '';
			if ( 'top' === $which ) {
				if ( isset( $_GET['outlet'] ) ) {
					$selected_outlet = $_GET['outlet'];
				}
				?>
				<div class="alignleft actions bulkactions">
					<select name="outlet" class="pos_input_css">
						<option value=""><?php esc_html_e( 'Select Outlet', 'wc_pos' ); ?></option>
						
						<?php

						foreach ( $all_outlets as $key => $outlet ) {
							?>
							<option value="<?php echo esc_attr( $outlet->id ); ?>"
							<?php
							if ( $outlet->id == $selected_outlet ) {
								echo esc_attr( 'selected="selected"' );
							}
							?>
							><?php echo esc_html( $outlet->outlet_name ); ?></option>
							<?php
						}
						?>

					</select>

					<input type="submit" class="button" value="<?php esc_attr_e( 'Filter', 'wc_pos' ); ?>" />

				</div>
				<?php
			}
		}
	}
}

$pos_products = new WC_Pos_Products_List();

$pos_products->prepare_items();

?>

<div class="wrap">

	<h2 class="hndle ui-sortable-handle"><span><?php echo __( 'POS Products', 'wc_pos' ); ?> </span></h2>

	<form method="GET">

		<input type="hidden" name="page" value="<?php echo esc_attr( $_REQUEST['page'] ); ?>" />

		<?php

		$pos_products->search_box( esc_html__( 'Search', 'wc_pos' ), 'search-product' );

		$pos_products->display();

		?>

	</form>

	<div id="printBarcode">
		<div class="wc-pos-barcode-print-wrapper">
			<div class="header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="title"><?php esc_html_e( 'Enter the number of barcode slips', 'wc_pos' ); ?></h4>
			</div>
			<div>
				<?php $form_class = apply_filters( 'WKWCPOS_custom_barcode_genrate', 'wc-pos-barcode-generate' ); ?>
				<form class="<?php echo esc_attr( $form_class ); ?>" action="" method="post">
					<div class="form-group">
						<?php
						if ( apply_filters( 'WKWCPOS_custom_barcode_genrate_option', true ) ) {
							?>
							<label class="control-label col-sm-3" for="barcode-quantity"><?php esc_html_e( 'Barcode By', 'wc_pos' ); ?></label>
							<div class="col-sm-9">
							<select name="type" id="barcode-type" class="form-control" style="width:100%">
								<option value='sku'><?php esc_html_e( 'SKU', 'wc_pos' ); ?></option>
								<option value='id'><?php esc_html_e( 'ID', 'wc_pos' ); ?></option>
								<?php echo apply_filters( 'WKWCPOS_add_custom_option', '' ); ?>
							</select>
							<?php
						}
						?>
						</div>
						<label class="control-label col-sm-3" for="barcode-quantity"><?php esc_html_e( 'Quantity', 'wc_pos' ); ?></label>
						<div class="col-sm-9">
							<input type="number" min="1" name="quantity" id="barcode-quantity" class="form-control">
						</div>
					</div>
					<div class="col-sm-12 text-center">
						<input type="submit" class="barcode-print" value="<?php esc_attr_e( 'Print', 'wc_pos' ); ?>">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
