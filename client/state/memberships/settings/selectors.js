/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/memberships/init';

export function getConnectedAccountIdForSiteId( state, siteId ) {
	return get( state, [ 'memberships', 'settings', siteId, 'connectedAccountId' ], null );
}

export function getConnectUrlForSiteId( state, siteId ) {
	return get( state, [ 'memberships', 'settings', siteId, 'connectUrl' ], '' );
}
