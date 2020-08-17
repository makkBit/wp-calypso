/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/account-recovery/init';

export const isFetchingAccountRecoverySettings = ( state ) =>
	state.accountRecovery.isFetchingSettings;
