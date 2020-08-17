/**
 * Internal dependencies
 */
import { JETPACK_CONNECT_CONFIRM_JETPACK_STATUS } from 'wp-calypso-client/state/jetpack-connect/action-types';

import 'wp-calypso-client/state/jetpack-connect/init';

export function confirmJetpackInstallStatus( status ) {
	return {
		type: JETPACK_CONNECT_CONFIRM_JETPACK_STATUS,
		status,
	};
}
