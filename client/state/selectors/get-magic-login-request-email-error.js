/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/login/init';

export default function getMagicLoginRequestEmailError( state ) {
	return get( state, 'login.magicLogin.requestEmailError', null );
}
