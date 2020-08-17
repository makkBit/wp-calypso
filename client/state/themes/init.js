/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import themesReducer from './reducer';

registerReducer( [ 'themes' ], themesReducer );
