/**
 * Internal dependencies
 */
import getGutenbergEditorUrl from 'wp-calypso-client/state/selectors/get-gutenberg-editor-url';
import { shouldLoadGutenberg } from 'wp-calypso-client/state/selectors/should-load-gutenberg';
import { getSiteSlug } from 'wp-calypso-client/state/sites/selectors';
import { getEditorPath } from 'wp-calypso-client/state/editor/selectors';

export const getEditorUrl = ( state, siteId, postId = null, postType = 'post' ) => {
	if ( shouldLoadGutenberg( state, siteId ) ) {
		return getGutenbergEditorUrl( state, siteId, postId, postType );
	}

	if ( postId ) {
		return getEditorPath( state, siteId, postId, postType );
	}

	const siteSlug = getSiteSlug( state, siteId );

	if ( 'post' === postType || 'page' === postType ) {
		return `/${ postType }/${ siteSlug }`;
	}
	return `/edit/${ postType }/${ siteSlug }`;
};

export default getEditorUrl;
