/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import jetpackReducer from './reducer';

registerReducer( [ 'jetpack' ], jetpackReducer );
