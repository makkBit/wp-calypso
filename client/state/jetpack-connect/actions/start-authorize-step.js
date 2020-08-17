/**
 * Internal dependencies
 */
import { JETPACK_CONNECT_QUERY_SET } from 'wp-calypso-client/state/jetpack-connect/action-types';

import 'wp-calypso-client/state/jetpack-connect/init';

export function startAuthorizeStep( clientId ) {
	return {
		type: JETPACK_CONNECT_QUERY_SET,
		clientId,
		timestamp: Date.now(),
	};
}
