/**
 * Internal dependencies
 */
import { ACCOUNT_CLOSE_SUCCESS } from 'wp-calypso-client/state/action-types';
import { combineReducers, withoutPersistence, withStorageKey } from 'wp-calypso-client/state/utils';

export const isClosed = withoutPersistence( ( state = false, action ) => {
	switch ( action.type ) {
		case ACCOUNT_CLOSE_SUCCESS: {
			return true;
		}
	}

	return state;
} );

const combinedReducer = combineReducers( { isClosed } );
export default withStorageKey( 'account', combinedReducer );
