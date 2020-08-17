/**
 * External dependencies
 */

import { combineReducers, keyedReducer } from 'wp-calypso-client/state/utils';

/**
 * Internal dependencies
 */
import edits from './edits/reducer';

export default keyedReducer(
	'siteId',
	combineReducers( {
		edits,
	} )
);
