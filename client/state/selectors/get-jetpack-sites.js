/**
 * Internal dependencies
 */

import createSelector from 'wp-calypso-client/lib/create-selector';
import getSites from 'wp-calypso-client/state/selectors/get-sites';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';

/**
 * Get all Jetpack sites
 *
 * @param {object} state  Global state tree
 * @returns {Array}        Array of Jetpack Sites objects
 */
export default createSelector(
	( state ) => getSites( state ).filter( ( site ) => isJetpackSite( state, site.ID ) ),
	( state ) => [ state.sites.items, state.currentUser.capabilities ]
);
