/**
 * Internal dependencies
 */
import wpcom from 'wp-calypso-client/lib/wp';
import {
	POST_DELETE_FAILURE,
	POST_DELETE_SUCCESS,
	POST_DELETE,
} from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/posts/init';

/**
 * Returns an action thunk which, when dispatched, triggers a network request
 * to delete the specified post. The post should already have a status of trash
 * when dispatching this action, else you should use `trashPost`.
 *
 * @param  {number}   siteId Site ID
 * @param  {number}   postId Post ID
 * @returns {Function}        Action thunk
 */
export function deletePost( siteId, postId ) {
	return ( dispatch ) => {
		dispatch( {
			type: POST_DELETE,
			siteId,
			postId,
		} );

		const deleteResult = wpcom.site( siteId ).post( postId ).delete();

		deleteResult.then(
			() => {
				dispatch( {
					type: POST_DELETE_SUCCESS,
					siteId,
					postId,
				} );
			},
			( error ) => {
				dispatch( {
					type: POST_DELETE_FAILURE,
					siteId,
					postId,
					error,
				} );
			}
		);

		return deleteResult;
	};
}
