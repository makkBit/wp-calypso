/**
 * Internal dependencies
 */
import { isBusinessPlan } from 'wp-calypso-client/lib/plans';
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isBusiness( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isBusinessPlan( product.product_slug );
}
