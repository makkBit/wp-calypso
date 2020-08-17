/**
 * Internal dependencies
 */
import { SIGNUP_STEPS_DESIGN_TYPE_SET } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/signup/init';

export function setDesignType( designType ) {
	return {
		type: SIGNUP_STEPS_DESIGN_TYPE_SET,
		designType,
	};
}
