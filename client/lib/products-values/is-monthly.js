/**
 * Internal dependencies
 */
import { PLAN_MONTHLY_PERIOD } from 'wp-calypso-client/lib/plans/constants';
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isMonthly( rawProduct ) {
	const product = formatProduct( rawProduct );
	assertValidProduct( product );

	return parseInt( product.bill_period, 10 ) === PLAN_MONTHLY_PERIOD;
}
