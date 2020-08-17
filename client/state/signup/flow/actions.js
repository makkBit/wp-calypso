/**
 * Internal dependencies
 */
import { SIGNUP_CURRENT_FLOW_NAME_SET } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/signup/init';

export function setCurrentFlowName( flowName ) {
	return {
		type: SIGNUP_CURRENT_FLOW_NAME_SET,
		flowName,
	};
}
