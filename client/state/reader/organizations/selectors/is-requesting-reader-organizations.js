/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/reader/init';

export default function isRequestingReaderOrganizations( state ) {
	return !! state.reader.organizations.isRequesting;
}
