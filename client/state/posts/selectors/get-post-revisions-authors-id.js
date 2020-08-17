/**
 * External dependencies
 */
import { get, map, uniq } from 'lodash';

/**
 * Internal dependencies
 */
import createSelector from 'wp-calypso-client/lib/create-selector';

import 'wp-calypso-client/state/posts/init';

export const getPostRevisionsAuthorsId = createSelector(
	( state, siteId, postId ) =>
		uniq(
			map( get( state.posts.revisions.diffs, [ siteId, postId, 'revisions' ], {} ), ( r ) =>
				parseInt( r.post_author, 10 )
			)
		),
	( state ) => [ state.posts.revisions.diffs ]
);
