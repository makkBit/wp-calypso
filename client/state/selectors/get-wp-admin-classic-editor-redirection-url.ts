/**
 * External dependencies
 */
import { pickBy } from 'lodash';

/**
 * Internal dependencies
 */
import { AppState } from 'wp-calypso-client/types';
import { getSiteAdminUrl } from 'wp-calypso-client/state/sites/selectors';
import { addQueryArgs } from 'wp-calypso-client/lib/route';
import { getEditorPostId } from 'wp-calypso-client/state/editor/selectors';
import { getEditedPostValue } from 'wp-calypso-client/state/posts/selectors/get-edited-post-value';
import wpcom from 'wp-calypso-client/lib/wp';

export default function getWpAdminClassicEditorRedirectionUrl( state: AppState, siteId: number ) {
	const postId = getEditorPostId( state ) as number;
	const postType = getEditedPostValue( state, siteId, postId, 'type' );

	let queryArgs = pickBy( {
		post: postId,
		action: postId && 'edit', // If postId is set, open edit view.
		post_type: postType !== 'post' && postType, // Use postType if it's different than post.
		'classic-editor': 1,
	} );

	// needed for loading the editor in SU sessions
	if ( wpcom.addSupportParams ) {
		queryArgs = wpcom.addSupportParams( queryArgs );
	}

	const siteAdminUrl = getSiteAdminUrl(
		state,
		siteId,
		postId ? 'post.php' : 'post-new.php'
	) as string;
	const wpAdminUrl = addQueryArgs( queryArgs, siteAdminUrl );
	return wpAdminUrl;
}
