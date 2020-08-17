/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/posts/init';

export function isPostRevisionsDialogVisible( state ) {
	return get( state, 'posts.revisions.ui.isDialogVisible', false );
}
