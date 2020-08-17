/**
 * Internal dependencies
 */
import { PLAN_HOST_BUNDLE } from 'wp-calypso-client/lib/plans/constants';
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isJpphpBundle( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return product.product_slug === PLAN_HOST_BUNDLE;
}
