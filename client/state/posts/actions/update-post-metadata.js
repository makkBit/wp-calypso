/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import { POST_EDIT } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/posts/init';

export function updatePostMetadata( siteId, postId = null, metaKey, metaValue ) {
	if ( typeof metaKey === 'string' ) {
		metaKey = { [ metaKey ]: metaValue };
	}

	return {
		type: POST_EDIT,
		siteId,
		postId,
		post: {
			metadata: map( metaKey, ( value, key ) => ( {
				key,
				value,
				operation: 'update',
			} ) ),
		},
	};
}
