/**
 * Internal dependencies
 */

import { combineReducers } from 'wp-calypso-client/state/utils';
import error from './error-reducer';

export default combineReducers( {
	error,
} );
