/**
 * Internal dependencies
 */
import { combineReducers, withSchemaValidation } from 'wp-calypso-client/state/utils';
import { SIGNUP_CURRENT_FLOW_NAME_SET } from 'wp-calypso-client/state/action-types';
import { currentFlowNameSchema } from './schema';

export const currentFlowName = withSchemaValidation(
	currentFlowNameSchema,
	( state = '', { flowName, type } ) => ( type === SIGNUP_CURRENT_FLOW_NAME_SET ? flowName : state )
);

export default combineReducers( {
	currentFlowName,
} );
