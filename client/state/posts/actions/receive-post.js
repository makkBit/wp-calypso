/**
 * Internal dependencies
 */
import { receivePosts } from 'wp-calypso-client/state/posts/actions/receive-posts';

import 'wp-calypso-client/state/posts/init';

/**
 * Returns an action object to be used in signalling that a post object has
 * been received.
 *
 * @param  {object}  post       Post received
 * @param  {?string} saveMarker Save marker in the edits log
 * @returns {object}             Action object
 */
export function receivePost( post, saveMarker ) {
	return receivePosts( [ post ], saveMarker );
}
