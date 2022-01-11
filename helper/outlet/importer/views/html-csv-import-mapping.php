<?php
/**
 * Admin View: Importer - CSV mapping
 *
 * @package WKWC_POS\Helper\Outlets\Importer
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<form class="wc-progress-form-content woocommerce-importer" method="post" action="<?php echo esc_url( $this->get_next_step_link() ); ?>">
	<header>
		<h2><?php esc_html_e( 'Map CSV fields to outlets', 'wc_pos' ); ?></h2>
		<p><?php esc_html_e( 'Select fields from your CSV file to map against outlets fields, or to ignore during import.', 'wc_pos' ); ?></p>
	</header>
	<section class="wc-importer-mapping-table-wrapper">
		<table class="widefat wc-importer-mapping-table">
			<thead>
				<tr>
					<th><?php esc_html_e( 'Column name', 'wc_pos' ); ?></th>
					<th><?php esc_html_e( 'Map to field', 'wc_pos' ); ?></th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ( $headers as $index => $name ) : ?>
					<?php $mapped_value = $mapped_items[ $index ]; ?>
					<tr>
						<td class="wc-importer-mapping-table-name">
							<?php echo esc_html( $name ); ?>
							<?php if ( ! empty( $sample[ $index ] ) ) : ?>
								<span class="description"><?php esc_html_e( 'Sample:', 'wc_pos' ); ?> <code><?php echo esc_html( $sample[ $index ] ); ?></code></span>
							<?php endif; ?>
						</td>
						<td class="wc-importer-mapping-table-field">
							<input type="hidden" name="map_from[<?php echo esc_attr( $index ); ?>]" value="<?php echo esc_attr( $name ); ?>" />
							<select name="map_to[<?php echo esc_attr( $index ); ?>]">
								<option value=""><?php esc_html_e( 'Do not import', 'wc_pos' ); ?></option>
								<option value="">--------------</option>
								<?php foreach ( $this->get_mapping_options( $mapped_value ) as $key => $value ) : ?>
									<?php if ( is_array( $value ) ) : ?>
										<optgroup label="<?php echo esc_attr( $value['name'] ); ?>">
											<?php foreach ( $value['options'] as $sub_key => $sub_value ) : ?>
												<option value="<?php echo esc_attr( $sub_key ); ?>" <?php selected( $mapped_value, $sub_key ); ?>><?php echo esc_html( $sub_value ); ?></option>
											<?php endforeach ?>
										</optgroup>
									<?php else : ?>
										<option value="<?php echo esc_attr( $key ); ?>" <?php selected( $mapped_value, $key ); ?>><?php echo esc_html( $value ); ?></option>
									<?php endif; ?>
								<?php endforeach ?>
							</select>
						</td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</section>
	<div class="wc-actions">
		<button type="submit" class="button button-primary button-next" value="<?php esc_attr_e( 'Run the importer', 'wc_pos' ); ?>" name="save_step"><?php esc_html_e( 'Run the importer', 'wc_pos' ); ?></button>
		<input type="hidden" name="file" value="<?php echo esc_attr( $this->file ); ?>" />
		<input type="hidden" name="delimiter" value="<?php echo esc_attr( $this->delimiter ); ?>" />
		<input type="hidden" name="update_existing" value="<?php echo (int) $this->update_existing; ?>" />
		<?php wp_nonce_field( 'wkwcpos-csv-importer' ); ?>
	</div>
</form>
