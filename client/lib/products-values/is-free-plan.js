/**
 * Internal dependencies
 */
import { PLAN_FREE } from 'wp-calypso-client/lib/plans/constants';
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isFreePlan( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return product.product_slug === PLAN_FREE;
}
