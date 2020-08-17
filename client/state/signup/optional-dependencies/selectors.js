/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/signup/init';

export function getSuggestedUsername( state ) {
	return get( state, 'signup.optionalDependencies.suggestedUsername', '' );
}
