$pos = jQuery.noConflict();

(function($pos){

    $pos(document).ready(function () {

        // Added css for improving wordpress WP_List Tables.
        $pos("input[name=s]").addClass('pos_input_css');
        $pos("select[name=payment]").addClass('pos_input_css2');
        $pos("select[name=outlet_id]").addClass('pos_input_css report_select_outlet');
        $pos("#search-submit").addClass('pos_input_css2');
        $pos("#bulk-action-selector-top").addClass('pos_input_css1');
        $pos("#bulk-action-selector-bottom").addClass('pos_input_css1');
        $pos("#doaction").addClass('pos_input_css2');
        $pos("input[type=submit]").addClass('pos_input_css2');
        
        // added place holder to wordpress input search box
        var translate = wk_wc_apipos_script.admin_translation;
        $pos('#pos-order-search-id-search-input').attr('placeholder', translate.order_search);
        $pos('#search-user-search-input').attr('placeholder', translate.user_search);
        $pos('#search-outlet-search-input').attr('placeholder', translate.outlet_search);
        $pos('#search-product-search-input').attr('placeholder', translate.product_search);
        $pos('#search-id-search-input').attr('placeholder', translate.product_search);
        $pos('#search-template-search-input').attr('placeholder', translate.invoice_search);
        $pos('#search-payment-search-input').attr('placeholder', translate.payment_search);
        
        $pos('#footer-upgrade').html('Point of Sale Version - '+ wk_wc_apipos_script.site_version);

        $pos('#footer-left').html(wk_wc_apipos_script.footer_left);
		$pos(document).on('click','.icon-uploader',function(event) {

			event.preventDefault();
			
			const iconSize = event.target.getAttribute( 'data-id' ).split( 'icon' )[1];

			var custom_uploader;

			var _self = this;

			var data_attr = $pos(this).data("id");

			var custom_uploader = wp.media({

				title: iconSize + 'x' + iconSize + ' icon',
		
				button: {
		
					text: 'Upload Pic',
		
				},
		
					multiple: false  // Set this to true to allow multiple files to be selected
		
				})
		
				.on('select', function() {
		
					var attachment = custom_uploader.state().get('selection').first().toJSON();
			
					$pos(_self).closest('tr').find(".image-url").attr('src',attachment.url);

					var site_url = attachment.url.replace( wk_wc_apipos_script.site_url, '' );
			
					$pos("#" + data_attr).val(site_url);
		
				})
				.open();
		
		});

		jQuery('.print-barcode').on('click', function (e) {
			e.preventDefault();
			productid = jQuery(this).data('title');
			image = jQuery(this).data('image');
			sku = jQuery(this).data('sku');
            if (sku == 'undefined') {
                sku = productid;
            }
			imageId = jQuery(this).data('image-id');
			imageSku = jQuery(this).data('image-sku');

			if ( imageId || imageSku  ) {
				jQuery('#TB_closeWindowButton').click();
				jQuery('#printBarcode').css('display', 'block');
			} else {
				alert( 'Barcode is not generated for "' + productid + '"' );
			}
		})

        jQuery('.wc-pos-barcode-generate').on('submit', function (e) {
            e.preventDefault()

            if (jQuery('#barcode-quantity').val() > 10000) {

                alert("Please enter value less than 10000");

            }

            else if (jQuery('#barcode-quantity').val() == '' || isNaN((jQuery('#barcode-quantity').val()))) {

                alert("Please enter value Integer value");

            }

            else if (jQuery('#barcode-type').val() == 'sku' && imageSku == '') {

                alert("Barcode by SKU is not created");

            }

            else if (jQuery('#barcode-type').val() == 'id' && imageId == '') {

                alert("Barcode by ID is not created");

            }

            else {

                var printContents = ''

                jQuery('#TB_overlay').css('display', 'inline-block')
                jQuery('#TB_window').css('display', 'inline-block')
                jQuery('#printBarcode').css('display', 'none')

                for (var i = 0; i < jQuery('#barcode-quantity').val(); i++) {

                    printContents += '<div style="width:fit-content; margin-top:15px; display:inline-block"><div style="text-align:center;">' + productid + '</div>';
                    if (jQuery('#barcode-type').val() == 'id') {
						
                        printContents += '<img src="' + imageId + '" alt="barcode"></div>'
                    } else {
                        printContents += '<img src="' + imageSku + '" alt="barcode" ></div>'

                    }

                }
                jQuery('#barcode-quantity').val('');
                let page_preview = '';
                
                var style_rules = [];
                if (wk_wc_apipos_script.page_preview === "landscape") {
                    style_rules.push(" @page { size: A4 Landscape;margin: 20mm;  } ");
                } else {
                    
                    style_rules.push(" @page { size: A4;margin: 20mm;  } ");
                }
                var style = '<style type="text/css">' + style_rules.join("\n") + "</style>";
                var printWindow = window.open("", "PRINT", "height=400,width=600");
                printWindow.document.write("<html><head><title></title>" + style);

                printWindow.document.write("</head><body>");
                printWindow.document.write(printContents);
                printWindow.document.write("</body></html>");
                printWindow.document.close(); // necessary for IE >= 10
                printWindow.focus(); // necessary for IE >= 10*-/

                printWindow.print();

                setTimeout(() => {
                    printWindow.close();
                }, 300);

            }

        });

        jQuery('#sync_products').on('click', (e) => {
            e.preventDefault();
            let outlet_id = jQuery('#outlet_id').val();
            $pos.ajax({

					type:"POST",
					url: wk_wc_apipos_script.api_admin_ajax,
					data: {
						'action': 'sync_all_variable_product',
						'nonce': wk_wc_apipos_script.pos_api_nonce,
						'outlet_id': outlet_id,
                },
                beforeSend: function () {
                    jQuery('#sync').text("Products syncing...");
                },
				success: function(response){
                    if (response.status == "success") {
                        jQuery('#sync').text(response.message);
					} else {

                        jQuery('#sync').text("Something Went wrong");
                        jQuery('#sync').css("color", "red");
                    }

				}
			});
        });


		jQuery('.wc-pos-barcode-print-wrapper .close').on('click', function () {
			jQuery('#printBarcode').css('display', 'none')
		})

		$pos(document).on('click','#_pos_user_pic',function(event) {

			var custom_uploader;

			event.preventDefault();

			var custom_uploader = wp.media({

				title:'Profile Pic',

				button: {

					text: 'Upload profile Pic',

				},

				multiple: false  // Set this to true to allow multiple files to be selected

			})

			.on('select', function() {

				var attachment = custom_uploader.state().get('selection').first().toJSON();

				var file_short_path = attachment.url.split('uploads')[1];

				$pos('.image-url').attr('src',attachment.url);

				$pos('#_pos_user_pic_val').val( file_short_path );

			})
			.open();

		});

		$pos(document).on('click','#_pos_upload_logo',function(event) {

			var custom_uploader;

			event.preventDefault();

			var custom_uploader = wp.media({

				title:'Invoice Logo',

				button: {

					text: 'Upload Invoice Logo',

				},

				multiple: false  // Set this to true to allow multiple files to be selected

			})

			.on('select', function() {

				var attachment = custom_uploader.state().get('selection').first().toJSON();

				var file_short_path = attachment.url.split('uploads')[1];

				$pos('.logo-url').attr('src',attachment.url);

				$pos('#_pos_invoice_logo').val( file_short_path );

			})
			.open();

		});

		var oldval = '';

		$pos("input.pos_pro_stock").on('focus',function(){
			oldval = this.value;
		});

		$pos('input.pos_pro_stock').on('blur', function () {

			var outlet_id = $pos(this).data('outlet-id');

			var thisElm = $pos(this);

			var product_id = $pos(this).data('product-id');

			if( Math.abs( this.value ) != Math.abs( oldval ) && outlet_id && product_id){

				$pos.ajax({

					type:"POST",
					url: wk_wc_apipos_script.api_admin_ajax,
					data: {
						'action': 'update_pos_outlet_stock',
						'nonce': wk_wc_apipos_script.pos_api_nonce,
						'product_id': product_id,
						'outlet_id': outlet_id,
						'stock': Math.abs( this.value )
					},
					success: function(response){
				
						if (response.msg !==undefined) {
								if (! $pos(thisElm).hasClass('thick')) {
										location.reload();
								}
						}
						else if(response.err != undefined ) {
							alert(response.err);
							location.reload();

						} else {

							alert('Error updating stock.');

						}

					}
				});
			}

		});

		jQuery('.posuserlist .delete').on('click', function (e) {

			if (! confirm( "This will completely delete this user." ) ) {
				e.preventDefault()
			}
		});

		jQuery( ".pos-masterbulk-settings input[type='submit']" ).on( "click", function() {

				defQty = jQuery(".pos-masterbulk-settings #_pos_master_assign_qty").val();

				if (/^\d*$/.test(defQty)) {

					var index = 0;

					var batch = 1;

					var batchSize = 50;

					var paged = 1;

					function recursive_master_product_ajax( paged ) {

						jQuery.ajax({
							type:"POST",
							url:wk_wc_apipos_script.api_admin_ajax,
							data: {
								'action': 'get_all_products',
								'nonce': wk_wc_apipos_script.pos_api_nonce,
								'paged': paged
							},
							beforeSend : function (paged) {

								jQuery(".wc-product-import-section").show();

								if( paged == 1 ) {

									jQuery(".pos-masterbulk-settings .wc-product-import-section-body").append('<div class="notice notice-success is-dismissible"><p>Starting Execution...</p></div>');
									jQuery(".pos-masterbulk-settings .wc-product-import-section-body").append('<div class="notice notice-error is-dismissible"><p>Please don\'t close or refresh the window while importing product(s).</p></div>');
								}

								jQuery(".pos-masterbulk-settings .wc-product-import-section-body").append('<div class="notice notice-success"><p>Batch Process for products. Batch size will be <strong>' + batchSize + '</strong>.</p></div>');

							},
							success: function( response ) {

								if( response && _.size(response) ) {

									var new_array = jQuery.map(response, function(value, index) {
										return [value];
									});

									var responseLength = new_array.length;

									function recursive_master_ajax( index ) {

										var productData = new_array.splice( index, batchSize );

										var raw_data = JSON.stringify( productData );

										jQuery.ajax({
											type: 'POST',
											url:wk_wc_apipos_script.api_admin_ajax,
											data: {
												'action': 'assign_pos_master_stock',
												'nonce': wk_wc_apipos_script.pos_api_nonce,
												'percent' : defQty,
												'products': raw_data,
											},
											beforeSend: function(){

											},
											success: function( last_response ) {

												if (productData.length > 0) {

													if(last_response) {

														jQuery(".pos-masterbulk-settings .wc-product-import-section-body").append('<div class="notice notice-success"><p>'+last_response+' Master Stock to Product assigned successfully.!</p></div>');

													} else{

														jQuery(".pos-masterbulk-settings .wc-product-import-section-body").append('<div class="notice notice-error"><p>No New products to be assigned in batch <strong>' + batch + '</strong>.</p></div>');
													}

													batch++;

													recursive_master_ajax(index);

												} else {

													if (responseLength >= 99) {
														paged++;
														recursive_master_product_ajax(paged);
													} else {
														jQuery(".pos-masterbulk-settings .wc-product-import-section").append('<div class="complete-process  notice notice-success"><p>Process Completed.!</p></div>');
														jQuery(".pos-masterbulk-settings .wc-product-import-section .complete-process").hide();
														setTimeout(function(){
															location.reload();
														}, 1500);
													}

												}
											}
										});
									}

									recursive_master_ajax(index);

								}

							}
						});
					}

					recursive_master_product_ajax(paged);
				}
				else{

					alert('Must Enter Stock value');

				}

		});

		if( jQuery("#_pos_outlet_payment").length ) {
			jQuery("#_pos_outlet_payment").select2();
		}

	});

})(jQuery);
