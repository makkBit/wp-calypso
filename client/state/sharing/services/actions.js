/**
 * Internal dependencies
 */
import wpcom from 'wp-calypso-client/lib/wp';
import {
	KEYRING_SERVICES_RECEIVE,
	KEYRING_SERVICES_REQUEST,
	KEYRING_SERVICES_REQUEST_FAILURE,
	KEYRING_SERVICES_REQUEST_SUCCESS,
} from 'wp-calypso-client/state/action-types';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';

import 'wp-calypso-client/state/sharing/init';

/**
 * Triggers a network request for Keyring services.
 *
 * @returns {Function} Action thunk
 */
export function requestKeyringServices() {
	return ( dispatch, getState ) => {
		dispatch( {
			type: KEYRING_SERVICES_REQUEST,
		} );

		const siteId = getSelectedSiteId( getState() );
		return wpcom
			.undocumented()
			.sitesExternalServices( siteId )
			.then( ( response ) => {
				dispatch( {
					type: KEYRING_SERVICES_RECEIVE,
					services: response.services,
				} );
				dispatch( {
					type: KEYRING_SERVICES_REQUEST_SUCCESS,
				} );
			} )
			.catch( ( error ) =>
				dispatch( {
					type: KEYRING_SERVICES_REQUEST_FAILURE,
					error,
				} )
			);
	};
}
