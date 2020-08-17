/**
 * Internal dependencies
 */
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { errorNotice } from 'wp-calypso-client/state/notices/actions';
import { WORDADS_EARNINGS_REQUEST } from 'wp-calypso-client/state/action-types';
import { receiveEarnings } from 'wp-calypso-client/state/wordads/earnings/actions';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

registerHandlers( 'state/data-layer/wpcom/wordads/earnings/index.js', {
	[ WORDADS_EARNINGS_REQUEST ]: [
		dispatchRequest( {
			fetch: ( action ) =>
				http(
					{
						method: 'GET',
						path: `/sites/${ action.siteId }/wordads/earnings`,
					},
					action
				),
			onSuccess: ( { siteId }, { earnings } ) => receiveEarnings( siteId, earnings ),
			onError: ( action, error ) => errorNotice( error ),
		} ),
	],
} );
