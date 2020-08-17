/**
 * Internal dependencies
 */
import createSelector from 'wp-calypso-client/lib/create-selector';
import getSitesItems from 'wp-calypso-client/state/selectors/get-sites-items';
import { isSingleUserSite } from 'wp-calypso-client/state/sites/selectors';

/**
 * Returns true if every site of the current user is a single user site
 *
 * @param  {object}  state Global state tree
 * @returns {boolean}       True if all sites are single user sites
 */
export default createSelector( ( state ) => {
	const siteIds = Object.keys( getSitesItems( state ) );
	return !! siteIds.length && siteIds.every( ( siteId ) => isSingleUserSite( state, siteId ) );
}, getSitesItems );
