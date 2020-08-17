/**
 * External dependencies
 */
import { filter } from 'lodash';

/**
 * Internal dependencies
 */
import createSelector from 'wp-calypso-client/lib/create-selector';
import { getSiteCommentsTree } from 'wp-calypso-client/state/comments/selectors';

import 'wp-calypso-client/state/comments/init';

export const getSiteCommentRepliesTree = createSelector(
	( state, siteId, status, commentParentId ) =>
		filter( getSiteCommentsTree( state, siteId, status ), { commentParentId } ),
	( state, siteId ) => [ state.comments.trees[ siteId ] ]
);
