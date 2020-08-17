/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/signup/init';

export function getDesignType( state ) {
	return get( state, 'signup.steps.designType', '' );
}
