/**
 * Internal dependencies
 */
import { SIGNUP_STEPS_USER_EXPERIENCE_SET } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/signup/init';

export function setUserExperience( userExperience ) {
	return {
		type: SIGNUP_STEPS_USER_EXPERIENCE_SET,
		userExperience,
	};
}
