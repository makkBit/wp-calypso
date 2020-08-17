/**
 * External dependencies
 */
import { isDesktop } from '@automattic/viewport';

/**
 * Internal dependencies
 */
import { and } from 'wp-calypso-client/layout/guided-tours/utils';
import { isNewUser } from 'wp-calypso-client/state/guided-tours/contexts';
import { isCurrentUserEmailVerified } from 'wp-calypso-client/state/current-user/selectors';

export default {
	name: 'editorBasicsTour',
	version: '20170503',
	path: [ '/post/', '/page/' ],
	when: and( isDesktop, isNewUser, isCurrentUserEmailVerified ),
};
