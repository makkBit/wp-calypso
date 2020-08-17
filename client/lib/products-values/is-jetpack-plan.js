/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';
import { isJetpackPlanSlug } from 'wp-calypso-client/lib/products-values/is-jetpack-plan-slug';

export function isJetpackPlan( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isJetpackPlanSlug( product.product_slug );
}
