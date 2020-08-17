/**
 * Internal dependencies
 */
import { isEcommercePlan } from 'wp-calypso-client/lib/plans';
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isEcommerce( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isEcommercePlan( product.product_slug );
}
