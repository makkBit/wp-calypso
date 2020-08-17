/**
 * Internal dependencies
 */

import { COMMENTS_REPLY_WRITE } from 'wp-calypso-client/state/action-types';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import {
	dispatchNewCommentRequest,
	updatePlaceholderComment,
	handleWriteCommentFailure,
} from 'wp-calypso-client/state/data-layer/wpcom/sites/utils';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

export const writeReplyComment = ( action ) =>
	dispatchNewCommentRequest(
		action,
		`/sites/${ action.siteId }/comments/${ action.parentCommentId }/replies/new`
	);

registerHandlers( 'state/data-layer/wpcom/sites/comments/replies/new/index.js', {
	[ COMMENTS_REPLY_WRITE ]: [
		dispatchRequest( {
			fetch: writeReplyComment,
			onSuccess: updatePlaceholderComment,
			onError: handleWriteCommentFailure,
		} ),
	],
} );

export default {};
