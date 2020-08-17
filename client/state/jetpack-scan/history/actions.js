/**
 * Internal dependencies
 */
import { JETPACK_SCAN_HISTORY_REQUEST } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/sites/scan';
import 'wp-calypso-client/state/jetpack-scan/init';

export const requestJetpackScanHistory = ( siteId ) => ( {
	type: JETPACK_SCAN_HISTORY_REQUEST,
	siteId,
	meta: {
		dataLayer: {
			trackRequest: true,
		},
	},
} );
