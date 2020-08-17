/**
 * Internal dependencies
 */
import { withoutPersistence } from 'wp-calypso-client/state/utils';
import { GOOGLE_MY_BUSINESS_STATS_CHANGE_INTERVAL } from 'wp-calypso-client/state/action-types';

export const statsInterval = withoutPersistence( ( state = 'week', action ) => {
	switch ( action.type ) {
		case GOOGLE_MY_BUSINESS_STATS_CHANGE_INTERVAL: {
			const { interval } = action;
			return interval;
		}
	}

	return state;
} );
