/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import hostingReducer from './reducer';

registerReducer( [ 'atomicHosting' ], hostingReducer );
