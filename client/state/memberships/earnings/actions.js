/**
 * Internal dependencies
 */
import { MEMBERSHIPS_EARNINGS_GET } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/sites/memberships';
import 'wp-calypso-client/state/memberships/init';

export const requestEarnings = ( siteId ) => ( {
	siteId,
	type: MEMBERSHIPS_EARNINGS_GET,
} );
