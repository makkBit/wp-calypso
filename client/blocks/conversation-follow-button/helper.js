/*
 */

/**
 * Internal dependencies
 */
import { isDiscoverPost } from 'wp-calypso-client/reader/discover/helper';
import { shouldShowComments } from 'wp-calypso-client/blocks/comments/helper';

export function shouldShowConversationFollowButton( post ) {
	return (
		post.site_ID && ! post.is_external && shouldShowComments( post ) && ! isDiscoverPost( post )
	);
}
