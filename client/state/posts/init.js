/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import postsReducer from './reducer';

registerReducer( [ 'posts' ], postsReducer );
