/**
 * External dependencies
 */
import { get, orderBy } from 'lodash';

/**
 * Internal dependencies
 */
import createSelector from 'wp-calypso-client/lib/create-selector';

import 'wp-calypso-client/state/posts/init';

export const getPostRevisions = createSelector(
	( state, siteId, postId ) => {
		const revisions = get( state.posts.revisions.diffs, [ siteId, postId, 'revisions' ] );
		return orderBy( revisions, [ 'post_modified_gmt', 'id' ], [ 'desc', 'desc' ] );
	},
	( state ) => [ state.posts.revisions.diffs ]
);
