/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import getBillingTransactions from 'wp-calypso-client/state/selectors/get-billing-transactions';

import 'wp-calypso-client/state/billing-transactions/init';

/**
 * Returns all upcoming billing transactions.
 * Returns null if the billing transactions have not been fetched yet.
 *
 * @param  {object}  state   Global state tree
 * @returns {?Array}          An array of upcoming transactions
 */
export default function getUpcomingBillingTransactions( state ) {
	return get( getBillingTransactions( state ), 'upcoming', null );
}
