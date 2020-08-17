/**
 * Internal dependencies
 */

import { GUTENBERG_OPT_IN_DIALOG_IS_SHOWING } from 'wp-calypso-client/state/action-types';
import { combineReducers } from 'wp-calypso-client/state/utils';

function isGutenbergOptInDialogShowing( state = false, action ) {
	if ( action.type === GUTENBERG_OPT_IN_DIALOG_IS_SHOWING ) {
		return action.isShowing;
	}
	return state;
}

export default combineReducers( {
	isShowing: isGutenbergOptInDialogShowing,
} );
