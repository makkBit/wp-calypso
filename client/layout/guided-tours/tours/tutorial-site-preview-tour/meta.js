/**
 * Internal dependencies
 */
import { and } from 'wp-calypso-client/layout/guided-tours/utils';
import {
	isNewUser,
	isEnabled,
	isSelectedSitePreviewable,
} from 'wp-calypso-client/state/guided-tours/contexts';

export default {
	name: 'tutorialSitePreview',
	version: '20170101',
	path: '/stats',
	when: and(
		isEnabled( 'guided-tours/tutorial-site-preview' ),
		isSelectedSitePreviewable,
		isNewUser
	),
};
