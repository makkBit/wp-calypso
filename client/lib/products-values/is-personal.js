/**
 * Internal dependencies
 */
import { isPersonalPlan } from 'wp-calypso-client/lib/plans';
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isPersonal( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isPersonalPlan( product.product_slug );
}
