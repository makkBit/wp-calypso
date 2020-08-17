/**
 * Internal dependencies
 */
import {
	READER_VIEWING_FULL_POST_SET,
	READER_VIEWING_FULL_POST_UNSET,
} from 'wp-calypso-client/state/reader/action-types';
import { SERIALIZE } from 'wp-calypso-client/state/action-types';
import { combineReducers } from 'wp-calypso-client/state/utils';

/**
 * Tracks the post key of the currently full viewed post
 *
 * @param  {object} state  Current state
 * @param  {object} action Action payload
 * @returns {object}        Updated state
 */
export function fullPost( state = null, action ) {
	switch ( action.type ) {
		case READER_VIEWING_FULL_POST_SET:
			return action.postKey;

		case READER_VIEWING_FULL_POST_UNSET: {
			return null;
		}

		case SERIALIZE:
			return null;
	}
	return state;
}

export default combineReducers( {
	fullPost,
} );
