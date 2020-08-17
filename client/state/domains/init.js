/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import domainsReducer from './reducer';

registerReducer( [ 'domains' ], domainsReducer );
