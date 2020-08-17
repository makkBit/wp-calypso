/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import shortcodesReducer from './reducer';

registerReducer( [ 'shortcodes' ], shortcodesReducer );
