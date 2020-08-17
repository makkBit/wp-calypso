/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import jetpackScanReducer from './reducer';

registerReducer( [ 'jetpackScan' ], jetpackScanReducer );
