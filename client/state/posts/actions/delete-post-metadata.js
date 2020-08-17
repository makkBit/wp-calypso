/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import { POST_EDIT } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/posts/init';

export function deletePostMetadata( siteId, postId = null, metaKeys ) {
	if ( ! Array.isArray( metaKeys ) ) {
		metaKeys = [ metaKeys ];
	}

	return {
		type: POST_EDIT,
		siteId,
		postId,
		post: {
			metadata: map( metaKeys, ( key ) => ( { key, operation: 'delete' } ) ),
		},
	};
}
