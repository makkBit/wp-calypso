/**
 * External dependencies
 */

import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { REWIND_DEACTIVATE_REQUEST } from 'wp-calypso-client/state/action-types';
import {
	rewindDeactivateFailure,
	rewindDeactivateSuccess,
} from 'wp-calypso-client/state/activity-log/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { errorNotice } from 'wp-calypso-client/state/notices/actions';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

const deactivateRewind = ( action ) =>
	http(
		{
			method: 'POST',
			path: `/activity-log/${ action.siteId }/rewind/deactivate`,
			apiVersion: '1',
		},
		action
	);

export const deactivateSucceeded = ( { siteId } ) => rewindDeactivateSuccess( siteId );

export const deactivateFailed = ( { siteId }, { message } ) => [
	errorNotice( translate( 'Problem deactivating rewind: %(message)s', { args: { message } } ) ),
	rewindDeactivateFailure( siteId ),
];

registerHandlers( 'state/data-layer/wpcom/activity-log/deactivate/index.js', {
	[ REWIND_DEACTIVATE_REQUEST ]: [
		dispatchRequest( {
			fetch: deactivateRewind,
			onSuccess: deactivateSucceeded,
			onError: deactivateFailed,
		} ),
	],
} );
