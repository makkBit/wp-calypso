/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/comments/init';

export function getCommentErrors( state ) {
	return state.comments.errors;
}
