/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isVipPlan( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return 'vip' === product.product_slug;
}
