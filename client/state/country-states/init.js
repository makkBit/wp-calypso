/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import countryStatesReducer from './reducer';

registerReducer( [ 'countryStates' ], countryStatesReducer );
