/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import conciergeReducer from './reducer';

registerReducer( [ 'concierge' ], conciergeReducer );
