/**
 * Internal dependencies
 */
import { JETPACK_PRODUCT_INSTALL_STATUS_RECEIVE } from 'wp-calypso-client/state/action-types';
import { keyedReducer, withStorageKey } from 'wp-calypso-client/state/utils';

const reducer = keyedReducer( 'siteId', ( state = {}, { type, status } ) => {
	switch ( type ) {
		case JETPACK_PRODUCT_INSTALL_STATUS_RECEIVE:
			return status;
		default:
			return state;
	}
} );

export default withStorageKey( 'jetpackProductInstall', reducer );
