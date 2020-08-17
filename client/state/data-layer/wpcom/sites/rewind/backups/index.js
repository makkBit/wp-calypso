/**
 * Internal dependencies
 */
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';
import { REWIND_BACKUPS_REQUEST } from 'wp-calypso-client/state/action-types';
import { setRewindBackups } from 'wp-calypso-client/state/rewind/backups/actions';
import { noRetry } from 'wp-calypso-client/state/data-layer/wpcom-http/pipeline/retry-on-failure/policies';

export const fetchBackups = ( action ) => {
	return http(
		{
			method: 'GET',
			path: `/sites/${ action.siteId }/rewind/backups`,
			apiNamespace: 'wpcom/v2',
			retryPolicy: noRetry(),
		},
		action
	);
};

export const setBackups = ( { siteId }, backups ) => setRewindBackups( siteId, backups );

export const resetBackups = ( { siteId } ) => setRewindBackups( siteId, [] );

registerHandlers( 'state/data-layer/wpcom/sites/rewind/backups/index.js', {
	[ REWIND_BACKUPS_REQUEST ]: [
		dispatchRequest( {
			fetch: fetchBackups,
			onSuccess: setBackups,
			onError: resetBackups,
		} ),
	],
} );
