<?php
/**
* @author Webkul
* @version 2.0.0
* This file handles helper config class.
*/

namespace WKWC_POS\Helper\Outlet;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Pos_Outlet_Helper' ) ) {

	/**
	* Class for includin core pos user data.
	*/
	class WC_Pos_Outlet_Helper implements Util\Outlet_Interface {

		public $table_name = '';
		public $outlet_id = '';
		public $wpdb = '';

		/**
		* Class constructor.
		*/
		public function __construct( $outlet_id = '' ) {

			global $wpdb;

			$this->wpdb = $wpdb;
			$this->table_name = $this->wpdb->prefix. 'woocommerce_pos_outlets';
			$this->table_name2 = $this->wpdb->prefix . 'woocommerce_pos_outlet_map';
			$this->table_name3 = $this->wpdb->prefix . 'woocommerce_pos_outlet_product_map';

			if( !empty( $outlet_id ) ) {
				$this->outlet_id = $outlet_id;
			}

		}

		public function update_outlet_status( $action, $outlet_id ) {

			switch ( $action ) {
				case 'activate':
					# code...
					$status = 0;
					break;

				case 'deactivate':
					# code...
					$status = 1;
					break;

				case 'delete':
					# code...
					$status = 0;
					break;

				default:
					# code...
					$status = 0;
					break;
			}

			$response = $this->wpdb->update(
				$this->table_name,
				array(
					'outlet_status' => $status,
				),
				array(
					'id' => intval( $outlet_id ),
				),
				array(
					'%d',
				),
				array(
					'%d',
				)
			);

			return $response;
		}

		public function delete_vendor_outlet($outlet_id) {

			$response = $this->wpdb->delete(

				$this->table_name,
				array(
					'id' => $outlet_id,
				),
				array(
					'%d'
				)
			);

			if ( $response ) {

				$this->wpdb->delete(

					$this->table_name2,
					array(
						'outlet_id' => $outlet_id
					),
					array(
						'%d'
					)
				);

				$this->wpdb->delete(

					$this->table_name3,
					array(
						'outlet_id' => $outlet_id,
					),
					array(
						'%d'
					)
				);

				return true;

			} else {

				return false;
			}

		}

		public function pos_get_all_outlet_by_search_count( $text = '' ) {

			$text = apply_filters( 'wkwcpos_modify_search_term_for_getting_all_outlets_count', $text );

			$response = array();

			if( !empty( $text ) ) {

				$response = $this->wpdb->get_var( $this->wpdb->prepare( "Select count(*) from $this->table_name where outlet_name like %s", '%'.$text.'%' ) );

			} else {

				$response = $this->wpdb->get_var( $this->wpdb->prepare( "Select count(*) from $this->table_name where outlet_name like %s", '%'.$text.'%' ) );

			}

			return apply_filters( 'wkwcpos_modify_all_outlets_count', $response, $text );

		}

		public function pos_get_all_outlet_by_search( $text, $off, $perpage ) {

			$text = apply_filters( 'wkwcpos_modify_search_term_for_getting_all_outlets', $text );

			$response = array();

			if( !empty( $text ) ) {

				$response = $this->wpdb->get_results( $this->wpdb->prepare( "Select * from $this->table_name where outlet_name like %s LIMIT $perpage OFFSET $off", '%'.$text.'%' ) );

			} else {

				$response = $this->wpdb->get_results( "Select * from $this->table_name LIMIT $perpage OFFSET $off" );

			}

			return apply_filters( 'wkwcpos_modify_all_outlets', $response, $text, $off, $perpage );

		}

		public function pos_get_all_outlets() {

			$response = array();

			$response = $this->wpdb->get_results( "Select * from $this->table_name" );

			return apply_filters( 'wkwcpos_modify_all_outlets_for_filter_values', $response );

		}

		public function _get_pos_outlet() {

			$response = $this->wpdb->get_row( "select * from $this->table_name where id=" . $this->outlet_id );

			return apply_filters( 'wkwcpos_modify_outlet_by_outlet_id', $response, $this->outlet_id );

		}

		public function _get_pos_user_outlet() {

			$response = $this->wpdb->get_var( "select outlet_id from $this->table_name where user_id=" . $this->outlet_id );

			return apply_filters( 'wkwcpos_modify_outlet_id_by_user_id', $response, $this->outlet_id );

		}

	}

}
