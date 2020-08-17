/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/account/init';

export default function isAccountClosed( state ) {
	return get( state, [ 'account', 'isClosed' ], false );
}
