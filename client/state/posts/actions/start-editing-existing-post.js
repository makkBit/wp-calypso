/**
 * Internal dependencies
 */
import wpcom from 'wp-calypso-client/lib/wp';
import { receivePost } from 'wp-calypso-client/state/posts/actions/receive-post';
import { getEditedPost } from 'wp-calypso-client/state/posts/selectors';
import { normalizePostForActions } from 'wp-calypso-client/state/posts/utils';
import isPreviousRouteGutenberg from 'wp-calypso-client/state/selectors/is-previous-route-gutenberg';
import {
	editorReset,
	editorSetLoadingError,
	startEditingPost,
} from 'wp-calypso-client/state/editor/actions';
import { getEditorPostId } from 'wp-calypso-client/state/editor/selectors';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';

import 'wp-calypso-client/state/posts/init';

/**
 * Load an existing post and keep track of edits to it
 *
 * @param {object} siteId Site ID
 * @param {number} postId Post ID to load
 * @returns {Promise<?object>} The edited post object
 */
export const startEditingExistingPost = ( siteId, postId ) => ( dispatch, getState ) => {
	const currentSiteId = getSelectedSiteId( getState() );
	const currentPostId = getEditorPostId( getState() );
	const hasJustOptedOutOfGutenberg = isPreviousRouteGutenberg( getState() );
	if ( ! hasJustOptedOutOfGutenberg && currentSiteId === siteId && currentPostId === postId ) {
		// already editing same post
		return Promise.resolve( getEditedPost( getState(), siteId, postId ) );
	}

	dispatch( startEditingPost( siteId, postId ) );

	return wpcom
		.site( siteId )
		.post( postId )
		.get( { context: 'edit', meta: 'autosave' } )
		.then( ( post ) => {
			post = normalizePostForActions( post );
			dispatch( receivePost( post ) );
			dispatch( editorReset() );
			return post;
		} )
		.catch( ( error ) => {
			dispatch( editorSetLoadingError( error ) );
			return null;
		} );
};
