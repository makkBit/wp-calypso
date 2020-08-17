/**
 * Internal dependencies
 */
import wpcom from 'wp-calypso-client/lib/wp';

export function resendInboundTransferEmail( domainName, onComplete ) {
	if ( ! domainName ) {
		onComplete( null );
		return;
	}

	wpcom.undocumented().resendInboundTransferEmail( domainName, function ( serverError, result ) {
		if ( serverError ) {
			onComplete( serverError );
			return;
		}

		onComplete( null, result );
	} );
}
