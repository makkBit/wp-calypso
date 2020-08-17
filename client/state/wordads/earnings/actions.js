/**
 * Internal dependencies
 */
import {
	WORDADS_EARNINGS_REQUEST,
	WORDADS_EARNINGS_RECEIVE,
} from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/wordads/earnings';
import 'wp-calypso-client/state/wordads/init';

export const requestWordadsEarnings = ( siteId ) => ( {
	type: WORDADS_EARNINGS_REQUEST,
	siteId,
} );

export const receiveEarnings = ( siteId, earnings ) => ( {
	type: WORDADS_EARNINGS_RECEIVE,
	siteId,
	earnings,
} );
