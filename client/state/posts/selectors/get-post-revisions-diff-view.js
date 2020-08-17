/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/posts/init';

export function getPostRevisionsDiffView( state ) {
	return get( state, 'posts.revisions.ui.diffView', 'unified' );
}
