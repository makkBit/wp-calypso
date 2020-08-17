/**
 * External dependencies
 */

import { pick } from 'lodash';

/**
 * Internal dependencies
 */
import { REWIND_BACKUP } from 'wp-calypso-client/state/action-types';
import {
	rewindBackupUpdateError,
	updateRewindBackupProgress,
	getRewindBackupProgress,
} from 'wp-calypso-client/state/activity-log/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

const createBackup = ( action ) =>
	http(
		{
			method: 'POST',
			apiNamespace: 'wpcom/v2',
			path: `/sites/${ action.siteId }/rewind/downloads`,
			body: {
				rewindId: action.rewindId,
				types: action.args,
			},
		},
		action
	);

const fromApi = ( data ) => {
	if ( ! data.hasOwnProperty( 'downloadId' ) ) {
		throw new Error( 'Missing downloadId field in response' );
	}

	return data;
};

export const receiveBackupSuccess = ( { siteId }, data ) => {
	return [
		getRewindBackupProgress( siteId ),
		updateRewindBackupProgress( siteId, data.downloadId, data ),
	];
};

export const receiveBackupError = ( { siteId }, error ) =>
	rewindBackupUpdateError( siteId, pick( error, [ 'error', 'status', 'message' ] ) );

registerHandlers( 'state/data-layer/wpcom/activity-log/rewind/downloads/index.js', {
	[ REWIND_BACKUP ]: [
		dispatchRequest( {
			fetch: createBackup,
			onSuccess: receiveBackupSuccess,
			onError: receiveBackupError,
			fromApi,
		} ),
	],
} );
