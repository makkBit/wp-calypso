/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import reducer from './reducer';

registerReducer( [ 'productsList' ], reducer );
