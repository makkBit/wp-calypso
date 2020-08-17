/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/account-recovery/init';

export default ( state ) => get( state, 'accountRecovery.reset.resetPassword.isRequesting', false );
