/**
 * Internal dependencies
 */
import { CONNECTION_LOST, CONNECTION_RESTORED } from 'wp-calypso-client/state/action-types';
import { combineReducers, withoutPersistence, withStorageKey } from 'wp-calypso-client/state/utils';

export const connectionState = withoutPersistence( ( state = 'CHECKING', action ) => {
	switch ( action.type ) {
		case CONNECTION_LOST:
			return 'OFFLINE';
		case CONNECTION_RESTORED:
			return 'ONLINE';
	}

	return state;
} );

const combinedReducer = combineReducers( { connectionState } );
export default withStorageKey( 'application', combinedReducer );
