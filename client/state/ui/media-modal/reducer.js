/**
 * Internal dependencies
 */

import { combineReducers, withoutPersistence } from 'wp-calypso-client/state/utils';
import { MEDIA_MODAL_VIEW_SET } from 'wp-calypso-client/state/action-types';

export const view = withoutPersistence( ( state = null, action ) => {
	switch ( action.type ) {
		case MEDIA_MODAL_VIEW_SET:
			return action.view;
	}

	return state;
} );

export default combineReducers( {
	view,
} );
