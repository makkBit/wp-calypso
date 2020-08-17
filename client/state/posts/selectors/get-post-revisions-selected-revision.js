/**
 * Internal dependencies
 */
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { getEditorPostId } from 'wp-calypso-client/state/editor/selectors';
import { getPostRevision } from 'wp-calypso-client/state/posts/selectors/get-post-revision';
import { getPostRevisionsSelectedRevisionId } from 'wp-calypso-client/state/posts/selectors/get-post-revisions-selected-revision-id';

export function getPostRevisionsSelectedRevision( state ) {
	const siteId = getSelectedSiteId( state );
	const postId = getEditorPostId( state );
	const revisionId = getPostRevisionsSelectedRevisionId( state );
	return getPostRevision( state, siteId, postId, revisionId );
}
