<?php
/**
 * WooCommerce POS API setup.
 *
 * @author   Webkul
 *
 * @category API
 *
 * @since    3.2.0
*/

namespace WKWC_POS\Api\Includes\Products;

use WKWC_POS\Api\Inc\WKWCPOS_API_Error_Handler;
use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;
use WKWC_POS\Api\Helper\WKWCPOS_API_User_Outlet_Helper;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class WKWCPOS_API_Product_Categories {
    /**
     * Base Name.
     *
     * @var string the route base
     */
    public $base = 'get-all-categories';

    /**
     * Namespace Name.
     *
     * @var string the route namespace
     */
    public $namespace = 'pos/v1';

    /**
     * Constructor.
     */
    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->error = new WKWCPOS_API_Error_Handler();
        $this->authentication = new WKWCPOS_API_Authentication();
        $this->helper  = new WKWCPOS_API_User_Outlet_Helper();
    }

    /**
     * API Callback.
     */
    public function get_all_categories($request)
    {
        try {

            $user_id = $request['logged_in_user_id'];

			$validate_auth_key = $this->authentication->wkwcpos_authenticate_request( $user_id );

            if ( $validate_auth_key != 'ok' ) {
                return array(
                    'session_id'  => $validate_auth_key,
                    'status'      => 401,
                    'invalid_auth_key_error' => __( 'Please provide valid Auth Key.', 'wc_pos' ),
                    'success'     => false,
                );
            }

            if (!isset($request['logged_in_user_id']) || empty($request['logged_in_user_id'])) {
                return $this->error->set('user_id_required');
            }

            $pos_user = $request['logged_in_user_id'];

            $categories = array();

            $taxonomy = 'product_cat';
            $orderby = 'name';
            $show_count = 1; // 1 for yes, 0 for no
            $pad_counts = 1; // 1 for yes, 0 for no
            $hierarchical = 1; // 1 for yes, 0 for no
            $title = '';
            $empty = 0;
            $i = 0;
            $j = 0;
            $args = array(
                'taxonomy' => $taxonomy,
                'orderby' => $orderby,
                'show_count' => $show_count,
                'pad_counts' => $pad_counts,
                'hierarchical' => $hierarchical,
                'title_li' => $title,
                'hide_empty' => $empty,
            );

            $all_categories = get_categories($args);

            foreach ($all_categories as $cat) {
                if ($cat->category_parent == 0) {
                    $category_id = $cat->term_id;

                    $args2 = array(
                        'taxonomy' => $taxonomy,
                        'child_of' => 0,
                        'parent' => $category_id,
                        'orderby' => $orderby,
                        'show_count' => $show_count,
                        'pad_counts' => $pad_counts,
                        'hierarchical' => $hierarchical,
                        'title_li' => $title,
                        'hide_empty' => $empty,
                    );

                    $sub_cats = get_categories($args2);
                    $i = 0;
                    if (!empty($sub_cats)) {
                        foreach ($sub_cats as $sub_category) {
                            if (isset($sub_category) && !empty($sub_category)) {
                                if ($this->get_products_from_category_by_ID($sub_category->term_id, $pos_user)) {
                                    if (!isset($categories[$j]) || empty($categories[$j])) {
                                        $categories[$j] = array(
                                            'cat_id' => $cat->term_id,
                                            'name' => $cat->name,
                                        );
                                    }
                                    $categories[$j]['child'][$i] = array(
                                        'cat_id' => $sub_category->term_id,
                                        'name' => $sub_category->cat_name,
                                    );
                                    ++$i;
                                }
                            }
                        }
                        if ($i > 0) {
                            ++$j;
                        }
                    } else {
                        if ($this->get_products_from_category_by_ID($cat->term_id, $pos_user)) {
                            $categories[$j] = array(
                                'cat_id' => $cat->term_id,
                                'name' => $cat->name,
                            );
                            ++$j;
                        }
                    }
                }
            }

            return apply_filters( 'wkwcpos_modify_categories_response_at_pos', $categories, $pos_user );

        } catch (Exception $e) {
            return $this->error->set('exception', $e);
        }
    }

    public function get_products_from_category_by_ID($category_id, $user_id)
    {
        $outlet_id = $this->helper->_get_pos_user_outlet_with_status($user_id);
        $products_IDs = $this->wpdb->get_var($this->wpdb->prepare("SELECT count(wp_posts.ID) FROM {$this->wpdb->prefix}posts as wp_posts JOIN {$this->wpdb->prefix}term_relationships as wp_term_relationships JOIN {$this->wpdb->prefix}woocommerce_pos_outlet_product_map as product_map WHERE (wp_posts.ID = wp_term_relationships.object_id OR wp_posts.post_parent = wp_term_relationships.object_id) AND (wp_posts.ID = product_map.product_id) AND ( wp_term_relationships.term_taxonomy_id IN (%d) ) AND (wp_posts.post_type = 'product' OR wp_posts.post_type = 'product_variation') AND ((wp_posts.post_status = 'publish')) AND product_map.pos_stock > 0 AND product_map.pos_status = 'enabled'AND product_map.outlet_id = '%s'", $category_id, $outlet_id));

        if (intval($products_IDs) > 0) {
            return true;
        }

        return true;
    }
}
