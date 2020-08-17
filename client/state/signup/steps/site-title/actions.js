/**
 * Internal dependencies
 */
import { SIGNUP_STEPS_SITE_TITLE_SET } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/signup/init';

export function setSiteTitle( siteTitle ) {
	return {
		type: SIGNUP_STEPS_SITE_TITLE_SET,
		siteTitle,
	};
}
