/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';
import { isJetpackPlan } from 'wp-calypso-client/lib/products-values/is-jetpack-plan';
import { isBusiness } from 'wp-calypso-client/lib/products-values/is-business';

export function isJetpackBusiness( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isBusiness( product ) && isJetpackPlan( product );
}
