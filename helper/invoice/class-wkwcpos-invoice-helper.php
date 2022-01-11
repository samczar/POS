<?php
/**
* @author Webkul
* @version 2.0.0
* This file handles helper config class.
*/

namespace WKWC_POS\Helper\Invoice;

use WKWC_POS\Inc\WC_Pos_Errors;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WKWCPOS_Invoice_Helper' ) ) {

	/**
	* Class for includin core pos user data.
	*/
	class WKWCPOS_Invoice_Helper {

		public $table_name = '';
		public $wpdb;

		/**
		* Class constructor.
		*/
		public function __construct() {
			global $wpdb;

			$this->wpdb = $wpdb;

			$this->error_obj = new WC_Pos_Errors();

			$this->table_name = $this->wpdb->prefix. 'woocommerce_pos_invoice_templates';
		}

		public function wkwcpos_get_all_invoice_templates_count( $search = '' ) {

			return $this->wpdb->get_var( $this->wpdb->prepare( "SELECT count(*) from $this->table_name WHERE name LIKE %s", '%' . $search . '%' ) );

		}

		public function wkwcpos_get_all_invoice_templates( $search = '', $perpage, $offset ) {


			return $this->wpdb->get_results( $this->wpdb->prepare( "SELECT * from $this->table_name WHERE name LIKE %s limit %d OFFSET %d", '%' . $search . '%', $perpage, $offset ), ARRAY_A );

		}

		public function wkwcpos_get_invoice_template( $id ) {

			return $this->wpdb->get_row( $this->wpdb->prepare( "SELECT * from $this->table_name WHERE id=%d", $id ), ARRAY_A );

		}

		public function wkwcpos_delete_invoice_template( $id ) {

			return $this->wpdb->delete(
				$this->table_name,
				array(
					'id' => $id,
				),
				array( '%d' )
			);

		}

		public function wkwcpos_save_invoice_template() {

			$name = ! empty( $_POST[ '_wkwcpos_invoice_name' ] ) ? sanitize_text_field( $_POST[ '_wkwcpos_invoice_name' ] ) : '';

			$id = ! empty( $_GET[ 'id' ] ) ? $_GET[ 'id' ] : '';

			if ( ! empty( $name ) ) {
				if ( ! empty( $id ) ) {
					$name_exists = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT id FROM $this->table_name WHERE name=%s AND id!=%d", $name, $id ) );

					if ( ! empty( $name_exists ) ) {
						$this->error_obj->set_error_code(1);
						$this->error_obj->wk_wc_pos_print_notification(__('Name already exists', 'wc_pos'));
					} else {
						$this->wpdb->update(
							$this->table_name,
							[
								'name' => $name,
								'modified_at' => current_time( 'Y-m-d H:i:s' ),
							],
							[ 'id' => $id ],
							[ '%s', '%s' ],
							[ '%d' ]
						);
						$result = 'updated';
					}
				} else {
					$name_exists = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT id FROM $this->table_name WHERE name=%s", $name ) );

					if ( ! empty( $name_exists ) ) {
						$this->error_obj->set_error_code(1);
						$this->error_obj->wk_wc_pos_print_notification(__('Name already exists', 'wc_pos'));
					} else {
						$this->wpdb->insert(
							$this->table_name,
							[
								'name'         => $name,
								'invoice_html' => '',
								'created_at'   => current_time( 'Y-m-d H:i:s' ),
								'modified_at'  => current_time( 'Y-m-d H:i:s' ),
							],
							[ '%s', '%s', '%s', '%s' ]
						);
						$id = $this->wpdb->insert_id;
						$result = 'created';
					}
				}
			} else {
				$this->error_obj->set_error_code(1);
				$this->error_obj->wk_wc_pos_print_notification(__('Enter invoice name', 'wc_pos'));
			}

			if ( $this->error_obj->get_error_code() == 0 ) {
				wp_safe_redirect( admin_url( "admin.php?page={$_GET['page']}&action=edit&id={$id}&result={$result}" ) );
				exit();
			}

		}

		public function wkwcpos_save_invoice_html( $data ) {

			$invoice_html = ! empty( $data[ 'invoice_html' ] ) ? $data[ 'invoice_html' ] : '';

			$id = ! empty( $data[ 'id' ] ) ? $data[ 'id' ] : '';

			if ( ! empty( $id ) && ! empty( $data ) ) {
				$this->wpdb->update(
					$this->table_name,
					[
						'invoice_html' => $invoice_html,
						'modified_at' => current_time( 'Y-m-d H:i:s' ),
					],
					[ 'id' => $id ],
					[ '%s', '%s' ],
					[ '%d' ]
				);

				return true;
			}

			return false;

		}

	}

}
