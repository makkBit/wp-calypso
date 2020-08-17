/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/application/init';

export function isOffline( state ) {
	return state.application.connectionState === 'OFFLINE';
}

export function isOnline( state ) {
	return state.application.connectionState === 'ONLINE';
}
