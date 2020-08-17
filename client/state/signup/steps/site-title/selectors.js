/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/signup/init';

export function getSiteTitle( state ) {
	return get( state, 'signup.steps.siteTitle', '' );
}
