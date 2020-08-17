/**
 * Internal dependencies
 */
import {
	MEMBERSHIPS_CONNECTED_ACCOUNTS_LIST,
	MEMBERSHIPS_CONNECTED_ACCOUNTS_RECEIVE,
} from 'wp-calypso-client/state/action-types';
import wpcom from 'wp-calypso-client/lib/wp';

import 'wp-calypso-client/state/memberships/init';

export function listMembershipsConnectedAccounts() {
	return ( dispatch ) => {
		dispatch( { type: MEMBERSHIPS_CONNECTED_ACCOUNTS_LIST } );

		return wpcom.req.get( '/me/connected_accounts/list' ).then( ( endpointResponse ) => {
			const accounts = endpointResponse.accounts.reduce( ( accumulator, item ) => {
				accumulator[ item.connected_destination_account_id ] = item;
				return accumulator;
			}, {} );
			dispatch( {
				type: MEMBERSHIPS_CONNECTED_ACCOUNTS_RECEIVE,
				accounts,
			} );
			return Promise.resolve( accounts );
		} );
	};
}
