/**
 * Internal dependencies
 */
import { isPublished } from 'wp-calypso-client/state/posts/utils/is-published';
import { removeSlug } from 'wp-calypso-client/state/posts/utils/remove-slug';

export function getPermalinkBasePath( post ) {
	if ( ! post ) {
		return;
	}

	let path = post.URL;

	// if we have a permalink_URL, utlize that
	if ( ! isPublished( post ) && post.other_URLs && post.other_URLs.permalink_URL ) {
		path = post.other_URLs.permalink_URL;
	}

	return removeSlug( path );
}
