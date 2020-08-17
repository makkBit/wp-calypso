/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import readerReducer from './reducer';

registerReducer( [ 'reader' ], readerReducer );
