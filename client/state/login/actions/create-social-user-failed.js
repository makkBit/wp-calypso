/**
 * Internal dependencies
 */
import { SOCIAL_CREATE_ACCOUNT_REQUEST_FAILURE } from 'wp-calypso-client/state/action-types';
import { getErrorFromWPCOMError } from 'wp-calypso-client/state/login/utils';

import 'wp-calypso-client/state/login/init';

export const createSocialUserFailed = ( socialInfo, error ) => ( {
	type: SOCIAL_CREATE_ACCOUNT_REQUEST_FAILURE,
	authInfo: socialInfo,
	error: error.field ? error : getErrorFromWPCOMError( error ),
} );
