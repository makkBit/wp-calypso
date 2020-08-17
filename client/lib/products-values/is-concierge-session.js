/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isConciergeSession( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return 'concierge-session' === product.product_slug;
}
