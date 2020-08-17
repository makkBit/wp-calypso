/**
 * Internal dependencies
 */

import { combineReducers } from 'wp-calypso-client/state/utils';
import wcApi from './wc-api/reducer';

export default combineReducers( {
	wcApi,
} );
