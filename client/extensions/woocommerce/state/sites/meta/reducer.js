/**
 * Internal dependencies
 */

import { combineReducers } from 'wp-calypso-client/state/utils';
import taxrates from './taxrates/reducer';

export default combineReducers( {
	taxrates,
} );
