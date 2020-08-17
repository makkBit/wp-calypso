/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/reader/init';

export default function isRequestingReaderTeams( state ) {
	return !! state.reader.teams.isRequesting;
}
