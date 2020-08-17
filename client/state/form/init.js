/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import formReducer from './reducer';

registerReducer( [ 'form' ], formReducer );
