/**
 * Internal dependencies
 */
import { keyedReducer } from 'wp-calypso-client/state/utils';
import { SIGNUP_VERTICALS_SET } from 'wp-calypso-client/state/action-types';

export default keyedReducer( 'siteType', ( state = null, action ) => {
	if ( action.type === SIGNUP_VERTICALS_SET ) {
		return {
			...state,
			[ action.search.trim().toLowerCase() ]: action.verticals,
		};
	}
	return state;
} );
