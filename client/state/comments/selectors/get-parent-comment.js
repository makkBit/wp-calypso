/**
 * Internal dependencies
 */
import { getPostCommentsTree } from 'wp-calypso-client/state/comments/selectors/get-post-comments-tree';

import 'wp-calypso-client/state/comments/init';

/**
 * Returns the parent comment of a given comment
 *
 * @param {object} state Redux state
 * @param {number} siteId Site identifier
 * @param {number} postId Post identifier
 * @param {number} commentId Comment identifier
 * @returns {object} The parent comment
 */
export const getParentComment = ( state, siteId, postId, commentId ) => {
	const commentsTree = getPostCommentsTree( state, siteId, postId, 'all' );
	const parentCommentId = commentsTree[ commentId ]?.data.parent?.ID ?? 0;
	return commentsTree[ parentCommentId ]?.data ?? {};
};
