/**
 * Internal dependencies
 */
import { SIGNUP_STEPS_SITE_GOALS_SET } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/signup/init';

export function setSiteGoals( siteGoals ) {
	return {
		type: SIGNUP_STEPS_SITE_GOALS_SET,
		siteGoals,
	};
}
