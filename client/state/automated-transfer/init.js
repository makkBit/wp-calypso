/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import automatedTransferReducer from './reducer';

registerReducer( [ 'automatedTransfer' ], automatedTransferReducer );
