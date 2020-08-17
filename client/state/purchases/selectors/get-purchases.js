/**
 * Internal Dependencies
 */
import createSelector from 'wp-calypso-client/lib/create-selector';
import { createPurchasesArray } from 'wp-calypso-client/lib/purchases/assembler';

import 'wp-calypso-client/state/purchases/init';

/**
 * Return the list of purchases from state object
 *
 * @param   {object} state - current state object
 * @returns {Array} Purchases
 */
export const getPurchases = createSelector(
	( state ) => createPurchasesArray( state.purchases.data ),
	( state ) => [ state.purchases.data ]
);
