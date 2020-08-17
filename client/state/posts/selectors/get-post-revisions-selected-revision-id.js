/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/posts/init';

export function getPostRevisionsSelectedRevisionId( state ) {
	return get( state, 'posts.revisions.selection.revisionId' );
}
