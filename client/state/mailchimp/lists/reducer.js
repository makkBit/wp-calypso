/**
 * Internal dependencies
 */

import { combineReducers, withoutPersistence } from 'wp-calypso-client/state/utils';
import { MAILCHIMP_LISTS_RECEIVE } from 'wp-calypso-client/state/action-types';

export const items = withoutPersistence( ( state = [], action ) => {
	switch ( action.type ) {
		case MAILCHIMP_LISTS_RECEIVE: {
			const { siteId, lists } = action;

			return {
				...state,
				[ siteId ]: lists,
			};
		}
	}

	return state;
} );

export default combineReducers( {
	items,
} );
