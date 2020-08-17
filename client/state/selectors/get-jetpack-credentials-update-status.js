/**
 * External Dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/jetpack/init';

export default function getJetpackCredentialsUpdateStatus( state, siteId ) {
	return get( state, [ 'jetpack', 'credentials', 'requestStatus', siteId ], 'unsubmitted' );
}
