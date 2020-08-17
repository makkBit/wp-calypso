/**
 * External dependencies
 */
import store from 'store';

/**
 * Internal dependencies
 */
import { saveEdited } from 'wp-calypso-client/state/posts/actions/save-edited';
import {
	getSitePost,
	getEditedPost,
	isEditedPostDirty,
} from 'wp-calypso-client/state/posts/selectors';
import { isPublished } from 'wp-calypso-client/state/posts/utils';
import { editorAutosave } from 'wp-calypso-client/state/editor/actions';
import { getEditorPostId } from 'wp-calypso-client/state/editor/selectors';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';

import 'wp-calypso-client/state/posts/init';

export const autosave = () => async ( dispatch, getState ) => {
	const state = getState();

	const siteId = getSelectedSiteId( state );
	const postId = getEditorPostId( state );

	if ( ! isEditedPostDirty( state, siteId, postId ) ) {
		return null;
	}

	const savedPost = getSitePost( state, siteId, postId );
	const post = getEditedPost( state, siteId, postId );

	store.set( 'wpcom-autosave:' + siteId + ':' + postId, post );

	// TODO: incorporate post locking
	if ( isPublished( savedPost ) || isPublished( post ) ) {
		await dispatch( editorAutosave( post ) );
		return null;
	}

	return await dispatch( saveEdited( { recordSaveEvent: false, autosave: true } ) );
};
