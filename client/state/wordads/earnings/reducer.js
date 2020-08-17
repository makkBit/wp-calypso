/**
 * Internal dependencies
 */

import { WORDADS_EARNINGS_RECEIVE } from 'wp-calypso-client/state/action-types';
import { keyedReducer } from 'wp-calypso-client/state/utils';

export const items = keyedReducer( 'siteId', ( state, action ) => {
	switch ( action.type ) {
		case WORDADS_EARNINGS_RECEIVE:
			return action.earnings;
		default:
			return state;
	}
} );

export default items;
