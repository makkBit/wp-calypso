/**
 * Internal dependencies
 */
import { JETPACK_CONNECT_DISMISS_URL_STATUS } from 'wp-calypso-client/state/jetpack-connect/action-types';

import 'wp-calypso-client/state/jetpack-connect/init';

export function dismissUrl( url ) {
	return {
		type: JETPACK_CONNECT_DISMISS_URL_STATUS,
		url,
	};
}
