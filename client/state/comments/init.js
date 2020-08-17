/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import commentsReducer from './reducer';

registerReducer( [ 'comments' ], commentsReducer );
