/**
 * Internal dependencies
 */
import {
	JETPACK_SITE_ALERT_THREAT_FIX,
	JETPACK_SITE_ALERT_THREAT_IGNORE,
} from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/sites/alerts/fix';
import 'wp-calypso-client/state/data-layer/wpcom/sites/alerts/ignore';
import 'wp-calypso-client/state/jetpack/init';

export const fixThreatAlert = ( siteId, threatId ) => ( {
	type: JETPACK_SITE_ALERT_THREAT_FIX,
	siteId,
	threatId,
} );

export const ignoreThreatAlert = ( siteId, threatId ) => ( {
	type: JETPACK_SITE_ALERT_THREAT_IGNORE,
	siteId,
	threatId,
} );
