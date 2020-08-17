/**
 * External dependencies
 */
import { size } from 'lodash';

/**
 * Internal dependencies
 */
import { fetchStatusInitialState } from 'wp-calypso-client/state/comments/reducer';
import { getPostCommentItems } from 'wp-calypso-client/state/comments/selectors/get-post-comment-items';
import { getStateKey } from 'wp-calypso-client/state/comments/utils';

import 'wp-calypso-client/state/comments/init';

export function commentsFetchingStatus( state, siteId, postId, commentTotal = 0 ) {
	const fetchStatus =
		state.comments.fetchStatus[ getStateKey( siteId, postId ) ] ?? fetchStatusInitialState;
	const hasMoreComments = commentTotal > size( getPostCommentItems( state, siteId, postId ) );

	return {
		haveEarlierCommentsToFetch: fetchStatus.before && hasMoreComments,
		haveLaterCommentsToFetch: fetchStatus.after && hasMoreComments,
		hasReceivedBefore: fetchStatus.hasReceivedBefore,
		hasReceivedAfter: fetchStatus.hasReceivedAfter,
	};
}
