/**
 * Internal dependencies
 */
import wpcom from 'wp-calypso-client/lib/wp';

export function resendIcannVerification( domainName, onComplete ) {
	return wpcom.undocumented().resendIcannVerification( domainName, onComplete );
}
