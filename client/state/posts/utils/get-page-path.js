/**
 * Internal dependencies
 */
import { getPermalinkBasePath } from 'wp-calypso-client/state/posts/utils/get-permalink-base-path';
import { isPublished } from 'wp-calypso-client/state/posts/utils/is-published';
import { removeSlug } from 'wp-calypso-client/state/posts/utils/remove-slug';

export function getPagePath( post ) {
	if ( ! post ) {
		return;
	}
	if ( ! isPublished( post ) ) {
		return getPermalinkBasePath( post );
	}

	return removeSlug( post.URL );
}
