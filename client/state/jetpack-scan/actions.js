/**
 * Internal dependencies
 */
import { JETPACK_SCAN_REQUEST } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/sites/scan';
import 'wp-calypso-client/state/jetpack-scan/init';

export const requestScanStatus = ( siteId, pooling = true ) => ( {
	type: JETPACK_SCAN_REQUEST,
	siteId,
	pooling,
	meta: {
		dataLayer: {
			trackRequest: true,
		},
	},
} );
