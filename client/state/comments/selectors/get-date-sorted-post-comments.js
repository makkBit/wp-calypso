/**
 * External dependencies
 */
import treeSelect from '@automattic/tree-select';
import { sortBy } from 'lodash';

/**
 * Internal dependencies
 */
import { getPostCommentItems } from 'wp-calypso-client/state/comments/selectors/get-post-comment-items';

import 'wp-calypso-client/state/comments/init';

export const getDateSortedPostComments = treeSelect(
	( state, siteId, postId ) => [ getPostCommentItems( state, siteId, postId ) ],
	( [ comments ] ) => {
		return sortBy( comments, ( comment ) => new Date( comment.date ) );
	}
);
