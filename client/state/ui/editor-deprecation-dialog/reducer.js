/**
 * Internal dependencies
 */

import { EDITOR_DEPRECATION_DIALOG_IS_SHOWING } from 'wp-calypso-client/state/action-types';
import { combineReducers, withSchemaValidation } from 'wp-calypso-client/state/utils';

function isEditorDeprecationDialogShowing( state = true, action ) {
	if ( action.type === EDITOR_DEPRECATION_DIALOG_IS_SHOWING ) {
		return action.isShowing;
	}
	return state;
}

export default combineReducers( {
	isShowing: withSchemaValidation( { type: 'boolean' }, isEditorDeprecationDialogShowing ),
} );
