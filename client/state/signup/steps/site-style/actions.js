/**
 * Internal dependencies
 */
import { SIGNUP_STEPS_SITE_STYLE_SET } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/signup/init';

export function setSiteStyle( siteStyle ) {
	return {
		type: SIGNUP_STEPS_SITE_STYLE_SET,
		siteStyle,
	};
}
