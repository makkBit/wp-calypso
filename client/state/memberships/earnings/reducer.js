/**
 * Internal dependencies
 */
import { MEMBERSHIPS_EARNINGS_RECEIVE } from 'wp-calypso-client/state/action-types';
import { combineReducers, withoutPersistence } from 'wp-calypso-client/state/utils';

const summary = withoutPersistence( ( state = {}, action ) => {
	switch ( action.type ) {
		case MEMBERSHIPS_EARNINGS_RECEIVE:
			return {
				...state,
				[ action.siteId ]: action.earnings,
			};
	}

	return state;
} );

export default combineReducers( {
	summary,
} );
