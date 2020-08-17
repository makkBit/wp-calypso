/**
 * Internal dependencies
 */
import { isBloggerPlan } from 'wp-calypso-client/lib/plans';
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isBlogger( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isBloggerPlan( product.product_slug );
}
