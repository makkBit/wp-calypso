/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import {
	adminSections,
	filterListBySearchTerm,
} from 'wp-calypso-client/blocks/inline-help/admin-sections';
import { getSiteSlug } from 'wp-calypso-client/state/sites/selectors';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';

/**
 * Returns a filtered site admin collection using the memoized adminSections.
 *
 * Note that the first argument `state` is not used,
 * because the admin sections are store in the admin-sections.js,
 * in the inline-block component.
 *
 * @param   {object} state      Global state tree
 * @param   {string} searchTerm The search term
 * @param   {number} limit      The maximum number of results to show
 * @returns {Array}             A filtered (or empty) array
 */
export default function getAdminHelpResults( state, searchTerm = '', limit ) {
	if ( ! searchTerm ) {
		return [];
	}

	const siteId = getSelectedSiteId( state );
	const siteSlug = getSiteSlug( state, siteId );

	return filterListBySearchTerm( searchTerm, adminSections( siteId, siteSlug, state ), limit );
}
