/**
 * External dependencies
 */
import { isDesktop } from '@automattic/viewport';

/**
 * Internal dependencies
 */
import { and } from 'wp-calypso-client/layout/guided-tours/utils';
import { isNotNewUser } from 'wp-calypso-client/state/guided-tours/contexts';
import { isCurrentUserEmailVerified } from 'wp-calypso-client/state/current-user/selectors';

export default {
	name: 'simplePaymentsTour',
	version: '20170816',
	path: '/post/',
	when: and( isDesktop, isNotNewUser, isCurrentUserEmailVerified ),
};
