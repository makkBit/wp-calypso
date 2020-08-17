/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import jetpackConnectReducer from './reducer';

registerReducer( [ 'jetpackConnect' ], jetpackConnectReducer );
