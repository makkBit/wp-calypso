/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import preferencesReducer from './reducer';

registerReducer( [ 'preferences' ], preferencesReducer );
