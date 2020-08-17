/**
 * Internal dependencies
 */
import { isSupportSession } from 'wp-calypso-client/state/support/selectors';
import { currentUserHasFlag } from 'wp-calypso-client/state/current-user/selectors';

export function isAtomicClearCacheEnabled( state ) {
	return currentUserHasFlag( state, 'calypso_atomic_clear_cache' ) || isSupportSession( state );
}
