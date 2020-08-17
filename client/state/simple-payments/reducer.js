/**
 * Internal dependencies
 */

import { combineReducers } from 'wp-calypso-client/state/utils';
import productList from './product-list/reducer';

export default combineReducers( {
	productList,
} );
