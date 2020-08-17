/**
 * Internal dependencies
 */
import { EDITOR_SAVE_BLOCK, EDITOR_SAVE_UNBLOCK } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/editor/init';

export const blockSave = ( key ) => ( {
	type: EDITOR_SAVE_BLOCK,
	key,
} );

export const unblockSave = ( key ) => ( {
	type: EDITOR_SAVE_UNBLOCK,
	key,
} );
