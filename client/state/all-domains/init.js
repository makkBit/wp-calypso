/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import allDomainsReducer from './reducer';

export const allDomains = 'allDomains';

registerReducer( [ allDomains ], allDomainsReducer );
