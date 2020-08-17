/**
 * Internal dependencies
 */
import { JITM_SET } from 'wp-calypso-client/state/action-types';
import { combineReducers, keyedReducer } from 'wp-calypso-client/state/utils';

export const storeJITM = ( state = {}, { type, jitms } ) => ( type === JITM_SET ? jitms : state );

const sitePathJITM = keyedReducer( 'keyedPath', storeJITM );

export default combineReducers( {
	sitePathJITM,
} );
