/**
 * Internal dependencies
 */
import { PLAN_WPCOM_ENTERPRISE } from 'wp-calypso-client/lib/plans/constants';
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isEnterprise( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return product.product_slug === PLAN_WPCOM_ENTERPRISE;
}
