/**
 * Internal dependencies
 */

import { combineReducers, keyedReducer } from 'wp-calypso-client/state/utils';
import edits from './edits-reducer';

export default keyedReducer(
	'siteId',
	combineReducers( {
		edits,
	} )
);
