/**
 * Internal dependencies
 */
import { withStorageKey } from 'wp-calypso-client/state/utils';
import { EDITOR_DEPRECATION_GROUP_SET } from 'wp-calypso-client/state/action-types';

export const editorDeprecationGroupReducer = ( state = '', { type, inEditorDeprecationGroup } ) =>
	type === EDITOR_DEPRECATION_GROUP_SET ? inEditorDeprecationGroup : state;

export default withStorageKey( 'inEditorDeprecationGroup', editorDeprecationGroupReducer );
