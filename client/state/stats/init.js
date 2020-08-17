/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import statsReducer from './reducer';

registerReducer( [ 'stats' ], statsReducer );
