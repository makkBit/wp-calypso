/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import signupReducer from './reducer';

registerReducer( [ 'signup' ], signupReducer );
