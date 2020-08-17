/**
 * Internal dependencies
 */
import { getStateKey } from 'wp-calypso-client/state/comments/utils';

import 'wp-calypso-client/state/comments/init';

export function getExpansionsForPost( state, siteId, postId ) {
	return state.comments.expansions[ getStateKey( siteId, postId ) ];
}
