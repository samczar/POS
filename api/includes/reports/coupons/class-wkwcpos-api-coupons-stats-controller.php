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

namespace WKWC_POS\Api\Includes\Reports\Coupons;

use WKWC_POS\Api\Inc\WKWCPOS_API_Error_Handler;
use WKWC_POS\Api\Includes\WKWCPOS_API_Authentication;
use WKWC_POS\Api\Helper\WKWCPOS_API_User_Outlet_Helper;
use WKWC_POS\Api\WKWCPOS_Data_Store;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class WKWCPOS_API_Coupons_Stats_Controller extends \WC_REST_Reports_Controller {
    /**
     * Base Name.
     *
     * @var string the route base
     */
    public $base = '/reports/coupons/stats';

    /**
     * Namespace Name.
     *
     * @var string the route namespace
     */
    public $namespace = 'pos/v1';

    protected $wpdb = '';

    /**
     * Constructor.
     */
    public function __construct()
    {
        global $wpdb;

        $this->wpdb = $wpdb;

        $this->error = new WKWCPOS_API_Error_Handler();
        $this->helper = new WKWCPOS_API_User_Outlet_Helper();
        $this->authentication = new WKWCPOS_API_Authentication();
    }

    /**
     * Maps query arguments from the REST request.
     *
     * @param array $request Request array.
     * @return array
     */
    protected function prepare_coupons_query($request)
    {
        $args              = array();
        $args['after']     = $request['after'];
        $args['before']    = $request['before'];
        $args['interval']  = $request['interval'];
        $args['page']      = $request['page'] ? $request['page'] : 1;
        $args['per_page']  = $request['per_page'];
        $args['orderby']   = $request['orderby'] ? $request['orderby'] : 'date';
        $args['order']     = $request['order'];
        $args['segmentby'] = $request['segmentby'];
        $args['manager_id'] = intval($request['manager_id']);
        $args['outlet_id'] = intval($request['outlet_id']);

        return $args;
    }

    /**
     * API Callback.
     */
    public function get_coupons_stats($request)
    {
       
        $query_args      = $this->prepare_coupons_query($request);            
        $data_store = WKWCPOS_Data_Store::load('report-coupons-stats');

        try {
            $report_data    = $data_store->get_data($query_args);
        } catch (ParameterException $e) {
            return new \WP_Error($e->getErrorCode(), $e->getMessage(), array('status' => $e->getCode()));
        }

        $out_data = array(
            'totals'    => get_object_vars($report_data->totals),
            'intervals' => array(),
        );

        foreach ($report_data->intervals as $interval_data) {
            $item                    = $this->prepare_item_for_response($interval_data, $request);
            $out_data['intervals'][] = $this->prepare_response_for_collection($item);
        }

        $response = rest_ensure_response($out_data);
        $response->header('X-WP-Total', (int) $report_data->total);
        $response->header('X-WP-TotalPages', (int) $report_data->pages);

        $page      = $report_data->page_no;
        $max_pages = $report_data->pages;
        $base      = add_query_arg($request->get_query_params(), rest_url(sprintf('/%s/%s', $this->namespace, $this->rest_base)));
        if ($page > 1) {
            $prev_page = $page - 1;
            if ($prev_page > $max_pages) {
                $prev_page = $max_pages;
            }
            $prev_link = add_query_arg('page', $prev_page, $base);
            $response->link_header('prev', $prev_link);
        }
        if ($max_pages > $page) {
            $next_page = $page + 1;
            $next_link = add_query_arg('page', $next_page, $base);
            $response->link_header('next', $next_link);
        }
 
        return $response; 
       
    }

    /**
     * Prepare a report object for serialization.
     *
     * @param Array           $report  Report data.
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response
     */
    public function prepare_item_for_response($report, $request)
    {
        $data = $report;

        $context = !empty($request['context']) ? $request['context'] : 'view';
        $data    = $this->add_additional_fields_to_object($data, $request);
        $data    = $this->filter_response_by_context($data, $context);

        // Wrap the data in a response object.
        $response = rest_ensure_response($data);

        /**
         * Filter a report returned from the API.
         *
         * Allows modification of the report data right before it is returned.
         *
         * @param WP_REST_Response $response The response object.
         * @param object           $report   The original report object.
         * @param WP_REST_Request  $request  Request used to generate the response.
         */
        return apply_filters('woocommerce_rest_prepare_report_revenue_stats', $response, $report, $request);
    }
}
