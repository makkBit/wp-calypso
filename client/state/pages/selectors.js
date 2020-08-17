/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { getSiteFrontPage, getSitePostsPage } from 'wp-calypso-client/state/sites/selectors';

export function isFrontPage( state, siteId, pageId ) {
	return pageId === getSiteFrontPage( state, siteId );
}

export function isPostsPage( state, siteId, pageId ) {
	return pageId === getSitePostsPage( state, siteId );
}
