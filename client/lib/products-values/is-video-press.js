/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isVideoPress( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return 'videopress' === product.product_slug;
}
