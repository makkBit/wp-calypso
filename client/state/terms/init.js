/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import termsReducer from './reducer';

registerReducer( [ 'terms' ], termsReducer );
