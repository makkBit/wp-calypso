/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import loginReducer from './reducer';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/login/init';

registerReducer( [ 'login' ], loginReducer );
