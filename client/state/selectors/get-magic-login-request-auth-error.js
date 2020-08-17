/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/login/init';

export default function getMagicLoginRequestAuthError( state ) {
	return get( state, 'login.magicLogin.requestAuthError', null );
}
