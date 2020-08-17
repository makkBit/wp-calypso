/**
 * Internal dependencies
 */
import { REWIND_STATE_REQUEST } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/sites/rewind';

export const requestRewindState = ( siteId ) => ( {
	type: REWIND_STATE_REQUEST,
	siteId,
	meta: {
		dataLayer: {
			trackRequest: true,
		},
	},
} );
