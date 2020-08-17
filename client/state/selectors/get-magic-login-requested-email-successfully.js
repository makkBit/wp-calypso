/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/login/init';

export default function getMagicLoginRequestedEmailSuccessfully( state ) {
	return get( state, 'login.magicLogin.requestedEmailSuccessfully', false );
}
