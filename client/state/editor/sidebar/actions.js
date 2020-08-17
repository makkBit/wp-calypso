/**
 * Internal dependencies
 */
import {
	bumpStat,
	composeAnalytics,
	recordGoogleEvent,
	withAnalytics,
	recordTracksEvent,
} from 'wp-calypso-client/state/analytics/actions';
import { savePreference } from 'wp-calypso-client/state/preferences/actions';
import { setLayoutFocus } from 'wp-calypso-client/state/ui/layout-focus/actions';

import 'wp-calypso-client/state/editor/init';

export const openEditorSidebar = () => ( dispatch ) => {
	dispatch( savePreference( 'editor-sidebar', 'open' ) );
	dispatch(
		withAnalytics(
			composeAnalytics(
				recordTracksEvent( 'calypso_editor_sidebar_toggle_open' ),
				recordGoogleEvent( 'Editor', 'Sidebar Toggle', 'open' ),
				bumpStat( 'editor_actions', 'open-sidebar' )
			),
			setLayoutFocus( 'sidebar' )
		)
	);
};

export const closeEditorSidebar = () => ( dispatch ) => {
	dispatch( savePreference( 'editor-sidebar', 'closed' ) );
	dispatch(
		withAnalytics(
			composeAnalytics(
				recordTracksEvent( 'calypso_editor_sidebar_toggle_close' ),
				recordGoogleEvent( 'Editor', 'Sidebar Toggle', 'close' ),
				bumpStat( 'editor_actions', 'close-sidebar' )
			),
			setLayoutFocus( 'content' )
		)
	);
};
