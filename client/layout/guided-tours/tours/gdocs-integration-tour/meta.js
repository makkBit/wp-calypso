/**
 * Internal dependencies
 */
import { and } from 'wp-calypso-client/layout/guided-tours/utils';
import { hasUserPastedFromGoogleDocs } from 'wp-calypso-client/state/guided-tours/contexts';
import { isCurrentUserEmailVerified } from 'wp-calypso-client/state/current-user/selectors';

export default {
	name: 'gdocsIntegrationTour',
	version: '20170227',
	path: '/post',
	when: and( isCurrentUserEmailVerified, hasUserPastedFromGoogleDocs ),
};
