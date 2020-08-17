/**
 * Internal dependencies
 */
import {
	KEYRING_SERVICES_RECEIVE,
	KEYRING_SERVICES_REQUEST,
	KEYRING_SERVICES_REQUEST_FAILURE,
	KEYRING_SERVICES_REQUEST_SUCCESS,
} from 'wp-calypso-client/state/action-types';
import {
	combineReducers,
	withSchemaValidation,
	withoutPersistence,
} from 'wp-calypso-client/state/utils';
import { itemSchema } from './schema';

// Stores the list of available keyring services
export const items = withSchemaValidation( itemSchema, ( state = {}, action ) => {
	switch ( action.type ) {
		case KEYRING_SERVICES_RECEIVE:
			return action.services;
	}

	return state;
} );

// Tracks fetching state for keyring services
export const isFetching = withoutPersistence( ( state = false, action ) => {
	switch ( action.type ) {
		case KEYRING_SERVICES_REQUEST:
			return true;
		case KEYRING_SERVICES_REQUEST_SUCCESS:
			return false;
		case KEYRING_SERVICES_REQUEST_FAILURE:
			return false;
	}

	return state;
} );

export default combineReducers( {
	isFetching,
	items,
} );
