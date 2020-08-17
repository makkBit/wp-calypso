/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import countriesReducer from './reducer';

registerReducer( [ 'countries' ], countriesReducer );
