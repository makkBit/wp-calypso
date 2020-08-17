/**
 * Internal dependencies
 */
import { REWIND_CAPABILITIES_REQUEST } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/sites/rewind/capabilities';

export const requestRewindCapabilities = ( siteId ) => ( {
	type: REWIND_CAPABILITIES_REQUEST,
	siteId,
	meta: {
		dataLayer: {
			trackRequest: true,
		},
	},
} );
