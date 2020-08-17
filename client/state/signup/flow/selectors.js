/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/signup/init';

export function getCurrentFlowName( state ) {
	return get( state, 'signup.flow.currentFlowName', '' );
}
