<?php
/**
 * @author Webkul
 *
 * @version 2.0.0
 * This file handles helper outlet product data.
 */

namespace WKWC_POS\Helper\Outlet\Product;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('Outlet_Product_Helper')) {
    /**
     * Class for including core outlet product data.
     */
    class Outlet_Product_Helper
    {
        public $table_name_post = '';
        public $table_name_map = '';
        public $outlet_id = '';
        public $wpdb = '';
        public $table_name_outlet = '';

        /**
         * Class constructor.
         */
        public function __construct($outlet_id = '')
        {
            global $wpdb;

            $this->wpdb = $wpdb;
            $this->table_name_post = $this->wpdb->prefix.'posts';
            $this->table_name_map = $this->wpdb->prefix.'woocommerce_pos_outlet_product_map';
            $this->table_name_outlet = $this->wpdb->prefix.'woocommerce_pos_outlets';

            if (!empty($outlet_id)) {
                $this->outlet_id = $outlet_id;
            }
        }

        public function get_count_outlet_product( $search_query = '' )
        {
            $response = 0;

            $response = $this->wpdb->get_var("SELECT count(ID) FROM $this->table_name_post WHERE post_type='product' AND post_status='publish' AND post_title LIKE '%$search_query%'");

            return apply_filters('wk_pos_wpml_get_count_outlet_product', $response, $search_query);
        }

        public function get_all_products_by_vendor($off, $perpage)
        {
            $result = array();

            $result = $this->wpdb->get_results("SELECT ID FROM $this->table_name_post WHERE post_type='product' AND post_status='publish' LIMIT $perpage OFFSET $off", ARRAY_A);

            $args = array(
                'off' => $off,
                'perpage' => $perpage,
            );

            return apply_filters('wk_pos_wpml_get_all_products_by_vendor', $result, $args);
        }

        public function get_all_products_by_search($search_query, $off, $perpage)
        {
            $result = array();

            $result = $this->wpdb->get_results("SELECT ID FROM $this->table_name_post WHERE post_type='product' AND post_status='publish' AND post_title like '%$search_query%' LIMIT $perpage OFFSET $off", ARRAY_A);

            $args = array(
                'search_query' => $search_query,
                'off' => $off,
                'perpage' => $perpage,
            );

            return apply_filters('wk_pos_wpml_get_all_products_by_search', $result, $args);
        }

        public function get_pos_product_status($pro_id, $outlet_id)
        {
            $pos_status = $this->wpdb->get_var($this->wpdb->prepare("SELECT pos_status from $this->table_name_map where product_id=%d AND outlet_id=%d", $pro_id, $outlet_id));

            $pos_status = apply_filters('wkwcpos_modify_outlet_product_status_by_outlet_and_product_id', $pos_status, $outlet_id, $pro_id);

            return $pos_status;
        }

        public function save_pos_product_status($pro_id, $outlet_id)
        {

            $product = wc_get_product($pro_id);

            if ($product->get_type() == 'variable') {
                $this->wpdb->insert(
                    $this->table_name_map,
                    array(
                        'outlet_id' => $outlet_id,
                        'product_id' => $pro_id,
                        'pos_status' => 'enabled',
                        'pos_stock' => 1000000,
                    )
                );
            } else {

                $this->wpdb->insert(
                    $this->table_name_map,
                    array(
                        'outlet_id' => $outlet_id,
                        'product_id' => $pro_id,
                        'pos_status' => 'enabled',
                        'pos_stock' => 0,
                    )
                );
            }

            if ( !empty( $this->wpdb->insert_id ) ) {
                return true;
            } else {
                return false;
            }
        }

        public function update_pos_product_status($pro_id, $outlet_id, $st)
        {
            $pos_outlet_status = $st;

            $product = wc_get_product($pro_id);

            if ($product->get_type() == 'variable') {
                $res = $this->wpdb->update(
                    $this->table_name_map,
                    array(
                        'pos_status' => $pos_outlet_status,
                        'pos_stock' => 1000000,
                    ),
                    array('product_id' => $pro_id, 'outlet_id' => $outlet_id)
                );
            } else {

                if ($pos_outlet_status == 'disabled') {
                    $res = $this->wpdb->update(
                        $this->table_name_map,
                        array(
                            'pos_status' => $pos_outlet_status,
                        ),
                        array('product_id' => $pro_id, 'outlet_id' => $outlet_id)
                    );

                    if (!empty($res)) {
                        return true;
                    } else {
                        return false;
                    }
                } elseif ($pos_outlet_status == 'enabled') {
                    $res = $this->wpdb->update(
                        $this->table_name_map,
                        array(
                            'pos_status' => $pos_outlet_status,
                        ),
                        array('product_id' => $pro_id, 'outlet_id' => $outlet_id)
                    );

                    if (!empty($res)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }

        public function get_all_outlet_id()
        {
            $outlet_arr = array();

            $res_out = $this->wpdb->get_results("select id,outlet_name from $this->table_name_outlet");

            if (!empty($res_out)) {
                foreach ($res_out as $key => $value) {
                    $outlet_arr[$value->id] = $value->id;
                }
            }

            $outlet_arr = apply_filters('wkwcpos_modify_outlet_id_data', $outlet_arr);

            return $outlet_arr;
        }

        public function get_pos_product_master_stock($pro_id)
        {
            $rp = get_post_meta($pro_id, '_pos_master_stock', true);

            return apply_filters('wkwcpos_modify_product_master_stock_by_product_id', $rp, $pro_id);
        }

        public function get_product_total_stock($product_id)
        {
            $result = $this->wpdb->get_results($this->wpdb->prepare("SELECT pos_stock FROM $this->table_name_map WHERE product_id =%d", $product_id));

            return apply_filters('wkwcpos_modify_product_total_pos_stock_by_product_id', $result, $product_id);
        }

        public function check_parent($arr_ids, $cat_id)
        {
            $cat = get_term($cat_id);

            $parent_id = $cat->parent;

            if ($parent_id != 0) {
                $arr_ids[] = $parent_id;

                $this->check_parent($arr_ids, $parent_id);
            }

            return $arr_ids;
        }

        public function get_pos_product_cat($pro_id)
        {
            $product_cat_id = array();

            $terms = get_the_terms($pro_id, 'product_cat');

            if ($terms) {
                foreach ($terms as $term) {
                    $product_cat_id[] = $term->term_id;

                    if ($term->parent != 0) {
                        $product_cat_id[] = $term->parent;

                        $product_cat_id = $this->check_parent($product_cat_id, $term->parent);
                    }
                }
            }

            return apply_filters('wkwcpos_modify_product_category_ids_by_product_id', $product_cat_id, $pro_id);
        }

        public function get_pos_product_stock($product_id, $outlet_id = '')
        {
            if (empty($outlet_id)) {
                $outlet_id = $_GET['outlet_id'];
            }

            $result = $this->wpdb->get_var($this->wpdb->prepare("SELECT pos_stock FROM $this->table_name_map WHERE product_id =%d and outlet_id=%d", $product_id, $outlet_id));

            return apply_filters('wkwcpos_modify_product_pos_stock_by_product_and_outlet_id', $result, $product_id, $outlet_id);
        }

        public function get_pos_variable_product_master_stock($pro_id)
        {
            $rp = get_post_meta($pro_id, '_pos_variation_master_stock', true);

            return apply_filters('wkwcpos_modify_variation_master_stock_by_variation_id', $rp, $pro_id);
        }

        public function get_pos_outlet_name($outlet_id)
        {
            $outlet_name = $this->wpdb->get_var($this->wpdb->prepare("SELECT outlet_name FROM $this->table_name_outlet WHERE id =%d", $outlet_id));

            return apply_filters('wkwcpos_modify_outlet_name_by_outlet_id', $outlet_name, $outlet_id);
        }

        public function get_total_stock($pro_id, $outlet_id = '')
        {
            $result = $this->wpdb->get_results($this->wpdb->prepare("SELECT SUM(pos_stock) AS stock FROM $this->table_name_map WHERE product_id =%d and outlet_id=%d", $pro_id, $outlet_id), ARRAY_A);

            return apply_filters('wkwcpos_modify_product_total_pos_stock_by_product_and_outlet_id', $result, $pro_id, $outlet_id);
        }
    }
}
