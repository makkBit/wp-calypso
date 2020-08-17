/**
 * Internal dependencies
 */
import { LEGAL_REQUEST, LEGAL_SET, TOS_ACCEPT } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/legal';
import 'wp-calypso-client/state/legal/init';

export const requestLegalData = () => ( {
	type: LEGAL_REQUEST,
} );

export const setLegalData = ( legalData ) => ( {
	type: LEGAL_SET,
	legalData,
} );

export const acceptTos = () => ( {
	type: TOS_ACCEPT,
} );
