/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';
import { isJetpackPlan } from 'wp-calypso-client/lib/products-values/is-jetpack-plan';
import { isPremium } from 'wp-calypso-client/lib/products-values/is-premium';

export function isJetpackPremium( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isPremium( product ) && isJetpackPlan( product );
}
