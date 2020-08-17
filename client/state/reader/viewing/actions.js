/**
 * Internal Dependencies
 */
import {
	READER_VIEWING_FULL_POST_SET,
	READER_VIEWING_FULL_POST_UNSET,
} from 'wp-calypso-client/state/reader/action-types';
import 'wp-calypso-client/state/reader/init';

export const setViewingFullPostKey = ( postKey ) => ( {
	type: READER_VIEWING_FULL_POST_SET,
	postKey,
} );

export const unsetViewingFullPostKey = ( postKey ) => ( {
	type: READER_VIEWING_FULL_POST_UNSET,
	postKey,
} );
