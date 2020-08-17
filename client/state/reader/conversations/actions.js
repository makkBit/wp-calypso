/**
 * Internal dependencies
 */
import {
	READER_CONVERSATION_FOLLOW,
	READER_CONVERSATION_MUTE,
	READER_CONVERSATION_UPDATE_FOLLOW_STATUS,
} from 'wp-calypso-client/state/reader/action-types';
import { getReaderConversationFollowStatus } from 'wp-calypso-client/state/reader/conversations/selectors';

import 'wp-calypso-client/state/data-layer/wpcom/read/sites/posts/follow';
import 'wp-calypso-client/state/data-layer/wpcom/read/sites/posts/mute';

import 'wp-calypso-client/state/reader/init';

export function followConversation( { siteId, postId } ) {
	return ( dispatch, getState ) => {
		dispatch( {
			type: READER_CONVERSATION_FOLLOW,
			payload: {
				siteId,
				postId,
			},
			meta: {
				previousState: getReaderConversationFollowStatus( getState(), {
					siteId,
					postId,
				} ),
			},
		} );
	};
}
export function muteConversation( { siteId, postId } ) {
	return ( dispatch, getState ) => {
		dispatch( {
			type: READER_CONVERSATION_MUTE,
			payload: {
				siteId,
				postId,
			},
			meta: {
				previousState: getReaderConversationFollowStatus( getState(), {
					siteId,
					postId,
				} ),
			},
		} );
	};
}

export function updateConversationFollowStatus( { siteId, postId, followStatus } ) {
	return {
		type: READER_CONVERSATION_UPDATE_FOLLOW_STATUS,
		payload: {
			siteId,
			postId,
			followStatus,
		},
	};
}
