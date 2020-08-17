/**
 * Internal dependencies
 */

import { combineReducers } from 'wp-calypso-client/state/utils';
import { HELP_COURSES_RECEIVE } from 'wp-calypso-client/state/action-types';

export const items = ( state = null, action ) => {
	switch ( action.type ) {
		case HELP_COURSES_RECEIVE: {
			const { courses } = action;
			return courses;
		}
	}

	return state;
};

export default combineReducers( {
	items,
} );
