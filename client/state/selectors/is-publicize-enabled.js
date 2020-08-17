/**
 * Internal dependencies
 */

import { isJetpackModuleActive, getSiteOption } from 'wp-calypso-client/state/sites/selectors';
import { postTypeSupports } from 'wp-calypso-client/state/post-types/selectors';

/**
 * Returns true if Publicize is enabled for the post type and the given site.
 *
 * @param {object} state 	Global state tree
 * @param {number} siteId 	Site ID
 * @param {string} postType Post type slug
 *
 * @returns {boolean} True when enabled
 */
export default function isPublicizeEnabled( state, siteId, postType ) {
	return (
		true !== getSiteOption( state, siteId, 'publicize_permanently_disabled' ) &&
		false !== isJetpackModuleActive( state, siteId, 'publicize' ) &&
		postTypeSupports( state, siteId, postType, 'publicize' )
	);
}
