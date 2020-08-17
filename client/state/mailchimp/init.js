/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import mailchimpReducer from './reducer';

registerReducer( [ 'mailchimp' ], mailchimpReducer );
