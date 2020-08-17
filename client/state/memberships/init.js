/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import membershipsReducer from './reducer';

registerReducer( [ 'memberships' ], membershipsReducer );
