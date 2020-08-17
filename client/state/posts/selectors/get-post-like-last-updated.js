/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/posts/init';

export function getPostLikeLastUpdated( state, siteId, postId ) {
	return get( state.posts.likes.items, [ siteId, postId, 'lastUpdated' ] );
}
