/**
 * Internal dependencies
 */
import user from 'wp-calypso-client/lib/user';
import { ACCOUNT_CLOSE, ACCOUNT_CLOSE_SUCCESS } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/me/account/close';
import 'wp-calypso-client/state/account/init';

export function closeAccount() {
	return {
		type: ACCOUNT_CLOSE,
	};
}

export function closeAccountSuccess() {
	return async ( dispatch ) => {
		await user().clear();
		dispatch( {
			type: ACCOUNT_CLOSE_SUCCESS,
		} );
	};
}
