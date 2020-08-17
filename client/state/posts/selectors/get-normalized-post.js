/**
 * Internal dependencies
 */
import createSelector from 'wp-calypso-client/lib/create-selector';
import { getPost } from 'wp-calypso-client/state/posts/selectors/get-post';
import { normalizePostForDisplay } from 'wp-calypso-client/state/posts/utils';

import 'wp-calypso-client/state/posts/init';

/**
 * Returns a normalized post object by its global ID, or null if the post does
 * not exist. A normalized post includes common transformations to prepare the
 * post for display.
 *
 * @param   {object}  state    Global state tree
 * @param   {string}  globalId Post global ID
 * @returns {?object}          Post object
 */
export const getNormalizedPost = createSelector(
	( state, globalId ) => normalizePostForDisplay( getPost( state, globalId ) ),
	( state ) => [ state.posts.items, state.posts.queries ]
);
