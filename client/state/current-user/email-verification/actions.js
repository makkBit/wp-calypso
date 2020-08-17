/**
 * Internal dependencies
 */

import {
	EMAIL_VERIFY_REQUEST,
	EMAIL_VERIFY_STATE_RESET,
} from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/me/send-verification-email';

export const verifyEmail = ( { showGlobalNotices = false } = {} ) => ( {
	type: EMAIL_VERIFY_REQUEST,
	showGlobalNotices,
} );

export const resetVerifyEmailState = () => ( { type: EMAIL_VERIFY_STATE_RESET } );
