/**
 * Internal dependencies
 */
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { errorNotice } from 'wp-calypso-client/state/notices/actions';
import { WORDADS_STATUS_REQUEST } from 'wp-calypso-client/state/action-types';
import { receiveStatus } from 'wp-calypso-client/state/wordads/status/actions';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

registerHandlers( 'state/data-layer/wpcom/wordads/status/index.js', {
	[ WORDADS_STATUS_REQUEST ]: [
		dispatchRequest( {
			fetch: ( action ) =>
				http(
					{
						method: 'GET',
						path: `/sites/${ action.siteId }/wordads/account`,
					},
					action
				),
			onSuccess: ( { siteId }, status ) => receiveStatus( siteId, status ),
			onError: ( action, error ) => errorNotice( error ),
		} ),
	],
} );
