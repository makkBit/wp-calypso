/**
 * Internal dependencies
 */
import wpcom from 'wp-calypso-client/lib/wp';

export function getAvailableTlds( query = {} ) {
	return wpcom.undocumented().getAvailableTlds( query );
}
