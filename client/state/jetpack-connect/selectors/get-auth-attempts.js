/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { AUTH_ATTEMPS_TTL } from 'wp-calypso-client/state/jetpack-connect/constants';
import { isStale } from 'wp-calypso-client/state/jetpack-connect/utils';

import 'wp-calypso-client/state/jetpack-connect/init';

export const getAuthAttempts = ( state, slug ) => {
	const attemptsData = get( state, [ 'jetpackConnect', 'jetpackAuthAttempts', slug ] );
	if ( attemptsData && isStale( attemptsData.timestamp, AUTH_ATTEMPS_TTL ) ) {
		return 0;
	}
	return attemptsData ? attemptsData.attempt || 0 : 0;
};
