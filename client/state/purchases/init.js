/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import purchasesReducer from './reducer';

registerReducer( [ 'purchases' ], purchasesReducer );
