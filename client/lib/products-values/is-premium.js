/**
 * Internal dependencies
 */
import { isPremiumPlan } from 'wp-calypso-client/lib/plans';
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isPremium( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isPremiumPlan( product.product_slug );
}
