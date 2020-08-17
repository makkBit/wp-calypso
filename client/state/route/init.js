/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import routeReducer from './reducer';

registerReducer( [ 'route' ], routeReducer );
