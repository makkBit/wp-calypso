/**
 * Internal dependencies
 */

import { getSite } from 'wp-calypso-client/state/sites/selectors';
import getSitesItems from 'wp-calypso-client/state/selectors/get-sites-items';
import createSelector from 'wp-calypso-client/lib/create-selector';

/**
 * Get all visible sites
 *
 * @param {object} state  Global state tree
 * @returns {Array}        Sites objects
 */
export default createSelector(
	( state ) =>
		Object.values( getSitesItems( state ) )
			.filter( ( site ) => site.visible === true )
			.map( ( site ) => getSite( state, site.ID ) ),
	( state ) => [ getSitesItems( state ) ]
);
