/**
 * External dependencies
 */
import { reject } from 'lodash';

/**
 * Internal dependencies
 */
import {
	CONNECTED_APPLICATION_DELETE_SUCCESS,
	CONNECTED_APPLICATIONS_RECEIVE,
} from 'wp-calypso-client/state/action-types';
import { withSchemaValidation, withStorageKey } from 'wp-calypso-client/state/utils';
import schema from './schema';

const reducer = ( state = null, action ) => {
	switch ( action.type ) {
		case CONNECTED_APPLICATION_DELETE_SUCCESS:
			return reject( state, { ID: action.appId } );
		case CONNECTED_APPLICATIONS_RECEIVE:
			return action.apps;
		default:
			return state;
	}
};

const validatedReducer = withSchemaValidation( schema, reducer );

export default withStorageKey( 'connectedApplications', validatedReducer );
