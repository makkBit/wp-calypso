/**
 * Internal dependencies
 */
import { registerReducer } from 'wp-calypso-client/state/redux-store';
import editorDeprecationGroupReducer from './reducer';

registerReducer( [ 'currentUser', 'inEditorDeprecationGroup' ], editorDeprecationGroupReducer );
