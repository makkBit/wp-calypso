/**
 * External dependencies
 */
import { get } from 'lodash';
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import {
	TWO_FACTOR_AUTHENTICATION_SEND_SMS_CODE_REQUEST,
	TWO_FACTOR_AUTHENTICATION_SEND_SMS_CODE_REQUEST_FAILURE,
	TWO_FACTOR_AUTHENTICATION_SEND_SMS_CODE_REQUEST_SUCCESS,
} from 'wp-calypso-client/state/action-types';
import { getTwoFactorAuthNonce, getTwoFactorUserId } from 'wp-calypso-client/state/login/selectors';
import {
	getErrorFromHTTPError,
	getSMSMessageFromResponse,
	postLoginRequest,
} from 'wp-calypso-client/state/login/utils';

import 'wp-calypso-client/state/login/init';

/**
 * Sends a two factor authentication recovery code to a user.
 *
 * @returns {Function} A thunk that can be dispatched
 */
export const sendSmsCode = () => ( dispatch, getState ) => {
	dispatch( {
		type: TWO_FACTOR_AUTHENTICATION_SEND_SMS_CODE_REQUEST,
		notice: {
			message: translate( 'Sending you a text message…' ),
		},
	} );

	return postLoginRequest( 'send-sms-code-endpoint', {
		user_id: getTwoFactorUserId( getState() ),
		two_step_nonce: getTwoFactorAuthNonce( getState(), 'sms' ),
		client_id: config( 'wpcom_signup_id' ),
		client_secret: config( 'wpcom_signup_key' ),
	} )
		.then( ( response ) => {
			const message = getSMSMessageFromResponse( response );

			dispatch( {
				type: TWO_FACTOR_AUTHENTICATION_SEND_SMS_CODE_REQUEST_SUCCESS,
				notice: {
					message,
					status: 'is-success',
				},
				twoStepNonce: get( response, 'body.data.two_step_nonce' ),
			} );
		} )
		.catch( ( httpError ) => {
			const error = getErrorFromHTTPError( httpError );

			dispatch( {
				type: TWO_FACTOR_AUTHENTICATION_SEND_SMS_CODE_REQUEST_FAILURE,
				error,
				twoStepNonce: get( httpError, 'response.body.data.two_step_nonce' ),
			} );
		} );
};
