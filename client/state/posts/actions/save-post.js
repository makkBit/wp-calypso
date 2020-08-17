/**
 * Internal dependencies
 */
import wpcom from 'wp-calypso-client/lib/wp';
import { POST_SAVE_FAILURE, POST_SAVE } from 'wp-calypso-client/state/action-types';
import { receivePost } from 'wp-calypso-client/state/posts/actions/receive-post';
import { savePostSuccess } from 'wp-calypso-client/state/posts/actions/save-post-success';
import { normalizePostForApi } from 'wp-calypso-client/state/posts/utils';

import 'wp-calypso-client/state/posts/init';

/**
 * Returns an action thunk which, when dispatched, triggers a network request
 * to save the specified post object.
 *
 * @param  {number}   siteId Site ID
 * @param  {number}   postId Post ID
 * @param  {object}   post   Post attributes
 * @returns {Function}        Action thunk
 */
export function savePost( siteId, postId = null, post ) {
	return ( dispatch ) => {
		dispatch( {
			type: POST_SAVE,
			siteId,
			postId,
			post,
		} );

		const postHandle = wpcom.site( siteId ).post( postId );
		const normalizedPost = normalizePostForApi( post );
		const method = postId ? 'update' : 'add';
		const saveResult = postHandle[ method ]( { apiVersion: '1.2' }, normalizedPost );

		saveResult.then(
			( savedPost ) => {
				dispatch( savePostSuccess( siteId, postId, savedPost, post ) );
				dispatch( receivePost( savedPost ) );
			},
			( error ) => {
				dispatch( {
					type: POST_SAVE_FAILURE,
					siteId,
					postId,
					error,
				} );
			}
		);

		return saveResult;
	};
}
