/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import getSelectedEditor from 'wp-calypso-client/state/selectors/get-selected-editor';
import isClassicEditorForced from 'wp-calypso-client/state/selectors/is-classic-editor-forced';

import 'wp-calypso-client/state/gutenberg-opt-in-out/init';

export const isGutenbergOptInEnabled = ( state, siteId ) => {
	return (
		get( state, [ 'gutenbergOptInOut', siteId, 'optIn' ], false ) &&
		getSelectedEditor( state, siteId ) === 'classic' &&
		! isClassicEditorForced( state, siteId )
	);
};

export default isGutenbergOptInEnabled;
