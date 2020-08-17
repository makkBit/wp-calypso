/**
 * Internal dependencies
 */
import { clearPlan } from 'wp-calypso-client/jetpack-connect/persistence-utils';
import { JETPACK_CONNECT_COMPLETE_FLOW } from 'wp-calypso-client/state/jetpack-connect/action-types';

import 'wp-calypso-client/state/jetpack-connect/init';

export function completeFlow( site ) {
	return ( dispatch ) => {
		clearPlan();
		dispatch( {
			type: JETPACK_CONNECT_COMPLETE_FLOW,
			site,
		} );
	};
}
