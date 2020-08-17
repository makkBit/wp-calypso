/**
 * Internal dependencies
 */
import { withoutPersistence } from 'wp-calypso-client/state/utils';
import { SIGNUP_SEGMENTS_SET } from 'wp-calypso-client/state/action-types';

export default withoutPersistence( ( state = null, action ) => {
	switch ( action.type ) {
		case SIGNUP_SEGMENTS_SET:
			return action.segments;
	}

	return state;
} );
