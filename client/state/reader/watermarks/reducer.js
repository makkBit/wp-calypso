/**
 * External Dependencies
 */
import { max } from 'lodash';

/**
 * Internal dependencies
 */
import { READER_VIEW_STREAM } from 'wp-calypso-client/state/reader/action-types';
import { keyedReducer, withSchemaValidation } from 'wp-calypso-client/state/utils';
import schema from './watermark-schema';

export const watermarks = keyedReducer(
	'streamKey',
	withSchemaValidation( schema, ( state = {}, action ) => {
		switch ( action.type ) {
			case READER_VIEW_STREAM:
				return max( [ +state, +action.mark ] );
		}

		return state;
	} )
);

watermarks.hasCustomPersistence = true;
