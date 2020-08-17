/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isFreeTrial( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return Boolean( product.free_trial );
}
