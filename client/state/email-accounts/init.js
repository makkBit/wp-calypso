/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import emailAccountsReducer from './reducer';

registerReducer( [ 'emailAccounts' ], emailAccountsReducer );
