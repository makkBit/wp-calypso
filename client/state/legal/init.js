/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import legalReducer from './reducer';

registerReducer( [ 'legal' ], legalReducer );
