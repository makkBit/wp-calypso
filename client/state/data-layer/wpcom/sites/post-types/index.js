/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { POST_TYPES_REQUEST } from 'wp-calypso-client/state/action-types';
import { receivePostTypes } from 'wp-calypso-client/state/post-types/actions';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

const handlePostTypesRequest = dispatchRequest( {
	fetch: ( action ) =>
		http(
			{
				method: 'GET',
				path: `/sites/${ action.siteId }/post-types`,
			},
			action
		),
	onSuccess: ( action, data ) => receivePostTypes( action.siteId, data.post_types ),
	onError: noop,
} );

registerHandlers( 'state/data-layer/wpcom/sites/post-types/index.js', {
	[ POST_TYPES_REQUEST ]: [ handlePostTypesRequest ],
} );
