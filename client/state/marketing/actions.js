/**
 * Internal dependencies
 */
import { MARKETING_CLICK_UPGRADE_NUDGE } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/marketing';

export const clickUpgradeNudge = ( siteId, nudgeName ) => ( {
	type: MARKETING_CLICK_UPGRADE_NUDGE,
	siteId,
	nudgeName,
} );
