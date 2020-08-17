/**
 * External dependencies
 */
import { some } from 'lodash';

/**
 * Internal Dependencies
 */
import { isJetpackBackup } from 'wp-calypso-client/lib/products-values';
import { getSitePurchases } from './get-site-purchases';

import 'wp-calypso-client/state/purchases/init';

/**
 * Whether a site has an active Jetpack backup purchase.
 *
 * @param   {object} state       global state
 * @param   {number} siteId      the site id
 * @returns {boolean} True if the site has an active Jetpack Backup purchase, false otherwise.
 */
export const siteHasBackupProductPurchase = ( state, siteId ) => {
	return some(
		getSitePurchases( state, siteId ),
		( purchase ) => purchase.active && isJetpackBackup( purchase )
	);
};
