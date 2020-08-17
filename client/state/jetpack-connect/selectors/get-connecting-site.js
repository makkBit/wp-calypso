/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/jetpack-connect/init';

export const getConnectingSite = ( state ) => {
	return get( state, [ 'jetpackConnect', 'jetpackConnectSite' ] );
};
