<?php

/**
 * WooCommerce Extension list
 *
 * @package WooCommerce pos Marketplace
 * @since 1.0.0
 */

namespace WKWC_POS\Templates\Admin\Extensions;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'WC_POS_Extensions' ) ) {

	/**
	 * Class for extension tab.
	 */
	class WC_POS_Extensions {


		/**
		 * Constructor function.
		 */
		public function __construct() {
			add_action( 'wc_pos_extensions', array( $this, 'wc_pos_extensions' ) );

			add_action( 'wc_pos_extensions_list', array( $this, 'wc_pos_extensions_list' ) );

			add_action( 'wc_pos_extensions_list_all', array( $this, 'wc_pos_extensions_list_all' ) );

			add_action( 'wc_pos_extensions_list_wordpress_extensions', array( $this, 'wc_pos_extensions_list_wordpress_extensions' ) );

			add_action( 'wc_pos_extensions_list_woocommerce_addons', array( $this, 'wc_pos_extensions_list_woocommerce_addons' ) );

			add_action( 'wc_pos_extensions_list_marketplace_addons', array( $this, 'wc_pos_extensions_list_marketplace_addons' ) );

			add_action( 'wc_pos_extensions_list_pointofsale_extensions', array( $this, 'wc_pos_extensions_list_pointofsale_addons' ) );

			add_filter( 'wc_pos_call_api', array( $this, 'wc_pos_call_api' ), 99, 3 );

			add_action( 'wc_pos_search_extensions', array( $this, 'pos_search_extensions' ) );

			echo '<div class="wrap pos-extensions-wrap">';

			echo '<nav class="nav-tab-wrapper pos-extensions-tab">';

			echo '<h1 class="">' . esc_html__( 'Extensions', 'wc_pos' ) . '</h1>';

			global $path;

			$this->path = 'http://wordpressdemo.webkul.com/xtremo-marketplace-theme/wp-json/webkul/v1/extensions';

			$mp_tabs = array(

				'browse_extensions' => esc_html__( 'Browse Extensions', 'wc_pos' ),
			);

			$mp_tabs = apply_filters( 'marketplace_get_extensions_tabs', $mp_tabs );

			$current_tab = empty( $_GET['tab'] ) ? 'browse_extensions' : sanitize_title( $_GET['tab'] );

			$this->id = $current_tab;

			foreach ( $mp_tabs as $name => $label ) {

				echo '<a href="' . esc_url( admin_url( 'admin.php?page=wc-pos-extensions' ) ) . '" class="nav-tab ' . ( $current_tab == $name ? 'nav-tab-active' : '' ) . '">' . esc_html( $label ) . '</a>';
			}

			?>
			</nav>

			<h1 class="screen-reader-text">
				<?php echo esc_html( $mp_tabs[ $current_tab ] ); ?>
			</h1>
			<?php
			if ( isset( $_POST['submit'] ) ) {
				if ( isset( $_POST['s'] ) && ! empty( $_POST['s'] ) ) {
					$_POST['s'] = sanitize_text_field( $_POST['s'] );
					if ( ! empty( $_POST['s'] ) ) {
						do_action( 'wc_pos_search_extensions' );
					} else {
						do_action( 'wc_pos_extensions_list' );
					}
				} else {
					do_action( 'wc_pos_extensions_list' );
				}
			} else {
				do_action( 'wc_pos_extensions_list' );
			}

			echo '</div>';
		}

		public function wc_pos_extensions_list() {
			$this->wc_pos_extensions_output_sections();
			$section = ( isset( $_GET['section'] ) ) ? $_GET['section'] : 'all';
			if ( $section != 'all' && $section != 'wordpress_extensions' && $section != 'woocommerce_addons' && $section != 'marketplace_addons' && $section != 'pointofsale_extensions' ) {
				$section = 'all';
			}
			do_action( 'wc_pos_extensions_list_' . $section );
		}

		public function wc_pos_extensions_output_sections() {
			 global $current_section;

			$sections = $this->get_extension_sections();

			echo '<div class="pos-extensions-submenu-wrap"><ul class="subsubsub pos-extensions-submenu">';

			$array_keys = array_keys( $sections );

			$current_section = ( isset( $_GET['section'] ) ) ? $_GET['section'] : 'all';

			foreach ( $sections as $id => $label ) {
				echo '<li><a href="' . esc_url( admin_url( 'admin.php?page=wc-pos-extensions&section=' . sanitize_title( $id ) ) ) . '" class="' . esc_attr( $current_section == $id ? 'current' : '' ) . '">' . esc_html( $label ) . '</a> ' . esc_html( end( $array_keys ) == $id ? '' : '' ) . ' </li>';
			}

			echo '</ul><form class="search-form search-pos-extensions" method="POST" >
				<input type="hidden" name="tab" value="search">
				<label><span class="pos-extensions-search-text">.' . esc_html__( 'Search Plugins', 'wc_pos' ) . '</span>
					<input type="search" name="s" value="" class="pos-extensions-filter" placeholder="' . esc_html__( 'Search plugins...', 'wc_pos' ) . '" aria-describedby="live-search-desc">
				</label>
			<input type="submit" id="pos-extensions-submit" name="submit" class="pos_button_css" value="' . esc_html__( 'Search Plugins', 'wc_pos' ) . '">	</form></div><br class="clear" />';
		}

		public function get_extension_sections() {
			$sections = array(
				'all'                    => esc_html__( 'All', 'wc_pos' ),
				'pointofsale_extensions' => esc_html__( 'Point of Sale Extensions', 'wc_pos' ),
				'wordpress_extensions'   => esc_html__( 'Wordpress Extensions', 'wc_pos' ),
				'woocommerce_addons'     => esc_html__( 'WooCommerce Addons', 'wc_pos' ),
				'marketplace_addons'     => esc_html__( 'Marketplace Addons', 'wc_pos' ),
			);

			return apply_filters( 'marketplace_get_sections_' . $this->id, $sections );
		}

		public function pos_search_extensions() {
			$search_keyword = $_POST['s'];

			$search_keyword = strtolower( $search_keyword );

			if ( isset( $_GET['section'] ) && ! empty( $_GET['section'] ) ) {
				$c_section = $_GET['section'];
			} else {
				$c_section = 'all';
			}

			if ( $c_section == 'all' || $c_section == 'All' || $c_section == 'ALL' ) {
				$url = $this->path;
			} else {
				$c_section = explode( '_', $c_section );
				$c_section = $c_section[0];
				$url       = $this->path . '/' . $c_section;
			}

			$method   = 'GET';
			$response = apply_filters( 'wc_pos_call_api', $method, $url );
			if ( isset( $response ) && ! empty( $response ) ) {
				$response = json_decode( $response, true );
			} else {
				$response = '';
			}
			?>
			<div class="search-result-back-button">
				<h3>Search Result For "<?php echo esc_html( $search_keyword ); ?>"</h3>
				<a href="<?php echo admin_url( 'admin.php?page=wc-pos-extensions' ); ?>" class="button button-primary back-button-pos-extensions" title="Back"><?php esc_html_e( 'View All Extensions', 'wc_pos' ); ?></a>
			</div>
			<div class="all-extensions">

				<?php
				if ( isset( $response ) && ! empty( $response ) ) {
					$counter = 0;
					foreach ( $response as $key => $value ) {
						$value_check = strtolower( $value['name'] );
						if ( strpos( $value_check, $search_keyword ) !== false ) {
							$counter++;
							$made_for = $value['type'];
							$made_for = explode( ' ', $made_for );
							$made_for = $made_for[0];
							if ( $made_for == 'WordPress' ) {
								$redirecting_page = 'wordpress_extensions';
							} else {
								$redirecting_page = $made_for . '_addons';
							}
							?>
							<div class="pos-addons-block-item">
								<div class="pos-extension-block">
									<div class="over">
										<a class="over-link" href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank">
											<img class="backend-image" src="<?php echo esc_url( $value['image'] ); ?>" alt="product-1">
										</a>
										<div id="rollover" class="over-text">
											<h3><a href="<?php echo esc_attr( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank"><?php echo esc_html( $value['name'] ); ?></a></h3>
											<h4 class="made-for">For - </h4><a class="made-for-link" href="<?php echo esc_url( admin_url( 'admin.php?page=wc-pos-extensions&section=' . $redirecting_page ) ); ?>" title="<?php echo esc_attr( $made_for ); ?>"><?php echo esc_html( $made_for ); ?></a><br>
											<h4 class="made-for">By - </h4><a class="made-for-link" href="https://webkul.com/" title="webkul">Webkul</a><br>
											<?php
											$now       = time();
											$your_date = strtotime( $value['date_updation'] );
											$datediff  = $now - $your_date;
											$days      = floor( $datediff / ( 60 * 60 * 24 ) );
											if ( $days == 0 ) {
												$days = 'today';
											} else {
												$days = $days . ' days ago';
											}
											?>
											<h4 class="last-updated-on"><?php esc_html_e( 'View Last Updated', 'wc_pos' ); ?> - </h4>
											<p class="last-updated-on-date"><?php echo esc_html( $days ); ?></p><br>
											<h4 class="last-updated-on"><?php esc_html_e( 'Compatible', 'wc_pos' ); ?> - </h4>
											<p class="last-updated-on-date"><?php esc_html_e( 'WordPress', 'wc_pos' ); ?> <?php echo esc_html( $value['compatible'] ); ?></p>
										</div>
									</div>
									<div class="pos-extension-bottom">
										<div class="last-updated">
											<p><?php echo esc_html( $value['about'] ); ?></p>
										</div>
										<div class="buy-now-class">
											<p class="link-extension"><a href="<?php echo esc_url( $value['link_doc'] ); ?>" id="doc" target="_blank" title="<?php esc_html_e( 'Read Doc', 'wc_pos' ); ?>" class="button-mp-fadded button-primary-mp-fadded"><?php esc_html_e( 'Read Doc', 'wc_pos' ); ?></a></p>
											<p class="link-extension"><a href="<?php echo esc_url( $value['link'] ); ?>" id="submit" target="_blank" title="<?php esc_html_e( 'Buy Now', 'wc_pos' ); ?>" class="button-mp button-primary-mp"><?php esc_html_e( 'Buy Now', 'wc_pos' ); ?> - $<?php echo esc_html( $value['price'] ); ?></a></p>
										</div>
									</div>
								</div>
							</div>
							<?php
						}
					}
					if ( $counter <= 0 ) {
						?>
						<h1><b><?php esc_html_e( 'No Extensions Found', 'wc_pos' ); ?></b></h1>
						<?php
					}
				} else {
					?>
					<h1><b><?php esc_html_e( 'No Extensions Found', 'wc_pos' ); ?></b></h1>
					<?php
				}
				?>
			</div>
			<?php
		}

		public function wc_pos_extensions_list_all() {
			$url      = 'http://wordpressdemo.webkul.com/xtremo-marketplace-theme/wp-json/webkul/v1/extensions';
			$method   = 'GET';
			$response = apply_filters( 'wc_pos_call_api', $method, $url );
			if ( isset( $response ) && ! empty( $response ) ) {
				$response = json_decode( $response, true );
			} else {
				$response = '';
			}
			?>
			<div class="all-extensions">

				<?php
				if ( isset( $response ) && ! empty( $response ) ) {
					foreach ( $response as $key => $value ) {
						$made_for = $value['type'];
						$made_for = explode( ' ', $made_for );
						$made_for = $made_for[0];
						if ( $made_for == 'WordPress' ) {
							$redirecting_page = 'wordpress_extensions';
						} else {
							$redirecting_page = $made_for . '_addons';
						}

						?>
						<div class="pos-addons-block-item">
							<div class="pos-extension-block">
								<div class="over">
									<a class="over-link" href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank">
										<img class="backend-image" src="<?php echo esc_url( $value['image'] ); ?>" alt="product-1">
									</a>
									<div id="rollover" class="over-text">
										<h3><a href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank"><?php echo esc_html( $value['name'] ); ?></a></h3>

										<h4 class="made-for">For-</h4><a class="made-for-link" href="<?php echo esc_url( admin_url( 'admin.php?page=wc-pos-extensions&section=' . $redirecting_page ) ); ?>" title="<?php echo esc_attr( $made_for ); ?>"><?php echo esc_html( $made_for ); ?></a><br>
										<h4 class="made-for">By-</h4><a class="made-for-link" target="_blank" href="https://webkul.com/" title="webkul">Webkul</a><br>
										<?php
										$now       = time();
										$your_date = strtotime( $value['date_updation'] );
										$datediff  = $now - $your_date;
										$days      = floor( $datediff / ( 60 * 60 * 24 ) );
										if ( $days == 0 ) {
											$days = 'today';
										} else {
											$days = $days . ' days ago';
										}
										?>
										<h4 class="last-updated-on"><?php esc_html_e( 'View Last Updated', 'wc_pos' ); ?> - </h4>
										<p class="last-updated-on-date"><?php echo esc_html( $days ); ?></p><br>
										<h4 class="last-updated-on"><?php esc_html_e( 'Compatible', 'wc_pos' ); ?> - </h4>
										<p class="last-updated-on-date"><?php esc_html_e( 'WordPress', 'wc_pos' ); ?> <?php echo esc_html( $value['compatible'] ); ?></p>
									</div>
								</div>
								<div class="pos-extension-bottom">
									<div class="last-updated">
										<p><?php echo esc_html( $value['about'] ); ?></p>
									</div>
									<div class="buy-now-class">
										<p class="link-extension"><a href="<?php echo esc_url( $value['link_doc'] ); ?>" id="doc" target="_blank" title="<?php esc_html_e( 'Read Doc', 'wc_pos' ); ?>" class="button-mp-fadded button-primary-mp-fadded"><?php esc_html_e( 'Read Doc', 'wc_pos' ); ?></a></p>
										<p class="link-extension"><a href="<?php echo esc_url( $value['link'] ); ?>" id="submit" target="_blank" title="<?php esc_html_e( 'Buy Now', 'wc_pos' ); ?>" class="button-mp button-primary-mp"><?php esc_html_e( 'Buy Now', 'wc_pos' ); ?> - $<?php echo esc_html( $value['price'] ); ?></a></p>
									</div>
								</div>
							</div>
						</div>
						<?php
					}
				} else {
					?>
					<h1><b><?php esc_html_e( 'No Extensions Found', 'wc_pos' ); ?></b></h1>
					<?php
				}
				?>

			</div>
			<?php
		}

		function wc_pos_call_api( $method, $url, $data = false ) {
			$curl = curl_init();

			switch ( $method ) {
				case 'POST':
					curl_setopt( $curl, CURLOPT_POST, 1 );

					if ( $data ) {
						curl_setopt( $curl, CURLOPT_POSTFIELDS, $data );
					}
					break;
				case 'PUT':
					curl_setopt( $curl, CURLOPT_PUT, 1 );
					break;
				default:
					if ( $data ) {
						$url = sprintf( '%s?%s', $url, http_build_query( $data ) );
					}
			}

			// Optional Authentication:
			curl_setopt( $curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC );
			curl_setopt( $curl, CURLOPT_USERPWD, 'username:password' );

			curl_setopt( $curl, CURLOPT_URL, $url );
			curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1 );

			$result = curl_exec( $curl );
			curl_close( $curl );

			return $result;
		}

		function wc_pos_extensions_list_wordpress_extensions() {
			$url      = $this->path . '/wordpress';
			$method   = 'GET';
			$response = apply_filters( 'wc_pos_call_api', $method, $url );
			if ( isset( $response ) && ! empty( $response ) ) {
				$response = json_decode( $response, true );
			} else {
				$response = '';
			}
			?>
			<div class="all-extensions">
				<?php
				if ( isset( $response ) && ! empty( $response ) ) {
					foreach ( $response as $key => $value ) {
						$made_for = $value['type'];
						$made_for = explode( ' ', $made_for );
						$made_for = $made_for[0];
						if ( $made_for == 'WordPress' ) {
							$redirecting_page = 'wordpress_extensions';
						} else {
							$redirecting_page = $made_for . '_addons';
						}
						?>
						<div class="pos-addons-block-item">
							<div class="pos-extension-block">
								<div class="over">
									<a class="over-link" href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank">
										<img class="backend-image" src="<?php echo esc_url( $value['image'] ); ?>" alt="product-1">
									</a>
									<div id="rollover" class="over-text">
										<h3><a href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank"><?php echo esc_html( $value['name'] ); ?></a></h3>

										<h4 class="made-for">By-</h4><a class="made-for-link" href="https://webkul.com/" target="_blank" title="webkul">Webkul</a><br>
										<?php
										$now       = time();
										$your_date = strtotime( $value['date_updation'] );
										$datediff  = $now - $your_date;
										$days      = floor( $datediff / ( 60 * 60 * 24 ) );
										if ( $days == 0 ) {
											$days = 'today';
										} else {
											$days = $days . ' days ago';
										}
										?>
										<h4 class="last-updated-on"><?php esc_html_e( 'Last Updated', 'wc_pos' ); ?> - </h4>
										<p class="last-updated-on-date"><?php echo esc_html( $days ); ?></p><br>
										<h4 class="last-updated-on"><?php esc_html_e( 'Compatible', 'wc_pos' ); ?> - </h4>
										<p class="last-updated-on-date">WordPress <?php echo esc_html( $value['compatible'] ); ?></p>
									</div>
								</div>
								<div class="pos-extension-bottom">
									<div class="last-updated">
										<p><?php echo esc_html( $value['about'] ); ?></p>
									</div>
									<div class="buy-now-class">
										<p class="link-extension"><a href="<?php echo esc_url( $value['link_doc'] ); ?>" id="doc" target="_blank" title="<?php esc_html_e( 'Read Doc', 'wc_pos' ); ?>" class="button-mp-fadded button-primary-mp-fadded"><?php esc_html_e( 'Read Doc', 'wc_pos' ); ?></a></p>
										<p class="link-extension"><a href="<?php echo esc_url( $value['link'] ); ?>" title="<?php esc_html_e( 'Buy Now', 'wc_pos' ); ?>" taget="_blank" id="submit" class="button-mp button-primary-mp"><?php esc_html_e( 'Buy Now', 'wc_pos' ); ?> - $<?php echo esc_html( $value['price'] ); ?></a></p>
									</div>
								</div>
							</div>
						</div>
						<?php
					}
				} else {
					?>
					<h1><b><?php esc_html_e( 'No Extensions Found', 'wc_pos' ); ?></b></h1>
					<?php
				}

				?>

			</div>
			<?php
		}

		function wc_pos_extensions_list_woocommerce_addons() {
			$url      = $this->path . '/woocommerce';
			$method   = 'GET';
			$response = apply_filters( 'wc_pos_call_api', $method, $url );
			if ( isset( $response ) && ! empty( $response ) ) {
				$response = json_decode( $response, true );
			} else {
				$response = '';
			}
			?>
			<div class="all-extensions">

				<?php
				if ( isset( $response ) && ! empty( $response ) ) {
					foreach ( $response as $key => $value ) {
						?>
						<div class="pos-addons-block-item">
							<div class="pos-extension-block">
								<div class="over">
									<a class="over-link" href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank">
										<img class="backend-image" src="<?php echo esc_url( $value['image'] ); ?>" alt="product-1">
									</a>
									<div id="rollover" class="over-text">
										<h3><a href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank"><?php echo esc_html( $value['name'] ); ?></a></h3>
										<h4 class="made-for">By-</h4><a class="made-for-link" target="_blank" href="https://webkul.com/" target="_blank" title="webkul">Webkul</a><br>
										<?php
										$now       = time();
										$your_date = strtotime( $value['date_updation'] );
										$datediff  = $now - $your_date;
										$days      = floor( $datediff / ( 60 * 60 * 24 ) );
										if ( $days == 0 ) {
											$days = 'today';
										} else {
											$days = $days . ' days ago';
										}
										?>
										<h4 class="last-updated-on"><?php esc_html_e( 'Last Updated', 'wc_pos' ); ?> - </h4>
										<p class="last-updated-on-date"><?php echo esc_html( $days ); ?></p><br>
										<h4 class="last-updated-on"><?php esc_html_e( 'Compatible', 'wc_pos' ); ?> - </h4>
										<p class="last-updated-on-date">WordPress <?php echo esc_html( $value['compatible'] ); ?></p>
									</div>
								</div>
								<div class="pos-extension-bottom">
									<div class="last-updated">
										<p><?php echo esc_html( $value['about'] ); ?></p>
									</div>
									<div class="buy-now-class">
										<p class="link-extension"><a href="<?php echo esc_url( $value['link_doc'] ); ?>" id="doc" target="_blank" title="<?php esc_html_e( 'Read Doc', 'wc_pos' ); ?>" class="button-mp-fadded button-primary-mp-fadded"><?php esc_html_e( 'Read Doc', 'wc_pos' ); ?></a></p>
										<p class="link-extension"><a href="<?php echo esc_url( $value['link'] ); ?>" target="_blank" title="<?php esc_html_e( 'Buy Now', 'wc_pos' ); ?>" id="submit" class="button-mp button-primary-mp"><?php esc_html_e( 'Buy Now', 'wc_pos' ); ?> - $<?php echo esc_html( $value['price'] ); ?></a></p>
									</div>
								</div>
							</div>
						</div>
						<?php
					}
				} else {
					?>
					<h1><b><?php esc_html_e( 'No Extensions Found', 'wc_pos' ); ?></b></h1>
					<?php
				}
				?>

			</div>
			<?php
		}

		function wc_pos_extensions_list_marketplace_addons() {
			$url      = $this->path . '/marketplace';
			$method   = 'GET';
			$response = apply_filters( 'wc_pos_call_api', $method, $url );
			if ( isset( $response ) && ! empty( $response ) ) {
				$response = json_decode( $response, true );
			} else {
				$response = '';
			}
			?>
			<div class="all-extensions">

				<?php
				if ( isset( $response ) && ! empty( $response ) ) {
					foreach ( $response as $key => $value ) {
						?>
						<div class="pos-addons-block-item">
							<div class="pos-extension-block">
								<div class="over">
									<a class="over-link" href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank">
										<img class="backend-image" src="<?php echo esc_url( $value['image'] ); ?>" alt="product-1">
									</a>
									<div id="rollover" class="over-text">
										<h3><a href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank"><?php echo esc_html( $value['name'] ); ?></a></h3>
										<?php
										$now       = time();
										$your_date = strtotime( $value['date_updation'] );
										$datediff  = $now - $your_date;
										$days      = floor( $datediff / ( 60 * 60 * 24 ) );
										if ( $days == 0 ) {
											$days = 'today';
										} else {
											$days = $days . ' days ago';
										}
										?>
										<h4 class="made-for">By - </h4><a class="made-for-link" href="https://webkul.com/" target="_blank" title="webkul">Webkul</a><br>
										<h4 class="last-updated-on"><?php esc_html_e( 'Last Updated', 'wc_pos' ); ?> - </h4>
										<p class="last-updated-on-date"><?php echo esc_html( $days ); ?></p><br>
										<h4 class="last-updated-on"><?php esc_html_e( 'Compatible', 'wc_pos' ); ?> - </h4>
										<p class="last-updated-on-date">WordPress <?php echo esc_html( $value['compatible'] ); ?></p>
									</div>
								</div>
								<div class="pos-extension-bottom">
									<div class="last-updated">
										<p><?php echo esc_html( $value['about'] ); ?></p>
									</div>
									<div class="buy-now-class">
										<p class="link-extension"><a href="<?php echo esc_url( $value['link_doc'] ); ?>" id="doc" target="_blank" title="<?php esc_html_e( 'Read Doc', 'wc_pos' ); ?>" class="button-mp-fadded button-primary-mp-fadded"><?php esc_html_e( 'Read Doc', 'wc_pos' ); ?></a></p>
										<p class="link-extension"><a href="<?php echo esc_url( $value['link'] ); ?>" target="_blank" title="<?php esc_html_e( 'Buy Now', 'wc_pos' ); ?>" id="submit" class="button-mp button-primary-mp"><?php esc_html_e( 'Buy Now', 'wc_pos' ); ?> - $<?php echo esc_html( $value['price'] ); ?></a></p>
									</div>
								</div>
							</div>
						</div>
						<?php
					}
				} else {
					?>
					<h1><b><?php esc_html_e( 'No Extensions Found', 'wc_pos' ); ?></b></h1>
					<?php
				}
				?>
			</div>
			<?php
		}


		function wc_pos_extensions_list_pointofsale_addons() {
			$url      = $this->path . '/pos';
			$method   = 'GET';
			$response = apply_filters( 'wc_pos_call_api', $method, $url );
			if ( isset( $response ) && ! empty( $response ) ) {
				$response = json_decode( $response, true );
			} else {
				$response = '';
			}
			?>
			<div class="all-extensions">

				<?php
				if ( isset( $response ) && ! empty( $response ) ) {
					foreach ( $response as $key => $value ) {
						?>
						<div class="pos-addons-block-item">
							<div class="pos-extension-block">
								<div class="over">
									<a class="over-link" href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank">
										<img class="backend-image" src="<?php echo esc_url( $value['image'] ); ?>" alt="product-1">
									</a>
									<div id="rollover" class="over-text">
										<h3><a href="<?php echo esc_url( $value['link'] ); ?>" title="<?php echo esc_attr( $value['name'] ); ?>" target="_blank"><?php echo esc_html( $value['name'] ); ?></a></h3>
										<?php
										$now       = time();
										$your_date = strtotime( $value['date_updation'] );
										$datediff  = $now - $your_date;
										$days      = floor( $datediff / ( 60 * 60 * 24 ) );
										if ( $days == 0 ) {
											$days = 'today';
										} else {
											$days = $days . ' days ago';
										}
										?>
										<h4 class="made-for">By - </h4><a class="made-for-link" href="https://webkul.com/" target="_blank" title="webkul">Webkul</a><br>
										<h4 class="last-updated-on"><?php esc_html_e( 'Last Updated', 'wc_pos' ); ?> - </h4>
										<p class="last-updated-on-date"><?php echo esc_html( $days ); ?></p><br>
										<h4 class="last-updated-on"><?php esc_html_e( 'Compatible', 'wc_pos' ); ?> - </h4>
										<p class="last-updated-on-date">WordPress <?php echo esc_html( $value['compatible'] ); ?></p>
									</div>
								</div>
								<div class="pos-extension-bottom">
									<div class="last-updated">
										<p><?php echo esc_html( $value['about'] ); ?></p>
									</div>
									<div class="buy-now-class">
										<p class="link-extension"><a href="<?php echo esc_url( $value['link_doc'] ); ?>" id="doc" target="_blank" title="<?php esc_html_e( 'Read Doc', 'wc_pos' ); ?>" class="button-mp-fadded button-primary-mp-fadded"><?php esc_html_e( 'Read Doc', 'wc_pos' ); ?></a></p>
										<p class="link-extension"><a href="<?php echo esc_url( $value['link'] ); ?>" target="_blank" title="<?php esc_html_e( 'Buy Now', 'wc_pos' ); ?>" id="submit" class="button-mp button-primary-mp"><?php esc_html_e( 'Buy Now', 'wc_pos' ); ?> - $<?php echo esc_html( $value['price'] ); ?></a></p>
									</div>
								</div>
							</div>
						</div>
						<?php
					}
				} else {
					?>
					<h1><b><?php esc_html_e( 'No Extensions Found', 'wc_pos' ); ?></b></h1>
					<?php
				}
				?>
			</div>
			<?php
		}
	}
}
