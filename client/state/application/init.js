/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import applicationReducer from './reducer';

registerReducer( [ 'application' ], applicationReducer );
