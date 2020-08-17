/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isBundled( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return !! product.is_bundled;
}
