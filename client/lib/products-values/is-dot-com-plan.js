/**
 * Internal dependencies
 */
import { isPlan } from 'wp-calypso-client/lib/products-values/is-plan';
import { isJetpackPlan } from 'wp-calypso-client/lib/products-values/is-jetpack-plan';

export function isDotComPlan( product ) {
	return isPlan( product ) && ! isJetpackPlan( product );
}
