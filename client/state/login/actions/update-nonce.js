/**
 * Internal dependencies
 */
import { TWO_FACTOR_AUTHENTICATION_UPDATE_NONCE } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/login/init';

export function updateNonce( nonceType, twoStepNonce ) {
	return {
		type: TWO_FACTOR_AUTHENTICATION_UPDATE_NONCE,
		nonceType,
		twoStepNonce,
	};
}
