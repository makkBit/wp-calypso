/**
 * Internal dependencies
 */
import { isJetpackPlan } from 'wp-calypso-client/lib/products-values/is-jetpack-plan';
import { isMonthly } from 'wp-calypso-client/lib/products-values/is-monthly';

export function isJetpackMonthlyPlan( product ) {
	return isMonthly( product ) && isJetpackPlan( product );
}
