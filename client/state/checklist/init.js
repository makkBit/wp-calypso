/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import checklistReducer from './reducer';

registerReducer( [ 'checklist' ], checklistReducer );
